import { useMemo, useState } from 'react';
import authContext from './context';
import { login } from '../utils/login';

export default function Provider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setTokensUserAndLogIn = (data) => {
    window.localStorage.setItem(
      'auth-token',
      JSON.stringify({
        token: data,
      })
    );
    setUser(data.data);
    setIsLoggedIn(true);
  };

  const logOutAndDeleteToken = () => {
    window.localStorage.removeItem('auth-token');
    setIsLoggedIn(false);
    setUser(null);
    window.location.reload();
    return;
  };

  const onLogIn = async () => {
    const userRes = await login();
    setTokensUserAndLogIn(userRes);
  };

  const onLogOut = () => {
    // const authTokens = JSON.parse(window.localStorage.getItem('auth-tokens'));
    // Delete the user using the token
    logOutAndDeleteToken();
  };

  const fetchCurrentUser = () => {
    const authToken = JSON.parse(window.localStorage.getItem('auth-token'));
    if (authToken) {
      setIsLoggedIn(true);
    }
    return;
  };
  // There should also be a user check on reboot. I didn’t write it because we have no requests.

  const providerValue = useMemo(() => {
    return {
      user,
      setUser,
      onLogIn,
      onLogOut,
      isLoggedIn,
      setIsLoggedIn,
      fetchCurrentUser,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLogIn, user, setUser]);

  return (
    <authContext.Provider value={providerValue}>
      {children}
    </authContext.Provider>
  );
}
