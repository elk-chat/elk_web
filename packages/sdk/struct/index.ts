import SDK from '../lib/sdk';

export interface HeaderStruct {
  Len: number;
  Sig: number;
  AuthKeyID: BigInt;
  SessionID: BigInt;
  RequestID: BigInt;
  ResponseID: BigInt;
}

export interface DecodedDataStruct extends HeaderStruct {
  DataBuf: Uint8Array;
  Data?: {};
}

export interface ErrorInfo extends SDK.kproto.IError {
  Code: string;
  Message: string;
}
