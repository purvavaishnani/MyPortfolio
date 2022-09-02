import { createContext } from 'react';

export type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userId : String;
};
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;