import React from 'react';
import {
	View,
	TouchableOpacity,
	TouchableOpacityProps,
	Text,
	Image,
} from 'react-native';

import DiscordImg from '../../assets/discord.png';
import { styles } from './styles';

interface ButtonIconProps extends TouchableOpacityProps {
	title: string;
}

export const ButtonIcon = ({ title, ...rest }: ButtonIconProps) => {
	return (
		<TouchableOpacity style={styles.container} {...rest}>
			<View style={styles.iconWrapper}>
				<Image source={DiscordImg} style={styles.icon} />
			</View>
			<Text style={styles.title}>{title}</Text>
		</TouchableOpacity>
	);
};
