/**
 * Public business facts shared by the website and native app.
 * Keep platform-specific environment settings in site.ts.
 */
export const site = {
  /** Public / trade name used in headings, logo alt text and the page title. */
  name: "Seattle MasterFix Precision Craftsmanship",
  shortName: "Seattle MasterFix",
  tagline: "Built on trust. Executed with precision.",
  description:
    "Residential and light-commercial remodeling in Seattle and King County, WA: siding, fencing, tile, laminate flooring, drywall, and paint.",
  url: "https://seattlemasterfix.com",
  registeredName: "Seattle MasterFix Precision Craftsmanship",
  registrationNo: "SEATTMP744NL",
  ubi: "605-904-953",
  phone: "(206) 550-4576",
  phoneHref: "tel:+12065504576",
  phoneE164: "+1-206-550-4576",
  email: "Bill@seattlemasterfix.com",
  warrantyTerms: "1-year labor warranty. Details are in the signed contract.",
  address: {
    street: "5415 6th Ave NW",
    city: "Seattle",
    state: "WA",
    zip: "98107",
    full: "5415 6th Ave NW, Seattle, WA 98107",
  },
  addressConfirmed: true,
  serviceArea: "Seattle and King County, WA",
  serviceAreaConfirmed: true,
  homeTurf: ["Ballard", "Greenwood", "Ravenna", "North Seattle"] as const,
  hours: [
    { days: "Mon–Fri", time: "8:00 AM–6:00 PM" },
    { days: "Saturday", time: "9:00 AM–5:00 PM" },
    { days: "Sunday", time: "Closed" },
  ] as const,
  calendly: "https://calendly.com/bill-seattlemasterfix/new-meeting",
  formspree: "https://formspree.io/f/xnjeedlb",
  ga4Id: "G-CE3T16MYB3",
  linkedin: "https://www.linkedin.com/company/seattle-masterfix-precision-craftsmanship/home/",
  businessProfileUrl: "https://share.google/nP2m5EEOoNouPY9bX",
  lniVerifyUrl:
    "https://secure.lni.wa.gov/verify/Detail.aspx?UBI=605904953&LIC=SEATTMP744NL&SAW=",
  policyEffectiveDate: "November 17, 2026",
  venue: "King County, Washington",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services/", label: "Services" },
  { href: "/projects/", label: "Projects" },
  { href: "/property-managers/", label: "Property managers" },
  { href: "/how-we-work/", label: "How we work" },
  { href: "/faq/", label: "FAQ" },
  { href: "/contact/", label: "Contact" },
] as const;

export function getWarrantyTerms(): string | null {
  const terms: string = site.warrantyTerms.trim();
  if (!terms || /TO CONFIRM|^\[.*\]$/i.test(terms)) return null;
  return terms;
}
