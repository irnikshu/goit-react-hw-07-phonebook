// export const getAllContacts = ({contacts}) => contacts.items;
export const getAllContacts = store => store.contacts;

export const getVisibleContact = ({ contacts, filter }) => {
     if (!filter) {
      // return contacts.items;
       return contacts;
    }
    // const normalizedFilter = contacts.items.filter.toLowerCase();
  const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
}