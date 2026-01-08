import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

function CalendarPanel() {
  const [events, setEvents] = useState([]);

  const handleDateClick = (info) => {
    const title = prompt("Event title?");
    if (!title) return;

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        start: info.dateStr,
      },
    ]);
  };

  return (
    <div className="main">
      <h2>Study Calendar</h2>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={events}
        height="auto"
      />
    </div>
  );
}

export default CalendarPanel;
