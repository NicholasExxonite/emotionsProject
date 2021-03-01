import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
// import { Picker } from 'react-native-picker/picker';


export default function AngerScript() {
  const [answer, setAnswer] = useState('');
  const correct_answer = 'anger';

  function checkAnswer(ans){
    var ans_tolower = ans.toLowerCase();
    if(ans_tolower === correct_answer){
      alert('Correct answer: ' + ans)
    }
    else{
      alert('Incorrect answer: ' +ans +" The correct answer is: " + correct_answer)
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>

        <Text>What Emotion is showed on the script below?</Text>
        <View>
          <Image source={{uri: 'https://dz9yg0snnohlc.cloudfront.net/cro-how-to-control-anger-so-it-does-not-control-you-1.jpg'}}
            style={{width: 400, height:400}}/>
        </View>


        <View style={styles.inputContainer}>
          <TextInput style ={styles.inputField} onChangeText={(text) => setAnswer(text)}
          value={answer} placeholder="Your answer.."placeholderTextColor="blue"/>

          <Picker selectedValue={''} style={{height:50, width:100}}
            onValueChange={(text) => setAnswer(text)} value={answer}>

            <Picker.Item label="Surprise" value="Surprise"/>
            <Picker.Item label="Happiness" value="Happiness"/>
            <Picker.Item label="Anger" value="Anger"/>
            <Picker.Item label="Shame" value="Shame"/>
          </Picker>
        </View>
        <View style={styles.submitCont}>
          <TouchableOpacity style={styles.submitBut} onPress = { ()=> checkAnswer(answer)}>
            <Text> Submit </Text>
            </TouchableOpacity>
        </View>



      </ScrollView>
    </KeyboardAvoidingView>
  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer:{
    flexDirection: 'row',
    flex:1,
  },
  inputField:{

    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'black',
  },
  submitCont:{
    flex:3,
    paddingTop: 40,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  submitBut:{
    backgroundColor: "#7a42f4",
    padding: 10,
  }
});
