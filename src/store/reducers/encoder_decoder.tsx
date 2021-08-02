import { updateObject } from '../utility'
import * as actionType from '../actionTypes/encoder_decoder'
import { IEncoderDecoder, IEncoderDecoderAction } from "../models/encoder_decoder"
import { v4 as uuidv4 } from "uuid"
export const initialState: IEncoderDecoder = {
    loading: false,
    success: null,
    algorithms: [
        {
            id: uuidv4(),
            title: "Brain Fuck Encode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Brain fuck Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Atbash Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Atbash Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Polybius Square Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Polybius Square Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Caesar Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Caesar Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Scytale Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Scytale Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Vigenere Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Vigenere Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "XOR Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "XOR Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Rot Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Rot Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Bacon Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Bacon Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Affine Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Affine Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Base64 Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Base64 Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Base58 Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Base58 Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Base32 Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Base32 Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Hex Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Hex Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Ascii85 Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Ascii85 Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Dec Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Dec Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Bubble Babble Encode",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Bubble Babble Decode",
            key: null,
        }, {
            id: uuidv4(),
            title: "Sha1 Hash",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Sha256 Hash",
            key: null,
        }, {
            id: uuidv4(),
            title: "Sha512 Hash",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Sha384 Hash",
            key: null,
        }, {
            id: uuidv4(),
            title: "Md5 Hash",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Whirlpool Hash",
            key: null,
        }, {
            id: uuidv4(),
            title: "Sha3 224 Hash",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Sha3 256 Hash",
            key: null,
        }, {
            id: uuidv4(),
            title: "Sha3 512 Hash",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Sha3 384 Hash",
            key: null,
        }, {
            id: uuidv4(),
            title: "Keccak224 Hash",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Keccak256 Hash",
            key: null,
        }, {
            id: uuidv4(),
            title: "Keccak384 Hash",
            key: null,
        },
        {
            id: uuidv4(),
            title: "Keccak512 Hash",
            key: null,
        }
    ],
    chain: [],
    error: null,
}
const encoderDecoderCrunchStart = (state: IEncoderDecoder, action: IEncoderDecoderAction): IEncoderDecoder => {
    return updateObject(state, { loading: true })
}
const encoderDecoderCrunchSuccess = (state: IEncoderDecoder, action: IEncoderDecoderAction): IEncoderDecoder => {
    return updateObject(state, { success: action.success, loading: false, error: null })
}
const encoderDecoderCrunchError = (state: IEncoderDecoder, action: IEncoderDecoderAction): IEncoderDecoder => {
    return updateObject(state, { error: action.error, loading: false, success: null })
}

const encoderDecodeDelete = (state: IEncoderDecoder, action: IEncoderDecoderAction): IEncoderDecoder => {
    return updateObject(
        state,
        {
            loading: false,
            chain: state.chain.filter((item, i) => item.id !== action.id)
        }
    );
}
const encoderDecodeAdd = (state: IEncoderDecoder, action: IEncoderDecoderAction): IEncoderDecoder => {
    return updateObject(
        state,
        {
            loading: false,
            chain: [
                ...state.chain,
                {
                    id: uuidv4(),
                    title: action.title,
                    key: null
                }
            ]
        }
    );
}
const encoderDecodeKeyModify = (state: IEncoderDecoder, action: IEncoderDecoderAction) => {
    let new_element = state.chain.filter((item, id) => item.id === action.id)[0]
    new_element.key = action.key
    return updateObject(
        state,
        {
            chain: [...state.chain.filter((item, id) => item.id !== action.id), new_element],
        }
    );
}
const reducer = (state: IEncoderDecoder, action: IEncoderDecoderAction): IEncoderDecoder => {
    switch (action.type) {
        case actionType.ENCODER_DECODER_DELETE:
            return encoderDecodeDelete(state, action)
        case actionType.ENCODER_DECODER_ADD:
            return encoderDecodeAdd(state, action)
        case actionType.ENCODER_DECODER_KEY_MODIFY:
            return encoderDecodeKeyModify(state, action)
        case actionType.ENCODER_DECODER_CRUNCH_START:
            return encoderDecoderCrunchStart(state, action)
        case actionType.ENCODER_DECODER_CRUNCH_SUCCESS:
            return encoderDecoderCrunchSuccess(state, action)
        case actionType.ENCODER_DECODER_CRUNCH_ERROR:
            return encoderDecoderCrunchError(state, action)
        default:
            return state
    }
}

export default reducer;