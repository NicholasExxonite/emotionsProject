import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import FeatureThree from "../tabs/FeatureThree";
import AngerScript from '../tabs/ScriptsScreens/AngerScript';
import FearScript from '../tabs/ScriptsScreens/FearScript';
import HappinessScript from '../tabs/ScriptsScreens/HappinessScript';
import ShameScript from '../tabs/ScriptsScreens/ShameScript';
import TextbasedScripts from '../tabs/ScriptsScreens/TextbasedScripts';
import ImagebasedScripts from '../tabs/ScriptsScreens/ImagebasedScripts';

const Stack = createStackNavigator();

const FeatureThreeStackNavigator = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name = "FeatureThree" component ={ FeatureThree } />
      <Stack.Screen name = "ShameScript" component = { ShameScript }/>
      <Stack.Screen name = "HappinessScript" component = { HappinessScript }/>
      <Stack.Screen name = "AngerScript" component = { AngerScript }/>
      <Stack.Screen name = "FearScript" component = { FearScript }/>
      <Stack.Screen name = "Text-Based" component = { TextbasedScripts }/>
    <Stack.Screen name = "Image-Based" component = { ImagebasedScripts }/>
    </Stack.Navigator>
  );
}
export { FeatureThreeStackNavigator };
