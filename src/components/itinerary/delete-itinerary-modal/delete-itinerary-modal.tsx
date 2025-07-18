'use client';

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { deleteItinerary } from "@/service/api/itinerary.service"; // You must implement this
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface IDeleteItineraryModalProps {
    itineraryId: string;
}

export default function DeleteItineraryModal({ itineraryId }: IDeleteItineraryModalProps) {
    const [open, setOpen] = useState(false);
    const { refresh } = useRouter()
    const { mutateAsync: deleteFn, isPending } = useMutation({
        mutationFn: () => deleteItinerary(itineraryId),
        onSuccess: () => {
            toast.success("Itinerary deleted");
            refresh()
        },
        onError: () => {
            toast.error("Failed to delete itinerary");
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpen(true);
                    }}
                    className="cursor-pointer bg-red-200 hover:bg-red-300 rounded-md p-2"
                >
                    <Trash2 className=" text-red-700" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Confirm Delete</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-600">
                    Are you sure you want to delete this itinerary? This action cannot be undone.
                </p>
                <DialogFooter className="gap-2 mt-4">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => deleteFn()} disabled={isPending}>
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
