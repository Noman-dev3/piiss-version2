import { promises as fs } from 'fs';
import path from 'path';
import { z } from 'zod';
import { columns } from './components/columns';
import { DataTable } from './components/data-table';
import { taskSchema } from './data/schema';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'src/app/admin/admissions/data/tasks.json')
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

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
            <DataTable data={tasks} columns={columns} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
