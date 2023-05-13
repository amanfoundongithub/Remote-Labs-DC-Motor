import { Grid, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config.js'
import { useNavigate } from "react-router-dom";
import { Typography } from '@mui/material';
import { AbcOutlined, DonutLarge, Pix } from "@mui/icons-material";
import { fontStyle } from "@mui/system";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    /////////////////////////////////////
    const myStyle = {
        backgroundImage:
            "url('http://parkwalkadvisors.com/wp-content/uploads/2019/04/fuel-3d-tech.png')",  //best
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
    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, pwd)
        }
        catch (error) {
            console.log(error.message)

        }
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user != null)
                navigate('/auth');
            else
                navigate('/');
        })
    }, [])


    return (
        <div style={myStyle} >
            {/* <Grid container align={"center"} spacing={2} style={{backgroundColor:"white"}}> */}
            <div style={myStyle1}>
                <Grid item xs={6} style={{ paddingLeft: 30, textAlign: "center" }}>
                    <Typography align='center' variant='h3' style={{ fontFamily: "monospace" }} >DC MOTORS: REMOTE LABS</Typography>
                </Grid>
            </div>

            {/* <div style={myStyle1}> */}
            <Grid item xs={6} style={{ paddingLeft: 30, color: "red" }}>
                <Typography align='left' variant='h3' style={{ fontFamily: "serif", paddingLeft: '530px', paddingTop: '130px', fontSize: '40px' }} >Sign in</Typography>
            </Grid>
            {/* </div> */}

            <Grid container align={"center"} spacing={2} style={{ width: '50%', paddingTop: '10px', paddingLeft: '420px' }}>
                <Grid item xs={12} style={{ paddingLeft: 30, color: 'cyan' }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        style={{
                            borderRadius: 2,
                            padding: '2px',
                            backgroundColor: "rgba(30, 55, 68, 0.648579)",
                            // backgroundColor: "",
                            filter: "blur(44.119)",
                            position: "relative",
                            overflow: "hidden",
                        }}
                        type="email"
                        value={email}
                        onChange={val => setEmail(val.target.value)}
                        sx={{ minWidth: "400px", minHeight: "40px" }}
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
                        sx={{ minWidth: "400px", minHeight: "40px" }}
                    />
                </Grid>
                <Grid item xs={12} style={{ paddingLeft: 30 }}>
                    <Button
                        variant="contained"

                        onClick={login}
                        sx={{ minWidth: "400px", minHeight: "60px" }}
                    >
                        Login
                    </Button>
                </Grid>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12} style={{ paddingLeft: 30 }}>
                    <Button
                        variant="outlined"
                        onClick={() => navigate('/register')}
                        sx={{ minWidth: "400px", minHeight: "60px" }}
                    >
                        Did not register, sign up
                    </Button>
                </Grid>
            </Grid>
            
            <Grid container align={"justify"} item xs={12} style={{ paddingLeft: 30 ,paddingLeft: "10px", paddingTop:"200px" }}>
                {/* <div style={{}}> */}
                    <Button
                        variant="contained"

                        onClick={()=> {navigate('/theory');window.location.reload();}} 
                        sx={{ minWidth: "150px", minHeight: "60px" }}
                        >
                        Theory ?
                    </Button>
                {/* </div> */}
                </Grid>

                <Grid container align={"justify"} item xs={12} style={{ paddingLeft: 30 ,paddingLeft: "10px", paddingTop:"200px" }}>
                {/* <div style={{}}> */}
                    <Button
                        variant="contained"

                        onClick={()=> {navigate('/about');window.location.reload();}} 
                        sx={{ minWidth: "150px", minHeight: "60px" }}
                        >
                        About us !
                    </Button>
                {/* </div> */}
                </Grid>
                </div>



    )
}

export default Login
