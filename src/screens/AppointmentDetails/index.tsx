import React from 'react';
import { View, ImageBackground, Text, FlatList } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
	Background,
	ButtonIcon,
	Header,
	ListHeader,
	ListDivider,
	Member,
} from '../../components';

import BannerImg from '../../assets/banner.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

export const AppointmentDetails = () => {
	const members = [
		{
			id: '1',
			username: 'Rafael',
			avatar_url:
				'https://images.unsplash.com/profile-1608037205070-e47e53995a43image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff',
			status: 'online',
		},
		{
			id: '2',
			username: 'Rafael',
			avatar_url:
				'https://images.unsplash.com/profile-1608037205070-e47e53995a43image?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff',
			status: 'offline',
		},
	];

	return (
		<Background>
			<Header
				title='Detalhes'
				action={
					<BorderlessButton>
						<Fontisto name='share' size={24} color={theme.colors.primary} />
					</BorderlessButton>
				}
			/>
			<ImageBackground source={BannerImg} style={styles.banner}>
				<View style={styles.bannerContent}>
					<Text style={styles.title}>Lendários</Text>
					<Text style={styles.subtitle}>
						É hoje que vamos chegar ao challenger sem perder uma partida da md10
					</Text>
				</View>
			</ImageBackground>
			<ListHeader title='Jogadores' subtitle='total 3'></ListHeader>
			<FlatList
				data={members}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <ListDivider />}
				renderItem={({ item }) => <Member data={item} />}
				style={styles.members}
			/>
			<View style={styles.footer}>
				<ButtonIcon title='Entrar na partida' />
			</View>
		</Background>
	);
};
