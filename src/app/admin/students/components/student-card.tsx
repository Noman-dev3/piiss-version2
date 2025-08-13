"use client";

import Image from "next/image";
import { Student } from "../data/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface StudentCardProps {
  student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="group perspective-1000">
        <Card className="h-full transform-style-3d transition-all duration-500 group-hover:rotate-y-4 group-hover:shadow-2xl group-hover:shadow-primary/20 bg-secondary/30 border-border/20">
            <CardHeader className="items-center text-center p-4">
                <div className="relative">
                    <Image
                        src={student.profilePicture || "https://placehold.co/128x128.png"}
                        alt={student.studentName}
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-primary/50 object-cover w-24 h-24 transition-transform duration-500 group-hover:scale-110"
                        data-ai-hint="student portrait"
                    />
                </div>
                 <CardTitle className="text-lg font-bold font-headline mt-2">{student.studentName}</CardTitle>
                 <p className="text-xs text-muted-foreground">Roll No: {student.rollNumber}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-center">
                 <Badge variant="outline" className="bg-background/80">
                    Class: {student.currentClass}
                 </Badge>
            </CardContent>
            <CardFooter className="flex justify-center gap-2 p-4 pt-0">
                <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" /> View
                </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4 text-blue-500" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-500 hover:bg-red-500/10">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
