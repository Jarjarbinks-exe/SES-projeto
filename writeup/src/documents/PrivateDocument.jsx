import React from "react";
import { UserAuth } from "../auth/AuthContext";
import { useSearchParams } from "react-router-dom";

const PrivateDocument = ({ children }) => {
    const { supabase } = UserAuth();
    const [searchParams] = useSearchParams();
    const documentId = searchParams.get("id");

    const [document, setDocument] = React.useState(null);
    const [docLoading, setDocLoading] = React.useState(true);

    const [user, setUser] = React.useState(null);
    const [userLoading, setUserLoading] = React.useState(true);

    // Fetch the authenticated user
    React.useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            setUser(data?.user ?? null); // null if not logged in
            setUserLoading(false);
        };
        fetchUser();
    }, [supabase]);

    // Fetch the document
    React.useEffect(() => {
        const fetchDocument = async () => {
            const { data, error } = await supabase
                .from("documents")
                .select("*")
                .eq("id", documentId)
                .single();

            if (error) {
                console.error("Error fetching document:", error);
                setDocument(null);
            } else {
                setDocument(data);
            }
            setDocLoading(false);
        };

        if (documentId) {
            fetchDocument();
        } else {
            setDocLoading(false);
        }
    }, [supabase, documentId]);

    // Wait for loading to finish
    if (userLoading || docLoading) {
        return <div>Loading...</div>;
    }

    // If no document found
    if (!document) {
        return <div>Document not found.</div>;
    }

    // Access logic
    const isOwner = user && document.owner === user.id;
    const isPublic = document.is_public;

    if (isPublic || isOwner) {
        return <>{children}</>;
    }

    return <div>You do not have permission to view this document.</div>;
};

export default PrivateDocument;
