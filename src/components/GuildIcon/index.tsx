import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export const GuildIcon = () => {
	const uri =
		'https://s2.glbimg.com/ztYuyapZXTARyNT5vw_b9lnhArs=/0x0:1200x675/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/j/U/iLO5YCRBmGHUsDwBIBHA/valorant-closed-beta-1200x675.png';

	return <Image source={{ uri }} style={styles.image} resizeMode='cover' />;
};
