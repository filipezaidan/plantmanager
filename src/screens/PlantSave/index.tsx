import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Platform,
} from 'react-native';

import { useRoute } from '@react-navigation/native';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { isBefore, format } from 'date-fns';

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

    const [selectDateTime, setSelectDateTime] = useState(new Date()); 
    const [showDatePicker, setShowDatePicker ] = useState(Platform.OS == 'ios');

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS == 'android') {
            setShowDatePicker( oldValue => !oldValue);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectDateTime(new Date());
            return alert('Escolha uma hora no futuro!')
        }
        if(dateTime){
            setSelectDateTime(dateTime);
        }
    }

    function handleOpenDateTimePickerAndroid(){
        setShowDatePicker(oldValue => !oldValue);
    }

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

                {
                  showDatePicker ? ( 
                      <DateTimePicker
                        value={selectDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}
                      />
                  ) :
                  (

                    <TouchableOpacity
                        style={styles.dateTimePickerButton}
                        onPress={handleOpenDateTimePickerAndroid}
                    >
                        <Text style={styles.dateTimePickerText}>
                            {`Mudar ${format(selectDateTime, 'HH:mm')}`}
                        </Text>
                    </TouchableOpacity>
                  )
                }

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
        fontSize: 14,
        marginBottom: 5,
    },
    dateTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text,
    },

});