import Header from "./components/header/header";
import Articles from "./components/articles/articles";
import { Box, styled } from '@mui/material';

const Container = styled(Box)(({ theme }) => ({
  width: '69%',
  margin: '50px auto 0 auto',
  [theme.breakpoints.down('md')]: {
    width: '79%'
  },
  [theme.breakpoints.down('sm')]: {
    width: '90%'
  }
}));

function App() {
  return (
    <Box>
    <Header />
    <Container>
      <Articles />
    </Container>
  </Box>
  );
}

export default App;
