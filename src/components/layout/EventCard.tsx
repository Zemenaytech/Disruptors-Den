import Image from "next/image"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock, Mic, Users } from "lucide-react"

interface EventCardProps {
  title: string
  image: string
  date: string
  location: string
  time: string
  topic: string
  speakers: string
}

export function EventCard({ title, image, date, location, time, topic, speakers }: EventCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-[420px]">
      <div className="relative w-full" style={{ height: "60%" }}>
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-3 space-y-1.5 flex-grow" style={{ height: "40%" }}>
        <h3 className="text-lg font-semibold text-[#00144b] dark:text-white line-clamp-2">{title}</h3>
        <div className="space-y-1.5 text-sm">
          <p className="flex items-center text-gray-600 dark:text-gray-300 line-clamp-1">
            <CalendarDays className="w-4 h-4 mr-2 text-[#f5aa14] flex-shrink-0" />
            {date || "Date TBA"}
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-300 line-clamp-1">
            <MapPin className="w-4 h-4 mr-2 text-[#f5aa14] flex-shrink-0" />
            {location || "Location TBA"}
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-300 line-clamp-1">
            <Clock className="w-4 h-4 mr-2 text-[#f5aa14] flex-shrink-0" />
            {time || "Time TBA"}
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-300 line-clamp-1">
            <Mic className="w-4 h-4 mr-2 text-[#f5aa14] flex-shrink-0" />
            {topic || "Topic TBA"}
          </p>
          <p className="flex items-center text-gray-600 dark:text-gray-300 line-clamp-1">
            <Users className="w-4 h-4 mr-2 text-[#f5aa14] flex-shrink-0" />
            {speakers || "Speakers TBA"}
          </p>
        </div>
      </div>
      <div className="p-3">
        <Button className="w-full bg-[#f5aa14] hover:bg-[#f5aa14]/90 text-[#00144b] font-medium">Register</Button>
      </div>
    </div>
  )
}

