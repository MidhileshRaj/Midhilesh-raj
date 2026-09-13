"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { database } from "@/lib/firebase";
import { ref, push } from "firebase/database";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

export default function Contact() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    fname: "",
    emailId: "",
    phone: "",
    messageContent: "",
  });

  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.fname.trim()) newErrors.fname = "This field is required.";
    if (!formData.emailId.trim()) {
      newErrors.emailId = "This field is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = "Please enter a valid email address.";
    }
    if (!formData.phone.trim()) newErrors.phone = "This field is required.";
    if (!formData.messageContent.trim() || formData.messageContent.trim().length < 5) {
      newErrors.messageContent = "Please enter at least 5 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const contactRef = ref(database, "ContactForm");
      await push(contactRef, {
        name: formData.fname,
        phone: formData.phone,
        email: formData.emailId,
        message: formData.messageContent,
        timestamp: new Date().toISOString(),
      });
      setSubmitted(true);
      setFormData({ fname: "", emailId: "", phone: "", messageContent: "" });
    } catch (error) {
      console.error("Firebase error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof formData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const { overlayRef, onMouseMove, onMouseLeave } = useMouseSpotlight();

  return (
    <section
      id="contact-section"
      className="relative overflow-hidden py-24 px-6 bg-black"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ opacity: 0, transition: "opacity 0.6s ease" }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <motion.div
          ref={sectionRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <Image
            src="/divider.png"
            alt="divider"
            width={76}
            height={20}
            className="mx-auto"
          />
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Form — col-md-6 */}
          <motion.div
            className="md:w-6/12"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div
                id="form-message-success"
                className="text-white text-base py-4"
              >
                Your message was sent, thank you!
              </div>
            ) : (
              <form
                id="contactForm"
                onSubmit={handleSubmit}
                noValidate
                className="space-y-0"
              >
                {/* Row: Name + Email */}
                <div className="flex flex-col sm:flex-row gap-6 mb-6">
                  {/* Name */}
                  <div className="flex-1">
                    <label
                      htmlFor="fname"
                      className="block text-white/70 text-sm mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="fname"
                      name="fname"
                      type="text"
                      value={formData.fname}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b py-3 text-white text-sm placeholder-transparent focus:outline-none transition-colors ${
                        errors.fname ? "border-red-500" : "border-white/20 focus:border-white"
                      }`}
                    />
                    {errors.fname && (
                      <p className="mt-1 text-xs text-red-400">{errors.fname}</p>
                    )}
                  </div>
                  {/* Email */}
                  <div className="flex-1">
                    <label
                      htmlFor="emailId"
                      className="block text-white/70 text-sm mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="emailId"
                      name="emailId"
                      type="email"
                      value={formData.emailId}
                      onChange={handleChange}
                      className={`w-full bg-transparent border-b py-3 text-white text-sm placeholder-transparent focus:outline-none transition-colors ${
                        errors.emailId ? "border-red-500" : "border-white/20 focus:border-white"
                      }`}
                    />
                    {errors.emailId && (
                      <p className="mt-1 text-xs text-red-400">{errors.emailId}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label
                    htmlFor="phone"
                    className="block text-white/70 text-sm mb-2"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-3 text-white text-sm placeholder-transparent focus:outline-none transition-colors ${
                      errors.phone ? "border-red-500" : "border-white/20 focus:border-white"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label
                    htmlFor="messageContent"
                    className="block text-white/70 text-sm mb-2"
                  >
                    Write your message...
                  </label>
                  <textarea
                    id="messageContent"
                    name="messageContent"
                    rows={7}
                    value={formData.messageContent}
                    onChange={handleChange}
                    className={`w-full bg-transparent border-b py-3 text-white text-sm resize-none focus:outline-none transition-colors ${
                      errors.messageContent ? "border-red-500" : "border-white/20 focus:border-white"
                    }`}
                  />
                  {errors.messageContent && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.messageContent}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="border-2 border-white/50 text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full hover:border-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: "#ffeb12" }}
                  >
                    Send Message
                  </button>
                  {submitting && (
                    <span className="text-white/50 text-sm">Sending...</span>
                  )}
                </div>
              </form>
            )}
          </motion.div>

          {/* Contact Info — col-md-4 */}
          <motion.div
            className="md:w-4/12"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="space-y-8">
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                  Email
                </span>
                <a
                  href="mailto:midhileshraj01@gmail.com"
                  className="text-white hover:text-[#ffeb12] transition-colors"
                >
                  midhileshraj01@gmail.com
                </a>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                  Phone
                </span>
                <a
                  href="tel:+9188*******"
                  className="text-white hover:text-[#ffeb12] transition-colors"
                >
                  +91 884 8664147
                </a>
              </div>
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                  Address
                </span>
                <address className="text-white not-italic leading-relaxed">
                  Kannur
                  <br />
                  Kerala, India
                </address>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
