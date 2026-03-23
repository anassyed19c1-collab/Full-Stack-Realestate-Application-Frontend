"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import PropertyCard from "@/components/PropertyCard";
import api from "@/lib/api";
import { ApiResponse, Property } from "@/types";

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["properties", search, type, city, page],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (type) params.append("type", type);
      if (city) params.append("city", city);
      params.append("page", page.toString());

      const response = await api.get<ApiResponse<Property[]>>(
        `/api/properties?${params.toString()}`
      );
      return response.data;
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
        <p className="text-gray-500 mt-1">Find your dream property</p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search properties..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <Select
          value={type}
          onValueChange={(value) => {
            setType(value === "all" ? "" : value);
            setPage(1);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Property Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="buy">Buy</SelectItem>
            <SelectItem value="sell">Sell</SelectItem>
            <SelectItem value="rent">Rent</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="plot">Plot</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="City..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setPage(1);
          }}
        />

        <Button
          variant="outline"
          onClick={() => {
            setSearch("");
            setType("");
            setCity("");
            setPage(1);
          }}
        >
          Clear Filters
        </Button>
      </div>

      {/* Results Count */}
      {data && (
        <p className="text-gray-500 text-sm mb-4">
          {data.total} properties found
        </p>
      )}

      {/* Properties Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
      ) : data?.data.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-5xl mb-4">🏠</p>
          <p className="text-xl">No properties found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {data && (data.pages ?? 0) > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-500">
          Page {page} of {data.pages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(data.pages!, p + 1))}
          disabled={page === data.pages}
        >
          Next
        </Button>
      </div>
      )}
    </div>
  );
}