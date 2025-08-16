
"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, UserPlus, Calendar, ArrowUp } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Admission } from "./admissions/data/schema";
import { Student } from "./students/data/schema";
import { AdmissionsStatusChart } from "./components/admissions-status-chart";
import { StudentsByClassChart } from "./components/students-by-class-chart";

async function getDashboardData() {
    try {
        const studentsRef = ref(db, 'students');
        const teachersRef = ref(db, 'teachers');
        const admissionsRef = ref(db, 'admissionSubmissions');
        const eventsRef = ref(db, 'events');

        const [
            studentsSnapshot, 
            teachersSnapshot, 
            admissionsSnapshot,
            eventsSnapshot
        ] = await Promise.all([
            get(studentsRef),
            get(teachersRef),
            get(admissionsRef),
            get(eventsRef)
        ]);

        const students = studentsSnapshot.exists() ? Object.values(studentsSnapshot.val()) as Student[] : [];
        const admissions = admissionsSnapshot.exists() ? Object.values(admissionsSnapshot.val()) as Admission[] : [];
        
        const totalStudents = students.length;
        const totalTeachers = teachersSnapshot.exists() ? Object.keys(teachersSnapshot.val()).length : 0;
        const pendingAdmissions = admissions.filter(a => a.status === 'pending').length;
        
        const upcomingEvents = eventsSnapshot.exists() 
            ? Object.values(eventsSnapshot.val() as Event[]).filter(e => new Date(e.date) >= new Date()).length
            : 0;
        
        return { 
            totalStudents, 
            totalTeachers, 
            pendingAdmissions, 
            upcomingEvents,
            admissions,
            students
        };

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return { 
            totalStudents: 0, 
            totalTeachers: 0, 
            pendingAdmissions: 0, 
            upcomingEvents: 0,
            admissions: [],
            students: []
        };
    }
}


export default function AdminPage() {
    const [data, setData] = useState<{
        totalStudents: number;
        totalTeachers: number;
        pendingAdmissions: number;
        upcomingEvents: number;
        admissions: Admission[];
        students: Student[];
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getDashboardData().then(data => {
            setData(data);
            setLoading(false);
        });
    }, []);

    const overviewData = [
      { title: "Total Students", value: data?.totalStudents.toString() ?? '0', icon: <Users className="h-6 w-6 text-muted-foreground" />, change: "+12%", changeColor: "text-green-500" },
      { title: "Total Teachers", value: data?.totalTeachers.toString() ?? '0', icon: <GraduationCap className="h-6 w-6 text-muted-foreground" />, change: "+3%", changeColor: "text-green-500" },
      { title: "Pending Admissions", value: data?.pendingAdmissions.toString() ?? '0', icon: <UserPlus className="h-6 w-6 text-muted-foreground" />, description: "Requires attention" },
      { title: "Upcoming Events", value: data?.upcomingEvents.toString() ?? '0', icon: <Calendar className="h-6 w-6 text-muted-foreground" />, description: "Next 30 days" },
    ];
    
    if (loading || !data) {
        return (
            <div className="flex-1 space-y-6 p-8 pt-6">
                <div>
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-lg" />)}
                </div>
                 <div className="grid gap-6 lg:grid-cols-5">
                    <Skeleton className="lg:col-span-3 h-96 rounded-lg" />
                    <Skeleton className="lg:col-span-2 h-96 rounded-lg" />
                </div>
            </div>
        )
    }


  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold font-headline">Dashboard Overview</h2>
        <p className="text-muted-foreground">Monitor your school&apos;s key metrics and recent activities.</p>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {overviewData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              {item.change ? (
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className={`h-4 w-4 mr-1 ${item.changeColor}`} />
                  {item.change} from last month
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">{item.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Students by Class</CardTitle>
                <CardDescription>A breakdown of student enrollment across different classes.</CardDescription>
            </CardHeader>
            <CardContent>
                <StudentsByClassChart students={data.students} />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Admissions Status</CardTitle>
                <CardDescription>The current status of all admission applications.</CardDescription>
            </CardHeader>
            <CardContent>
                <AdmissionsStatusChart admissions={data.admissions} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
