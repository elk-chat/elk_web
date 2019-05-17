import * as $protobuf from "protobufjs";
/** Namespace kproto. */
export namespace kproto {

    /** Properties of an Error. */
    interface IError {

        /** Error Code */
        Code?: (string|null);

        /** Error Message */
        Message?: (string|null);
    }

    /** Represents an Error. */
    class Error implements IError {

        /**
         * Constructs a new Error.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IError);

        /** Error Code. */
        public Code: string;

        /** Error Message. */
        public Message: string;

        /**
         * Creates a new Error instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Error instance
         */
        public static create(properties?: kproto.IError): kproto.Error;

        /**
         * Encodes the specified Error message. Does not implicitly {@link kproto.Error.verify|verify} messages.
         * @param message Error message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Error message, length delimited. Does not implicitly {@link kproto.Error.verify|verify} messages.
         * @param message Error message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IError, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Error message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.Error;

        /**
         * Decodes an Error message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Error
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.Error;

        /**
         * Verifies an Error message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Error message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Error
         */
        public static fromObject(object: { [k: string]: any }): kproto.Error;

        /**
         * Creates a plain object from an Error message. Also converts values to other types if specified.
         * @param message Error
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.Error, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Error to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Success. */
    interface ISuccess {
    }

    /** Represents a Success. */
    class Success implements ISuccess {

        /**
         * Constructs a new Success.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.ISuccess);

        /**
         * Creates a new Success instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Success instance
         */
        public static create(properties?: kproto.ISuccess): kproto.Success;

        /**
         * Encodes the specified Success message. Does not implicitly {@link kproto.Success.verify|verify} messages.
         * @param message Success message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.ISuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Success message, length delimited. Does not implicitly {@link kproto.Success.verify|verify} messages.
         * @param message Success message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.ISuccess, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Success message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Success
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.Success;

        /**
         * Decodes a Success message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Success
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.Success;

        /**
         * Verifies a Success message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Success message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Success
         */
        public static fromObject(object: { [k: string]: any }): kproto.Success;

        /**
         * Creates a plain object from a Success message. Also converts values to other types if specified.
         * @param message Success
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.Success, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Success to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StateAck. */
    interface IStateAck {

        /** StateAck ChatID */
        ChatID?: (number|Long|null);

        /** StateAck MessageID */
        MessageID?: (number|Long|null);

        /** StateAck State */
        State?: (number|Long|null);
    }

    /** Represents a StateAck. */
    class StateAck implements IStateAck {

        /**
         * Constructs a new StateAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IStateAck);

        /** StateAck ChatID. */
        public ChatID: (number|Long);

        /** StateAck MessageID. */
        public MessageID: (number|Long);

        /** StateAck State. */
        public State: (number|Long);

        /**
         * Creates a new StateAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StateAck instance
         */
        public static create(properties?: kproto.IStateAck): kproto.StateAck;

        /**
         * Encodes the specified StateAck message. Does not implicitly {@link kproto.StateAck.verify|verify} messages.
         * @param message StateAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IStateAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StateAck message, length delimited. Does not implicitly {@link kproto.StateAck.verify|verify} messages.
         * @param message StateAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IStateAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StateAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StateAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.StateAck;

        /**
         * Decodes a StateAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StateAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.StateAck;

        /**
         * Verifies a StateAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StateAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StateAck
         */
        public static fromObject(object: { [k: string]: any }): kproto.StateAck;

        /**
         * Creates a plain object from a StateAck message. Also converts values to other types if specified.
         * @param message StateAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.StateAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StateAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StateUpdate. */
    interface IStateUpdate {

        /** StateUpdate ChatID */
        ChatID?: (number|Long|null);

        /** StateUpdate MessageID */
        MessageID?: (number|Long|null);

        /** StateUpdate State */
        State?: (number|Long|null);

        /** StateUpdate MessageDigest */
        MessageDigest?: (string|null);
    }

    /** Represents a StateUpdate. */
    class StateUpdate implements IStateUpdate {

        /**
         * Constructs a new StateUpdate.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IStateUpdate);

        /** StateUpdate ChatID. */
        public ChatID: (number|Long);

        /** StateUpdate MessageID. */
        public MessageID: (number|Long);

        /** StateUpdate State. */
        public State: (number|Long);

        /** StateUpdate MessageDigest. */
        public MessageDigest: string;

        /**
         * Creates a new StateUpdate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StateUpdate instance
         */
        public static create(properties?: kproto.IStateUpdate): kproto.StateUpdate;

        /**
         * Encodes the specified StateUpdate message. Does not implicitly {@link kproto.StateUpdate.verify|verify} messages.
         * @param message StateUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IStateUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StateUpdate message, length delimited. Does not implicitly {@link kproto.StateUpdate.verify|verify} messages.
         * @param message StateUpdate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IStateUpdate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StateUpdate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StateUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.StateUpdate;

        /**
         * Decodes a StateUpdate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StateUpdate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.StateUpdate;

        /**
         * Verifies a StateUpdate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StateUpdate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StateUpdate
         */
        public static fromObject(object: { [k: string]: any }): kproto.StateUpdate;

        /**
         * Creates a plain object from a StateUpdate message. Also converts values to other types if specified.
         * @param message StateUpdate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.StateUpdate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StateUpdate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AuthKeyReq. */
    interface IAuthKeyReq {
    }

    /** Represents an AuthKeyReq. */
    class AuthKeyReq implements IAuthKeyReq {

        /**
         * Constructs a new AuthKeyReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IAuthKeyReq);

        /**
         * Creates a new AuthKeyReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AuthKeyReq instance
         */
        public static create(properties?: kproto.IAuthKeyReq): kproto.AuthKeyReq;

        /**
         * Encodes the specified AuthKeyReq message. Does not implicitly {@link kproto.AuthKeyReq.verify|verify} messages.
         * @param message AuthKeyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IAuthKeyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AuthKeyReq message, length delimited. Does not implicitly {@link kproto.AuthKeyReq.verify|verify} messages.
         * @param message AuthKeyReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IAuthKeyReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AuthKeyReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AuthKeyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.AuthKeyReq;

        /**
         * Decodes an AuthKeyReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AuthKeyReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.AuthKeyReq;

        /**
         * Verifies an AuthKeyReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AuthKeyReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AuthKeyReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.AuthKeyReq;

        /**
         * Creates a plain object from an AuthKeyReq message. Also converts values to other types if specified.
         * @param message AuthKeyReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.AuthKeyReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AuthKeyReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AuthKeyResp. */
    interface IAuthKeyResp {
    }

    /** Represents an AuthKeyResp. */
    class AuthKeyResp implements IAuthKeyResp {

        /**
         * Constructs a new AuthKeyResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IAuthKeyResp);

        /**
         * Creates a new AuthKeyResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AuthKeyResp instance
         */
        public static create(properties?: kproto.IAuthKeyResp): kproto.AuthKeyResp;

        /**
         * Encodes the specified AuthKeyResp message. Does not implicitly {@link kproto.AuthKeyResp.verify|verify} messages.
         * @param message AuthKeyResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IAuthKeyResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AuthKeyResp message, length delimited. Does not implicitly {@link kproto.AuthKeyResp.verify|verify} messages.
         * @param message AuthKeyResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IAuthKeyResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AuthKeyResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AuthKeyResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.AuthKeyResp;

        /**
         * Decodes an AuthKeyResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AuthKeyResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.AuthKeyResp;

        /**
         * Verifies an AuthKeyResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AuthKeyResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AuthKeyResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.AuthKeyResp;

        /**
         * Creates a plain object from an AuthKeyResp message. Also converts values to other types if specified.
         * @param message AuthKeyResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.AuthKeyResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AuthKeyResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeartbeatReq. */
    interface IHeartbeatReq {
    }

    /** Represents a HeartbeatReq. */
    class HeartbeatReq implements IHeartbeatReq {

        /**
         * Constructs a new HeartbeatReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IHeartbeatReq);

        /**
         * Creates a new HeartbeatReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartbeatReq instance
         */
        public static create(properties?: kproto.IHeartbeatReq): kproto.HeartbeatReq;

        /**
         * Encodes the specified HeartbeatReq message. Does not implicitly {@link kproto.HeartbeatReq.verify|verify} messages.
         * @param message HeartbeatReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IHeartbeatReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartbeatReq message, length delimited. Does not implicitly {@link kproto.HeartbeatReq.verify|verify} messages.
         * @param message HeartbeatReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IHeartbeatReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartbeatReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartbeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.HeartbeatReq;

        /**
         * Decodes a HeartbeatReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartbeatReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.HeartbeatReq;

        /**
         * Verifies a HeartbeatReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartbeatReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartbeatReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.HeartbeatReq;

        /**
         * Creates a plain object from a HeartbeatReq message. Also converts values to other types if specified.
         * @param message HeartbeatReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.HeartbeatReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartbeatReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a HeartbeatResp. */
    interface IHeartbeatResp {
    }

    /** Represents a HeartbeatResp. */
    class HeartbeatResp implements IHeartbeatResp {

        /**
         * Constructs a new HeartbeatResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IHeartbeatResp);

        /**
         * Creates a new HeartbeatResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns HeartbeatResp instance
         */
        public static create(properties?: kproto.IHeartbeatResp): kproto.HeartbeatResp;

        /**
         * Encodes the specified HeartbeatResp message. Does not implicitly {@link kproto.HeartbeatResp.verify|verify} messages.
         * @param message HeartbeatResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IHeartbeatResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified HeartbeatResp message, length delimited. Does not implicitly {@link kproto.HeartbeatResp.verify|verify} messages.
         * @param message HeartbeatResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IHeartbeatResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a HeartbeatResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns HeartbeatResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.HeartbeatResp;

        /**
         * Decodes a HeartbeatResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns HeartbeatResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.HeartbeatResp;

        /**
         * Verifies a HeartbeatResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a HeartbeatResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns HeartbeatResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.HeartbeatResp;

        /**
         * Creates a plain object from a HeartbeatResp message. Also converts values to other types if specified.
         * @param message HeartbeatResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.HeartbeatResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this HeartbeatResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InitConnectionReq. */
    interface IInitConnectionReq {
    }

    /** Represents an InitConnectionReq. */
    class InitConnectionReq implements IInitConnectionReq {

        /**
         * Constructs a new InitConnectionReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IInitConnectionReq);

        /**
         * Creates a new InitConnectionReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InitConnectionReq instance
         */
        public static create(properties?: kproto.IInitConnectionReq): kproto.InitConnectionReq;

        /**
         * Encodes the specified InitConnectionReq message. Does not implicitly {@link kproto.InitConnectionReq.verify|verify} messages.
         * @param message InitConnectionReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IInitConnectionReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InitConnectionReq message, length delimited. Does not implicitly {@link kproto.InitConnectionReq.verify|verify} messages.
         * @param message InitConnectionReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IInitConnectionReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InitConnectionReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InitConnectionReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.InitConnectionReq;

        /**
         * Decodes an InitConnectionReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InitConnectionReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.InitConnectionReq;

        /**
         * Verifies an InitConnectionReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InitConnectionReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InitConnectionReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.InitConnectionReq;

        /**
         * Creates a plain object from an InitConnectionReq message. Also converts values to other types if specified.
         * @param message InitConnectionReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.InitConnectionReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InitConnectionReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InitConnectionResp. */
    interface IInitConnectionResp {
    }

    /** Represents an InitConnectionResp. */
    class InitConnectionResp implements IInitConnectionResp {

        /**
         * Constructs a new InitConnectionResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IInitConnectionResp);

        /**
         * Creates a new InitConnectionResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InitConnectionResp instance
         */
        public static create(properties?: kproto.IInitConnectionResp): kproto.InitConnectionResp;

        /**
         * Encodes the specified InitConnectionResp message. Does not implicitly {@link kproto.InitConnectionResp.verify|verify} messages.
         * @param message InitConnectionResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IInitConnectionResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InitConnectionResp message, length delimited. Does not implicitly {@link kproto.InitConnectionResp.verify|verify} messages.
         * @param message InitConnectionResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IInitConnectionResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InitConnectionResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InitConnectionResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.InitConnectionResp;

        /**
         * Decodes an InitConnectionResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InitConnectionResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.InitConnectionResp;

        /**
         * Verifies an InitConnectionResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InitConnectionResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InitConnectionResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.InitConnectionResp;

        /**
         * Creates a plain object from an InitConnectionResp message. Also converts values to other types if specified.
         * @param message InitConnectionResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.InitConnectionResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InitConnectionResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestVerificationCodeReq. */
    interface IRequestVerificationCodeReq {
    }

    /** Represents a RequestVerificationCodeReq. */
    class RequestVerificationCodeReq implements IRequestVerificationCodeReq {

        /**
         * Constructs a new RequestVerificationCodeReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IRequestVerificationCodeReq);

        /**
         * Creates a new RequestVerificationCodeReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestVerificationCodeReq instance
         */
        public static create(properties?: kproto.IRequestVerificationCodeReq): kproto.RequestVerificationCodeReq;

        /**
         * Encodes the specified RequestVerificationCodeReq message. Does not implicitly {@link kproto.RequestVerificationCodeReq.verify|verify} messages.
         * @param message RequestVerificationCodeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IRequestVerificationCodeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestVerificationCodeReq message, length delimited. Does not implicitly {@link kproto.RequestVerificationCodeReq.verify|verify} messages.
         * @param message RequestVerificationCodeReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IRequestVerificationCodeReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestVerificationCodeReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestVerificationCodeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.RequestVerificationCodeReq;

        /**
         * Decodes a RequestVerificationCodeReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestVerificationCodeReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.RequestVerificationCodeReq;

        /**
         * Verifies a RequestVerificationCodeReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestVerificationCodeReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestVerificationCodeReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.RequestVerificationCodeReq;

        /**
         * Creates a plain object from a RequestVerificationCodeReq message. Also converts values to other types if specified.
         * @param message RequestVerificationCodeReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.RequestVerificationCodeReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestVerificationCodeReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RequestVerificationCodeResp. */
    interface IRequestVerificationCodeResp {
    }

    /** Represents a RequestVerificationCodeResp. */
    class RequestVerificationCodeResp implements IRequestVerificationCodeResp {

        /**
         * Constructs a new RequestVerificationCodeResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IRequestVerificationCodeResp);

        /**
         * Creates a new RequestVerificationCodeResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RequestVerificationCodeResp instance
         */
        public static create(properties?: kproto.IRequestVerificationCodeResp): kproto.RequestVerificationCodeResp;

        /**
         * Encodes the specified RequestVerificationCodeResp message. Does not implicitly {@link kproto.RequestVerificationCodeResp.verify|verify} messages.
         * @param message RequestVerificationCodeResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IRequestVerificationCodeResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RequestVerificationCodeResp message, length delimited. Does not implicitly {@link kproto.RequestVerificationCodeResp.verify|verify} messages.
         * @param message RequestVerificationCodeResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IRequestVerificationCodeResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RequestVerificationCodeResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RequestVerificationCodeResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.RequestVerificationCodeResp;

        /**
         * Decodes a RequestVerificationCodeResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RequestVerificationCodeResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.RequestVerificationCodeResp;

        /**
         * Verifies a RequestVerificationCodeResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RequestVerificationCodeResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RequestVerificationCodeResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.RequestVerificationCodeResp;

        /**
         * Creates a plain object from a RequestVerificationCodeResp message. Also converts values to other types if specified.
         * @param message RequestVerificationCodeResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.RequestVerificationCodeResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RequestVerificationCodeResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CheckAppUpdateReq. */
    interface ICheckAppUpdateReq {
    }

    /** Represents a CheckAppUpdateReq. */
    class CheckAppUpdateReq implements ICheckAppUpdateReq {

        /**
         * Constructs a new CheckAppUpdateReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.ICheckAppUpdateReq);

        /**
         * Creates a new CheckAppUpdateReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckAppUpdateReq instance
         */
        public static create(properties?: kproto.ICheckAppUpdateReq): kproto.CheckAppUpdateReq;

        /**
         * Encodes the specified CheckAppUpdateReq message. Does not implicitly {@link kproto.CheckAppUpdateReq.verify|verify} messages.
         * @param message CheckAppUpdateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.ICheckAppUpdateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckAppUpdateReq message, length delimited. Does not implicitly {@link kproto.CheckAppUpdateReq.verify|verify} messages.
         * @param message CheckAppUpdateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.ICheckAppUpdateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckAppUpdateReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckAppUpdateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.CheckAppUpdateReq;

        /**
         * Decodes a CheckAppUpdateReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckAppUpdateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.CheckAppUpdateReq;

        /**
         * Verifies a CheckAppUpdateReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckAppUpdateReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckAppUpdateReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.CheckAppUpdateReq;

        /**
         * Creates a plain object from a CheckAppUpdateReq message. Also converts values to other types if specified.
         * @param message CheckAppUpdateReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.CheckAppUpdateReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckAppUpdateReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CheckAppUpdateResp. */
    interface ICheckAppUpdateResp {
    }

    /** Represents a CheckAppUpdateResp. */
    class CheckAppUpdateResp implements ICheckAppUpdateResp {

        /**
         * Constructs a new CheckAppUpdateResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.ICheckAppUpdateResp);

        /**
         * Creates a new CheckAppUpdateResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CheckAppUpdateResp instance
         */
        public static create(properties?: kproto.ICheckAppUpdateResp): kproto.CheckAppUpdateResp;

        /**
         * Encodes the specified CheckAppUpdateResp message. Does not implicitly {@link kproto.CheckAppUpdateResp.verify|verify} messages.
         * @param message CheckAppUpdateResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.ICheckAppUpdateResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CheckAppUpdateResp message, length delimited. Does not implicitly {@link kproto.CheckAppUpdateResp.verify|verify} messages.
         * @param message CheckAppUpdateResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.ICheckAppUpdateResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CheckAppUpdateResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CheckAppUpdateResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.CheckAppUpdateResp;

        /**
         * Decodes a CheckAppUpdateResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CheckAppUpdateResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.CheckAppUpdateResp;

        /**
         * Verifies a CheckAppUpdateResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CheckAppUpdateResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CheckAppUpdateResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.CheckAppUpdateResp;

        /**
         * Creates a plain object from a CheckAppUpdateResp message. Also converts values to other types if specified.
         * @param message CheckAppUpdateResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.CheckAppUpdateResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CheckAppUpdateResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserRegisterReq. */
    interface IUserRegisterReq {

        /** UserRegisterReq UserName */
        UserName?: (string|null);

        /** UserRegisterReq Password */
        Password?: (string|null);
    }

    /** Represents a UserRegisterReq. */
    class UserRegisterReq implements IUserRegisterReq {

        /**
         * Constructs a new UserRegisterReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IUserRegisterReq);

        /** UserRegisterReq UserName. */
        public UserName: string;

        /** UserRegisterReq Password. */
        public Password: string;

        /**
         * Creates a new UserRegisterReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserRegisterReq instance
         */
        public static create(properties?: kproto.IUserRegisterReq): kproto.UserRegisterReq;

        /**
         * Encodes the specified UserRegisterReq message. Does not implicitly {@link kproto.UserRegisterReq.verify|verify} messages.
         * @param message UserRegisterReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IUserRegisterReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserRegisterReq message, length delimited. Does not implicitly {@link kproto.UserRegisterReq.verify|verify} messages.
         * @param message UserRegisterReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IUserRegisterReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserRegisterReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserRegisterReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.UserRegisterReq;

        /**
         * Decodes a UserRegisterReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserRegisterReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.UserRegisterReq;

        /**
         * Verifies a UserRegisterReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserRegisterReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserRegisterReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.UserRegisterReq;

        /**
         * Creates a plain object from a UserRegisterReq message. Also converts values to other types if specified.
         * @param message UserRegisterReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.UserRegisterReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserRegisterReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserRegisterResp. */
    interface IUserRegisterResp {
    }

    /** Represents a UserRegisterResp. */
    class UserRegisterResp implements IUserRegisterResp {

        /**
         * Constructs a new UserRegisterResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IUserRegisterResp);

        /**
         * Creates a new UserRegisterResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserRegisterResp instance
         */
        public static create(properties?: kproto.IUserRegisterResp): kproto.UserRegisterResp;

        /**
         * Encodes the specified UserRegisterResp message. Does not implicitly {@link kproto.UserRegisterResp.verify|verify} messages.
         * @param message UserRegisterResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IUserRegisterResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserRegisterResp message, length delimited. Does not implicitly {@link kproto.UserRegisterResp.verify|verify} messages.
         * @param message UserRegisterResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IUserRegisterResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserRegisterResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserRegisterResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.UserRegisterResp;

        /**
         * Decodes a UserRegisterResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserRegisterResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.UserRegisterResp;

        /**
         * Verifies a UserRegisterResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserRegisterResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserRegisterResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.UserRegisterResp;

        /**
         * Creates a plain object from a UserRegisterResp message. Also converts values to other types if specified.
         * @param message UserRegisterResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.UserRegisterResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserRegisterResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserLoginReq. */
    interface IUserLoginReq {

        /** UserLoginReq UserName */
        UserName?: (string|null);

        /** UserLoginReq Password */
        Password?: (string|null);
    }

    /** Represents a UserLoginReq. */
    class UserLoginReq implements IUserLoginReq {

        /**
         * Constructs a new UserLoginReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IUserLoginReq);

        /** UserLoginReq UserName. */
        public UserName: string;

        /** UserLoginReq Password. */
        public Password: string;

        /**
         * Creates a new UserLoginReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLoginReq instance
         */
        public static create(properties?: kproto.IUserLoginReq): kproto.UserLoginReq;

        /**
         * Encodes the specified UserLoginReq message. Does not implicitly {@link kproto.UserLoginReq.verify|verify} messages.
         * @param message UserLoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IUserLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLoginReq message, length delimited. Does not implicitly {@link kproto.UserLoginReq.verify|verify} messages.
         * @param message UserLoginReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IUserLoginReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLoginReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.UserLoginReq;

        /**
         * Decodes a UserLoginReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLoginReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.UserLoginReq;

        /**
         * Verifies a UserLoginReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserLoginReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLoginReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.UserLoginReq;

        /**
         * Creates a plain object from a UserLoginReq message. Also converts values to other types if specified.
         * @param message UserLoginReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.UserLoginReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserLoginReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserLoginResp. */
    interface IUserLoginResp {

        /** UserLoginResp SessionID */
        SessionID?: (number|Long|null);
    }

    /** Represents a UserLoginResp. */
    class UserLoginResp implements IUserLoginResp {

        /**
         * Constructs a new UserLoginResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IUserLoginResp);

        /** UserLoginResp SessionID. */
        public SessionID: (number|Long);

        /**
         * Creates a new UserLoginResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLoginResp instance
         */
        public static create(properties?: kproto.IUserLoginResp): kproto.UserLoginResp;

        /**
         * Encodes the specified UserLoginResp message. Does not implicitly {@link kproto.UserLoginResp.verify|verify} messages.
         * @param message UserLoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IUserLoginResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLoginResp message, length delimited. Does not implicitly {@link kproto.UserLoginResp.verify|verify} messages.
         * @param message UserLoginResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IUserLoginResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLoginResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.UserLoginResp;

        /**
         * Decodes a UserLoginResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLoginResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.UserLoginResp;

        /**
         * Verifies a UserLoginResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserLoginResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLoginResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.UserLoginResp;

        /**
         * Creates a plain object from a UserLoginResp message. Also converts values to other types if specified.
         * @param message UserLoginResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.UserLoginResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserLoginResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserLogoutReq. */
    interface IUserLogoutReq {
    }

    /** Represents a UserLogoutReq. */
    class UserLogoutReq implements IUserLogoutReq {

        /**
         * Constructs a new UserLogoutReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IUserLogoutReq);

        /**
         * Creates a new UserLogoutReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLogoutReq instance
         */
        public static create(properties?: kproto.IUserLogoutReq): kproto.UserLogoutReq;

        /**
         * Encodes the specified UserLogoutReq message. Does not implicitly {@link kproto.UserLogoutReq.verify|verify} messages.
         * @param message UserLogoutReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IUserLogoutReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLogoutReq message, length delimited. Does not implicitly {@link kproto.UserLogoutReq.verify|verify} messages.
         * @param message UserLogoutReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IUserLogoutReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLogoutReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLogoutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.UserLogoutReq;

        /**
         * Decodes a UserLogoutReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLogoutReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.UserLogoutReq;

        /**
         * Verifies a UserLogoutReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserLogoutReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLogoutReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.UserLogoutReq;

        /**
         * Creates a plain object from a UserLogoutReq message. Also converts values to other types if specified.
         * @param message UserLogoutReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.UserLogoutReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserLogoutReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a UserLogoutResp. */
    interface IUserLogoutResp {
    }

    /** Represents a UserLogoutResp. */
    class UserLogoutResp implements IUserLogoutResp {

        /**
         * Constructs a new UserLogoutResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IUserLogoutResp);

        /**
         * Creates a new UserLogoutResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns UserLogoutResp instance
         */
        public static create(properties?: kproto.IUserLogoutResp): kproto.UserLogoutResp;

        /**
         * Encodes the specified UserLogoutResp message. Does not implicitly {@link kproto.UserLogoutResp.verify|verify} messages.
         * @param message UserLogoutResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IUserLogoutResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified UserLogoutResp message, length delimited. Does not implicitly {@link kproto.UserLogoutResp.verify|verify} messages.
         * @param message UserLogoutResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IUserLogoutResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a UserLogoutResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns UserLogoutResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.UserLogoutResp;

        /**
         * Decodes a UserLogoutResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns UserLogoutResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.UserLogoutResp;

        /**
         * Verifies a UserLogoutResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a UserLogoutResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns UserLogoutResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.UserLogoutResp;

        /**
         * Creates a plain object from a UserLogoutResp message. Also converts values to other types if specified.
         * @param message UserLogoutResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.UserLogoutResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this UserLogoutResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ContactAddReq. */
    interface IContactAddReq {
    }

    /** Represents a ContactAddReq. */
    class ContactAddReq implements IContactAddReq {

        /**
         * Constructs a new ContactAddReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IContactAddReq);

        /**
         * Creates a new ContactAddReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContactAddReq instance
         */
        public static create(properties?: kproto.IContactAddReq): kproto.ContactAddReq;

        /**
         * Encodes the specified ContactAddReq message. Does not implicitly {@link kproto.ContactAddReq.verify|verify} messages.
         * @param message ContactAddReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IContactAddReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContactAddReq message, length delimited. Does not implicitly {@link kproto.ContactAddReq.verify|verify} messages.
         * @param message ContactAddReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IContactAddReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContactAddReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContactAddReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ContactAddReq;

        /**
         * Decodes a ContactAddReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContactAddReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ContactAddReq;

        /**
         * Verifies a ContactAddReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContactAddReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContactAddReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.ContactAddReq;

        /**
         * Creates a plain object from a ContactAddReq message. Also converts values to other types if specified.
         * @param message ContactAddReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ContactAddReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContactAddReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ContactAddResp. */
    interface IContactAddResp {
    }

    /** Represents a ContactAddResp. */
    class ContactAddResp implements IContactAddResp {

        /**
         * Constructs a new ContactAddResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IContactAddResp);

        /**
         * Creates a new ContactAddResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContactAddResp instance
         */
        public static create(properties?: kproto.IContactAddResp): kproto.ContactAddResp;

        /**
         * Encodes the specified ContactAddResp message. Does not implicitly {@link kproto.ContactAddResp.verify|verify} messages.
         * @param message ContactAddResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IContactAddResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContactAddResp message, length delimited. Does not implicitly {@link kproto.ContactAddResp.verify|verify} messages.
         * @param message ContactAddResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IContactAddResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContactAddResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContactAddResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ContactAddResp;

        /**
         * Decodes a ContactAddResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContactAddResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ContactAddResp;

        /**
         * Verifies a ContactAddResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContactAddResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContactAddResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.ContactAddResp;

        /**
         * Creates a plain object from a ContactAddResp message. Also converts values to other types if specified.
         * @param message ContactAddResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ContactAddResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContactAddResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ContactUpdateReq. */
    interface IContactUpdateReq {
    }

    /** Represents a ContactUpdateReq. */
    class ContactUpdateReq implements IContactUpdateReq {

        /**
         * Constructs a new ContactUpdateReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IContactUpdateReq);

        /**
         * Creates a new ContactUpdateReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContactUpdateReq instance
         */
        public static create(properties?: kproto.IContactUpdateReq): kproto.ContactUpdateReq;

        /**
         * Encodes the specified ContactUpdateReq message. Does not implicitly {@link kproto.ContactUpdateReq.verify|verify} messages.
         * @param message ContactUpdateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IContactUpdateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContactUpdateReq message, length delimited. Does not implicitly {@link kproto.ContactUpdateReq.verify|verify} messages.
         * @param message ContactUpdateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IContactUpdateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContactUpdateReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContactUpdateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ContactUpdateReq;

        /**
         * Decodes a ContactUpdateReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContactUpdateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ContactUpdateReq;

        /**
         * Verifies a ContactUpdateReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContactUpdateReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContactUpdateReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.ContactUpdateReq;

        /**
         * Creates a plain object from a ContactUpdateReq message. Also converts values to other types if specified.
         * @param message ContactUpdateReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ContactUpdateReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContactUpdateReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ContactUpdateResp. */
    interface IContactUpdateResp {
    }

    /** Represents a ContactUpdateResp. */
    class ContactUpdateResp implements IContactUpdateResp {

        /**
         * Constructs a new ContactUpdateResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IContactUpdateResp);

        /**
         * Creates a new ContactUpdateResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContactUpdateResp instance
         */
        public static create(properties?: kproto.IContactUpdateResp): kproto.ContactUpdateResp;

        /**
         * Encodes the specified ContactUpdateResp message. Does not implicitly {@link kproto.ContactUpdateResp.verify|verify} messages.
         * @param message ContactUpdateResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IContactUpdateResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContactUpdateResp message, length delimited. Does not implicitly {@link kproto.ContactUpdateResp.verify|verify} messages.
         * @param message ContactUpdateResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IContactUpdateResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContactUpdateResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContactUpdateResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ContactUpdateResp;

        /**
         * Decodes a ContactUpdateResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContactUpdateResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ContactUpdateResp;

        /**
         * Verifies a ContactUpdateResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContactUpdateResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContactUpdateResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.ContactUpdateResp;

        /**
         * Creates a plain object from a ContactUpdateResp message. Also converts values to other types if specified.
         * @param message ContactUpdateResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ContactUpdateResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContactUpdateResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ContactDeleteReq. */
    interface IContactDeleteReq {
    }

    /** Represents a ContactDeleteReq. */
    class ContactDeleteReq implements IContactDeleteReq {

        /**
         * Constructs a new ContactDeleteReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IContactDeleteReq);

        /**
         * Creates a new ContactDeleteReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContactDeleteReq instance
         */
        public static create(properties?: kproto.IContactDeleteReq): kproto.ContactDeleteReq;

        /**
         * Encodes the specified ContactDeleteReq message. Does not implicitly {@link kproto.ContactDeleteReq.verify|verify} messages.
         * @param message ContactDeleteReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IContactDeleteReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContactDeleteReq message, length delimited. Does not implicitly {@link kproto.ContactDeleteReq.verify|verify} messages.
         * @param message ContactDeleteReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IContactDeleteReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContactDeleteReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContactDeleteReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ContactDeleteReq;

        /**
         * Decodes a ContactDeleteReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContactDeleteReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ContactDeleteReq;

        /**
         * Verifies a ContactDeleteReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContactDeleteReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContactDeleteReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.ContactDeleteReq;

        /**
         * Creates a plain object from a ContactDeleteReq message. Also converts values to other types if specified.
         * @param message ContactDeleteReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ContactDeleteReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContactDeleteReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ContactDeleteResp. */
    interface IContactDeleteResp {
    }

    /** Represents a ContactDeleteResp. */
    class ContactDeleteResp implements IContactDeleteResp {

        /**
         * Constructs a new ContactDeleteResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IContactDeleteResp);

        /**
         * Creates a new ContactDeleteResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ContactDeleteResp instance
         */
        public static create(properties?: kproto.IContactDeleteResp): kproto.ContactDeleteResp;

        /**
         * Encodes the specified ContactDeleteResp message. Does not implicitly {@link kproto.ContactDeleteResp.verify|verify} messages.
         * @param message ContactDeleteResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IContactDeleteResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ContactDeleteResp message, length delimited. Does not implicitly {@link kproto.ContactDeleteResp.verify|verify} messages.
         * @param message ContactDeleteResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IContactDeleteResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ContactDeleteResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ContactDeleteResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ContactDeleteResp;

        /**
         * Decodes a ContactDeleteResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ContactDeleteResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ContactDeleteResp;

        /**
         * Verifies a ContactDeleteResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ContactDeleteResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ContactDeleteResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.ContactDeleteResp;

        /**
         * Creates a plain object from a ContactDeleteResp message. Also converts values to other types if specified.
         * @param message ContactDeleteResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ContactDeleteResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ContactDeleteResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatCreateReq. */
    interface IChatCreateReq {

        /** ChatCreateReq Title */
        Title?: (string|null);
    }

    /** Represents a ChatCreateReq. */
    class ChatCreateReq implements IChatCreateReq {

        /**
         * Constructs a new ChatCreateReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatCreateReq);

        /** ChatCreateReq Title. */
        public Title: string;

        /**
         * Creates a new ChatCreateReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatCreateReq instance
         */
        public static create(properties?: kproto.IChatCreateReq): kproto.ChatCreateReq;

        /**
         * Encodes the specified ChatCreateReq message. Does not implicitly {@link kproto.ChatCreateReq.verify|verify} messages.
         * @param message ChatCreateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatCreateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatCreateReq message, length delimited. Does not implicitly {@link kproto.ChatCreateReq.verify|verify} messages.
         * @param message ChatCreateReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatCreateReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatCreateReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatCreateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatCreateReq;

        /**
         * Decodes a ChatCreateReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatCreateReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatCreateReq;

        /**
         * Verifies a ChatCreateReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatCreateReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatCreateReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatCreateReq;

        /**
         * Creates a plain object from a ChatCreateReq message. Also converts values to other types if specified.
         * @param message ChatCreateReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatCreateReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatCreateReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatCreateResp. */
    interface IChatCreateResp {
    }

    /** Represents a ChatCreateResp. */
    class ChatCreateResp implements IChatCreateResp {

        /**
         * Constructs a new ChatCreateResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatCreateResp);

        /**
         * Creates a new ChatCreateResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatCreateResp instance
         */
        public static create(properties?: kproto.IChatCreateResp): kproto.ChatCreateResp;

        /**
         * Encodes the specified ChatCreateResp message. Does not implicitly {@link kproto.ChatCreateResp.verify|verify} messages.
         * @param message ChatCreateResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatCreateResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatCreateResp message, length delimited. Does not implicitly {@link kproto.ChatCreateResp.verify|verify} messages.
         * @param message ChatCreateResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatCreateResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatCreateResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatCreateResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatCreateResp;

        /**
         * Decodes a ChatCreateResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatCreateResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatCreateResp;

        /**
         * Verifies a ChatCreateResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatCreateResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatCreateResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatCreateResp;

        /**
         * Creates a plain object from a ChatCreateResp message. Also converts values to other types if specified.
         * @param message ChatCreateResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatCreateResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatCreateResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Chat. */
    interface IChat {

        /** Chat ID */
        ID?: (number|Long|null);

        /** Chat CreateAt */
        CreateAt?: (number|Long|null);

        /** Chat UpdatedAt */
        UpdatedAt?: (number|Long|null);

        /** Chat ChatType */
        ChatType?: (number|null);

        /** Chat Title */
        Title?: (string|null);

        /** Chat Disabled */
        Disabled?: (number|null);
    }

    /** Represents a Chat. */
    class Chat implements IChat {

        /**
         * Constructs a new Chat.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChat);

        /** Chat ID. */
        public ID: (number|Long);

        /** Chat CreateAt. */
        public CreateAt: (number|Long);

        /** Chat UpdatedAt. */
        public UpdatedAt: (number|Long);

        /** Chat ChatType. */
        public ChatType: number;

        /** Chat Title. */
        public Title: string;

        /** Chat Disabled. */
        public Disabled: number;

        /**
         * Creates a new Chat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Chat instance
         */
        public static create(properties?: kproto.IChat): kproto.Chat;

        /**
         * Encodes the specified Chat message. Does not implicitly {@link kproto.Chat.verify|verify} messages.
         * @param message Chat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Chat message, length delimited. Does not implicitly {@link kproto.Chat.verify|verify} messages.
         * @param message Chat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Chat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Chat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.Chat;

        /**
         * Decodes a Chat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Chat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.Chat;

        /**
         * Verifies a Chat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Chat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Chat
         */
        public static fromObject(object: { [k: string]: any }): kproto.Chat;

        /**
         * Creates a plain object from a Chat message. Also converts values to other types if specified.
         * @param message Chat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.Chat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Chat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatGetChatsReq. */
    interface IChatGetChatsReq {
    }

    /** Represents a ChatGetChatsReq. */
    class ChatGetChatsReq implements IChatGetChatsReq {

        /**
         * Constructs a new ChatGetChatsReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatGetChatsReq);

        /**
         * Creates a new ChatGetChatsReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatGetChatsReq instance
         */
        public static create(properties?: kproto.IChatGetChatsReq): kproto.ChatGetChatsReq;

        /**
         * Encodes the specified ChatGetChatsReq message. Does not implicitly {@link kproto.ChatGetChatsReq.verify|verify} messages.
         * @param message ChatGetChatsReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatGetChatsReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatGetChatsReq message, length delimited. Does not implicitly {@link kproto.ChatGetChatsReq.verify|verify} messages.
         * @param message ChatGetChatsReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatGetChatsReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatGetChatsReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatGetChatsReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatGetChatsReq;

        /**
         * Decodes a ChatGetChatsReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatGetChatsReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatGetChatsReq;

        /**
         * Verifies a ChatGetChatsReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatGetChatsReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatGetChatsReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatGetChatsReq;

        /**
         * Creates a plain object from a ChatGetChatsReq message. Also converts values to other types if specified.
         * @param message ChatGetChatsReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatGetChatsReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatGetChatsReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatGetChatsResp. */
    interface IChatGetChatsResp {

        /** ChatGetChatsResp Chats */
        Chats?: (kproto.IChat[]|null);
    }

    /** Represents a ChatGetChatsResp. */
    class ChatGetChatsResp implements IChatGetChatsResp {

        /**
         * Constructs a new ChatGetChatsResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatGetChatsResp);

        /** ChatGetChatsResp Chats. */
        public Chats: kproto.IChat[];

        /**
         * Creates a new ChatGetChatsResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatGetChatsResp instance
         */
        public static create(properties?: kproto.IChatGetChatsResp): kproto.ChatGetChatsResp;

        /**
         * Encodes the specified ChatGetChatsResp message. Does not implicitly {@link kproto.ChatGetChatsResp.verify|verify} messages.
         * @param message ChatGetChatsResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatGetChatsResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatGetChatsResp message, length delimited. Does not implicitly {@link kproto.ChatGetChatsResp.verify|verify} messages.
         * @param message ChatGetChatsResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatGetChatsResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatGetChatsResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatGetChatsResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatGetChatsResp;

        /**
         * Decodes a ChatGetChatsResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatGetChatsResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatGetChatsResp;

        /**
         * Verifies a ChatGetChatsResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatGetChatsResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatGetChatsResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatGetChatsResp;

        /**
         * Creates a plain object from a ChatGetChatsResp message. Also converts values to other types if specified.
         * @param message ChatGetChatsResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatGetChatsResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatGetChatsResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatAddMemberReq. */
    interface IChatAddMemberReq {

        /** ChatAddMemberReq ChatID */
        ChatID?: (number|Long|null);

        /** ChatAddMemberReq UserIDs */
        UserIDs?: ((number|Long)[]|null);
    }

    /** Represents a ChatAddMemberReq. */
    class ChatAddMemberReq implements IChatAddMemberReq {

        /**
         * Constructs a new ChatAddMemberReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatAddMemberReq);

        /** ChatAddMemberReq ChatID. */
        public ChatID: (number|Long);

        /** ChatAddMemberReq UserIDs. */
        public UserIDs: (number|Long)[];

        /**
         * Creates a new ChatAddMemberReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatAddMemberReq instance
         */
        public static create(properties?: kproto.IChatAddMemberReq): kproto.ChatAddMemberReq;

        /**
         * Encodes the specified ChatAddMemberReq message. Does not implicitly {@link kproto.ChatAddMemberReq.verify|verify} messages.
         * @param message ChatAddMemberReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatAddMemberReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatAddMemberReq message, length delimited. Does not implicitly {@link kproto.ChatAddMemberReq.verify|verify} messages.
         * @param message ChatAddMemberReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatAddMemberReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatAddMemberReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatAddMemberReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatAddMemberReq;

        /**
         * Decodes a ChatAddMemberReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatAddMemberReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatAddMemberReq;

        /**
         * Verifies a ChatAddMemberReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatAddMemberReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatAddMemberReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatAddMemberReq;

        /**
         * Creates a plain object from a ChatAddMemberReq message. Also converts values to other types if specified.
         * @param message ChatAddMemberReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatAddMemberReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatAddMemberReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatAddMemberResp. */
    interface IChatAddMemberResp {
    }

    /** Represents a ChatAddMemberResp. */
    class ChatAddMemberResp implements IChatAddMemberResp {

        /**
         * Constructs a new ChatAddMemberResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatAddMemberResp);

        /**
         * Creates a new ChatAddMemberResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatAddMemberResp instance
         */
        public static create(properties?: kproto.IChatAddMemberResp): kproto.ChatAddMemberResp;

        /**
         * Encodes the specified ChatAddMemberResp message. Does not implicitly {@link kproto.ChatAddMemberResp.verify|verify} messages.
         * @param message ChatAddMemberResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatAddMemberResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatAddMemberResp message, length delimited. Does not implicitly {@link kproto.ChatAddMemberResp.verify|verify} messages.
         * @param message ChatAddMemberResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatAddMemberResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatAddMemberResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatAddMemberResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatAddMemberResp;

        /**
         * Decodes a ChatAddMemberResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatAddMemberResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatAddMemberResp;

        /**
         * Verifies a ChatAddMemberResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatAddMemberResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatAddMemberResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatAddMemberResp;

        /**
         * Creates a plain object from a ChatAddMemberResp message. Also converts values to other types if specified.
         * @param message ChatAddMemberResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatAddMemberResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatAddMemberResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatSendMessageReq. */
    interface IChatSendMessageReq {

        /** ChatSendMessageReq ChatID */
        ChatID?: (number|Long|null);

        /** ChatSendMessageReq MessageType */
        MessageType?: (number|null);

        /** ChatSendMessageReq Message */
        Message?: (string|null);
    }

    /** Represents a ChatSendMessageReq. */
    class ChatSendMessageReq implements IChatSendMessageReq {

        /**
         * Constructs a new ChatSendMessageReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatSendMessageReq);

        /** ChatSendMessageReq ChatID. */
        public ChatID: (number|Long);

        /** ChatSendMessageReq MessageType. */
        public MessageType: number;

        /** ChatSendMessageReq Message. */
        public Message: string;

        /**
         * Creates a new ChatSendMessageReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatSendMessageReq instance
         */
        public static create(properties?: kproto.IChatSendMessageReq): kproto.ChatSendMessageReq;

        /**
         * Encodes the specified ChatSendMessageReq message. Does not implicitly {@link kproto.ChatSendMessageReq.verify|verify} messages.
         * @param message ChatSendMessageReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatSendMessageReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatSendMessageReq message, length delimited. Does not implicitly {@link kproto.ChatSendMessageReq.verify|verify} messages.
         * @param message ChatSendMessageReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatSendMessageReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatSendMessageReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatSendMessageReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatSendMessageReq;

        /**
         * Decodes a ChatSendMessageReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatSendMessageReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatSendMessageReq;

        /**
         * Verifies a ChatSendMessageReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatSendMessageReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatSendMessageReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatSendMessageReq;

        /**
         * Creates a plain object from a ChatSendMessageReq message. Also converts values to other types if specified.
         * @param message ChatSendMessageReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatSendMessageReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatSendMessageReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatSendMessageResp. */
    interface IChatSendMessageResp {
    }

    /** Represents a ChatSendMessageResp. */
    class ChatSendMessageResp implements IChatSendMessageResp {

        /**
         * Constructs a new ChatSendMessageResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatSendMessageResp);

        /**
         * Creates a new ChatSendMessageResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatSendMessageResp instance
         */
        public static create(properties?: kproto.IChatSendMessageResp): kproto.ChatSendMessageResp;

        /**
         * Encodes the specified ChatSendMessageResp message. Does not implicitly {@link kproto.ChatSendMessageResp.verify|verify} messages.
         * @param message ChatSendMessageResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatSendMessageResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatSendMessageResp message, length delimited. Does not implicitly {@link kproto.ChatSendMessageResp.verify|verify} messages.
         * @param message ChatSendMessageResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatSendMessageResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatSendMessageResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatSendMessageResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatSendMessageResp;

        /**
         * Decodes a ChatSendMessageResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatSendMessageResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatSendMessageResp;

        /**
         * Verifies a ChatSendMessageResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatSendMessageResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatSendMessageResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatSendMessageResp;

        /**
         * Creates a plain object from a ChatSendMessageResp message. Also converts values to other types if specified.
         * @param message ChatSendMessageResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatSendMessageResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatSendMessageResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatSendMediaReq. */
    interface IChatSendMediaReq {

        /** ChatSendMediaReq ChatID */
        ChatID?: (number|Long|null);

        /** ChatSendMediaReq MessageType */
        MessageType?: (number|null);

        /** ChatSendMediaReq Data */
        Data?: (Uint8Array|null);
    }

    /** Represents a ChatSendMediaReq. */
    class ChatSendMediaReq implements IChatSendMediaReq {

        /**
         * Constructs a new ChatSendMediaReq.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatSendMediaReq);

        /** ChatSendMediaReq ChatID. */
        public ChatID: (number|Long);

        /** ChatSendMediaReq MessageType. */
        public MessageType: number;

        /** ChatSendMediaReq Data. */
        public Data: Uint8Array;

        /**
         * Creates a new ChatSendMediaReq instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatSendMediaReq instance
         */
        public static create(properties?: kproto.IChatSendMediaReq): kproto.ChatSendMediaReq;

        /**
         * Encodes the specified ChatSendMediaReq message. Does not implicitly {@link kproto.ChatSendMediaReq.verify|verify} messages.
         * @param message ChatSendMediaReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatSendMediaReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatSendMediaReq message, length delimited. Does not implicitly {@link kproto.ChatSendMediaReq.verify|verify} messages.
         * @param message ChatSendMediaReq message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatSendMediaReq, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatSendMediaReq message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatSendMediaReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatSendMediaReq;

        /**
         * Decodes a ChatSendMediaReq message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatSendMediaReq
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatSendMediaReq;

        /**
         * Verifies a ChatSendMediaReq message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatSendMediaReq message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatSendMediaReq
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatSendMediaReq;

        /**
         * Creates a plain object from a ChatSendMediaReq message. Also converts values to other types if specified.
         * @param message ChatSendMediaReq
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatSendMediaReq, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatSendMediaReq to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ChatSendMediaResp. */
    interface IChatSendMediaResp {
    }

    /** Represents a ChatSendMediaResp. */
    class ChatSendMediaResp implements IChatSendMediaResp {

        /**
         * Constructs a new ChatSendMediaResp.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.IChatSendMediaResp);

        /**
         * Creates a new ChatSendMediaResp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ChatSendMediaResp instance
         */
        public static create(properties?: kproto.IChatSendMediaResp): kproto.ChatSendMediaResp;

        /**
         * Encodes the specified ChatSendMediaResp message. Does not implicitly {@link kproto.ChatSendMediaResp.verify|verify} messages.
         * @param message ChatSendMediaResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.IChatSendMediaResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ChatSendMediaResp message, length delimited. Does not implicitly {@link kproto.ChatSendMediaResp.verify|verify} messages.
         * @param message ChatSendMediaResp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.IChatSendMediaResp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ChatSendMediaResp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ChatSendMediaResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.ChatSendMediaResp;

        /**
         * Decodes a ChatSendMediaResp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ChatSendMediaResp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.ChatSendMediaResp;

        /**
         * Verifies a ChatSendMediaResp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ChatSendMediaResp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ChatSendMediaResp
         */
        public static fromObject(object: { [k: string]: any }): kproto.ChatSendMediaResp;

        /**
         * Creates a plain object from a ChatSendMediaResp message. Also converts values to other types if specified.
         * @param message ChatSendMediaResp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.ChatSendMediaResp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ChatSendMediaResp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SyncAck. */
    interface ISyncAck {
    }

    /** Represents a SyncAck. */
    class SyncAck implements ISyncAck {

        /**
         * Constructs a new SyncAck.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.ISyncAck);

        /**
         * Creates a new SyncAck instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncAck instance
         */
        public static create(properties?: kproto.ISyncAck): kproto.SyncAck;

        /**
         * Encodes the specified SyncAck message. Does not implicitly {@link kproto.SyncAck.verify|verify} messages.
         * @param message SyncAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.ISyncAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncAck message, length delimited. Does not implicitly {@link kproto.SyncAck.verify|verify} messages.
         * @param message SyncAck message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.ISyncAck, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncAck message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.SyncAck;

        /**
         * Decodes a SyncAck message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncAck
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.SyncAck;

        /**
         * Verifies a SyncAck message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncAck message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncAck
         */
        public static fromObject(object: { [k: string]: any }): kproto.SyncAck;

        /**
         * Creates a plain object from a SyncAck message. Also converts values to other types if specified.
         * @param message SyncAck
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.SyncAck, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncAck to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SyncChatSendMessage. */
    interface ISyncChatSendMessage {
    }

    /** Represents a SyncChatSendMessage. */
    class SyncChatSendMessage implements ISyncChatSendMessage {

        /**
         * Constructs a new SyncChatSendMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: kproto.ISyncChatSendMessage);

        /**
         * Creates a new SyncChatSendMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncChatSendMessage instance
         */
        public static create(properties?: kproto.ISyncChatSendMessage): kproto.SyncChatSendMessage;

        /**
         * Encodes the specified SyncChatSendMessage message. Does not implicitly {@link kproto.SyncChatSendMessage.verify|verify} messages.
         * @param message SyncChatSendMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: kproto.ISyncChatSendMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncChatSendMessage message, length delimited. Does not implicitly {@link kproto.SyncChatSendMessage.verify|verify} messages.
         * @param message SyncChatSendMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: kproto.ISyncChatSendMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncChatSendMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncChatSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): kproto.SyncChatSendMessage;

        /**
         * Decodes a SyncChatSendMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncChatSendMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): kproto.SyncChatSendMessage;

        /**
         * Verifies a SyncChatSendMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncChatSendMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncChatSendMessage
         */
        public static fromObject(object: { [k: string]: any }): kproto.SyncChatSendMessage;

        /**
         * Creates a plain object from a SyncChatSendMessage message. Also converts values to other types if specified.
         * @param message SyncChatSendMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: kproto.SyncChatSendMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncChatSendMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }
}
