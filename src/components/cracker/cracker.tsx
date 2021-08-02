import { Autocomplete, Button, TextField, Typography, Paper, Box } from "@material-ui/core"
import { ChangeEvent, SyntheticEvent } from "react";
import { useState, useRef, useEffect } from "react";
import { useStopwatch } from 'react-timer-hook';
function useInterval(callback: () => void, delay: number | null) {
    const savedCallback = useRef(callback)

    // Remember the latest callback if it changes.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        // Don't schedule if no delay is specified.
        if (delay === null) {
            return
        }

        const id = setInterval(() => savedCallback.current(), delay)

        return () => clearInterval(id)
    }, [delay])
}

export default function Cracker() {
    const [filePath, setFilePath] = useState("")
    const [hash, setHash] = useState("")
    const [threads, setThreads] = useState("")
    const [algorithm, setAlgorithm] = useState<string | null>(null)
    const [error, setError] = useState<string>("None")
    const [result, setResult] = useState<string | null>(null)
    const [isCracking, setIsCracking] = useState(false)
    const {
        seconds,
        minutes,
        hours,
        days,
        start,
        pause,
    } = useStopwatch({ autoStart: false });
    const handleOnClick = () => {
        let result = window.api.sendSync("getFile", [{ name: 'Text', extensions: ['txt'] }])
        setFilePath(result.filePaths[0])
    }
    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (hash.length > 0 && algorithm !== null && filePath.length > 0 && threads) {
            window.api.cracker_new(hash, parseInt(threads), (n: any) => {
                if ('success' in n) {
                    setResult(n.success)
                    pause()
                    setCount(window.api.cracker_counter());
                    setIsCracking(false)
                }
                if ("not found" in n) {
                    setError(n.not_found)
                    pause()
                    setCount(window.api.cracker_counter());
                    setIsCracking(false)
                }
            })
            window.api.cracker_hash(algorithm, filePath, 1000)
            start()
            setIsCracking(true)
        }
    }
    const handleHash = (event: ChangeEvent<HTMLInputElement>) => {
        setHash(event.target.value)
    }
    const handleThread = (event: ChangeEvent<HTMLInputElement>) => {
        setThreads(event.target.value)
    }
    let [count, setCount] = useState(0)
    useInterval(() => {
        setCount(window.api.cracker_counter());
    }, isCracking ? 1000 : null);
    return (
        <Paper>
            <form onSubmit={handleSubmit}>
                <TextField label="Hash" type="text" onChange={handleHash} value={hash} />
                <TextField label="Threads" type="number" onChange={handleThread} value={threads} />
                <Autocomplete
                    value={algorithm}
                    onChange={(event: any, newValue: string | null) => {
                        setAlgorithm(newValue);
                    }}
                    disablePortal
                    id="algorithm"
                    options={window.api.shiny_spoon.get_algorithms()}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Algorithm" />}
                />
                {filePath && (<Typography>{filePath}</Typography>)}
                <Button onClick={handleOnClick}>Choose Password File</Button>
                <Button variant="contained" type="submit">Run</Button>
            </form>

            <Box>
                <Typography variant="h5">Results</Typography>
                <Typography>Hash: {hash}</Typography>
                <Typography>Time: {days}:{hours}:{minutes}:{seconds} d:h:m:s</Typography>
                <Typography>Found: {result}</Typography>
                <Typography>Speed: {count !== 0 && (count / (seconds + days * 86400 + minutes * 3600))}/s</Typography>
                <Typography>Tries: {count}</Typography>
                <Typography>Error: {error}</Typography>
            </Box>
        </Paper>
    )
}
