/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Landing = ({navigation}) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  return (
    <View style={{flex:1,
         height: height,
         width:width,
         justifyContent: 'center',
         alignItems: 'center',
         backgroundColor: '#fafafc'
      }}>



      <TouchableOpacity
         style={{
           height: height*0.1,
           width: width*0.8,
           backgroundColor: '#1b1054',
           marginBottom: 30,
           alignItems: 'center',
           justifyContent: 'center',
           borderRadius: 30

         }}
         onPress={()=>{navigation.navigate('Register')}}>
          <Text style={styles.text}>register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          height: height*0.1,
          width: width*0.8,
          backgroundColor: '#1b1054',
          marginTop: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 30,
        }}
        onPress={()=>{navigation.navigate('Login')}}>
          <Text style={styles.text}>login</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: '700',
    color: 'white'

  },
  button:{
    height: 100,
    backgroundColor: '#87a5d6'
  }
});

export default Landing
