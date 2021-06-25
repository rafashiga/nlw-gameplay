import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { View, FlatList } from 'react-native';

import { Guild, IGuild, ListDivider, Loading } from '../../components';
import { api } from '../../services/api';

import { styles } from './styles';

interface GuildsProps {
	handleGuildSelected: (guild: IGuild) => void;
}

export const Guilds = ({ handleGuildSelected }: GuildsProps) => {
	const [guilds, setGuilds] = useState<IGuild[]>([]);
	const [loading, setLoading] = useState(true);

	const getGuilds = async () => {
		try {
			const response = await api.get('/users/@me/guilds');
			if (response) {
				setGuilds(response.data);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getGuilds();
	});

	return (
		<View style={styles.container}>
			{loading ? (
				<Loading />
			) : (
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
			)}
		</View>
	);
};
