import type { ReactNode } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  link: string;
  index: number;
}

export function ProgramCard({
  title,
  description,
  icon,
  link,
  index,
}: ProgramCardProps) {
  return (
    <Card
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-[#f5aa14]/10 hover:border-[#f5aa14]/50"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.5s ease forwards ${index * 0.1}s`,
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">{icon}</div>
          <CardTitle className="text-xl text-primary">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-base">{description}</CardDescription>
        <Link
          href={link}
          className="inline-flex items-center text-[#f5aa14] hover:text-[#f5aa14]/80 font-medium"
        >
          Learn more
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
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
