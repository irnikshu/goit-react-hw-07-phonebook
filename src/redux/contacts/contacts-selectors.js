

export const getAllContacts  = state => state.contacts.items;

export const getVisibleContact = ({contacts,filter}) => {
        if (!filter) {
            return contacts.items;
        }
    const normalizedFilter = filter.toLowerCase();
        const result = contacts.items.filter(({ name}) => {
            return (name.toLowerCase().includes(normalizedFilter))
        })
        return result;
    }