import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, PlusCircle } from "lucide-react";

const mockServices = [
    { id: 1, title: "Web Development", description: "Creating responsive, high-performance websites..." },
    { id: 2, title: "App Development", description: "Building intuitive and feature-rich mobile applications..." },
    { id: 3, title: "UI/UX Design", description: "Designing beautiful, user-friendly interfaces..." },
]

export default function AdminPage() {
    return (
        <div>
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Welcome, Admin!</CardTitle>
                    <CardDescription>From here you can manage all the content on your website.</CardDescription>
                </CardHeader>
            </Card>

            <Tabs defaultValue="services">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="about">About Us</TabsTrigger>
                </TabsList>
                <TabsContent value="services">
                    <Card>
                        <CardHeader>
                             <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Manage Services</CardTitle>
                                    <CardDescription>Update the services you offer.</CardDescription>
                                </div>
                                <Button><PlusCircle className="mr-2 h-4 w-4"/>Add Service</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockServices.map(item => (
                                         <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="about">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit 'About Us' Page</CardTitle>
                            <CardDescription>Update the school's story and information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bio">Our Story</Label>
                                <Textarea id="bio" rows={8} defaultValue="Pakistan Islamic International School System (PIISS) began with a vision: to provide quality education rooted in Islamic values and modern knowledge. At PIISS, learning goes beyond books. We guide our students to think deeply, act kindly, and aim high. Our classrooms inspire curiosity, our teachers nurture confidence, and our community fosters respect. We believe in shaping leaders of tomorrow — young minds ready to excel in academics, contribute to society, and live with faith and integrity."/>
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
