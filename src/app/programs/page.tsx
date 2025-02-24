import Image from "next/image"

export default function ProgramsPage() {
  const programs = [
    
    {
      title: "Disruptors Media",
      description:
        "Our flagship media platform showcasing success stories, insights, and strategies from leading entrepreneurs. Through compelling content and engaging narratives, we amplify the voices of disruptive innovators and share valuable business lessons.",
      image: "/media.jpeg?height=600&width=800",
    },
    {
      title: "Business እናውጋ",
      description:
        "A unique discussion forum where entrepreneurs gather to share experiences, challenges, and solutions. This program creates a supportive environment for meaningful business conversations and knowledge exchange.",
      image: "/enawga.jpeg?height=600&width=800",
    },
    {
      title: "Disruptors Academy",
      description:
        "An intensive learning program designed to equip entrepreneurs with practical skills and knowledge. Our curriculum covers essential business aspects from strategy to execution, taught by experienced industry leaders.",
      image: "/academy.jpeg?height=600&width=800",
    },
    {
      title: "Weekly Coffee Meetup",
      description:
        "Informal yet powerful networking sessions where entrepreneurs connect, share insights, and build lasting relationships. These meetups foster collaboration and create opportunities for business growth.",
      image: "/coffe.png?height=600&width=800",
    },
    {
      title: "Disruptors Adventure",
      description:
        "An immersive experience program that takes entrepreneurs on transformative business journeys. Combining learning with adventure, participants gain unique perspectives and innovative approaches to business challenges.",
      image: "/adventure.jpeg?height=600&width=800",
    },
    {
      title: "ካስማ",
      description:
        "A specialized program focusing on advanced business strategies and growth techniques. Tailored for ambitious entrepreneurs ready to scale their operations and achieve breakthrough results.",
      image: "/kasma.jpeg?height=600&width=800",
    },
  ]

  return (
    <div className="w-full">
      <div className="container mx-auto py-12 px-4 md:py-16 lg:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 md:mb-24">Our Programs</h1>

        <div className="space-y-16 md:space-y-32">
          {programs.map((program, index) => (
            <section key={program.title} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className={`relative h-[300px] md:h-[400px] lg:h-[500px] ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <Image
                  src={program.image || "/placeholder.svg"}
                  alt={program.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className={`space-y-4 md:space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">{program.title}</h2>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{program.description}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

