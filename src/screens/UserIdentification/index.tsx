import React, {useState} from 'react';
import {
    SafeAreaView, 
    KeyboardAvoidingView,
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../components/Button';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function UserIdentification(){
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    
    function handleInputBlur(){
        setIsFocused(false);
    }
    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputChange(text: string){
        setIsFilled(!!text);
        setName(text);
    }

    async function handleSubmit(){
        if(!name){
           return Alert.alert('Me diz como chamar você!😊');
        }

        await AsyncStorage.setItem('@plantmanager:username', name);
        navigation.navigate('Confirmation');
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>

                                <Text style={styles.emoji}>
                                    {isFilled ? '😊' : '😉'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                    chamar você?
                                </Text>
                            </View>
                    
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {borderBottomColor: colors.green} 
                                ]}
                                placeholder='Digite um nome'
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={(text) => handleInputChange(text)}
                                value={name}
                            />

                            <View style={styles.footer}>
                                <Button title="Confirmar" onPress={() => handleSubmit()}/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content:{
        flex: 1,
        width: '100%'
    },
    form:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal:  54,
        alignItems: 'center',
    },
    header:{
        alignItems: 'center'
    },
    emoji:{
        fontSize: 44,
    },
    title:{
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20,
    },
    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    footer:{
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20,
    },
});

