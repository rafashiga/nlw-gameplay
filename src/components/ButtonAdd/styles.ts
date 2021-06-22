import { Background } from './../Background/index';
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
	container: {
		height: 48,
		width: 48,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		backgroundColor: theme.colors.primary,
	},
});
