'use client'
import { Calendar, CalendarCurrentDate, CalendarMonthView, CalendarNextTrigger, CalendarPrevTrigger, CalendarTodayTrigger, CalendarViewTrigger, CalendarWeekView } from '@/components/calendar/calendar'
import { getItinerariesCalendarView } from '@/service/api/itinerary.service'
import { useQuery } from '@tanstack/react-query'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

function TravelCalendarPage() {
  const [startDate, setStartDate] = useState(new Date())
  const { data: travelData, isLoading } = useQuery({
    queryKey: ['travel-calendar', startDate],
    queryFn: () => getItinerariesCalendarView(startDate)
  })

  if (isLoading)
    return (
      <div className="text-muted-foreground text-center py-10">
        Loading...
      </div>
    );
  return (
    <Calendar defaultDate={startDate} view='week' events={travelData?.data ?? []} >
      <div className="h-dvh py-6 flex flex-col">
        <div className="flex px-6 items-center gap-2 mb-6">
          <CalendarViewTrigger
            view="week"
            className="aria-[current=true]:bg-accent"
          >
            Week
          </CalendarViewTrigger>
          <CalendarViewTrigger
            view="month"
            className="aria-[current=true]:bg-accent"
          >
            Month
          </CalendarViewTrigger>

          <span className="flex-1" />

          <CalendarCurrentDate />

          <CalendarPrevTrigger>
            <ChevronLeft size={20} />
            <span className="sr-only">Previous</span>
          </CalendarPrevTrigger>

          <CalendarTodayTrigger>Today</CalendarTodayTrigger>

          <CalendarNextTrigger>
            <ChevronRight size={20} />
            <span className="sr-only">Next</span>
          </CalendarNextTrigger>

        </div>

        <div className="flex-1 overflow-auto px-6 relative">
          <CalendarWeekView />
          <CalendarMonthView />
        </div>
      </div>
    </Calendar>
  )
}

export default TravelCalendarPage