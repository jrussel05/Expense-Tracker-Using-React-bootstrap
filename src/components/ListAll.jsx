import React from 'react'
import {Button, Table, Container, Row, Col} from "react-bootstrap";
import {AddModal} from './AddModal';
import { DeleteModal } from './DeleteModla';
import { EditModal } from './EditModal';


function ListAll() {

  const [ showAddModal, setAddModal ] = React.useState(false);
  const [showDeleteModal, setDeleteModal ] = React.useState(false);
  const [showEditModal, setEditModal] = React.useState(false);
  const [ expense, setExpense] = React.useState([]);
  const [ total, setTotal] = React.useState("0.00");
  const [idToDelete, setIdToDelete] = React.useState(0);
  const [expenseToEdit, setExpenseToEdit] = React.useState();

  React.useEffect(function() {
    loadExpense();
  }, [ ]);

  const toggleShowAddModal = () => {
    setAddModal(!showAddModal);
    loadExpense();
  }

  const toggleShowdeleteModal = (id) => {
    setIdToDelete(id);
    setDeleteModal(!showDeleteModal);
    loadExpense();
  }

  const toggleShowEdit = (expense) => {
    setExpenseToEdit(expense);
    setEditModal(!showEditModal)
    loadExpense();
  }

  const loadExpense = () => {
    const expensesFromStorage = localStorage.getItem("expense");
    if (expensesFromStorage != null) {
      const jsonExpense = JSON.parse(expensesFromStorage);
      setExpense(jsonExpense);

      var totalExpense = 0;
      for (var i = 0; i < jsonExpense.length; i++) {
        totalExpense += Number(jsonExpense[i].amount); 
      }
      var totalExpenseFormatted = getCommaSeparatedTwoDecimalsNumber(totalExpense);
      setTotal(totalExpenseFormatted);
    }
  }

  const getCommaSeparatedTwoDecimalsNumber = (number) => {
    const fixedNumber = Number.parseFloat(number).toFixed(2);
    return String(fixedNumber).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}
  return (
    <>
      <Container className='mt-5' >
        <Row>
          <Col><h1>Expense ({total})</h1></Col>
          <Col className='text-end'><Button onClick={toggleShowAddModal} variant='primary'>Add</Button></Col>
        </Row>
        
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th className='text-end'>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {expense.map((expense, index) => 
          <tr key={index}>
          <td><Button variant="link" onClick={() => toggleShowEdit(expense)}>{expense.title}</Button></td>
          <td>{expense.date}</td>
          <td className='text-end' >{getCommaSeparatedTwoDecimalsNumber(expense.amount)}</td>
          <td className='text-end'>
            <Button onClick={() => toggleShowdeleteModal(expense.id)} variant='danger'>Delete</Button>
            </td>
        </tr>

        )}
        
      </tbody>
    </Table>
      </Container>
        <AddModal show={showAddModal} onClose={toggleShowAddModal}/>
        <DeleteModal show={showDeleteModal} onClose={toggleShowdeleteModal} id={idToDelete}/>
        {expenseToEdit != undefined && 
         <EditModal show={showEditModal} onClose={ toggleShowEdit} expense={expenseToEdit} />
         }
       

    </>
  )
}

export default ListAll