"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchema } from "./login-form.config";
import { loginUser } from "@/service/api/auth.service";
import toast from "react-hot-toast";
import { ROUTES } from "@/config/routes.config";
import { Button } from "../ui/button";
import { API_URL } from "@/config/constants";
import Link from "next/link";




export default function LoginForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const { mutateAsync: login, isPending } = useMutation({
        mutationFn: loginUser
    });

    const onSubmit = async (data: LoginSchema) => {
        console.debug('🚀 ~ onSubmit ~ data:', data)
        if (data.email === '') {
            delete data.email
        }
        if (data.username === '') {
            delete data.username
        }
        const response = await login(data);
        if (response.error) {
            return toast.error(response.message)
        }
        router.push(ROUTES.HOME_ROUTE)
    };

    return (
        <div className="h-screen w-screen">
            <Card className="w-full max-w-md mx-auto mt-20 border shadow-xl">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div className="space-y-2">
                            <Input
                                id="email"
                                {...register("email")}
                                type="email"
                                placeholder="Email"
                            />
                            {errors.email && (
                                <p className="text-sm text-red-600">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="w-full flex items-center gap-x-4">
                            <hr className="grow" />
                            <p className="font-medium">
                                OR
                            </p>
                            <hr className="grow" />
                        </div>
                        <div className="space-y-2">
                            <Input
                                id="username"
                                {...register("username")}
                                type="text"
                                placeholder="Username"
                            />
                            {errors.username && (
                                <p className="text-sm text-red-600">{errors.username.message}</p>
                            )}
                        </div>

                        <div className="space-y-2 pt-6 pb-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                {...register("password")}
                                type="password"
                                placeholder="password"
                            />
                            {errors.password && (
                                <p className="text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full" disabled={isPending}>
                            {isPending ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                    <div className="text-center pt-6">
                        <p>New user? <Link href={ROUTES.REGISTER_ROUTE} className="font-medium">Create account</Link></p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}