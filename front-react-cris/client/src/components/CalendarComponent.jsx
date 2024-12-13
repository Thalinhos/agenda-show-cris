import React, { useEffect, useState } from "react";
import { Calendar } from "rsuite";
import "rsuite/dist/rsuite.min.css";

export function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDateAsString = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = new Date().toLocaleDateString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        });
        setCurrentDate(today);
        console.log(currentDate)

        const response = await fetch("http://localhost:3000/getAllPosts");
        const data = await response.json();

        if (data.message) {
          // Ajustando as datas recebidas para o formato "DD/MM/YYYY"
          setEvents(
            data.message.map((event) => ({
              ...event,
              data: event.data, // Já está no formato correto "DD/MM/YYYY"
            }))
          );
        } else {
          console.error(data.errorMessage);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    };

    fetchData();
  }, []);

  const renderCell = (date) => {

    const formattedDate = formatDateAsString(date);

    const eventsForDate = events.filter((event) => event.data === formattedDate);

    return (
      <div>
        {eventsForDate.map((event, index) => (
          <p key={index} style={{ fontSize: "0.8em", margin: 0 }}>
            {event.descricao} - {event.hora} 
          </p>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Calendar
        bordered
        renderCell={renderCell}
        style={{ width: 800, margin: "0 auto" }}
      />
    </div>
  );
}
