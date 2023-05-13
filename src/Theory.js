import { Grid, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js'
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { DonutLarge, Pix } from "@mui/icons-material";
import { fontStyle } from "@mui/system";

const Theory = ()=>{
    const navigate = useNavigate() 

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

    useEffect(()=>{
        onAuthStateChanged(auth, user=>{
            navigate("/theory") 
        })
    },[]) 

    const newStyle={
        fontSize: '25px',
        textAlign: 'justify',
        fontFamily: 'monospace'
    };
    return (
        <div style={myStyle}>
            
                    <Grid item xs={6} style={{ paddingLeft: 30, textAlign: "center" }}>
                        <Typography align='center' variant='h3' style={{ fontFamily: "times" }} >DC MOTORS: REMOTE LABS</Typography>
                    </Grid>
                    <br></br>
                    <Grid item xs={6} style={{ paddingLeft: 30, textAlign: "center" }}>
                        <Typography align='center' variant='h4' style={{ fontFamily: "times" }} >How To Use This Page?</Typography>
                    </Grid>
                    <ul style={newStyle}>
                        <li>You Have To First Login To This Page Using Your Email ID and Password</li>
                        <img src={require('./loginpage.png')} />
                        <li>If You Have Not Logged In To The Page Before, Please Register Before Logging In Again</li>
                        <img src={require('./createpage.png')} />
                        <li>After Completing Login , you will be redirected to the Experiment's Page</li>
                        <img src={require('./experimentpage.png')} />
                        <li>The Experiment's Page contains the following information:</li>
                        <ul>
                            <li>The Current Voltage and RPM measured by the sensors</li>
                            <li>A slider to change the value of the Voltage fed to the DC Motor</li>
                            <li>Two graphs which shows the variation of Voltage and RPM over the time</li>
                        </ul>
                        <li>To Logout of the current session, please click on the Sign Out button in the Page</li>
                    </ul>

                    <Grid item xs={6} style={{ paddingLeft: 30, textAlign: "center" }}>
                        <Typography align='center' variant='h4' style={{ fontFamily: "times" }} >Theory Of DC Motors Experiment</Typography>
                    </Grid>
                    <p style={newStyle}>
                        The DC Motor Experiment is an experiment to analyze the running of a DC motor and find the dependence of
                        RPM (Revolution Per Minute) on the Input voltage to the DC Motor.
                        The experiment uses a couple of sensors and actuators to acheive this goal. The following sensors are used for this
                        purpose:
                        <ul>
                            <li><strong>ESP32 Microcontroller: </strong> The ESP32 Microcontroller serves as the purpose of
                            controlling the input voltage that is supplied to the DC Motor. It also takes the readings from all the other sensors.</li>
                            <li><strong>Motor Driver: </strong> The motor driver is a device that is used to 
                            change the voltage supplied to the motor.</li>
                            <li><strong>LN393 Sensor [RPM Sensor]: </strong> This sensor is used to find the current RPM of the DC Motor.</li>
                            <li><strong>DC Motor: </strong> This is the only actuator in our experiment.</li>
                            <li><strong>ESP32 Cam: </strong> This is a camera module to give the live footage 
                            of the experiment to the user of the website, so that he/she can see the experiment's live 
                            demonstration.</li>
                        </ul>
                        <strong>Observations: </strong>
                        If the experiment were done successfully, then this should mean that we should see that the RPM should increase with increase in the voltage supplied to the
                        DC Motor. 
                        </p>
                        <Button
                        variant="contained"

                        onClick={()=> {navigate('/auth');window.location.reload();}} 
                        sx={{ minWidth: "150px", minHeight: "60px" }}
                        >
                        Go Back
                    </Button>
                </div>
    )


}

export default Theory 