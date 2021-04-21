import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Platform,
    Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { Feather } from '@expo/vector-icons';

import WateringImage from '../../assets/watering.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function Welcome() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de {'\n'}
                    forma fácil
                    </Text>

                <Image 
                    source={WateringImage} 
                    style={styles.image}
                    resizeMode='contain'
                />

                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas. 
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>

                <TouchableOpacity 
                    style={styles.button} 
                    activeOpacity={0.7}
                    onPress={ () => navigation.navigate('UserIdentification')}
                >
                    <Feather 
                        name='chevron-right' 
                        size={36} 
                        color={colors.white}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'ios' ? 0 : 30,
    },
    wrapper:{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    title:{
        fontFamily: fonts.heading,
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.heading,
        textAlign: 'center',
        marginTop: 38,
        lineHeight: 34,
    },
    subtitle:{
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
    },
    image:{
        height: Dimensions.get('window').width * 0.7,
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonText: {
        color: colors.white,
        fontSize: 24,
    }
});