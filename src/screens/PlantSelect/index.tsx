import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
} from 'react-native';

import EnvironmentButton from '../../components/EnvironmentButton';
import Header from '../../components/Header';
import PlantCardPrimary from '../../components/PlantCardPrimary';

import api from '../../services/api';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface EnvironmentProps{
    title: string;
    key: string;
}

interface PlantProps{
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

export default function PlantSelect(){
    const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);

    useEffect( () => {
        async function fetchEnvironment(){
            const { data } = await api
            .get('plants_environments?_sort=title&_order=asc');
            setEnvironment([
                {
                    key: 'all',
                    title: 'Todos',
                }, ...data
            ]);
        }
        fetchEnvironment();
    },[])

    useEffect( () => {
        async function fecthPlants(){
            const { data } = await api
            .get('plants?_sort=name&_order=asc');
            setPlants(data);
        }
        fecthPlants();
    },[])

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header/>

                <Text style={styles.title}>
                    Em qual ambiente
                </Text>

                <Text style={styles.subtitle}>
                    você quer colocar sua planta?
                </Text>
            </View>
            <View>
                <FlatList
                    data={environment}
                    renderItem={
                        ({ item }) => <EnvironmentButton title={item.title} key={item.key} /> 
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={plants}
                    renderItem={ ({item}) => <PlantCardPrimary data={item}/>}
                    numColumns={2} 
                    contentContainerStyle={styles.contentContainer}
                    showsHorizontalScrollIndicator={false}               
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        paddingHorizontal: 30,
    },
    title:{
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 20,
    },
    subtitle:{
        fontSize: 17,
        fontFamily: fonts.text,
        lineHeight: 20,
        color: colors.heading,
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center',
    },
    contentContainer:{

    }
});