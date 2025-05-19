import React from 'react';
import { useState } from 'react';
import { UserAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { session, signUp } = UserAuth();
    const navigate = useNavigate();
    console.log(session);

    const handle_Signup = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        signUp(email, password)
            .then(() => {
                console.log('User signed up successfully');
                navigate('/home');
            })
            .catch((error) => {
                console.error('Error signing up:', error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });

    };


    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handle_Signup}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Signup;