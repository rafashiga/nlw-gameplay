import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

interface BackgroundProps {
	children: React.ReactNode;
}

export const Background = ({ children }: BackgroundProps) => {
	const { secondary80, secondary100 } = theme.colors;

	return (
		<LinearGradient
			style={styles.container}
			colors={[secondary80, secondary100]}
		>
			{children}
		</LinearGradient>
	);
};
