import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TextInput, FlatList, TouchableOpacity, useWindowDimensions, KeyboardAvoidingView } from 'react-native';

export default function CompareScreen({route, navigation}){
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const { compArray } = route.params;
  const entryOne = compArray[0];
  const entryTwo = compArray[1];


  // function checkEq(item, text){
  //   if(entryOne.text === entryTwo.text)
  //   {
  //     console.log("equal");
  //     return(
  //       <Text>{item.text} - equal</Text>
  //     )
  //   }
  //   else {
  //     console.log("not equal");
  //     return(
  //
  //       <Text>not equal</Text>
  //     )
  //   }
  // }


  //Functions to check equivalecne---------------------
  //emotion
  function displayEmotion(item){
    console.log({item}.random);
    if(entryOne.emotionone === entryTwo.emotionone)
    {
      console.log("equal");

      return(
        <Text style={{color: 'green', fontSize: 20, alignSelf: 'center'}}>{item.emotionone.toUpperCase()}</Text>
      )
      // setEqualCounter(equalCounter+1);
    }else {
      return(
        <Text style={{color:'red', fontSize: 20, alignSelf: 'center'}}>{item.emotionone.toUpperCase()}</Text>
      )
    }
  }

  //what Happened
  function displayWhatHappened(item){
    if(entryOne.what_happened === entryTwo.what_happened)
    {
      console.log("equal");
      // setEqualCounter(equalCounter+1);
      return(
        <Text style={{color: 'green', fontSize: 20}}>{item.what_happened}</Text>
      )
    }else {
      return(
        <Text style={{color: 'red', fontSize: 20}}>{item.what_happened}</Text>
      )
    }
  }
  //who was involved
  function displayWhoWasInvolved(item){
    if(entryOne.who_was_involved === entryTwo.who_was_involved)
    {
      console.log("equal");
      //setEqualCounter(equalCounter++);
      return(
        <Text style={{color: 'green', fontSize: 20}}>{item.who_was_involved}</Text>
      )
    }else {
      return(
        <Text style={{color: 'red', fontSize: 20}}>{item.who_was_involved}</Text>
      )
    }
  }
  //Where it Happened
  function displayWhereHappened(item){
    if(entryOne.where_happened === entryTwo.where_happened)
    {
      console.log("equal");
      //setEqualCounter(equalCounter++);
      return(
        <Text style={{color: 'green', fontSize: 20}}>{item.where_happened}</Text>
      )
    }else {
      return(
        <Text style={{color: 'red', fontSize: 20}}>{item.where_happened}</Text>
      )
    }
  }
  //Intenisty value
  function displayIntensity(item){
    if(entryOne.intensityValue === entryTwo.intensityValue)
    {
      console.log("equal");
    //  setEqualCounter(equalCounter++);
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'green', fontSize: 20}}>{item.intensityeValue}</Text>
          <Text>/10</Text>
        </View>
      )
    }else {
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 20}}>{item.intensityValue}</Text>
          <Text>/10</Text>
        </View>
      )
    }
  }
  //Valence value
  function displayValence(item){
    if(entryOne.valenceValue === entryTwo.valenceValue)
    {
      console.log("equal");
    //  setEqualCounter(equalCounter++);
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'green', fontSize: 20}}>{item.valenceValue}</Text>
          <Text>/10</Text>
        </View>

      )
    }else {
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: 'red', fontSize: 20}}>{item.valenceValue}</Text>
          <Text>/10</Text>
        </View>

      )
    }
  }
  function displayAccountability(item){
    if(item.accountability === "me"){
      console.log("accountability = me");
      if(entryOne.accountability === entryTwo.accountability){
        return(
          <Text style={{color: 'green'}}>{item.accountability}</Text>
        )
        console.log("they are equal");
      }else {
        console.log("not equal");
        return(
          <Text style={{color: 'red'}}>{item.accountability}</Text>
        )
      }
    }else {
      console.log("not me");
      if(entryOne.accountability === entryTwo.accountability){
        console.log("equal");
        return(
          <Text style={{color: 'green'}}>{item.accountability}</Text>
        )
      }else {
        console.log("not equal");
        return(
          <Text style={{color: 'red'}}>{item.accountability}</Text>
        )
      }
    }
  }

  function displayChal_Goals(item){

    if(item.challenges_goals === "yes"){
      if(entryOne.challenges_goals === entryTwo.challenges_goals){
        return(
          <Text style={{color: 'green'}}>{item.challenges_goals}</Text>
        )
      }else {
        return(
          <Text style={{color: 'red'}}>{item.challenges_goals}</Text>
        )
      }
    }else {
      if(entryOne.challenges_goals === entryTwo.challenges_goals){
        return(
          <Text style={{color: 'green'}}>{item.challenges_goals}</Text>
        )
      }else {
        return(
          <Text style={{color: 'red'}}>{item.challenges_goals}</Text>
        )
      }
    }

  }
//END OF FUNCTIONS TO CHECK EQUIVALENCE------------------------------

  return(
    <View style={{flex:1, backgroundColor: 'white'}}>
    <Text style={{alignSelf: 'center'}}>Comparing..</Text>


    <FlatList
      style={{marginTop: 40, width: width}}
      data={compArray}

      keyExtractor={(item, index)=> index.toString()}
      renderItem={({item, index}) =>(
        <View style={{margin: 20}}>
          <Text style={{alignSelf: 'center', fontSize: 24, fontWeight: '700'}}>{index+1}</Text>



          <View style={{flexDirection: 'row',justifyContent: 'space-between',}}>
            {displayEmotion(item)}
            <Image source={item.uri} style={{height: 60, width: 60}}/>
          </View>
          <View style={{ height: 0.5, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}><Text></Text></View>


          <View>
            <Text style={styles.text}>Exchange of event</Text>
            {displayWhatHappened(item)}
          </View>

          <View>
            <Text style={styles.text}>Place of event</Text>
            {displayWhereHappened(item)}
          </View>

          <View>
            <Text style={styles.text}>Involvement</Text>
            {displayWhoWasInvolved(item)}
          </View>

          <View>
            <Text style={styles.text}>Intensity of event</Text>
            {displayIntensity(item)}
          </View>

          <View>
            <Text style={styles.text}>Importance of the event to self</Text>
            {displayValence(item)}
          </View>


          {displayAccountability(item)}
          {displayChal_Goals(item)}

          <Text></Text>
          <Text></Text>
        </View>
      )}
    />
    </View>
  )
}
const styles = StyleSheet.create({
  text:{
    fontSize: 16,
  },
  entrytext:{
    fontSize: 20,
  }
})
