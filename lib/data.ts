// Mock data for the "In Your Neighborhood" application

export type JobStatus = "Tentative" | "Scheduled" | "On Site" | "Completed";

export type Job = {
  id: string;
  address: string;
  zipCode: string;
  dateTime: string;
  jobType: string;
  status: JobStatus;
  serviceProviderName: string;
  description?: string;
};

export type NearbyAddress = {
  id: string;
  address: string;
  zipCode: string;
  distance: number; // in miles
};

export type CustomerInterest = {
  id: string;
  jobId: string;
  email?: string;
  phone?: string;
  createdAt: string;
  message?: string;
};

export type Campaign = {
  id: string;
  jobId: string;
  addresses: string[]; // Array of address IDs
  message: string;
  type: "SMS" | "Postcard";
  sentAt: string;
};

// Mock jobs data
export const jobs: Job[] = [
  {
    id: "1",
    address: "123 Main St, Carronbridge, CA 94123",
    zipCode: "94123",
    dateTime: "2025-04-01T10:00:00Z",
    jobType: "Plumbing Repair",
    status: "Scheduled",
    serviceProviderName: "Quick Fix Plumbing",
    description: "Fixing a leaky pipe under the kitchen sink",
  },
  {
    id: "2",
    address: "456 Oak Ave, Carronbridge, CA 94123",
    zipCode: "94123",
    dateTime: "2025-04-02T14:30:00Z",
    jobType: "Electrical Installation",
    status: "Scheduled",
    serviceProviderName: "Bright Spark Electric",
    description: "Installing new ceiling fans in living room and bedroom",
  },
  {
    id: "3",
    address: "789 Pine Rd, Carronbridge, CA 94123",
    zipCode: "94123",
    dateTime: "2025-04-03T09:00:00Z",
    jobType: "Landscaping",
    status: "Tentative",
    serviceProviderName: "Green Thumb Gardens",
    description: "Front yard redesign with drought-resistant plants",
  },
  {
    id: "4",
    address: "101 Cedar Ln, Carronbridge, CA 94123",
    zipCode: "94123",
    dateTime: "2025-04-01T13:00:00Z",
    jobType: "HVAC Maintenance",
    status: "Scheduled",
    serviceProviderName: "Cool Air Services",
    description: "Annual AC system maintenance and filter replacement",
  },
  {
    id: "5",
    address: "202 Maple Dr, Carronbridge, CA 94124",
    zipCode: "94124",
    dateTime: "2025-04-02T11:00:00Z",
    jobType: "Roof Repair",
    status: "Scheduled",
    serviceProviderName: "Top Notch Roofing",
    description: "Fixing damaged shingles and gutter cleaning",
  },
  {
    id: "6",
    address: "303 Birch Blvd, Carronbridge, CA 94124",
    zipCode: "94124",
    dateTime: "2025-04-03T15:00:00Z",
    jobType: "Interior Painting",
    status: "Tentative",
    serviceProviderName: "Perfect Stroke Painters",
    description: "Painting living room, kitchen, and hallway",
  },
  {
    id: "7",
    address: "404 Elm St, Carronbridge, CA 94124",
    zipCode: "94124",
    dateTime: "2025-04-04T10:00:00Z",
    jobType: "Window Cleaning",
    status: "Scheduled",
    serviceProviderName: "Crystal Clear Windows",
    description: "Full house window cleaning, inside and out",
  },
  {
    id: "8",
    address: "505 Walnut Ave, Carronbridge, CA 94125",
    zipCode: "94125",
    dateTime: "2025-04-01T09:30:00Z",
    jobType: "Carpet Cleaning",
    status: "On Site",
    serviceProviderName: "Fresh Start Cleaners",
    description: "Deep cleaning carpets in all bedrooms and living room",
  },
];

// Mock nearby addresses data
export const nearbyAddresses: Record<string, NearbyAddress[]> = {
  "94123": [
    {
      id: "a1",
      address: "125 Main St, Carronbridge, CA 94123",
      zipCode: "94123",
      distance: 0.1,
    },
    {
      id: "a2",
      address: "127 Main St, Carronbridge, CA 94123",
      zipCode: "94123",
      distance: 0.1,
    },
    {
      id: "a3",
      address: "130 Main St, Carronbridge, CA 94123",
      zipCode: "94123",
      distance: 0.2,
    },
    {
      id: "a4",
      address: "458 Oak Ave, Carronbridge, CA 94123",
      zipCode: "94123",
      distance: 0.1,
    },
    {
      id: "a5",
      address: "460 Oak Ave, Carronbridge, CA 94123",
      zipCode: "94123",
      distance: 0.1,
    },
  ],
  "94124": [
    {
      id: "b1",
      address: "204 Maple Dr, Carronbridge, CA 94124",
      zipCode: "94124",
      distance: 0.1,
    },
    {
      id: "b2",
      address: "206 Maple Dr, Carronbridge, CA 94124",
      zipCode: "94124",
      distance: 0.1,
    },
    {
      id: "b3",
      address: "305 Birch Blvd, Carronbridge, CA 94124",
      zipCode: "94124",
      distance: 0.1,
    },
    {
      id: "b4",
      address: "307 Birch Blvd, Carronbridge, CA 94124",
      zipCode: "94124",
      distance: 0.2,
    },
  ],
  "94125": [
    {
      id: "c1",
      address: "507 Walnut Ave, Carronbridge, CA 94125",
      zipCode: "94125",
      distance: 0.1,
    },
    {
      id: "c2",
      address: "509 Walnut Ave, Carronbridge, CA 94125",
      zipCode: "94125",
      distance: 0.1,
    },
    {
      id: "c3",
      address: "511 Walnut Ave, Carronbridge, CA 94125",
      zipCode: "94125",
      distance: 0.2,
    },
  ],
};

// Mock customer interest data
export const customerInterest: CustomerInterest[] = [
  {
    id: "i1",
    jobId: "2",
    email: "john.doe@example.com",
    createdAt: "2025-03-20T15:30:00Z",
    message: "I need similar work done at my house.",
  },
  {
    id: "i2",
    jobId: "4",
    phone: "555-123-4567",
    createdAt: "2025-03-21T10:15:00Z",
    message: "Please contact me about AC maintenance.",
  },
  {
    id: "i3",
    jobId: "5",
    email: "sarah.smith@example.com",
    createdAt: "2025-03-22T14:45:00Z",
    message: "I have a similar issue with my roof.",
  },
];

// Mock campaigns data
export const campaigns: Campaign[] = [
  {
    id: "c1",
    jobId: "1",
    addresses: ["a1", "a2", "a3"],
    message: "Your neighbor at 123 Main St is getting plumbing work done. Need similar services?",
    type: "SMS",
    sentAt: "2025-03-25T11:00:00Z",
  },
  {
    id: "c2",
    jobId: "5",
    addresses: ["b1", "b2"],
    message: "Roof repair happening in your neighborhood. Contact us for a free inspection!",
    type: "Postcard",
    sentAt: "2025-03-26T09:30:00Z",
  },
];

// Helper function to get nearby addresses for a job
export function getNearbyAddressesForJob(job: Job): NearbyAddress[] {
  return nearbyAddresses[job.zipCode] || [];
}

// Helper function to filter jobs by zip code
export function getJobsByZipCode(zipCode: string): Job[] {
  return jobs.filter((job) => job.zipCode === zipCode);
}

// Helper function to get a job by ID
export function getJobById(id: string): Job | undefined {
  return jobs.find((job) => job.id === id);
}
