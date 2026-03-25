"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import useAuthStore from "@/lib/auth";
import { ApiResponse, Property, User } from "@/types";

interface DashboardStats {
  totalUsers: number;
  totalProperties: number;
  activeProperties: number;
  soldProperties: number;
  rentedProperties: number;
  totalViews: number;
  propertiesByType: { _id: string; count: number }[];
}

export default function AdminPage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "properties" | "users">("stats");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/");
    }
  }, [mounted, isAuthenticated, user, router]);

  // Stats fetch
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    enabled: mounted && isAuthenticated && user?.role === "admin",
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: DashboardStats }>(
        "/api/admin/stats"
      );
      return response.data.data;
    },
  });

  // Properties fetch
  const { data: propertiesData, isLoading: propertiesLoading } = useQuery({
    queryKey: ["admin-properties"],
    enabled: mounted && isAuthenticated && user?.role === "admin",
    queryFn: async () => {
      const response = await api.get<ApiResponse<Property[]>>(
        "/api/properties?limit=100"
      );
      return response.data;
    },
  });

  // Users fetch
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["admin-users"],
    enabled: mounted && isAuthenticated && user?.role === "admin",
    queryFn: async () => {
      const response = await api.get<ApiResponse<User[]>>("/api/admin/users");
      return response.data;
    },
  });

  // Delete property
  const { mutate: deleteProperty } = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-properties"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  // Delete user
  const { mutate: deleteUser } = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });

  // Ban/Unban user
  const { mutate: toggleBan } = useMutation({
    mutationFn: async (id: string) => {
      await api.put(`/api/admin/users/${id}/ban`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });

  if (!mounted) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your real estate platform</p>
        </div>
        <Button asChild>
          <Link href="/admin/properties/add">+ Add Property</Link>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 border-b">
        {(["stats", "properties", "users"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "border-b-2 border-gray-900 text-gray-900"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Tab */}
      {activeTab === "stats" && (
        <div>
          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Total Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">👥 {stats?.totalUsers}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Total Properties</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">🏠 {stats?.totalProperties}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">✅ {stats?.activeProperties}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-gray-500">Total Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">👁 {stats?.totalViews}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Properties By Type */}
          {stats?.propertiesByType && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Properties By Type</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.propertiesByType.map((item) => (
                  <Card key={item._id}>
                    <CardContent className="pt-6 text-center">
                      <p className="text-2xl font-bold">{item.count}</p>
                      <p className="text-gray-500 capitalize">{item._id}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Properties Tab */}
      {activeTab === "properties" && (
        <div>
          {propertiesLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {propertiesData?.data.map((property) => (
                <div
                  key={property._id}
                  className="flex items-center justify-between p-4 bg-white border rounded-xl"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{property.title}</p>
                    <p className="text-gray-500 text-sm">
                      {property.location.city} • PKR {property.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={
                        property.status === "active"
                          ? "bg-green-500"
                          : property.status === "sold"
                          ? "bg-red-500"
                          : "bg-blue-500"
                      }
                    >
                      {property.status}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/properties/${property._id}/edit`}>
                        Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm("Delete this property?")) {
                          deleteProperty(property._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div>
          {usersLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {usersData?.data.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center justify-between p-4 bg-white border rounded-xl"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{u.name}</p>
                    <p className="text-gray-500 text-sm">{u.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={u.isActive ? "default" : "destructive"}>
                      {u.isActive ? "Active" : "Banned"}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleBan(u._id)}
                    >
                      {u.isActive ? "Ban" : "Unban"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm("Delete this user?")) {
                          deleteUser(u._id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}