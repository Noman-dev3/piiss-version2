
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";


export default function SettingsPage() {
    const { toast } = useToast();

    const handleSaveChanges = () => {
        toast({
            title: "Settings Saved",
            description: "Your changes have been successfully saved.",
        });
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
                    <CardTitle>General Information</CardTitle>
                    <CardDescription>Update your school's public contact information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="school-name">School Name</Label>
                        <Input id="school-name" defaultValue="PIISS" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input id="contact-email" type="email" defaultValue="noman.dev3@gmail.com" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="contact-phone">Contact Phone</Label>
                        <Input id="contact-phone" type="tel" defaultValue="03191897942" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Education Lane, Knowledge City" />
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
                <Button onClick={handleSaveChanges}>Save Changes</Button>
            </div>
        </div>
    </div>
  );
}
