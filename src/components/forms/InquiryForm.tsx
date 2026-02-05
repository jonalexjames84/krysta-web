"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Input, Textarea } from "@/components/ui";

const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
      } else {
        const result = await response.json();
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-lg bg-sage/10 p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-sage"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        <h3 className="mt-4 font-serif text-xl text-charcoal">
          Message Sent!
        </h3>
        <p className="mt-2 text-charcoal/70">
          Thank you for reaching out. I&apos;ll get back to you as soon as possible.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Input
          label="Name"
          placeholder="Your name"
          error={errors.name?.message}
          {...register("name")}
        />
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <Input
        label="Subject (optional)"
        placeholder="What is this regarding?"
        error={errors.subject?.message}
        {...register("subject")}
      />

      <Textarea
        label="Message"
        placeholder="Tell me about your project or inquiry..."
        rows={6}
        error={errors.message?.message}
        {...register("message")}
      />

      {status === "error" && (
        <p className="text-sm text-red-500">{errorMessage}</p>
      )}

      <Button type="submit" isLoading={status === "loading"} className="w-full">
        Send Message
      </Button>
    </form>
  );
}
