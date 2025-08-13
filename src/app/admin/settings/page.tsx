
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { ref, get, set } from "firebase/database";
import { Skeleton } from "@/components/ui/skeleton";


export default function SettingsPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({
        ourStory: "Founded in 2015 with a pioneering spirit, the Pakistan Islamic International School System (PIISS) embarked on a mission to redefine education. We began with a simple yet powerful vision: to create a nurturing environment that blends academic rigor with timeless Islamic values. Our journey started in a modest campus with a handful of students and a team of dedicated educators who believed in fostering not just scholars, but compassionate and well-rounded individuals. Over the years, as our community grew, so did our commitment to excellence. We have since expanded our facilities, embraced innovative teaching methodologies, and consistently produced students who excel both in their studies and in their character. Today, PIISS stands as a beacon of quality education, proud of its rich history and excited for a future of continued growth and success.",
        logoUrl: "",
        contactPhone: "",
        contactEmail: "",
        contactAddress: "",
        officeHours: "",
        aboutImageUrl: "",
        contactImageUrl: "",
        schoolDataUrl: "",
    });

    useEffect(() => {
        const fetchSettings = async () => {
            const settingsRef = ref(db, 'settings');
            const snapshot = await get(settingsRef);
            if(snapshot.exists()) {
                // Merge fetched settings with default values to avoid breaking if new settings are added
                setSettings(prev => ({...prev, ...snapshot.val()}));
            }
            setLoading(false);
        }
        fetchSettings();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setSettings(prev => ({...prev, [id]: value}));
    }

    const handleSaveChanges = async () => {
        try {
            const settingsRef = ref(db, 'settings');
            await set(settingsRef, settings);
            toast({
                title: "Settings Saved",
                description: "Your changes have been successfully saved.",
            });
        } catch (error) {
             toast({
                title: "Error Saving Settings",
                description: (error as Error).message,
                variant: "destructive",
            });
        }
    }

    if (loading) {
        return (
             <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-72 mt-2" />
                    </div>
                </div>
                <div className="grid gap-8">
                    <Skeleton className="h-96 w-full" />
                    <Skeleton className="h-80 w-full" />
                </div>
            </div>
        )
    }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your site settings and account preferences.
                </p>
            </div>
        </div>

        <div className="grid gap-8">
             <Card>
                <CardHeader>
                    <CardTitle>Website Content</CardTitle>
                    <CardDescription>Update your website's main content and contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="ourStory">Our Story</Label>
                        <Textarea id="ourStory" value={settings.ourStory} onChange={handleInputChange} rows={5} />
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="logoUrl">Logo URL</Label>
                            <Input id="logoUrl" value={settings.logoUrl} onChange={handleInputChange} placeholder="https://example.com/logo.png"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactPhone">Contact Phone</Label>
                            <Input id="contactPhone" type="tel" value={settings.contactPhone} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactEmail">Contact Email</Label>
                            <Input id="contactEmail" type="email" value={settings.contactEmail} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="contactAddress">Contact Address</Label>
                            <Input id="contactAddress" value={settings.contactAddress} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="officeHours">Office Hours</Label>
                            <Input id="officeHours" value={settings.officeHours} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="aboutImageUrl">About Section Image URL</Label>
                            <Input id="aboutImageUrl" value={settings.aboutImageUrl} onChange={handleInputChange} placeholder="https://placehold.co/600x450.png"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactImageUrl">Contact Section Image URL</Label>
                            <Input id="contactImageUrl" value={settings.contactImageUrl} onChange={handleInputChange} placeholder="https://placehold.co/600x400.png"/>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="schoolDataUrl">School Data App URL</Label>
                            <Input id="schoolDataUrl" value={settings.schoolDataUrl} onChange={handleInputChange} placeholder="https://yourotherapp.com"/>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Manage your administrator account.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </CardContent>
            </Card>

             <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save All Changes</Button>
            </div>
        </div>
    </div>
  );
}
