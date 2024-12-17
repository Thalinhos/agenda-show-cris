import React, { useEffect, useState } from "react";
import { Calendar } from "rsuite";
import { Container, Row, Col, Modal } from "react-bootstrap";
import "rsuite/dist/rsuite.min.css";
import { ModalEvent } from "../components/ModalEvent";

export function CalendarComponent() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const formatDateAsString = (date) =>
    date.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });

  const handleSelect = (date) => {
    setShowModal(true);
    const formattedDate = formatDateAsString(date);
    setSelectedDate(formattedDate);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("http://localhost:3000/getAllPosts");
        const data = await response.json();
        if (data.message) {
          setEvents(data.message);
        } else {
          console.error(data.errorMessage);
        }
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    })();
  }, []);

  const renderCell = (date) => {
    const formattedDate = formatDateAsString(date);
    const eventsForDate = events.filter((event) => event.data === formattedDate);

    return eventsForDate.map((event, index) => (
      <p key={index} style={{ fontSize: "0.8em", margin: 0 }}>
        {event.descricao} às {event.hora}
      </p>
    ));
  };

  return (
    <Container fluid="md">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <div className="calendar-wrapper">
            <Calendar
              bordered
              renderCell={renderCell}
              onSelect={handleSelect}
              style={{ width: "100%", margin: "0 auto" }}
            />
          </div>
        </Col>
      </Row>
      {showModal && <ModalEvent render={showModal} />}
    </Container>
  );
}
