import React from 'react';
import {

} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../styles/colors';

import Welcome from '../screens/Welcome';
import UserIdentification from '../screens/UserIdentification';
import Confirmation from '../screens/Confirmation';

const stackRoutes = createStackNavigator();

const StackRoutes = () => (
    <stackRoutes.Navigator>
        <stackRoutes.Screen 
            name="Welcome" 
            component={Welcome}
        />

        <stackRoutes.Screen 
            name="UserIdentification" 
            component={UserIdentification}
        />
        <stackRoutes.Screen 
            name="Confirmation" 
            component={Confirmation}
        />
    </stackRoutes.Navigator>
)

export default StackRoutes;