import { Grid, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js'
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { DonutLarge, Pix } from "@mui/icons-material";
import { fontStyle } from "@mui/system";

const About = () => {
    const navigate = useNavigate();
    const myStyle = {
        // backgroundImage:
        // "url('https://www.electricmotorengineering.com/files/2019/03/Foto-1-Dc-motors.jpg')",
        height: '800px',
        marginTop: '30px',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        textAlign: 'center',

    };
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            navigate("/about")
            
        })
    }, [])
return (
    <div style={myStyle}>
        
                <Grid item xs={6} style={{ paddingLeft: 30, textAlign: "center" }}>
                    <Typography align='center' variant='h3' style={{ fontFamily: "monospace" }} >DC MOTORS: REMOTE LABS</Typography>
                </Grid>
                <Grid item xs={6} style={{ paddingLeft: 30, textAlign: "center" }}>
                    <Typography align='center' variant='h4' style={{ fontFamily: "monospace" }} >THEORY PAGE</Typography>
                </Grid>
                <ul>
                    <li>The </li>
                </ul>

            </div>


)

}
export default About