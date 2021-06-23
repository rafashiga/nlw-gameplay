import React from 'react';
import { Text, View } from 'react-native';

import { Avatar } from '../Avatar';
import { theme } from '../../global/styles/theme';

import { styles } from './styles';

export interface IMember {
	id: string;
	username: string;
	avatar_url: string;
	status: string;
}

interface MemberProps {
	data: IMember;
}

export const Member = ({ data }: MemberProps) => {
	const isOnline = data.status === 'online';
	const { on, primary } = theme.colors;

	return (
		<View style={styles.container}>
			<Avatar urlImage={data.avatar_url} />
			<View style={styles.content}>
				<Text style={styles.title}>{data.username}</Text>
				<View style={styles.status}>
					<View
						style={[
							styles.bulletStatus,
							{ backgroundColor: isOnline ? on : primary },
						]}
					/>
					<Text style={styles.nameStatus}>
						{isOnline ? 'Disponível' : 'Ocupado'}
					</Text>
				</View>
			</View>
		</View>
	);
};
