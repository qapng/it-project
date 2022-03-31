import { useContext, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ContactContext } from '../../contexts/ContactContext';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { CategoryContext } from '../../contexts/CategoryContext';

function AddContactModal(props) {
  // Context
  const { showAddContactModal, setShowAddContactModal, addContact } =
    useContext(ContactContext);

  // State
  const [newContact, setNewContact] = useState({
    searchValue: '',
    email: '',
    phoneNumber: '',
    relationship: '',
    metAt: '',
    notes: '',
    category: props.categories[0].name,
  });

  const { name, email, phoneNumber, relationship, metAt, notes, category } =
    newContact;

  const onChangeNewContacttForm = (event) =>
    setNewContact({ ...newContact, [event.target.name]: event.target.value });

  const closeModal = () => {
    resetAddContactData();
  };
  const resetAddContactData = () => {
    setNewContact({
      searchValue: '',
      email: '',
      phoneNumber: '',
      relationship: '',
      metAt: '',
      notes: '',
      category: props.categories[0].name,
    });
    setShowAddContactModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addContact(newContact);
    resetAddContactData();
  };

  return (
    <Modal
      show={showAddContactModal}
      onHide={closeModal}
      size='lg'
      fullscreen={'sm-down'}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new contact</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Name'
              className='form-control'
              name='name'
              required
              value={name}
              onChange={onChangeNewContacttForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChangeNewContacttForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Phone Number'
              name='phoneNumber'
              value={phoneNumber}
              onChange={onChangeNewContacttForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Relationship</Form.Label>
            <Form.Control
              type='text'
              placeholder='Relationship'
              name='relationship'
              value={relationship}
              onChange={onChangeNewContacttForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Met at</Form.Label>
            <Form.Control
              type='text'
              placeholder='Met at'
              name='metAt'
              value={metAt}
              onChange={onChangeNewContacttForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type='text'
              placeholder='Notes'
              name='notes'
              value={notes}
              onChange={onChangeNewContacttForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as='Select'
              defaultValue='Choose...'
              name='category'
              value={category}
              onChange={onChangeNewContacttForm}
            >
              {props.categories.map((c) => (
                <option key={c._id}> {c.name} </option>
              ))}
            </Form.Control>
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

export default AddContactModal;
