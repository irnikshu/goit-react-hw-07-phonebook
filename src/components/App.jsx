import PropTypes from 'prop-types';
import Form from './Form/Form';
import ContactsList from './Contacts/Contacts';

import Filter from './Filter/Filter';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContact,
} from '../redux/contacts/contacts-operations';

import { setFilter } from '../redux/filter/filter-slice';

import { getVisibleContact } from '../redux/contacts/contacts-selectors';
import { getFilter } from '../redux/filter/filter-selectors';

import styles from './app.module.scss';
import '../shared/Styles/styles.scss';

const App = () => {
  const filteredContacts = useSelector(getVisibleContact);

  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const handleAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));
  };

  const handleDeleteContact = id => {
    dispatch(fetchDeleteContact(id));
  };

  const changeFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  const isContacts = Boolean(filteredContacts?.length);
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Phonebook</h2>
      <Form onSubmit={handleAddContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      {isContacts && (
        <ContactsList
          items={filteredContacts}
          deleteContact={handleDeleteContact}
        />
      )}

      {!isContacts && <p>No contacts in list</p>}
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
