import * as React from 'react';
import axios from 'axios';

interface Auth {
  authed: boolean;
  login: (detail: LoginInfo) => Promise<boolean>;
  logout: () => void;
}

export interface LoginInfo {
  email: string,
  password: string
}

interface AuthContext {
  authed: boolean;
  login: (details: LoginInfo) => Promise<boolean>;
  logout: () => Promise<void>;
}

const authContext = React.createContext<AuthContext>({
  authed: false,
  login: async () => { return false},
  logout: async () => {}
});

function useAuth(): AuthContext {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login: async ({email, password}) => {
      try {
        const authenticateResult = await axios.post(
          '/wa/login',
          {
            email, 
            password: password 
          }
        );
        if (authenticateResult) {
          setAuthed(true);
          return true;
        }
        return false;
      } catch (err) {
        setAuthed(false);
        return false;
      }
    },
    logout: async () => {
      setAuthed(false); 
      await axios.get(
        '/wa/logout'
      )
    }
  };
}

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function AuthConsumer() {
  return React.useContext(authContext);
}