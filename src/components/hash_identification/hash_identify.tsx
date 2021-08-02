import { ChangeEvent } from 'react'
import { Paper, Typography, TextField, Button, Box, List, ListItem, ListItemText } from "@material-ui/core"
import { useState } from 'react'
export default function HashIdentify() {
    const [hash, setHash] = useState<string>("")
    const [guesses, setGuesses] = useState<string[] | null>(null)
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHash(event.target.value)
    }
    const handleOnclick = () => {
        if (hash.length > 0) {
            let result = window.api.shiny_spoon.identify(hash)
            setGuesses(result)
        }
    }
    console.log(guesses)
    return (
        <Paper sx={{ minHeight: "85vh", padding: 2 }}>
            <Typography variant="h5">Hash Identify</Typography>
            <Box sx={{ marginY: 2 }}>
                <TextField id="hash" label="Hash" variant="outlined" required sx={{ marginRight: 2 }} value={hash} onChange={handleChange} />
                <Button variant="contained" sx={{ marginTop: 1.5 }} onClick={handleOnclick}>Analyze</Button>
            </Box>

            <List dense={false}>
                {guesses && guesses.map((guess: string) => {
                    return (<ListItem>
                        <ListItemText
                            primary={guess}
                        />
                    </ListItem>)
                })}
            </List>
        </Paper>
    )
}
