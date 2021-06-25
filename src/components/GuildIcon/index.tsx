import React from 'react';
import { Image, View } from 'react-native';

import DiscordSvg from '../../assets/discord.svg';
import { styles } from './styles';

interface GuildIconProps {
	guildId: string;
	iconId: string | null;
}

export const GuildIcon = ({ guildId, iconId }: GuildIconProps) => {
	const uri = `${process.env.CDN_IMAGE}/icons/${guildId}/${iconId}.png`;

	return (
		<View style={styles.container}>
			{iconId ? (
				<Image source={{ uri }} style={styles.image} resizeMode='cover' />
			) : (
				<DiscordSvg width={40} height={40} />
			)}
		</View>
	);
};
