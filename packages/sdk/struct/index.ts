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
