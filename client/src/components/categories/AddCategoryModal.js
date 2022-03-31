import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CategoryContext } from '../../contexts/CategoryContext';
import { Form, Button } from 'react-bootstrap';

function AddCategoryModal() {
  // Context
  const { showAddCategoryModal, setShowAddCategoryModal, addCategory } =
    useContext(CategoryContext);

  // State
  const [newCategory, setNewCategory] = useState({
    searchValue: '',
    color: '',
  });

  const { name, color } = newCategory;

  const onChangeNewCategorytForm = (event) =>
    setNewCategory({ ...newCategory, [event.target.name]: event.target.value });

  const closeModal = () => {
    resetAddCategoryData();
  };
  const resetAddCategoryData = () => {
    setNewCategory({
      searchValue: '',
      color: '',
    });
    setShowAddCategoryModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addCategory(newCategory);
    resetAddCategoryData();
  };

  return (
    <Modal
      show={showAddCategoryModal}
      onHide={closeModal}
      size='sm'
      fullscreen={'sm-down'}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Name'
              name='name'
              required
              value={name}
              onChange={onChangeNewCategorytForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Color</Form.Label>
            <Form.Control
              type='color'
              placeholder='Color'
              name='color'
              value={color}
              onChange={onChangeNewCategorytForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddCategoryModal;
