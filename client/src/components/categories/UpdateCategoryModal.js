import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { CategoryContext } from '../../contexts/CategoryContext';
import { Form, Button } from 'react-bootstrap';

function UpdateCategoryModal() {
  // Context
  const {
    showUpdateCategoryModal,
    setShowUpdateCategoryModal,
    updateCategory,
    categoryState: { category },
  } = useContext(CategoryContext);

  // State
  const [updatedCategory, setUpdatedCategory] = useState(category);
  useEffect(() => setUpdatedCategory(category), [category]);

  const { name, color } = updatedCategory;

  const onChangeUpdateCategorytForm = (event) =>
    setUpdatedCategory({
      ...updatedCategory,
      [event.target.name]: event.target.value,
    });

  const closeModal = () => {
    setUpdatedCategory(category);
    setShowUpdateCategoryModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateCategory(updatedCategory);
    setShowUpdateCategoryModal(false);
  };

  return (
    <Modal show={showUpdateCategoryModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add new category</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Name'
              name='name'
              required
              value={name}
              onChange={onChangeUpdateCategorytForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='color'
              placeholder='Color'
              name='color'
              value={color}
              onChange={onChangeUpdateCategorytForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Cancel
          </Button>
          <Button variant='primary' type='submit'>
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdateCategoryModal;
