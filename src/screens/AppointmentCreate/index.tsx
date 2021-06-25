import React, { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import {
	Background,
	Header,
	CategorySelect,
	GuildIcon,
	SmallInput,
	TextArea,
	Button,
	ModalView,
	IGuild,
} from '../../components';

import { Guilds } from '../Guilds';
import { COLLECTION_APPOINTMENTS } from '../../configs';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export const AppointmentCreate = () => {
	const [category, setCategory] = useState('');
	const [openGuildsModal, setOpenGuildsModal] = useState(false);
	const [guild, setGuild] = useState<IGuild>({} as IGuild);

	const [day, setDay] = useState('');
	const [month, setMonth] = useState('');
	const [hour, setHour] = useState('');
	const [minute, setMinute] = useState('');
	const [description, setDescription] = useState('');

	const navigation = useNavigation();

	const handleOpenGuildsModal = () => {
		setOpenGuildsModal(true);
	};

	const handleCloseGuildsModal = () => {
		setOpenGuildsModal(false);
	};

	const handleGuildSelected = (guildSelected: IGuild) => {
		setGuild(guildSelected);
		setOpenGuildsModal(false);
	};

	const handleCategorySelect = (categoryId: string) => {
		setCategory(categoryId);
	};

	const handleSave = async () => {
		const newAppointment = {
			id: uuid.v4(),
			guild,
			category,
			date: `${day}/${month} às ${hour}:${minute}h`,
			description,
		};

		const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
		const appointments = storage ? JSON.parse(storage) : [];

		await AsyncStorage.setItem(
			COLLECTION_APPOINTMENTS,
			JSON.stringify([...appointments, newAppointment])
		);

		navigation.navigate('Home');
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<Background>
				<ScrollView>
					<Header title='Agendar partida' />
					<Text
						style={[
							styles.label,
							{ marginLeft: 24, marginTop: 36, marginBottom: 12 },
						]}
					>
						Categoria
					</Text>
					<CategorySelect
						hasCheckBox
						setCategory={handleCategorySelect}
						categorySelected={category}
					/>
					<View style={styles.form}>
						<RectButton onPress={handleOpenGuildsModal}>
							<View style={styles.select}>
								{guild.icon ? (
									<GuildIcon guildId={guild.id} iconId={guild.icon} />
								) : (
									<View style={styles.image} />
								)}

								<View style={styles.selectBody}>
									<Text style={styles.label}>
										{guild.name ? guild.name : 'Selecione um servidor'}
									</Text>
								</View>
								<Feather
									name='chevron-right'
									color={theme.colors.heading}
									size={18}
								/>
							</View>
						</RectButton>
						<View style={styles.field}>
							<View>
								<Text style={[styles.label, { marginBottom: 12 }]}>
									Dia e mês
								</Text>

								<View style={styles.column}>
									<SmallInput maxLength={2} onChangeText={setDay} />
									<Text style={styles.divider}>/</Text>
									<SmallInput maxLength={2} onChangeText={setMonth} />
								</View>
							</View>

							<View>
								<Text style={[styles.label, { marginBottom: 12 }]}>
									Hora e minuto
								</Text>

								<View style={styles.column}>
									<SmallInput maxLength={2} onChangeText={setHour} />
									<Text style={styles.divider}>:</Text>
									<SmallInput maxLength={2} onChangeText={setMinute} />
								</View>
							</View>
						</View>
						<View style={[styles.field, { marginBottom: 12 }]}>
							<Text style={styles.label}>Descrição</Text>
							<Text style={styles.maxLength}>Max 100 caracteres</Text>
						</View>
						<TextArea
							multiline
							maxLength={100}
							numberOfLines={5}
							autoCorrect={false}
							onChangeText={setDescription}
						/>
						<View style={styles.footer}>
							<Button title='Agendar' onPress={handleSave} />
						</View>
					</View>
				</ScrollView>
			</Background>

			<ModalView closeModal={handleCloseGuildsModal} visible={openGuildsModal}>
				<Guilds handleGuildSelected={handleGuildSelected} />
			</ModalView>
		</KeyboardAvoidingView>
	);
};
