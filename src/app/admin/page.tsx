
"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, GraduationCap, UserPlus, Calendar, ArrowUp } from "lucide-react";
import { db } from "@/lib/firebase";
import { ref, get, query, orderByChild, equalTo } from "firebase/database";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

async function getDashboardData() {
    try {
        const studentsRef = ref(db, 'students');
        const teachersRef = ref(db, 'teachers');
        const admissionsRef = ref(db, 'admissionSubmissions');

        const studentsSnapshot = await get(studentsRef);
        const teachersSnapshot = await get(teachersRef);
        
        const pendingAdmissionsQuery = query(admissionsRef, orderByChild('status'), equalTo('pending'));
        const pendingAdmissionsSnapshot = await get(pendingAdmissionsQuery);

        const totalStudents = studentsSnapshot.exists() ? Object.keys(studentsSnapshot.val()).length : 0;
        const totalTeachers = teachersSnapshot.exists() ? Object.keys(teachersSnapshot.val()).length : 0;
        const pendingAdmissions = pendingAdmissionsSnapshot.exists() ? Object.keys(pendingAdmissionsSnapshot.val()).length : 0;

        return { totalStudents, totalTeachers, pendingAdmissions };

    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return { totalStudents: 0, totalTeachers: 0, pendingAdmissions: 0 };
    }
}

const recentActivity = [
    { name: "Noman Khan", description: "New admission application", time: "2 minutes ago" },
    { name: "John Doe", description: "New admission application", time: "2 minutes ago" },
    { name: "Jane Smith", description: "New admission application", time: "5 minutes ago" },
];

export default function AdminPage() {
    const [data, setData] = useState<{totalStudents: number, totalTeachers: number, pendingAdmissions: number} | null>(null);
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
      { title: "Upcoming Events", value: "1", icon: <Calendar className="h-6 w-6 text-muted-foreground" />, description: "Next 30 days" },
    ];
    
    if (loading) {
        return (
            <div className="flex-1 space-y-6 p-8 pt-6">
                <div>
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
                </div>
                 <div className="grid gap-6 lg:grid-cols-3">
                    <Skeleton className="lg:col-span-2 h-48" />
                    <Skeleton className="h-64" />
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
              <Link href="/admin/students">
                  <GraduationCap className="h-8 w-8" />
                  <span>Manage Students</span>
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-24 flex flex-col items-center justify-center gap-2" asChild>
               <Link href="/admin/teachers">
                  <Users className="h-8 w-8" />
                  <span>Manage Teachers</span>
               </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes in the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                    <Avatar className="h-9 w-9">
                        <AvatarFallback><UserPlus className="h-5 w-5 text-muted-foreground" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <p className="text-sm font-medium leading-none">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">{activity.name}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
