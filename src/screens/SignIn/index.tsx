import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { ButtonIcon, Background } from '../../components';

import IllustrationImg from '../../assets/illustration.png';
import { styles } from './styles';

export const SignIn = () => {
	const { user } = useAuth();
	const navigation = useNavigation();

	const handleSignIn = () => {
		navigation.navigate('Home');
	};

	return (
		<Background>
			<View style={styles.container}>
				<Image
					source={IllustrationImg}
					style={styles.image}
					resizeMode='stretch'
				/>
				<View style={styles.content}>
					<Text style={styles.title}>
						Conecte-se {`\n`} e organize suas {`\n`} jogatinas
					</Text>
					<Text style={styles.subtitle}>
						Crie grupos para jogar seus games {`\n`} favoritos com seus amigos
					</Text>
					<ButtonIcon title='Entrar com Discord' onPress={handleSignIn} />
				</View>
			</View>
		</Background>
	);
};
