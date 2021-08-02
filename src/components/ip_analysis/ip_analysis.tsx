import * as React from 'react';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Grid, InputLabel, Button, Checkbox, FormControlLabel, Slider, Typography, TextField, Paper, IconButton, LinearProgress, Snackbar, Alert } from '@material-ui/core';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import { SelectChangeEvent } from "@material-ui/core/Select"
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import IsIp from "is-ip"
// import { useSnackbar } from 'notistack';

const marks = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 10000,
        label: '10000',
    },
    {
        value: 20000,
        label: '20000',
    },
    {
        value: 30000,
        label: '30000',
    },
    {
        value: 40000,
        label: '40000',
    },
    {
        value: 50000,
        label: '50000',
    },
    {
        value: 65535,
        label: '65535',
    },
];
interface IResults {
    service_name: string,
    protocal: string,
    open_frequency: number,
    optional_comment: string,
    ip: string,
    port: number,
    banner: string
}
export default function BasicSelect() {
    const [type, setType] = useState('');
    const [banner, setBanner] = useState(false)
    let [ip, setIp] = useState([
        { id: uuidv4(), value: '' },
    ]);
    const handleAddFields = () => {
        setIp([...ip, { id: uuidv4(), value: '' }])
    }
    const handleRemoveFields = (id: string) => {
        const values = [...ip];
        values.splice(values.findIndex(value => value.id === id), 1);
        setIp(values);
    }
    const handleInputChange = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        const newInputFields = ip.map(i => {
            if (id === i.id) {
                i["value"] = event.target.value
            }
            return i;
        })
        setIp(newInputFields)
    }

    let [ports, setPorts] = useState([
        { id: uuidv4(), value: '' },
    ]);
    const handlePortAdd = () => {
        setPorts([...ports, { id: uuidv4(), value: '' }])
    }
    const handlePortRemove = (id: string) => {
        const values = [...ports];
        values.splice(values.findIndex(value => value.id === id), 1);
        setPorts(values);
    }
    const handlePortChange = (id: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault()
        const newInputFields = ports.map(i => {
            if (id === i.id) {
                i["value"] = event.target.value
            }
            return i;
        })
        setPorts(newInputFields)
    }
    const [range, setRange] = useState<number[]>([0, 2000])
    const handleRangeChange = (event: Event, newValue: number | number[]) => {
        setRange(newValue as number[])
    }
    const handleStartEnd = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (parseInt(event.target.value) >= 0 && parseInt(event.target.value) <= 65535) {
            if (event.target.id === "start_range") {
                console.log('called')
                let num2 = range[1]
                setRange([parseInt(event.target.value), num2])
            }
            if (event.target.id === "end_range") {
                let num1 = range[0]
                setRange([num1, parseInt(event.target.value)])
            }
        }
    }
    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };
    // const handleInputChange = (event: any) => {
    //     setValues(event.target.value);
    // };
    // const Input = (props: any) => (
    //     <InputMask
    //         mask="999.999.999.999"
    //         value={ip}
    //         onChange={handleIpChange}>
    //         {(inputProps: any) => <MaterialInput {...inputProps} type="text" />}
    //     </InputMask>
    // );
    const handleBanner = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBanner(event.target.checked)
    }
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<IResults[]>()
    // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const handleScan = () => {
        setLoading(true)
        if (ip.length !== 0) {
            let validIps = [];
            for (let i = 0; i < ip.length; i++) {
                if (IsIp(ip[i].value)) {
                    validIps.push(ip[i].value)
                }
            }
            if (validIps.length > 0) {
                if (type === "range") {
                    setResults(window.api.shiny_spoon.scan_port_addrs_range(validIps, range[0], range[1]))
                }
                if (type === "list") {
                    if (ports.length >= 0) {
                        let validports = []
                        for (let i = 0; i < ports.length; i++) {
                            if (parseInt(ports[i].value) >= 0 && parseInt(ports[i].value) <= 65535) {
                                validports.push(parseInt(ports[i].value))
                            }
                        }
                        setResults(window.api.shiny_spoon.scan_port_addrs(validIps, validports))
                    }
                }
                if (banner) {
                    console.log('called')
                    let open = results
                    if (open) {
                        for (let i = 0; i < open.length; i++) {
                            let grabbed_banner = window.api.shiny_spoon.grab_banner(`${open[i].ip}:${open[i].port}`)
                            if ("error" in grabbed_banner) {
                                console.log(results?.filter((item, id) => item.ip === open![i].ip && item.port === open![i].port))
                            }
                            if ("data" in grabbed_banner) {
                                // console.log(results?.filter((item, id) => item.ip === open![i].ip && item.port === open![i].port)![0]!['banner'] = grabbed_banner.data)
                            }
                        }
                    }
                }
            } else {
                // enqueueSnackbar("Enter Valid Ip Addresses")
            }
        } else {
            // enqueueSnackbar("Enter ip addresses to scan")
        }
        setLoading(false)
    }
    // enqueueSnackbar("this")
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: 2 }}>
                    <Box sx={{ paddingBottom: 2 }}>
                        {/* <FormControl required variant="standard" sx={{ marginRight: 2 }} >
                    <InputLabel>Ip Address</InputLabel>
                    <Input />
                </FormControl> */}
                        <Box>
                            {ip.map(ip => (
                                <Box key={ip.id} sx={{ marginBottom: 1 }}>
                                    <TextField id={ip.id} label="Ip Address" value={ip.value} variant="outlined" required onChange={event => handleInputChange(ip.id, event)} />
                                    <IconButton onClick={() => handleRemoveFields(ip.id)} sx={{ marginTop: 1 }}><RemoveIcon /></IconButton>
                                </Box>
                            ))}
                            <Button variant="contained" onClick={() => handleAddFields()}>Add Ip<AddIcon /></Button>
                        </Box>
                        <FormControlLabel
                            control={<Checkbox checked={banner} onChange={handleBanner} name="banner" />}
                            label="banner"
                            sx={{ marginTop: 2, display: "block" }}
                        />
                        <FormControl sx={{ paddingBottom: 2, minWidth: 100 }}>
                            <InputLabel id="demo-simple-select-label">On</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="On"
                                onChange={handleChange}
                            >
                                <MenuItem value={"range"}>Range</MenuItem>
                                <MenuItem value={"list"}>List</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    {type === "range" && (
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography id="discrete-slider-always" gutterBottom>
                                Range
                            </Typography>

                            <Slider
                                step={1}
                                value={range}
                                defaultValue={[0, 2000]}
                                marks={marks}
                                min={0}
                                max={65535}
                                valueLabelDisplay="auto"
                                onChange={handleRangeChange}
                            />
                            <TextField id="start_range" label="Start" variant="outlined" onChange={handleStartEnd} value={range[0]} type="number" sx={{ width: 150, marginRight: 1 }} />
                            <TextField id="end_range" label="End" variant="outlined" onChange={handleStartEnd} value={range[1]} type="number" sx={{ width: 150 }} />
                        </Box>
                    )}
                    {type === "list" && (
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography id="discrete-slider-always" gutterBottom>
                                Ports
                            </Typography>
                            <Box>
                                {ports.map(port => (
                                    <Box key={port.id} sx={{ marginBottom: 1 }}>
                                        <TextField id={port.id} label="Port" value={port.value} variant="outlined" required onChange={event => handlePortChange(port.id, event)} />
                                        <IconButton onClick={() => handlePortRemove(port.id)} sx={{ marginTop: 1 }}><RemoveIcon /></IconButton>
                                    </Box>
                                ))}
                                <Button variant="contained" onClick={() => handlePortAdd()} sx={{ marginTop: 2 }}>Add Port<AddIcon /></Button>
                            </Box>
                        </Box>
                    )
                    }
                    <Button variant="contained" onClick={handleScan}>Scan</Button>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper sx={{ maxHeight: "85vh", padding: 2, overflow: "auto" }}>
                    <Typography variant="h5">Results </Typography>
                    {results && <Typography><b>Found:</b> {results?.length}</Typography>}
                    {loading && <LinearProgress />}
                    {results && results.map((result) => {
                        return <Box key={result.ip.concat(result.port.toString())}>
                            <Typography><b>IP:</b> {result.ip}</Typography>
                            <Typography><b>Port:</b> {result.port}</Typography>
                            <Typography><b>Protocal:</b> {result.protocal}</Typography>
                            <Typography><b>Service:</b> {result.service_name}</Typography>
                            <Typography><b>Description:</b> {result.optional_comment || "None"}</Typography>
                            <Typography><b>Open Frequency:</b> {result.open_frequency * 100}%</Typography>
                            <hr />
                        </Box>
                    })}
                </Paper>
            </Grid>
        </Grid>
    );
}
