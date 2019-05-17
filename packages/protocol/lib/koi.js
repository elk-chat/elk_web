/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.kproto = (function() {
    
        /**
         * Namespace kproto.
         * @exports kproto
         * @namespace
         */
        var kproto = {};
    
        kproto.Error = (function() {
    
            /**
             * Properties of an Error.
             * @memberof kproto
             * @interface IError
             * @property {string|null} [Code] Error Code
             * @property {string|null} [Message] Error Message
             */
    
            /**
             * Constructs a new Error.
             * @memberof kproto
             * @classdesc Represents an Error.
             * @implements IError
             * @constructor
             * @param {kproto.IError=} [properties] Properties to set
             */
            function Error(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Error Code.
             * @member {string} Code
             * @memberof kproto.Error
             * @instance
             */
            Error.prototype.Code = "";
    
            /**
             * Error Message.
             * @member {string} Message
             * @memberof kproto.Error
             * @instance
             */
            Error.prototype.Message = "";
    
            /**
             * Creates a new Error instance using the specified properties.
             * @function create
             * @memberof kproto.Error
             * @static
             * @param {kproto.IError=} [properties] Properties to set
             * @returns {kproto.Error} Error instance
             */
            Error.create = function create(properties) {
                return new Error(properties);
            };
    
            /**
             * Encodes the specified Error message. Does not implicitly {@link kproto.Error.verify|verify} messages.
             * @function encode
             * @memberof kproto.Error
             * @static
             * @param {kproto.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.Code != null && message.hasOwnProperty("Code"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.Code);
                if (message.Message != null && message.hasOwnProperty("Message"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.Message);
                return writer;
            };
    
            /**
             * Encodes the specified Error message, length delimited. Does not implicitly {@link kproto.Error.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.Error
             * @static
             * @param {kproto.IError} message Error message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Error.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an Error message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.Error();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.Code = reader.string();
                        break;
                    case 2:
                        message.Message = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an Error message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.Error
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.Error} Error
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Error.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an Error message.
             * @function verify
             * @memberof kproto.Error
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Error.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.Code != null && message.hasOwnProperty("Code"))
                    if (!$util.isString(message.Code))
                        return "Code: string expected";
                if (message.Message != null && message.hasOwnProperty("Message"))
                    if (!$util.isString(message.Message))
                        return "Message: string expected";
                return null;
            };
    
            /**
             * Creates an Error message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.Error
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.Error} Error
             */
            Error.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.Error)
                    return object;
                var message = new $root.kproto.Error();
                if (object.Code != null)
                    message.Code = String(object.Code);
                if (object.Message != null)
                    message.Message = String(object.Message);
                return message;
            };
    
            /**
             * Creates a plain object from an Error message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.Error
             * @static
             * @param {kproto.Error} message Error
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Error.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.Code = "";
                    object.Message = "";
                }
                if (message.Code != null && message.hasOwnProperty("Code"))
                    object.Code = message.Code;
                if (message.Message != null && message.hasOwnProperty("Message"))
                    object.Message = message.Message;
                return object;
            };
    
            /**
             * Converts this Error to JSON.
             * @function toJSON
             * @memberof kproto.Error
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Error.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Error;
        })();
    
        kproto.Success = (function() {
    
            /**
             * Properties of a Success.
             * @memberof kproto
             * @interface ISuccess
             */
    
            /**
             * Constructs a new Success.
             * @memberof kproto
             * @classdesc Represents a Success.
             * @implements ISuccess
             * @constructor
             * @param {kproto.ISuccess=} [properties] Properties to set
             */
            function Success(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new Success instance using the specified properties.
             * @function create
             * @memberof kproto.Success
             * @static
             * @param {kproto.ISuccess=} [properties] Properties to set
             * @returns {kproto.Success} Success instance
             */
            Success.create = function create(properties) {
                return new Success(properties);
            };
    
            /**
             * Encodes the specified Success message. Does not implicitly {@link kproto.Success.verify|verify} messages.
             * @function encode
             * @memberof kproto.Success
             * @static
             * @param {kproto.ISuccess} message Success message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Success.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified Success message, length delimited. Does not implicitly {@link kproto.Success.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.Success
             * @static
             * @param {kproto.ISuccess} message Success message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Success.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Success message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.Success
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.Success} Success
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Success.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.Success();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Success message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.Success
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.Success} Success
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Success.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Success message.
             * @function verify
             * @memberof kproto.Success
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Success.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a Success message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.Success
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.Success} Success
             */
            Success.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.Success)
                    return object;
                return new $root.kproto.Success();
            };
    
            /**
             * Creates a plain object from a Success message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.Success
             * @static
             * @param {kproto.Success} message Success
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Success.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this Success to JSON.
             * @function toJSON
             * @memberof kproto.Success
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Success.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Success;
        })();
    
        kproto.StateAck = (function() {
    
            /**
             * Properties of a StateAck.
             * @memberof kproto
             * @interface IStateAck
             * @property {number|Long|null} [ChatID] StateAck ChatID
             * @property {number|Long|null} [MessageID] StateAck MessageID
             * @property {number|Long|null} [State] StateAck State
             */
    
            /**
             * Constructs a new StateAck.
             * @memberof kproto
             * @classdesc Represents a StateAck.
             * @implements IStateAck
             * @constructor
             * @param {kproto.IStateAck=} [properties] Properties to set
             */
            function StateAck(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * StateAck ChatID.
             * @member {number|Long} ChatID
             * @memberof kproto.StateAck
             * @instance
             */
            StateAck.prototype.ChatID = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * StateAck MessageID.
             * @member {number|Long} MessageID
             * @memberof kproto.StateAck
             * @instance
             */
            StateAck.prototype.MessageID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * StateAck State.
             * @member {number|Long} State
             * @memberof kproto.StateAck
             * @instance
             */
            StateAck.prototype.State = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new StateAck instance using the specified properties.
             * @function create
             * @memberof kproto.StateAck
             * @static
             * @param {kproto.IStateAck=} [properties] Properties to set
             * @returns {kproto.StateAck} StateAck instance
             */
            StateAck.create = function create(properties) {
                return new StateAck(properties);
            };
    
            /**
             * Encodes the specified StateAck message. Does not implicitly {@link kproto.StateAck.verify|verify} messages.
             * @function encode
             * @memberof kproto.StateAck
             * @static
             * @param {kproto.IStateAck} message StateAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StateAck.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.ChatID);
                if (message.MessageID != null && message.hasOwnProperty("MessageID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.MessageID);
                if (message.State != null && message.hasOwnProperty("State"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.State);
                return writer;
            };
    
            /**
             * Encodes the specified StateAck message, length delimited. Does not implicitly {@link kproto.StateAck.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.StateAck
             * @static
             * @param {kproto.IStateAck} message StateAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StateAck.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a StateAck message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.StateAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.StateAck} StateAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StateAck.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.StateAck();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ChatID = reader.int64();
                        break;
                    case 2:
                        message.MessageID = reader.uint64();
                        break;
                    case 3:
                        message.State = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a StateAck message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.StateAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.StateAck} StateAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StateAck.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a StateAck message.
             * @function verify
             * @memberof kproto.StateAck
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StateAck.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (!$util.isInteger(message.ChatID) && !(message.ChatID && $util.isInteger(message.ChatID.low) && $util.isInteger(message.ChatID.high)))
                        return "ChatID: integer|Long expected";
                if (message.MessageID != null && message.hasOwnProperty("MessageID"))
                    if (!$util.isInteger(message.MessageID) && !(message.MessageID && $util.isInteger(message.MessageID.low) && $util.isInteger(message.MessageID.high)))
                        return "MessageID: integer|Long expected";
                if (message.State != null && message.hasOwnProperty("State"))
                    if (!$util.isInteger(message.State) && !(message.State && $util.isInteger(message.State.low) && $util.isInteger(message.State.high)))
                        return "State: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a StateAck message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.StateAck
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.StateAck} StateAck
             */
            StateAck.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.StateAck)
                    return object;
                var message = new $root.kproto.StateAck();
                if (object.ChatID != null)
                    if ($util.Long)
                        (message.ChatID = $util.Long.fromValue(object.ChatID)).unsigned = false;
                    else if (typeof object.ChatID === "string")
                        message.ChatID = parseInt(object.ChatID, 10);
                    else if (typeof object.ChatID === "number")
                        message.ChatID = object.ChatID;
                    else if (typeof object.ChatID === "object")
                        message.ChatID = new $util.LongBits(object.ChatID.low >>> 0, object.ChatID.high >>> 0).toNumber();
                if (object.MessageID != null)
                    if ($util.Long)
                        (message.MessageID = $util.Long.fromValue(object.MessageID)).unsigned = true;
                    else if (typeof object.MessageID === "string")
                        message.MessageID = parseInt(object.MessageID, 10);
                    else if (typeof object.MessageID === "number")
                        message.MessageID = object.MessageID;
                    else if (typeof object.MessageID === "object")
                        message.MessageID = new $util.LongBits(object.MessageID.low >>> 0, object.MessageID.high >>> 0).toNumber(true);
                if (object.State != null)
                    if ($util.Long)
                        (message.State = $util.Long.fromValue(object.State)).unsigned = true;
                    else if (typeof object.State === "string")
                        message.State = parseInt(object.State, 10);
                    else if (typeof object.State === "number")
                        message.State = object.State;
                    else if (typeof object.State === "object")
                        message.State = new $util.LongBits(object.State.low >>> 0, object.State.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a StateAck message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.StateAck
             * @static
             * @param {kproto.StateAck} message StateAck
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StateAck.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ChatID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ChatID = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.MessageID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.MessageID = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.State = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.State = options.longs === String ? "0" : 0;
                }
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (typeof message.ChatID === "number")
                        object.ChatID = options.longs === String ? String(message.ChatID) : message.ChatID;
                    else
                        object.ChatID = options.longs === String ? $util.Long.prototype.toString.call(message.ChatID) : options.longs === Number ? new $util.LongBits(message.ChatID.low >>> 0, message.ChatID.high >>> 0).toNumber() : message.ChatID;
                if (message.MessageID != null && message.hasOwnProperty("MessageID"))
                    if (typeof message.MessageID === "number")
                        object.MessageID = options.longs === String ? String(message.MessageID) : message.MessageID;
                    else
                        object.MessageID = options.longs === String ? $util.Long.prototype.toString.call(message.MessageID) : options.longs === Number ? new $util.LongBits(message.MessageID.low >>> 0, message.MessageID.high >>> 0).toNumber(true) : message.MessageID;
                if (message.State != null && message.hasOwnProperty("State"))
                    if (typeof message.State === "number")
                        object.State = options.longs === String ? String(message.State) : message.State;
                    else
                        object.State = options.longs === String ? $util.Long.prototype.toString.call(message.State) : options.longs === Number ? new $util.LongBits(message.State.low >>> 0, message.State.high >>> 0).toNumber(true) : message.State;
                return object;
            };
    
            /**
             * Converts this StateAck to JSON.
             * @function toJSON
             * @memberof kproto.StateAck
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StateAck.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return StateAck;
        })();
    
        kproto.StateUpdate = (function() {
    
            /**
             * Properties of a StateUpdate.
             * @memberof kproto
             * @interface IStateUpdate
             * @property {number|Long|null} [ChatID] StateUpdate ChatID
             * @property {number|Long|null} [MessageID] StateUpdate MessageID
             * @property {number|Long|null} [State] StateUpdate State
             * @property {string|null} [MessageDigest] StateUpdate MessageDigest
             */
    
            /**
             * Constructs a new StateUpdate.
             * @memberof kproto
             * @classdesc Represents a StateUpdate.
             * @implements IStateUpdate
             * @constructor
             * @param {kproto.IStateUpdate=} [properties] Properties to set
             */
            function StateUpdate(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * StateUpdate ChatID.
             * @member {number|Long} ChatID
             * @memberof kproto.StateUpdate
             * @instance
             */
            StateUpdate.prototype.ChatID = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * StateUpdate MessageID.
             * @member {number|Long} MessageID
             * @memberof kproto.StateUpdate
             * @instance
             */
            StateUpdate.prototype.MessageID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * StateUpdate State.
             * @member {number|Long} State
             * @memberof kproto.StateUpdate
             * @instance
             */
            StateUpdate.prototype.State = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * StateUpdate MessageDigest.
             * @member {string} MessageDigest
             * @memberof kproto.StateUpdate
             * @instance
             */
            StateUpdate.prototype.MessageDigest = "";
    
            /**
             * Creates a new StateUpdate instance using the specified properties.
             * @function create
             * @memberof kproto.StateUpdate
             * @static
             * @param {kproto.IStateUpdate=} [properties] Properties to set
             * @returns {kproto.StateUpdate} StateUpdate instance
             */
            StateUpdate.create = function create(properties) {
                return new StateUpdate(properties);
            };
    
            /**
             * Encodes the specified StateUpdate message. Does not implicitly {@link kproto.StateUpdate.verify|verify} messages.
             * @function encode
             * @memberof kproto.StateUpdate
             * @static
             * @param {kproto.IStateUpdate} message StateUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StateUpdate.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.ChatID);
                if (message.MessageID != null && message.hasOwnProperty("MessageID"))
                    writer.uint32(/* id 2, wireType 0 =*/16).uint64(message.MessageID);
                if (message.State != null && message.hasOwnProperty("State"))
                    writer.uint32(/* id 3, wireType 0 =*/24).uint64(message.State);
                if (message.MessageDigest != null && message.hasOwnProperty("MessageDigest"))
                    writer.uint32(/* id 4, wireType 2 =*/34).string(message.MessageDigest);
                return writer;
            };
    
            /**
             * Encodes the specified StateUpdate message, length delimited. Does not implicitly {@link kproto.StateUpdate.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.StateUpdate
             * @static
             * @param {kproto.IStateUpdate} message StateUpdate message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            StateUpdate.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a StateUpdate message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.StateUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.StateUpdate} StateUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StateUpdate.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.StateUpdate();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ChatID = reader.int64();
                        break;
                    case 2:
                        message.MessageID = reader.uint64();
                        break;
                    case 3:
                        message.State = reader.uint64();
                        break;
                    case 4:
                        message.MessageDigest = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a StateUpdate message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.StateUpdate
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.StateUpdate} StateUpdate
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            StateUpdate.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a StateUpdate message.
             * @function verify
             * @memberof kproto.StateUpdate
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            StateUpdate.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (!$util.isInteger(message.ChatID) && !(message.ChatID && $util.isInteger(message.ChatID.low) && $util.isInteger(message.ChatID.high)))
                        return "ChatID: integer|Long expected";
                if (message.MessageID != null && message.hasOwnProperty("MessageID"))
                    if (!$util.isInteger(message.MessageID) && !(message.MessageID && $util.isInteger(message.MessageID.low) && $util.isInteger(message.MessageID.high)))
                        return "MessageID: integer|Long expected";
                if (message.State != null && message.hasOwnProperty("State"))
                    if (!$util.isInteger(message.State) && !(message.State && $util.isInteger(message.State.low) && $util.isInteger(message.State.high)))
                        return "State: integer|Long expected";
                if (message.MessageDigest != null && message.hasOwnProperty("MessageDigest"))
                    if (!$util.isString(message.MessageDigest))
                        return "MessageDigest: string expected";
                return null;
            };
    
            /**
             * Creates a StateUpdate message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.StateUpdate
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.StateUpdate} StateUpdate
             */
            StateUpdate.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.StateUpdate)
                    return object;
                var message = new $root.kproto.StateUpdate();
                if (object.ChatID != null)
                    if ($util.Long)
                        (message.ChatID = $util.Long.fromValue(object.ChatID)).unsigned = false;
                    else if (typeof object.ChatID === "string")
                        message.ChatID = parseInt(object.ChatID, 10);
                    else if (typeof object.ChatID === "number")
                        message.ChatID = object.ChatID;
                    else if (typeof object.ChatID === "object")
                        message.ChatID = new $util.LongBits(object.ChatID.low >>> 0, object.ChatID.high >>> 0).toNumber();
                if (object.MessageID != null)
                    if ($util.Long)
                        (message.MessageID = $util.Long.fromValue(object.MessageID)).unsigned = true;
                    else if (typeof object.MessageID === "string")
                        message.MessageID = parseInt(object.MessageID, 10);
                    else if (typeof object.MessageID === "number")
                        message.MessageID = object.MessageID;
                    else if (typeof object.MessageID === "object")
                        message.MessageID = new $util.LongBits(object.MessageID.low >>> 0, object.MessageID.high >>> 0).toNumber(true);
                if (object.State != null)
                    if ($util.Long)
                        (message.State = $util.Long.fromValue(object.State)).unsigned = true;
                    else if (typeof object.State === "string")
                        message.State = parseInt(object.State, 10);
                    else if (typeof object.State === "number")
                        message.State = object.State;
                    else if (typeof object.State === "object")
                        message.State = new $util.LongBits(object.State.low >>> 0, object.State.high >>> 0).toNumber(true);
                if (object.MessageDigest != null)
                    message.MessageDigest = String(object.MessageDigest);
                return message;
            };
    
            /**
             * Creates a plain object from a StateUpdate message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.StateUpdate
             * @static
             * @param {kproto.StateUpdate} message StateUpdate
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            StateUpdate.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ChatID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ChatID = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.MessageID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.MessageID = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.State = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.State = options.longs === String ? "0" : 0;
                    object.MessageDigest = "";
                }
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (typeof message.ChatID === "number")
                        object.ChatID = options.longs === String ? String(message.ChatID) : message.ChatID;
                    else
                        object.ChatID = options.longs === String ? $util.Long.prototype.toString.call(message.ChatID) : options.longs === Number ? new $util.LongBits(message.ChatID.low >>> 0, message.ChatID.high >>> 0).toNumber() : message.ChatID;
                if (message.MessageID != null && message.hasOwnProperty("MessageID"))
                    if (typeof message.MessageID === "number")
                        object.MessageID = options.longs === String ? String(message.MessageID) : message.MessageID;
                    else
                        object.MessageID = options.longs === String ? $util.Long.prototype.toString.call(message.MessageID) : options.longs === Number ? new $util.LongBits(message.MessageID.low >>> 0, message.MessageID.high >>> 0).toNumber(true) : message.MessageID;
                if (message.State != null && message.hasOwnProperty("State"))
                    if (typeof message.State === "number")
                        object.State = options.longs === String ? String(message.State) : message.State;
                    else
                        object.State = options.longs === String ? $util.Long.prototype.toString.call(message.State) : options.longs === Number ? new $util.LongBits(message.State.low >>> 0, message.State.high >>> 0).toNumber(true) : message.State;
                if (message.MessageDigest != null && message.hasOwnProperty("MessageDigest"))
                    object.MessageDigest = message.MessageDigest;
                return object;
            };
    
            /**
             * Converts this StateUpdate to JSON.
             * @function toJSON
             * @memberof kproto.StateUpdate
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            StateUpdate.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return StateUpdate;
        })();
    
        kproto.AuthKeyReq = (function() {
    
            /**
             * Properties of an AuthKeyReq.
             * @memberof kproto
             * @interface IAuthKeyReq
             */
    
            /**
             * Constructs a new AuthKeyReq.
             * @memberof kproto
             * @classdesc Represents an AuthKeyReq.
             * @implements IAuthKeyReq
             * @constructor
             * @param {kproto.IAuthKeyReq=} [properties] Properties to set
             */
            function AuthKeyReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new AuthKeyReq instance using the specified properties.
             * @function create
             * @memberof kproto.AuthKeyReq
             * @static
             * @param {kproto.IAuthKeyReq=} [properties] Properties to set
             * @returns {kproto.AuthKeyReq} AuthKeyReq instance
             */
            AuthKeyReq.create = function create(properties) {
                return new AuthKeyReq(properties);
            };
    
            /**
             * Encodes the specified AuthKeyReq message. Does not implicitly {@link kproto.AuthKeyReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.AuthKeyReq
             * @static
             * @param {kproto.IAuthKeyReq} message AuthKeyReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthKeyReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified AuthKeyReq message, length delimited. Does not implicitly {@link kproto.AuthKeyReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.AuthKeyReq
             * @static
             * @param {kproto.IAuthKeyReq} message AuthKeyReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthKeyReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an AuthKeyReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.AuthKeyReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.AuthKeyReq} AuthKeyReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthKeyReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.AuthKeyReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an AuthKeyReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.AuthKeyReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.AuthKeyReq} AuthKeyReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthKeyReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an AuthKeyReq message.
             * @function verify
             * @memberof kproto.AuthKeyReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AuthKeyReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates an AuthKeyReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.AuthKeyReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.AuthKeyReq} AuthKeyReq
             */
            AuthKeyReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.AuthKeyReq)
                    return object;
                return new $root.kproto.AuthKeyReq();
            };
    
            /**
             * Creates a plain object from an AuthKeyReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.AuthKeyReq
             * @static
             * @param {kproto.AuthKeyReq} message AuthKeyReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AuthKeyReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this AuthKeyReq to JSON.
             * @function toJSON
             * @memberof kproto.AuthKeyReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AuthKeyReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return AuthKeyReq;
        })();
    
        kproto.AuthKeyResp = (function() {
    
            /**
             * Properties of an AuthKeyResp.
             * @memberof kproto
             * @interface IAuthKeyResp
             */
    
            /**
             * Constructs a new AuthKeyResp.
             * @memberof kproto
             * @classdesc Represents an AuthKeyResp.
             * @implements IAuthKeyResp
             * @constructor
             * @param {kproto.IAuthKeyResp=} [properties] Properties to set
             */
            function AuthKeyResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new AuthKeyResp instance using the specified properties.
             * @function create
             * @memberof kproto.AuthKeyResp
             * @static
             * @param {kproto.IAuthKeyResp=} [properties] Properties to set
             * @returns {kproto.AuthKeyResp} AuthKeyResp instance
             */
            AuthKeyResp.create = function create(properties) {
                return new AuthKeyResp(properties);
            };
    
            /**
             * Encodes the specified AuthKeyResp message. Does not implicitly {@link kproto.AuthKeyResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.AuthKeyResp
             * @static
             * @param {kproto.IAuthKeyResp} message AuthKeyResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthKeyResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified AuthKeyResp message, length delimited. Does not implicitly {@link kproto.AuthKeyResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.AuthKeyResp
             * @static
             * @param {kproto.IAuthKeyResp} message AuthKeyResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            AuthKeyResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an AuthKeyResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.AuthKeyResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.AuthKeyResp} AuthKeyResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthKeyResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.AuthKeyResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an AuthKeyResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.AuthKeyResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.AuthKeyResp} AuthKeyResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            AuthKeyResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an AuthKeyResp message.
             * @function verify
             * @memberof kproto.AuthKeyResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            AuthKeyResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates an AuthKeyResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.AuthKeyResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.AuthKeyResp} AuthKeyResp
             */
            AuthKeyResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.AuthKeyResp)
                    return object;
                return new $root.kproto.AuthKeyResp();
            };
    
            /**
             * Creates a plain object from an AuthKeyResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.AuthKeyResp
             * @static
             * @param {kproto.AuthKeyResp} message AuthKeyResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            AuthKeyResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this AuthKeyResp to JSON.
             * @function toJSON
             * @memberof kproto.AuthKeyResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            AuthKeyResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return AuthKeyResp;
        })();
    
        kproto.HeartbeatReq = (function() {
    
            /**
             * Properties of a HeartbeatReq.
             * @memberof kproto
             * @interface IHeartbeatReq
             */
    
            /**
             * Constructs a new HeartbeatReq.
             * @memberof kproto
             * @classdesc Represents a HeartbeatReq.
             * @implements IHeartbeatReq
             * @constructor
             * @param {kproto.IHeartbeatReq=} [properties] Properties to set
             */
            function HeartbeatReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new HeartbeatReq instance using the specified properties.
             * @function create
             * @memberof kproto.HeartbeatReq
             * @static
             * @param {kproto.IHeartbeatReq=} [properties] Properties to set
             * @returns {kproto.HeartbeatReq} HeartbeatReq instance
             */
            HeartbeatReq.create = function create(properties) {
                return new HeartbeatReq(properties);
            };
    
            /**
             * Encodes the specified HeartbeatReq message. Does not implicitly {@link kproto.HeartbeatReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.HeartbeatReq
             * @static
             * @param {kproto.IHeartbeatReq} message HeartbeatReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HeartbeatReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified HeartbeatReq message, length delimited. Does not implicitly {@link kproto.HeartbeatReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.HeartbeatReq
             * @static
             * @param {kproto.IHeartbeatReq} message HeartbeatReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HeartbeatReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a HeartbeatReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.HeartbeatReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.HeartbeatReq} HeartbeatReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HeartbeatReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.HeartbeatReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a HeartbeatReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.HeartbeatReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.HeartbeatReq} HeartbeatReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HeartbeatReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a HeartbeatReq message.
             * @function verify
             * @memberof kproto.HeartbeatReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HeartbeatReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a HeartbeatReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.HeartbeatReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.HeartbeatReq} HeartbeatReq
             */
            HeartbeatReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.HeartbeatReq)
                    return object;
                return new $root.kproto.HeartbeatReq();
            };
    
            /**
             * Creates a plain object from a HeartbeatReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.HeartbeatReq
             * @static
             * @param {kproto.HeartbeatReq} message HeartbeatReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HeartbeatReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this HeartbeatReq to JSON.
             * @function toJSON
             * @memberof kproto.HeartbeatReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HeartbeatReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return HeartbeatReq;
        })();
    
        kproto.HeartbeatResp = (function() {
    
            /**
             * Properties of a HeartbeatResp.
             * @memberof kproto
             * @interface IHeartbeatResp
             */
    
            /**
             * Constructs a new HeartbeatResp.
             * @memberof kproto
             * @classdesc Represents a HeartbeatResp.
             * @implements IHeartbeatResp
             * @constructor
             * @param {kproto.IHeartbeatResp=} [properties] Properties to set
             */
            function HeartbeatResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new HeartbeatResp instance using the specified properties.
             * @function create
             * @memberof kproto.HeartbeatResp
             * @static
             * @param {kproto.IHeartbeatResp=} [properties] Properties to set
             * @returns {kproto.HeartbeatResp} HeartbeatResp instance
             */
            HeartbeatResp.create = function create(properties) {
                return new HeartbeatResp(properties);
            };
    
            /**
             * Encodes the specified HeartbeatResp message. Does not implicitly {@link kproto.HeartbeatResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.HeartbeatResp
             * @static
             * @param {kproto.IHeartbeatResp} message HeartbeatResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HeartbeatResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified HeartbeatResp message, length delimited. Does not implicitly {@link kproto.HeartbeatResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.HeartbeatResp
             * @static
             * @param {kproto.IHeartbeatResp} message HeartbeatResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            HeartbeatResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a HeartbeatResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.HeartbeatResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.HeartbeatResp} HeartbeatResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HeartbeatResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.HeartbeatResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a HeartbeatResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.HeartbeatResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.HeartbeatResp} HeartbeatResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            HeartbeatResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a HeartbeatResp message.
             * @function verify
             * @memberof kproto.HeartbeatResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            HeartbeatResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a HeartbeatResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.HeartbeatResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.HeartbeatResp} HeartbeatResp
             */
            HeartbeatResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.HeartbeatResp)
                    return object;
                return new $root.kproto.HeartbeatResp();
            };
    
            /**
             * Creates a plain object from a HeartbeatResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.HeartbeatResp
             * @static
             * @param {kproto.HeartbeatResp} message HeartbeatResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            HeartbeatResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this HeartbeatResp to JSON.
             * @function toJSON
             * @memberof kproto.HeartbeatResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            HeartbeatResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return HeartbeatResp;
        })();
    
        kproto.InitConnectionReq = (function() {
    
            /**
             * Properties of an InitConnectionReq.
             * @memberof kproto
             * @interface IInitConnectionReq
             */
    
            /**
             * Constructs a new InitConnectionReq.
             * @memberof kproto
             * @classdesc Represents an InitConnectionReq.
             * @implements IInitConnectionReq
             * @constructor
             * @param {kproto.IInitConnectionReq=} [properties] Properties to set
             */
            function InitConnectionReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new InitConnectionReq instance using the specified properties.
             * @function create
             * @memberof kproto.InitConnectionReq
             * @static
             * @param {kproto.IInitConnectionReq=} [properties] Properties to set
             * @returns {kproto.InitConnectionReq} InitConnectionReq instance
             */
            InitConnectionReq.create = function create(properties) {
                return new InitConnectionReq(properties);
            };
    
            /**
             * Encodes the specified InitConnectionReq message. Does not implicitly {@link kproto.InitConnectionReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.InitConnectionReq
             * @static
             * @param {kproto.IInitConnectionReq} message InitConnectionReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InitConnectionReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified InitConnectionReq message, length delimited. Does not implicitly {@link kproto.InitConnectionReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.InitConnectionReq
             * @static
             * @param {kproto.IInitConnectionReq} message InitConnectionReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InitConnectionReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an InitConnectionReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.InitConnectionReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.InitConnectionReq} InitConnectionReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InitConnectionReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.InitConnectionReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an InitConnectionReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.InitConnectionReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.InitConnectionReq} InitConnectionReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InitConnectionReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an InitConnectionReq message.
             * @function verify
             * @memberof kproto.InitConnectionReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            InitConnectionReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates an InitConnectionReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.InitConnectionReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.InitConnectionReq} InitConnectionReq
             */
            InitConnectionReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.InitConnectionReq)
                    return object;
                return new $root.kproto.InitConnectionReq();
            };
    
            /**
             * Creates a plain object from an InitConnectionReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.InitConnectionReq
             * @static
             * @param {kproto.InitConnectionReq} message InitConnectionReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            InitConnectionReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this InitConnectionReq to JSON.
             * @function toJSON
             * @memberof kproto.InitConnectionReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            InitConnectionReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return InitConnectionReq;
        })();
    
        kproto.InitConnectionResp = (function() {
    
            /**
             * Properties of an InitConnectionResp.
             * @memberof kproto
             * @interface IInitConnectionResp
             */
    
            /**
             * Constructs a new InitConnectionResp.
             * @memberof kproto
             * @classdesc Represents an InitConnectionResp.
             * @implements IInitConnectionResp
             * @constructor
             * @param {kproto.IInitConnectionResp=} [properties] Properties to set
             */
            function InitConnectionResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new InitConnectionResp instance using the specified properties.
             * @function create
             * @memberof kproto.InitConnectionResp
             * @static
             * @param {kproto.IInitConnectionResp=} [properties] Properties to set
             * @returns {kproto.InitConnectionResp} InitConnectionResp instance
             */
            InitConnectionResp.create = function create(properties) {
                return new InitConnectionResp(properties);
            };
    
            /**
             * Encodes the specified InitConnectionResp message. Does not implicitly {@link kproto.InitConnectionResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.InitConnectionResp
             * @static
             * @param {kproto.IInitConnectionResp} message InitConnectionResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InitConnectionResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified InitConnectionResp message, length delimited. Does not implicitly {@link kproto.InitConnectionResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.InitConnectionResp
             * @static
             * @param {kproto.IInitConnectionResp} message InitConnectionResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            InitConnectionResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes an InitConnectionResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.InitConnectionResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.InitConnectionResp} InitConnectionResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InitConnectionResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.InitConnectionResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes an InitConnectionResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.InitConnectionResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.InitConnectionResp} InitConnectionResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            InitConnectionResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies an InitConnectionResp message.
             * @function verify
             * @memberof kproto.InitConnectionResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            InitConnectionResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates an InitConnectionResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.InitConnectionResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.InitConnectionResp} InitConnectionResp
             */
            InitConnectionResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.InitConnectionResp)
                    return object;
                return new $root.kproto.InitConnectionResp();
            };
    
            /**
             * Creates a plain object from an InitConnectionResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.InitConnectionResp
             * @static
             * @param {kproto.InitConnectionResp} message InitConnectionResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            InitConnectionResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this InitConnectionResp to JSON.
             * @function toJSON
             * @memberof kproto.InitConnectionResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            InitConnectionResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return InitConnectionResp;
        })();
    
        kproto.RequestVerificationCodeReq = (function() {
    
            /**
             * Properties of a RequestVerificationCodeReq.
             * @memberof kproto
             * @interface IRequestVerificationCodeReq
             */
    
            /**
             * Constructs a new RequestVerificationCodeReq.
             * @memberof kproto
             * @classdesc Represents a RequestVerificationCodeReq.
             * @implements IRequestVerificationCodeReq
             * @constructor
             * @param {kproto.IRequestVerificationCodeReq=} [properties] Properties to set
             */
            function RequestVerificationCodeReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new RequestVerificationCodeReq instance using the specified properties.
             * @function create
             * @memberof kproto.RequestVerificationCodeReq
             * @static
             * @param {kproto.IRequestVerificationCodeReq=} [properties] Properties to set
             * @returns {kproto.RequestVerificationCodeReq} RequestVerificationCodeReq instance
             */
            RequestVerificationCodeReq.create = function create(properties) {
                return new RequestVerificationCodeReq(properties);
            };
    
            /**
             * Encodes the specified RequestVerificationCodeReq message. Does not implicitly {@link kproto.RequestVerificationCodeReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.RequestVerificationCodeReq
             * @static
             * @param {kproto.IRequestVerificationCodeReq} message RequestVerificationCodeReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RequestVerificationCodeReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified RequestVerificationCodeReq message, length delimited. Does not implicitly {@link kproto.RequestVerificationCodeReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.RequestVerificationCodeReq
             * @static
             * @param {kproto.IRequestVerificationCodeReq} message RequestVerificationCodeReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RequestVerificationCodeReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a RequestVerificationCodeReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.RequestVerificationCodeReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.RequestVerificationCodeReq} RequestVerificationCodeReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RequestVerificationCodeReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.RequestVerificationCodeReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a RequestVerificationCodeReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.RequestVerificationCodeReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.RequestVerificationCodeReq} RequestVerificationCodeReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RequestVerificationCodeReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a RequestVerificationCodeReq message.
             * @function verify
             * @memberof kproto.RequestVerificationCodeReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RequestVerificationCodeReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a RequestVerificationCodeReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.RequestVerificationCodeReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.RequestVerificationCodeReq} RequestVerificationCodeReq
             */
            RequestVerificationCodeReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.RequestVerificationCodeReq)
                    return object;
                return new $root.kproto.RequestVerificationCodeReq();
            };
    
            /**
             * Creates a plain object from a RequestVerificationCodeReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.RequestVerificationCodeReq
             * @static
             * @param {kproto.RequestVerificationCodeReq} message RequestVerificationCodeReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RequestVerificationCodeReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this RequestVerificationCodeReq to JSON.
             * @function toJSON
             * @memberof kproto.RequestVerificationCodeReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RequestVerificationCodeReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return RequestVerificationCodeReq;
        })();
    
        kproto.RequestVerificationCodeResp = (function() {
    
            /**
             * Properties of a RequestVerificationCodeResp.
             * @memberof kproto
             * @interface IRequestVerificationCodeResp
             */
    
            /**
             * Constructs a new RequestVerificationCodeResp.
             * @memberof kproto
             * @classdesc Represents a RequestVerificationCodeResp.
             * @implements IRequestVerificationCodeResp
             * @constructor
             * @param {kproto.IRequestVerificationCodeResp=} [properties] Properties to set
             */
            function RequestVerificationCodeResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new RequestVerificationCodeResp instance using the specified properties.
             * @function create
             * @memberof kproto.RequestVerificationCodeResp
             * @static
             * @param {kproto.IRequestVerificationCodeResp=} [properties] Properties to set
             * @returns {kproto.RequestVerificationCodeResp} RequestVerificationCodeResp instance
             */
            RequestVerificationCodeResp.create = function create(properties) {
                return new RequestVerificationCodeResp(properties);
            };
    
            /**
             * Encodes the specified RequestVerificationCodeResp message. Does not implicitly {@link kproto.RequestVerificationCodeResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.RequestVerificationCodeResp
             * @static
             * @param {kproto.IRequestVerificationCodeResp} message RequestVerificationCodeResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RequestVerificationCodeResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified RequestVerificationCodeResp message, length delimited. Does not implicitly {@link kproto.RequestVerificationCodeResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.RequestVerificationCodeResp
             * @static
             * @param {kproto.IRequestVerificationCodeResp} message RequestVerificationCodeResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            RequestVerificationCodeResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a RequestVerificationCodeResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.RequestVerificationCodeResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.RequestVerificationCodeResp} RequestVerificationCodeResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RequestVerificationCodeResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.RequestVerificationCodeResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a RequestVerificationCodeResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.RequestVerificationCodeResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.RequestVerificationCodeResp} RequestVerificationCodeResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            RequestVerificationCodeResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a RequestVerificationCodeResp message.
             * @function verify
             * @memberof kproto.RequestVerificationCodeResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            RequestVerificationCodeResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a RequestVerificationCodeResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.RequestVerificationCodeResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.RequestVerificationCodeResp} RequestVerificationCodeResp
             */
            RequestVerificationCodeResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.RequestVerificationCodeResp)
                    return object;
                return new $root.kproto.RequestVerificationCodeResp();
            };
    
            /**
             * Creates a plain object from a RequestVerificationCodeResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.RequestVerificationCodeResp
             * @static
             * @param {kproto.RequestVerificationCodeResp} message RequestVerificationCodeResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            RequestVerificationCodeResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this RequestVerificationCodeResp to JSON.
             * @function toJSON
             * @memberof kproto.RequestVerificationCodeResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            RequestVerificationCodeResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return RequestVerificationCodeResp;
        })();
    
        kproto.CheckAppUpdateReq = (function() {
    
            /**
             * Properties of a CheckAppUpdateReq.
             * @memberof kproto
             * @interface ICheckAppUpdateReq
             */
    
            /**
             * Constructs a new CheckAppUpdateReq.
             * @memberof kproto
             * @classdesc Represents a CheckAppUpdateReq.
             * @implements ICheckAppUpdateReq
             * @constructor
             * @param {kproto.ICheckAppUpdateReq=} [properties] Properties to set
             */
            function CheckAppUpdateReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new CheckAppUpdateReq instance using the specified properties.
             * @function create
             * @memberof kproto.CheckAppUpdateReq
             * @static
             * @param {kproto.ICheckAppUpdateReq=} [properties] Properties to set
             * @returns {kproto.CheckAppUpdateReq} CheckAppUpdateReq instance
             */
            CheckAppUpdateReq.create = function create(properties) {
                return new CheckAppUpdateReq(properties);
            };
    
            /**
             * Encodes the specified CheckAppUpdateReq message. Does not implicitly {@link kproto.CheckAppUpdateReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.CheckAppUpdateReq
             * @static
             * @param {kproto.ICheckAppUpdateReq} message CheckAppUpdateReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckAppUpdateReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified CheckAppUpdateReq message, length delimited. Does not implicitly {@link kproto.CheckAppUpdateReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.CheckAppUpdateReq
             * @static
             * @param {kproto.ICheckAppUpdateReq} message CheckAppUpdateReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckAppUpdateReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CheckAppUpdateReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.CheckAppUpdateReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.CheckAppUpdateReq} CheckAppUpdateReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckAppUpdateReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.CheckAppUpdateReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CheckAppUpdateReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.CheckAppUpdateReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.CheckAppUpdateReq} CheckAppUpdateReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckAppUpdateReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CheckAppUpdateReq message.
             * @function verify
             * @memberof kproto.CheckAppUpdateReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CheckAppUpdateReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a CheckAppUpdateReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.CheckAppUpdateReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.CheckAppUpdateReq} CheckAppUpdateReq
             */
            CheckAppUpdateReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.CheckAppUpdateReq)
                    return object;
                return new $root.kproto.CheckAppUpdateReq();
            };
    
            /**
             * Creates a plain object from a CheckAppUpdateReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.CheckAppUpdateReq
             * @static
             * @param {kproto.CheckAppUpdateReq} message CheckAppUpdateReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CheckAppUpdateReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this CheckAppUpdateReq to JSON.
             * @function toJSON
             * @memberof kproto.CheckAppUpdateReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CheckAppUpdateReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CheckAppUpdateReq;
        })();
    
        kproto.CheckAppUpdateResp = (function() {
    
            /**
             * Properties of a CheckAppUpdateResp.
             * @memberof kproto
             * @interface ICheckAppUpdateResp
             */
    
            /**
             * Constructs a new CheckAppUpdateResp.
             * @memberof kproto
             * @classdesc Represents a CheckAppUpdateResp.
             * @implements ICheckAppUpdateResp
             * @constructor
             * @param {kproto.ICheckAppUpdateResp=} [properties] Properties to set
             */
            function CheckAppUpdateResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new CheckAppUpdateResp instance using the specified properties.
             * @function create
             * @memberof kproto.CheckAppUpdateResp
             * @static
             * @param {kproto.ICheckAppUpdateResp=} [properties] Properties to set
             * @returns {kproto.CheckAppUpdateResp} CheckAppUpdateResp instance
             */
            CheckAppUpdateResp.create = function create(properties) {
                return new CheckAppUpdateResp(properties);
            };
    
            /**
             * Encodes the specified CheckAppUpdateResp message. Does not implicitly {@link kproto.CheckAppUpdateResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.CheckAppUpdateResp
             * @static
             * @param {kproto.ICheckAppUpdateResp} message CheckAppUpdateResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckAppUpdateResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified CheckAppUpdateResp message, length delimited. Does not implicitly {@link kproto.CheckAppUpdateResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.CheckAppUpdateResp
             * @static
             * @param {kproto.ICheckAppUpdateResp} message CheckAppUpdateResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CheckAppUpdateResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a CheckAppUpdateResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.CheckAppUpdateResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.CheckAppUpdateResp} CheckAppUpdateResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckAppUpdateResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.CheckAppUpdateResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a CheckAppUpdateResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.CheckAppUpdateResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.CheckAppUpdateResp} CheckAppUpdateResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CheckAppUpdateResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a CheckAppUpdateResp message.
             * @function verify
             * @memberof kproto.CheckAppUpdateResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CheckAppUpdateResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a CheckAppUpdateResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.CheckAppUpdateResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.CheckAppUpdateResp} CheckAppUpdateResp
             */
            CheckAppUpdateResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.CheckAppUpdateResp)
                    return object;
                return new $root.kproto.CheckAppUpdateResp();
            };
    
            /**
             * Creates a plain object from a CheckAppUpdateResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.CheckAppUpdateResp
             * @static
             * @param {kproto.CheckAppUpdateResp} message CheckAppUpdateResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CheckAppUpdateResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this CheckAppUpdateResp to JSON.
             * @function toJSON
             * @memberof kproto.CheckAppUpdateResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CheckAppUpdateResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return CheckAppUpdateResp;
        })();
    
        kproto.UserRegisterReq = (function() {
    
            /**
             * Properties of a UserRegisterReq.
             * @memberof kproto
             * @interface IUserRegisterReq
             * @property {string|null} [UserName] UserRegisterReq UserName
             * @property {string|null} [Password] UserRegisterReq Password
             */
    
            /**
             * Constructs a new UserRegisterReq.
             * @memberof kproto
             * @classdesc Represents a UserRegisterReq.
             * @implements IUserRegisterReq
             * @constructor
             * @param {kproto.IUserRegisterReq=} [properties] Properties to set
             */
            function UserRegisterReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * UserRegisterReq UserName.
             * @member {string} UserName
             * @memberof kproto.UserRegisterReq
             * @instance
             */
            UserRegisterReq.prototype.UserName = "";
    
            /**
             * UserRegisterReq Password.
             * @member {string} Password
             * @memberof kproto.UserRegisterReq
             * @instance
             */
            UserRegisterReq.prototype.Password = "";
    
            /**
             * Creates a new UserRegisterReq instance using the specified properties.
             * @function create
             * @memberof kproto.UserRegisterReq
             * @static
             * @param {kproto.IUserRegisterReq=} [properties] Properties to set
             * @returns {kproto.UserRegisterReq} UserRegisterReq instance
             */
            UserRegisterReq.create = function create(properties) {
                return new UserRegisterReq(properties);
            };
    
            /**
             * Encodes the specified UserRegisterReq message. Does not implicitly {@link kproto.UserRegisterReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.UserRegisterReq
             * @static
             * @param {kproto.IUserRegisterReq} message UserRegisterReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserRegisterReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.UserName != null && message.hasOwnProperty("UserName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.UserName);
                if (message.Password != null && message.hasOwnProperty("Password"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.Password);
                return writer;
            };
    
            /**
             * Encodes the specified UserRegisterReq message, length delimited. Does not implicitly {@link kproto.UserRegisterReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.UserRegisterReq
             * @static
             * @param {kproto.IUserRegisterReq} message UserRegisterReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserRegisterReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a UserRegisterReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.UserRegisterReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.UserRegisterReq} UserRegisterReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserRegisterReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.UserRegisterReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.UserName = reader.string();
                        break;
                    case 2:
                        message.Password = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a UserRegisterReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.UserRegisterReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.UserRegisterReq} UserRegisterReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserRegisterReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a UserRegisterReq message.
             * @function verify
             * @memberof kproto.UserRegisterReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserRegisterReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.UserName != null && message.hasOwnProperty("UserName"))
                    if (!$util.isString(message.UserName))
                        return "UserName: string expected";
                if (message.Password != null && message.hasOwnProperty("Password"))
                    if (!$util.isString(message.Password))
                        return "Password: string expected";
                return null;
            };
    
            /**
             * Creates a UserRegisterReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.UserRegisterReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.UserRegisterReq} UserRegisterReq
             */
            UserRegisterReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.UserRegisterReq)
                    return object;
                var message = new $root.kproto.UserRegisterReq();
                if (object.UserName != null)
                    message.UserName = String(object.UserName);
                if (object.Password != null)
                    message.Password = String(object.Password);
                return message;
            };
    
            /**
             * Creates a plain object from a UserRegisterReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.UserRegisterReq
             * @static
             * @param {kproto.UserRegisterReq} message UserRegisterReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserRegisterReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.UserName = "";
                    object.Password = "";
                }
                if (message.UserName != null && message.hasOwnProperty("UserName"))
                    object.UserName = message.UserName;
                if (message.Password != null && message.hasOwnProperty("Password"))
                    object.Password = message.Password;
                return object;
            };
    
            /**
             * Converts this UserRegisterReq to JSON.
             * @function toJSON
             * @memberof kproto.UserRegisterReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserRegisterReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return UserRegisterReq;
        })();
    
        kproto.UserRegisterResp = (function() {
    
            /**
             * Properties of a UserRegisterResp.
             * @memberof kproto
             * @interface IUserRegisterResp
             */
    
            /**
             * Constructs a new UserRegisterResp.
             * @memberof kproto
             * @classdesc Represents a UserRegisterResp.
             * @implements IUserRegisterResp
             * @constructor
             * @param {kproto.IUserRegisterResp=} [properties] Properties to set
             */
            function UserRegisterResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new UserRegisterResp instance using the specified properties.
             * @function create
             * @memberof kproto.UserRegisterResp
             * @static
             * @param {kproto.IUserRegisterResp=} [properties] Properties to set
             * @returns {kproto.UserRegisterResp} UserRegisterResp instance
             */
            UserRegisterResp.create = function create(properties) {
                return new UserRegisterResp(properties);
            };
    
            /**
             * Encodes the specified UserRegisterResp message. Does not implicitly {@link kproto.UserRegisterResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.UserRegisterResp
             * @static
             * @param {kproto.IUserRegisterResp} message UserRegisterResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserRegisterResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified UserRegisterResp message, length delimited. Does not implicitly {@link kproto.UserRegisterResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.UserRegisterResp
             * @static
             * @param {kproto.IUserRegisterResp} message UserRegisterResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserRegisterResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a UserRegisterResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.UserRegisterResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.UserRegisterResp} UserRegisterResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserRegisterResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.UserRegisterResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a UserRegisterResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.UserRegisterResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.UserRegisterResp} UserRegisterResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserRegisterResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a UserRegisterResp message.
             * @function verify
             * @memberof kproto.UserRegisterResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserRegisterResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a UserRegisterResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.UserRegisterResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.UserRegisterResp} UserRegisterResp
             */
            UserRegisterResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.UserRegisterResp)
                    return object;
                return new $root.kproto.UserRegisterResp();
            };
    
            /**
             * Creates a plain object from a UserRegisterResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.UserRegisterResp
             * @static
             * @param {kproto.UserRegisterResp} message UserRegisterResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserRegisterResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this UserRegisterResp to JSON.
             * @function toJSON
             * @memberof kproto.UserRegisterResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserRegisterResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return UserRegisterResp;
        })();
    
        kproto.UserLoginReq = (function() {
    
            /**
             * Properties of a UserLoginReq.
             * @memberof kproto
             * @interface IUserLoginReq
             * @property {string|null} [UserName] UserLoginReq UserName
             * @property {string|null} [Password] UserLoginReq Password
             */
    
            /**
             * Constructs a new UserLoginReq.
             * @memberof kproto
             * @classdesc Represents a UserLoginReq.
             * @implements IUserLoginReq
             * @constructor
             * @param {kproto.IUserLoginReq=} [properties] Properties to set
             */
            function UserLoginReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * UserLoginReq UserName.
             * @member {string} UserName
             * @memberof kproto.UserLoginReq
             * @instance
             */
            UserLoginReq.prototype.UserName = "";
    
            /**
             * UserLoginReq Password.
             * @member {string} Password
             * @memberof kproto.UserLoginReq
             * @instance
             */
            UserLoginReq.prototype.Password = "";
    
            /**
             * Creates a new UserLoginReq instance using the specified properties.
             * @function create
             * @memberof kproto.UserLoginReq
             * @static
             * @param {kproto.IUserLoginReq=} [properties] Properties to set
             * @returns {kproto.UserLoginReq} UserLoginReq instance
             */
            UserLoginReq.create = function create(properties) {
                return new UserLoginReq(properties);
            };
    
            /**
             * Encodes the specified UserLoginReq message. Does not implicitly {@link kproto.UserLoginReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.UserLoginReq
             * @static
             * @param {kproto.IUserLoginReq} message UserLoginReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLoginReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.UserName != null && message.hasOwnProperty("UserName"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.UserName);
                if (message.Password != null && message.hasOwnProperty("Password"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.Password);
                return writer;
            };
    
            /**
             * Encodes the specified UserLoginReq message, length delimited. Does not implicitly {@link kproto.UserLoginReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.UserLoginReq
             * @static
             * @param {kproto.IUserLoginReq} message UserLoginReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLoginReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a UserLoginReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.UserLoginReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.UserLoginReq} UserLoginReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLoginReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.UserLoginReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.UserName = reader.string();
                        break;
                    case 2:
                        message.Password = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a UserLoginReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.UserLoginReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.UserLoginReq} UserLoginReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLoginReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a UserLoginReq message.
             * @function verify
             * @memberof kproto.UserLoginReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserLoginReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.UserName != null && message.hasOwnProperty("UserName"))
                    if (!$util.isString(message.UserName))
                        return "UserName: string expected";
                if (message.Password != null && message.hasOwnProperty("Password"))
                    if (!$util.isString(message.Password))
                        return "Password: string expected";
                return null;
            };
    
            /**
             * Creates a UserLoginReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.UserLoginReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.UserLoginReq} UserLoginReq
             */
            UserLoginReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.UserLoginReq)
                    return object;
                var message = new $root.kproto.UserLoginReq();
                if (object.UserName != null)
                    message.UserName = String(object.UserName);
                if (object.Password != null)
                    message.Password = String(object.Password);
                return message;
            };
    
            /**
             * Creates a plain object from a UserLoginReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.UserLoginReq
             * @static
             * @param {kproto.UserLoginReq} message UserLoginReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserLoginReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.UserName = "";
                    object.Password = "";
                }
                if (message.UserName != null && message.hasOwnProperty("UserName"))
                    object.UserName = message.UserName;
                if (message.Password != null && message.hasOwnProperty("Password"))
                    object.Password = message.Password;
                return object;
            };
    
            /**
             * Converts this UserLoginReq to JSON.
             * @function toJSON
             * @memberof kproto.UserLoginReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserLoginReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return UserLoginReq;
        })();
    
        kproto.UserLoginResp = (function() {
    
            /**
             * Properties of a UserLoginResp.
             * @memberof kproto
             * @interface IUserLoginResp
             * @property {number|Long|null} [SessionID] UserLoginResp SessionID
             */
    
            /**
             * Constructs a new UserLoginResp.
             * @memberof kproto
             * @classdesc Represents a UserLoginResp.
             * @implements IUserLoginResp
             * @constructor
             * @param {kproto.IUserLoginResp=} [properties] Properties to set
             */
            function UserLoginResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * UserLoginResp SessionID.
             * @member {number|Long} SessionID
             * @memberof kproto.UserLoginResp
             * @instance
             */
            UserLoginResp.prototype.SessionID = $util.Long ? $util.Long.fromBits(0,0,true) : 0;
    
            /**
             * Creates a new UserLoginResp instance using the specified properties.
             * @function create
             * @memberof kproto.UserLoginResp
             * @static
             * @param {kproto.IUserLoginResp=} [properties] Properties to set
             * @returns {kproto.UserLoginResp} UserLoginResp instance
             */
            UserLoginResp.create = function create(properties) {
                return new UserLoginResp(properties);
            };
    
            /**
             * Encodes the specified UserLoginResp message. Does not implicitly {@link kproto.UserLoginResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.UserLoginResp
             * @static
             * @param {kproto.IUserLoginResp} message UserLoginResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLoginResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.SessionID != null && message.hasOwnProperty("SessionID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint64(message.SessionID);
                return writer;
            };
    
            /**
             * Encodes the specified UserLoginResp message, length delimited. Does not implicitly {@link kproto.UserLoginResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.UserLoginResp
             * @static
             * @param {kproto.IUserLoginResp} message UserLoginResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLoginResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a UserLoginResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.UserLoginResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.UserLoginResp} UserLoginResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLoginResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.UserLoginResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.SessionID = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a UserLoginResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.UserLoginResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.UserLoginResp} UserLoginResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLoginResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a UserLoginResp message.
             * @function verify
             * @memberof kproto.UserLoginResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserLoginResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.SessionID != null && message.hasOwnProperty("SessionID"))
                    if (!$util.isInteger(message.SessionID) && !(message.SessionID && $util.isInteger(message.SessionID.low) && $util.isInteger(message.SessionID.high)))
                        return "SessionID: integer|Long expected";
                return null;
            };
    
            /**
             * Creates a UserLoginResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.UserLoginResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.UserLoginResp} UserLoginResp
             */
            UserLoginResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.UserLoginResp)
                    return object;
                var message = new $root.kproto.UserLoginResp();
                if (object.SessionID != null)
                    if ($util.Long)
                        (message.SessionID = $util.Long.fromValue(object.SessionID)).unsigned = true;
                    else if (typeof object.SessionID === "string")
                        message.SessionID = parseInt(object.SessionID, 10);
                    else if (typeof object.SessionID === "number")
                        message.SessionID = object.SessionID;
                    else if (typeof object.SessionID === "object")
                        message.SessionID = new $util.LongBits(object.SessionID.low >>> 0, object.SessionID.high >>> 0).toNumber(true);
                return message;
            };
    
            /**
             * Creates a plain object from a UserLoginResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.UserLoginResp
             * @static
             * @param {kproto.UserLoginResp} message UserLoginResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserLoginResp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, true);
                        object.SessionID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.SessionID = options.longs === String ? "0" : 0;
                if (message.SessionID != null && message.hasOwnProperty("SessionID"))
                    if (typeof message.SessionID === "number")
                        object.SessionID = options.longs === String ? String(message.SessionID) : message.SessionID;
                    else
                        object.SessionID = options.longs === String ? $util.Long.prototype.toString.call(message.SessionID) : options.longs === Number ? new $util.LongBits(message.SessionID.low >>> 0, message.SessionID.high >>> 0).toNumber(true) : message.SessionID;
                return object;
            };
    
            /**
             * Converts this UserLoginResp to JSON.
             * @function toJSON
             * @memberof kproto.UserLoginResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserLoginResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return UserLoginResp;
        })();
    
        kproto.UserLogoutReq = (function() {
    
            /**
             * Properties of a UserLogoutReq.
             * @memberof kproto
             * @interface IUserLogoutReq
             */
    
            /**
             * Constructs a new UserLogoutReq.
             * @memberof kproto
             * @classdesc Represents a UserLogoutReq.
             * @implements IUserLogoutReq
             * @constructor
             * @param {kproto.IUserLogoutReq=} [properties] Properties to set
             */
            function UserLogoutReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new UserLogoutReq instance using the specified properties.
             * @function create
             * @memberof kproto.UserLogoutReq
             * @static
             * @param {kproto.IUserLogoutReq=} [properties] Properties to set
             * @returns {kproto.UserLogoutReq} UserLogoutReq instance
             */
            UserLogoutReq.create = function create(properties) {
                return new UserLogoutReq(properties);
            };
    
            /**
             * Encodes the specified UserLogoutReq message. Does not implicitly {@link kproto.UserLogoutReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.UserLogoutReq
             * @static
             * @param {kproto.IUserLogoutReq} message UserLogoutReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLogoutReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified UserLogoutReq message, length delimited. Does not implicitly {@link kproto.UserLogoutReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.UserLogoutReq
             * @static
             * @param {kproto.IUserLogoutReq} message UserLogoutReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLogoutReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a UserLogoutReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.UserLogoutReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.UserLogoutReq} UserLogoutReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLogoutReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.UserLogoutReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a UserLogoutReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.UserLogoutReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.UserLogoutReq} UserLogoutReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLogoutReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a UserLogoutReq message.
             * @function verify
             * @memberof kproto.UserLogoutReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserLogoutReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a UserLogoutReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.UserLogoutReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.UserLogoutReq} UserLogoutReq
             */
            UserLogoutReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.UserLogoutReq)
                    return object;
                return new $root.kproto.UserLogoutReq();
            };
    
            /**
             * Creates a plain object from a UserLogoutReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.UserLogoutReq
             * @static
             * @param {kproto.UserLogoutReq} message UserLogoutReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserLogoutReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this UserLogoutReq to JSON.
             * @function toJSON
             * @memberof kproto.UserLogoutReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserLogoutReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return UserLogoutReq;
        })();
    
        kproto.UserLogoutResp = (function() {
    
            /**
             * Properties of a UserLogoutResp.
             * @memberof kproto
             * @interface IUserLogoutResp
             */
    
            /**
             * Constructs a new UserLogoutResp.
             * @memberof kproto
             * @classdesc Represents a UserLogoutResp.
             * @implements IUserLogoutResp
             * @constructor
             * @param {kproto.IUserLogoutResp=} [properties] Properties to set
             */
            function UserLogoutResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new UserLogoutResp instance using the specified properties.
             * @function create
             * @memberof kproto.UserLogoutResp
             * @static
             * @param {kproto.IUserLogoutResp=} [properties] Properties to set
             * @returns {kproto.UserLogoutResp} UserLogoutResp instance
             */
            UserLogoutResp.create = function create(properties) {
                return new UserLogoutResp(properties);
            };
    
            /**
             * Encodes the specified UserLogoutResp message. Does not implicitly {@link kproto.UserLogoutResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.UserLogoutResp
             * @static
             * @param {kproto.IUserLogoutResp} message UserLogoutResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLogoutResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified UserLogoutResp message, length delimited. Does not implicitly {@link kproto.UserLogoutResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.UserLogoutResp
             * @static
             * @param {kproto.IUserLogoutResp} message UserLogoutResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            UserLogoutResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a UserLogoutResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.UserLogoutResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.UserLogoutResp} UserLogoutResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLogoutResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.UserLogoutResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a UserLogoutResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.UserLogoutResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.UserLogoutResp} UserLogoutResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            UserLogoutResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a UserLogoutResp message.
             * @function verify
             * @memberof kproto.UserLogoutResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            UserLogoutResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a UserLogoutResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.UserLogoutResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.UserLogoutResp} UserLogoutResp
             */
            UserLogoutResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.UserLogoutResp)
                    return object;
                return new $root.kproto.UserLogoutResp();
            };
    
            /**
             * Creates a plain object from a UserLogoutResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.UserLogoutResp
             * @static
             * @param {kproto.UserLogoutResp} message UserLogoutResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            UserLogoutResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this UserLogoutResp to JSON.
             * @function toJSON
             * @memberof kproto.UserLogoutResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            UserLogoutResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return UserLogoutResp;
        })();
    
        kproto.ContactAddReq = (function() {
    
            /**
             * Properties of a ContactAddReq.
             * @memberof kproto
             * @interface IContactAddReq
             */
    
            /**
             * Constructs a new ContactAddReq.
             * @memberof kproto
             * @classdesc Represents a ContactAddReq.
             * @implements IContactAddReq
             * @constructor
             * @param {kproto.IContactAddReq=} [properties] Properties to set
             */
            function ContactAddReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ContactAddReq instance using the specified properties.
             * @function create
             * @memberof kproto.ContactAddReq
             * @static
             * @param {kproto.IContactAddReq=} [properties] Properties to set
             * @returns {kproto.ContactAddReq} ContactAddReq instance
             */
            ContactAddReq.create = function create(properties) {
                return new ContactAddReq(properties);
            };
    
            /**
             * Encodes the specified ContactAddReq message. Does not implicitly {@link kproto.ContactAddReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.ContactAddReq
             * @static
             * @param {kproto.IContactAddReq} message ContactAddReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactAddReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ContactAddReq message, length delimited. Does not implicitly {@link kproto.ContactAddReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ContactAddReq
             * @static
             * @param {kproto.IContactAddReq} message ContactAddReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactAddReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ContactAddReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ContactAddReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ContactAddReq} ContactAddReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactAddReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ContactAddReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ContactAddReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ContactAddReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ContactAddReq} ContactAddReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactAddReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ContactAddReq message.
             * @function verify
             * @memberof kproto.ContactAddReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContactAddReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ContactAddReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ContactAddReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ContactAddReq} ContactAddReq
             */
            ContactAddReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ContactAddReq)
                    return object;
                return new $root.kproto.ContactAddReq();
            };
    
            /**
             * Creates a plain object from a ContactAddReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ContactAddReq
             * @static
             * @param {kproto.ContactAddReq} message ContactAddReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContactAddReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ContactAddReq to JSON.
             * @function toJSON
             * @memberof kproto.ContactAddReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContactAddReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ContactAddReq;
        })();
    
        kproto.ContactAddResp = (function() {
    
            /**
             * Properties of a ContactAddResp.
             * @memberof kproto
             * @interface IContactAddResp
             */
    
            /**
             * Constructs a new ContactAddResp.
             * @memberof kproto
             * @classdesc Represents a ContactAddResp.
             * @implements IContactAddResp
             * @constructor
             * @param {kproto.IContactAddResp=} [properties] Properties to set
             */
            function ContactAddResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ContactAddResp instance using the specified properties.
             * @function create
             * @memberof kproto.ContactAddResp
             * @static
             * @param {kproto.IContactAddResp=} [properties] Properties to set
             * @returns {kproto.ContactAddResp} ContactAddResp instance
             */
            ContactAddResp.create = function create(properties) {
                return new ContactAddResp(properties);
            };
    
            /**
             * Encodes the specified ContactAddResp message. Does not implicitly {@link kproto.ContactAddResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.ContactAddResp
             * @static
             * @param {kproto.IContactAddResp} message ContactAddResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactAddResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ContactAddResp message, length delimited. Does not implicitly {@link kproto.ContactAddResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ContactAddResp
             * @static
             * @param {kproto.IContactAddResp} message ContactAddResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactAddResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ContactAddResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ContactAddResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ContactAddResp} ContactAddResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactAddResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ContactAddResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ContactAddResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ContactAddResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ContactAddResp} ContactAddResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactAddResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ContactAddResp message.
             * @function verify
             * @memberof kproto.ContactAddResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContactAddResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ContactAddResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ContactAddResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ContactAddResp} ContactAddResp
             */
            ContactAddResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ContactAddResp)
                    return object;
                return new $root.kproto.ContactAddResp();
            };
    
            /**
             * Creates a plain object from a ContactAddResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ContactAddResp
             * @static
             * @param {kproto.ContactAddResp} message ContactAddResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContactAddResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ContactAddResp to JSON.
             * @function toJSON
             * @memberof kproto.ContactAddResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContactAddResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ContactAddResp;
        })();
    
        kproto.ContactUpdateReq = (function() {
    
            /**
             * Properties of a ContactUpdateReq.
             * @memberof kproto
             * @interface IContactUpdateReq
             */
    
            /**
             * Constructs a new ContactUpdateReq.
             * @memberof kproto
             * @classdesc Represents a ContactUpdateReq.
             * @implements IContactUpdateReq
             * @constructor
             * @param {kproto.IContactUpdateReq=} [properties] Properties to set
             */
            function ContactUpdateReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ContactUpdateReq instance using the specified properties.
             * @function create
             * @memberof kproto.ContactUpdateReq
             * @static
             * @param {kproto.IContactUpdateReq=} [properties] Properties to set
             * @returns {kproto.ContactUpdateReq} ContactUpdateReq instance
             */
            ContactUpdateReq.create = function create(properties) {
                return new ContactUpdateReq(properties);
            };
    
            /**
             * Encodes the specified ContactUpdateReq message. Does not implicitly {@link kproto.ContactUpdateReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.ContactUpdateReq
             * @static
             * @param {kproto.IContactUpdateReq} message ContactUpdateReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactUpdateReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ContactUpdateReq message, length delimited. Does not implicitly {@link kproto.ContactUpdateReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ContactUpdateReq
             * @static
             * @param {kproto.IContactUpdateReq} message ContactUpdateReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactUpdateReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ContactUpdateReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ContactUpdateReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ContactUpdateReq} ContactUpdateReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactUpdateReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ContactUpdateReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ContactUpdateReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ContactUpdateReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ContactUpdateReq} ContactUpdateReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactUpdateReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ContactUpdateReq message.
             * @function verify
             * @memberof kproto.ContactUpdateReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContactUpdateReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ContactUpdateReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ContactUpdateReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ContactUpdateReq} ContactUpdateReq
             */
            ContactUpdateReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ContactUpdateReq)
                    return object;
                return new $root.kproto.ContactUpdateReq();
            };
    
            /**
             * Creates a plain object from a ContactUpdateReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ContactUpdateReq
             * @static
             * @param {kproto.ContactUpdateReq} message ContactUpdateReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContactUpdateReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ContactUpdateReq to JSON.
             * @function toJSON
             * @memberof kproto.ContactUpdateReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContactUpdateReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ContactUpdateReq;
        })();
    
        kproto.ContactUpdateResp = (function() {
    
            /**
             * Properties of a ContactUpdateResp.
             * @memberof kproto
             * @interface IContactUpdateResp
             */
    
            /**
             * Constructs a new ContactUpdateResp.
             * @memberof kproto
             * @classdesc Represents a ContactUpdateResp.
             * @implements IContactUpdateResp
             * @constructor
             * @param {kproto.IContactUpdateResp=} [properties] Properties to set
             */
            function ContactUpdateResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ContactUpdateResp instance using the specified properties.
             * @function create
             * @memberof kproto.ContactUpdateResp
             * @static
             * @param {kproto.IContactUpdateResp=} [properties] Properties to set
             * @returns {kproto.ContactUpdateResp} ContactUpdateResp instance
             */
            ContactUpdateResp.create = function create(properties) {
                return new ContactUpdateResp(properties);
            };
    
            /**
             * Encodes the specified ContactUpdateResp message. Does not implicitly {@link kproto.ContactUpdateResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.ContactUpdateResp
             * @static
             * @param {kproto.IContactUpdateResp} message ContactUpdateResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactUpdateResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ContactUpdateResp message, length delimited. Does not implicitly {@link kproto.ContactUpdateResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ContactUpdateResp
             * @static
             * @param {kproto.IContactUpdateResp} message ContactUpdateResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactUpdateResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ContactUpdateResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ContactUpdateResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ContactUpdateResp} ContactUpdateResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactUpdateResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ContactUpdateResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ContactUpdateResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ContactUpdateResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ContactUpdateResp} ContactUpdateResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactUpdateResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ContactUpdateResp message.
             * @function verify
             * @memberof kproto.ContactUpdateResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContactUpdateResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ContactUpdateResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ContactUpdateResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ContactUpdateResp} ContactUpdateResp
             */
            ContactUpdateResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ContactUpdateResp)
                    return object;
                return new $root.kproto.ContactUpdateResp();
            };
    
            /**
             * Creates a plain object from a ContactUpdateResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ContactUpdateResp
             * @static
             * @param {kproto.ContactUpdateResp} message ContactUpdateResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContactUpdateResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ContactUpdateResp to JSON.
             * @function toJSON
             * @memberof kproto.ContactUpdateResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContactUpdateResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ContactUpdateResp;
        })();
    
        kproto.ContactDeleteReq = (function() {
    
            /**
             * Properties of a ContactDeleteReq.
             * @memberof kproto
             * @interface IContactDeleteReq
             */
    
            /**
             * Constructs a new ContactDeleteReq.
             * @memberof kproto
             * @classdesc Represents a ContactDeleteReq.
             * @implements IContactDeleteReq
             * @constructor
             * @param {kproto.IContactDeleteReq=} [properties] Properties to set
             */
            function ContactDeleteReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ContactDeleteReq instance using the specified properties.
             * @function create
             * @memberof kproto.ContactDeleteReq
             * @static
             * @param {kproto.IContactDeleteReq=} [properties] Properties to set
             * @returns {kproto.ContactDeleteReq} ContactDeleteReq instance
             */
            ContactDeleteReq.create = function create(properties) {
                return new ContactDeleteReq(properties);
            };
    
            /**
             * Encodes the specified ContactDeleteReq message. Does not implicitly {@link kproto.ContactDeleteReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.ContactDeleteReq
             * @static
             * @param {kproto.IContactDeleteReq} message ContactDeleteReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactDeleteReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ContactDeleteReq message, length delimited. Does not implicitly {@link kproto.ContactDeleteReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ContactDeleteReq
             * @static
             * @param {kproto.IContactDeleteReq} message ContactDeleteReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactDeleteReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ContactDeleteReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ContactDeleteReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ContactDeleteReq} ContactDeleteReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactDeleteReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ContactDeleteReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ContactDeleteReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ContactDeleteReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ContactDeleteReq} ContactDeleteReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactDeleteReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ContactDeleteReq message.
             * @function verify
             * @memberof kproto.ContactDeleteReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContactDeleteReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ContactDeleteReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ContactDeleteReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ContactDeleteReq} ContactDeleteReq
             */
            ContactDeleteReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ContactDeleteReq)
                    return object;
                return new $root.kproto.ContactDeleteReq();
            };
    
            /**
             * Creates a plain object from a ContactDeleteReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ContactDeleteReq
             * @static
             * @param {kproto.ContactDeleteReq} message ContactDeleteReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContactDeleteReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ContactDeleteReq to JSON.
             * @function toJSON
             * @memberof kproto.ContactDeleteReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContactDeleteReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ContactDeleteReq;
        })();
    
        kproto.ContactDeleteResp = (function() {
    
            /**
             * Properties of a ContactDeleteResp.
             * @memberof kproto
             * @interface IContactDeleteResp
             */
    
            /**
             * Constructs a new ContactDeleteResp.
             * @memberof kproto
             * @classdesc Represents a ContactDeleteResp.
             * @implements IContactDeleteResp
             * @constructor
             * @param {kproto.IContactDeleteResp=} [properties] Properties to set
             */
            function ContactDeleteResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ContactDeleteResp instance using the specified properties.
             * @function create
             * @memberof kproto.ContactDeleteResp
             * @static
             * @param {kproto.IContactDeleteResp=} [properties] Properties to set
             * @returns {kproto.ContactDeleteResp} ContactDeleteResp instance
             */
            ContactDeleteResp.create = function create(properties) {
                return new ContactDeleteResp(properties);
            };
    
            /**
             * Encodes the specified ContactDeleteResp message. Does not implicitly {@link kproto.ContactDeleteResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.ContactDeleteResp
             * @static
             * @param {kproto.IContactDeleteResp} message ContactDeleteResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactDeleteResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ContactDeleteResp message, length delimited. Does not implicitly {@link kproto.ContactDeleteResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ContactDeleteResp
             * @static
             * @param {kproto.IContactDeleteResp} message ContactDeleteResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ContactDeleteResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ContactDeleteResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ContactDeleteResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ContactDeleteResp} ContactDeleteResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactDeleteResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ContactDeleteResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ContactDeleteResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ContactDeleteResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ContactDeleteResp} ContactDeleteResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ContactDeleteResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ContactDeleteResp message.
             * @function verify
             * @memberof kproto.ContactDeleteResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ContactDeleteResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ContactDeleteResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ContactDeleteResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ContactDeleteResp} ContactDeleteResp
             */
            ContactDeleteResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ContactDeleteResp)
                    return object;
                return new $root.kproto.ContactDeleteResp();
            };
    
            /**
             * Creates a plain object from a ContactDeleteResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ContactDeleteResp
             * @static
             * @param {kproto.ContactDeleteResp} message ContactDeleteResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ContactDeleteResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ContactDeleteResp to JSON.
             * @function toJSON
             * @memberof kproto.ContactDeleteResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ContactDeleteResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ContactDeleteResp;
        })();
    
        kproto.ChatCreateReq = (function() {
    
            /**
             * Properties of a ChatCreateReq.
             * @memberof kproto
             * @interface IChatCreateReq
             * @property {string|null} [Title] ChatCreateReq Title
             */
    
            /**
             * Constructs a new ChatCreateReq.
             * @memberof kproto
             * @classdesc Represents a ChatCreateReq.
             * @implements IChatCreateReq
             * @constructor
             * @param {kproto.IChatCreateReq=} [properties] Properties to set
             */
            function ChatCreateReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ChatCreateReq Title.
             * @member {string} Title
             * @memberof kproto.ChatCreateReq
             * @instance
             */
            ChatCreateReq.prototype.Title = "";
    
            /**
             * Creates a new ChatCreateReq instance using the specified properties.
             * @function create
             * @memberof kproto.ChatCreateReq
             * @static
             * @param {kproto.IChatCreateReq=} [properties] Properties to set
             * @returns {kproto.ChatCreateReq} ChatCreateReq instance
             */
            ChatCreateReq.create = function create(properties) {
                return new ChatCreateReq(properties);
            };
    
            /**
             * Encodes the specified ChatCreateReq message. Does not implicitly {@link kproto.ChatCreateReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatCreateReq
             * @static
             * @param {kproto.IChatCreateReq} message ChatCreateReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatCreateReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.Title != null && message.hasOwnProperty("Title"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.Title);
                return writer;
            };
    
            /**
             * Encodes the specified ChatCreateReq message, length delimited. Does not implicitly {@link kproto.ChatCreateReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatCreateReq
             * @static
             * @param {kproto.IChatCreateReq} message ChatCreateReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatCreateReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatCreateReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatCreateReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatCreateReq} ChatCreateReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatCreateReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatCreateReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.Title = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatCreateReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatCreateReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatCreateReq} ChatCreateReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatCreateReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatCreateReq message.
             * @function verify
             * @memberof kproto.ChatCreateReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatCreateReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.Title != null && message.hasOwnProperty("Title"))
                    if (!$util.isString(message.Title))
                        return "Title: string expected";
                return null;
            };
    
            /**
             * Creates a ChatCreateReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatCreateReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatCreateReq} ChatCreateReq
             */
            ChatCreateReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatCreateReq)
                    return object;
                var message = new $root.kproto.ChatCreateReq();
                if (object.Title != null)
                    message.Title = String(object.Title);
                return message;
            };
    
            /**
             * Creates a plain object from a ChatCreateReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatCreateReq
             * @static
             * @param {kproto.ChatCreateReq} message ChatCreateReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatCreateReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults)
                    object.Title = "";
                if (message.Title != null && message.hasOwnProperty("Title"))
                    object.Title = message.Title;
                return object;
            };
    
            /**
             * Converts this ChatCreateReq to JSON.
             * @function toJSON
             * @memberof kproto.ChatCreateReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatCreateReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatCreateReq;
        })();
    
        kproto.ChatCreateResp = (function() {
    
            /**
             * Properties of a ChatCreateResp.
             * @memberof kproto
             * @interface IChatCreateResp
             */
    
            /**
             * Constructs a new ChatCreateResp.
             * @memberof kproto
             * @classdesc Represents a ChatCreateResp.
             * @implements IChatCreateResp
             * @constructor
             * @param {kproto.IChatCreateResp=} [properties] Properties to set
             */
            function ChatCreateResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ChatCreateResp instance using the specified properties.
             * @function create
             * @memberof kproto.ChatCreateResp
             * @static
             * @param {kproto.IChatCreateResp=} [properties] Properties to set
             * @returns {kproto.ChatCreateResp} ChatCreateResp instance
             */
            ChatCreateResp.create = function create(properties) {
                return new ChatCreateResp(properties);
            };
    
            /**
             * Encodes the specified ChatCreateResp message. Does not implicitly {@link kproto.ChatCreateResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatCreateResp
             * @static
             * @param {kproto.IChatCreateResp} message ChatCreateResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatCreateResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ChatCreateResp message, length delimited. Does not implicitly {@link kproto.ChatCreateResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatCreateResp
             * @static
             * @param {kproto.IChatCreateResp} message ChatCreateResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatCreateResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatCreateResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatCreateResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatCreateResp} ChatCreateResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatCreateResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatCreateResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatCreateResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatCreateResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatCreateResp} ChatCreateResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatCreateResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatCreateResp message.
             * @function verify
             * @memberof kproto.ChatCreateResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatCreateResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ChatCreateResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatCreateResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatCreateResp} ChatCreateResp
             */
            ChatCreateResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatCreateResp)
                    return object;
                return new $root.kproto.ChatCreateResp();
            };
    
            /**
             * Creates a plain object from a ChatCreateResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatCreateResp
             * @static
             * @param {kproto.ChatCreateResp} message ChatCreateResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatCreateResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ChatCreateResp to JSON.
             * @function toJSON
             * @memberof kproto.ChatCreateResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatCreateResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatCreateResp;
        })();
    
        kproto.Chat = (function() {
    
            /**
             * Properties of a Chat.
             * @memberof kproto
             * @interface IChat
             * @property {number|Long|null} [ID] Chat ID
             * @property {number|Long|null} [CreateAt] Chat CreateAt
             * @property {number|Long|null} [UpdatedAt] Chat UpdatedAt
             * @property {number|null} [ChatType] Chat ChatType
             * @property {string|null} [Title] Chat Title
             * @property {number|null} [Disabled] Chat Disabled
             */
    
            /**
             * Constructs a new Chat.
             * @memberof kproto
             * @classdesc Represents a Chat.
             * @implements IChat
             * @constructor
             * @param {kproto.IChat=} [properties] Properties to set
             */
            function Chat(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Chat ID.
             * @member {number|Long} ID
             * @memberof kproto.Chat
             * @instance
             */
            Chat.prototype.ID = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Chat CreateAt.
             * @member {number|Long} CreateAt
             * @memberof kproto.Chat
             * @instance
             */
            Chat.prototype.CreateAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Chat UpdatedAt.
             * @member {number|Long} UpdatedAt
             * @memberof kproto.Chat
             * @instance
             */
            Chat.prototype.UpdatedAt = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * Chat ChatType.
             * @member {number} ChatType
             * @memberof kproto.Chat
             * @instance
             */
            Chat.prototype.ChatType = 0;
    
            /**
             * Chat Title.
             * @member {string} Title
             * @memberof kproto.Chat
             * @instance
             */
            Chat.prototype.Title = "";
    
            /**
             * Chat Disabled.
             * @member {number} Disabled
             * @memberof kproto.Chat
             * @instance
             */
            Chat.prototype.Disabled = 0;
    
            /**
             * Creates a new Chat instance using the specified properties.
             * @function create
             * @memberof kproto.Chat
             * @static
             * @param {kproto.IChat=} [properties] Properties to set
             * @returns {kproto.Chat} Chat instance
             */
            Chat.create = function create(properties) {
                return new Chat(properties);
            };
    
            /**
             * Encodes the specified Chat message. Does not implicitly {@link kproto.Chat.verify|verify} messages.
             * @function encode
             * @memberof kproto.Chat
             * @static
             * @param {kproto.IChat} message Chat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Chat.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ID != null && message.hasOwnProperty("ID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.ID);
                if (message.CreateAt != null && message.hasOwnProperty("CreateAt"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int64(message.CreateAt);
                if (message.UpdatedAt != null && message.hasOwnProperty("UpdatedAt"))
                    writer.uint32(/* id 3, wireType 0 =*/24).int64(message.UpdatedAt);
                if (message.ChatType != null && message.hasOwnProperty("ChatType"))
                    writer.uint32(/* id 4, wireType 0 =*/32).int32(message.ChatType);
                if (message.Title != null && message.hasOwnProperty("Title"))
                    writer.uint32(/* id 5, wireType 2 =*/42).string(message.Title);
                if (message.Disabled != null && message.hasOwnProperty("Disabled"))
                    writer.uint32(/* id 6, wireType 0 =*/48).int32(message.Disabled);
                return writer;
            };
    
            /**
             * Encodes the specified Chat message, length delimited. Does not implicitly {@link kproto.Chat.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.Chat
             * @static
             * @param {kproto.IChat} message Chat message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Chat.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a Chat message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.Chat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.Chat} Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Chat.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.Chat();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ID = reader.int64();
                        break;
                    case 2:
                        message.CreateAt = reader.int64();
                        break;
                    case 3:
                        message.UpdatedAt = reader.int64();
                        break;
                    case 4:
                        message.ChatType = reader.int32();
                        break;
                    case 5:
                        message.Title = reader.string();
                        break;
                    case 6:
                        message.Disabled = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a Chat message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.Chat
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.Chat} Chat
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Chat.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a Chat message.
             * @function verify
             * @memberof kproto.Chat
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Chat.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ID != null && message.hasOwnProperty("ID"))
                    if (!$util.isInteger(message.ID) && !(message.ID && $util.isInteger(message.ID.low) && $util.isInteger(message.ID.high)))
                        return "ID: integer|Long expected";
                if (message.CreateAt != null && message.hasOwnProperty("CreateAt"))
                    if (!$util.isInteger(message.CreateAt) && !(message.CreateAt && $util.isInteger(message.CreateAt.low) && $util.isInteger(message.CreateAt.high)))
                        return "CreateAt: integer|Long expected";
                if (message.UpdatedAt != null && message.hasOwnProperty("UpdatedAt"))
                    if (!$util.isInteger(message.UpdatedAt) && !(message.UpdatedAt && $util.isInteger(message.UpdatedAt.low) && $util.isInteger(message.UpdatedAt.high)))
                        return "UpdatedAt: integer|Long expected";
                if (message.ChatType != null && message.hasOwnProperty("ChatType"))
                    if (!$util.isInteger(message.ChatType))
                        return "ChatType: integer expected";
                if (message.Title != null && message.hasOwnProperty("Title"))
                    if (!$util.isString(message.Title))
                        return "Title: string expected";
                if (message.Disabled != null && message.hasOwnProperty("Disabled"))
                    if (!$util.isInteger(message.Disabled))
                        return "Disabled: integer expected";
                return null;
            };
    
            /**
             * Creates a Chat message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.Chat
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.Chat} Chat
             */
            Chat.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.Chat)
                    return object;
                var message = new $root.kproto.Chat();
                if (object.ID != null)
                    if ($util.Long)
                        (message.ID = $util.Long.fromValue(object.ID)).unsigned = false;
                    else if (typeof object.ID === "string")
                        message.ID = parseInt(object.ID, 10);
                    else if (typeof object.ID === "number")
                        message.ID = object.ID;
                    else if (typeof object.ID === "object")
                        message.ID = new $util.LongBits(object.ID.low >>> 0, object.ID.high >>> 0).toNumber();
                if (object.CreateAt != null)
                    if ($util.Long)
                        (message.CreateAt = $util.Long.fromValue(object.CreateAt)).unsigned = false;
                    else if (typeof object.CreateAt === "string")
                        message.CreateAt = parseInt(object.CreateAt, 10);
                    else if (typeof object.CreateAt === "number")
                        message.CreateAt = object.CreateAt;
                    else if (typeof object.CreateAt === "object")
                        message.CreateAt = new $util.LongBits(object.CreateAt.low >>> 0, object.CreateAt.high >>> 0).toNumber();
                if (object.UpdatedAt != null)
                    if ($util.Long)
                        (message.UpdatedAt = $util.Long.fromValue(object.UpdatedAt)).unsigned = false;
                    else if (typeof object.UpdatedAt === "string")
                        message.UpdatedAt = parseInt(object.UpdatedAt, 10);
                    else if (typeof object.UpdatedAt === "number")
                        message.UpdatedAt = object.UpdatedAt;
                    else if (typeof object.UpdatedAt === "object")
                        message.UpdatedAt = new $util.LongBits(object.UpdatedAt.low >>> 0, object.UpdatedAt.high >>> 0).toNumber();
                if (object.ChatType != null)
                    message.ChatType = object.ChatType | 0;
                if (object.Title != null)
                    message.Title = String(object.Title);
                if (object.Disabled != null)
                    message.Disabled = object.Disabled | 0;
                return message;
            };
    
            /**
             * Creates a plain object from a Chat message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.Chat
             * @static
             * @param {kproto.Chat} message Chat
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Chat.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ID = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.CreateAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.CreateAt = options.longs === String ? "0" : 0;
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.UpdatedAt = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.UpdatedAt = options.longs === String ? "0" : 0;
                    object.ChatType = 0;
                    object.Title = "";
                    object.Disabled = 0;
                }
                if (message.ID != null && message.hasOwnProperty("ID"))
                    if (typeof message.ID === "number")
                        object.ID = options.longs === String ? String(message.ID) : message.ID;
                    else
                        object.ID = options.longs === String ? $util.Long.prototype.toString.call(message.ID) : options.longs === Number ? new $util.LongBits(message.ID.low >>> 0, message.ID.high >>> 0).toNumber() : message.ID;
                if (message.CreateAt != null && message.hasOwnProperty("CreateAt"))
                    if (typeof message.CreateAt === "number")
                        object.CreateAt = options.longs === String ? String(message.CreateAt) : message.CreateAt;
                    else
                        object.CreateAt = options.longs === String ? $util.Long.prototype.toString.call(message.CreateAt) : options.longs === Number ? new $util.LongBits(message.CreateAt.low >>> 0, message.CreateAt.high >>> 0).toNumber() : message.CreateAt;
                if (message.UpdatedAt != null && message.hasOwnProperty("UpdatedAt"))
                    if (typeof message.UpdatedAt === "number")
                        object.UpdatedAt = options.longs === String ? String(message.UpdatedAt) : message.UpdatedAt;
                    else
                        object.UpdatedAt = options.longs === String ? $util.Long.prototype.toString.call(message.UpdatedAt) : options.longs === Number ? new $util.LongBits(message.UpdatedAt.low >>> 0, message.UpdatedAt.high >>> 0).toNumber() : message.UpdatedAt;
                if (message.ChatType != null && message.hasOwnProperty("ChatType"))
                    object.ChatType = message.ChatType;
                if (message.Title != null && message.hasOwnProperty("Title"))
                    object.Title = message.Title;
                if (message.Disabled != null && message.hasOwnProperty("Disabled"))
                    object.Disabled = message.Disabled;
                return object;
            };
    
            /**
             * Converts this Chat to JSON.
             * @function toJSON
             * @memberof kproto.Chat
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Chat.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return Chat;
        })();
    
        kproto.ChatGetChatsReq = (function() {
    
            /**
             * Properties of a ChatGetChatsReq.
             * @memberof kproto
             * @interface IChatGetChatsReq
             */
    
            /**
             * Constructs a new ChatGetChatsReq.
             * @memberof kproto
             * @classdesc Represents a ChatGetChatsReq.
             * @implements IChatGetChatsReq
             * @constructor
             * @param {kproto.IChatGetChatsReq=} [properties] Properties to set
             */
            function ChatGetChatsReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ChatGetChatsReq instance using the specified properties.
             * @function create
             * @memberof kproto.ChatGetChatsReq
             * @static
             * @param {kproto.IChatGetChatsReq=} [properties] Properties to set
             * @returns {kproto.ChatGetChatsReq} ChatGetChatsReq instance
             */
            ChatGetChatsReq.create = function create(properties) {
                return new ChatGetChatsReq(properties);
            };
    
            /**
             * Encodes the specified ChatGetChatsReq message. Does not implicitly {@link kproto.ChatGetChatsReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatGetChatsReq
             * @static
             * @param {kproto.IChatGetChatsReq} message ChatGetChatsReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatGetChatsReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ChatGetChatsReq message, length delimited. Does not implicitly {@link kproto.ChatGetChatsReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatGetChatsReq
             * @static
             * @param {kproto.IChatGetChatsReq} message ChatGetChatsReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatGetChatsReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatGetChatsReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatGetChatsReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatGetChatsReq} ChatGetChatsReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatGetChatsReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatGetChatsReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatGetChatsReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatGetChatsReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatGetChatsReq} ChatGetChatsReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatGetChatsReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatGetChatsReq message.
             * @function verify
             * @memberof kproto.ChatGetChatsReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatGetChatsReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ChatGetChatsReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatGetChatsReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatGetChatsReq} ChatGetChatsReq
             */
            ChatGetChatsReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatGetChatsReq)
                    return object;
                return new $root.kproto.ChatGetChatsReq();
            };
    
            /**
             * Creates a plain object from a ChatGetChatsReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatGetChatsReq
             * @static
             * @param {kproto.ChatGetChatsReq} message ChatGetChatsReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatGetChatsReq.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ChatGetChatsReq to JSON.
             * @function toJSON
             * @memberof kproto.ChatGetChatsReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatGetChatsReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatGetChatsReq;
        })();
    
        kproto.ChatGetChatsResp = (function() {
    
            /**
             * Properties of a ChatGetChatsResp.
             * @memberof kproto
             * @interface IChatGetChatsResp
             * @property {Array.<kproto.IChat>|null} [Chats] ChatGetChatsResp Chats
             */
    
            /**
             * Constructs a new ChatGetChatsResp.
             * @memberof kproto
             * @classdesc Represents a ChatGetChatsResp.
             * @implements IChatGetChatsResp
             * @constructor
             * @param {kproto.IChatGetChatsResp=} [properties] Properties to set
             */
            function ChatGetChatsResp(properties) {
                this.Chats = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ChatGetChatsResp Chats.
             * @member {Array.<kproto.IChat>} Chats
             * @memberof kproto.ChatGetChatsResp
             * @instance
             */
            ChatGetChatsResp.prototype.Chats = $util.emptyArray;
    
            /**
             * Creates a new ChatGetChatsResp instance using the specified properties.
             * @function create
             * @memberof kproto.ChatGetChatsResp
             * @static
             * @param {kproto.IChatGetChatsResp=} [properties] Properties to set
             * @returns {kproto.ChatGetChatsResp} ChatGetChatsResp instance
             */
            ChatGetChatsResp.create = function create(properties) {
                return new ChatGetChatsResp(properties);
            };
    
            /**
             * Encodes the specified ChatGetChatsResp message. Does not implicitly {@link kproto.ChatGetChatsResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatGetChatsResp
             * @static
             * @param {kproto.IChatGetChatsResp} message ChatGetChatsResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatGetChatsResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.Chats != null && message.Chats.length)
                    for (var i = 0; i < message.Chats.length; ++i)
                        $root.kproto.Chat.encode(message.Chats[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };
    
            /**
             * Encodes the specified ChatGetChatsResp message, length delimited. Does not implicitly {@link kproto.ChatGetChatsResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatGetChatsResp
             * @static
             * @param {kproto.IChatGetChatsResp} message ChatGetChatsResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatGetChatsResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatGetChatsResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatGetChatsResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatGetChatsResp} ChatGetChatsResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatGetChatsResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatGetChatsResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        if (!(message.Chats && message.Chats.length))
                            message.Chats = [];
                        message.Chats.push($root.kproto.Chat.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatGetChatsResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatGetChatsResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatGetChatsResp} ChatGetChatsResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatGetChatsResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatGetChatsResp message.
             * @function verify
             * @memberof kproto.ChatGetChatsResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatGetChatsResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.Chats != null && message.hasOwnProperty("Chats")) {
                    if (!Array.isArray(message.Chats))
                        return "Chats: array expected";
                    for (var i = 0; i < message.Chats.length; ++i) {
                        var error = $root.kproto.Chat.verify(message.Chats[i]);
                        if (error)
                            return "Chats." + error;
                    }
                }
                return null;
            };
    
            /**
             * Creates a ChatGetChatsResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatGetChatsResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatGetChatsResp} ChatGetChatsResp
             */
            ChatGetChatsResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatGetChatsResp)
                    return object;
                var message = new $root.kproto.ChatGetChatsResp();
                if (object.Chats) {
                    if (!Array.isArray(object.Chats))
                        throw TypeError(".kproto.ChatGetChatsResp.Chats: array expected");
                    message.Chats = [];
                    for (var i = 0; i < object.Chats.length; ++i) {
                        if (typeof object.Chats[i] !== "object")
                            throw TypeError(".kproto.ChatGetChatsResp.Chats: object expected");
                        message.Chats[i] = $root.kproto.Chat.fromObject(object.Chats[i]);
                    }
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ChatGetChatsResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatGetChatsResp
             * @static
             * @param {kproto.ChatGetChatsResp} message ChatGetChatsResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatGetChatsResp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.Chats = [];
                if (message.Chats && message.Chats.length) {
                    object.Chats = [];
                    for (var j = 0; j < message.Chats.length; ++j)
                        object.Chats[j] = $root.kproto.Chat.toObject(message.Chats[j], options);
                }
                return object;
            };
    
            /**
             * Converts this ChatGetChatsResp to JSON.
             * @function toJSON
             * @memberof kproto.ChatGetChatsResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatGetChatsResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatGetChatsResp;
        })();
    
        kproto.ChatAddMemberReq = (function() {
    
            /**
             * Properties of a ChatAddMemberReq.
             * @memberof kproto
             * @interface IChatAddMemberReq
             * @property {number|Long|null} [ChatID] ChatAddMemberReq ChatID
             * @property {Array.<number|Long>|null} [UserIDs] ChatAddMemberReq UserIDs
             */
    
            /**
             * Constructs a new ChatAddMemberReq.
             * @memberof kproto
             * @classdesc Represents a ChatAddMemberReq.
             * @implements IChatAddMemberReq
             * @constructor
             * @param {kproto.IChatAddMemberReq=} [properties] Properties to set
             */
            function ChatAddMemberReq(properties) {
                this.UserIDs = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ChatAddMemberReq ChatID.
             * @member {number|Long} ChatID
             * @memberof kproto.ChatAddMemberReq
             * @instance
             */
            ChatAddMemberReq.prototype.ChatID = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * ChatAddMemberReq UserIDs.
             * @member {Array.<number|Long>} UserIDs
             * @memberof kproto.ChatAddMemberReq
             * @instance
             */
            ChatAddMemberReq.prototype.UserIDs = $util.emptyArray;
    
            /**
             * Creates a new ChatAddMemberReq instance using the specified properties.
             * @function create
             * @memberof kproto.ChatAddMemberReq
             * @static
             * @param {kproto.IChatAddMemberReq=} [properties] Properties to set
             * @returns {kproto.ChatAddMemberReq} ChatAddMemberReq instance
             */
            ChatAddMemberReq.create = function create(properties) {
                return new ChatAddMemberReq(properties);
            };
    
            /**
             * Encodes the specified ChatAddMemberReq message. Does not implicitly {@link kproto.ChatAddMemberReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatAddMemberReq
             * @static
             * @param {kproto.IChatAddMemberReq} message ChatAddMemberReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatAddMemberReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.ChatID);
                if (message.UserIDs != null && message.UserIDs.length) {
                    writer.uint32(/* id 2, wireType 2 =*/18).fork();
                    for (var i = 0; i < message.UserIDs.length; ++i)
                        writer.int64(message.UserIDs[i]);
                    writer.ldelim();
                }
                return writer;
            };
    
            /**
             * Encodes the specified ChatAddMemberReq message, length delimited. Does not implicitly {@link kproto.ChatAddMemberReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatAddMemberReq
             * @static
             * @param {kproto.IChatAddMemberReq} message ChatAddMemberReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatAddMemberReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatAddMemberReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatAddMemberReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatAddMemberReq} ChatAddMemberReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatAddMemberReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatAddMemberReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ChatID = reader.int64();
                        break;
                    case 2:
                        if (!(message.UserIDs && message.UserIDs.length))
                            message.UserIDs = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.UserIDs.push(reader.int64());
                        } else
                            message.UserIDs.push(reader.int64());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatAddMemberReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatAddMemberReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatAddMemberReq} ChatAddMemberReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatAddMemberReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatAddMemberReq message.
             * @function verify
             * @memberof kproto.ChatAddMemberReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatAddMemberReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (!$util.isInteger(message.ChatID) && !(message.ChatID && $util.isInteger(message.ChatID.low) && $util.isInteger(message.ChatID.high)))
                        return "ChatID: integer|Long expected";
                if (message.UserIDs != null && message.hasOwnProperty("UserIDs")) {
                    if (!Array.isArray(message.UserIDs))
                        return "UserIDs: array expected";
                    for (var i = 0; i < message.UserIDs.length; ++i)
                        if (!$util.isInteger(message.UserIDs[i]) && !(message.UserIDs[i] && $util.isInteger(message.UserIDs[i].low) && $util.isInteger(message.UserIDs[i].high)))
                            return "UserIDs: integer|Long[] expected";
                }
                return null;
            };
    
            /**
             * Creates a ChatAddMemberReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatAddMemberReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatAddMemberReq} ChatAddMemberReq
             */
            ChatAddMemberReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatAddMemberReq)
                    return object;
                var message = new $root.kproto.ChatAddMemberReq();
                if (object.ChatID != null)
                    if ($util.Long)
                        (message.ChatID = $util.Long.fromValue(object.ChatID)).unsigned = false;
                    else if (typeof object.ChatID === "string")
                        message.ChatID = parseInt(object.ChatID, 10);
                    else if (typeof object.ChatID === "number")
                        message.ChatID = object.ChatID;
                    else if (typeof object.ChatID === "object")
                        message.ChatID = new $util.LongBits(object.ChatID.low >>> 0, object.ChatID.high >>> 0).toNumber();
                if (object.UserIDs) {
                    if (!Array.isArray(object.UserIDs))
                        throw TypeError(".kproto.ChatAddMemberReq.UserIDs: array expected");
                    message.UserIDs = [];
                    for (var i = 0; i < object.UserIDs.length; ++i)
                        if ($util.Long)
                            (message.UserIDs[i] = $util.Long.fromValue(object.UserIDs[i])).unsigned = false;
                        else if (typeof object.UserIDs[i] === "string")
                            message.UserIDs[i] = parseInt(object.UserIDs[i], 10);
                        else if (typeof object.UserIDs[i] === "number")
                            message.UserIDs[i] = object.UserIDs[i];
                        else if (typeof object.UserIDs[i] === "object")
                            message.UserIDs[i] = new $util.LongBits(object.UserIDs[i].low >>> 0, object.UserIDs[i].high >>> 0).toNumber();
                }
                return message;
            };
    
            /**
             * Creates a plain object from a ChatAddMemberReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatAddMemberReq
             * @static
             * @param {kproto.ChatAddMemberReq} message ChatAddMemberReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatAddMemberReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.UserIDs = [];
                if (options.defaults)
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ChatID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ChatID = options.longs === String ? "0" : 0;
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (typeof message.ChatID === "number")
                        object.ChatID = options.longs === String ? String(message.ChatID) : message.ChatID;
                    else
                        object.ChatID = options.longs === String ? $util.Long.prototype.toString.call(message.ChatID) : options.longs === Number ? new $util.LongBits(message.ChatID.low >>> 0, message.ChatID.high >>> 0).toNumber() : message.ChatID;
                if (message.UserIDs && message.UserIDs.length) {
                    object.UserIDs = [];
                    for (var j = 0; j < message.UserIDs.length; ++j)
                        if (typeof message.UserIDs[j] === "number")
                            object.UserIDs[j] = options.longs === String ? String(message.UserIDs[j]) : message.UserIDs[j];
                        else
                            object.UserIDs[j] = options.longs === String ? $util.Long.prototype.toString.call(message.UserIDs[j]) : options.longs === Number ? new $util.LongBits(message.UserIDs[j].low >>> 0, message.UserIDs[j].high >>> 0).toNumber() : message.UserIDs[j];
                }
                return object;
            };
    
            /**
             * Converts this ChatAddMemberReq to JSON.
             * @function toJSON
             * @memberof kproto.ChatAddMemberReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatAddMemberReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatAddMemberReq;
        })();
    
        kproto.ChatAddMemberResp = (function() {
    
            /**
             * Properties of a ChatAddMemberResp.
             * @memberof kproto
             * @interface IChatAddMemberResp
             */
    
            /**
             * Constructs a new ChatAddMemberResp.
             * @memberof kproto
             * @classdesc Represents a ChatAddMemberResp.
             * @implements IChatAddMemberResp
             * @constructor
             * @param {kproto.IChatAddMemberResp=} [properties] Properties to set
             */
            function ChatAddMemberResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ChatAddMemberResp instance using the specified properties.
             * @function create
             * @memberof kproto.ChatAddMemberResp
             * @static
             * @param {kproto.IChatAddMemberResp=} [properties] Properties to set
             * @returns {kproto.ChatAddMemberResp} ChatAddMemberResp instance
             */
            ChatAddMemberResp.create = function create(properties) {
                return new ChatAddMemberResp(properties);
            };
    
            /**
             * Encodes the specified ChatAddMemberResp message. Does not implicitly {@link kproto.ChatAddMemberResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatAddMemberResp
             * @static
             * @param {kproto.IChatAddMemberResp} message ChatAddMemberResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatAddMemberResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ChatAddMemberResp message, length delimited. Does not implicitly {@link kproto.ChatAddMemberResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatAddMemberResp
             * @static
             * @param {kproto.IChatAddMemberResp} message ChatAddMemberResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatAddMemberResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatAddMemberResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatAddMemberResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatAddMemberResp} ChatAddMemberResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatAddMemberResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatAddMemberResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatAddMemberResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatAddMemberResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatAddMemberResp} ChatAddMemberResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatAddMemberResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatAddMemberResp message.
             * @function verify
             * @memberof kproto.ChatAddMemberResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatAddMemberResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ChatAddMemberResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatAddMemberResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatAddMemberResp} ChatAddMemberResp
             */
            ChatAddMemberResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatAddMemberResp)
                    return object;
                return new $root.kproto.ChatAddMemberResp();
            };
    
            /**
             * Creates a plain object from a ChatAddMemberResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatAddMemberResp
             * @static
             * @param {kproto.ChatAddMemberResp} message ChatAddMemberResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatAddMemberResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ChatAddMemberResp to JSON.
             * @function toJSON
             * @memberof kproto.ChatAddMemberResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatAddMemberResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatAddMemberResp;
        })();
    
        kproto.ChatSendMessageReq = (function() {
    
            /**
             * Properties of a ChatSendMessageReq.
             * @memberof kproto
             * @interface IChatSendMessageReq
             * @property {number|Long|null} [ChatID] ChatSendMessageReq ChatID
             * @property {number|null} [MessageType] ChatSendMessageReq MessageType
             * @property {string|null} [Message] ChatSendMessageReq Message
             */
    
            /**
             * Constructs a new ChatSendMessageReq.
             * @memberof kproto
             * @classdesc Represents a ChatSendMessageReq.
             * @implements IChatSendMessageReq
             * @constructor
             * @param {kproto.IChatSendMessageReq=} [properties] Properties to set
             */
            function ChatSendMessageReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ChatSendMessageReq ChatID.
             * @member {number|Long} ChatID
             * @memberof kproto.ChatSendMessageReq
             * @instance
             */
            ChatSendMessageReq.prototype.ChatID = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * ChatSendMessageReq MessageType.
             * @member {number} MessageType
             * @memberof kproto.ChatSendMessageReq
             * @instance
             */
            ChatSendMessageReq.prototype.MessageType = 0;
    
            /**
             * ChatSendMessageReq Message.
             * @member {string} Message
             * @memberof kproto.ChatSendMessageReq
             * @instance
             */
            ChatSendMessageReq.prototype.Message = "";
    
            /**
             * Creates a new ChatSendMessageReq instance using the specified properties.
             * @function create
             * @memberof kproto.ChatSendMessageReq
             * @static
             * @param {kproto.IChatSendMessageReq=} [properties] Properties to set
             * @returns {kproto.ChatSendMessageReq} ChatSendMessageReq instance
             */
            ChatSendMessageReq.create = function create(properties) {
                return new ChatSendMessageReq(properties);
            };
    
            /**
             * Encodes the specified ChatSendMessageReq message. Does not implicitly {@link kproto.ChatSendMessageReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatSendMessageReq
             * @static
             * @param {kproto.IChatSendMessageReq} message ChatSendMessageReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatSendMessageReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.ChatID);
                if (message.MessageType != null && message.hasOwnProperty("MessageType"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.MessageType);
                if (message.Message != null && message.hasOwnProperty("Message"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.Message);
                return writer;
            };
    
            /**
             * Encodes the specified ChatSendMessageReq message, length delimited. Does not implicitly {@link kproto.ChatSendMessageReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatSendMessageReq
             * @static
             * @param {kproto.IChatSendMessageReq} message ChatSendMessageReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatSendMessageReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatSendMessageReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatSendMessageReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatSendMessageReq} ChatSendMessageReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatSendMessageReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatSendMessageReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ChatID = reader.int64();
                        break;
                    case 2:
                        message.MessageType = reader.int32();
                        break;
                    case 3:
                        message.Message = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatSendMessageReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatSendMessageReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatSendMessageReq} ChatSendMessageReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatSendMessageReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatSendMessageReq message.
             * @function verify
             * @memberof kproto.ChatSendMessageReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatSendMessageReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (!$util.isInteger(message.ChatID) && !(message.ChatID && $util.isInteger(message.ChatID.low) && $util.isInteger(message.ChatID.high)))
                        return "ChatID: integer|Long expected";
                if (message.MessageType != null && message.hasOwnProperty("MessageType"))
                    if (!$util.isInteger(message.MessageType))
                        return "MessageType: integer expected";
                if (message.Message != null && message.hasOwnProperty("Message"))
                    if (!$util.isString(message.Message))
                        return "Message: string expected";
                return null;
            };
    
            /**
             * Creates a ChatSendMessageReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatSendMessageReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatSendMessageReq} ChatSendMessageReq
             */
            ChatSendMessageReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatSendMessageReq)
                    return object;
                var message = new $root.kproto.ChatSendMessageReq();
                if (object.ChatID != null)
                    if ($util.Long)
                        (message.ChatID = $util.Long.fromValue(object.ChatID)).unsigned = false;
                    else if (typeof object.ChatID === "string")
                        message.ChatID = parseInt(object.ChatID, 10);
                    else if (typeof object.ChatID === "number")
                        message.ChatID = object.ChatID;
                    else if (typeof object.ChatID === "object")
                        message.ChatID = new $util.LongBits(object.ChatID.low >>> 0, object.ChatID.high >>> 0).toNumber();
                if (object.MessageType != null)
                    message.MessageType = object.MessageType | 0;
                if (object.Message != null)
                    message.Message = String(object.Message);
                return message;
            };
    
            /**
             * Creates a plain object from a ChatSendMessageReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatSendMessageReq
             * @static
             * @param {kproto.ChatSendMessageReq} message ChatSendMessageReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatSendMessageReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ChatID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ChatID = options.longs === String ? "0" : 0;
                    object.MessageType = 0;
                    object.Message = "";
                }
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (typeof message.ChatID === "number")
                        object.ChatID = options.longs === String ? String(message.ChatID) : message.ChatID;
                    else
                        object.ChatID = options.longs === String ? $util.Long.prototype.toString.call(message.ChatID) : options.longs === Number ? new $util.LongBits(message.ChatID.low >>> 0, message.ChatID.high >>> 0).toNumber() : message.ChatID;
                if (message.MessageType != null && message.hasOwnProperty("MessageType"))
                    object.MessageType = message.MessageType;
                if (message.Message != null && message.hasOwnProperty("Message"))
                    object.Message = message.Message;
                return object;
            };
    
            /**
             * Converts this ChatSendMessageReq to JSON.
             * @function toJSON
             * @memberof kproto.ChatSendMessageReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatSendMessageReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatSendMessageReq;
        })();
    
        kproto.ChatSendMessageResp = (function() {
    
            /**
             * Properties of a ChatSendMessageResp.
             * @memberof kproto
             * @interface IChatSendMessageResp
             */
    
            /**
             * Constructs a new ChatSendMessageResp.
             * @memberof kproto
             * @classdesc Represents a ChatSendMessageResp.
             * @implements IChatSendMessageResp
             * @constructor
             * @param {kproto.IChatSendMessageResp=} [properties] Properties to set
             */
            function ChatSendMessageResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ChatSendMessageResp instance using the specified properties.
             * @function create
             * @memberof kproto.ChatSendMessageResp
             * @static
             * @param {kproto.IChatSendMessageResp=} [properties] Properties to set
             * @returns {kproto.ChatSendMessageResp} ChatSendMessageResp instance
             */
            ChatSendMessageResp.create = function create(properties) {
                return new ChatSendMessageResp(properties);
            };
    
            /**
             * Encodes the specified ChatSendMessageResp message. Does not implicitly {@link kproto.ChatSendMessageResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatSendMessageResp
             * @static
             * @param {kproto.IChatSendMessageResp} message ChatSendMessageResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatSendMessageResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ChatSendMessageResp message, length delimited. Does not implicitly {@link kproto.ChatSendMessageResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatSendMessageResp
             * @static
             * @param {kproto.IChatSendMessageResp} message ChatSendMessageResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatSendMessageResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatSendMessageResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatSendMessageResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatSendMessageResp} ChatSendMessageResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatSendMessageResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatSendMessageResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatSendMessageResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatSendMessageResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatSendMessageResp} ChatSendMessageResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatSendMessageResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatSendMessageResp message.
             * @function verify
             * @memberof kproto.ChatSendMessageResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatSendMessageResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ChatSendMessageResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatSendMessageResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatSendMessageResp} ChatSendMessageResp
             */
            ChatSendMessageResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatSendMessageResp)
                    return object;
                return new $root.kproto.ChatSendMessageResp();
            };
    
            /**
             * Creates a plain object from a ChatSendMessageResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatSendMessageResp
             * @static
             * @param {kproto.ChatSendMessageResp} message ChatSendMessageResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatSendMessageResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ChatSendMessageResp to JSON.
             * @function toJSON
             * @memberof kproto.ChatSendMessageResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatSendMessageResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatSendMessageResp;
        })();
    
        kproto.ChatSendMediaReq = (function() {
    
            /**
             * Properties of a ChatSendMediaReq.
             * @memberof kproto
             * @interface IChatSendMediaReq
             * @property {number|Long|null} [ChatID] ChatSendMediaReq ChatID
             * @property {number|null} [MessageType] ChatSendMediaReq MessageType
             * @property {Uint8Array|null} [Data] ChatSendMediaReq Data
             */
    
            /**
             * Constructs a new ChatSendMediaReq.
             * @memberof kproto
             * @classdesc Represents a ChatSendMediaReq.
             * @implements IChatSendMediaReq
             * @constructor
             * @param {kproto.IChatSendMediaReq=} [properties] Properties to set
             */
            function ChatSendMediaReq(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * ChatSendMediaReq ChatID.
             * @member {number|Long} ChatID
             * @memberof kproto.ChatSendMediaReq
             * @instance
             */
            ChatSendMediaReq.prototype.ChatID = $util.Long ? $util.Long.fromBits(0,0,false) : 0;
    
            /**
             * ChatSendMediaReq MessageType.
             * @member {number} MessageType
             * @memberof kproto.ChatSendMediaReq
             * @instance
             */
            ChatSendMediaReq.prototype.MessageType = 0;
    
            /**
             * ChatSendMediaReq Data.
             * @member {Uint8Array} Data
             * @memberof kproto.ChatSendMediaReq
             * @instance
             */
            ChatSendMediaReq.prototype.Data = $util.newBuffer([]);
    
            /**
             * Creates a new ChatSendMediaReq instance using the specified properties.
             * @function create
             * @memberof kproto.ChatSendMediaReq
             * @static
             * @param {kproto.IChatSendMediaReq=} [properties] Properties to set
             * @returns {kproto.ChatSendMediaReq} ChatSendMediaReq instance
             */
            ChatSendMediaReq.create = function create(properties) {
                return new ChatSendMediaReq(properties);
            };
    
            /**
             * Encodes the specified ChatSendMediaReq message. Does not implicitly {@link kproto.ChatSendMediaReq.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatSendMediaReq
             * @static
             * @param {kproto.IChatSendMediaReq} message ChatSendMediaReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatSendMediaReq.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.ChatID);
                if (message.MessageType != null && message.hasOwnProperty("MessageType"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.MessageType);
                if (message.Data != null && message.hasOwnProperty("Data"))
                    writer.uint32(/* id 3, wireType 2 =*/26).bytes(message.Data);
                return writer;
            };
    
            /**
             * Encodes the specified ChatSendMediaReq message, length delimited. Does not implicitly {@link kproto.ChatSendMediaReq.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatSendMediaReq
             * @static
             * @param {kproto.IChatSendMediaReq} message ChatSendMediaReq message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatSendMediaReq.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatSendMediaReq message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatSendMediaReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatSendMediaReq} ChatSendMediaReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatSendMediaReq.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatSendMediaReq();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.ChatID = reader.int64();
                        break;
                    case 2:
                        message.MessageType = reader.int32();
                        break;
                    case 3:
                        message.Data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatSendMediaReq message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatSendMediaReq
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatSendMediaReq} ChatSendMediaReq
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatSendMediaReq.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatSendMediaReq message.
             * @function verify
             * @memberof kproto.ChatSendMediaReq
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatSendMediaReq.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (!$util.isInteger(message.ChatID) && !(message.ChatID && $util.isInteger(message.ChatID.low) && $util.isInteger(message.ChatID.high)))
                        return "ChatID: integer|Long expected";
                if (message.MessageType != null && message.hasOwnProperty("MessageType"))
                    if (!$util.isInteger(message.MessageType))
                        return "MessageType: integer expected";
                if (message.Data != null && message.hasOwnProperty("Data"))
                    if (!(message.Data && typeof message.Data.length === "number" || $util.isString(message.Data)))
                        return "Data: buffer expected";
                return null;
            };
    
            /**
             * Creates a ChatSendMediaReq message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatSendMediaReq
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatSendMediaReq} ChatSendMediaReq
             */
            ChatSendMediaReq.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatSendMediaReq)
                    return object;
                var message = new $root.kproto.ChatSendMediaReq();
                if (object.ChatID != null)
                    if ($util.Long)
                        (message.ChatID = $util.Long.fromValue(object.ChatID)).unsigned = false;
                    else if (typeof object.ChatID === "string")
                        message.ChatID = parseInt(object.ChatID, 10);
                    else if (typeof object.ChatID === "number")
                        message.ChatID = object.ChatID;
                    else if (typeof object.ChatID === "object")
                        message.ChatID = new $util.LongBits(object.ChatID.low >>> 0, object.ChatID.high >>> 0).toNumber();
                if (object.MessageType != null)
                    message.MessageType = object.MessageType | 0;
                if (object.Data != null)
                    if (typeof object.Data === "string")
                        $util.base64.decode(object.Data, message.Data = $util.newBuffer($util.base64.length(object.Data)), 0);
                    else if (object.Data.length)
                        message.Data = object.Data;
                return message;
            };
    
            /**
             * Creates a plain object from a ChatSendMediaReq message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatSendMediaReq
             * @static
             * @param {kproto.ChatSendMediaReq} message ChatSendMediaReq
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatSendMediaReq.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.ChatID = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.ChatID = options.longs === String ? "0" : 0;
                    object.MessageType = 0;
                    if (options.bytes === String)
                        object.Data = "";
                    else {
                        object.Data = [];
                        if (options.bytes !== Array)
                            object.Data = $util.newBuffer(object.Data);
                    }
                }
                if (message.ChatID != null && message.hasOwnProperty("ChatID"))
                    if (typeof message.ChatID === "number")
                        object.ChatID = options.longs === String ? String(message.ChatID) : message.ChatID;
                    else
                        object.ChatID = options.longs === String ? $util.Long.prototype.toString.call(message.ChatID) : options.longs === Number ? new $util.LongBits(message.ChatID.low >>> 0, message.ChatID.high >>> 0).toNumber() : message.ChatID;
                if (message.MessageType != null && message.hasOwnProperty("MessageType"))
                    object.MessageType = message.MessageType;
                if (message.Data != null && message.hasOwnProperty("Data"))
                    object.Data = options.bytes === String ? $util.base64.encode(message.Data, 0, message.Data.length) : options.bytes === Array ? Array.prototype.slice.call(message.Data) : message.Data;
                return object;
            };
    
            /**
             * Converts this ChatSendMediaReq to JSON.
             * @function toJSON
             * @memberof kproto.ChatSendMediaReq
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatSendMediaReq.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatSendMediaReq;
        })();
    
        kproto.ChatSendMediaResp = (function() {
    
            /**
             * Properties of a ChatSendMediaResp.
             * @memberof kproto
             * @interface IChatSendMediaResp
             */
    
            /**
             * Constructs a new ChatSendMediaResp.
             * @memberof kproto
             * @classdesc Represents a ChatSendMediaResp.
             * @implements IChatSendMediaResp
             * @constructor
             * @param {kproto.IChatSendMediaResp=} [properties] Properties to set
             */
            function ChatSendMediaResp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new ChatSendMediaResp instance using the specified properties.
             * @function create
             * @memberof kproto.ChatSendMediaResp
             * @static
             * @param {kproto.IChatSendMediaResp=} [properties] Properties to set
             * @returns {kproto.ChatSendMediaResp} ChatSendMediaResp instance
             */
            ChatSendMediaResp.create = function create(properties) {
                return new ChatSendMediaResp(properties);
            };
    
            /**
             * Encodes the specified ChatSendMediaResp message. Does not implicitly {@link kproto.ChatSendMediaResp.verify|verify} messages.
             * @function encode
             * @memberof kproto.ChatSendMediaResp
             * @static
             * @param {kproto.IChatSendMediaResp} message ChatSendMediaResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatSendMediaResp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified ChatSendMediaResp message, length delimited. Does not implicitly {@link kproto.ChatSendMediaResp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.ChatSendMediaResp
             * @static
             * @param {kproto.IChatSendMediaResp} message ChatSendMediaResp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ChatSendMediaResp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a ChatSendMediaResp message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.ChatSendMediaResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.ChatSendMediaResp} ChatSendMediaResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatSendMediaResp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.ChatSendMediaResp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a ChatSendMediaResp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.ChatSendMediaResp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.ChatSendMediaResp} ChatSendMediaResp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ChatSendMediaResp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a ChatSendMediaResp message.
             * @function verify
             * @memberof kproto.ChatSendMediaResp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ChatSendMediaResp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a ChatSendMediaResp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.ChatSendMediaResp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.ChatSendMediaResp} ChatSendMediaResp
             */
            ChatSendMediaResp.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.ChatSendMediaResp)
                    return object;
                return new $root.kproto.ChatSendMediaResp();
            };
    
            /**
             * Creates a plain object from a ChatSendMediaResp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.ChatSendMediaResp
             * @static
             * @param {kproto.ChatSendMediaResp} message ChatSendMediaResp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ChatSendMediaResp.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this ChatSendMediaResp to JSON.
             * @function toJSON
             * @memberof kproto.ChatSendMediaResp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ChatSendMediaResp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return ChatSendMediaResp;
        })();
    
        kproto.SyncAck = (function() {
    
            /**
             * Properties of a SyncAck.
             * @memberof kproto
             * @interface ISyncAck
             */
    
            /**
             * Constructs a new SyncAck.
             * @memberof kproto
             * @classdesc Represents a SyncAck.
             * @implements ISyncAck
             * @constructor
             * @param {kproto.ISyncAck=} [properties] Properties to set
             */
            function SyncAck(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new SyncAck instance using the specified properties.
             * @function create
             * @memberof kproto.SyncAck
             * @static
             * @param {kproto.ISyncAck=} [properties] Properties to set
             * @returns {kproto.SyncAck} SyncAck instance
             */
            SyncAck.create = function create(properties) {
                return new SyncAck(properties);
            };
    
            /**
             * Encodes the specified SyncAck message. Does not implicitly {@link kproto.SyncAck.verify|verify} messages.
             * @function encode
             * @memberof kproto.SyncAck
             * @static
             * @param {kproto.ISyncAck} message SyncAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SyncAck.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified SyncAck message, length delimited. Does not implicitly {@link kproto.SyncAck.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.SyncAck
             * @static
             * @param {kproto.ISyncAck} message SyncAck message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SyncAck.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SyncAck message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.SyncAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.SyncAck} SyncAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SyncAck.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.SyncAck();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SyncAck message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.SyncAck
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.SyncAck} SyncAck
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SyncAck.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SyncAck message.
             * @function verify
             * @memberof kproto.SyncAck
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SyncAck.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a SyncAck message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.SyncAck
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.SyncAck} SyncAck
             */
            SyncAck.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.SyncAck)
                    return object;
                return new $root.kproto.SyncAck();
            };
    
            /**
             * Creates a plain object from a SyncAck message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.SyncAck
             * @static
             * @param {kproto.SyncAck} message SyncAck
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SyncAck.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this SyncAck to JSON.
             * @function toJSON
             * @memberof kproto.SyncAck
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SyncAck.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SyncAck;
        })();
    
        kproto.SyncChatSendMessage = (function() {
    
            /**
             * Properties of a SyncChatSendMessage.
             * @memberof kproto
             * @interface ISyncChatSendMessage
             */
    
            /**
             * Constructs a new SyncChatSendMessage.
             * @memberof kproto
             * @classdesc Represents a SyncChatSendMessage.
             * @implements ISyncChatSendMessage
             * @constructor
             * @param {kproto.ISyncChatSendMessage=} [properties] Properties to set
             */
            function SyncChatSendMessage(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }
    
            /**
             * Creates a new SyncChatSendMessage instance using the specified properties.
             * @function create
             * @memberof kproto.SyncChatSendMessage
             * @static
             * @param {kproto.ISyncChatSendMessage=} [properties] Properties to set
             * @returns {kproto.SyncChatSendMessage} SyncChatSendMessage instance
             */
            SyncChatSendMessage.create = function create(properties) {
                return new SyncChatSendMessage(properties);
            };
    
            /**
             * Encodes the specified SyncChatSendMessage message. Does not implicitly {@link kproto.SyncChatSendMessage.verify|verify} messages.
             * @function encode
             * @memberof kproto.SyncChatSendMessage
             * @static
             * @param {kproto.ISyncChatSendMessage} message SyncChatSendMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SyncChatSendMessage.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                return writer;
            };
    
            /**
             * Encodes the specified SyncChatSendMessage message, length delimited. Does not implicitly {@link kproto.SyncChatSendMessage.verify|verify} messages.
             * @function encodeDelimited
             * @memberof kproto.SyncChatSendMessage
             * @static
             * @param {kproto.ISyncChatSendMessage} message SyncChatSendMessage message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            SyncChatSendMessage.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };
    
            /**
             * Decodes a SyncChatSendMessage message from the specified reader or buffer.
             * @function decode
             * @memberof kproto.SyncChatSendMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {kproto.SyncChatSendMessage} SyncChatSendMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SyncChatSendMessage.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.kproto.SyncChatSendMessage();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };
    
            /**
             * Decodes a SyncChatSendMessage message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof kproto.SyncChatSendMessage
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {kproto.SyncChatSendMessage} SyncChatSendMessage
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            SyncChatSendMessage.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };
    
            /**
             * Verifies a SyncChatSendMessage message.
             * @function verify
             * @memberof kproto.SyncChatSendMessage
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            SyncChatSendMessage.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                return null;
            };
    
            /**
             * Creates a SyncChatSendMessage message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof kproto.SyncChatSendMessage
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {kproto.SyncChatSendMessage} SyncChatSendMessage
             */
            SyncChatSendMessage.fromObject = function fromObject(object) {
                if (object instanceof $root.kproto.SyncChatSendMessage)
                    return object;
                return new $root.kproto.SyncChatSendMessage();
            };
    
            /**
             * Creates a plain object from a SyncChatSendMessage message. Also converts values to other types if specified.
             * @function toObject
             * @memberof kproto.SyncChatSendMessage
             * @static
             * @param {kproto.SyncChatSendMessage} message SyncChatSendMessage
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            SyncChatSendMessage.toObject = function toObject() {
                return {};
            };
    
            /**
             * Converts this SyncChatSendMessage to JSON.
             * @function toJSON
             * @memberof kproto.SyncChatSendMessage
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            SyncChatSendMessage.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };
    
            return SyncChatSendMessage;
        })();
    
        return kproto;
    })();

    return $root;
});
