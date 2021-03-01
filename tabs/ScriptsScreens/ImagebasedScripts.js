  import React, { Component, useRef } from 'react';
  import { StyleSheet, Text, Image, TextInput, TouchableOpacity, FlatList, Dimensions} from 'react-native';
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

  class ImagebasedScripts extends React.Component {
    constructor(props){
      super(props);
      this.setAnswer = this.setAnswer.bind(this);
      let temp_var = "Choose an emotion."
      this.state = {
        score: 0,
        scriptslist: [
          {
            // uri: 'https://image.freepik.comxx/free-vector/angry-emoji_53876-25519.jpg',
            uri: require("../../images/anger.jpg"),
            id: 'anger',
            user_ans: ''
          },
          {
            // uri: 'https://image.freepik.com/free-vector/happy-emoji_53876-25513.jpg',
            uri: require('../../images/sadness.jpg'),
            id: 'sadness',
            user_ans: ''
          },
          {
            // uri: 'https://image.freepik.com/free-vector/sad-emoji_53876-25516.jpg',
            uri: require('../../images/disgust.jpg'),
            id: 'disgust',
            user_ans: ''
          },
          {
            uri: require('../../images/contempt.jpg'),
            id: 'contempt',
            user_ans: ''
          },
          {
            uri: require('../../images/surprise.jpg'),
            id: 'surprise',
            user_ans: ''
          },
          {
            uri: require('../../images/happiness.jpg'),
            id: 'happiness',
            user_ans: ''
          },
          {
            uri: require('../../images/fear.jpg'),
            id: 'fear',
            user_ans: ''
          },

        ],
      };
    }
    /*Functions--------------------------------------------------------*/
    componentDidMount(){
      console.log(this.state.scriptslist);
    }


    ifLastItem = (index) =>{
      var list = [ ...this.state.scriptslist];

      if(index+1 === list.length){
        return(
          <TouchableOpacity onPress={() => this.calculateScore()}>
            <Text>Finish!</Text>
          </TouchableOpacity>
        )
      }
      else{
        return(
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 24, color: '#1b1054',
          fontWeight: '900' }}>{index + 1}</Text>
          </View>
        )
      }
    }

    calculateScore = () =>{
      var list = [ ...this.state.scriptslist];
      var temp_score = 0;

      list.map(item => {

        if(item.id === item.user_ans){
          temp_score++;
        }
        else {
          temp_score--;
        }
      })

      this.state.score = temp_score;
      console.log(list);
      console.log(temp_score);
    }



    renderImage = (index) => {
      return(
        // <Image source={{uri: this.state.scriptslist[index].uri}}
        // style={{height:height*0.4, width:width}}/>
        <Image source={this.state.scriptslist[index].uri}
          style={{height:height*0.4, width:width}}/>

      )
    }

    setAnswer = (ans, index) =>{
      var list = [ ...this.state.scriptslist];

      ans = ans.toLowerCase();
      console.log(ans);
      list[index] = {...list[index], user_ans: ans};
      this.setState({scriptslist:list});

      let corr_ans = list[index].id;
      let user_ans = list[index].user_ans;

      //Call checkAnswer function
      this.checkAnswer(corr_ans, user_ans);
    }

    //Check answer Funciont - if correct increment score.
    checkAnswer = (correct, user_ans) => {
      if (correct === user_ans){
        console.log("correct");
        this.setState(prevState => ({score: prevState.score + 1}));
      }
      else {
        console.log("incorrect");
        this.setState(prevState => ({score: prevState.score - 1}));
      }
      console.log(this.state.score);
    }



    /*Render -----------------------------------------------------------*/
    render(){
      return(
        <View>
          <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled ={true}
          marginTop= {10}
          data={this.state.scriptslist}
          keyExtractor={(item, index)=>item.id}
          renderItem={({item, index}) => {
            return(
              <View>
                <View>
                  {this.renderImage(index)}
                </View>
                {this.ifLastItem(index)}

                <View>
                  <TextInput placeholder="Your answer.."placeholderTextColor="blue"/>

                  <Text>Your answer is : {item.user_ans}
                  Your score is:</Text>

                  <View style={{height:100, width:130,
                     backgroundColor: '#1b1054', borderRadius: 100,}}>

                      <Picker selectedValue={'Tap here'}
                        onValueChange={(text) => this.setAnswer(text, index)}
                        value={item.user_ans}
                        style={{height:100, width:130, color: 'white'}}
                        >

                        <Picker.Item label = "Tap here"/>
                        <Picker.Item label="Surprise" value="Surprise"/>
                        <Picker.Item label="Happiness" value="Happiness"/>
                        <Picker.Item label="Anger" value="Anger"/>
                        <Picker.Item label="Shame" value="Shame"/>
                      </Picker>
                  </View>

                </View>
            </View>
            )
          }}/>
        </View>
      )
    }
  }
  export default ImagebasedScripts;
