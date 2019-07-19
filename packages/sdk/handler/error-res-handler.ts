import { EventEmitter } from 'basic-helper';
import { ErrorInfo } from '../struct';
import { SESSION_TIMEOUT } from '../constant';

export default function failResHandler(err: ErrorInfo) {
  switch (err.Code) {
    case 'B00006':
      EventEmitter.emit(SESSION_TIMEOUT, true);
      break;
  }
  return err;
}
