"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent } from "@/components/ui/card";

interface ImpactCounterProps {
  metric: string;
  description: string;
  index: number;
}

export function ImpactCounter({
  metric,
  description,
  index,
}: ImpactCounterProps) {
  const [displayValue, setDisplayValue] = useState(metric);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Handle the animation completion
  const animationCompleted = useRef(false);

  useEffect(() => {
    // Don't run animation if it's already completed
    if (animationCompleted.current) return;

    // Parse the metric to extract numeric part, prefix, and suffix
    const numericMatch = metric.match(/^([^0-9]*)([0-9,]+)([^0-9]*)$/);

    // If we can't parse it as a simple number, handle special cases
    if (!numericMatch) {
      // Handle special case like "$150K+"
      const specialMatch = metric.match(/^([^0-9]*)([0-9,]+)([KMB]?\+?)$/);

      if (specialMatch) {
        const [_, prefix, numericPart, suffix] = specialMatch;
        const baseNumber = Number.parseInt(numericPart.replace(/,/g, ""));

        if (!isNaN(baseNumber) && inView) {
          // Start the counter animation
          let startTime: number | null = null;
          const duration = 2000; // 2 seconds

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * baseNumber);

            setDisplayValue(`${prefix}${currentCount}${suffix}`);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              // Ensure we display the exact final value
              setDisplayValue(metric);
              animationCompleted.current = true;
            }
          };

          requestAnimationFrame(animate);
        } else {
          // If not numeric or not in view, just display the metric as is
          setDisplayValue(metric);
        }
      } else {
        // If we can't parse it at all, just display the original metric
        setDisplayValue(metric);
      }
      return;
    }

    // Handle standard numeric format
    const [_, prefix, numericPart, suffix] = numericMatch;
    const baseNumber = Number.parseInt(numericPart.replace(/,/g, ""));

    if (!isNaN(baseNumber) && inView) {
      // Start the counter animation
      let startTime: number | null = null;
      const duration = 2000; // 2 seconds

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentCount = Math.floor(progress * baseNumber);

        // Format the number with commas if the original had them
        let formattedCount = currentCount.toString();
        if (numericPart.includes(",")) {
          formattedCount = currentCount.toLocaleString();
        }

        setDisplayValue(`${prefix}${formattedCount}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Ensure we display the exact final value
          setDisplayValue(metric);
          animationCompleted.current = true;
        }
      };

      requestAnimationFrame(animate);
    } else {
      // If not numeric or not in view, just display the metric as is
      setDisplayValue(metric);
    }
  }, [inView, metric]);

  return (
    <Card
      ref={ref}
      className="text-center p-6 hover:shadow-lg transition-all duration-300 border-[#f5aa14]/10 hover:border-[#f5aa14]/50 bg-white/50 backdrop-blur-sm"
      style={{
        opacity: 0,
        animation: inView
          ? `fadeInUp 0.5s ease forwards ${index * 0.1}s`
          : "none",
      }}
    >
      <CardContent className="p-0 space-y-2">
        <h3 className="text-4xl font-bold text-[#f5aa14]">{displayValue}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Card>
  );
}
