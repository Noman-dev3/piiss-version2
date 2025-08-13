
"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Teacher } from "../data/schema"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


interface TimetableDialogProps {
  teacher: Teacher;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TimetableDialog({ teacher, isOpen, onOpenChange }: TimetableDialogProps) {
  // Use the teacher's ID to access their specific timetable.
  const timetableForTeacher = teacher.timetables ? teacher.timetables[teacher.id] : undefined;
  const days = timetableForTeacher ? Object.keys(timetableForTeacher) : [];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-headline">Timetable for {teacher.name}</DialogTitle>
            <DialogDescription>
                Weekly teaching schedule for the selected teacher.
            </DialogDescription>
        </DialogHeader>
        <div className="py-4 max-h-[70vh] overflow-y-auto pr-4">
            {days.length > 0 && timetableForTeacher ? (
                <div className="space-y-6">
                    {days.map(day => (
                        <Card key={day}>
                            <CardHeader>
                                <CardTitle>{day}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Class</TableHead>
                                            <TableHead>Subject</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {Object.values(timetableForTeacher[day] || {}).map((slot: any, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{slot.time || slot.period}</TableCell>
                                                <TableCell>{slot.class}</TableCell>
                                                <TableCell>{slot.subject}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-muted rounded-lg">
                    <p className="text-lg font-semibold">No Timetable Found</p>
                    <p className="text-muted-foreground text-sm">There is no timetable data available for {teacher.name}.</p>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
