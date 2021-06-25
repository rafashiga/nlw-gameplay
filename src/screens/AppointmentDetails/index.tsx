import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { View, ImageBackground, Text, FlatList, Alert } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
	Background,
	ButtonIcon,
	Header,
	ListHeader,
	ListDivider,
	Member,
	IAppointment,
	IMember,
	Loading,
} from '../../components';
import { api } from '../../services/api';

import BannerImg from '../../assets/banner.png';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface IParams {
	appointmentSelected: IAppointment;
}

interface IGuildWidget {
	id: string;
	name: string;
	instant_invite: string;
	members: IMember[];
}

export const AppointmentDetails = () => {
	const [widget, setWidget] = useState<IGuildWidget>({} as IGuildWidget);
	const [loading, setLoading] = useState(true);
	const route = useRoute();
	const { appointmentSelected } = route.params as IParams;

	const getGuildWidget = async () => {
		try {
			const response = await api.get(
				`/guilds/${appointmentSelected.guild.id}/widget.json`
			);

			setWidget(response.data);
			setLoading(false);
		} catch (error) {
			Alert.alert(
				'Verifique as configurações do servidor: Será que o Widget está habilitado?'
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getGuildWidget();
	}, []);

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
					<Text style={styles.title}>{appointmentSelected.guild.name}</Text>
					<Text style={styles.subtitle}>{appointmentSelected.description}</Text>
				</View>
			</ImageBackground>
			{loading ? (
				<Loading />
			) : (
				<>
					<ListHeader
						title='Jogadores'
						subtitle={`Total ${widget.members.length}`}
					/>
					<FlatList
						data={widget.members}
						keyExtractor={(item) => item.id}
						ItemSeparatorComponent={() => <ListDivider isCentered />}
						renderItem={({ item }) => <Member data={item} />}
						style={styles.members}
					/>
				</>
			)}

			<View style={styles.footer}>
				<ButtonIcon title='Entrar na partida' />
			</View>
		</Background>
	);
};
