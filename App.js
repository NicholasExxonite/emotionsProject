import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './tabs/HomeScreen';
import FeatureTwo from './tabs/FeatureTwo';
import FeatureThree from './tabs/FeatureThree'
import {FeatureThreeStackNavigator} from './navigation/Navigator_f3';
import {FeatureTwoStackNavigator, CaptureEmotionNavigator, ReflectEmotion, UnderstandEmotionNavigator} from './navigation/Navigator_f2';
import Landing from './tabs/auth/Landing';
import Register from './tabs/auth/Register';
import RecordEntryScreen from './tabs/RecordEntryScreen';
import EmotionChoice from './tabs/EmotionChoice';
import Understand from './tabs/Understand';
import Reflect from './tabs/Reflect'
import Login from './tabs/auth/Login';
import firebase from '@firebase/app';
import '@firebase/auth';
// function HomeScreen() {
//   return(
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }
// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

/* @flow */

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="LandingPage">
//         <Stack.Screen name="Landing" component={LandingPage}/>
//         <Tab.Navigator>
//           <Tab.Screen name ="Feature 1" component ={HomeScreen}/>
//           <Tab.Screen name="Feature 2" component={FeatureTwoStackNavigator}/>
//           <Tab.Screen name="Feature 3" component={FeatureThreeStackNavigator}/>
//         </Tab.Navigator>
//       </Stack.Navigator>
//     </NavigationContainer>
//
//   );
// }
export default class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      loaded:false,
      loaded:false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) =>{
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({

          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if(!loaded)
    {
      return(
        <View>
          <Text>Loading..</Text>
        </View>
      );
    }

    if(!loggedIn)
    {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing}/>
            <Stack.Screen name ="Register" component ={Register}/>
            <Stack.Screen name ="Login" component ={Login}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <NavigationContainer>
        <Tab.Navigator>


          <Tab.Screen name ="Capture" component ={CaptureEmotionNavigator}/>
          <Tab.Screen name ="Reflect" component = {ReflectEmotion}/>
          <Tab.Screen name = "Understand" component = {UnderstandEmotionNavigator}/>
        </Tab.Navigator>
      </NavigationContainer>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
