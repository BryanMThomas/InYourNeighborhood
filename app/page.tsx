import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Calendar, Wrench, Bell, CheckCircle, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Welcome to In Your Neighborhood</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connecting service providers with local customers and helping neighbors discover services happening nearby.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              For Service Providers
            </CardTitle>
            <CardDescription>Streamline your check-ins and generate more leads</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Easy Check-In</h3>
                <p className="text-sm text-muted-foreground">Use GPS to quickly check in at job sites</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Neighborhood Campaigns</h3>
                <p className="text-sm text-muted-foreground">Notify nearby residents about your services</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Lead Generation</h3>
                <p className="text-sm text-muted-foreground">Collect interest from potential customers in the area</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/provider" className="w-full">
              <Button className="w-full">Go to Provider Dashboard</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              For Residents
            </CardTitle>
            <CardDescription>Discover services happening in your neighborhood</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Browse Local Services</h3>
                <p className="text-sm text-muted-foreground">See what services are scheduled in your area</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Get Notifications</h3>
                <p className="text-sm text-muted-foreground">Subscribe to alerts about services you might need</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium">Express Interest</h3>
                <p className="text-sm text-muted-foreground">Easily connect with service providers working nearby</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/carronbridge" className="w-full">
              <Button className="w-full" variant="outline">
                View Carronbridge Services
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </section>

      <section className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Service Providers Check In</h3>
            <p className="text-sm text-muted-foreground">When arriving at a job, providers check in using their location</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Neighbors Get Notified</h3>
            <p className="text-sm text-muted-foreground">Nearby residents can see what services are happening in their area</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Everyone Benefits</h3>
            <p className="text-sm text-muted-foreground">Providers get more leads, residents find trusted local services</p>
          </div>
        </div>
      </section>
    </div>
  );
}
