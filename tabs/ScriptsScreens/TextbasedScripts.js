import React, { Component, useRef } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { NavigationContainer } from '@react-navigation/native';
import { getDatabase } from "../../database";
import firebase from '@firebase/app';
import '@firebase/auth';

import Animated, {
  multiply,
  SpringUtils,
  Value,
} from "react-native-reanimated";
const { View, ScrollView } = Animated;
const { height, width } = Dimensions.get("window");
const scroll = useRef<Animated.ScrollView>(null);

class TextbasedScripts extends React.Component {
  constructor(props){
    super(props);
    this.setAnswer = this.setAnswer.bind(this);
    this.state = {
      scriptslist: [],
    };
  }

  componentDidMount(){
    getDatabase().ref('scripts/textbased').on('value', (snapshot) => {
      var list =[]
      snapshot.forEach((child) => {
        list.push({
          key: child.key,
          text: child.val().text,
          correct_answer: child.val().answer,
          is_answered: child.val().is_answered,
          user_answer: 'hello'
        })
      })
      this.setState({scriptslist:list})
      console.log(list.text);
    })
  }
  timeout(ms) { //pass a time in milliseconds to this function
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  setAnswer = (index, ans)=>{
    var list = [ ...this.state.scriptslist];

    let ans_tolower = ans.toLowerCase();
    list[index] = {...list[index], user_answer: ans_tolower};
    this.setState({scriptslist:list});


    if(index+1 === list.length)
    {
      //wait 1 second and then navigate
      setTimeout(function () {
        console.log("last item");
        alert("Last item");
      }, 1000);
      // console.log("last item");
    }

    console.log(index);

  }

  ifLastItem = (index) =>{
    var list = [ ...this.state.scriptslist];

    if(index+1 === list.length){
      return(
        <TouchableOpacity onPress={() => {this.props.navigation.navigate("FeatureThree")}}>
          <Text style={{fontSize: 24, color: '#1b1054'}}>End of the quiz!</Text>
      </TouchableOpacity>
      )
    }else {
      return(
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{fontSize: 24, color: '#1b1054',
        fontWeight: '900' }}>{index + 1}</Text>
        </View>
      )
    }
  }

  checkAnswer = (userans, corans) =>{
    let output = '';
    let colour = '';
    if(userans === corans){
      output = 'correct';
      colour= 'green'
    }else {
      output = 'incorrect';
      colour= 'red'
    }
    return(
      <View style={{height: height*0.1,
           justifyContent: 'center', alignItems: 'center',
           backgroundColor: colour, padding: 10}}>
        <Text style={{color: 'white'}}>{output}</Text>
      </View>
    )
  }

  pressMe = (userans, correctans) =>{

    if(userans === correctans)
    {
      console.log("correct!" + userans + correctans);
    }else {
      console.log("Incorrect!" + userans + correctans);
    }
  }
  render () {

    return(
      <View style={styles.container}>
            <View style= {{flex:1}}>
              <FlatList
                horizontal = {true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled ={true}
                marginTop= {10}
                data={this.state.scriptslist}
                keyExtractor={(item, index)=>item.key}
                renderItem={({item, index}) => {
                  return(
                    <View >

                      <View style={{ height: height*0.2, backgroundColor: '#1b1054', width: width,
                      justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap',
                      borderBottomLeftRadius: 100, borderBottomRightRadius: 100,
                      overflow: 'hidden'}}>

                      <Text style={{color: 'white', fontSize: 16, textAlign: 'center'}}>{item.text}</Text>

                      </View>
                      {this.ifLastItem(index)}
                      <View style={{height: height*0.5,
                           backgroundColor: 'white', width: width,
                           flexDirection: 'row', justifyContent: 'space-between',
                           alignItems: 'center'
                         }}>


                      {/*Buttons containing answers --------------------------*/}
                      <View style={{
                          marginLeft: 10,
                        }}>
                          <TouchableOpacity style={styles.answerBut}
                          onPress={() => this.setAnswer(index, "Anger")}>
                            <Text style={styles.answerstext}>Anger</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.answerBut}
                          onPress={() => this.setAnswer(index, "Happiness")}>
                            <Text style={styles.answerstext}>Happiness</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.answerBut}
                          onPress={() => this.setAnswer(index, "shame")}>
                            <Text style={styles.answerstext}>Shame</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.answerBut}
                          onPress={() => this.setAnswer(index, "surprise")}>
                            <Text style={styles.answerstext}>Surprise</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={{
                            marginRight: 10
                          }}>
                          <TouchableOpacity style={styles.answerBut}
                          onPress={() => this.setAnswer(index, "embarrassment")}>
                            <Text style={styles.answerstext}>Embarrassment</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.answerBut}
                          onPress={() => this.setAnswer(index, "contempt")}>
                            <Text style={styles.answerstext}>Contempt</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.answerBut}
                          onPress={() => this.setAnswer(index, "Fear")}>
                            <Text style={styles.answerstext}>Fear</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={styles.answerBut}
                          onPress={() => this.setAnswer(index, "sadness")}>
                            <Text style={styles.answerstext}>Sadness</Text>
                          </TouchableOpacity>
                      </View>
                      </View>
                      {this.checkAnswer(item.user_answer, item.correct_answer)}

                    </View>
                  )
                }}/>
            </View>
        {/*    <View style={{flex: '1', flexDirection: 'column'}}>
              <View style={{height: height*0.3, backgroundColor: 'blue'}}>
                <ScrollView
                  ref={scroll}
                  horizontal
                  snapToInterval={width}
                  decelerationRate="fast"
                  bounces={false}>

                </ScrollView>
              </View>
            </View> */}
  </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor: 'white'
  },
  answerBut:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b1054',
    marginBottom: 10,
    padding: 12,
    height: 60,
    width: 130,
    borderRadius: 60,

  },
  answerstext:{
    color: 'white',
    fontSize: 18,
  },
  flatlist: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  flatlistitem: {
    justifyContent: 'center',
    marginRight: 10,
    height: 260,
    width: 400,
    backgroundColor: '#83d6c8',
  },
  itemtext:{

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

})

export default TextbasedScripts;

{/*    <View>
        <Text>{item.user_answer}</Text>
        <View style= {styles.flatlistitem} >
            <Text>Script: {item.text}</Text>
            <Text>Is it answered: {item.is_answered}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style ={styles.inputField}
            onChangeText={(text) => this.setAnswer(item.key, text)}
             placeholder="Your answer.."placeholderTextColor="blue"/>

          <Picker selectedValue={''} style={{height:50, width:100}}
              onValueChange={(text) => this.checkAnswer(item.key, text)}>

            <Picker.Item label="Surprise" value="Surprise"/>
            <Picker.Item label="Happiness" value="Happiness"/>
            <Picker.Item label="Anger" value="Anger"/>
            <Picker.Item label="Shame" value="Shame"/>
          </Picker>
        </View>
      </View>*/}
