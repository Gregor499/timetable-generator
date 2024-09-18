import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {getProcessedTimeAnswers, postTimeUnitCreationData} from "../service/apiService";
import { Button, Box, Container, Typography, Grid2 } from '@mui/material';
import Header from "../components/Header";

export default function StartPage() {

    const [username, setUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [loginStatus, setLoginStatus] = useState(true)
    const [timetableStatus, setTimetable] = useState(false)
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
            setUsername("Please log in to continue.")
        }

        if ( token != null) {
        getProcessedTimeAnswers()
            .then((data: string | any[]) => {
                if(data && data.length > 0) setTimetable(true)
                else setTimetable(false)
                })
            .catch(() => setErrorMessage("Error while processing Answers:\nCheck if one is missing or falsely set !"));

        postTimeUnitCreationData({
            "time": "00:00",
            "length": 15,
            "end": "24:00"
        })
            .catch(() => setErrorMessage("time unit database entries do not load"));
        }
        
    }, [token])

    const loginOut = () => {
        setLoginStatus(false)
        localStorage.removeItem("jwt");
    }

    useEffect(() => {
        
    }, [token])

    return (
        <Container disableGutters>
            <Header/>
            <Box textAlign='center'>
                <Typography variant="h2" gutterBottom>Timetable Generator</Typography>
                <Typography variant="h4" gutterBottom>Welcome!</Typography>
                <Typography variant="h4" gutterBottom>{username}</Typography>
            </Box>

            {errorMessage && <div>{errorMessage}</div>}
            <div>
                <Grid2 container spacing={{ xs: 1, sm: 2, md: 3 }} direction="column" justifyContent="center" alignItems="center" sx={{ mt: '5%' }}>
                    <Grid2 size={3}>
                        {loginStatus && 
                        <Box textAlign='center'>
                            <Button size='large' variant='contained' href='/questions' sx={{ width: '100%', whiteSpace:'nowrap'}}>
                                Let's create !
                            </Button>
                        </Box>
                        }
                    </Grid2>

                    <Grid2 size={3}>
                        <Box textAlign='center'>
                            <Button size='large' variant='contained' href='/register' sx={{ width: '100%', whiteSpace:'nowrap'}}>
                                Create new account
                            </Button>
                        </Box>
                    </Grid2>
                        
                    <Grid2 size={3}>
                        <Box textAlign='center' sx={{ pb: '5%' }}>
                        {!loginStatus ? (
                            <Button size='large' variant='contained' href='/login' sx={{ width: '100%', whiteSpace:'nowrap'}}>
                                Log in
                            </Button>
                        ) : (                            
                        <form onSubmit={loginOut}>
                            <Button size='large' variant='contained' type="submit" sx={{ width: '100%', whiteSpace:'nowrap'}}>
                                Log out
                            </Button>
                        </form>     
                        )}
                        </Box>
                    </Grid2>

                    {timetableStatus && 
                    <Grid2 size={3}>
                        <Box textAlign='center'>
                            <Button size='large' variant='contained' href='/timetable' sx={{ width: '100%', whiteSpace:'nowrap'}}>View previous timetable</Button>
                        </Box>
                    </Grid2>
                    }
                </Grid2>
                
            </div>
        </Container>
    );
}