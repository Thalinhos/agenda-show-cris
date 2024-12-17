// ModalEvent.jsx

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function ModalDisplayOnly({ render = false, dataToShow = "", closeModal }) {

    // useEffect(() => {
    //     (async () => {
    //       try {
    //         const response = await fetch("http://localhost:3000/getAllPosts");
    //         const data = await response.json();
    //         if (data.message) {
    //           setEvents(data.message);
    //         } else {
    //           console.error(data.errorMessage);
    //         }
    //       } catch (error) {
    //         console.error("Erro ao buscar eventos:", error);
    //       }
    //     })();
    //   }, []);


    return (
        <Modal show={render} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Evento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>{dataToShow}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
               
            </Modal.Footer>
        </Modal>
    );
}
