import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Dimensions, Image, Text, View, ScrollView, TextInput, TouchableOpacity, useWindowDimensions, KeyboardAvoidingView } from 'react-native';
import { getDatabase } from "../database";
import firebase from '@firebase/app';
import '@firebase/auth';

const { height, width } = Dimensions.get("window");

class EmotionChoice extends React.Component {
  constructor(props){
    super(props);
    this.state={
      emotionone: '',
      emotiontwo: '',
      emotionthree: '',
      valenceValue: props.route.params.valenceValue,
      intensityValue: props.route.params.intensityValue,
      what_happened: props.route.params.what_happened,
      where: props.route.params.where,
      who_was_involved: props.route.params.who_was_involved,
      challanges_goals: props.route.params.challanges_goals,
      accountability: props.route.params.accountability,
      image: '',
      // emotionone: 'anger',
      // valenceValue: 5,
      // intensityValue: 5,
      // what_happened: 'fell down the stairs',
      // where: 'in school',
      // who_was_involved: 'me and my friends',
      // challanges_goals: 'no',
      // accountability: 'not_me',
      // image: ''
    }

  }
  onChoosePrimaryEmotion = (emotion, img) =>{
    // console.log(emotion);
    // console.log(img);
    this.setState({emotionone: emotion, image: img})
  }

  renderEmotionChoice = ()=>{
    return(
        <View style={{backgroundColor: 'white'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, marginRight: 40}}>
            <TouchableOpacity onPress={() => this.onChoosePrimaryEmotion("angry", "angry.jpg")}>
              <Image source={require("../emojis/angry.jpg")}
                style={{height: height*0.16, width: width*0.3}}/>
              <Text style={styles.emotionText}>Anger</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onChoosePrimaryEmotion("shame", "ashamed.jpg")}>
              <Image source={require("../emojis/ashamed.jpg")}
                style={{height: height*0.16, width: width*0.3}}/>
              <Text style={styles.emotionText}>Shame</Text>
            </TouchableOpacity>
          </View>


          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, marginRight: 40}}>
            <TouchableOpacity onPress={() => this.onChoosePrimaryEmotion("fear", "afraid.jpg")}>
              <Image source={require("../emojis/afraid.jpg")}
                style={{height: height*0.16, width: width*0.3}}/>
              <Text style={styles.emotionText}>Fear</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onChoosePrimaryEmotion("sad", "sad.jpg")}>
              <Image source={require("../emojis/sad.jpg")}
                style={{height: height*0.16, width: width*0.3}}/>
              <Text style={styles.emotionText}>Sad</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, marginRight: 40}}>
            <TouchableOpacity onPress={() => this.onChoosePrimaryEmotion("happy", "happy.jpg")}>
              <Image source={require("../emojis/happy.jpg")}
                style={{height: height*0.16, width: width*0.3}}/>
              <Text style={styles.emotionText}>Happy</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onChoosePrimaryEmotion("surprise", "surprise.jpg")}>
              <Image source={require("../emojis/surprise.jpg")}
                style={{height: height*0.16, width: width*0.3}}/>
              <Text style={styles.emotionText}>Surprise</Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, marginRight: 40}}>
            <TouchableOpacity onPress={() => this.onChoosePrimaryEmotion("calm", "calm.jpg")}>
              <Image source={require("../emojis/calm.jpg")}
                style={{height: height*0.16, width: width*0.3}}/>
              <Text style={styles.emotionText}>Calm</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.onChoosePrimaryEmotion("joy", "joy.jpg")}>
              <Image source={require("../emojis/joy.jpg")}
                style={{height: height*0.16, width: width*0.3}}/>
              <Text style={styles.emotionText}>Joy</Text>
            </TouchableOpacity>
          </View>

      </View>
    )
  }
  renderEntry =()=>{
    var acc_output = '';
    var chal_output = '';

    //Check accountability
    if(this.state.accountability==="me"){
      acc_output = "I am responsible for this event."
    }else if(this.state.accountability==="not_me"){
      acc_output= "Someone else is responsible for this event."
    }else if (this.state.accountability==="not_sure") {
      acc_output="I am not sure who is responsible for this event."
    }

    //Check if it presents obstacles
    if(this.state.challanges_goals ==="yes"){
      chal_output = "This event presents and obstacle towards my goals"
    }else {
      chal_output = "This event is NOT an obstacle towards my goals"
    }


    return(
      <View>
        <View>
          <Text style={styles.text1}>Place of event</Text>
          <Text style={styles.text2}>{this.state.where}</Text>
        </View>
        <View>
          <Text style={styles.text1}>Involvement</Text>
          <Text style={styles.text2}>{this.state.who_was_involved}</Text>
        </View>
        <View>
          <Text style={styles.text1}>Exchange</Text>
          <Text style={styles.text2}>{this.state.what_happened}</Text>
        </View>

        <View>
          <View>
            <Text style={styles.text1} >Significance</Text>
            <Text style={styles.text2}>{this.state.valenceValue}/10</Text>
          </View>

          <View>
            <Text style={styles.text1}>Intensity</Text>
            <Text style={styles.text2}>{this.state.intensityValue}/10</Text>
          </View>
        </View>

        <Text style={styles.text2}>{acc_output}</Text>
        <Text style={styles.text2}>{chal_output}</Text>

        <View style={{height:1, backgroundColor: 'black', width: width}}/>
      </View>
    )
  }
  onPressSubmit = (valence, intensity, what, where, who, challenges, accountability, emone, emtwo, emthree) => {
    var userId = firebase.auth().currentUser.uid;
    getDatabase().ref('userstest/'+ userId).push({
      valenceValue: valence,
      intensityValue: intensity,
      what_happened: what,
      where_happend: where,
      who_was_involved: who,
      challanges_goals: challenges,
      accountability: accountability,
      emotionone: emone,
      emotiontwo: emtwo,
      emotionthree: emthree
    });

    this.props.navigation.navigate("Reflect");
  }
  render () {
    return(

      <ScrollView style={{backgroundColor: 'white'}}>
        <Text style={{alignSelf: 'center', fontSize: 30}}>Entry </Text>
        <View style={{height:1, backgroundColor: 'black', width: width}}/>


        {this.renderEntry()}

        <Text style={{marginTop: 20, fontSize: 24, fontWeight: '600'}}>What emotion does this event make you feel?</Text>
        {this.renderEmotionChoice()}


        <Text style={{fontSize: 30, fontWeight: '500', alignSelf: 'center'}}>{this.state.emotionone}</Text>

        <Text style={{alignSelf: 'center', fontSize: 18, marginTop: 20}}>Additional feelings (up to 2)</Text>

        <View style={{marginTop: 20}}>

          <TextInput style={styles.inputfields} onChangeText={(input) => this.setState({emotiontwo: input})}
            placeholder = "..." placeholderTextColor="black"/>
          <TextInput style={styles.inputfields} onChangeText={(input) => this.setState({emotionthree: input})}
            placeholder = "..." placeholderTextColor="black"/>
        </View>



        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.submit}
            onPress = {() =>
              this.onPressSubmit(this.state.valenceValue, this.state.intensityValue, this.state.what_happened, this.state.where,
              this.state.who_was_involved, this.state.challanges_goals, this.state.accountability, this.state.emotionone,
              this.state.emotiontwo, this.state.emotionthree)}>
              <Text style={styles.buttonsText}>Submit</Text>
            </TouchableOpacity>
        </View>

      </ScrollView>
    )
  }
}


const  styles= StyleSheet.create({
  text1:{
    fontSize: 18,
    alignSelf: 'center'
  },
  text2:{
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: '600'
  },
  inputfields: {
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#1b1054',
    // elevation: 1,
    width: width,

    // flex: 1
  },
  emotionText:{
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center'
  },
  submit:{
    marginTop: 30,
    height: height*0.1,
    width: width*0.5,
    backgroundColor: '#1b1054',
    padding: 10,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonsText:{
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },
})

export default EmotionChoice;
