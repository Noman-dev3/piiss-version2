import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Admission, admissionSchema } from './data/schema';
import { z } from 'zod';

async function getAdmissions(): Promise<Admission[]> {
  const dbRef = ref(db, 'admissionSubmissions');
  try {
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const admissionsArray = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
        // Ensure status is always present
        status: data[key].status || 'pending', 
      }));
      // Sort by submission date, newest first
      admissionsArray.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
      
      const parsedAdmissions = z.array(admissionSchema).safeParse(admissionsArray);
      if (parsedAdmissions.success) {
        return parsedAdmissions.data;
      } else {
        console.error("Zod validation error:", parsedAdmissions.error.errors);
        // Attempt to return partially valid data if needed, or handle error
        // For now, we filter out invalid entries
        const validAdmissions = admissionsArray
          .map(item => {
            const result = admissionSchema.safeParse(item);
            return result.success ? result.data : null;
          })
          .filter((item): item is Admission => item !== null);
        return validAdmissions;
      }
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
            <div className="overflow-x-auto">
                <DataTable data={admissions} columns={columns} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
