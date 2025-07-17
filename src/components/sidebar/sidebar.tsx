"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils"; // your utility for conditional classNames
import { Button } from "@/components/ui/button";
import { SIDEBAR_CONFIG } from "./sidebar.config";
import { LogOut, MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "@/service/api/auth.service";
import { useRouter } from "next/navigation";
import { loginRoute } from "@/service/api/api-routes";


export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const { push } = useRouter()
    const { mutateAsync: logoutHandler } = useMutation({
        mutationFn: logoutUser
    })

    async function handleLogout() {
        await logoutHandler()
        push(loginRoute)

    }
    return (
        <aside
            className={cn(
                "flex flex-col h-screen bg-background shadow-xl border-r border-muted transition-width duration-300 ease-in-out pb-12 ",
                collapsed ? "w-16" : "w-64"
            )}
        >
            {/* Toggle Button */}
            <div className={cn("flex items-center  p-2 border-b border-muted", { "justify-center": collapsed, "justify-end": !collapsed })}>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    className="rounded-full"
                >
                    {!collapsed ? <MoveLeft /> : <MoveRight />}
                </Button>
            </div>

            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 p-2">
                    {SIDEBAR_CONFIG.map(({ icon: Icon, label, href }) => (
                        <li key={href}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                            {
                                                "justify-center": collapsed
                                            }
                                        )}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {!collapsed && <span>{label}</span>}
                                    </Link>
                                </TooltipTrigger>
                                {collapsed && (
                                    <TooltipContent side="right" align="center">
                                        {label}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="w-full  " onClick={handleLogout}>
                <Tooltip>
                    <TooltipTrigger>
                        <span className={cn(
                            "cursor-pointer px-3 py-2 rounded-md flex items-center gap-x-3  text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground ",
                            {
                                "justify-center": collapsed
                            }
                        )}>

                            <LogOut />
                            {!collapsed && <span>Log out</span>}
                        </span>
                    </TooltipTrigger>
                    {collapsed && (
                        <TooltipContent side="right" align="center">
                            Log out
                        </TooltipContent>
                    )}
                </Tooltip>
            </div>
        </aside >
    );
}
