
"use client"
import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { ResultCard } from "@/components/result-card";
import { db } from "@/lib/firebase";
import { ref, get, query } from "firebase/database";
import { Result, resultSchema } from "@/app/admin/results/data/schema";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

async function getAllResults(): Promise<Result[]> {
    const dbRef = query(ref(db, 'results'));
    try {
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
            const data = snapshot.val();
            const itemsArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key],
            }));
            const parsedItems = z.array(resultSchema).safeParse(itemsArray);
            if (parsedItems.success) {
                return parsedItems.data;
            }
        }
        return [];
    } catch (error) {
        console.error("Error fetching results:", error);
        return [];
    }
}

export default function ResultsPage() {
    const [allResults, setAllResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState({ name: "", rollNumber: "", studentClass: "" });
    const [foundResult, setFoundResult] = useState<Result | null | "not_found">(null);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        getAllResults().then(data => {
            setAllResults(data);
            setLoading(false);
        });
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSearching(true);
        setFoundResult(null);

        setTimeout(() => {
            const result = allResults.find(r =>
                r.student_name.toLowerCase() === searchQuery.name.toLowerCase().trim() &&
                r.roll_number === searchQuery.rollNumber.trim() &&
                r.class.toLowerCase() === searchQuery.studentClass.toLowerCase().trim()
            );
            setFoundResult(result || "not_found");
            setIsSearching(false);
        }, 1000); // Simulate network delay
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="flex-1 py-12 md:py-24 lg:py-32">
                <div className="container mx-auto px-4">
                    <Card className="max-w-3xl mx-auto bg-secondary/30 border-border/20">
                        <CardHeader className="text-center">
                            <CardTitle className="text-4xl font-bold font-headline">Find Your Result</CardTitle>
                            <CardDescription className="text-muted-foreground">
                                Enter your details to view your academic result.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Student Name</Label>
                                        <Input id="name" value={searchQuery.name} onChange={e => setSearchQuery({...searchQuery, name: e.target.value})} required className="bg-background"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="rollNumber">Roll Number</Label>
                                        <Input id="rollNumber" value={searchQuery.rollNumber} onChange={e => setSearchQuery({...searchQuery, rollNumber: e.target.value})} required className="bg-background"/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="studentClass">Class</Label>
                                        <Input id="studentClass" value={searchQuery.studentClass} onChange={e => setSearchQuery({...searchQuery, studentClass: e.target.value})} required className="bg-background"/>
                                    </div>
                                </div>
                                <Button type="submit" disabled={loading || isSearching} className="w-full">
                                    <Search className="mr-2 h-4 w-4" /> 
                                    {isSearching ? "Searching..." : "Find Result"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mt-12">
                        {isSearching && <Skeleton className="w-full h-96" />}
                        {foundResult && foundResult !== "not_found" && <ResultCard result={foundResult} />}
                        {foundResult === "not_found" && (
                            <Alert variant="destructive" className="max-w-2xl mx-auto">
                                <AlertTitle>Result Not Found</AlertTitle>
                                <AlertDescription>
                                    We could not find a result matching the details provided. Please check the information and try again.
                                </AlertDescription>
                            </Alert>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
