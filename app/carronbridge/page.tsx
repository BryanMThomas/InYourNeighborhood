"use client";

import { useState } from "react";
import { jobs } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MapPin, Calendar, Wrench, Bell } from "lucide-react";

export default function CarronbridgePage() {
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [showThankYou, setShowThankYou] = useState(false);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);
  const [subscribeInfo, setSubscribeInfo] = useState({
    email: "",
    phone: "",
    notifyByEmail: true,
    notifyBySMS: false,
  });

  // Filter jobs to only show those in Carronbridge (94123, 94124, 94125)
  const carronbridgeJobs = jobs.filter((job) => ["94123", "94124", "94125"].includes(job.zipCode));

  // Function to handle showing interest
  const handleShowInterest = (jobId: string) => {
    console.log("Job ID:", jobId);
    setSelectedJobId(jobId);
    console.log("Selected Job ID:", selectedJobId);
    setShowInterestModal(true);
  };

  // Function to handle interest form submission
  const handleInterestSubmit = () => {
    // In a real app, we would send the interest data to the server
    // For now, we'll just show a thank you message
    setShowInterestModal(false);
    setShowThankYou(true);

    // Reset form
    setContactInfo({
      email: "",
      phone: "",
      message: "",
      consent: false,
    });

    setTimeout(() => {
      setShowThankYou(false);
    }, 3000);
  };

  // Function to handle subscribe form submission
  const handleSubscribeSubmit = () => {
    // In a real app, we would send the subscription data to the server
    // For now, we'll just close the modal
    setShowSubscribeModal(false);

    // Reset form
    setSubscribeInfo({
      email: "",
      phone: "",
      notifyByEmail: true,
      notifyBySMS: false,
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold">In Your Neighborhood</h1>
        <p className="text-muted-foreground">Discover services happening in Carronbridge</p>
      </header>

      <div className="flex justify-center mb-8">
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setShowSubscribeModal(true)}>
          <Bell className="h-4 w-4" />
          Subscribe to Neighborhood Alerts
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {carronbridgeJobs.map((job) => (
          <Card key={job.id} className="overflow-hidden border-accent/20 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{job.jobType}</CardTitle>
                <Badge
                  className={
                    job.status === "On Site"
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : job.status === "Scheduled"
                      ? "bg-accent text-accent-foreground hover:bg-accent/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  }
                >
                  {job.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{job.serviceProviderName}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span className="text-sm">Approximately {Math.floor(Math.random() * 3) + 0.1} miles from you in Carronbridge</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                  <div className="text-sm">
                    <div>{formatDate(job.dateTime)}</div>
                    <div className="text-muted-foreground">{formatTime(job.dateTime)}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Wrench className="h-4 w-4 mt-1 text-muted-foreground" />
                  <span className="text-sm">{job.description}</span>
                </div>
                <Button className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => handleShowInterest(job.id)}>
                  Interested in this service?
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interest Modal */}
      <Dialog open={showInterestModal} onOpenChange={setShowInterestModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Interested in this service?</DialogTitle>
            <DialogDescription>Leave your contact information and we&apos;ll connect you with the service provider.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone (optional)
              </label>
              <Input
                id="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message (optional)
              </label>
              <Textarea
                id="message"
                value={contactInfo.message}
                onChange={(e) => setContactInfo({ ...contactInfo, message: e.target.value })}
                placeholder="Tell us more about what you need..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="consent" checked={contactInfo.consent} onCheckedChange={(checked) => setContactInfo({ ...contactInfo, consent: checked })} />
              <label htmlFor="consent" className="text-sm">
                I consent to being contacted about this service
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInterestModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleInterestSubmit} disabled={!contactInfo.email || !contactInfo.consent}>
              Submit Interest
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Subscribe Modal */}
      <Dialog open={showSubscribeModal} onOpenChange={setShowSubscribeModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Subscribe to Neighborhood Alerts</DialogTitle>
            <DialogDescription>Get notified when new services are scheduled in your neighborhood.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label htmlFor="subscribe-email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="subscribe-email"
                type="email"
                value={subscribeInfo.email}
                onChange={(e) => setSubscribeInfo({ ...subscribeInfo, email: e.target.value })}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="subscribe-phone" className="text-sm font-medium">
                Phone (for SMS alerts)
              </label>
              <Input
                id="subscribe-phone"
                type="tel"
                value={subscribeInfo.phone}
                onChange={(e) => setSubscribeInfo({ ...subscribeInfo, phone: e.target.value })}
                placeholder="(555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium">Notification Preferences</p>
              <div className="flex items-center space-x-2">
                <Switch
                  id="notify-email"
                  checked={subscribeInfo.notifyByEmail}
                  onCheckedChange={(checked) => setSubscribeInfo({ ...subscribeInfo, notifyByEmail: checked })}
                />
                <label htmlFor="notify-email" className="text-sm">
                  Email Notifications
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="notify-sms"
                  checked={subscribeInfo.notifyBySMS}
                  onCheckedChange={(checked) => setSubscribeInfo({ ...subscribeInfo, notifyBySMS: checked })}
                />
                <label htmlFor="notify-sms" className="text-sm">
                  SMS Notifications
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSubscribeModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubscribeSubmit} disabled={!subscribeInfo.email || (!subscribeInfo.notifyByEmail && !subscribeInfo.notifyBySMS)}>
              Subscribe
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Thank You Message */}
      {showThankYou && (
        <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
          <div className="flex items-center">
            <div className="py-1">
              <svg className="fill-current h-6 w-6 text-green-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Thank you for your interest!</p>
              <p className="text-sm">The service provider will contact you soon.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
