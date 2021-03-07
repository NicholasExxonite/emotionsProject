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

    // console.log("index is: " +index);
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

    // console.log("index is: " +index);
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
      // console.log("correct");
    }
    else {
      setIsCorrect(false);
      // console.log("incorrect");
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
      acc_output = "You are responsible for this event."
    }else if (entryList[randomIndex].accountability==="not_me"){
      acc_output = "Someone else is responsible for this event"
    }else if(entryList[randomIndex].accountability==="not_sure"){
      acc_output = "You are not sure who is responsible for this event"
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
          <Text style={styles.subtitle}>Can you guess which emotion you felt in this event, based only on these captured stats?</Text>
          <Text style={{fontSize: 12, alignSelf: 'center', opacity: 0.6}}>(Capture more events to diversify the questions!)</Text>
          {displayQuestionNumb()}

        </View>

        <View style={{borderWidth: 1}}>
          {renderQuestion()}


          {displayHint()}
        </View>



        <View style={{justifyContent: 'center', alignItems: 'center'}}>{renderOutcome()}</View>

        <View style={{marginTop: 40}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.ansbutton}onPress={() => answerPress("angry")}>
              <Image style={styles.image} source= {require('../emojis/angry.jpg')} />
              <Text style={styles.ansText}>Anger</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton}onPress={() => answerPress("sad")}>
              <Image style={styles.image} source={require('../emojis/sad.jpg')}/>
              <Text style={styles.ansText}>Sadness</Text>
            </TouchableOpacity>

            <TouchableOpacity  style={styles.ansbutton}onPress={() => answerPress("shame")}>
              <Image style={styles.image} source={require('../emojis/ashamed.jpg')}/>
              <Text style={styles.ansText}>Shame</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton}onPress={() => answerPress("fear")}>
              <Image style={styles.image} source={require('../emojis/afraid.jpg')}/>
              <Text style={styles.ansText}>Fear</Text>
            </TouchableOpacity>

          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("joy")}>
              <Image style={styles.image} source={require('../emojis/joy.jpg')}/>
              <Text style={styles.ansText}>Joy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("calm")}>
              <Image style={styles.image} source={require('../emojis/calm.jpg')}/>
              <Text style={styles.ansText}>Calm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("happy")}>
              <Image style={styles.image} source={require('../emojis/happy.jpg')}/>
              <Text style={styles.ansText}>Happy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ansbutton} onPress={() => answerPress("surprise")}>
              <Image style={styles.image} source={require('../emojis/surprise.jpg')}/>
              <Text style={styles.ansText}>Surprise</Text>
            </TouchableOpacity>

          </View>
        </View>


        <View style={{flex:1, marginBottom: 120,flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <TouchableOpacity style={styles.buttons}onPress={() => useHint()}>
            <Text style={styles.ansTextBot} >TAP FOR HINT...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => nextQuestion()}>
            <Text style={styles.ansTextBot}>NEW QUESTION</Text>
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

  },
  ansText:{
    color: 'black',
    alignSelf: 'center'

  },
  ansTextBot:{
    color: 'white',
    alignSelf: 'center',
    fontSize: 18,
  },
  buttons:{
    backgroundColor: '#1b1054',
    borderRadius: 20,
    height: 35,
    width:200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image:{
    width:60,
    height:60
  }
})
