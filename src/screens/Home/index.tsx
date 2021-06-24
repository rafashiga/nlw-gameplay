import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
	Profile,
	ButtonAdd,
	Background,
	CategorySelect,
	ListHeader,
	ListDivider,
	Appointment,
	IAppointment,
} from '../../components';

import { styles } from './styles';

export const Home = () => {
	const [category, setCategory] = useState('');
	const navigation = useNavigation();

	const appoinments: IAppointment[] = [
		{
			id: '1',
			guild: {
				id: '1',
				name: 'Lendários',
				icon: '',
				owner: true,
			},
			category: '1',
			date: '22/06 às 20:40h',
			description:
				'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
		},
		{
			id: '2',
			guild: {
				id: '1',
				name: 'Lendários',
				icon: '',
				owner: false,
			},
			category: '1',
			date: '22/06 às 20:40h',
			description:
				'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
		},
	];

	const handleCategorySelect = (categoryId: string) => {
		categoryId === category ? setCategory('') : setCategory(categoryId);
	};

	const handleAppointmentDetails = () => {
		navigation.navigate('AppointmentDetails');
	};

	const handleAppointmentCreate = () => {
		navigation.navigate('AppointmentCreate');
	};

	return (
		<Background>
			<View style={styles.header}>
				<Profile />
				<ButtonAdd onPress={handleAppointmentCreate} />
			</View>
			<CategorySelect
				categorySelected={category}
				setCategory={handleCategorySelect}
			/>
			<ListHeader title='Partidas agendadas' subtitle='Total 6' />
			<FlatList
				data={appoinments}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Appointment data={item} onPress={handleAppointmentDetails} />
				)}
				ItemSeparatorComponent={() => <ListDivider />}
				contentContainerStyle={{ paddingBottom: 69 }}
				style={styles.matches}
				showsVerticalScrollIndicator={false}
			/>
		</Background>
	);
};
