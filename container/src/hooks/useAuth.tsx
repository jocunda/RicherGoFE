import { useEffect, useState } from "react";

import { setCookie } from '@mimo/utils'

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");


  useEffect(() => {
    const getUserName = async () => {

      try {
        const cookieString = document.cookie; // Get cookie string

        const token = cookieString
          .split(';')
          .map(cookie => cookie.trim())
          .find(cookie => cookie.startsWith('token='))
          ?.split('=')[1]; // Extract token value from cookie string

        // Call backend API for password change logic
        const response = await fetch("/api/Authenticate/userName", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || ''}`
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
    // Get cookie string
    const cookieString = document.cookie;
    // Extract token value from cookie string
    const token = cookieString
      .split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith('token='))
      ?.split('=')[1];


    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  return { isAuth, userName };
}
