import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import {
	View,
	ImageBackground,
	Text,
	FlatList,
	Alert,
	Share,
} from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import * as Linking from 'expo-linking';

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
import { Platform } from 'react-native';

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

	const handleShareInvitation = () => {
		const message =
			Platform.OS === 'ios'
				? `Junte-se a ${appointmentSelected.guild.name}`
				: widget.instant_invite;

		Share.share({
			message,
			url: widget.instant_invite,
		});
	};

	const handleOpenGuild = () => {
		Linking.openURL(widget.instant_invite);
	};

	useEffect(() => {
		getGuildWidget();
	}, []);

	return (
		<Background>
			<Header
				title='Detalhes'
				action={
					widget.instant_invite && (
						<BorderlessButton>
							<Fontisto
								name='share'
								size={24}
								color={theme.colors.primary}
								onPress={handleShareInvitation}
							/>
						</BorderlessButton>
					)
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
						subtitle={`Total ${widget.members?.length ?? 0}`}
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

			{widget.instant_invite && (
				<View style={styles.footer}>
					<ButtonIcon onPress={handleOpenGuild} title='Entrar na partida' />
				</View>
			)}
		</Background>
	);
};
