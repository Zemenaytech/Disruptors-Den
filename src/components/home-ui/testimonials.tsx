"use client"
import { FaLinkedin } from "react-icons/fa"
import Image from "next/image"

const testimonials = [
  [
    {
      name: "Samuel Tefera",
      handle: "@samtefera",
      image: "/mindOne.jpg",
      content:
        "The Disruptors Academy transformed my startup journey! The mentorship and networking opportunities helped me secure my first round of funding. Forever grateful to @disruptorsden 🚀",
    },
    {
      name: "Bethlehem Kassahun",
      handle: "@bethkass",
      image: "/mindOne.jpg",
      content:
        "Weekly Coffee Meetups at @disruptorsden are pure gold! Connected with amazing founders and found my co-founder here. The community support is unmatched! 💫",
    },
    {
      name: "Michael Alemu",
      handle: "@michaelalemu",
      image: "/mindTwo.jpg",
      content:
        "From idea to launch in 3 months! The Disruptors Den's mentorship program gave me the confidence and tools I needed. Now running a successful tech startup! 🙌",
    },
    {
      name: "Sara Mohammed",
      handle: "@saramohammed",
      image: "/mindTwo.jpg",
      content:
        "Being part of ካስማ program opened doors I never knew existed. @disruptorsden is truly fostering innovation across Ethiopia! 🌟",
    },
  ],
  [
    {
      name: "Dawit Bekele",
      handle: "@dawitbek",
      image: "/mindOne.jpg",
      content:
        "The Business እናውጋ sessions are incredible! Real talk, real solutions, real growth. Thank you @disruptorsden for creating this platform! 💡",
    },
    {
      name: "Helen Tadesse",
      handle: "@helentad",
      image: "/mindTwo.jpg",
      content:
        "Participated in Startup ድግስ and wow! The exposure and investor connections were exactly what my startup needed. @disruptorsden delivers! 🎯",
    },
    {
      name: "Abel Kebede",
      handle: "@abelkeb",
      image: "/mindTwo.jpg",
      content:
        "The Founders Internship program is a game-changer! Learned more in 3 months than I did in years of traditional education. @disruptorsden knows what entrepreneurs need! 📚",
    },
    {
      name: "Lily Girma",
      handle: "@lilygirma",
      image: "/mindTwo.jpg",
      content:
        "From attending my first coffee meetup to launching my startup - what a journey! The @disruptorsden community has been there every step of the way ❤️",
    },
  ],
]

// Flatten all testimonials into a single array
const allTestimonials = [...testimonials[0], ...testimonials[1]]

export function Testimonials() {
  return (
    <section className="py-24 overflow-hidden bg-gradient-to-r from-pink-50 via-white to-pink-50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-white shadow-sm border mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="2">
              <path d="M8 10H8.01M12 10H12.01M16 10H16.01M9 16H5C3.89543 16 3 15.1046 3 14V6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V14C21 15.1046 20.1046 16 19 16H15L12 19L9 16Z" />
            </svg>
            Testimonials
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Public Cheers for Us!</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl">
            Find out how our community members are spreading the word!
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Testimonials Wrapper - Duplicate the content to create a seamless loop */}
        <div className="flex gap-6 py-8 testimonial-marquee" style={{ animation: "marquee 30s linear infinite" }}>
          {/* First set of testimonials */}
          {[...testimonials[0], ...testimonials[1]].map((testimonial, index) => (
            <div
              key={`first-${index}`}
              className="relative flex-none w-[400px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 flex-none">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 leading-none">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{testimonial.handle}</p>
                </div>
                <FaLinkedin color="orange" />
              </div>
              <p className="mt-4 text-gray-600 text-[15px] leading-normal">{testimonial.content}</p>
            </div>
          ))}

          {/* Duplicate the testimonials to create a seamless loop */}
          {allTestimonials.map((testimonial, index) => (
            <div
              key={`second-${index}`}
              className="relative flex-none w-[400px] bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-12 w-12 flex-none">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-900 leading-none">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 mt-1">{testimonial.handle}</p>
                </div>
                <FaLinkedin color="orange" />
              </div>
              <p className="mt-4 text-gray-600 text-[15px] leading-normal">{testimonial.content}</p>
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-pink-50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-pink-50 to-transparent pointer-events-none" />
      </div>

      {/* Add CSS for the animation */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 2));
          }
        }
      `}</style>
    </section>
  )
}

