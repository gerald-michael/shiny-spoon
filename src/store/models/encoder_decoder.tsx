export interface Algorithm {
    id: string,
    title: string,
    key: any,
}
export interface IEncoderDecoder {
    loading: boolean,
    algorithms: Algorithm[],
    chain: Algorithm[],
    success: string | null,
    error: string | null,
}
export interface IEncoderDecoderAction {
    type: string,
    error: string | null,
    title: string | null,
    id: string | null,
    key: any,
    success: string | null,
}