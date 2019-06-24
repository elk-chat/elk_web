import {
  AddContact, GetContacts, DeleteContact, UpdateContact, GetFullUsers
} from '@little-chat/sdk';
import {
  put, takeLatest, call
} from 'redux-saga/effects';
import {
  ContactEntity, ContactActions
} from '../types';
import array2obj from '../lib/array2obj';

export const SELECT_CONTACT = 'SELECT_CONTACT';
export const selectContact = (conctactEntity: ContactEntity): ContactActions => ({
  type: SELECT_CONTACT,
  conctactEntity
});

export const APPLY_GET_CONTACTS = 'APPLY_GET_CONTACTS';
export function applyGetContacts() {
  return {
    type: APPLY_GET_CONTACTS
  };
}

export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS';
export function* getContacts() {
  try {
    const { Contacts } = yield call(GetContacts);
    // const contactsDataObj = array2obj(Contacts, 'UserID');
    const userIDs = Contacts.map(item => item.UserID);
    const { Users } = yield call(GetFullUsers, { UserIDs: userIDs });
    yield put({ type: RECEIVE_CONTACTS, contactsData: Users });
  } catch (e) {
    console.log(e);
  }
}

export function* watchContactActions() {
  yield takeLatest(APPLY_GET_CONTACTS, getContacts);
}
