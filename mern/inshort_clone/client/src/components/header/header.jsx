import { AppBar, Box, Toolbar, Typography, styled } from '@mui/material';
import { Article } from '@mui/icons-material';
const StyledHeader = styled(AppBar)`
    background-color: #f5f5f5;
    color: #000;
    height: 64px;
    margin-bottom: 20px;
    `;


const ArticleIcon = styled(Box)`
    display: flex;
    align-items: center;
    color: #000;
    margin:auto;
    font-size: 2.5rem;
`;


const Header = () => {
    return (
        <StyledHeader position="static">
            <Toolbar>
                <ArticleIcon>
                    <Article style={{ fontSize: '3.5rem', color: 'red' }} />
                    <Typography variant="h6" color="inherit">
                        Read News
                    </Typography>
                </ArticleIcon>

            </Toolbar>
        </StyledHeader>
    );

}

export default Header;