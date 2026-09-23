import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  locationOptions,
  shiftOptions,
  brokenPartsOptions,
} from "@/app/lib/formConfig";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const locationId = formData.get("locationId") as string;
    const shift = formData.get("shift") as string;
    const cartNumber = formData.get("cartNumber") as string;
    const brokenPartsJson = formData.get("brokenParts") as string;
    const reportedBy = formData.get("reportedBy") as string;
    const photo = formData.get("photo") as File | null;

    if (!locationId || !shift || !cartNumber || !reportedBy) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const location = locationOptions.find((l) => l.id === locationId);
    if (!location) {
      return NextResponse.json({ error: "Invalid location" }, { status: 400 });
    }

    const brokenPartIds: string[] = brokenPartsJson
      ? JSON.parse(brokenPartsJson)
      : [];
    const brokenPartLabels = brokenPartIds
      .map((id) => brokenPartsOptions.find((o) => o.id === id)?.en ?? id)
      .join(", ");

    const shiftLabel = shiftOptions.find((s) => s.id === shift)?.en ?? shift;

    const attachments = [];
    if (photo && photo.size > 0) {
      const buffer = Buffer.from(await photo.arrayBuffer());
      attachments.push({
        filename: photo.name || "photo.jpg",
        content: buffer,
      });
    }

    await transporter.sendMail({
      from: `"EVS Cart Repair" <${process.env.GMAIL_USER}>`,
      to: location.email,
      subject: `Cart Repair Request — ${location.label} — Cart #${cartNumber}`,
      text: `
Location: ${location.label}
Shift: ${shiftLabel}
Cart Number: ${cartNumber}
Broken/Missing: ${brokenPartLabels || "None specified"}
Reported By: ${reportedBy}
      `.trim(),
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
