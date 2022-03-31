import { useContext, useEffect, useState } from 'react';
import { Modal, Button, Card } from 'react-bootstrap';
import { ContactContext } from '../../contexts/ContactContext';
import ContactActionButtons from './ContactActionButtons';
import classes from './ContactModal.module.css';
import { formatDate } from '../../utils/dates';

function ContactModal(props) {
  // Context
  const { showContactModal, setShowContactModal } = useContext(ContactContext);

  // State

  const {
    _id,
    name,
    email,
    phoneNumber,
    relationship,
    metAt,
    category,
    createdAt,
    updatedAt,
    notes,
  } = props.contact;

  const closeModal = () => {
    setShowContactModal(false);
  };

  return (
    <Modal
      show={showContactModal}
      onHide={closeModal}
      size='lg'
      fullscreen={'sm-down'}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: 'bold' }}>{name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={classes.contactcard}>
          <Card className={classes.cardstyle}>
            <h4 className={classes.cardtitle}>Context</h4>
            <div className='card-text'>
              <p>Met at: {metAt}</p>
              <p>Relationship: {relationship}</p>
            </div>
          </Card>
          <Card className={classes.cardstyle}>
            <h4 className={classes.cardtitle}>Contact</h4>
            <div className={classes.cardtext}>
              <p>
                <i className='fas fa-phone' style={{ fontSize: '1.5rem' }} />{' '}
                {phoneNumber}
              </p>
              <p>
                <i className='far fa-envelope' style={{ fontSize: '1.5rem' }} />{' '}
                {email}
              </p>
            </div>
          </Card>
          <Card className={classes.cardstyle}>
            <h4 className={classes.cardtitle}>Notes</h4>
            <p className='card-text'>{notes} </p>
          </Card>
          <Card className={classes.cardstyle}>
            <h4 className={classes.cardtitle}>Dates</h4>
            <p className='card-text'>Added on: {formatDate(createdAt)} </p>
            <p className='card-text'>Last edited: {formatDate(updatedAt)} </p>
          </Card>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ContactActionButtons _id={_id} />
      </Modal.Footer>
    </Modal>
  );
}

export default ContactModal;
