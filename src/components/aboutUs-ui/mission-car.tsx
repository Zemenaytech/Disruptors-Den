import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MissionCardProps {
  title: string;
  description: string;
  index: number;
}

export function MissionCard({ title, description, index }: MissionCardProps) {
  return (
    <Card
      className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 border-[#f5aa14]/10 hover:border-[#f5aa14]/50"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.5s ease forwards ${index * 0.1}s`,
      }}
    >
      <CardHeader>
        <CardTitle className="text-xl text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
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
