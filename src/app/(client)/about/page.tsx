"use client";

import type React from "react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MissionCard } from "@/components/aboutUs-ui/mission-card";
import { ProgramCard } from "@/components/aboutUs-ui/program-card";
import { ImpactCounter } from "@/components/aboutUs-ui/impact-counter";
import { Carousel } from "@/components/aboutUs-ui/carousel";
import {
  Phone,
  Mail,
  Linkedin,
  Send,
  ArrowRight,
  Users,
  Lightbulb,
  GraduationCap,
  Building,
  Award,
  Calendar,
} from "lucide-react";

export default function AboutPage() {
  // Refs for scroll navigation
  const introRef = useRef<HTMLElement>(null);
  const programsRef = useRef<HTMLElement>(null);
  const impactRef = useRef<HTMLElement>(null);
  const teamRef = useRef<HTMLElement>(null);
  const collaborationRef = useRef<HTMLElement>(null);

  // Smooth scroll function
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const missions = [
    {
      title: "Disrupt",
      description: "Challenge the status quo and redefine industry norms.",
    },
    {
      title: "Innovate",
      description: "Pioneer groundbreaking solutions that shape the future.",
    },
    {
      title: "Collaborate",
      description: "Foster a community of visionaries and change-makers.",
    },
    {
      title: "Empower",
      description:
        "Equip entrepreneurs with the tools and knowledge to succeed.",
    },
    {
      title: "Impact",
      description: "Create lasting positive change in the business ecosystem.",
    },
    {
      title: "Scale",
      description: "Accelerate growth and amplify success for startups.",
    },
  ];

  const impactMetrics = [
    { metric: "90+", description: "Weekly meetups hosted" },
    { metric: "50+", description: "Masterclasses conducted" },
    {
      metric: "3,000+",
      description: "Individuals trained in entrepreneurship",
    },
    { metric: "1,500+", description: "Graduates" },
    { metric: "800+", description: "Pre-seed ventures created" },
    { metric: "6,000+", description: "Community members" },
    { metric: "8", description: "Adventure activities hosted" },
    { metric: "80+", description: "Startups showcased" },
    { metric: "$150K+", description: "Funds raised for members" },
  ];

  const carouselItems = [
    {
      image: "/kasma.png",
      title: "Fostering Entrepreneurs",
      description: "Building a community of innovators and change-makers",
    },
    {
      image: "/enawga.jpeg",
      title: "Fueling Progress",
      description: "Accelerating growth and amplifying success for startups",
    },
    {
      image: "/coffe.png",
      title: "Connecting Visionaries",
      description:
        "Creating a network of entrepreneurs who redefine success together",
    },
  ];

  const collaborationOptions = [
    {
      title: "Partnerships and Joint Ventures",
      description:
        "Form strategic partnerships to co-create & execute projects, workshops, or events that align with both the community's and your organization's goals.",
      icon: <Users className="h-12 w-12 text-[#f5aa14]" />,
    },
    {
      title: "Mentorship and Expertise Sharing",
      description:
        "Offer your organization's experienced professionals as mentors or advisors to community members.",
      icon: <GraduationCap className="h-12 w-12 text-[#f5aa14]" />,
    },
    {
      title: "Sponsorship Opportunities",
      description:
        "Provide financial support, grants, or investment opportunities for startups and events within the community.",
      icon: <Award className="h-12 w-12 text-[#f5aa14]" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section with Carousel */}
      <section className="relative w-full">
        <Carousel items={carouselItems} />

        {/* Navigation Tabs */}
        <div className="container mx-auto px-4 py-6">
          <Tabs defaultValue="intro" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-primary/10">
              <TabsTrigger
                value="intro"
                onClick={() => scrollToSection(introRef)}
              >
                Introduction
              </TabsTrigger>
              <TabsTrigger
                value="programs"
                onClick={() => scrollToSection(programsRef)}
              >
                Our Programs
              </TabsTrigger>
              <TabsTrigger
                value="impact"
                onClick={() => scrollToSection(impactRef)}
              >
                Impact
              </TabsTrigger>
              <TabsTrigger
                value="team"
                onClick={() => scrollToSection(teamRef)}
              >
                Our Team
              </TabsTrigger>
              <TabsTrigger
                value="collaboration"
                onClick={() => scrollToSection(collaborationRef)}
              >
                Collaboration
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeIn">
              <h1 className="text-4xl md:text-5xl font-bold text-primary">
                The Disruptors Den
              </h1>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-1 bg-[#f5aa14]"></div>
                  <h2 className="text-2xl font-semibold">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  A community providing a vibrant platform for entrepreneurs,
                  fostering collaboration, innovation, and growth through
                  networking, shared resources, and mentorship opportunities.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-1 bg-[#f5aa14]"></div>
                  <h2 className="text-2xl font-semibold">Our Vision</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  Seeing a thriving Africa where innovation knows no bound.
                </p>
              </div>
              <div className="pt-4">
                <Button
                  asChild
                  className="bg-[#f5aa14] hover:bg-[#f5aa14]/90 text-white"
                >
                  <Link
                    href="https://t.me/disruptorsden"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join the Community
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {missions.map((mission, index) => (
                <MissionCard
                  key={mission.title + index}
                  title={mission.title}
                  description={mission.description}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={impactRef} className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Our Impact
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of our key accomplishments that showcase our
              commitment to fostering entrepreneurship.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {impactMetrics.map((item, index) => (
              <ImpactCounter
                key={index}
                metric={item.metric}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-16 bg-primary/5 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Disruptive Minds
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the visionaries behind The Disruptors Den who are passionate
              about fostering entrepreneurship.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Innovator",
                role: "Visionary Lead",
                image: "/mindOne.jpg",
                bio: "Passionate about creating ecosystems where entrepreneurs can thrive and innovate.",
              },
              {
                name: "Sam Disruptor",
                role: "Innovation Catalyst",
                image: "/mindTwo.jpg",
                bio: "Dedicated to breaking barriers and fostering a culture of creative problem-solving.",
              },
              {
                name: "Jordan Futurist",
                role: "Strategy Architect",
                image: "/mindThree.jpg",
                bio: "Focused on building sustainable frameworks for long-term entrepreneurial success.",
              },
            ].map((member, index) => (
              <Card
                key={member.name}
                className="bg-primary/10 backdrop-blur-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      <p>{member.bio}</p>
                    </div>
                  </div>
                </div>
                <CardContent className="text-center py-6">
                  <CardTitle className="text-primary text-xl">
                    {member.name}
                  </CardTitle>
                  <CardDescription className="text-lg mt-1">
                    {member.role}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section ref={collaborationRef} className="py-16 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">
              Collaboration Opportunities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join forces with The Disruptors Den to create meaningful impact in
              the entrepreneurial ecosystem.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {collaborationOptions.map((option, index) => (
              <Card
                key={option.title}
                className="bg-white/50 backdrop-blur-sm border-[#f5aa14]/20 hover:border-[#f5aa14] transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="flex flex-col items-center">
                  <div className="p-3 rounded-full bg-primary/5 mb-4">
                    {option.icon}
                  </div>
                  <CardTitle className="text-xl text-center text-primary">
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button
              asChild
              className="bg-[#f5aa14] hover:bg-[#f5aa14]/90 text-white"
            >
              <Link href="mailto:contact@thedisruptorsden.org">
                Contact Us for Collaboration
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
