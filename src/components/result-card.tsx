
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Result } from "@/app/admin/results/data/schema";
import { format } from "date-fns";

const DetailItem = ({ label, value }: { label: string; value: string | number | undefined; }) => (
    <div className="flex justify-between items-center text-sm">
        <p className="text-muted-foreground">{label}</p>
        <p className="font-semibold">{value ?? 'N/A'}</p>
    </div>
);

export function ResultCard({ result }: { result: Result }) {
    return (
        <Card className="w-full max-w-2xl mx-auto shadow-lg bg-secondary/40 animate-in fade-in-50 zoom-in-95">
            <CardHeader className="text-center bg-muted/50 rounded-t-lg p-6">
                <CardTitle className="text-2xl font-bold font-headline">Result for {result.student_name}</CardTitle>
                <CardDescription>
                    Session: {result.session} | Published on: {format(new Date(result.date_created), "PPP")}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <DetailItem label="Student Name" value={result.student_name} />
                    <DetailItem label="Roll Number" value={result.roll_number} />
                    <DetailItem label="Class" value={result.class} />
                </div>
                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t pt-6">
                    <DetailItem label="Grade" value={result.grade} />
                    <DetailItem label="Percentage" value={`${result.percentage}%`} />
                    <DetailItem label="Total Marks" value={`${result.total_marks} / ${result.max_marks}`} />
                </div>

                <div>
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Subject-wise Marks</h3>
                    <div className="space-y-3">
                        {Object.entries(result.subjects).map(([subject, marks]) => (
                            <div key={subject} className="flex justify-between items-center bg-background/50 p-3 rounded-md">
                                <p className="font-medium">{subject}</p>
                                <Badge variant="secondary">{marks}</Badge>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
