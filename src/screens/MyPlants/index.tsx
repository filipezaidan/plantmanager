import React, { useEffect, useState } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
} from 'react-native';

import { formatDistance, format } from 'date-fns';
import { ptBR} from 'date-fns/locale';

import Header from '../../components/Header';

import { loadPlant, PlantProps } from '../../libs/storage';
import colors from '../../styles/colors';
import Waterdrop from '../../assets/waterdrop.png';
import PlantCardSecondary from '../../components/PlantCardSecondary';
import fonts from '../../styles/fonts';

export default function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWatered, setNextWatered] = useState<string>();

    useEffect( () => {
        async function loadStorageData(){
            const plantsStoraged = await loadPlant();
            console.log(plantsStoraged)

          

            setNextWatered(
                `Não esquecaça de regar a ${plantsStoraged[0].name} à  horas.`
            );
            setMyPlants(plantsStoraged);
            setLoading(false);
        }
        loadStorageData();
    },[])


    



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
                    <PlantCardSecondary data={item}/>
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