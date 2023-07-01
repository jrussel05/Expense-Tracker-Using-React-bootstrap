import { Button, Modal } from "react-bootstrap"

//props = id show onclose
export function DeleteModal (props) {
    const handleDelete = () => {
      var expenseFromStorage = localStorage.getItem("expense");
      if (expenseFromStorage != null) {
        var expenseJsonData = JSON.parse(expenseFromStorage);

        var filteredExpenses = expenseJsonData.filter(function (expense){
          return expense.id != props.id;
        });
        var filterdExpeneString = JSON.stringify(filteredExpenses)
        localStorage.setItem("expense", filterdExpeneString);
        alert("Deleted")
        props.onClose();
      }
    }
    return (
        <Modal
        show={props.show}
        onHide={props.onClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Are you sure you want to delete this expense. This action is permanent
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    )
}