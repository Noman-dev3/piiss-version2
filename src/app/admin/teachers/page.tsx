
"use client"
import { db } from '@/lib/firebase';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import { teacherSchema, Teacher } from './data/schema';
import { z } from 'zod';
import { TeacherCard } from './components/teacher-card';
import { useEffect, useState, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const dbRef = query(ref(db, 'teachers'), orderByChild('name'));

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const teachersArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));

        const parsedTeachers = z.array(teacherSchema).safeParse(teachersArray);
        if (parsedTeachers.success) {
          setTeachers(parsedTeachers.data);
        } else {
          console.error("Zod validation error:", parsedTeachers.error.flatten());
          const validTeachers = teachersArray
            .map(item => {
              const result = teacherSchema.safeParse(item);
              if (result.success) {
                return result.data;
              } else {
                 console.warn("Invalid teacher data for ID:", item.id, result.error.flatten().fieldErrors);
                 return null;
              }
            })
            .filter((item): item is Teacher => item !== null);
          setTeachers(validTeachers);
        }
      } else {
        console.log("No teacher data available");
        setTeachers([]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching teachers:", error);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const filteredTeachers = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return teachers.filter(teacher => 
      teacher.name.toLowerCase().includes(query) || 
      teacher.id.toLowerCase().includes(query)
    );
  }, [teachers, searchQuery]);

  if(loading) {
    return (
       <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>
        </div>
         <Skeleton className="h-10 w-full mb-6" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
        </div>
       </div>
    )
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Teachers</h2>
          <p className="text-muted-foreground">
            View, edit, or delete teacher records in the school.
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <Input 
          type="search"
          placeholder="Search by name or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm bg-background"
        />
      </div>

      {filteredTeachers.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredTeachers.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
            <div className="flex flex-col items-center gap-1 text-center py-20">
                <h3 className="text-2xl font-bold tracking-tight">
                No teachers found
                </h3>
                <p className="text-sm text-muted-foreground">
                Teacher records will appear here once they are added to the database.
                </p>
            </div>
        </div>
      )}
    </div>
  );
}
