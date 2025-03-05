"use client";

import { SessionProvider as AuthSessionProvider } from "next-auth/react";

interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionProvider = ({ children }: SessionProviderProps) => {
    return (
        <AuthSessionProvider>
            {children}
        </AuthSessionProvider>
    );
};

export default SessionProvider;