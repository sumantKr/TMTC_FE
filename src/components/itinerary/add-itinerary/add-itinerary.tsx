"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addItinerary, updateItinerary } from "@/service/api/itinerary.service";
import { IItinerary } from "@/types/itinerary";
import { useRouter } from "next/navigation";
import { createItinerarySchema, CreateItinerarySchema } from "./add-itinerary.config";

interface IAddItineraryFormProps {
  defaultValues?: IItinerary
  onSubmit?: () => void;
}
export default function AddItineraryForm({ defaultValues, onSubmit }: IAddItineraryFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateItinerarySchema>({
    resolver: zodResolver(createItinerarySchema),
    defaultValues
  });

  const { refresh } = useRouter()

  const startDate = watch("startDate");

  const { mutateAsync: addToItinerary, isPending } = useMutation({
    mutationFn: addItinerary,
  });
  const { mutateAsync: editItinerary, isPending: isEditPending } = useMutation({
    mutationFn: updateItinerary,
  });

  const handleSubmission = async (data: CreateItinerarySchema) => {
    let response;
    if (!defaultValues) {
      response = await addToItinerary(data);
    } else {
      response = await editItinerary({ id: defaultValues._id, itineraryDetails: data });
    }
    if (response.error) {
      toast.error(response.message);
      return;
    }
    toast.success(defaultValues ? "Itinerary Updated" : "Itinerary added successfully!");
    refresh()
    
  };

  useEffect(() => {
    if (startDate) {
      setValue("endDate", ""); // Reset endDate when startDate changes
    }
  }, [startDate, setValue]);

  const minStartDate = format(addDays(new Date(), 1), "yyyy-MM-dd");

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full shadow-xl border mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">{defaultValues ? "Edit" : "Add"}  Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(handleSubmission)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} placeholder="Trip to Bali" />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="destination">Destination</Label>
              <Input id="destination" {...register("destination")} placeholder="Bali, Indonesia" />
              {errors.destination && <p className="text-sm text-red-600">{errors.destination.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="budget">Budget</Label>
              <Input
                id="budget"
                type="number"
                {...register("budget", { valueAsNumber: true })}
                placeholder="1000"
              />
              {errors.budget && <p className="text-sm text-red-600">{errors.budget.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
                min={minStartDate}
              />
              {errors.startDate && <p className="text-sm text-red-600">{errors.startDate.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
                min={startDate}
                disabled={!startDate}
              />
              {errors.endDate && <p className="text-sm text-red-600">{errors.endDate.message}</p>}
            </div>

            {!defaultValues && <Button type="submit" className="w-full" disabled={isPending || isEditPending}>
              {isPending ? "Adding..." : "Add Itinerary"}
            </Button>}
            {defaultValues && <Button type="submit" className="w-full" disabled={isPending || isEditPending}>
              {isEditPending ? "Editing..." : "Edit Itinerary"}
            </Button>}
            {defaultValues && <Button type="button" variant={'outline'} className="w-full" onClick={onSubmit}>
              Cancel
            </Button>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
