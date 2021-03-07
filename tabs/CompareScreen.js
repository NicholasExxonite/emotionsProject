import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {  Platform, PlatformColor, StyleSheet, Image, Text, View, TextInput, FlatList, TouchableOpacity, useWindowDimensions, KeyboardAvoidingView } from 'react-native';

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
        <Text style={styles.equalText}>{item.emotionone.toUpperCase()}</Text>
      )
      // setEqualCounter(equalCounter+1);
    }else {
      return(
        <Text style={styles.notEqualText}>{item.emotionone.toUpperCase()}</Text>
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
        <Text style={styles.equalText}>{item.what_happened}</Text>
      )
    }else {
      return(
        <Text style={styles.notEqualText}>{item.what_happened}</Text>
      )
    }
  }
  //who was involved
  function displayWhoWasInvolved(item){
    let entryone = entryOne.who_was_involved
    // let entryonewords = entryone.split(" ")
    console.log(entryone);
    let entrytwo = entryTwo.whoo_was_involved
    // let entrytwowords = entrytwo.split(" ")

    // console.log(entryonewords + " " + entrytwowords);
    if(entryOne.who_was_involved === entryTwo.who_was_involved)
    {

      //setEqualCounter(equalCounter++);
      return(
        <Text style={styles.equalText}>{item.who_was_involved}</Text>
      )
    }else {
      return(
        <Text style={styles.notEqualText}>{item.who_was_involved}</Text>
      )
    }
  }
  //Where it Happened
  function displayWhereHappened(item){
    if(entryOne.where_happened === entryTwo.where_happened)
    {

      //setEqualCounter(equalCounter++);
      return(
        <Text style={styles.equalText}>{item.where_happened}</Text>
      )
    }else {
      return(
        <Text style={styles.notEqualText}>{item.where_happened}</Text>
      )
    }
  }
  //Intenisty value
  function displayIntensity(item){
    if(entryOne.intensityValue === entryTwo.intensityValue)
    {

    //  setEqualCounter(equalCounter++);
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.equalText}>{item.intensityeValue}</Text>
          <Text>/10</Text>
        </View>
      )
    }else {
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.notEqualText}>{item.intensityValue}</Text>
          <Text>/10</Text>
        </View>
      )
    }
  }
  //Valence value
  function displayValence(item){
    if(entryOne.valenceValue === entryTwo.valenceValue)
    {

    //  setEqualCounter(equalCounter++);
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.equalText}>{item.valenceValue}</Text>
          <Text>/10</Text>
        </View>

      )
    }else {
      return(
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.notEqualText}>{item.valenceValue}</Text>
          <Text>/10</Text>
        </View>

      )
    }
  }
  function displayAccountability(item){
    const resp_me = "I am responsible for what happened in this event";
    const resp_not_me = "Someone else is responsible for what happened in this event";
    const resp_not_sure = "I am not sure who is responsible for this event";
    if(item.accountability === "me"){

      if(entryOne.accountability === entryTwo.accountability){
        return(
         <Text style={styles.equalText}>{resp_me}</Text>

        )

      }else {

        return(
          <Text style={styles.notEqualText}>{resp_me}</Text>
        )
      }
    }else if(item.accountability=="not_me"){

      if(entryOne.accountability === entryTwo.accountability){

        return(
          <Text style={styles.equalText}>{resp_not_me}</Text>
        )
      }else {

        return(
          <Text style={styles.notEqualText}>{resp_not_me}</Text>
        )
      }
    }else {
      if(entryOne.accountability === entryTwo.accountability){
        return(
          <Text style={styles.equalText}>{resp_not_sure}</Text>
        )
      }else {
        return(
          <Text style={styles.notEqualText}>{resp_not_sure}</Text>
        )
      }
    }
  }

  function displayChal_Goals(item){
    const is_challenge = "Presents an obstacle towards my goal(s)";
    const not_challenge = "Does not present an obstacle towards my goal(s)"

    if(item.challenges_goals === "yes"){
      if(entryOne.challenges_goals === entryTwo.challenges_goals){
        return(
          <Text style={styles.equalText}>{is_challenge}</Text>
        )
      }else {
        return(
          <Text style={styles.notEqualText}>{is_challenge}</Text>
        )
      }
    }else {
      if(entryOne.challenges_goals === entryTwo.challenges_goals){
        return(
          <Text style={styles.equalText}>{not_challenge}</Text>
        )
      }else {
        return(
          <Text style={styles.notEqualText}>{not_challenge}</Text>
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

          <View>
          <Text style={styles.text}>Responsibility for the event</Text>
          {displayAccountability(item)}
          </View>

          <View>
          <Text style={styles.text}>This event</Text>
          {displayChal_Goals(item)}
          </View>

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
  },
  equalText:{
    color: 'rgb(47, 255, 0)',
    fontSize: 24,
    
    fontStyle: 'italic',
  },
  notEqualText:{
    color: '#FF0000',
    fontSize: 18,

  }
})
