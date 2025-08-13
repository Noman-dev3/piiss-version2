import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash2, PlusCircle } from "lucide-react";

const mockPortfolio = [
    { id: 1, title: "E-commerce Platform", category: "Web Development", date: "2023-10-01" },
    { id: 2, title: "Mobile Banking App", category: "App Development", date: "2023-08-15" },
    { id: 3, title: "SaaS Dashboard", category: "Web Development", date: "2023-05-20" },
];

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

            <Tabs defaultValue="portfolio">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                    <TabsTrigger value="services">Services</TabsTrigger>
                    <TabsTrigger value="about">About Me</TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle>Manage Portfolio</CardTitle>
                                    <CardDescription>Add, edit, or remove portfolio projects.</CardDescription>
                                </div>
                                <Button><PlusCircle className="mr-2 h-4 w-4"/>Add Project</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Date Added</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockPortfolio.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.date}</TableCell>
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
                            <CardTitle>Edit 'About Me' Page</CardTitle>
                            <CardDescription>Update your bio, skills, and personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="bio">Biography</Label>
                                <Textarea id="bio" rows={5} defaultValue="Hello! I'm a passionate Full-Stack Developer..."/>
                            </div>
                             <div className="space-y-2">
                                <Label>Skills (Name and Percentage)</Label>
                                <div className="space-y-2">
                                    <div className="flex gap-2 items-center">
                                        <Input defaultValue="HTML"/>
                                        <Input type="number" defaultValue="95"/>
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Input defaultValue="CSS"/>
                                        <Input type="number" defaultValue="85"/>
                                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive"/></Button>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Add Skill</Button>
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
