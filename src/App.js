// @mui material components
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import SpeedIcon from '@mui/icons-material/Speed';

///////////////////////////////////////////
// import React, { Component } from 'react';
///////////////////////////////////////////

// Argon Dashboard 2 MUI components
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Line } from 'react-chartjs-2';
import { auth } from './firebase-config.js'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import Chart from 'chart.js/auto'

function Default() {
    const navigate = useNavigate();
    const [rpm, setRpm] = useState(null);
    const [voltage, setVoltage] = useState(null);
    const [pwm, setPwm] = useState(100);

    const [chose, setChose] = useState('year');

    const [yearRPM, setYearRPM] = useState([]);
    const [monthRPM, setMonthRPM] = useState([]);
    const [dayRPM, setDayRPM] = useState([]);

    const [yearNRPM, setYearNRPM] = useState([]);
    const [monthNRPM, setMonthNRPM] = useState([]);
    const [dayNRPM, setDayNRPM] = useState([]);

    const [yearVoltage, setYearVoltage] = useState([]);
    const [monthVoltage, setMonthVoltage] = useState([]);
    const [dayVoltage, setDayVoltage] = useState([]);

    const [yearCat, setYearCat] = useState([]);
    const [monthCat, setMonthCat] = useState([]);
    const [dayCat, setDayCat] = useState([]);

/////////////////////////////////////
const myStyle={
                backgroundImage: 
                // "url('https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/shutterstock_407554567.jpg')",
                // "url('https://colibriwp.com/blog/wp-content/uploads/2019/06/pawel-czerwinski-vI5XwPbGvmY-unsplash.jpg')",
                // "url('https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2020/05/shutterstock_407554567.jpg')",
                // "url('https://cdn.pixabay.com/photo/2015/10/29/14/38/web-1012467__340.jpg')",
                // "url('https://www.electricmotorengineering.com/files/2019/03/Foto-1-Dc-motors.jpg.jpg')",
                // "url('https://www.web-design-singapore.com.sg/wp-content/uploads/2021/06/hero-image-bg.jpg')",
                // "url('https://wallpaperaccess.com/full/4023652.jpg')",
                // "url('https://w0.peakpx.com/wallpaper/878/690/HD-wallpaper-neon-blue-background-hexagon-neon-3d-background-neon-abstraction-hexagon-texture-blue-neon-light-abstraction.jpg')",
                // "url('https://w0.peakpx.com/wallpaper/447/936/HD-wallpaper-turquoise-hexagons-3d-art-creative-honeycomb-hexagons-patterns-turquoise-hexagons-background-hexagons-textures-turquoise-backgrounds-hexagons-texture.jpg')",
                // "url('https://a-static.besthdwallpaper.com/hexagon-and-pattern-wallpaper-2400x1350-53169_50.jpg')",
                // "url('https://i.pinimg.com/originals/0e/95/cf/0e95cf9bdfb895937d322c2bc37046a9.jpg')",
                // "url('http://parkwalkadvisors.com/wp-content/uploads/2019/04/fuel-3d-tech.png')",  //best
                // "url('https://images.twinkl.co.uk/tw1n/image/private/t_630_eco/website/uploaded/circuit-board-1542799434.jpg')",
                "url('https://images2.alphacoders.com/701/70172.jpg')",
                // "url('https://media.istockphoto.com/id/1392080282/video/glowing-round-illuminated-lines-3d-rendering.jpg?b=1&s=640x640&k=20&c=M7h2pwmAc30-ZmNTdrMrsujSVh8kjd1PzI5gMg3VaUY=')",
                // "url('https://images.hdqwalls.com/wallpapers/colors-abstract-background-uq.jpg')",
                // "url('http://www.skyhook.com/hubfs/Billboard_Images/iot_background_blank.png')",
                // "url('https://img.freepik.com/premium-vector/futuristic-technology-cloud-iot-dark-blue-background_34645-908.jpg')",
                // "url('')",
                // "url('')",
                // "url('')",
                // "url('')",
                // "url('')",
                // "url('')",
                // "url('')",
                // "url('')",
                // "url('')",
                
                height:'800px',
                marginTop:'30px',
                fontSize:'50px',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            };
/////////////////////////////////////

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user != null)
                navigate('/auth');
            else
                navigate('/');
        })
    }, [])

    const marks = [
        {
            value: 0,
            label: '0%',
        },
        {
            value: 100,
            label: '100%',
        },
    ];

    useEffect(() => {
        setTimeout(()=>{
            window.location.reload(); 
        },10000)  
        const oneMrpm = []
        // axios.get('https://api.thingspeak.com/channels/1839559/feeds.json?api_key=N11LTANIFU3RSH5N')
        axios.get('https://api.thingspeak.com/channels/1921615/feeds.json?api_key=F5HX1L80AZRAA2VA')
            .then(res => {
                const yr = [], mr = [], dr = [];
                const ny = [], nm = [], nd = [];
                const yv = [], mv = [], dv = [];

                const today = new Date();
                res.data.feeds.map(val => {
                    // if (val.field1 * val.field2 && val.field1 < 300 && val.field1 >= 0 && val.field2 >= 0)
                    if(val.field1 != 0)
                    {
                        const cur = new Date(val.created_at)
                        if (today.getFullYear() === cur.getFullYear())
                        {
                // (original value - min_val_or) / (max_or - min_or) * (new_max - new_min) + new_min
                            yr.push(val.field1);
                            ny.push(val.field1 * 3 / 100)

                            if (cur.getDate() < 21)
                                yv.push(val.field2 * 9 / 5)
                            else
                                yv.push(val.field2);

                            if (today.getMonth() === cur.getMonth())
                            {
                                mr.push(val.field1);
                                nm.push(val.field1 * 3 / 100)

                                if (cur.getDate() < 21)
                                    mv.push(val.field2 * 9 / 5)
                                else
                                    mv.push(val.field2);

                                if (today.getDate() === cur.getDate())
                                {
                                    if (cur.getDate() < 21)
                                        dv.push(val.field2 * 9 / 5)
                                    else
                                        dv.push(val.field2);

                                    dr.push(val.field1);
                                    nd.push(val.field1 * 3 / 100)
                                }
                            }
                        }
                    }
                })

                // (original value - min_val_or) / (max_or - min_or) * (new_max - new_min) + new_min
                const yc = [], mc = [], dc = [];
                for (let i = 0; i < yr.length; i++)
                    yc.push(i);

                for (let i = 0; i < mr.length; i++)
                    mc.push(i);

                for (let i = 0; i < dr.length; i++)
                    dc.push(i);

                setYearRPM(yr);
                setMonthRPM(mr);
                setDayRPM(dr);
                setRpm(dr[dr.length - 1])

                setYearNRPM(ny)
                setMonthNRPM(nm)
                setDayNRPM(nd)

                setYearVoltage(yv);
                setMonthVoltage(mv);
                setDayVoltage(dv);
                setVoltage(dv[dv.length - 1])

                setYearCat(yc);
                setMonthCat(mc);
                setDayCat(dc);

                console.log(dr)
                console.log(nd);
                console.log(dv);
                console.log(dc);
            })

        axios.get('http://esw-onem2m.iiit.ac.in:443/~/in-cse/in-name/Team-20/Node-1/Data/la', {
            headers: {
                'X-M2M-Origin': 'ZrZ4zY:lC8jfN',
                'Content-type': 'application/json'
            },
            crossDomain: true,
        }).then(res => {
            res.data.map(val => {
                oneMrpm.push(val)
            })
        })
    }, [])

    useEffect(() => {
        const p = Math.floor(pwm * 255 / 100);
        // axios.get('https://api.thingspeak.com/update?api_key=0LGM5L2SXPUYD8QQ&field1=' + p)
        axios.get('https://api.thingspeak.com/update?api_key=XEWT0DNG1O7VBOG7&field1=' + String(p))
    }, [pwm])

    return (
        <div style={myStyle}>
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={1}>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Card sx={{ bgcolor: '#2196f3' }} >
                        <CardContent>
                            <Typography color="white" gutterBottom>
                                <Typography sx={{ fontSize: 20 }}>
                                    <SpeedIcon /> Latest RPM
                                </Typography>
                                {rpm}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                    <Card sx={{ bgcolor: '#2196f3' }} >
                        <CardContent>
                            <Typography color="white" gutterBottom>
                                <Typography sx={{ fontSize: 20 }}>
                                    <ElectricMeterIcon /> Latest Voltage
                                </Typography>
                                {voltage}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={4}>
                </Grid>
                <Grid item xs={12} lg={4}>
                {/*<Box
                    component="img"
                    sx={{
                        width: '100%',
                    }}
                    alt="Camera not connected."
                    src="http://192.168.89.113:81/stream"
                 /> */}
                </Grid>
            </Grid>
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={12}>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Box sx={{ width: 300, height: 15 }}>
                    <Slider
                        aria-label="Always visible"
                        defaultValue={0}
                        step={5}
                        max={100}
                        marks={marks}
                        onChange={val => setPwm(val.target.value)}
                        valueLabelDisplay="on"
                    />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} lg={12}>
                </Grid>
            </Grid>
            {/* <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={4.75}>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button variant={ chose === 'year'? 'contained' : 'outlined' } onClick={() => setChose('year')}>Year</Button>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button variant={ chose === 'month'? 'contained' : 'outlined' } onClick={() => setChose('month')}>Month</Button>
                </Grid>
                <Grid item xs={12} md={6} lg={1}>
                    <Button variant={ chose === 'day'? 'contained' : 'outlined' } onClick={() => setChose('day')}>Day</Button>
                </Grid>
            </Grid> */}
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={1}>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Paper>
                        <Line
                            data={{
                                labels: chose === 'year' ? yearCat : chose === 'month' ? monthCat : dayCat,
                                datasets: [{
                                    label: 'RPM',
                                    data: chose === 'year' ? yearRPM : chose === 'month' ? monthRPM : dayRPM,
                                    fill: true,
                                    backgroundColor: 'red',
                                }],
                            }}
                        >
                        </Line>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Paper>
                        <Line
                            data={{
                                labels: chose === 'year' ? yearCat : chose === 'month' ? monthCat : dayCat,
                                datasets: [{
                                    label: 'Voltage',
                                    data: chose === 'year' ? yearVoltage : chose === 'month' ? monthVoltage : dayVoltage,
                                    fill: true,
                                    backgroundColor: 'orange',
                                } ],
                            }}
                        >
                        </Line>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={3.5}>
                </Grid>
                <Grid item xs={12} lg={5}>
                    <Paper>
                        <Line
                            data={{
                                labels: chose === 'year' ? yearCat : chose === 'month' ? monthCat : dayCat,
                                datasets: [{
                                    label: 'Voltage',
                                    data: chose === 'year' ? yearVoltage : chose === 'month' ? monthVoltage : dayVoltage,
                                    fill: true,
                                },{
                                    label: 'Normalized RPM',
                                    data: chose === 'year' ? yearNRPM : chose === 'month' ? monthNRPM : dayNRPM,
                                    fill: true,
                                }],
                            }}
                        >
                        </Line>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={5.5}>
                </Grid>
                <Grid item xs={12} md={6} lg={1.5}>
                    <Button variant={'contained'} onClick={() => signOut(auth)}>Sign Out</Button>
                </Grid>
            </Grid>
        </div>
       
    );
}


// import React, { Component } from 'react';

// class App extends Component {
//     render() {
//         const myStyle={
//             backgroundImage: 
//             "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
//             height:'100vh',
//             marginTop:'-70px',
//             fontSize:'50px',
//             backgroundSize: 'cover',
//             backgroundRepeat: 'no-repeat',
//         };
//         return (
//             <div style={myStyle}>
//         <h1> geeksforgeeks </h1>
//       </div>
//     );
// }
// }
export default Default;
// export default App;
