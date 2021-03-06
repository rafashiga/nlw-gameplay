import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import { api } from '../services/api';
import { COLLECTION_USERS } from '../configs';

const { CLIENT_ID } = process.env;
const { SCOPE } = process.env;
const { CDN_IMAGE } = process.env;
const { REDIRECT_URL } = process.env;
const { RESPONSE_TYPE } = process.env;

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
	signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

type AuthorizationResponse = AuthSession.AuthSessionResult & {
	params: {
		access_token?: string;
		error?: string;
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

			if (type === 'success' && !params.error) {
				api.defaults.headers.authorization = `Bearer ${params.access_token}`;

				const userInfo = await api.get('/users/@me');

				const firstName = userInfo.data.username.split(' ')[0];
				userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

				const userData = {
					...userInfo.data,
					firstName,
					token: params.access_token,
				};

				await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));

				setUser(userData);
			}
		} catch (error) {
			console.log(error);
			throw new Error('N??o foi poss??vel autenticar');
		} finally {
			setLoading(false);
		}
	};

	const signOut = () => {
		setUser({} as IUser);
		AsyncStorage.removeItem(COLLECTION_USERS);
	};

	const loadUserStorageData = async () => {
		const storage = await AsyncStorage.getItem(COLLECTION_USERS);

		if (storage) {
			const userLogged = JSON.parse(storage);
			api.defaults.headers.authorization = `Bearer ${userLogged.token}`;

			setUser(userLogged);
		}
	};

	useEffect(() => {
		loadUserStorageData();
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signOut }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = () => {
	const context = useContext(AuthContext);

	return context;
};

export { AuthProvider, useAuth };
