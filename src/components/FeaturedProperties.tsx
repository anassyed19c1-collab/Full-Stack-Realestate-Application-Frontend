import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const properties = [
  {
    id: 1,
    price: "PKR 2.5 Crore",
    location: "DHA Karachi",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 2,
    price: "PKR 1.8 Crore",
    location: "Bahria Town",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
  },
  {
    id: 3,
    price: "PKR 3.2 Crore",
    location: "Clifton",
    image:
      "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=1128&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="py-20 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <h2 className="text-3xl text-black font-bold mb-10 ">
          Featured Properties
        </h2>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {properties.map((property) => (
            <Card
              key={property.id}
              className="bg-gray-900 border-gray-800 overflow-hidden hover:shadow-xl transition duration-300"
            >
              {/* Image */}
              <img
                src={property.image}
                className="h-52 w-full object-cover"
              />

              {/* Content */}
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {property.price}
                </h3>

                <p className="text-sm text-gray-300">
                  {property.location}
                </p>

                <Button className="mt-4 w-full bg-white text-black hover:bg-gray-200">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}