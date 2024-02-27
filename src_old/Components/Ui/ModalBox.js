import React from 'react';
import { Modal } from "react-bootstrap";

export function ModalBox(props) {
  return (
    <>
        <Modal {...props}>
        <Modal.Header closeButton>
            </Modal.Header>
             { props.children } 
        </Modal>
    </>
  );
};