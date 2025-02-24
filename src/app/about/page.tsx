import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MissionCard } from "@/components/aboutUs-ui/mission-card"

export default function AboutPage() {
  const missions = [
    { title: "Disrupt", description: "Challenge the status quo and redefine industry norms." },
    { title: "Innovate", description: "Pioneer groundbreaking solutions that shape the future." },
    { title: "Collaborate", description: "Foster a community of visionaries and change-makers." },
    { title: "Empower", description: "Equip entrepreneurs with the tools and knowledge to succeed." },
    { title: "Impact", description: "Create lasting positive change in the business ecosystem." },
    { title: "Scale", description: "Accelerate growth and amplify success for startups." },
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-b from-background to-secondary">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4 text-primary">Welcome to Disruptors Den</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Where innovation meets opportunity, and visionaries transform industries.
        </p>
      </section>

      {/* Mission and Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Missions</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {missions.map((mission, index) => (
            <MissionCard key={index} title={mission.title} description={mission.description} index={index} />
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Disruptive Minds</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Alex Innovator", role: "Visionary Lead", image: "/placeholder.svg?height=200&width=200" },
            { name: "Sam Disruptor", role: "Innovation Catalyst", image: "/placeholder.svg?height=200&width=200" },
            { name: "Jordan Futurist", role: "Strategy Architect", image: "/placeholder.svg?height=200&width=200" },
          ].map((member) => (
            <Card key={member.name} className="bg-primary/10 backdrop-blur-sm">
              <CardHeader>
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-primary">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Company Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-center">Our Disruptive Journey</h2>
        <div className="space-y-8">
          {[
            { year: 2018, event: "Disruptors Den founded" },
            { year: 2019, event: "Launched first cohort of disruptive startups" },
            { year: 2020, event: "Expanded to virtual incubation programs" },
            { year: 2022, event: "Established global network of innovation hubs" },
            { year: 2023, event: "Pioneered AI-driven startup mentorship platform" },
          ].map((item, index) => (
            <div key={item.year} className="flex items-center">
              <div className="flex-shrink-0 w-24 text-right">
                <span className="font-bold text-primary">{item.year}</span>
              </div>
              <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mx-4"></div>
              <div>{item.event}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Join the Disruption</h2>
        <p className="mb-6 text-muted-foreground">
          Are you ready to challenge the norm and redefine your industry? Join Disruptors Den today.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/apply">Apply Now</Link>
        </Button>
      </section>
    </div>
  )
}

