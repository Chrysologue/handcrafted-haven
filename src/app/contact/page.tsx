"use client";

import { useState, useRef } from "react";

export default function Page(){
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (isSubmitting) return; 
        
        setIsSubmitting(true);
        setSubmitMessage("");

        const formData = new FormData(e.currentTarget);
        const data = {
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        };

        console.log("Submitting form data:", data);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            console.log("Response status:", response.status);
            console.log("Response ok:", response.ok);

            const result = await response.json();
            console.log("Response data:", result);

            if (response.ok) {
                setSubmitMessage("Thank you! Your message has been sent successfully.");
                // Reset the form using the ref
                if (formRef.current) {
                    formRef.current.reset();
                }
            } else {
                setSubmitMessage(result.error || "Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setSubmitMessage("An error occurred. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return(
        <section className="min-h-screen bg-zinc-50 dark:bg-black text-[var(--foreground)] py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold font-roboto-slab mb-4">
                        Get in Touch
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Have questions about our handcrafted products or want to connect with our artisans? 
                        We&apos;d love to hear from you. Reach out and let&apos;s create something beautiful together.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                        <h2 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Send us a Message</h2>
                        <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-[var(--foreground)]"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-[var(--foreground)]"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-[var(--foreground)]"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-[var(--foreground)]"
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="products">Product Questions</option>
                                    <option value="artisan">Become an Artisan</option>
                                    <option value="support">Customer Support</option>
                                    <option value="partnership">Partnership Opportunities</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-[var(--foreground)] resize-vertical"
                                    placeholder="Tell us how we can help you..."
                                    required
                                ></textarea>
                            </div>
                            {submitMessage && (
                                <div className={`p-4 rounded-md ${submitMessage.includes("Thank you") ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"}`}>
                                    {submitMessage}
                                </div>
                            )}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        {/* Contact Details */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Contact Information</h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <i className="fas fa-envelope text-blue-600 mr-4 text-xl"></i>
                                    <div>
                                        <p className="font-medium text-[var(--foreground)]">Email</p>
                                        <p className="text-gray-600 dark:text-gray-300">contact@handcraftedhaven.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-phone text-blue-600 mr-4 text-xl"></i>
                                    <div>
                                        <p className="font-medium text-[var(--foreground)]">Phone</p>
                                        <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-map-marker-alt text-blue-600 mr-4 text-xl"></i>
                                    <div>
                                        <p className="font-medium text-[var(--foreground)]">Address</p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            123 Artisan Street<br />
                                            Craft City, CC 12345<br />
                                            United States
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <i className="fas fa-clock text-blue-600 mr-4 text-xl"></i>
                                    <div>
                                        <p className="font-medium text-[var(--foreground)]">Business Hours</p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            Mon - Fri: 9:00 AM - 6:00 PM<br />
                                            Sat: 10:00 AM - 4:00 PM<br />
                                            Sun: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-semibold mb-6 text-[var(--foreground)]">Follow Us</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-6">
                                Stay connected and discover new handcrafted treasures on our social media channels.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200"
                                    aria-label="Facebook"
                                >
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a
                                    href="#"
                                    className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full transition-colors duration-200"
                                    aria-label="Instagram"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a
                                    href="#"
                                    className="bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-full transition-colors duration-200"
                                    aria-label="Twitter"
                                >
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a
                                    href="#"
                                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors duration-200"
                                    aria-label="Pinterest"
                                >
                                    <i className="fab fa-pinterest"></i>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}