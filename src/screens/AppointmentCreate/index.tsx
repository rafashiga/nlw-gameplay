import React, { useState } from 'react';
import {
	View,
	Text,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import {
	Background,
	Header,
	CategorySelect,
	GuildIcon,
	SmallInput,
	TextArea,
	Button,
} from '../../components';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export const AppointmentCreate = () => {
	const [category, setCategory] = useState('');
	const [server, setServer] = useState('');
	const handleCategorySelect = (categoryId: string) => {
		categoryId === category ? setCategory('') : setCategory(categoryId);
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
		>
			<ScrollView>
				<Background>
					<Header title='Agendar partida' />
					<Text
						style={[
							styles.label,
							{ marginLeft: 24, marginTop: 36, marginBottom: 12 },
						]}
					>
						Categoria
					</Text>
					<CategorySelect
						hasCheckBox
						setCategory={handleCategorySelect}
						categorySelected={category}
					/>
					<View style={styles.form}>
						<RectButton>
							<View style={styles.select}>
								{server ? <GuildIcon /> : <View style={styles.image} />}

								<View style={styles.selectBody}>
									<Text style={styles.label}>Selecione um servidor</Text>
								</View>
								<Feather
									name='chevron-right'
									color={theme.colors.heading}
									size={18}
								/>
							</View>
						</RectButton>
						<View style={styles.field}>
							<View>
								<Text style={styles.label}>Dia e mês</Text>

								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>/</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>

							<View>
								<Text style={styles.label}>Hora e minuto</Text>

								<View style={styles.column}>
									<SmallInput maxLength={2} />
									<Text style={styles.divider}>:</Text>
									<SmallInput maxLength={2} />
								</View>
							</View>
						</View>
						<View style={[styles.field, { marginBottom: 12 }]}>
							<Text style={styles.label}>Descrição</Text>
							<Text style={styles.maxLength}>Max 100 caracteres</Text>
						</View>
						<TextArea
							multiline
							maxLength={100}
							numberOfLines={5}
							autoCorrect={false}
						/>
						<View style={styles.footer}>
							<Button title='Agendar' />
						</View>
					</View>
				</Background>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
