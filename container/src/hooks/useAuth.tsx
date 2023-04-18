import { useEffect, useState } from "react";

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");


  useEffect(() => {
    const getUserName = async () => {

      try {
        // Call backend API for password change logic
        const response = await fetch("/api/Authenticate/userName", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token") || ''}`
          },
        });

        if (response.ok) {
          const { userName } = await response.json();
          setUserName(userName);
        }
      } catch (error) {
        console.error('Failed to call API:', error);
      }
    }
    getUserName();
  }, [])


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  return { isAuth, userName };
}
