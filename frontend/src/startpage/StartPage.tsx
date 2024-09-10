import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {postTimeUnitCreationData} from "../service/apiService";
//import "./StartPage.css"
import { Button, Box, Container, Typography, Grid2, AppBar, Toolbar } from '@mui/material';
import { AccessAlarm } from "@mui/icons-material";

export default function StartPage() {

    const [username, setUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loginStatus, setLoginStatus] = useState(true)
    let token = localStorage.getItem("jwt")

    useEffect(() => {
        axios.get("/api/users", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response: AxiosResponse<String>) => response.data)
            .then((value) => {
                setUsername(value.toString())
                localStorage.setItem("userName", value.toString())
            })
            .catch(() => setErrorMessage(""))

        if (token == null) {
            setLoginStatus(false)
            setUsername("you are not logged in ")
        }
    }, [token])

    const loginOut = () => {
        setLoginStatus(false)
        localStorage.removeItem("jwt");
    }

    useEffect(() => {
        postTimeUnitCreationData({
            "time": "00:00",
            "length": 15,
            "end": "24:00"
        })
            .catch(() => setErrorMessage("timeUnitList does not load"));
    }, [])

    return (
        <Container disableGutters>
            <Box textAlign='center'>
                <AppBar position='static'>
                    <Toolbar>
                        <AccessAlarm/>
                        <Typography variant="h6" textAlign={'center'} sx={{ textDecoration: 'none' }}>Timetable Generator</Typography>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box textAlign='center'>
                <Typography variant="h2" gutterBottom>Timetable Generator</Typography>
                <Typography variant="h4" gutterBottom>Hello{", " + username + " !"}</Typography>
            </Box>

            {errorMessage && <div>{errorMessage}</div>}
            <div>
                <Grid2 container spacing={3.5} direction="column" justifyContent="center" alignItems="center" sx={{ mt: '5%' }}>
                    <Grid2 size={3}>
                        <Box textAlign='center'>
                            <Button size='large' variant='contained' href='/questions' sx={{ width: '100%'}}>Let's create !</Button>
                        </Box>
                    </Grid2>
                    <Grid2 size={3}>
                        <Box textAlign='center'>
                            <Button size='large' variant='contained' href='/register' sx={{ width: '100%'}}>Register</Button>
                        </Box>
                    </Grid2>
                        
                    <Grid2 size={3}>
                        <Box textAlign='center' sx={{ pb: '5%' }}>
                        {!loginStatus ? (
                            <Button size='large' variant='contained' href='/login' sx={{ width: '100%'}}>
                                Log in
                            </Button>
                        ) : (                            
                        <form onSubmit={loginOut}>
                            <Button size='large' variant='contained' type="submit" sx={{ width: '100%'}}>
                                Log out
                            </Button>
                        </form>     
                        )}
                        </Box>
                    </Grid2>
                </Grid2>
                
            </div>
        </Container>
    );
}