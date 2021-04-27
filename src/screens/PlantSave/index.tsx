import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';

import { useRoute } from '@react-navigation/native';

import { SvgFromUri } from 'react-native-svg';
import Button from '../../components/Button';

import Waterdrop from '../../assets/waterdrop.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface Params {
    plant: {
        id: string,
        name: string,
        about: string,
        water_tips: string,
        photo: string,
        environments: [string],
        frequency: {
            times: number,
            repeat_every: string  
        }
    }
}


export default function PlantSave(){
    const route = useRoute();

    const { plant } = route.params as Params;

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>

                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>


            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={Waterdrop}
                        style={styles.tipImage}
                    />

                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>

                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>

                <Button
                    title='Cadastrar Planta'
                    onPress={ () => {}}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems:  'center',
        justifyContent: 'center',
    },
    controller:{
        flex: 1 ,
        backgroundColor: colors.white,
        paddingHorizontal: 20, 
        paddingTop: 20,
    },
    plantName:{
        fontFamily:fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15,
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,

    },
    tipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: '22%'
    },
    tipImage:{
        height: 56,
        width: 56
    },
    tipText:{
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 16,
        textAlign: 'justify'

    },
    alertLabel:{
        textAlign:'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    }

});