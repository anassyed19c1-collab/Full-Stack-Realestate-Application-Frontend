"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import useAuthStore from "@/lib/auth";
import { ApiResponse, Property } from "@/types";

const propertySchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    type: z.enum(["buy", "sell", "rent", "commercial", "plot"]),
    price: z.string().min(1, "Price is required"),
    address: z.string().min(3, "Address is required"),
    city: z.string().min(2, "City is required"),
    province: z.string().min(2, "Province is required"),
    size: z.string().min(1, "Size is required"),
    unit: z.enum(["marla", "kanal", "sqft", "sqm"]),
    bedrooms: z.string().optional(),
    bathrooms: z.string().optional(),
    parking: z.boolean().optional(),
    furnished: z.boolean().optional(),
    status: z.enum(["active", "sold", "rented"]),
});

type PropertyForm = z.infer<typeof propertySchema>;

export default function EditPropertyPage() {
    const { isAuthenticated, user } = useAuthStore();
    const router = useRouter();
    const { id } = useParams();
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [newImages, setNewImages] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<{ url: string; public_id: string }[]>([]);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted && (!isAuthenticated || user?.role !== "admin")) {
            router.push("/");
        }
    }, [mounted, isAuthenticated, user, router]);

    // Property fetch — views increment nahi hoga admin ke liye
    const { data: property, isLoading } = useQuery({
        queryKey: ["admin-property", id],
        enabled: mounted && !!id,
        queryFn: async () => {
            const response = await api.get<ApiResponse<Property>>(
                `/api/properties/${id}?admin=true`
            );
            return response.data.data;
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
        reset,
    } = useForm<PropertyForm>({
        resolver: zodResolver(propertySchema),
    });

    // Property data form mein fill karo
    useEffect(() => {
        if (property) {
            reset({
                title: property.title,
                description: property.description,
                type: property.type,
                price: String(property.price),
                address: property.location.address,
                city: property.location.city,
                province: property.location.province,
                size: String(property.area.size),
                unit: property.area.unit,
                bedrooms: String(property.features.bedrooms),
                bathrooms: String(property.features.bathrooms),
                parking: property.features.parking,
                furnished: property.features.furnished,
                status: property.status,
            });


            setValue("type", property.type);
            setValue("unit", property.area.unit);
            setValue("status", property.status);


            setExistingImages(property.images);
        }
    }, [property, reset, setValue]);

    const removeExistingImage = (public_id: string) => {
        setExistingImages((prev) =>
            prev.filter((img) => img.public_id !== public_id)
        );
    };

    const onSubmit = async (data: PropertyForm) => {
        try {
            setLoading(true);
            setError("");

            // Agar naye images hain toh FormData use karo
            if (newImages.length > 0) {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("description", data.description);
                formData.append("type", data.type);
                formData.append("price", data.price);
                formData.append("address", data.address);
                formData.append("city", data.city);
                formData.append("province", data.province);
                formData.append("size", data.size);
                formData.append("unit", data.unit);
                formData.append("status", data.status);
                formData.append("bedrooms", data.bedrooms || "0");
                formData.append("bathrooms", data.bathrooms || "0");
                formData.append("parking", String(data.parking || false));
                formData.append("furnished", String(data.furnished || false));
                formData.append(
                    "existingImages",
                    JSON.stringify(existingImages)
                );
                newImages.forEach((image) => {
                    formData.append("images", image);
                });

                await api.put(`/api/properties/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                // Sirf text update
                await api.put(`/api/properties/${id}`, {
                    title: data.title,
                    description: data.description,
                    type: data.type,
                    price: Number(data.price),
                    location: {
                        address: data.address,
                        city: data.city,
                        province: data.province,
                    },
                    area: {
                        size: Number(data.size),
                        unit: data.unit,
                    },
                    features: {
                        bedrooms: Number(data.bedrooms) || 0,
                        bathrooms: Number(data.bathrooms) || 0,
                        parking: data.parking || false,
                        furnished: data.furnished || false,
                    },
                    status: data.status,
                    images: existingImages,
                });
            }

            setSuccess("Property updated successfully!");
            setTimeout(() => {
                router.push("/admin");
            }, 1500);
        } catch (err: unknown) {
            if (err && typeof err === "object" && "response" in err) {
                const axiosErr = err as { response: { data: { message: string } } };
                setError(axiosErr.response.data.message);
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8">
                <Skeleton className="h-8 w-48 mb-6" />
                <Skeleton className="h-64 w-full rounded-xl" />
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.back()}
                    className="text-gray-500 hover:text-gray-900 mb-4 flex items-center"
                >
                    ← Back
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Edit Property</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                    <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-50 text-green-600 text-sm p-3 rounded-md">
                        {success}
                    </div>
                )}

                {/* Basic Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Title</Label>
                            <Input
                                {...register("title")}
                                className={errors.title ? "border-red-500" : ""}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs">{errors.title.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Description</Label>
                            <textarea
                                {...register("description")}
                                rows={4}
                                className={`w-full border rounded-md p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gray-900 ${errors.description ? "border-red-500" : "border-gray-200"
                                    }`}
                            />
                            {errors.description && (
                                <p className="text-red-500 text-xs">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Type</Label>
                                <Select
                                    value={watch("type") || property?.type || "rent"}
                                    onValueChange={(value) =>
                                        setValue("type", value as PropertyForm["type"])
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="buy">Buy</SelectItem>
                                        <SelectItem value="sell">Sell</SelectItem>
                                        <SelectItem value="rent">Rent</SelectItem>
                                        <SelectItem value="commercial">Commercial</SelectItem>
                                        <SelectItem value="plot">Plot</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    value={watch("status") || property?.status || "active"}
                                    onValueChange={(value) =>
                                        setValue("status", value as PropertyForm["status"])
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="sold">Sold</SelectItem>
                                        <SelectItem value="rented">Rented</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Price (PKR)</Label>
                            <Input
                                type="number"
                                {...register("price")}
                                className={errors.price ? "border-red-500" : ""}
                            />
                            {errors.price && (
                                <p className="text-red-500 text-xs">{errors.price.message}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Location */}
                <Card>
                    <CardHeader>
                        <CardTitle>Location</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Address</Label>
                            <Input
                                {...register("address")}
                                className={errors.address ? "border-red-500" : ""}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-xs">{errors.address.message}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>City</Label>
                                <Input
                                    {...register("city")}
                                    className={errors.city ? "border-red-500" : ""}
                                />
                                {errors.city && (
                                    <p className="text-red-500 text-xs">{errors.city.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Province</Label>
                                <Input
                                    {...register("province")}
                                    className={errors.province ? "border-red-500" : ""}
                                />
                                {errors.province && (
                                    <p className="text-red-500 text-xs">
                                        {errors.province.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Area & Features */}
                <Card>
                    <CardHeader>
                        <CardTitle>Area & Features</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Size</Label>
                                <Input
                                    type="number"
                                    {...register("size")}
                                    className={errors.size ? "border-red-500" : ""}
                                />
                                {errors.size && (
                                    <p className="text-red-500 text-xs">{errors.size.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Unit</Label>
                                <Select
                                    value={watch("unit") || property?.area.unit || "marla"}
                                    onValueChange={(value) =>
                                        setValue("unit", value as PropertyForm["unit"])
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="marla">Marla</SelectItem>
                                        <SelectItem value="kanal">Kanal</SelectItem>
                                        <SelectItem value="sqft">Sqft</SelectItem>
                                        <SelectItem value="sqm">Sqm</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Bedrooms</Label>
                                <Input type="number" {...register("bedrooms")} />
                            </div>

                            <div className="space-y-2">
                                <Label>Bathrooms</Label>
                                <Input type="number" {...register("bathrooms")} />
                            </div>
                        </div>

                        <div className="flex items-center space-x-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register("parking")}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Parking Available</span>
                            </label>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register("furnished")}
                                    className="w-4 h-4"
                                />
                                <span className="text-sm">Furnished</span>
                            </label>
                        </div>
                    </CardContent>
                </Card>

                {/* Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>Images</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Existing Images */}
                        {existingImages.length > 0 && (
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Current Images</p>
                                <div className="flex flex-wrap gap-2">
                                    {existingImages.map((image) => (
                                        <div key={image.public_id} className="relative">
                                            <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                                                <Image
                                                    src={image.url}
                                                    alt="Property"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(image.public_id)}
                                                className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* New Images */}
                        <div>
                            <p className="text-sm text-gray-500 mb-2">Add New Images</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files) {
                                        setNewImages(Array.from(e.target.files));
                                    }
                                }}
                                className="w-full border border-gray-200 rounded-md p-2 text-sm"
                            />
                            {newImages.length > 0 && (
                                <p className="text-gray-500 text-sm mt-2">
                                    {newImages.length} new image(s) selected
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Updating..." : "Update Property"}
                </Button>
            </form>
        </div>
    );
}