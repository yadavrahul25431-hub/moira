"use client";

import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Bell, Shield, Key } from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 space-y-6 max-w-5xl mx-auto h-full pb-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight font-heading">Settings</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your MOIRA account preferences and platform configurations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Settings Navigation Sidebar */}
        <div className="md:col-span-3 space-y-2">
          <Button variant="secondary" className="w-full justify-start gap-2 bg-primary/10 text-primary hover:bg-primary/20">
            <User className="h-4 w-4" /> Profile
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Bell className="h-4 w-4" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Shield className="h-4 w-4" /> Security
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:bg-muted/50 hover:text-foreground">
            <Key className="h-4 w-4" /> API Keys
          </Button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-9 space-y-6">
          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details and public profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">First Name</label>
                  <Input defaultValue={user?.firstName} className="bg-background/50 border-border/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <Input defaultValue={user?.lastName} className="bg-background/50 border-border/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <Input defaultValue={user?.email} disabled className="bg-muted/30 border-border/50 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Contact your administrator to change your email address.</p>
              </div>
              <div className="pt-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/60 backdrop-blur-sm border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage your platform experience.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Dark Mode</label>
                  <p className="text-xs text-muted-foreground">MOIRA natively supports a dark theme optimized for low-light environments.</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary flex items-center p-1 justify-end">
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border/50 bg-background/30">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Hardware Acceleration</label>
                  <p className="text-xs text-muted-foreground">Enable WebGL rendering for the Live India Map to improve performance.</p>
                </div>
                <div className="h-6 w-11 rounded-full bg-primary flex items-center p-1 justify-end">
                  <div className="h-4 w-4 rounded-full bg-white"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
