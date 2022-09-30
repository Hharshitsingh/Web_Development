import React, {useRef, useState} from 'react';
import { Form, Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../Contexts/AuthContext';

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

   async function handleSubmit(e) {
        e.preventDefault();
        if(passwordRef.current.value !== confirmPasswordRef.current.value) {
            return setError('Passwords do not match');
        }
        try{
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        }
        catch(error) {
            setError('Failed to sign');
        }
        setLoading(false);

    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Signup</h2>
                    {error &&<Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group Id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group Id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group Id="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required />
                        </Form.Group>
                        <Button disabled={loading} className = "w-100" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>


                </Card.Body>
            </Card>
            <div>
                <div className="w-100 text-center mt-2">
                    Already have an account? Login
                </div>

            </div>
        </>
    )
}
