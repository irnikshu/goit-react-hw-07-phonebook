import PropTypes from 'prop-types';
import Form from './Form/Form';
import ContactsList from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContact,
} from '../redux/contacts/contacts-operations';
// import { addContact, deleteContact } from '../redux/contacts/contact-slice';
import { setFilter } from '../redux/filter/filter-slice';

import {
  getAllContacts,
  getVisibleContact,
} from '../redux/contacts/contacts-selectors';
import { getFilter } from '../redux/filter/filter-selectors';

import styles from './app.module.scss';
import '../shared/Styles/styles.scss';

const App = () => {
  const filteredContacts = useSelector(getVisibleContact);
  const allContacts = useSelector(getAllContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    const checkName = newContact.name.toLowerCase();
    if (allContacts.find(contact => contact.name.toLowerCase() === checkName)) {
      alert(name + ' is already in contacts');
      return false;
    }

    dispatch(fetchAddContact({ name, number }));
  };

  const handleDeleteContact = contactId => {
    dispatch(fetchDeleteContact(contactId));
  };

  const changeFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isBooks = Boolean(filteredContacts.length);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Phonebook</h2>
      <Form onSubmit={handleAddContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      {isBooks && (
        <ContactsList
          contact={filteredContacts}
          deleteContact={handleDeleteContact}
        />
      )}
      {!isBooks && <p>No books in list</p>}
    </div>
  );
};
export default App;

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  filter: PropTypes.string,
  addContact: PropTypes.func,
  deleteContact: PropTypes.func,
  changeFilter: PropTypes.func,
  getVisibleContact: PropTypes.func,
};
