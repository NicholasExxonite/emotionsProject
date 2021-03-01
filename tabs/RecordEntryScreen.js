import React, { Component } from 'react';
import { StyleSheet, Image, Button, Dimensions, Text, View, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView, ScrollView} from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import Slider from '@react-native-community/slider';
import { getDatabase } from "../database";
import firebase from '@firebase/app';
import '@firebase/auth';

const { height, width } = Dimensions.get("window");

class RecordEntryScreen extends Component {

  state ={
    valenceValue: 0,
    intensityValue: 0,
    what_happened: '',
    where: '',
    who_was_involved: '',
    challanges_goals: '',
    accountability: '',
    image: '',
    emotionone: '',
    emotiontwo: '',
    emotionthree: '',
    visible: false,
    isselectNo: false,
    isselectYes: false,
  }

  setValenceValue = (value) =>{
    this.setState({valenceValue: value})
  }

  setIntensityValue = (value) =>{
    this.setState({intensityValue: value})
  }

  onChangeWhatHappened = (input) =>{
    this.setState({what_happened: input})
  }
  onChangeWhereItHappened = (input) =>{
    this.setState({where: input})
  }
  onChangeWhoWasInvolved = (input) =>{
    this.setState({who_was_involved: input})
  }

  onChoosePrimaryEmotion = (emotion, img) =>{
    console.log(emotion);
    console.log(img);
    this.setState({emotionone: emotion, image: img})

  }

  changestyle = (text) =>{
    if(text==="yes")
    {
      if (this.state.isselectYes) {
        return styles.selectedBut
      }else {
        return styles.notselectedBut
      }
    }else {
      if (this.state.isselectNo) {
        return styles.selectedBut
      }else {
        return styles.notselectedBut
      }
    }

  }

  onPressSubmit = (valence, intensity, what, where, who, challenges, accountability, img, emone, emtwo, emthree) => {
    var userId = firebase.auth().currentUser.uid;
    getDatabase().ref('userstest/'+ userId).push({
      valenceValue: valence,
      intensityValue: intensity,
      what_happened: what,
      where_happend: where,
      who_was_involved: who,
      challanges_goals: challenges,
      accountability: accountability,
      image: img,
      emotionone: emone,
      emotiontwo: emtwo,
      emotionthree: emthree
    });
  }

  render () {

    return(
      <ScrollView style={styles.container}>
        <View style={{paddingTop: 20}}>
          <TextInput style={styles.inputfields} onChangeText={this.onChangeWhatHappened}
            placeholder = "What Happened.." placeholderTextColor="black"/>
          <TextInput style={styles.inputfields} onChangeText={this.onChangeWhereItHappened}
            placeholder = "Where did it happen.." placeholderTextColor="black"/>
          <TextInput style={styles.inputfields} onChangeText={this.onChangeWhoWasInvolved}
            placeholder = "Who was involved.." placeholderTextColor="black"/>
        </View>

        <View style={{marginTop: 40}}>
          <Text style={{fontSize: 18}}>How would you rate the significance of this situation to your personal life?</Text>
        </View>

        <View style={{paddingTop: 10, justifyContent: 'center',
         alignItems: 'center'}}>
         <Text style={{fontSize: 24}}>{this.state.valenceValue}</Text>
         </View>

        <Slider
        style={{width:400, height:40}}
        minimumValue={0}
        maximumValue={10}
        step={1}
        minimumTrackTintColor="#307ecc"
        maximumTrackTintColor="#000000"
        value={this.state.valenceValue}
        onValueChange={(sliderValue) => this.setValenceValue(sliderValue)}
        />

        <View style={{marginTop: 40}}>
          <Text style={{fontSize: 18}}>Does the situation present an obstacle for Your goals</Text>
        </View>

        <View style={{flexDirection: 'row', flexWrap: 'wrap',
         justifyContent: 'space-between', marginLeft: 40, marginRight: 40,
         marginTop: 30,
          }}>
        <TouchableOpacity
           style={this.changestyle("no")}
           onPress={() => this.setState({challanges_goals: 'no', isselectNo: !this.state.isselectNo, isselectYes: false, })}>
            <Text style={styles.buttonsText}>No</Text>
        </TouchableOpacity>

        <TouchableOpacity
           style={this.changestyle("yes")}
           onPress={() => this.setState({challanges_goals: 'yes', isselectYes: !this.state.isselectYes, isselectNo: false,})}>
            <Text style={styles.buttonsText}>Yes</Text>
        </TouchableOpacity>
        </View>

        <View style={{marginTop: 40, alignItems: 'center'}}>
          <Text style={{fontSize: 18}}>Who is responsible for what happened in this event?</Text>
        </View>


        <View style={{flexDirection: 'row', flexWrap: 'wrap',
         justifyContent: 'space-between', marginLeft: 40, marginRight: 40,
         marginTop: 30,
          }}>
        <TouchableOpacity
           style={{
             height: height*0.15,
             width: width*0.3,
             backgroundColor: '#1b1054',
             marginBottom: 30,
             alignItems: 'center',
             justifyContent: 'center',
             borderRadius: 60
           }}
           onPress={() => this.setState({accountability: 'me'})}>
            <Text style={styles.buttonsText}>I am</Text>
        </TouchableOpacity>

        <TouchableOpacity
           style={{
             height: height*0.15,
             width: width*0.3,
             backgroundColor: '#1b1054',
             marginBottom: 30,
             alignItems: 'center',
             justifyContent: 'center',
             borderRadius: 60,

           }}
           onPress={() => this.setState({accountability: 'not_me'})}>
            <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>Someone else</Text>
        </TouchableOpacity>
        </View>

        <View style={{marginTop: 40, alignItems: 'center',flexDirection: 'row'}}>
          <View>
            <Button
              title="?"
              color="#1b1054"
              onPress={() => {
                this.setState({ visible: true });
                }}
              />
            <Dialog
              visible={this.state.visible}
              onTouchOutside={() => {
                this.setState({ visible: false });
              }}
              >
              <DialogContent>
                <Text>This slider represents Intensity of an emotion. 0 means the intensity is weak, and coping with the event is easy. 10 means the intensity is really strong, and coping with the event is hard.</Text>
              </DialogContent>
            </Dialog>
          </View>

          <Text style={{fontSize: 18}}>How hard do you think it would be to deal with this event?</Text>
        </View>

        <View style={{paddingTop: 10, justifyContent: 'center',
         alignItems: 'center'}}>
         <Text style={{fontSize: 24}}>{this.state.intensityValue}</Text>
         </View>

        <View style={{flexDirection: 'row'}}>

          <Text>Easy</Text>
          <Slider
          style={{width: width*0.8, height:40}}
          minimumValue={0}
          maximumValue={10}
          step={1}
          minimumTrackTintColor="#307ecc"
          maximumTrackTintColor="#000000"
          value={this.state.intensityValue}
          onValueChange={(sliderValue) => this.setIntensityValue(sliderValue)}
          />
        <Text>Hard</Text>

        </View>

        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={styles.submit}
            onPress={()=> {this.props.navigation.navigate("Emotions",
        {
          valenceValue: this.state.valenceValue,
          intensityValue: this.state.intensityValue,
          what_happened: this.state.what_happened,
          where: this.state.where,
          who_was_involved: this.state.who_was_involved,
          challanges_goals: this.state.challanges_goals,
          accountability: this.state.accountability,
          // image: this.state.image,
        })}}>
            <Text style={styles.buttonsText}>Next</Text>
          </TouchableOpacity>
      </View>

      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    width: width,
    backgroundColor: 'white'
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
  inputfields: {
    margin: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#1b1054',
    // elevation: 1,
    width: width,

    // flex: 1
  },
  buttonsText:{
    fontSize: 30,
    fontWeight: '600',
    color: 'white',
  },
  selectedBut:{
    height: height*0.15,
    width: width*0.3,
    backgroundColor: 'green',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60
  },
  notselectedBut:{
    height: height*0.15,
    width: width*0.3,
    backgroundColor: '#1b1054',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60
  }
})

export default RecordEntryScreen;
