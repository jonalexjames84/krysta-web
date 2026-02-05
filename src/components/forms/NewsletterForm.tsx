"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <p className="text-sm text-sage font-medium">{message}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 rounded-md border border-earth/30 bg-cream px-4 py-2 text-sm text-charcoal placeholder:text-charcoal/50 focus:border-clay focus:outline-none focus:ring-1 focus:ring-clay"
      />
      <Button
        type="submit"
        size="sm"
        isLoading={status === "loading"}
        className="whitespace-nowrap"
      >
        Subscribe
      </Button>
      {status === "error" && (
        <p className="text-sm text-red-500 mt-1">{message}</p>
      )}
    </form>
  );
}
