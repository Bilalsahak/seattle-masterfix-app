import type { ServiceSlug } from "../../../src/content/services";
import { site } from "@/data/publicContent";

export type EstimateRequestInput = {
  fullName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  serviceSlug: ServiceSlug;
  projectDescription: string;
  timeline: string;
  privacyConsent: boolean;
};

export const isEstimateSubmissionConfigured = Boolean(site.formspree);

export function validateEstimateRequest(input: EstimateRequestInput): string | null {
  const fullName = input.fullName.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const propertyAddress = input.propertyAddress.trim();
  const projectDescription = input.projectDescription.trim();
  const timeline = input.timeline.trim();

  if (fullName.length < 2 || fullName.length > 120) return "Enter your name (up to 120 characters).";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Enter a valid email address.";
  }
  if (phone.length > 40) return "Keep the phone number under 40 characters.";
  if (propertyAddress.length < 5 || propertyAddress.length > 300) {
    return "Enter the project address (up to 300 characters).";
  }
  if (projectDescription.length < 10 || projectDescription.length > 4000) {
    return "Describe the work in 10 to 4,000 characters.";
  }
  if (timeline.length > 300) return "Keep the timeline under 300 characters.";
  if (!input.privacyConsent) return "Please agree to the privacy notice to continue.";
  return null;
}

export async function submitEstimateRequest(input: EstimateRequestInput): Promise<void> {
  if (!isEstimateSubmissionConfigured) {
    throw new Error("Estimate requests are not available right now. Please call or email us.");
  }

  const form = new FormData();
  form.append("_subject", `Estimate request from app — ${input.serviceSlug}`);
  form.append("_gotcha", "");
  form.append("name", input.fullName.trim());
  form.append("email", input.email.trim());
  form.append("phone", input.phone.trim());
  form.append("address", input.propertyAddress.trim());
  form.append("projectTypes", input.serviceSlug);
  form.append("details", input.projectDescription.trim());
  form.append("timeline", input.timeline.trim());
  form.append("contactConsent", "Agreed: may contact by phone or email about this request");
  form.append("smsConsent", "No: did not opt in to text messages");
  form.append("consentRecordedAt", new Date().toISOString());
  form.append("source", "Seattle MasterFix app");

  let response: Response;
  try {
    response = await fetch(site.formspree, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
    });
  } catch (error) {
    console.error("Estimate request could not reach Formspree", error);
    throw new Error("We could not reach the estimate service. Please try again or call us.");
  }

  if (!response.ok) {
    throw new Error("We could not send your request. Please try again or call us.");
  }
}
