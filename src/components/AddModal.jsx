import React from 'react';
import {Modal, Button, Form} from "react-bootstrap";
import SuccessAlert from './SuccessAlert';

export function AddModal(props) {

  const [showAlert, setShowAlert] = React.useState(false)


  const toggleShowAlert = () => {
    setShowAlert(!showAlert);
  }

  const handleSave = (e) => {
    e.preventDefault(e.target)
    
    const title = e.target.title.value;
    const amount =e.target.amount.value;
    const date = e.target.date.value;

    const expense = {
      title: title,
      amount: amount,
      date: date
    }
    
    var existingExpenses = localStorage.getItem("expense")
    if (existingExpenses == null){
      existingExpenses = [];
    }
    else {
      existingExpenses = JSON.parse(existingExpenses);
    }
    //safe na mag add

    expense.id = existingExpenses.length + 1;
    existingExpenses.push(expense);
    var toSave = JSON.stringify(existingExpenses);
    localStorage.setItem("expense", toSave);
    setShowAlert(true)
    props.onClose();
  }


  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSave}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control name="title" type="title" placeholder="Type something..." />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control step="0.01" name="amount" type="number" placeholder="Enter amount" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control name="date" type="date" placeholder="Enter date" />
      </Form.Group>

      <Button className='me-2' variant="primary" type="submit">
        Save
      </Button>
      <Button  variant="secondary" onClick={props.onClose}>
            Close
          </Button>
    </Form>
        </Modal.Body>
      </Modal>

      <SuccessAlert show={showAlert} onClose={toggleShowAlert}/>
    </>
  )
}
