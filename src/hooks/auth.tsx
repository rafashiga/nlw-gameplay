import React, { createContext, useContext, useState } from 'react';

interface IUser {
	id: string;
	username: string;
	firstName: string;
	avatar: string;
	email: string;
	token: string;
}

interface AuthContextData {
	user: IUser;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState({} as IUser);

	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);

	return context;
};

export { AuthProvider, useAuth };
