import React from "react";

const communityImages = [
  "/den.jpeg",
  "/coffe.png",
  "/meetup.jpeg",
  "/community4.jpg",
];

const EventVideoPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section (Video) */}
      

      {/* YouTube Video Section */}
      <div className="w-full max-w-7xl mx-auto mb-8">
        <iframe
          className="w-full h-[500px] rounded-lg shadow-xl"
          src="https://www.youtube.com/embed/your-video-id"  // Replace with actual YouTube video ID
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* DEN Community Images Section (1 row, 2 columns) */}
      <div className="py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Community in Action</h2>
        <div className="max-w-8xl mx-auto px-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {communityImages.slice(0, 2).map((image, index) => (
            <div key={index} className="w-full h-56 bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              <img
                src={image}
                alt={`Community Image ${index + 1}`}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventVideoPage;
