import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Check if already subscribed
    const { data: existing } = await supabase
      .from("newsletter_subscribers")
      .select("id, unsubscribed_at")
      .eq("email", email)
      .single();

    if (existing) {
      if (existing.unsubscribed_at) {
        // Re-subscribe
        await supabase
          .from("newsletter_subscribers")
          .update({ unsubscribed_at: null, subscribed_at: new Date().toISOString() })
          .eq("id", existing.id);

        return NextResponse.json({ message: "Welcome back!" });
      }

      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    // Create new subscriber
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    if (error) {
      console.error("Newsletter subscription error:", error);
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
