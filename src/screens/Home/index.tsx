import React, { useState, useCallback } from 'react';
import { View, FlatList, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import {
	Profile,
	ButtonAdd,
	Background,
	CategorySelect,
	ListHeader,
	ListDivider,
	Appointment,
	IAppointment,
	Loading,
} from '../../components';
import { COLLECTION_APPOINTMENTS } from '../../configs';

import { styles } from './styles';
import { useEffect } from 'react';

export const Home = () => {
	const [category, setCategory] = useState('');
	const [loading, setLoading] = useState(true);
	const [appointments, setAppointments] = useState<IAppointment[]>([]);
	const navigation = useNavigation();

	const handleCategorySelect = (categoryId: string) => {
		categoryId === category ? setCategory('') : setCategory(categoryId);
	};

	const handleAppointmentDetails = (appointmentSelected: IAppointment) => {
		navigation.navigate('AppointmentDetails', {
			appointmentSelected,
		});
	};

	const handleAppointmentCreate = () => {
		navigation.navigate('AppointmentCreate');
	};

	const getAppointments = async () => {
		const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
		const appointmentsData: IAppointment[] = storage ? JSON.parse(storage) : [];

		if (category) {
			setAppointments(
				appointmentsData.filter((item) => item.category === category)
			);
		} else {
			setAppointments(appointmentsData);
		}

		setLoading(false);
	};

	useFocusEffect(
		useCallback(() => {
			getAppointments();
		}, [category])
	);

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

			{loading ? (
				<Loading />
			) : (
				<>
					<ListHeader
						title='Partidas agendadas'
						subtitle={`Total ${appointments.length}`}
					/>
					<FlatList
						data={appointments}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Appointment
								data={item}
								onPress={() => handleAppointmentDetails(item)}
							/>
						)}
						ItemSeparatorComponent={() => <ListDivider />}
						contentContainerStyle={{ paddingBottom: 69 }}
						style={styles.matches}
						showsVerticalScrollIndicator={false}
					/>
				</>
			)}
		</Background>
	);
};
