import React, { useState, useEffect } from 'react';
import { StyleSheet,Image, Dimensions, useWindowDimensions, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { getDatabase } from "../database";
import { NavigationContainer } from '@react-navigation/native';
import firebase from '@firebase/app';
import '@firebase/auth';


export default function UnderstandNow({route, navigation}) {
  const {entryList} = route.params;
  //const randomIndex = '';
  // let hintArray = [];

  // let giveHint = false;

  const [giveHint, setGiveHint] = useState(0);

  const [questionCount, setQuestionCount] = useState(0);

  // const [hintArray, setHintArray] = useState(0)

  const [randomIndex, setRandomIndex] = useState(0);

  const [userAnswer, setUserAnswer] = useState(0);

  const [isCorrect, setIsCorrect] = useState(0);


  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;



  useEffect(() =>{
    const size = entryList.length;
    setQuestionCount(questionCount+1);
    var index = Math.floor(Math.random() * size);

    console.log("index is: " +index);
    setRandomIndex(index);
  }, []);



  const fetchHints = (text) =>{
    getDatabase().ref("scripts/"+text).on('value', (snapshot)=>{
      var list=[]
      snapshot.forEach((child) => {
        list.push({
          key: child.key,
          exchange:child.val().exchange,
          involved:child.val().invloved,
          where:child.val().where
        })
      });
      hintArray = list;
    })
    console.log(hintArray);
  }

  function useHint(){
        if(!giveHint)
        {
          setGiveHint(true);
        }else {
          setGiveHint(false);
        }
  }

  function displayHint(){
    if(giveHint){
      return (
        <View>
          <View style={{borderTopWidth: 1, borderColor: "black",}}></View>
          <Text style={{opacity: 60, alignSelf: 'center', fontSize: 16}}>Hint..</Text>
          <View>
            <Text>Place of event:</Text>
            <Text style={{fontSize: 18, fontWeight: '500'}}>{entryList[randomIndex].where_happened}</Text>
            <Text>Involvement</Text>
            <Text style={{fontSize: 18, fontWeight: '500'}}>{entryList[randomIndex].who_was_involved}</Text>
            <Text>Exchange</Text>
            <Text style={{fontSize: 18, fontWeight: '500'}}>{entryList[randomIndex].what_happened}</Text>

          </View>
        </View>
      );
    }
  }

  function displayQuestionNumb(){

    return(
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        <Text style={{fontSize: 18, fontWeight: '200', opacity: 60}}>Question:</Text>
        <Text style={{fontSize: 24, fontWeight: '600'}}>{questionCount}</Text>
      </View>
    )
  }

  //Implement logic so questions are not duplicated

  function nextQuestion(){
    setQuestionCount(questionCount +1);
    setGiveHint(false);
    setUserAnswer('');
    const size = entryList.length;
    var index = Math.floor(Math.random() * entryList.length);

    console.log("index is: " +index);
    setRandomIndex(index);
  }


  // function getRandom(){
  //   //random index
  //
  //   const size = entryList.length;
  //   var index = Math.floor(Math.random() * size) + 1;
  //
  //   //randomIndex = index;
  //   // return entryList[index];
  // }

  function answerPress(text){
    setUserAnswer(text);


    if(text.toUpperCase() === entryList[randomIndex].emotionone.toUpperCase())
    {

      setIsCorrect(true);
      console.log("correct");
    }
    else {
      setIsCorrect(false);
      console.log("incorrect");
    }
  }

  function renderOutcome(){
    if(userAnswer){
      if(isCorrect){
        return(
          <Text style={{color: 'green', fontSize: 30}}>Correct!</Text>
        )
      }else{
        return(
          <Text style={{color: 'red', fontSize: 30}}>Incorrect!</Text>
        )
      }
    }

  }

  function renderQuestion(){
    var acc_output = '';
    var chal_output = '';

    if(entryList[randomIndex].accountability ==="me"){
      acc_output = "You are accountable for this event."
    }else {
      acc_output = "Someone else is accountable for this event"
    }

    if(entryList[randomIndex].challenges_goals ==="yes"){
      chal_output = "The event is an obstacle for your goal(s)"
    }else {
      chal_output = "The event is NOT an obstacle for your goal(s)"
    }
    return(
      <View>
        <Text>{acc_output}</Text>
        <Text>{chal_output}</Text>

        <View>
          <Text>The significance of this event to your personal life is</Text>
          <Text>{entryList[randomIndex].valenceValue} / 10</Text>
        </View>
        <View>
          <Text>The intensity of this event is</Text>
          <Text>{entryList[randomIndex].intensityValue} / 10</Text>
        </View>
      </View>
    )
  }

  return(
    <View style={{height: height}}>
      <View style={{backgroundColor: 'white', height: height}}>

        <View>
          <Text style={styles.subtitle}>What emotion would you feel if an emotional event has the following characteristics: </Text>
          {displayQuestionNumb()}

        </View>

        <View style={{borderWidth: 1}}>
          {renderQuestion()}


          {displayHint()}
        </View>



        <View style={{justifyContent: 'center', alignItems: 'center'}}>{renderOutcome()}</View>

        <View style={{marginTop: 60}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("angry")}>
              <Text style={styles.ansText}>Anger</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("sad")}>
              <Text style={styles.ansText}>Sadness</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("shame")}>
              <Text style={styles.ansText}>Shame</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("fear")}>
              <Text style={styles.ansText}>Fear</Text>
            </TouchableOpacity>

          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("joy")}>
              <Text style={styles.ansText}>Joy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("calm")}>
              <Text style={styles.ansText}>Calm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("happy")}>
              <Text style={styles.ansText}>Happy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("surprise")}>
              <Text style={styles.ansText}>Surprise</Text>
            </TouchableOpacity>

          </View>
        </View>


        <View style={{flex:1, marginBottom: 120,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.buttons}onPress={() => useHint()}>
            <Text style={styles.ansText} >TAP FOR HINT...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => nextQuestion()}>
            <Text style={styles.ansText}>NEW QUESTION</Text>
          </TouchableOpacity>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  title:{
    fontSize: 20,
    fontWeight: '500'
  },
  subtitle:{
    fontSize: 18,
    fontWeight: '300',
  },
  ansbutton:{
    marginHorizontal: 10,
    marginVertical: 10,
    width: 80,
    height: 30,
    backgroundColor: '#1b1054',
    borderRadius: 20

  },
  ansText:{
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',

  },
  buttons:{
    backgroundColor: '#1b1054',
    borderRadius: 20,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
