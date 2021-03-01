import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, useWindowDimensions, KeyboardAvoidingView } from 'react-native';
import { getDatabase } from "../database";
import firebase from '@firebase/app';
import '@firebase/auth';

function checkReflection(ref){
  if(JSON.stringify({ref}) !== '{}'){
    return ref
  }
  return <Text>No reflectons as of yet. </Text>
}

// async function onPressSubmit(), entrykey){
//
//   // getDatabase().ref('/test/'+entrykey).set({
//   //   reflection: ref,
//   // });
//   // getDatabase().getReference().child("tests").child(entrykey).update({
//   //   emotions: ref
//   // });
// }

export default function ExpandedEntry({route, navigation}) {

   const { key, emotion, add_info, place_it_happened, time, reflections, bgcolor } = route.params;
   const [ref_text, setRef_text] = React.useState('')
   const width = useWindowDimensions().width;
   const height = useWindowDimensions().height;
  // const {emotion, add_info} = route.params;
  function pressSubmit(emotion){
    getDatabase().ref('users/'+ firebase.auth().currentUser.uid).child(key).update({
      reflections: emotion,
    });
  }

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior="padding">
      <View style={{
          flex:1
        }}>
        <View style={{
            height: height*0.55,
            backgroundColor: bgcolor,
            borderBottomLeftRadius: 100, borderBottomRightRadius: 100,
          }}>
          <View style={{
              height: height*0.2,
              width: width,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',

          }}>
            <Text style={styles.text}>Emotion: {emotion}</Text>
            <Text style={styles.text}>Information: {add_info}</Text>
            <Text style={styles.text}>Place of Event: {place_it_happened}</Text>
            <Text style={styles.text}>Time of event: {time}</Text>
          </View>

          <View style={{flex:1
              }}>
            <Text style={{fontSize: 22,
                 color: 'white', fontWeight: '700',
                 alignSelf: 'center'
               }}>Reflections: </Text>

            <Text style={{
                paddingTop: 20,
                fontSize: 20,
                color: 'white'
              }}>{checkReflection(reflections)}</Text>
          </View>
        </View>


        <View style={{height: height*0.2,
            alignItems: 'flex-end',
            justifyContent: 'center'
            }}>
          <Text style={{alignSelf: 'center'}}>
            Do you have any reflections concerning this event?</Text>

          <TextInput style={styles.inputfield}
            placeholder = "Enter reflections" placeholderTextColor="gray"
            onChangeText={(text) => setRef_text(text)}value={ref_text}/>
          </View>
          <TouchableOpacity style={{
              width: width*0.4,
              height: height*0.1,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: bgcolor,
              borderRadius: 60,


            }}
            onPress ={() => pressSubmit(ref_text)}>
            <Text style={{fontSize: 22, fontWeight: '600', color: 'white'}}>Submit</Text>
          </TouchableOpacity>



      </View>
  </KeyboardAvoidingView>
  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    fontSize: 20,
    color: 'white',
  },
  inputfield: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: 'black',
    alignSelf: 'stretch'
  },
  entryInfo:{
    paddingTop: 20,
    flex: 1
  }
});
