import { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) alert(error.message)
        else alert('Logged in!')
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button onClick={signIn}>Sign In</button>
        </div>
    )
}
