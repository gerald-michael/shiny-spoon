import { TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
// const shinny_spoon = require('../../../../shiny-spoon-service/')
export default function IpAnalysis() {
    const [value, setValue] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setValue(e.target.value)
    }
    useEffect(() => {

    }, [value]);
    // console.log(shinny_spoon)
    // const {password_strength_estimator} = shinny_spoon
    return (
        <>
            <Typography>Ip Analysis</Typography>
            <TextField id="outlined-basic" label="Enter Password" variant="outlined" value={value} onChange={handleChange} />
        </>
    )
}