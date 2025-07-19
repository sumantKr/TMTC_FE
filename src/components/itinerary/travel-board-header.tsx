import { ROUTES } from "@/config/routes.config";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RotateCcw } from 'lucide-react'
import Link from "next/link";
interface ITravelBoardHeaderProps {
    defaultFilter?: string
}

export default function TravelBoardHeader({ defaultFilter = "" }: ITravelBoardHeaderProps) {
    return (

        <form
            method="GET"
            action={ROUTES.TRAVEL_BOARD}
            className="flex justify-end items-center gap-2 mb-4"
        >
            {defaultFilter.length > 0 && <Link href={ROUTES.TRAVEL_BOARD} className="flex gap-x-2"> <RotateCcw /> Reset </Link>}
            <Input value={1} name="page" hidden />
            <Input
                type="text"
                name="title"
                className=" bg-white"
                placeholder="Search..."
                defaultValue={defaultFilter}
                autoComplete="off"
            />
            <Button
                variant={"secondary"}
                type="submit"
            >
                Search
            </Button>
        </form>
    );
}
