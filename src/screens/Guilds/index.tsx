import React from 'react';
import { View, FlatList } from 'react-native';

import { Guild, IGuild, ListDivider } from '../../components';

import { styles } from './styles';

interface GuildsProps {
	handleGuildSelected: (guild: IGuild) => void;
}

export const Guilds = ({ handleGuildSelected }: GuildsProps) => {
	const guilds = [
		{
			id: '1',
			name: 'Lendários',
			icon: 'aa.png',
			owner: true,
		},
		{
			id: '2',
			name: 'Lendários',
			icon: 'aa.png',
			owner: true,
		},
	];

	return (
		<View style={styles.container}>
			<FlatList
				data={guilds}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Guild data={item} onPress={() => handleGuildSelected(item)} />
				)}
				ItemSeparatorComponent={() => (
					<View style={styles.divider}>
						<ListDivider />
					</View>
				)}
				showsVerticalScrollIndicator={false}
				style={styles.guilds}
			/>
		</View>
	);
};
