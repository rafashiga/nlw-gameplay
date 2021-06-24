import React, { createContext, useContext, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import {
	CLIENT_ID,
	SCOPE,
	CDN_IMAGE,
	REDIRECT_URL,
	RESPONSE_TYPE,
} from '../configs';
import { api } from '../services/api';

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
	loading: boolean;
	signIn: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthorizationResponse = AuthSession.AuthSessionResult & {
	params: {
		access_token: string;
	};
};

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
	const [user, setUser] = useState({} as IUser);
	const [loading, setLoading] = useState(false);

	const signIn = async () => {
		try {
			setLoading(true);

			const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
			const { type, params } = (await AuthSession.startAsync({
				authUrl,
			})) as AuthorizationResponse;

			if (type === 'success') {
				api.defaults.headers.authorization = `Bearer ${params.access_token}`;

				const userInfo = await api.get('/users/@me');

				console.log(userInfo);

				const firstName = userInfo.data.username.split(' ')[0];
				userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

				setUser({
					...userInfo.data,
					firstName,
					token: params.access_token,
				});

				setLoading(false);
			} else {
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			console.log(error);
			throw new Error('Não foi possível autenticar');
		}
	};

	return (
		<AuthContext.Provider value={{ user, loading, signIn }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);

	return context;
};

export { AuthProvider, useAuth };
