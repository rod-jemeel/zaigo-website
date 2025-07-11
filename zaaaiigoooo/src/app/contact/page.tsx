"use client"

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Footer from '@/components/layout/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type FormData = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const form = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      form.reset();
    }, 3000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="relative min-h-[calc(100vh-80px)] pt-16">
          <div className="relative grid lg:grid-cols-[2fr,3fr] min-h-[calc(100vh-80px-4rem)]">
            {/* Left Side - Contact Information */}
            <div className={cn(
              "relative bg-background lg:border-r-2 border-gray-100",
              isMobile && !showContactInfo && "hidden"
            )}>
              <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] flex flex-col justify-between p-8 lg:p-12 xl:p-16">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                    Let's build something amazing together
                  </h1>
                  <p className="text-base text-muted-foreground mb-12">
                    We're here to help you transform your vision into reality
                  </p>

                  <div className="space-y-8">
                    <div>
                      <h3 className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">
                        Email Us
                      </h3>
                      <a 
                        href="mailto:info@zaigo.ai" 
                        className="text-base hover:text-primary transition-colors"
                      >
                        info@zaigo.ai
                      </a>
                    </div>

                    <div>
                      <h3 className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">
                        Office Location
                      </h3>
                      <div>
                        <p className="font-medium">Greater New York City Area</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-primary font-semibold uppercase tracking-wider text-sm mb-3">
                        Connect With Us
                      </h3>
                      <div className="flex gap-4">
                        <a 
                          href="https://www.linkedin.com/company/zaigo-ai/" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full border-2 border-gray-100 hover:border-primary/20 hover:text-primary transition-all flex items-center justify-center"
                        >
                          <span className="sr-only">LinkedIn</span>
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Response time: Within 24 hours</p>
                  <p>Available: Monday - Friday, 9AM - 6PM EST</p>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className={cn(
              "p-8 lg:p-12 xl:p-16 flex items-center",
              isMobile && showContactInfo && "hidden"
            )}>
              <div className="w-full max-w-xl mx-auto">
                {/* Mobile toggle button */}
                {isMobile && (
                  <button
                    onClick={() => setShowContactInfo(!showContactInfo)}
                    className="lg:hidden mb-6 text-sm text-primary hover:underline flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {showContactInfo ? "Show form" : "View contact information"}
                  </button>
                )}
                {!isSubmitted ? (
                  <>
                    <h2 className="text-3xl md:text-4xl font-semibold mb-2">Start a Conversation</h2>
                    <p className="text-muted-foreground mb-8">
                      Fill out the form below and we'll get back to you as soon as possible.
                    </p>

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            rules={{ required: "Name is required" }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input 
                                    placeholder="John Doe" 
                                    className="transition-all duration-200"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="email"
                            rules={{ 
                              required: "Email is required",
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                              }
                            }}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="email" 
                                    placeholder="john@example.com" 
                                    className="transition-all duration-200"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Phone Number <span className="text-muted-foreground">(optional)</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="tel" 
                                  placeholder="+1 (555) 000-0000" 
                                  className="transition-all duration-200"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          rules={{ required: "Subject is required" }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="How can we help you?" 
                                  className="transition-all duration-200"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          rules={{ 
                            required: "Message is required",
                            minLength: {
                              value: 10,
                              message: "Message must be at least 10 characters"
                            }
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <textarea
                                  placeholder="Tell us about your project, idea, or question..."
                                  className={cn(
                                    "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-all duration-200",
                                    "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                                    "disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px] resize-none"
                                  )}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="space-y-4">
                          <p className="text-xs text-muted-foreground">
                            By submitting this form, you agree to our{" "}
                            <a href="/privacy-policy" className="underline hover:text-primary transition-colors">
                              Privacy Policy
                            </a>
                            . Your information will be sent to info@zaigo.ai
                          </p>

                          <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className={cn(
                              "w-full rounded-full bg-primary hover:bg-primary/90 text-white",
                              "transition-all duration-300",
                              "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                            size="lg"
                          >
                            {isSubmitting ? (
                              <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Sending...
                              </span>
                            ) : (
                              "Send Message"
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </>
                ) : (
                  <div className="text-center py-12 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-2">Thank you for reaching out!</h3>
                    <p className="text-muted-foreground">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}