// ModalEvent.jsx

import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export function ModalDisplayOnly({ render = false, dataToShow = "", closeModal }) {

    const dataToPost = dataToShow.replaceAll('/', '-');
    const [dataFromDB, setDataFromDB] = useState();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        (async () => {
          try {
            const response = await fetch(`http://localhost:3000/getPostFromDate/${dataToPost}`);
            const data = await response.json();
            if (data.message) {
              setDataFromDB(data.message);
            } else {
              setErrorMessage(data.errorMessage);
              console.error(data.errorMessage);
            }
          } catch (error) {
            setErrorMessage(data.errorMessage);
            console.error("Erro ao buscar eventos:", error);
          }
        })();
      }, []);


    return (
        <Modal show={render} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Evento</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            {/* {dataToShow && (
              <p>{dataToShow}</p>
            )} */}

            {errorMessage && (
              <p>{errorMessage}</p>
            )}



            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
               
            </Modal.Footer>
        </Modal>
    );
}
