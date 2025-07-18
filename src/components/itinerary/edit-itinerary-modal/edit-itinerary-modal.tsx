'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { IItinerary } from "@/types/itinerary";
import AddItineraryForm from "../add-itinerary/add-itinerary";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
interface IEditItineraryModalProps {

    defaultValues: IItinerary;
}

export default function EditItineraryModal({ defaultValues }: IEditItineraryModalProps) {
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="  cursor-pointer bg-green-200 text-green-900 rounded-md border border-green-400">
                <Button
                    variant={'ghost'}
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent bubbling
                        setOpen(true);
                    }}
                >
                    <Edit className="w-4 h-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Itinerary</DialogTitle>
                </DialogHeader>
                <AddItineraryForm
                    onSubmit={() => setOpen(false)}
                    defaultValues={defaultValues}
                />
            </DialogContent>
        </Dialog>
    );
}
