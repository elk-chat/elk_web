import {
  SELECT_CONTACT, RECEIVE_CONTACTS
} from "../actions";
import {
  ContactEntity, ContactList, ContactState,
  ContactActions, ActionType
} from '../types';
import array2obj from "../lib/array2obj";

// import { FakeContactData } from './fake-data';

export const contactData = (
  state: ContactState = {
    array: [],
    obj: {}
  },
  action: ActionType
) => {
  let nextState;
  switch (action.type) {
    case RECEIVE_CONTACTS:
      const { contactsData } = action;
      const nextArr = [...contactsData].sort(
        (f, s) => s.UserName[0].charCodeAt() - f.UserName[0].charCodeAt()
      );
      nextState = {
        array: nextArr,
        obj: array2obj(nextArr, 'UserID')
      };
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
