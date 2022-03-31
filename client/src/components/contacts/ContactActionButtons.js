import Button from 'react-bootstrap/Button';
import editIcon from '../../assets/pen.svg';
import deleteIcon from '../../assets/trash.svg';
import { ContactContext } from '../../contexts/ContactContext';
import { useContext } from 'react';

const ContactActionButtons = ({ _id }) => {
  const {
    deleteContact,
    findContact,
    setShowUpdateContactModal,
    setShowContactModal,
  } = useContext(ContactContext);

  const getContact = function (e) {
    findContact(_id);
    setShowContactModal(false);
    setShowUpdateContactModal(true);
    e.stopPropagation();
  };

  const handleDelete = function (e) {
    deleteContact(_id);
    setShowContactModal(false);
    e.stopPropagation();
  };

  return (
    <>
      <Button onClick={getContact}>
        <img src={editIcon} alt='edit' width='24' height='24' />
      </Button>
      <Button onClick={handleDelete}>
        <img src={deleteIcon} alt='delete' width='24' height='24' />
      </Button>
    </>
  );
};

export default ContactActionButtons;
