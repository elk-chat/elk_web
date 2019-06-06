import {
  SELECT_CONTACT,
} from "../actions";
import {
  ContactEntity, ContactActions, ActionType
} from '../types';

import { FakeContactData } from './fake-data';

export const contactData = (
  state: ContactEntity[] = FakeContactData,
  action: ActionType
) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const selectedContact = (
  state: ContactEntity = {},
  action: ContactActions
): ContactEntity => {
  switch (action.type) {
    case SELECT_CONTACT:
      return action.conctactEntity;
    default:
      return state;
  }
};
