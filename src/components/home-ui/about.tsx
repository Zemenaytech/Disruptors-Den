export function About() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
              Seeing a thriving Africa where innovation knows no bounds
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              The Disruptors Den is committed to connecting, educating, and
              empowering entrepreneurs to redefine success together. We believe
              in the power of community and collaboration to drive innovation
              and growth across Africa.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Our Vision</h3>
                <p className="text-sm text-muted-foreground">
                  A thriving Africa where innovation knows no bounds, empowering
                  entrepreneurs to create lasting impact.
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground">
                  To foster collaboration, provide resources, and build a
                  supportive community for entrepreneurs across Africa.
                </p>
              </div>
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-black rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent" />
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Entrepreneurs collaborating"
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
