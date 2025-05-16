import { useEffect, useState } from 'react';
import { UserAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom';

export default function DocumentList() {
    const { supabase } = UserAuth();
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (userError || !user) {
                alert('You must be logged in.');
                return;
            }

            const { data, error } = await supabase
                .from('documents')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching documents:', error.message);
            } else {
                setDocuments(data);
            }

            setLoading(false);
        };

        fetchDocuments();
    }, [supabase]);

    return (
        <div>
            <h2>Documents</h2>
            {loading ? (
                <p>Loading...</p>
            ) : documents.length === 0 ? (
                <p>No documents found.</p>
            ) : (
                <ul>
                    {documents.map((doc) => (
                        <li key={doc.id}>
                            <Link to={`/document/${doc.id}`}>{doc.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
