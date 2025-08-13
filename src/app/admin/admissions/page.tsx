import { db } from '@/lib/firebase';
import { ref, onValue } from 'firebase/database';
import { get, child } from 'firebase/database';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Admission, admissionSchema } from './data/schema';
import { z } from 'zod';
import * as React from 'react';

async function getAdmissions(): Promise<Admission[]> {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, 'admissions'));
    if (snapshot.exists()) {
      const data = snapshot.val();
      const admissionsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      return z.array(admissionSchema).parse(admissionsArray);
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error("Error fetching admissions:", error);
    return [];
  }
}

export default async function AdmissionsPage() {
  const admissions = await getAdmissions();

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Admissions</h2>
            <p className="text-muted-foreground">
              Review and manage all submitted admission applications.
            </p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Admission Applications</CardTitle>
            <CardDescription>
              Manage pending admission applications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable data={admissions} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
