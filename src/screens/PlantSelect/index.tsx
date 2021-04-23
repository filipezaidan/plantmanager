import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import EnvironmentButton from '../../components/EnvironmentButton';
import Header from '../../components/Header';
import PlantCardPrimary from '../../components/PlantCardPrimary';
import Load from '../../components/Load';

import api from '../../services/api';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { color } from 'react-native-reanimated';

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
    const [filteredplants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelect, setEnvironmentSelect] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedAll, setLoadedAll] = useState(false);

    //Filters
    function handleEnvironmentSelect(environment: string){
        setEnvironmentSelect(environment);

        if(environment === 'all'){
            return setFilteredPlants(plants);
        }

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered);
    }

    //Paginate and return values
    function handleFecthMore(distance: number ){
        if(distance < 1){
            return;
        }

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fecthPlants();
    }

    //Get Plants
    async function fecthPlants(){
        const { data } = await api
        .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data){
            return setLoading(true)
        }
        
        if(page > 1){
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data)
            
        }
        setLoading(false);
        setLoadingMore(false);
    }


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
        fecthPlants();
    },[])

    if(loading){
        return <Load/>
    }

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
                        ({ item }) => 
                        <EnvironmentButton 
                        title={item.title} 
                        key={item.key} 
                        active={item.key == environmentSelect}
                        onPress={ () => handleEnvironmentSelect(item.key)}
                        /> 
                    }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList
                    data={filteredplants}
                    renderItem={ ({item}) => <PlantCardPrimary data={item}/>}
                    numColumns={2} 
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.1}
                    onEndReached={ ({ distanceFromEnd }) => 
                        handleFecthMore(distanceFromEnd) 
                    }
                    ListFooterComponent={
                        loadingMore ? 
                            <ActivityIndicator color={colors.green}/> : <></>
                    }              
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
});