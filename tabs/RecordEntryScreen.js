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

    visible1: false,
    visible2: false,

    isselectNo: false,
    isselectYes: false,

    resp_i_am: false,
    resp_some_else: false,
    resp_not_sure: false,
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

  resp_changeStyle= (text) =>{
    if(text === "i_am"){
      if(this.state.resp_i_am){
        return styles.resp_button_selected
      }else {
        return styles.resp_button
      }
    }else if (text === "someone_else") {
      if(this.state.resp_some_else){
        return styles.resp_button_selected
      }else {
        return styles.resp_button
      }
    }else {
      if(this.state.resp_not_sure){
        return styles.resp_button_selected
      }else {
        return styles.resp_button
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

  displayModal =(text)=>{
    return(
      <View style={{marginRight: 10,}}>
        <TouchableOpacity style={{ height: 30, width:30,borderWidth: 1, borderRadius: 60,alignItems: 'center', justifyContent: 'center', opacity: 0.5,}}onPress={() => {
            this.setState({visible1: true})
          }}><Text>?</Text></TouchableOpacity>

        <Dialog
          visible={this.state.visible1}
          onTouchOutside={() => {
            this.setState({visible1: false });
          }}
          >
          <DialogContent>
            <Text>{text}</Text>
          </DialogContent>
        </Dialog>
      </View>
    )
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

        <View style={{marginTop: 40, alignItems: 'center',flexDirection: 'row', flexWrap: 'wrap'}}>
          {this.displayModal('This slider represents on a scale from 0-10 how significant the event is to your personal life. 0 would mean that the event has almost no significane to your personal life. 10 would mean that the event has a huge significance to your personal life.')}
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
          <Text style={{fontSize: 18, alignItems: 'center'}}>Does the situation present an obstacle for Your goals</Text>
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
           style={this.resp_changeStyle("i_am")}
           onPress={() => this.setState({accountability: 'me', resp_i_am: !this.state.resp_i_am, resp_not_sure: false, resp_some_else: false})}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>I am</Text>
        </TouchableOpacity>

        <TouchableOpacity
           style={this.resp_changeStyle("someone_else")}
           onPress={() => this.setState({accountability: 'not_me', resp_some_else: !this.state.resp_some_else, resp_i_am: false, resp_not_sure: false})}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>Someone else</Text>
        </TouchableOpacity>

        <TouchableOpacity
           style={this.resp_changeStyle("not_sure")}
           onPress={() => this.setState({accountability: 'not_sure', resp_not_sure: !this.state.resp_not_sure, resp_i_am: false, resp_some_else: false})}>
            <Text style={{fontSize: 16, fontWeight: '600', color: 'white'}}>Not sure</Text>
        </TouchableOpacity>
        </View>

        <View style={{marginTop: 40, alignItems: 'center',flexDirection: 'row', flexWrap: 'wrap'}}>

          <View style={{marginRight: 10,}}>
            <TouchableOpacity style={{ height: 30, width:30,borderWidth: 1, borderRadius: 60,alignItems: 'center', justifyContent: 'center', opacity: 0.5,}} onPress={() => {
                this.setState({visible2: true})
              }}><Text style={{fontSize: 20}}>?</Text></TouchableOpacity>

            <Dialog
              visible={this.state.visible2}
              onTouchOutside={() => {
                this.setState({ visible2: false });
              }}
              >
              <DialogContent>
                <Text>This slider represents on a scale from 0-10 how intense the emotional event is. 0 means that the intensity was really low andx coping with the event will be EASY. 10 means the intensity was really high and coping with the event will be HARD</Text>
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
  },
  resp_button:{
    height: height*0.12,
    width: width*0.25,
    backgroundColor: '#1b1054',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60
  },
  resp_button_selected:{
    height: height*0.12,
    width: width*0.25,
    backgroundColor: 'green',
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60
  },
})

export default RecordEntryScreen;
