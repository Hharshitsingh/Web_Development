import './App.css';
import Signup from './Components/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './Contexts/AuthContext';
import Login from './Components/login';

function App() {
  return (
    <>
      <AuthProvider>
        <Container ClassName="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Signup />
          </div>
        </Container>
      </AuthProvider>
    </>
  );
}

export default App;
