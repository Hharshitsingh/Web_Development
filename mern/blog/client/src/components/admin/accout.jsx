import { useState} from "react";
import { Box, Button, styled} from "@mui/material";
import Login from "./login";
import Signup from "./signup";

const ComponentStyles = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
    padding: 20px;
    box-shadow: 5px 5px 10px  2px rgba(88, 88, 88, 0.5);
` ;

const Image = styled('img')({
    width: 200,
    display: 'flex',
    margin: 'auto',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
    padding: 20px;
    display: flex;
    flex: 1;
    flex-direction: column;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const LoginButton = styled(Button)`
    margin: 10px 20px;
    background-color: #0e244;
    box-shadow: 5px 5px 10px  2px rgba(88, 88, 88, 0.5);
`;

const Acccout = ({ setIsAuthenticated }) => {

    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, setAccount] = useState('login');

    const handleAccountChange = () => {
        account === 'login' ? setAccount('signup') : setAccount('login');
    }

    return (
        <ComponentStyles>
            <Box>

                <Image src={imageURL} alt="Login" />
                <Wrapper>
                {
                    account === 'login' ?
                        <>
                            <Login setIsAuthenticated={setIsAuthenticated} />
                            <LoginButton variant="outlined" onClick={() => handleAccountChange()}>Create an Account</LoginButton>
                        </>
                        :
                        <>
                            <Signup setIsAuthenticated={setIsAuthenticated} />
                            <LoginButton variant="outlined" onClick={() => handleAccountChange()}>Already Have an Account</LoginButton>
                        </>
                }
                </Wrapper>
            </Box>
        </ComponentStyles>
    );
}

export default Acccout;