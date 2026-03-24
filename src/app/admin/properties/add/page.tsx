"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

type FormData = {
  title: string;
  price: number;
  location: string;
  image: FileList;
};

export default function AddPropertyPage() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("price", data.price.toString());
      formData.append("location", data.location);
      formData.append("image", data.image[0]);

      await api.post("/properties", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      reset();
      router.push("/admin");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add Property</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          {...register("title")}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          {...register("price")}
          placeholder="Price"
          className="w-full border p-2 rounded"
        />

        <input
          {...register("location")}
          placeholder="Location"
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          {...register("image")}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Add Property"}
        </button>

      </form>
    </div>
  );
}