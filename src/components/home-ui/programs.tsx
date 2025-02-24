import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const programs = [
  {
    title: "Disruptors Media",
    description:
      "Educational and inspirational resources through Radio, Podcast, Documentary, and TV Segments.",
    icon: "📱",
  },
  {
    title: "Business እናውጋ",
    description:
      "Weekly open discussions on diverse topics, fostering community and collaboration among entrepreneurs.",
    icon: "💬",
  },
  {
    title: "Disruptors Academy",
    description:
      "Workshops, Mentorship Programs, and Interactive Learning Methods for aspiring entrepreneurs.",
    icon: "🎓",
  },
  {
    title: "Weekly Coffee Meetup",
    description:
      "Regular events for community members to bond, recharge, and connect in a casual setting.",
    icon: "☕",
  },
  {
    title: "Disruptors Adventure",
    description:
      "Exciting outdoor activities and team-building events for the entrepreneurial community.",
    icon: "🏃‍♂️",
  },
  {
    title: "ካስማ",
    description:
      "A dedicated hub providing guidance and support for entrepreneurs outside Addis Ababa.",
    icon: "🌟",
  },
];

export function Programs() {
  return (
    <section id="programs" className="py-24 bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive programs designed to support entrepreneurs at every
            stage of their journey.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Card
              key={program.title}
              className="transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="text-4xl mb-4">{program.icon}</div>
                <CardTitle>{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{program.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
