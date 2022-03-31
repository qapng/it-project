import React, { useState, useContext, useEffect } from 'react';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { Link as div } from 'react-router-dom';
import side from './Sidebar.module.css';
import { compareByViews, compareByLastViewed } from '../../utils/sortContacts';
import { ContactContext } from '../../contexts/ContactContext';

function Sidebar(props) {
  const {
    getContacts,
    setShowContactModal,
    contactState: { contacts, contact },
  } = useContext(ContactContext);

  useEffect(() => getContacts(), []);

  const sortByViews = contacts.sort(compareByViews);
  const twoMostViewed = sortByViews
    .slice(Math.max(contacts.length - 2, 1))
    .reverse();
  const twoLeastViewed = sortByViews.slice(0, 2);
  const twoRecentViewed = contacts.sort(compareByLastViewed).slice(0, 2);

  const findContact = (id) => {
    // should open the modal
  };

  return (
    <div className={side['container--position']}>
      <div className={side['container--style']}>
        <div className={side['header--size']}>
          <p>Recent</p>
        </div>
        <div className={side['names--size']}>
          {twoRecentViewed.map((contact) => (
            <div key={contact._id} onClick={findContact(contact._id)}>
              <div className={side.link}>{contact.name}</div>
            </div>
          ))}
        </div>
        <div className={side['footer--size']}>
          <p>view more</p>
        </div>
      </div>

      <br />

      <div className={side['container--style']}>
        <div className={side['header--size']}>
          <p>Most viewed</p>
        </div>
        <div className={side['names--size']}>
          {twoMostViewed.map((contact) => (
            <div key={contact._id}>
              <div className={side.link} onClick={findContact(contact._id)}>
                {contact.name}
              </div>
            </div>
          ))}
        </div>

        <div className={side['footer--size']}>
          <p>view more</p>
        </div>
      </div>

      <br />

      <div className={side['container--style']}>
        <div className={side['header--size']}>
          <p>Least viewed</p>
        </div>
        <div className={side['names--size']}>
          {twoLeastViewed.map((contact) => (
            <div key={contact._id}>
              <div className={side.link} onClick={findContact(contact._id)}>
                {contact.name}
              </div>
            </div>
          ))}
        </div>
        <div className={side['footer--size']}>
          <p>view more</p>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
