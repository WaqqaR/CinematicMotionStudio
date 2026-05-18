"use server";

import { Resend } from "resend";
import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: FormDataEntryValue | null, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Honeypot — bots fill hidden fields; humans never see it.
  if (clean(formData.get("company_url"), 200)) {
    return { status: "success" };
  }

  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 200);
  const company = clean(formData.get("company"), 160);
  const project = clean(formData.get("project"), 4000);
  const channels = clean(formData.get("channels"), 300);

  if (!name || !email || !project) {
    return {
      status: "error",
      message: "Please fill in your name, email, and a few words about the product.",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "That email address doesn't look right." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY not set — enquiry not sent.");
    return {
      status: "error",
      message:
        "The form isn't connected yet. Email us directly while we finish setup.",
    };
  }

  const from = process.env.RESEND_FROM || `${site.brand} <onboarding@resend.dev>`;
  // Default destination is site.contactEmail. CONTACT_TO overrides it without
  // a code change — used while Resend is in sandbox mode (can only deliver to
  // the account owner's address). Clear it once a domain is verified.
  const to = process.env.CONTACT_TO?.trim() || site.contactEmail;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `New ${site.brand} enquiry — ${company || name}`,
      text: [
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Company:  ${company || "—"}`,
        `Channels: ${channels || "—"}`,
        "",
        "Product / launch:",
        project,
      ].join("\n"),
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return {
        status: "error",
        message: "Something went wrong sending that. Please try again in a moment.",
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[contact] send failed:", err);
    return {
      status: "error",
      message: "Something went wrong sending that. Please try again in a moment.",
    };
  }
}
