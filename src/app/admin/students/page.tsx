
"use client"
import { db } from '@/lib/firebase';
import { ref, get, query, orderByChild } from 'firebase/database';
import { studentSchema, Student } from './data/schema';
import { z } from 'zod';
import { StudentCard } from './components/student-card';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';


async function getStudents(): Promise<Student[]> {
  const dbRef = ref(db, 'students');
  try {
    // Ordering by a property that exists, like 'Name'
    const snapshot = await get(query(dbRef, orderByChild('Name')));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const studentsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      
      const parsedStudents = z.array(studentSchema).safeParse(studentsArray);
      if (parsedStudents.success) {
        return parsedStudents.data;
      } else {
        console.error("Zod validation error:", parsedStudents.error.errors);
        const validStudents = studentsArray
          .map(item => {
            const result = studentSchema.safeParse(item);
            if (result.success) {
              return result.data;
            } else {
               console.warn("Invalid student data for ID:", item.id, result.error.flatten().fieldErrors);
               return null;
            }
          })
          .filter((item): item is Student => item !== null);
        return validStudents;
      }
    } else {
      console.log("No student data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStudents().then(data => {
      setStudents(data);
      setLoading(false);
    });
  }, []);

  if(loading) {
    return (
       <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-72 mt-2" />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {[...Array(10)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
       </div>
    )
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Students</h2>
          <p className="text-muted-foreground">
            View, edit, or delete student records in the school.
          </p>
        </div>
      </div>
      
      {students.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {students.map((student) => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
            <div className="flex flex-col items-center gap-1 text-center py-20">
                <h3 className="text-2xl font-bold tracking-tight">
                No students found
                </h3>
                <p className="text-sm text-muted-foreground">
                Student records created from the other application will appear here.
                </p>
            </div>
        </div>
      )}
    </div>
  );
}
