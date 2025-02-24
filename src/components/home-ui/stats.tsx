export function Stats() {
  const stats = [
    { number: "90+", label: "Weekly Meetups Hosted" },
    { number: "6,000+", label: "Community Members" },
    { number: "3,000+", label: "Entrepreneurs Trained" },
    { number: "800+", label: "Pre-seed Ventures Created" },
    { number: "$150K+", label: "Funds Raised by Members" },
    { number: "50+", label: "Masterclasses Conducted" },
  ];

  return (
    <section className="py-24 bg-blue-400 text-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our Impact
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Making a difference in the entrepreneurial ecosystem
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-yellow-500 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
