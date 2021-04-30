import React, { useEffect, useState } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Alert,
} from 'react-native';

import { formatDistance } from 'date-fns';
import { ptBR} from 'date-fns/locale';

import Header from '../../components/Header';

import { loadPlant, PlantProps, StoragePlantProps } from '../../libs/storage';
import colors from '../../styles/colors';
import Waterdrop from '../../assets/waterdrop.png';
import PlantCardSecondary from '../../components/PlantCardSecondary';
import fonts from '../../styles/fonts';
import Load from '../../components/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    function handleRemove(plant: PlantProps){
        Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
            {
                text: 'Nao 🙏',
                style: 'cancel'
            },

            {
                text: 'Sim 😢',
                onPress: async () => {
                    try{
                        const data =await AsyncStorage.getItem('@plantmanger:plants');
                        const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
                        
                        delete plants[plant.id];

                        await AsyncStorage.setItem(
                            '@plantmanger:plants',
                            JSON.stringify(plants)
                        );

                        setMyPlants( (oldData) => (
                            oldData.filter((item) => item.id !== plant.id)
                        ));

                    }catch (error){

                    }
                }
            }
        ])
    }

    useEffect( () => {
        async function loadStorageData(){
            const plantsStoraged = await loadPlant();

            const nexTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: ptBR}
            );

            setNextWatered(
                `Não esquecaça de regar a ${plantsStoraged[0].name} à ${nexTime}  horas.`
            );
            setMyPlants(plantsStoraged);
            setLoading(false);
        }
        loadStorageData();
    },[])

    if(loading){
        return <Load/>
    }

    return(
        <View style={styles.container}>
            <Header/>

            <View style={styles.spotlight}>
                <Image
                    source={Waterdrop}
                    style={styles.spotlightImage}
                />

                <Text style={styles.spotlightText}>
                    {nextWatered}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Proximas Regadas 
                </Text>

                <FlatList
                    data={myPlants}
                    keyExtractor={ (item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecondary 
                        data={item}
                        handleRemove={ () => handleRemove(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{flex: 1}}
                />
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    spotlightImage:{
        width: 60,
        height: 60,
    },
    spotlightText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: 'justify',

    },
    plants: {
        flex: 1,
        width: '100%',
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical:20,
    }
})