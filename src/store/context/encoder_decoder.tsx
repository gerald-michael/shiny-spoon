import { createContext, useReducer } from "react"
import reducer, { initialState } from "../reducers/encoder_decoder"
import * as actionType from '../actionTypes/encoder_decoder'
import { IEncoderDecoder, IEncoderDecoderAction, Algorithm } from "../models/encoder_decoder"

export const EncoderDecoderContext = createContext<IEncoderDecoder | any>(initialState);
interface IResult {
    error: string,
    success: string
}
const EncoderDecoderProvider = (props: any): JSX.Element => {
    const [encoder_decoder, encoderDecoderDispatch] = useReducer(reducer, initialState)
    const deleteItem = (id: string): IEncoderDecoderAction => {
        return {
            type: actionType.ENCODER_DECODER_DELETE,
            error: null,
            title: null,
            id,
            key: null,
            success: null
        }
    }
    const add = (title: string): IEncoderDecoderAction => {
        return {
            type: actionType.ENCODER_DECODER_ADD,
            error: null,
            title,
            id: null,
            key: null,
            success: null
        }
    }
    const modify = (key: any, id: string): IEncoderDecoderAction => {
        return {
            type: actionType.ENCODER_DECODER_KEY_MODIFY,
            error: null,
            title: null,
            id,
            key,
            success: null
        }
    }
    const crunchStart = (): IEncoderDecoderAction => {
        return {
            type: actionType.ENCODER_DECODER_CRUNCH_START,
            error: null,
            title: null,
            id: null,
            key: null,
            success: null
        }
    }
    const crunchError = (error: string): IEncoderDecoderAction => {
        return {
            type: actionType.ENCODER_DECODER_CRUNCH_ERROR,
            error,
            title: null,
            id: null,
            key: null,
            success: null
        }
    }
    const crunchSuccess = (success: string): IEncoderDecoderAction => {
        return {
            type: actionType.ENCODER_DECODER_CRUNCH_SUCCESS,
            error: null,
            title: null,
            id: null,
            key: null,
            success
        }
    }
    const encodeOrDecode = (data: string, algorithm: Algorithm): IResult => {
        if (algorithm.title === "Brain Fuck Encode") {
            return { error: "", success: window.api.shiny_spoon.brainfuck_encode(data) }
        } else if (algorithm.title === "Brain fuck Decode") {
            return { error: "", success: window.api.shiny_spoon.brainfuck_decode(data) }
        } else if (algorithm.title === "Atbash Encode") {
            return { error: "", success: window.api.shiny_spoon.at_bash_encode(data) }
        } else if (algorithm.title === "Atbash Decode") {
            return { error: "", success: window.api.shiny_spoon.at_bash_decode(data) }
        } else if (algorithm.title === "Polybius Square Encode") {
            return { error: "", success: window.api.shiny_spoon.polybius_square_encode(data) }
        } else if (algorithm.title === "Polybius Square Decode") {
            let result = window.api.shiny_spoon.polybius_square_decode(data)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }

        } else if (algorithm.title === "Caesar Encode") {
            if (!algorithm.key) {
                return { error: "Rotation required", success: "" }
            }
            let result = window.api.shiny_spoon.caesar_encode(data, algorithm.key)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Caesar Decode") {
            if (!algorithm.key) {
                return { error: "Rotation required", success: "" }
            }
            let result = window.api.shiny_spoon.caesar_decode(data, algorithm.key)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Scytale Encode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            let result = window.api.shiny_spoon.scytale_encode(data, algorithm.key)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Scytale Decode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            let result = window.api.shiny_spoon.scytale_decode(data, algorithm.key)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Vigenere Encode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            return { error: "", success: window.api.shiny_spoon.vigenere_encode(data, algorithm.key) }
        } else if (algorithm.title === "Vigenere Decode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            return { error: "", success: window.api.shiny_spoon.vigenere_decode(data, algorithm.key) }
        } else if (algorithm.title === "XOR Encode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            return { error: "", success: window.api.shiny_spoon.x_or_encode(data, algorithm.key) }
        } else if (algorithm.title === "XOR Decode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            return { error: "", success: window.api.shiny_spoon.x_or_decode(data, algorithm.key) }
        } else if (algorithm.title === "Rot Encode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            if (algorithm.key === 5) {
                return { error: "", success: window.api.shiny_spoon.rot_encode(data, 5) }
            } else if (algorithm.key === 13) {
                return { error: "", success: window.api.shiny_spoon.rot_encode(data, 13) }

            } else if (algorithm.key === 18) {
                return { error: "", success: window.api.shiny_spoon.rot_encode(data, 18) }
            } else if (algorithm.key === 47) {
                return { error: "", success: window.api.shiny_spoon.rot_encode(data, 47) }
            } else {
                return { error: "Alphabet Required", success: "" }
            }
        } else if (algorithm.title === "Rot Decode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            if (algorithm.key === 5) {
                return { error: "", success: window.api.shiny_spoon.rot_decode(data, 5) }
            } else if (algorithm.key === 13) {
                return { error: "", success: window.api.shiny_spoon.rot_decode(data, 13) }

            } else if (algorithm.key === 18) {
                return { error: "", success: window.api.shiny_spoon.rot_decode(data, 18) }
            } else if (algorithm.key === 47) {
                return { error: "", success: window.api.shiny_spoon.rot_decode(data, 47) }
            } else {
                return { error: "Alphabet Required", success: "" }
            }
        } else if (algorithm.title === "Bacon Encode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            let result = window.api.shiny_spoon.bacon_encode(data, algorithm.key)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Bacon Decode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            let result = window.api.shiny_spoon.bacon_decode(data, algorithm.key)
            if ('data' in result) {
                return { error: "", success: result.data.toLowerCase() }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Affine Encode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            let result = window.api.shiny_spoon.affine_encode(data, algorithm.key[0], algorithm.key[1])
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Affine Decode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            let result = window.api.shiny_spoon.affine_decode(data, algorithm.key[0], algorithm.key[1])
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Base64 Encode") {
            return { error: "", success: window.api.shiny_spoon.base64_encode(data) }
        } else if (algorithm.title === "Base64 Decode") {
            let result = window.api.shiny_spoon.base64_decode(data)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Base58 Encode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            if (algorithm.key === "flicker") {
                return { error: "", success: window.api.shiny_spoon.base58_encode(data, 4) }
            } else if (algorithm.key === "ripple") {
                return { error: "", success: window.api.shiny_spoon.base58_encode(data, 3) }

            } else if (algorithm.key === "monero") {
                return { error: "", success: window.api.shiny_spoon.base58_encode(data, 2) }
            } else if (algorithm.key === 'bitcoin') {
                return { error: "", success: window.api.shiny_spoon.base58_encode(data, 1) }
            } else if (algorithm.key === "default") {
                return { error: "", success: window.api.shiny_spoon.base58_encode(data, 47) }
            } else {
                return { error: "Alphabet Required", success: "" }
            }
        } else if (algorithm.title === "Base58 Decode") {
            if (!algorithm.key) {
                return { error: "Key required", success: "" }
            }
            if (algorithm.key === "flicker") {
                let result = window.api.shiny_spoon.base58_decode(data, 4)
                if ('error' in result) {
                    return { error: result.error, success: "" }
                }
                return { error: "", success: result.data }
            } else if (algorithm.key === "ripple") {
                let result = window.api.shiny_spoon.base58_decode(data, 3)
                if ('error' in result) {
                    return { error: result.error, success: "" }
                }
                return { error: "", success: result.data }
            } else if (algorithm.key === "monero") {
                let result = window.api.shiny_spoon.base58_decode(data, 2)
                if ('error' in result) {
                    return { error: result.error, success: "" }
                }
                return { error: "", success: result.data }
            } else if (algorithm.key === 'bitcoin') {
                let result = window.api.shiny_spoon.base58_decode(data, 1)
                if ('error' in result) {
                    return { error: result.error, success: "" }
                }
                return { error: "", success: result.data }
            } else if (algorithm.key === "default") {
                let result = window.api.shiny_spoon.base58_decode(data, 47)
                if ('error' in result) {
                    return { error: result.error, success: "" }
                }
                return { error: "", success: result.data }
            } else {
                return { error: "Alphabet Required", success: "" }
            }
        } else if (algorithm.title === "Base32 Encode") {
            return { error: "", success: window.api.shiny_spoon.base32_encode(data) }
        } else if (algorithm.title === "Base32 Decode") {
            let result = window.api.shiny_spoon.base32decode(data)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Hex Encode") {
            return { error: "", success: window.api.shiny_spoon.hex_encode(data) }
        } else if (algorithm.title === "Hex Decode") {
            let result = window.api.shiny_spoon.hex_decode(data)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Ascii85 Encode") {
            return { error: "", success: window.api.shiny_spoon.ascii85_encode(data) }
        } else if (algorithm.title === "Ascii85 Decode") {
            let result = window.api.shiny_spoon.ascii85_decode(data)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Dec Encode") {
            return { error: "", success: window.api.shiny_spoon.dec_encode(data).trim() }
        } else if (algorithm.title === "Dec Decode") {
            let result = window.api.shiny_spoon.dec_decode(data.split(" ").map(element => parseInt(element)))
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Bubble Babble Encode") {
            return { error: "", success: window.api.shiny_spoon.bubble_babble_encode(data) }
        } else if (algorithm.title === "Bubble Babble Decode") {
            let result = window.api.shiny_spoon.bubble_babble_decode(data)
            if ('data' in result) {
                return { error: "", success: result.data }
            }
            return { error: result.error, success: "" }
        } else if (algorithm.title === "Sha1 Hash") {
            return { error: "", success: window.api.shiny_spoon.sha1_hash(data) }
        } else if (algorithm.title === "Sha256 Hash") {
            return { error: "", success: window.api.shiny_spoon.sha256_hash(data) }
        } else if (algorithm.title === "Sha512 Hash") {
            return { error: "", success: window.api.shiny_spoon.sha512_hash(data) }
        } else if (algorithm.title === "Sha384 Hash") {
            return { error: "", success: window.api.shiny_spoon.sha384_hash(data) }
        } else if (algorithm.title === "Md5 Hash") {
            if (algorithm.key) {
                return { error: "", success: window.api.shiny_spoon.md5_linux_hash(data, algorithm.key) }
            }
            return { error: "Salt Required for md5", success: "" }
        } else if (algorithm.title === "Whirlpool Hash") {
            return { error: "", success: window.api.shiny_spoon.whirlpool_hash(data) }
        } else if (algorithm.title === "Sha3 224 Hash") {
            return { error: "", success: window.api.shiny_spoon.sha3_224_hash(data) }
        } else if (algorithm.title === "Sha3 256 Hash") {
            return { error: "", success: window.api.shiny_spoon.sha3_256_hash(data) }
        } else if (algorithm.title === "Sha3 512 Hash") {
            return { error: "", success: window.api.shiny_spoon.sha3_512_hash(data) }
        } else if (algorithm.title === "Sha3 384 Hash") {
            return { error: "", success: window.api.shiny_spoon.sha3_384_hash(data) }
        } else if (algorithm.title === "Keccak224 Hash") {
            return { error: "", success: window.api.shiny_spoon.keccak224_hash(data) }
        } else if (algorithm.title === "Keccak256 Hash") {
            return { error: "", success: window.api.shiny_spoon.keccak256_hash(data) }
        } else if (algorithm.title === "Keccak384 Hash") {
            return { error: "", success: window.api.shiny_spoon.keccak384_hash(data) }
        } else if (algorithm.title === "Keccak512 Hash") {
            return { error: "", success: window.api.shiny_spoon.keccak512_hash(data) }
        }
        else {
            return { error: "Wrong Algorithm Selected", success: "" }
        }
    }
    const crunch = (data: string, chain: Algorithm[]) => {
        encoderDecoderDispatch(crunchStart())
        let result: string = data;
        for (let i = 0; i < chain.length; i++) {
            let decode_encode = encodeOrDecode(result, chain[i])
            if (decode_encode.success.length > 0) {
                result = decode_encode.success
            } else {
                return encoderDecoderDispatch(crunchError(decode_encode.error))
            }
        }
        return encoderDecoderDispatch(crunchSuccess(result))
    }
    const modifyKeyChain = (key: any, id: string) => {
        encoderDecoderDispatch(modify(key, id))
    }
    const addToChain = (item: string) => {
        encoderDecoderDispatch(add(item))
    }
    const deleteFromChain = (id: string) => {
        encoderDecoderDispatch(deleteItem(id))
    }
    return (
        <EncoderDecoderContext.Provider value={{ encoder_decoder, addToChain, deleteFromChain, modifyKeyChain, crunch }}>
            {props.children}
        </EncoderDecoderContext.Provider>
    );
}
export default EncoderDecoderProvider