import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import styled from '@emotion/styled';

const StyledLink = styled('a')({
    textDecoration: 'none',
    color: 'inherit',
})


const drawerWidth = 240;

const Header = (props) => {

    const { windows } = props;
    console.log(windows);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logoutUser = () => {
        window.open(
            'http://localhost:4000/logout',
            "_self"
        )
    }

    const username = props.user ? props.user.name : "App Blog";

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <StyledLink href={props.user ? "/profile" : "/"}>
                    {username}
                </StyledLink>
            </Typography>
            <Divider />
            <List>
                <StyledLink href={"/"}>
                    <ListItem key="Home" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </StyledLink>

                <StyledLink href={"/about"}>
                    <ListItem key="About" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>
                </StyledLink>

                <StyledLink href={"/contact"}>
                    <ListItem key="contact" disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} >
                            <ListItemText primary="Contact" />
                        </ListItemButton>
                    </ListItem>
                </StyledLink>

                {
                    props.user ? (
                        <StyledLink href={"/logout"}>
                            <ListItem key="logout" disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => logoutUser()}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </ListItem>
                        </StyledLink>
                    ) : (
                        <StyledLink href={"/login"}>
                            <ListItem key="login" disablePadding>
                                <ListItemButton sx={{ textAlign: 'center' }} >
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>
                        </StyledLink>
                    )
                }
            </List>
        </Box>
    );

    const container = windows !== undefined ? () => windows().document.body : undefined;
    console.log("conatiner", container);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: 'none' } }}>
                        <MenuIcon />
                    </IconButton>
                    {/* <StyledLink href={ props.user? "/profile" : "/" }> */}
                    <Typography variant="h6" component="div" href="/" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
                        <StyledLink href={props.user ? "/profile" : "/"}>
                            {username}
                        </StyledLink>
                    </Typography>
                    {/* </StyledLink> */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <StyledLink href={"/"}>
                            <Button key={"Home"} sx={{ color: '#fff' }} >
                                Home
                            </Button>
                        </StyledLink>
                        <StyledLink href={"/about"}>
                            <Button key={"About"} sx={{ color: '#fff' }} >
                                About
                            </Button>
                        </StyledLink>
                        <StyledLink href={"/contact"}>
                            <Button key={"Contact"} sx={{ color: '#fff' }} >
                                Contact
                            </Button>
                        </StyledLink>



                        {
                            props.user ? (
                                <Button onClick={() => logoutUser()} sx={{ color: '#fff' }}>
                                    Logout
                                </Button>
                            ) : (
                                <StyledLink href={"/login"}>
                                    <Button key={"Login"} sx={{ color: '#fff' }} >
                                        Login
                                    </Button>
                                </StyledLink>
                            )
                        }

                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{     keepMounted: true, }} sx={{     display: { xs: 'block', sm: 'none' },     '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }, }}>
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

export default Header;
