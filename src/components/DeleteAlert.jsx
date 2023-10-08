import React from 'react'
import { Modal, Button } from 'react-bootstrap'

function DeleteAlert(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Successfully Deleted!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default DeleteAlert