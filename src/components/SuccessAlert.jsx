import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function SuccessAlert(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Successfully added!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    
  )
}

export default SuccessAlert