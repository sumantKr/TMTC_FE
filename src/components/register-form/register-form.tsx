"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ROUTES } from "@/config/routes.config";
import { Button } from "../ui/button";
import Link from "next/link";
import { registerSchema, RegisterSchema } from "./register-form.config";
import { registerUser } from "@/service/api/auth.service";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: registerMutation, isPending } = useMutation({
    mutationFn: registerUser,
  });

  const onSubmit = async (data: RegisterSchema) => {
    const response = await registerMutation(data);
    if (response.error) {
      return toast.error(response.message);
    }
    toast.success("Account created. Please log in.");
    router.push(ROUTES.LOGIN_ROUTE);
  };

  return (
    <div className="h-screen w-screen">
      <Card className="w-full max-w-md mx-auto mt-20 border shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" {...register("fullName")} placeholder="Full Name" />
              {errors.fullName && (
                <p className="text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            {/* Username */}
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" {...register("username")} placeholder="Username" />
              {errors.username && (
                <p className="text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} placeholder="Email" />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" {...register("password")} placeholder="Password" />
              {errors.password && (
                <p className="text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Creating account..." : "Register"}
            </Button>
          </form>

          <div className="text-center pt-6">
            <p>
              Already have an account?{" "}
              <Link href={ROUTES.LOGIN_ROUTE} className="font-medium">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
