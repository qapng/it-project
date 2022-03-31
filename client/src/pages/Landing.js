import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactContext } from '../contexts/ContactContext';
import Loader from '../components/ui/Loader';
import ContactsList from '../components/contacts/ContactList';
import AddContactModal from '../components/contacts/AddContactModal';
import AddCategoryModal from '../components/categories/AddCategoryModal';
import UpdateContactModal from '../components/contacts/UpdateContactModal';
import { CategoryContext } from '../contexts/CategoryContext';
import ContactModal from '../components/contacts/ContactModal';
import { filterContacts } from '../utils/sortContacts';
import FilterBox from '../components/ui/FilterBox';

function Landing() {
  const search = useLocation().search;
  const category = new URLSearchParams(search).get('category');
  const name = new URLSearchParams(search).get('name');
  const email = new URLSearchParams(search).get('email');
  const phoneNumber = new URLSearchParams(search).get('phoneNumber');

  // Contexts
  const {
    contactState: { contacts, contactsLoading, contact },
    getContacts,
  } = useContext(ContactContext);

  const {
    categoryState: { categories, categoriesLoading },
    getCategories,
  } = useContext(CategoryContext);

  // Get all contacts and categories
  useEffect(() => getContacts(), []);
  useEffect(() => getCategories(), []);

  const processedContacts = filterContacts(
    contacts,
    category,
    name,
    email,
    phoneNumber,
  );

  let body = null;
  if (contactsLoading || categoriesLoading) {
    body = <Loader />;
  } else if (processedContacts.length === 0) {
    body = <h1>No contacts found</h1>;
    <AddContactModal categories={categories} />;
    <AddCategoryModal />;
  } else {
    body = (
      <>
        <ContactsList contacts={processedContacts} categories={categories} />;
        <AddContactModal categories={categories} />
        <AddCategoryModal />
        {contact !== null && <ContactModal contact={contact} />}
        {contact !== null && <UpdateContactModal categories={categories} />}
      </>
    );
  }

  return (
    <>
      <div>{body}</div>
    </>
  );
}

export default Landing;
