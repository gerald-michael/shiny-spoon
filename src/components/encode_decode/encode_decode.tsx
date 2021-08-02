
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import { TextField, Typography, Button, Alert, Snackbar } from '@material-ui/core'
import { Algorithm } from "../../store/models/encoder_decoder"
import AlgorithmCard from "./algorithms_card"
import { useState, ChangeEvent, useContext } from 'react';
import { EncoderDecoderContext } from "../../store/context/encoder_decoder"
import { useDrop } from 'react-dnd'
import itemTypes from '../../utils'
import SimpleAlgorithmCard from './chain_algorithm_cards/simple_algorithm_card'
import SearchIcon from '@material-ui/icons/Search';
import Affine from './chain_algorithm_cards/affine';
import Bacon from './chain_algorithm_cards/bacon';
import Rot from './chain_algorithm_cards/rot';
import Md5 from './chain_algorithm_cards/md5';
import Vigenere from './chain_algorithm_cards/vigenere';
import Xor from './chain_algorithm_cards/xor';
import Scytale from './chain_algorithm_cards/scytale';
import Base58 from './chain_algorithm_cards/base58';
import Ceasar from './chain_algorithm_cards/ceasar';
import { useEffect } from 'react';
interface IItem {
    title: string,
}
export default function EncodeDecode() {
    const { encoder_decoder, addToChain, crunch } = useContext(EncoderDecoderContext)
    const [output, setOutput] = useState("")
    const [input, setInput] = useState("")
    const [search, setSearch] = useState([])
    const [open, setOpen] = useState(false)
    const [, drop] = useDrop(() => ({
        accept: itemTypes.CARD,
        drop: (item: IItem, monitor) => {
            addToChain(item.title)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }))

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(encoder_decoder.algorithms.filter((item: any, id: any) => item.title.includes(event.target.value)))
    }
    const handleSubmit = () => {
        if (input.length > 0 && encoder_decoder.chain.length > 0) {
            crunch(input, encoder_decoder.chain)
        }
    }
    useEffect(() => {
        if (encoder_decoder.success) {
            setOpen(false)
            setOutput(encoder_decoder.success)
        } else {
            setOutput("")
        }
        if (encoder_decoder.error) {
            setOpen(true)
        } else {
            setOpen(false)
        }
    }, [encoder_decoder])
    console.log(encoder_decoder)
    return (
        <Box sx={{ flexGrow: 1, color: "brown" }}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                    <Paper square elevation={3} sx={{ height: "90vh", overflow: "auto" }}>
                        <Typography variant="h5" sx={{ padding: 2 }}>
                            Algorithms
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end', marginLeft: 2, marginBottom: 2 }}>
                            <TextField id="search" label="Search" variant="standard" fullWidth onChange={handleSearch} />
                            <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        </Box>
                        {search.length > 0 && (
                            <Stack spacing={2} paddingX={2} marginBottom={2}>
                                {search.map((algorithm: Algorithm) => {
                                    return <AlgorithmCard title={algorithm.title} key={algorithm.id} />
                                })}
                            </Stack>
                        )}
                        <Stack spacing={2} paddingX={2}>
                            {encoder_decoder.algorithms.map((algorithm: Algorithm) => {
                                return <AlgorithmCard title={algorithm.title} key={algorithm.id} />
                            })}
                        </Stack>
                    </Paper>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Paper square elevation={3} sx={{ minHeight: "85vh" }}>
                        <Typography variant="h5" sx={{ padding: 2 }}>
                            Chain
                        </Typography>
                        <Stack ref={drop} spacing={2} paddingX={2} sx={{ height: "78vh", overflow: "auto" }}>
                            {encoder_decoder.chain.length === 0 && (<p>Drop here..</p>)}
                            {encoder_decoder.chain.map((algorithm: Algorithm) => {
                                if (algorithm.title === "Affine Encode" || algorithm.title === "Affine Decode") {
                                    return <Affine title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                } else if (algorithm.title === "Bacon Encode" || algorithm.title === "Bacon Decode") {
                                    return <Bacon title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                } else if (algorithm.title === "Rot Encode" || algorithm.title === "Rot Decode") {
                                    return <Rot title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                } else if (algorithm.title === "Md5 Hash") {
                                    return <Md5 title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                } else if (algorithm.title === "Vigenere Encode" || algorithm.title === "Vigenere Decode") {
                                    return <Vigenere title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                } else if (algorithm.title === "XOR Encode" || algorithm.title === "XOR Decode") {
                                    return <Xor title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                } else if (algorithm.title === "Scytale Encode" || algorithm.title === "Scytale Decode") {
                                    return <Scytale title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                } else if (algorithm.title === "Base58 Encode" || algorithm.title === "Base58 Decode") {
                                    return <Base58 title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                } else if (algorithm.title === "Caesar Encode" || algorithm.title === "Caesar Decode") {
                                    return <Ceasar title={algorithm.title} id={algorithm.id} key={algorithm.id} algorithm_key={algorithm.key} />
                                }
                                else {
                                    return <SimpleAlgorithmCard title={algorithm.title} id={algorithm.id} key={algorithm.id} />
                                }
                            })}
                        </Stack>
                    </Paper>
                    <Button variant="contained" sx={{ marginX: "40%", marginTop: 2 }} onClick={handleSubmit}>Crunch</Button>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Paper square elevation={3} sx={{ minHeight: "44vh" }}>
                                <Typography variant="h5" sx={{ padding: 2 }}>
                                    Input
                                </Typography>
                                <TextField multiline fullWidth minRows={14} value={input} onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setInput(event.target.value) }} />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper square elevation={3} sx={{ minHeight: "44vh" }}>
                                <Typography variant="h5" sx={{ padding: 2 }}>
                                    Output
                                </Typography>
                                <TextField multiline minRows={14} fullWidth value={output} />
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Snackbar open={open}>
                <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
                    {encoder_decoder.error}
                </Alert>
            </Snackbar>
        </Box>
    );
}
