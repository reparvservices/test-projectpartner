

// ─── Data ─────────────────────────────────────────────────────────────────────

import BuildersHeader from "../../components/builders/BuildersHeader";
import LiveActivitySection from "../../components/builders/LiveactivitySection";
import NetworkSection from "../../components/builders/NetworkSection";

const liveActivity = [
  {
    name: "Urban Spaces",
    time: "2m ago",
    tag: "New Launch",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    name: "Skyline Const.",
    time: "15m ago",
    tag: "Site Progress",
    image: "https://images.unsplash.com/photo-1600607687644-c7f34a2bfc1b",
  },
  {
    name: "Nova Homes",
    time: "1h ago",
    tag: "Deal Closed",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    name: "Eco Living",
    time: "3h ago",
    tag: "Brochure",
    image: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae",
  },
];

const builders = [
  {
    name: "Prestige Estates",
    location: "Bangalore, Karnataka",
    city: "Bangalore",
    type: "Premium",
    score: "98",
    revenue: "₹450 Cr",
    deals: "₹124 Cr",
    dealCount: "124",
    projects: "12 Sites",
    projectCount: "12",
    partners: "45 Agencies",
    partnerCount: "45",
    contact: "Rajesh Kumar",
    phone: "+91 98765 43210",
    rera: "PRM/KA/RERA/1251",
    update: "launch video reached 2.4k views today.",
    image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1",
  },
  {
    name: "Lodha Group",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    type: "Luxury",
    score: "94",
    revenue: "₹890 Cr",
    deals: "₹340 Cr",
    dealCount: "340",
    projects: "8 Sites",
    projectCount: "8",
    partners: "120 Agencies",
    partnerCount: "120",
    contact: "Priya Sharma",
    phone: "+91 99887 77665",
    rera: "P51700001234",
    update: "Uploaded new brochure for latest tower.",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
  },
  {
    name: "DLF India",
    location: "Gurgaon, Haryana",
    city: "Gurgaon",
    type: "Premium",
    score: "91",
    revenue: "₹620 Cr",
    deals: "₹210 Cr",
    dealCount: "210",
    projects: "18 Sites",
    projectCount: "18",
    partners: "85 Agencies",
    partnerCount: "85",
    contact: "Vikram Singh",
    phone: "+91 91234 56789",
    rera: "HRERA-459/2017",
    update: "Phase 3 occupation certificate received.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e",
  },
  {
    name: "Urban Living",
    location: "Hyderabad, Telangana",
    city: "Hyderabad",
    type: "Affordable",
    score: "82",
    revenue: "₹120 Cr",
    deals: "₹45 Cr",
    dealCount: "45",
    projects: "4 Sites",
    projectCount: "4",
    partners: "15 Agencies",
    partnerCount: "15",
    contact: "Anjali Rao",
    phone: "+91 88899 00112",
    rera: "TS/RERA/992",
    update: "New pricing sheet released for upcoming phase.",
    image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Builders() {
  return (
    <div className="min-h-screen flex flex-col">
      <BuildersHeader />
      <LiveActivitySection items={liveActivity} />
      <NetworkSection builders={builders} />
    </div>
  );
}