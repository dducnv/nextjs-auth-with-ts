import useSWR from "swr";
import { PublicConfiguration } from "swr/dist/types";
import { authApi } from "../api-config/authApi";

export function useAuth(option?: Partial<PublicConfiguration>) {
    const { data: profile, error, mutate } = useSWR('/auth/me/info', {
        dedupingInterval: 60 * 60 * 1000,
        revalidateOnFocus: false,
        ...option
    })
    console.log(profile, error)
    const fistLoading = profile === undefined && error === undefined

    async function login() {
        await authApi.login({
            email: "duc@gmail.com",
            password: "dduc0712"
        });
        await mutate();
    }

    async function logout() {
        await authApi.logout();
        await mutate({}, false);
    }

    return {
        fistLoading,
        profile,
        error,
        login,
        logout
    }
}