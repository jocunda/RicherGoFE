import { useEffect, useState } from "react";


export function useAuth() {
    const [user, setUser] = useState<string>("");
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user));
            setIsAuth(true);
        } else {
            setUser("");
            setIsAuth(false);
        }
    }, []);
    return { user, isAuth }
}