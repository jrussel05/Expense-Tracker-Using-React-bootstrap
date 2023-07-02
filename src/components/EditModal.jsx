import React from "react";
import { Form, Modal, Button} from "react-bootstrap";

export function EditModal(props) {
  const [title, setTitle] = React.useState(props.expense?.title);
  const [amount, setAmount] = React.useState(props.expense?.amount);
  const [date, setDate] = React.useState(props.expense?.date);

  const handlerAmountChange = (e) => {
    setAmount(e.target.value);
  }
  const handlerTitleChange = (e) => {
    setTitle(e.target.value);
  }
  const handlerDateChange = (e) => {
    setDate(e.target.value);
  }

  const handlerSave = (e) => {
    e.preventDefault();

    const dataToSave = {
      id: props.expense.id,
      amount: amount,
      date: date,
      title: title
    }
    
    var expensesFromStorage = localStorage.getItem("expense");
    if (expensesFromStorage != null) 
    var expenseJson = JSON.parse(expensesFromStorage);
    var foundIndex = expenseJson.findIndex(x => x.id == props.expense.id);
    expenseJson[foundIndex] = dataToSave;

    var expensesString = JSON.stringify(expenseJson);
    localStorage.setItem("expense", expensesString);
    alert("Changes saved!");
    props.onClose();
  } 
  return (
    <Modal
        show={props.show}
        onHide={props.onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit expenses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handlerSave}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={handlerTitleChange} name="title" type="title" placeholder="Type something..." />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Amount</Form.Label>
        <Form.Control value={amount} onChange={handlerAmountChange} step="0.01" name="amount" type="number" placeholder="Enter amount" />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Date</Form.Label>
        <Form.Control value={date} onChange={handlerDateChange}  name="date" type="date" placeholder="Enter date" />
      </Form.Group>

      <Button className='me-2' variant="primary" type="submit">
        Save changes
      </Button>
      <Button  variant="secondary" onClick={props.onClose}>
            Close
          </Button>
    </Form>
        </Modal.Body>
      </Modal>
  
  )  
}