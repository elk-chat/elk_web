import JSBI from 'jsbi';
import SDK from '../lib/sdk';

export interface HeaderStruct {
  Len: number;
  Sig: number;
  ApplicationID: number;
  AuthKeyID: typeof JSBI.BigInt;
  SessionID: typeof JSBI.BigInt;
  RequestID: typeof JSBI.BigInt;
  ResponseID: typeof JSBI.BigInt;
}

export interface DecodedDataStruct extends HeaderStruct {
  DataBuf: Uint8Array;
  Data?: {};
}

export interface ErrorInfo extends SDK.kproto.IError {
  Code: string;
  Message: string;
}
