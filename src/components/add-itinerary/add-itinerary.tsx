"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addDays, format } from "date-fns";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createItinerarySchema, CreateItinerarySchema } from "./add-itinerary.config";
import { addItinerary } from "@/service/api/itinerary.service";

export default function AddItineraryForm() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateItinerarySchema>({
    resolver: zodResolver(createItinerarySchema),
  });

  const startDate = watch("startDate");

  const { mutateAsync, isPending } = useMutation({
    mutationFn: addItinerary,
  });

  const onSubmit = async (data: CreateItinerarySchema) => {
    const response = await mutateAsync(data);
    if (response.error) {
      toast.error(response.message || "Failed to add itinerary");
      return;
    }
    toast.success("Itinerary added successfully!");
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
          <CardTitle className="text-center text-2xl font-bold">Add Itinerary</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Adding..." : "Add Itinerary"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
