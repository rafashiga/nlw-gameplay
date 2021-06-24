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
		{
			id: '3',
			name: 'Lendários',
			icon: 'aa.png',
			owner: true,
		},
		{
			id: '4',
			name: 'Lendários',
			icon: 'aa.png',
			owner: true,
		},
		{
			id: '5',
			name: 'Lendários',
			icon: 'aa.png',
			owner: true,
		},
		{
			id: '6',
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
				ItemSeparatorComponent={() => <ListDivider isCentered />}
				ListHeaderComponent={() => <ListDivider isCentered />}
				contentContainerStyle={{ paddingBottom: 69, paddingTop: 103 }}
				showsVerticalScrollIndicator={false}
				style={styles.guilds}
			/>
		</View>
	);
};
