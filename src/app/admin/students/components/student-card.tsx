
"use client";

import Image from "next/image";
import { useState } from "react";
import { Student } from "../data/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { StudentDetailsDialog } from "./student-details-dialog";
import { EditStudentDialog } from "./edit-student-dialog";
import { db } from "@/lib/firebase";
import { ref, remove } from "firebase/database";


interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  const { toast } = useToast();
  const [isViewOpen, setViewOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  
  const handleDelete = async () => {
    try {
      const studentRef = ref(db, `students/${student.id}`);
      await remove(studentRef);
      toast({
        title: "Student Deleted",
        description: `Student ${student.Name} has been removed.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
    <div className="group perspective-1000">
        <Card className="h-full transform-style-3d transition-all duration-500 group-hover:rotate-y-4 group-hover:shadow-2xl group-hover:shadow-primary/20 bg-secondary/30 border-border/20">
            <CardHeader className="items-center text-center p-4">
                <div className="relative">
                    <Image
                        src={student.profilePicture || "https://placehold.co/128x128.png"}
                        alt={student.Name}
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-primary/50 object-cover w-24 h-24 transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint="student portrait"
                    />
                </div>
                 <CardTitle className="text-lg font-bold font-headline mt-2">{student.Name}</CardTitle>
                 <p className="text-xs text-muted-foreground">ID: {student.id}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-center">
                 <Badge variant="outline" className="bg-background/80">
                    Class: {student.Class} ({student.Section})
                 </Badge>
            </CardContent>
            <CardFooter className="flex justify-center gap-2 p-4 pt-0">
                <Button variant="outline" size="sm" onClick={() => setViewOpen(true)}>
                    <User className="mr-2 h-4 w-4" /> View
                </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setEditOpen(true)}>
                    <Edit className="h-4 w-4 text-blue-500" />
                 </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-500 hover:bg-red-500/10">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the student record for <strong>{student.Name}</strong> from the database.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

            </CardFooter>
        </Card>
    </div>
    {isViewOpen && <StudentDetailsDialog student={student} isOpen={isViewOpen} onOpenChange={setViewOpen} />}
    {isEditOpen && <EditStudentDialog student={student} isOpen={isEditOpen} onOpenChange={setEditOpen} />}
    </>
  );
}
