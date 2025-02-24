"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is The Disruptors Den and how can it help entrepreneurs?",
    answer:
      "The Disruptors Den is a vibrant entrepreneurial community that provides comprehensive support through mentorship, networking, educational programs, and resources. We help entrepreneurs overcome challenges, accelerate growth, and connect with like-minded individuals who are passionate about innovation and success in Africa.",
  },
  {
    question: "How can I join The Disruptors Den community?",
    answer:
      "Joining our community is simple! You can start by attending our Weekly Coffee Meetups, participating in our online discussions, or enrolling in the Disruptors Academy. We welcome entrepreneurs at all stages of their journey and offer various membership options to suit your needs.",
  },
  {
    question: "What programs do you offer for early-stage startups?",
    answer:
      "We offer several programs tailored for early-stage startups, including our Founders Internship Program, Disruptors Academy workshops, and mentorship opportunities. Our Business እናውጋ sessions also provide valuable insights and networking opportunities for new entrepreneurs.",
  },
  {
    question: "How can I get involved as a mentor or speaker?",
    answer:
      "We're always looking for experienced entrepreneurs and industry experts to join our mentor network. You can contribute by sharing your expertise through our Disruptors Media platform, speaking at our events, or mentoring upcoming entrepreneurs. Contact us to discuss collaboration opportunities.",
  },
  {
    question: "Do you provide funding opportunities for startups?",
    answer:
      "While we don't directly fund startups, we facilitate connections between entrepreneurs and investors through our Startup-Investor Match program. We also help startups prepare for fundraising through workshops and mentorship, and our community has helped members raise over $150K in funding.",
  },
  {
    question:
      "What makes The Disruptors Den different from other entrepreneurial communities?",
    answer:
      "Our unique blend of practical education, real-world networking, and comprehensive support sets us apart. We focus on building lasting relationships and creating tangible impact, with programs specifically designed for the African context. Our track record of success, with over 800 pre-seed ventures created and 3,000+ entrepreneurs trained, speaks to our effectiveness.",
  },
];

export function FaqSection() {
  return (
    <section className="py-24 bg-black">
      <div className="container max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-400">
            Everything you need to know about The Disruptors Den
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400">
            Still have questions?{" "}
            <a
              href="mailto:contact@thedisruptorsden.org"
              className="text-yellow-500 hover:text-yellow-400 font-medium"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      className={cn(
        "rounded-lg transition-all duration-200",
        isOpen ? "bg-yellow-500/10 border border-yellow-500/20" : "bg-gray-900"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full p-6 text-left"
      >
        <span
          className={cn(
            "font-medium text-lg transition-colors",
            isOpen ? "text-yellow-500" : "text-white"
          )}
        >
          {question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            isOpen ? "transform rotate-180 text-yellow-500" : "text-gray-400"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="p-6 pt-0 text-gray-400">{answer}</div>
      </div>
    </div>
  );
}
