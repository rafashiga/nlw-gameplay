import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { IGuild } from '../Guild';
import { GuildIcon } from '../GuildIcon';
import { categories } from '../../utils/categories';
import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export interface IAppointment {
	id: string;
	guild: IGuild;
	category: string;
	date: string;
	description: string;
}

interface AppointmentProps extends RectButtonProps {
	data: IAppointment;
}

export const Appointment = ({ data, ...rest }: AppointmentProps) => {
	const { secondary50, secondary70 } = theme.colors;
	const [category] = categories.filter((item) => item.id === data.category);
	const { owner } = data.guild;
	const { primary, on } = theme.colors;

	return (
		<RectButton {...rest}>
			<View style={styles.container}>
				<LinearGradient
					style={styles.guildIconContainer}
					colors={[secondary50, secondary70]}
				>
					<GuildIcon iconId={data.guild.icon} guildId={data.guild.id} />
				</LinearGradient>
				<View style={styles.content}>
					<View style={styles.header}>
						<Text style={styles.title}>{data.guild.name}</Text>
						<Text style={styles.category}>{category.title}</Text>
					</View>
					<View style={styles.footer}>
						<View style={styles.dateInfo}>
							<CalendarSvg />
							<Text style={styles.date}>{data.date}</Text>
						</View>
						<View style={styles.playersInfo}>
							<PlayerSvg fill={owner ? primary : on} />
							<Text style={[styles.player, { color: owner ? primary : on }]}>
								{owner ? 'Anfitrião' : 'Visitante'}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</RectButton>
	);
};
