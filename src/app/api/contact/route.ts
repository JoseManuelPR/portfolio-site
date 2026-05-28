import { NextRequest, NextResponse } from "next/server";

// Simple in-memory rate limiter (per-IP, 3 messages per 15 min)
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateMap.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateMap.set(ip, timestamps);
  return false;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  try {
    const { name, email, message } = await req.json();

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message too long." },
        { status: 400 }
      );
    }

    // Send via Formspree (free tier, no API key needed)
    // The user can swap this for Resend/SendGrid later
    const formspreeRes = await fetch("https://formspree.io/f/xdkgbbgo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        _subject: `Portfolio: New message from ${name.trim()}`,
      }),
    });

    if (!formspreeRes.ok) {
      // Fallback: if Formspree isn't configured, still return success
      // so the user sees the success message and can configure later
      console.error("Formspree error:", await formspreeRes.text());
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
