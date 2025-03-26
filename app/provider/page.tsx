"use client";

import { useState } from "react";
import { jobs, getNearbyAddressesForJob, NearbyAddress, Job } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CheckCircle, MapPin, Calendar, Wrench } from "lucide-react";

export default function ProviderDashboard() {
  const [jobsData, setJobsData] = useState(jobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [selectedAddresses, setSelectedAddresses] = useState<Record<string, boolean>>({});
  const [campaignMessage, setCampaignMessage] = useState("");
  const [campaignType, setCampaignType] = useState<"SMS" | "Postcard">("SMS");

  // Filter jobs to only show scheduled or on-site ones
  const upcomingJobs = jobsData.filter((job) => job.status === "Scheduled" || job.status === "On Site");

  // Function to handle check-in
  const handleCheckIn = (job: Job) => {
    // In a real app, we would get the user's location here
    // For now, we'll simulate it
    setSelectedJob(job);
  };

  // Function to confirm check-in
  const confirmCheckIn = () => {
    if (!selectedJob) return;

    // Update job status
    const updatedJobs = jobsData.map((job) => (job.id === selectedJob.id ? { ...job, status: "On Site" as const } : job));

    setJobsData(updatedJobs);
    setSelectedJob(null);

    // Show campaign modal after check-in
    setTimeout(() => {
      setShowCampaignModal(true);
    }, 500);
  };

  // Function to handle campaign submission
  const handleCampaignSubmit = () => {
    // In a real app, we would send the campaign data to the server
    // For now, we'll just close the modal
    setShowCampaignModal(false);
    setSelectedAddresses({});
    setCampaignMessage("");
  };

  // Get nearby addresses for the selected job
  const nearbyAddresses = selectedJob ? getNearbyAddressesForJob(selectedJob) : [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
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
      <header className="mb-8">
        <h1 className="text-3xl font-bold">In Your Neighborhood</h1>
        <p className="text-muted-foreground">Service Provider Dashboard</p>
      </header>

      <Card className="mb-8 border-primary/20 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Jobs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Address</TableHead>
                <TableHead>Date/Time</TableHead>
                <TableHead>Job Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <span>{job.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{formatDate(job.dateTime)}</div>
                      <div className="text-muted-foreground">{formatTime(job.dateTime)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-muted-foreground" />
                      {job.jobType}
                    </div>
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    {job.status === "Scheduled" ? (
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground" size="sm" onClick={() => handleCheckIn(job)}>
                        Check In
                      </Button>
                    ) : job.status === "On Site" ? (
                      <Button variant="outline" size="sm" disabled>
                        Checked In
                      </Button>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Check-in confirmation dialog */}
      {selectedJob && (
        <Dialog open={!!selectedJob} onOpenChange={(open) => !open && setSelectedJob(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Check-In</DialogTitle>
              <DialogDescription>We&apos;ve detected your location. Are you checking in at this address?</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{selectedJob.address}</span>
              </div>
              <div className="text-muted-foreground ml-7">
                {formatDate(selectedJob.dateTime)} at {formatTime(selectedJob.dateTime)}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedJob(null)}>
                Cancel
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={confirmCheckIn}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Confirm Check-In
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Neighborhood Campaign Modal */}
      <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Notify the Neighborhood</DialogTitle>
            <DialogDescription>Let nearby residents know about your service. This can help generate leads for similar work.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="text-sm font-medium mb-2">Select nearby addresses:</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto mb-4">
              {nearbyAddresses.map((address: NearbyAddress) => (
                <div key={address.id} className="flex items-center space-x-2">
                  <Switch
                    id={`address-${address.id}`}
                    checked={!!selectedAddresses[address.id]}
                    onCheckedChange={(checked) => {
                      setSelectedAddresses({
                        ...selectedAddresses,
                        [address.id]: checked,
                      });
                    }}
                  />
                  <label htmlFor={`address-${address.id}`} className="text-sm cursor-pointer flex-1">
                    {address.address}
                    <span className="text-muted-foreground ml-2">({address.distance} miles)</span>
                  </label>
                </div>
              ))}
            </div>

            <h3 className="text-sm font-medium mb-2">Customize your message:</h3>
            <Textarea
              value={campaignMessage}
              onChange={(e) => setCampaignMessage(e.target.value)}
              placeholder="We're working in your neighborhood today! Interested in similar services?"
              className="mb-4"
            />

            <div className="flex items-center space-x-4 mb-4">
              <Button variant={campaignType === "SMS" ? "default" : "outline"} size="sm" onClick={() => setCampaignType("SMS")}>
                Send SMS
              </Button>
              <Button variant={campaignType === "Postcard" ? "default" : "outline"} size="sm" onClick={() => setCampaignType("Postcard")}>
                Send Postcard
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCampaignModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleCampaignSubmit}>Send Notification</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
