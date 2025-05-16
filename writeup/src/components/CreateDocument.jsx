import { useState } from 'react';
import { UserAuth } from '../auth/AuthContext';

export default function Document() {
    const { supabase } = UserAuth();
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateDocument = async () => {
        setLoading(true);

        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
            alert('You must be logged in.');
            setLoading(false);
            return;
        }

        if (!title) {
            alert('Please enter a document title.');
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('documents')
            .insert([{ title, owner: user.id }])
            .select()
            .single();

        if (error) {
            alert('Error creating document: ' + error.message);
        } else {
            alert('Document created!');
        }

        setLoading(false);
    };

    return (
        <div>
            <h2>Create a New Document</h2>
            <input
                type="text"
                placeholder="Document Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleCreateDocument} disabled={loading}>
                {loading ? 'Creating...' : 'Create Document'}
            </button>
        </div>
    );
}
