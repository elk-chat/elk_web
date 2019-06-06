import {
  ContactEntity, ContactActions
} from '../types';

export const SELECT_CONTACT = 'SELECT_CONTACT';
export const selectContact = (conctactEntity: ContactEntity): ContactActions => ({
  type: SELECT_CONTACT,
  conctactEntity
});
