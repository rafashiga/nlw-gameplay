import React from 'react';
import { View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
	title: string;
	action?: React.ReactNode;
}

export const Header = ({ title, action }: HeaderProps) => {
	const { secondary100, secondary40, heading } = theme.colors;
	const navigation = useNavigation();

	const handleGoBock = () => {
		navigation.goBack();
	};

	return (
		<LinearGradient
			style={styles.container}
			colors={[secondary100, secondary40]}
		>
			<BorderlessButton onPress={handleGoBock}>
				<Feather name='arrow-left' size={24} color={heading} />
			</BorderlessButton>
			<Text style={styles.title}>{title}</Text>
			{action && <View>{action}</View>}
		</LinearGradient>
	);
};
