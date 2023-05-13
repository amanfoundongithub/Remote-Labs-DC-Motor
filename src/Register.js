import { Grid, TextField, Button  } from "@mui/material";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js'
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const myStyle = {
        backgroundImage:
        "url('https://images2.alphacoders.com/701/70172.jpg')",  //best
        height: '800px',
        marginTop: '30px',
        fontSize: '50px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        textAlign: 'center',

    };
    const myStyle1 = {
        backgroundImage:
        "url('http://www.skyhook.com/hubfs/Billboard_Images/iot_background_blank.png')",
    };
    const myStyle2 = {
        backgroundImage:
            "url('https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/website/uploaded/circuit-board-1542799434.jpg')", 
        display: 'flex',
        alignItems: "left",
      
        align: 'center',
        justifyContent: 'left',
        width: '20%',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        marginBottom: '10px'

    };
    /////////////////////////////////////
    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, email, pwd)
            console.log(user)
        }
        catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user != null)
                navigate('/auth');
        })
    }, [])

    return (
        <div style={myStyle} >
            {/* <Grid container align={"center"} spacing={2} style={{backgroundColor:"white"}}> */}
            <div style={myStyle1}>
                <Grid item xs={6} style={{ paddingLeft: 30 ,textAlign: "center"}}>
                    <Typography align='center' variant='h3' style={{ fontFamily: "monospace" }} >DC MOTORS: REMOTE LABS</Typography>
                </Grid>
            </div>
      
            {/* <div style={myStyle1}> */}
                <Grid item xs={6} style={{ paddingLeft: 30 , color:"red" }}>
                    <Typography align='left' variant='h3' style={{ fontFamily: "serif" , paddingLeft: '530px', paddingTop:'130px' ,fontSize:'40px'}} >Register</Typography>
                </Grid>
            {/* </div> */}

            <Grid container align={"center"} spacing={2} style={{ width: '50%', paddingTop: '10px', paddingLeft: '420px' }}>
            <Grid item xs={12} style={{ paddingLeft: 30 }}>
                <TextField
                    label="Email"
                    variant="outlined"
                    style={{
                        borderRadius: 2,
                        padding: '2px',
                        backgroundColor: "rgba(30, 55, 68, 0.648579)",
                        filter: "blur(44.119)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                    type="email"
                    value={email}
                    onChange={val => setEmail(val.target.value)}
                    sx = {{ minWidth: "400px", minHeight: "40px" }}
                />
            </Grid>

            <Grid item xs={12} style={{ paddingLeft: 30 }}>
                <TextField
                    label="Password"
                    variant="outlined"
                    style={{
                        borderRadius: 2,
                        padding: '2px',
                        backgroundColor: "rgba(30, 55, 68, 0.648579)",
                        filter: "blur(44.119)",
                        position: "relative",
                        overflow: "hidden",
                    }}
                    type="password"
                    value={pwd}
                    onChange={val => setPwd(val.target.value)}
                    sx = {{ minWidth: "400px", minHeight: "40px" }}
                />
            </Grid>
            <Grid item xs={12} style={{ paddingLeft: 30 }}>
                <Button
                    variant="contained"
                    onClick={register}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                >
                    Register
                </Button>
            </Grid>
            
            <Grid item xs={12}style={{ paddingLeft: 30 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    sx = {{ minWidth: "400px", minHeight: "60px" }}
                >
                    If already signed up, log in
                </Button>
            </Grid>
        </Grid>
        </div>
    )
}

export default Register
