import React from 'react';
import {
	TouchableOpacity,
	TouchableOpacityProps,
	View,
	Text,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import { GuildIcon } from '../GuildIcon';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export interface IGuild {
	id: string;
	name: string;
	icon: string | null;
	owner: boolean;
}

interface GuildProps extends TouchableOpacityProps {
	data: IGuild;
}

export const Guild = ({ data, ...rest }: GuildProps) => {
	return (
		<TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
			<GuildIcon />
			<View style={styles.content}>
				<Text style={styles.title}>{data.name}</Text>
				<Text style={styles.type}>
					{data.owner ? 'Administrador' : 'Convidado'}
				</Text>
			</View>
			<Feather name='chevron-right' color={theme.colors.heading} />
		</TouchableOpacity>
	);
};
