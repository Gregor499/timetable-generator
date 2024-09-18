import { AccessAlarm } from "@mui/icons-material";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <AppBar position='static'>
        <Toolbar>
                <AccessAlarm/>
                    <Typography variant="h6" textAlign={'center'} sx={{ textDecoration: 'none' }}>
                    Timetable Generator
                    </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;