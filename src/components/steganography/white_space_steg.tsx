import { Button, Grid, TextField } from "@material-ui/core"
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ChangeEvent, useState } from "react";
export default function WhiteSpaceSteg() {
    let [inputState, setInputState] = useState({
        output: "",
        payload: "",
        carier: ""
    })
    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        if (event.target.id === "output") {
            setInputState({ ...inputState, output: event.target.value })
        }
        if (event.target.id === "payload") {
            setInputState({ ...inputState, payload: event.target.value })
        }
        if (event.target.id === "carier") {
            setInputState({ ...inputState, carier: event.target.value })
        }
    }
    const handleDecode = () => {
        if (inputState.output.length !== 0) {
            let result = window.api.shiny_spoon.white_space_steg_reveal(inputState.output)
            setInputState({ ...inputState, payload: result })
        }
    }
    const handleEncode = () => {
        if (inputState.carier.length === 0 || inputState.payload.length === 0) {

        } else if (inputState.carier.length < inputState.payload.length) {

        } else {
            let result = window.api.shiny_spoon.white_space_steg_hide(inputState.payload, inputState.carier)
            setInputState({ ...inputState, output: result })
        }
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
                <TextField
                    id="carier"
                    label="Carier"
                    multiline
                    minRows={4}
                    value={inputState.carier}
                    onChange={handleChange}
                />
                <TextField
                    id="payload"
                    label="Payload"
                    multiline
                    minRows={4}
                    value={inputState.payload}
                    onChange={handleChange}
                />
            </Grid>
            <Grid item xs={12} md={2}>
                <Button endIcon={<ChevronRightIcon />} onClick={handleEncode}>Encode</Button>
                <Button startIcon={<ChevronLeftIcon />} onClick={handleDecode}>Decode</Button>
            </Grid>
            <Grid item xs={12} md={5}>
                <TextField
                    id="output"
                    label="Output"
                    multiline
                    minRows={4}
                    value={inputState.output}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    )
}
