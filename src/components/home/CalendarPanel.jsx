import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendarDb } from "../../hooks/useCalendarDb";

function CalendarPanel() {
  const calendarDb = useCalendarDb();

  const handleDateClick = (info) => {
    const title = prompt("Event title?");
    if (!title) return;

    calendarDb.addEvent({
      title,
      start_date: info.dateStr, // YYYY-MM-DD
    });
  };

  if (calendarDb.loading) {
    return <p>Loading calendar…</p>;
  }

  return (
    <div className="calendar-panel">
      <h2>Study Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={calendarDb.events.map((e) => ({
          id: e.id,
          title: e.title,
          start: e.start_date,
          end: e.end_date || undefined,
        }))}
        height="auto"
      />
    </div>
  );
}

export default CalendarPanel;
