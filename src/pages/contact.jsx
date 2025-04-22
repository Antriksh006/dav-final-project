import React from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

export function Contact() {
  return (
    <div className="container py-10 space-y-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">Contact Us</h1>
        <p className="text-muted-foreground text-lg">
          Get in touch with our team for support or inquiries
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          <Card className="border-primary/10">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-2xl">Send us a Message</CardTitle>
              <CardDescription className="text-base">
                Fill out the form below and we'll get back to you as soon as possible
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What's this about?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message here..." className="min-h-[150px]" />
              </div>
              <Button className="w-full">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-primary/10">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-2xl">Contact Information</CardTitle>
              <CardDescription className="text-base">
                Reach out to us through any of these channels
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">support@parkinsonsdetection.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-muted-foreground">+91 9876543210</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Address</h3>
                  <p className="text-muted-foreground">
                    Punjab Engineering College<br />
                    Sector 12<br />
                    Chandigarh
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/10">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-2xl">Business Hours</CardTitle>
              <CardDescription className="text-base">
                When you can reach our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 