import {
  SELECT_CONTACT, RECEIVE_CONTACTS
} from "../actions";
import {
  ContactEntity, ContactList,
  ContactActions, ActionType
} from '../types';

// import { FakeContactData } from './fake-data';

export const contactData = (
  state: ContactEntity[] = [],
  action: ActionType
) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_CONTACTS:
      const { contactsData } = action;
      console.log(contactsData)
      nextState = [...contactsData];
      nextState.sort((f, s) => s.Username[0].charCodeAt() - f.Username[0].charCodeAt());
      return nextState;
    default:
      return state;
  }
};

export const selectedContact = (
  state: ContactEntity = {},
  action: ContactActions
) => {
  switch (action.type) {
    case SELECT_CONTACT:
      return action.conctactEntity;
    default:
      return state;
  }
};
