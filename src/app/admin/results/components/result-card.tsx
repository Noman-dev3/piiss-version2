
"use client";

import { useState } from "react";
import { Result } from "../data/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Trash2, Trophy, Percent } from "lucide-react";
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
import { ResultDetailsDialog } from "./result-details-dialog";
import { EditResultDialog } from "./edit-result-dialog";
import { db } from "@/lib/firebase";
import { ref, remove } from "firebase/database";


interface ResultCardProps {
  result: Result;
}

export function ResultCard({ result }: ResultCardProps) {
  const { toast } = useToast();
  const [isViewOpen, setViewOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  
  const handleDelete = async () => {
    try {
        const resultRef = ref(db, `results/${result.id}`);
        await remove(resultRef);
        toast({
            title: "Result Deleted",
            description: `Result for ${result.student_name} has been removed.`,
        });
    } catch(error) {
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
                 <CardTitle className="text-lg font-bold font-headline mt-2">{result.student_name}</CardTitle>
                 <p className="text-xs text-muted-foreground">Roll No: {result.roll_number}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-center space-y-2">
                 <Badge variant="outline" className="bg-background/80">
                    Class: {result.class}
                 </Badge>
                 <div className="flex justify-center items-center gap-4 text-sm">
                    <div className="flex items-center gap-1 text-green-500">
                        <Trophy className="h-4 w-4" />
                        <span>{result.grade}</span>
                    </div>
                     <div className="flex items-center gap-1 text-blue-500">
                        <Percent className="h-4 w-4" />
                        <span>{result.percentage}%</span>
                    </div>
                 </div>
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
                        This action cannot be undone. This will permanently delete the result for <strong>{result.student_name}</strong> from the database.
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
    {isViewOpen && <ResultDetailsDialog result={result} isOpen={isViewOpen} onOpenChange={setViewOpen} />}
    {isEditOpen && <EditResultDialog result={result} isOpen={isEditOpen} onOpenChange={setEditOpen} />}
    </>
  );
}
