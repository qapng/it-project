export function compareByViews(a, b) {
  if (a.numViewed < b.numViewed) {
    return -1;
  }
  if (a.numViewed > b.numViewed) {
    return 1;
  }
  return 0;
}
export function compareByLastViewed(a, b) {
  if (a['lastViewed'] > b['lastViewed']) {
    return -1;
  }
  if (a['lastViewed'] < b['lastViewed']) {
    return 1;
  }
  return 0;
}

export function filterContacts(contacts, category, name, email, phoneNumber) {
  let newContacts = contacts;
  if (category) {
    newContacts = newContacts.filter((contact) => {
      const categoryList = category.split(' ');
      for (let index = 0; index < categoryList.length; index++) {
        if (contact.category === categoryList[index].replace('-', ' ')) {
          return true;
        }
      }
      return false;
    });
  }

  if (name) {
    newContacts = newContacts.filter((contact) =>
      contact.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (email) {
    newContacts = newContacts.filter((contact) => {
      if (contact.email) {
        return contact.email.toLowerCase().includes(email.toLowerCase());
      }
      return false;
    });
  }
  if (phoneNumber) {
    newContacts = newContacts.filter((contact) => {
      if (contact.phoneNumber) {
        return contact.phoneNumber
          .toLowerCase()
          .includes(phoneNumber.toLowerCase());
      }
      return false;
    });
  }
  return newContacts;
}

export default { compareByViews, compareByLastViewed, filterContacts };
