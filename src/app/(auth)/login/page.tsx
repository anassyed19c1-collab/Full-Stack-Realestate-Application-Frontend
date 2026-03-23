"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import api from "@/lib/api";
import useAuthStore from "@/lib/auth";
import { AuthResponse } from "@/types";


// Zod Schema
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;


export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const { setUser } = useAuthStore();

    const { register, handleSubmit, formState: { errors }, } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });


    const onSubmit = async (data: LoginForm) => {
        try {
            setLoading(true);
            setError("");

            const response = await api.post<AuthResponse>("/api/auth/login", data);

            setUser(
                {
                    _id: response.data.data._id,
                    name: response.data.data.name,
                    email: response.data.data.email,
                    role: response.data.data.role as "user" | "admin",
                    phone: "",
                    profileImage: "",
                    wishlist: [],
                    isActive: true,
                    createdAt: "",
                },
                response.data.data.token
            );

            if (response.data.data.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/properties");
            }
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


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </CardTitle>
                    <CardDescription className="text-gray-500">
                        Sign in to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {error && (
                            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email" type="email" placeholder="ahmed@gmail.com" {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password")}
                                className={errors.password ? "border-red-500" : ""}
                            />
                            {errors.password && (<p className="text-red-500 text-xs">{errors.password.message}</p>)}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>

                <CardFooter className="text-center text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline ml-1">
                        Register
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}