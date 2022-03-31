import classes from './Panel.module.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContactContext } from '../../contexts/ContactContext';
import ContactActionButtons from './ContactActionButtons';

export const Panel = (props) => {
  const { _id, name, email, phoneNumber, job, company, category } =
    props.contact;
  const { getContact, setShowContactModal } = useContext(ContactContext);
  const findContact = () => {
    getContact(_id);
    setShowContactModal(true);
  };
  return (
    <div className={classes['btn-contact']} onClick={findContact}>
      <div
        className={classes['btn-primary']}
        style={{ backgroundColor: props.category.color }}
      >
        <div className={classes['btn-left']}>
          <p className={classes['btn-name']} style={{ fontWeight: 'bold' }}>
            {name} &emsp;
          </p>
          <p className={classes['btn-info']}>{category} &emsp;</p>
        </div>
        <div className={classes['btn-right']}>
          <p className={classes['btn-info']}>
            {phoneNumber} &emsp;
            <ContactActionButtons _id={_id} />
          </p>
          <p className={classes['btn-info']}>{email} &emsp;</p>
        </div>
      </div>
    </div>
  );
};
