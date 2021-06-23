import React from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';
import { Text } from 'react-native';

interface CategoryProps extends RectButtonProps {
	title: string;
	icon: React.FC<SvgProps>;
	hasCheckBox?: boolean;
	checked?: boolean;
}

export const Category = ({
	title,
	icon: Icon,
	checked,
	hasCheckBox = false,
	...rest
}: CategoryProps) => {
	const { secondary40, secondary50, secondary70, secondary75 } = theme.colors;

	return (
		<RectButton {...rest}>
			<LinearGradient
				style={styles.container}
				colors={[secondary50, secondary70]}
			>
				<LinearGradient
					colors={[checked ? secondary75 : secondary50, secondary40]}
					style={[styles.content, { opacity: checked ? 1 : 0.5 }]}
				>
					{hasCheckBox && (
						<View style={checked ? styles.checked : styles.unchecked} />
					)}
					<Icon width={48} height={48} />
					<Text style={styles.title}>{title}</Text>
				</LinearGradient>
			</LinearGradient>
		</RectButton>
	);
};
