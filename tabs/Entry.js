import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, Image, Text, View, TextInput, TouchableOpacity, useWindowDimensions, KeyboardAvoidingView } from 'react-native';
import { getDatabase } from "../database";
import firebase from '@firebase/app';
import '@firebase/auth';


export default function Entry({route, navigation}) {

   const {
     key,
     valenceValue,
     intensityValue,
     what_happened,
     where_happened,
     who_was_involved,
     challenges_goals,
     accountability,
     image,
     emotionone,
     emotiontwo,
     emotionthree,
     reflection,
     uri,

  } = route.params;
   const [ref_text, setRef_text] = React.useState('')
   const [reflections, setReflections] = useState(0)

   const width = useWindowDimensions().width;
   const height = useWindowDimensions().height;
   const deleteImage = require('../assets/Basic_Element_15-30_(235).jpg');
   // let reflections = '';
  // const {emotion, add_info} = route.params;
  function pressSubmitReflections(){
    getDatabase().ref('userstest/'+ firebase.auth().currentUser.uid).child(key).update({
      reflection: reflections,
    });
    alert("Reflection submitted!")
  }

  function renderReflections(){
    if(!reflection){
        if(!reflections){
          return(
            <Text>No reflections yet</Text>
          )
        }else{
          return(
            <Text>{reflections}</Text>
          )
        }
    }else {
      return(
        <Text style={{fontSize: 20}}>{reflection}</Text>
      )
    }
  }
  function onPressDelete(){
    alert("Long press the delete button to delete entry")
  }

  function deleteEntry(){
    getDatabase().ref('userstest/'+ firebase.auth().currentUser.uid).child(key).remove()
    console.log("deleted");
    alert("Entry deleted!")

  }

  function renderHeader(){
    return(
      <View style={{flexDirection: 'row'
        ,width: width, marginBottom: 40,
        borderBottomWidth: 1, borderColor: 'black'
      }}>


        <Image source={uri}
            style={{width:100, height:100}}
            alt="haha"/>
          <Text style={{fontSize: 24, fontWeight: '600', marginLeft: 100, alignSelf: 'center'}}>{emotionone.toUpperCase()}</Text>

          <TouchableOpacity style={{right: 0, position: 'absolute', marginLeft: 10, alignSelf: 'center', justifyContent: 'flex-end'}} onPress={()=> onPressDelete() } onLongPress={() => deleteEntry()}>
            <Image style={{height: 60, width: 60}}source={deleteImage}/>
          </TouchableOpacity>
      </View>
    )
  }

//Function to render the outside stimuli/stressors of an Event
  function renderStimuli(){
    return(
      <View style={{marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Text style={styles.qtext}>Place of the event</Text>
          <Text style={styles.atext}>{where_happened}</Text>
        </View>
        <View>
          <Text style={styles.qtext}>Who was involved in the event</Text>
          <Text style={styles.atext}>{who_was_involved}</Text>
        </View>
        <View>
          <Text style={styles.qtext}>The exchange of the event</Text>
          <Text style={styles.atext}>{what_happened}</Text>
        </View>
      </View>

    )
  }

  function renderIntensity_Valence(){
    return(
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 60, marginTop: 30, marginBottom: 20,
      borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'black'}}>
        <View>
          <Text style={styles.qtext}>Significance</Text>
          <Text style={styles.atext}>{valenceValue}/10</Text>
        </View>

        <View>
          <Text style={styles.qtext}>Intensity</Text>
          <Text style={styles.atext}>{intensityValue}/10</Text>
        </View>
      </View>
    )
  }


  function renderAccount_Goals(){
    var acc_output = '';
    var chal_output = '';

    //Check accountability
    if(accountability==="me"){
      acc_output = "I am responsible for this event."
    }else if(accountability==="not_me"){
      acc_output= "Someone else is responsible for this event."
    }else {
      acc_output = "I am not sure who is responsible"
    }

    //Check if it presents obstacles
    if(challenges_goals ==="yes"){
      chal_output = "This event presents and obstacle towards my goals"
    }else {
      chal_output = "This event is NOT an obstacle towards my goals"
    }
    return(
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{marginRight: 5, fontSize: 20, fontWeight: '700'}}>{acc_output}</Text>
        </View>

        <View style={{marginTop: 20, }}>
          <Text style={{marginRight: 5, fontSize: 20, fontWeight: '700'}}>{chal_output}</Text>
        </View>
      </View>
    )

  }
  return (
    <ScrollView style={{backgroundColor: 'white', flex:1}}>
      {renderHeader()}

      {renderStimuli()}

      {renderIntensity_Valence()}

      {renderAccount_Goals()}

      <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 18}}>Reflections: </Text>
      {renderReflections()}


      <Text style={{marginTop: 30, fontSize: 16, opacity: 0.6}}>Additional feelings:</Text>
      <Text>{emotiontwo.toUpperCase()}</Text>
      <Text>{emotionthree.toUpperCase()}</Text>



      <View style={{marginTop: 30}}>


        <TextInput style={styles.inputfields} onChangeText = { text => setReflections(text)}
        placeholder = "type reflection.." placeholderTextColor="black"/>

      <TouchableOpacity style={styles.subBut} onPress={() => pressSubmitReflections()}><Text style={{color: 'white', alignSelf: 'center'}}>Submit reflection</Text></TouchableOpacity>

      </View>

    </ScrollView>
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
    color: 'black',
    marginBottom: 10,
  },
  subBut:{
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#1b1054',
    height: 40,
    width: 150,
    borderRadius: 60,
    justifyContent: 'center'
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
  },
  qtext:{
    fontSize: 18,
    fontWeight: '300',
    opacity: 70,
    alignSelf: 'center'
  },
  atext:{
    fontSize: 24,
    fontWeight: '700',
    alignSelf: 'center',
    marginBottom: 30,
  },
  inputfields: {
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#1b1054',
    // elevation: 1,

    // flex: 1
  },
});
