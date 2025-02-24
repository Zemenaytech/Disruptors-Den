"use client";

import React from "react";

import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

export function EligibilityCheck() {
  const rightForYou = [
    {
      text: "You're passionate about innovation and entrepreneurship in Africa",
      highlight: "passionate about innovation",
    },
    {
      text: "You're building or planning to build a scalable venture that creates impact",
      highlight: "scalable venture",
    },
    {
      text: "You believe in the power of community and collaborative growth",
      highlight: "collaborative growth",
    },
    {
      text: "You're committed to learning, sharing knowledge, and contributing to the ecosystem",
      highlight: "learning and sharing",
    },
    {
      text: "You're ready to embrace challenges and turn them into opportunities",
      highlight: "embrace challenges",
    },
  ];

  const notForYou = [
    {
      text: "You're looking for quick success without putting in the work",
      highlight: "quick success",
    },
    {
      text: "You prefer working in isolation and don't value community support",
      highlight: "working in isolation",
    },
    {
      text: "You're not open to feedback, learning, or personal growth",
      highlight: "not open to feedback",
    },
    {
      text: "You're focused solely on profit without considering social impact",
      highlight: "solely on profit",
    },
    {
      text: "You're not willing to actively participate and contribute to the community",
      highlight: "not willing to participate",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      <div className="container relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Is The Disruptors Den Right For You?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're building a community of passionate entrepreneurs who are
            committed to making a difference. See if you're a good fit.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          {/* Right For You Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-xl font-semibold text-green-600">
              <CheckCircle className="h-6 w-6" />
              <h3>Right For You If...</h3>
            </div>
            <div className="space-y-4">
              {rightForYou.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-3 items-start p-4 rounded-lg bg-white shadow-sm border border-green-100 hover:shadow-md transition-shadow"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-none mt-0.5" />
                  <p className="text-gray-600">
                    {item.text.split(item.highlight).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="font-semibold text-green-700">
                            {item.highlight}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Not For You Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-xl font-semibold text-red-600">
              <XCircle className="h-6 w-6" />
              <h3>Not For You If...</h3>
            </div>
            <div className="space-y-4">
              {notForYou.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-3 items-start p-4 rounded-lg bg-white shadow-sm border border-red-100 hover:shadow-md transition-shadow"
                >
                  <XCircle className="h-5 w-5 text-red-500 flex-none mt-0.5" />
                  <p className="text-gray-600">
                    {item.text.split(item.highlight).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <span className="font-semibold text-red-700">
                            {item.highlight}
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600 mb-6">
            Ready to join a community of passionate entrepreneurs?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-colors"
          >
            Apply to Join
          </motion.button>
        </div>
      </div>
    </section>
  );
}
