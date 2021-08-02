import { Paper, Typography, TextField, Button, IconButton, Grid, Box, Rating, List, ListItem, ListItemText } from "@material-ui/core"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import RemoveIcon from '@material-ui/icons/Remove';

declare global {
    interface Window {
        api: any;
    }
}
interface IEstimate {
    guesses: number;
    offline_fast_hashing_1e10_per_second: string;
    offline_slow_hashing_1e4_per_second: string;
    online_no_throttling_10_per_second: string;
    online_throttling_100_per_hour: string;
    strength: number;
    suggestions: any;
    warning: string;
}
export default function PasswordAnalysis() {
    let [estimate, setEstimate] = useState<IEstimate | undefined>(undefined)
    let [password, setPassword] = useState("")
    let [inputFields, setInputFields] = useState([
        { id: uuidv4(), value: '' },
    ]);
    const handleAddFields = () => {
        if (inputFields.length < 5) {
            setInputFields([...inputFields, { id: uuidv4(), value: '' }])
        }
    }
    const handleRemoveFields = (id: string) => {
        const values = [...inputFields];
        values.splice(values.findIndex(value => value.id === id), 1);
        setInputFields(values);
    }
    const handleInputChange = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        const newInputFields = inputFields.map(i => {
            if (id === i.id) {
                i["value"] = event.target.value
            }
            return i;
        })
        setInputFields(newInputFields)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        setPassword(event.target.value)
    }
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const values = inputFields.map(i => {
            return i.value
        })
        const result = window.api.shiny_spoon.password_strength_estimator(password, values)
        setEstimate(result)
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Paper>
                        <form onSubmit={handleSubmit}>
                            <Typography>
                                Password analysis
                            </Typography>
                            <TextField id="password" type="password" label="password" variant="outlined" value={password} required onChange={handleChange} />
                            <Typography>
                                Additional infomation, eg DOB, name, username
                            </Typography>
                            {inputFields.map(inputField => (
                                <div key={inputField.id}>
                                    <TextField id={inputField.id} label="Value" value={inputField.value} variant="outlined" required onChange={event => handleInputChange(inputField.id, event)} />
                                    <IconButton onClick={() => handleRemoveFields(inputField.id)}><RemoveIcon /></IconButton>
                                </div>
                            ))}
                            <Button variant="contained" onClick={handleAddFields}>
                                Add
                            </Button>
                            <Button variant="contained" type="submit">
                                Compute
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    {estimate && (
                        <Paper>

                            <Typography variant="h6">Strength</Typography> <Rating value={estimate.strength} precision={0.5} max={4} readOnly />
                            <Typography variant="h6">Guesses </Typography><Typography>{estimate.guesses}</Typography>
                            <Typography variant="h6">Warning</Typography><Typography>{estimate.warning}</Typography>
                            <Typography variant="h6">Online throttling 100 per hour</Typography><Typography>{estimate.online_throttling_100_per_hour}</Typography>
                            <Typography variant="h6">Online no throttling 10 per second</Typography><Typography>{estimate.online_no_throttling_10_per_second}</Typography>
                            <Typography variant="h6">Offline slow hashing 1e4 per second</Typography><Typography>{estimate.offline_slow_hashing_1e4_per_second}</Typography>
                            <Typography variant="h6">Offline fast hashing 1e10 per second</Typography><Typography>{estimate.offline_fast_hashing_1e10_per_second}</Typography>
                            <Typography variant="h6">Suggestions</Typography>
                            <List dense={false}>
                                {estimate.suggestions && estimate.suggestions.map((suggestion: string) => (
                                    <ListItem>
                                        <ListItemText
                                            primary={suggestion}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>

    )
}
