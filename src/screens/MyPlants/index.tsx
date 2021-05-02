import React, { useEffect, useState } from 'react';
import { 
    View,
    StyleSheet,
    Text,
    Image,
    FlatList,
    Alert,
    Platform,
} from 'react-native';

import { formatDistance } from 'date-fns';
import { ptBR} from 'date-fns/locale';

import { loadPlant, PlantProps, removePlant } from '../../libs/storage';
import Header from '../../components/Header';
import Load from '../../components/Load';
import PlantCardSecondary from '../../components/PlantCardSecondary';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Waterdrop from '../../assets/waterdrop.png';

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
                        await removePlant(plant.id);
                        setMyPlants( (oldData) => 
                            oldData.filter((item) => item.id != plant.id)
                        );
                    }catch (error){
                       Platform.OS == 'ios' ? 
                       Alert.alert('Não foi possivel remvoer!😢') : alert('Não foi possivel remvoer!😢')
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            if(plantsStoraged.length === 0){
                setLoading(false);
                return;
            }

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(), 
                new Date().getTime(),
                { locale: ptBR }
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} às ${nextTime}`
            )
            setMyPlants(plantsStoraged);
            setLoading(false);
        }
        loadStorageData();
    }, []);

    if(loading){
        return(
            <Load/>
        );

    }

    if(myPlants.length === 0){
        return(
            <View style={styles.container}>
                <Header/>

                <View style={styles.plants}>
                    <Text style={styles.plantsTitle}>
                        Sem plantas cadastradas...
                    </Text>
                </View>
            </View>
        )
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