import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ContactContext } from '../../contexts/ContactContext';
import { Form, Button } from 'react-bootstrap';

function UpdateContactModal(props) {
  // Context
  const {
    showUpdateContactModal,
    setShowUpdateContactModal,
    updateContact,
    contactState: { contact },
  } = useContext(ContactContext);

  // State
  const [updatedContact, setUpdatedContact] = useState(contact);
  useEffect(() => setUpdatedContact(contact), [contact]);

  const { name, email, phoneNumber, metat, relationship, notes, category } = updatedContact;

  const onChangeUpdateContactForm = (event) =>
    setUpdatedContact({
      ...updatedContact,
      [event.target.name]: event.target.value,
    });

  const closeModal = () => {
    setUpdatedContact(contact);
    setShowUpdateContactModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateContact(updatedContact);
    setShowUpdateContactModal(false);
  };

  return (
    <Modal
      show={showUpdateContactModal}
      onHide={closeModal}
      size='lg'
      fullscreen={'sm-down'}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update contact</Modal.Title>
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
              onChange={onChangeUpdateContactForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChangeUpdateContactForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Phone Number'
              name='phoneNumber'
              value={phoneNumber}
              onChange={onChangeUpdateContactForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Relationship</Form.Label>
            <Form.Control
              type='text'
              placeholder='Relationship'
              name='relationship'
              value={relationship}
              onChange={onChangeUpdateContactForm}
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Met at</Form.Label>
            <Form.Control
              type='text'
              placeholder='Met at'
              name='metat'
              value={metat}
              onChange={onChangeUpdateContactForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Notes</Form.Label>
            <Form.Control
              type='text'
              placeholder='Notes'
              name='notes'
              value={notes}
              onChange={onChangeUpdateContactForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as='Select'
              defaultValue={category}
              name='category'
              value={category}
              onChange={onChangeUpdateContactForm}
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
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdateContactModal;
