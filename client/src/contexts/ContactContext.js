import { createContext, useReducer, useState } from 'react';
import { contactReducer } from '../reducers/contactReducer';
import {
  API_URL,
  CONTACTS_LOADED_SUCCESS,
  CONTACTS_LOADED_FAIL,
  ADD_CONTACT,
  DELETE_CONTACT,
  FIND_CONTACT,
  UPDATE_CONTACT,
} from './constants';
import axios from 'axios';

export const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  // State
  const [contactState, dispatch] = useReducer(contactReducer, {
    contact: null,
    contacts: [],
    contactsLoading: true,
  });
  const [showAddContactModal, setShowAddContactModal] = useState(false);
  const [showUpdateContactModal, setShowUpdateContactModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  // Get all contacts
  const getContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      if (response.data.success) {
        dispatch({
          type: CONTACTS_LOADED_SUCCESS,
          payload: response.data.message.contacts,
        });
      }
    } catch (error) {
      dispatch({ type: CONTACTS_LOADED_FAIL });
    }
  };

  // Get 1 contact
  const getContact = async (contactId) => {
    try {
      dispatch({
        type: FIND_CONTACT,
        payload: null,
      });
      const response = await axios.get(`${API_URL}/contacts/${contactId}`);
      if (response.data.success) {
        dispatch({
          type: FIND_CONTACT,
          payload: response.data.message.contact,
        });
      }
    } catch (error) {
      dispatch({ type: CONTACTS_LOADED_FAIL });
    }
  };

  // Add contact
  const addContact = async (newContact) => {
    try {
      const response = await axios.post(`${API_URL}/contacts`, newContact);
      if (response.data.success) {
        dispatch({
          type: ADD_CONTACT,
          payload: response.data.message.contact,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  // Delete contact
  const deleteContact = async (contactId) => {
    try {
      const response = await axios.delete(`${API_URL}/contacts/${contactId}`);
      if (response.data.success)
        dispatch({ type: DELETE_CONTACT, payload: contactId });
    } catch (error) {
      console.log(error);
    }
  };

  // Find contact when user is updating contact
  const findContact = (contactId) => {
    const contact = contactState.contacts.find(
      (contact) => contact._id === contactId,
    );
    dispatch({ type: FIND_CONTACT, payload: contact });
  };

  // Update contact
  const updateContact = async (updatedContact) => {
    try {
      const response = await axios.patch(
        `${API_URL}/contacts/${updatedContact._id}`,
        updatedContact,
      );
      if (response.data.success) {
        dispatch({
          type: UPDATE_CONTACT,
          payload: response.data.message.contact,
        });
        return response.data;
      }
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };

  // Contact context data
  const contactContextData = {
    contactState,
    getContacts,
    showAddContactModal,
    setShowAddContactModal,
    addContact,
    deleteContact,
    updateContact,
    findContact,
    showUpdateContactModal,
    setShowUpdateContactModal,
    getContact,
    showContactModal,
    setShowContactModal,
  };

  return (
    <ContactContext.Provider value={contactContextData}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
