"use client";

const projects = [
  {
    id: 1,
    name: "Bahria Town Residency",
    location: "Karachi",
    price: "Starting from PKR 80 Lac",
    image:
      "https://images.unsplash.com/photo-1554435493-93422e8220c8?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "DHA Heights",
    location: "Lahore",
    price: "Starting from PKR 1.2 Crore",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
  },
  {
    id: 3,
    name: "Capital Smart City",
    location: "Islamabad",
    price: "Starting from PKR 70 Lac",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
  },
];

export default function FeaturedProjects() {
  return (
    <section className="py-28 bg-black text-white mt-0.5">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-14 text-center">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* BIG CARD */}
          <div className="md:col-span-2 relative h-105 rounded-3xl overflow-hidden group cursor-pointer">
            
            <img
              src={projects[0].image}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

            <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full">
              Featured
            </div>

            <div className="absolute bottom-6 left-6">
              <h3 className="text-3xl font-semibold mb-1">
                {projects[0].name}
              </h3>
              <p className="text-gray-300 text-sm mb-1">
                {projects[0].location}
              </p>
              <p className="mb-4">{projects[0].price}</p>

              <button className="bg-white text-black px-6 py-2 rounded-xl hover:bg-gray-200 transition">
                View Details
              </button>
            </div>
          </div>

          {/* RIGHT SIDE SMALL CARDS */}
          <div className="flex flex-col gap-8">
            
            {projects.slice(1).map((project) => (
              <div
                key={project.id}
                className="relative h-50 rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={project.image}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-semibold">
                    {project.name}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {project.location}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}