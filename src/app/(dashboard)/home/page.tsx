'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMonthlyBudget, getMonthlyTrips, getTotalItineraries, getUpcomingTrips } from '@/service/api/itinerary.service';
import { useQuery } from '@tanstack/react-query';
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1",
  "#d0ed57", "#a4de6c", "#d88884", "#c6b9f5", "#ffa07a"
];

function HomePage() {
  const {
    data: tripsRes,
    isLoading: isTripsLoading,
    isError: isTripsError,
  } = useQuery({
    queryKey: ['monthlyTrips'],
    queryFn: () => getMonthlyTrips(),
  });

  const {
    data: budgetRes,
    isLoading: isBudgetLoading,
    isError: isBudgetError,
  } = useQuery({
    queryKey: ['monthlyBudget'],
    queryFn: () => getMonthlyBudget(),
  });

  const {
    data: totalRes,
    isLoading: isTotalLoading,
    isError: isTotalError,
  } = useQuery({
    queryKey: ['totalItineraries'],
    queryFn: getTotalItineraries,
  });

  const {
    data: upcomingRes,
    isLoading: isUpcomingLoading,
    isError: isUpcomingError,
  } = useQuery({
    queryKey: ['upcomingTrips'],
    queryFn: () => getUpcomingTrips(),
  });

  const isLoading =
    isTripsLoading || isBudgetLoading || isTotalLoading || isUpcomingLoading;
  const isError =
    isTripsError || isBudgetError || isTotalError || isUpcomingError;

  if (isLoading)
    return (
      <div className="text-muted-foreground text-center py-10">
        Loading graphs...
      </div>
    );

  if (isError)
    return (
      <div className="text-red-500 text-center py-10">
        Error loading itinerary stats.
      </div>
    );

  const tripsData = tripsRes?.data?.monthlyTrips || [];
  const budgetData = budgetRes?.data?.monthlyBudget || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Total Trips </CardTitle>
        </CardHeader>
        <CardContent className="h-[100px]">
          <div className=" text-7xl font-extrabold">
            {totalRes?.data?.totalItineraries ?? '--- '}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Trips</CardTitle>
        </CardHeader>
        <CardContent className="h-[100px]">
          <div className=" text-7xl font-extrabold">

            {upcomingRes?.data?.upcomingTrips ?? '--- '}
          </div>

        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Trips Per Month</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tripsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalTrips" fill="#8884d8" name="Trips" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Budget Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={budgetData}
                dataKey="totalBudget"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ month, percent }) =>
                  `${month} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {budgetData.map((_: any, index: number) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: any) => `₹${value}`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage