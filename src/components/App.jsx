import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Container } from './App.styled';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = newContact => {
    this.setState(prevState => {
      const contactNames = prevState.contacts.map(contact =>
        contact.name.toLowerCase()
      );
      if (contactNames.includes(newContact.name.toLowerCase())) {
        alert(`${newContact.name} is already in contacts!`);
      } else {
        return {
          name: newContact,
          contacts: [newContact, ...prevState.contacts],
        };
      }
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <Container>
        <ContactForm
          title={'phonebook'}
          value="{this.state}"
          onSubmit={this.addContact}
        />

        <ContactsList
          title={'contacts'}
          contacts={filteredContacts}
          onFilter={this.changeFilter}
          onDelete={this.deleteContact}
        />
      </Container>
    );
  }
}
