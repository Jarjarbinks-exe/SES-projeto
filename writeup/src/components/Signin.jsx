import React from 'react';
import { useState } from 'react';
import { UserAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { session, signIn } = UserAuth();
    const navigate = useNavigate();
    console.log(session);

    const handle_Signin = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        signIn(email, password)
            .then(() => {
                console.log('User signed in successfully');
                navigate('/home');
            })
            .catch((error) => {
                console.error('Error signing in:', error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={handle_Signin}>
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
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Signin;