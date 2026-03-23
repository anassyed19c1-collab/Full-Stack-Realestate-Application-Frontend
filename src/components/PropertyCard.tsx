import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Property } from "@/types";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property._id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Image */}
        <div className="relative h-48 w-full bg-gray-200">
          {property.images.length > 0 ? (
            <Image
              src={property.images[0].url}
              alt={property.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              🏠 No Image
            </div>
          )}
          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            <Badge
              className={
                property.status === "active"
                  ? "bg-green-500"
                  : property.status === "sold"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }
            >
              {property.status.toUpperCase()}
            </Badge>
          </div>
          {/* Type Badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="secondary">
              {property.type.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 text-lg truncate">
            {property.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">
            📍 {property.location.city}, {property.location.province}
          </p>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            PKR {property.price.toLocaleString()}
          </p>
        </CardContent>

        {/* Footer */}
        <CardFooter className="px-4 pb-4 pt-0 flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-3">
            {property.features.bedrooms > 0 && (
              <span>🛏 {property.features.bedrooms} Beds</span>
            )}
            {property.features.bathrooms > 0 && (
              <span>🚿 {property.features.bathrooms} Baths</span>
            )}
          </div>
          <span>
            {property.area.size} {property.area.unit}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}