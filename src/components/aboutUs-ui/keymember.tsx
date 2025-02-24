import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  { name: "Alex Innovator", role: "Visionary Lead", image: "/placeholder.svg?height=200&width=200" },
  { name: "Sam Disruptor", role: "Innovation Catalyst", image: "/placeholder.svg?height=200&width=200" },
  { name: "Jordan Futurist", role: "Strategy Architect", image: "/placeholder.svg?height=200&width=200" },
  { name: "Taylor Tech", role: "AI Specialist", image: "/placeholder.svg?height=200&width=200" },
  { name: "Morgan Venture", role: "Investment Guru", image: "/placeholder.svg?height=200&width=200" },
  { name: "Casey Creator", role: "Design Maverick", image: "/placeholder.svg?height=200&width=200" },
  { name: "Riley Robotics", role: "Automation Expert", image: "/placeholder.svg?height=200&width=200" },
  { name: "Quinn Quantum", role: "Quantum Computing Lead", image: "/placeholder.svg?height=200&width=200" },
]

export function DisruptiveMinds() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {teamMembers.map((member) => (
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
  )
}

