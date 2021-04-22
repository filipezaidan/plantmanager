import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import photoProfile from '../../assets/profile.jpg';

export default function Header(){
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Filipe</Text>
            </View>
            <Image 
                source={photoProfile} 
                style={styles.img}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
});