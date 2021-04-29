import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import PlantSelect from '../screens/PlantSelect';
import MyPlants from '../screens/MyPlants';

const Tabs = createBottomTabNavigator();


const AuthRoutes = () => {
    return(
        <Tabs.Navigator
            tabBarOptions={{
                activeTintColor: colors.green,
                inactiveTintColor: colors.heading,
                labelPosition: 'beside-icon',
                style:{
                    height: 70
                }
            }}
            
        >
            <Tabs.Screen
                name={'Nova Planta'}
                component={PlantSelect}
                options={{
                    tabBarIcon: (({size,color}) => (
                        <MaterialIcons
                            name='add-circle-outline'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />

            <Tabs.Screen
                
                name={'Minhas Plantas'}
                component={MyPlants}
                options={{
                    tabBarIcon: (({size,color}) => (
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />


        </Tabs.Navigator>
    );
}

export default AuthRoutes;