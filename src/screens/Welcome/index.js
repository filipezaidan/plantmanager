import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Welcome() {
 return (
   <View style={styles.container}>
       <Text>Welcome</Text>
   </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});