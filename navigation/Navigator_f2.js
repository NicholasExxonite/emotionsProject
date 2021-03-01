import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeatureTwo from "../tabs/FeatureTwo";
import ExpandedEntry from "../tabs/ExpandedEntry";
import RecordEntryScreen from "../tabs/RecordEntryScreen";
import Understand from "../tabs/Understand";
import UnderstandNew from "../tabs/UnderstandNew";
import EmotionChoice from "../tabs/EmotionChoice";
import Entry from "../tabs/Entry";
import Reflect from "../tabs/Reflect";
import CompareScreen from "../tabs/CompareScreen";


const Stack = createStackNavigator();

const FeatureTwoStackNavigator = () =>{
  return(
    <Stack.Navigator>
      <Stack.Screen name = "FeatureTwo" component ={ FeatureTwo } />
      <Stack.Screen name = "ExpandedEntry" component ={ ExpandedEntry } />
    </Stack.Navigator>
  );
}

const CaptureEmotionNavigator = () =>{
  return(
    <Stack.Navigator  initialRouteName="Capture">
      <Stack.Screen name = "Emotions" component = {EmotionChoice}/>
      <Stack.Screen name = "Capture" component = {RecordEntryScreen}/>
    </Stack.Navigator>
  )
}

const ReflectEmotion = () =>{
  return(
    <Stack.Navigator initialRouteName="Reflect">
      <Stack.Screen name = "Entries" component = {Reflect}/>
      <Stack.Screen name = "Entry" component = {Entry}/>
      <Stack.Screen name = "Compare" component ={CompareScreen}/>
    </Stack.Navigator>
  )
}

const UnderstandEmotionNavigator = () =>{
  return(
    <Stack.Navigator initialRouteName = "Understand">
      <Stack.Screen name= "Understand" component = {Understand}/>
      <Stack.Screen name ="UnderstandNew" component ={UnderstandNew}/>
    </Stack.Navigator>
  )
}


export { FeatureTwoStackNavigator,CaptureEmotionNavigator, ReflectEmotion, UnderstandEmotionNavigator };
