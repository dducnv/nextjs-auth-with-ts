import { useRouter } from 'next/router';
import * as React from 'react';
import AuthLayout from '../components/Layout/AuthLayout';
import { useAuth } from '../hooks/use-auth';

export interface IAuthPageProps {
}

export default function AuthPage(props: IAuthPageProps) {
    const router = useRouter();
    const { profile, logout } = useAuth();
    async function handleLogout() {
        try {
            await logout();
            router.push('/');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthLayout>
            Wellcome {JSON.stringify(profile?.name || {})}
            <button onClick={handleLogout}>Logout</button>
        </AuthLayout>
    );
}
