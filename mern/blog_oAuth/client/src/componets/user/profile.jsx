// import * as React from 'react';
import { Container, Grid, Box, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserProfile = (userDetails) => {


    const user = userDetails.user;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [googleId, setGoogleId] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setGoogleId(user.googleID);
        }
    }, [user]);


    return (
        <div>
            <ToastContainer />
            <Container maxWidth={false} sx={{ height: '100vh', backgroundColor: { xs: '#fff', md: '#f4f4f4' } }}>
                <Grid container justifyContent='center' alignItems='center' sx={{ width: '100%', height: '100%' }}>
                    <Grid item sx={{ maxWidth: '70rem', width: '100%', backgroundColor: '#fff' }}>

                        <Grid container sx={{ boxShadow: { sm: '0 0 5px #ddd' }, py: '6rem', px: '1rem', }}>
                            <Grid item container justifyContent='space-between' rowSpacing={5} sx={{ maxWidth: { sm: '45rem' }, marginInline: 'auto', }}>
                                <Grid item xs={12} sm={6} sx={{ borderRight: { sm: '1px solid #ddd' } }} >
                                    <Box display='flex' flexDirection='column' component='form' noValidate autoComplete='off' sx={{ paddingRight: { sm: '3rem' } }} >

                                        <TextField disabled label="Name" value={name} style={{ margin: '10px 0' }} />
                                        <TextField disabled label="Email" value={email} style={{ margin: '10px 0' }} />
                                        <TextField disabled label="Google Id" value={googleId} style={{ margin: '10px 0' }} />

                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box display='flex' flexDirection='column' sx={{ paddingLeft: { sm: '3rem' }, rowGap: '1rem' }}>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Container>

        </div>

    );
}

export default UserProfile;
