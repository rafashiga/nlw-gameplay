import React from 'react';
import { View, Text } from 'react-native';

import { Avatar } from '../Avatar';

import { styles } from './styles';

export const Profile = () => {
	return (
		<View style={styles.container}>
			<Avatar urlImage='https://images.unsplash.com/profile-1608037205070-e47e53995a43image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff' />
			<View>
				<View style={styles.user}>
					<Text style={styles.greeting}>Olá,</Text>
					<Text style={styles.username}>Rafael</Text>
				</View>
				<Text style={styles.message}>Hoje é dia de vitória</Text>
			</View>
		</View>
	);
};
