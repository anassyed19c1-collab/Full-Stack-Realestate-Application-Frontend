"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import useAuthStore from "@/lib/auth";
import { ApiResponse, Property } from "@/types";

export default function SinglePropertyPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const queryClient = useQueryClient();
  const [activeImage, setActiveImage] = useState(0);

  // Property fetch karo
  const { data, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const response = await api.get<ApiResponse<Property>>(
        `/api/properties/${id}`
      );
      return response.data.data;
    },
  });

  // Wishlist toggle
  const { mutate: toggleWishlist, isPending } = useMutation({
    mutationFn: async () => {
      await api.put(`/api/properties/${id}/wishlist`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["property", id] });
    },
  });

  const isInWishlist = user?.wishlist?.includes(id as string);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Skeleton className="h-96 w-full rounded-xl mb-6" />
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-5xl mb-4">🏠</p>
        <p className="text-xl">Property not found</p>
        <Button className="mt-4" onClick={() => router.push("/properties")}>
          Back to Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-gray-500 hover:text-gray-900 mb-6 flex items-center space-x-1"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          {/* Main Image */}
          <div className="relative h-80 w-full rounded-xl overflow-hidden bg-gray-200 mb-3">
            {data.images.length > 0 ? (
              <Image
                src={data.images[activeImage].url}
                alt={data.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                🏠 No Image
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {data.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {data.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 border-2 ${
                    activeImage === index
                      ? "border-gray-900"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt={`${data.title} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {/* Badges */}
          <div className="flex space-x-2 mb-3">
            <Badge
              className={
                data.status === "active"
                  ? "bg-green-500"
                  : data.status === "sold"
                  ? "bg-red-500"
                  : "bg-blue-500"
              }
            >
              {data.status.toUpperCase()}
            </Badge>
            <Badge variant="secondary">{data.type.toUpperCase()}</Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.title}
          </h1>

          {/* Location */}
          <p className="text-gray-500 mb-4">
            📍 {data.location.address}, {data.location.city},{" "}
            {data.location.province}
          </p>

          {/* Price */}
          <p className="text-4xl font-bold text-gray-900 mb-6">
            PKR {data.price.toLocaleString()}
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {data.features.bedrooms > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl">🛏</p>
                <p className="font-semibold">{data.features.bedrooms}</p>
                <p className="text-gray-500 text-sm">Bedrooms</p>
              </div>
            )}
            {data.features.bathrooms > 0 && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl">🚿</p>
                <p className="font-semibold">{data.features.bathrooms}</p>
                <p className="text-gray-500 text-sm">Bathrooms</p>
              </div>
            )}
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-2xl">📐</p>
              <p className="font-semibold">
                {data.area.size} {data.area.unit}
              </p>
              <p className="text-gray-500 text-sm">Area</p>
            </div>
            {data.features.parking && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl">🚗</p>
                <p className="font-semibold">Available</p>
                <p className="text-gray-500 text-sm">Parking</p>
              </div>
            )}
            {data.features.furnished && (
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <p className="text-2xl">🛋️</p>
                <p className="font-semibold">Yes</p>
                <p className="text-gray-500 text-sm">Furnished</p>
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          {isAuthenticated && (
            <Button
              variant={isInWishlist ? "default" : "outline"}
              className="w-full mb-3"
              onClick={() => toggleWishlist()}
              disabled={isPending}
            >
              {isInWishlist ? "❤️ Remove from Wishlist" : "🤍 Add to Wishlist"}
            </Button>
          )}

          {/* Views */}
          <p className="text-gray-400 text-sm text-center">
            👁 {data.views} views
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
        <p className="text-gray-600 leading-relaxed">{data.description}</p>
      </div>

      {/* Posted By */}
      {data.postedBy && (
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            Posted By
          </h2>
          <p className="font-semibold text-gray-900">{data.postedBy.name}</p>
          <p className="text-gray-500">{data.postedBy.email}</p>
          {data.postedBy.phone && (
            <p className="text-gray-500">📞 {data.postedBy.phone}</p>
          )}
        </div>
      )}
    </div>
  );
}