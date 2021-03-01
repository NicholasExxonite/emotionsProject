// For each entry clicked open a new screen and pass all the data from that entry. The new screen will display
// all the information of the entry

import React, { useState } from 'react';
import { StyleSheet, Text, View, Picker, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class FeatureThree extends React.Component {

  onPressButton(){
    alert('Button pressed!')
  }
  render(){
    return(
      <View style={styles.container}>


        <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("Image-Based")}}>
            <Text style={styles.text}>Image-based</Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("AngerScript")}}>
              <Text style={styles.text}>Text-Based 2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {this.props.navigation.navigate("Text-Based")}}>
              <Text style={styles.text}>Text-Based</Text>
          </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  button:{
    backgroundColor: '#1b1054',
    width: 240,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    borderRadius: 120
  },
  text:{
    color: 'white',
    fontWeight: '500',
    fontSize: 22
  },
  group:{
    margin: 10
  }
})

export default FeatureThree;
