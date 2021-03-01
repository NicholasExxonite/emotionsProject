import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View, TextInput, TouchableOpacity, Picker, KeyboardAvoidingView, ScrollView} from 'react-native';
// import { db } from './src/config';
// import EmotionsDropDown from "../components/EmotionsDropDown";
import EmotionsDropDown from "../components/EmotionsDropDown";
import { getDatabase } from "../database";
import { ColorPicker } from 'react-native-color-picker';
import Slider from '@react-native-community/slider';
import firebase from '@firebase/app';
import '@firebase/auth';

const { height, width } = Dimensions.get("window");

class HomeScreen extends Component {

state = {
   name: '',
   add_info: '',
   where_it_happend: '',
   what_time: '',
   color: '',
}

onChangeName = (input) => {
  this.setState({ name: input })

}
onChangeAddInfo = (input) =>{
  this.setState({add_info: input})

}
onChangeWhereItHap = (input) =>{
  this.setState({where_it_happend: input})

}
onChangeWhatTime = (input) =>{
  this.setState({what_time: input})

}

onPressSubmit = (name, add_info, where_it_happend,what_time, color) => {
  var userId = firebase.auth().currentUser.uid;
  getDatabase().ref('users/'+ userId).push({
    emotion: name,
    additional_information: add_info,
    place_of_event: where_it_happend,
    time_of_event: what_time,
    backgroundColour: color
  });

}

alert = (name, add_info, where_it_happend, what_time) => {
  this.username = name;
  alert('Your name is: ' + name + '\n Additional information: ' + add_info +
   "\n Where it happeed: " + where_it_happend + "\n The time was: " + what_time)
}

  render(){

    return(
      <KeyboardAvoidingView style={{  flexDirection: 'column',
        height: height,

        alignItems: 'center',
        }}
        behavior="padding">


            <View style={{backgroundColor: this.state.color,flexDirection: 'column',
            justifyContent: 'center',
            height: height*0.4,
            width: width,
            borderBottomLeftRadius: 100, borderBottomRightRadius: 100,
            flexWrap: 'wrap',
           } } >

                <View style={styles.inputs_top}>
                    <TextInput style={styles.inputfields} onChangeText={this.onChangeName}
                  placeholder = "Emotion.." placeholderTextColor="black"/>

                    <TextInput style={styles.inputfields} onChangeText={this.onChangeAddInfo}
                    placeholder = "Additional information.." placeholderTextColor="black"/>
                </View>

                <View style={styles.inputs_bot}>
                    <TextInput style={styles.inputfields} onChangeText={this.onChangeWhereItHap}
                    placeholder = "Place of event.." placeholderTextColor="black"/>
                    <TextInput style={styles.inputfields} onChangeText={this.onChangeWhatTime}
                    placeholder = "Time of event.." placeholderTextColor="black"/>
                </View>

              </View>

              <View style={{height:height*0.3}}>
                <ColorPicker onColorSelected={color => this.setState({ color: color })}
                  sliderComponent={Slider} style={{flex:1, height:200, width:200,}}/>
              </View>

              <TouchableOpacity style={{
                backgroundColor: "#1b1054",
                width: width*0.6,
                height: height*0.1,
                padding: 10,
                borderRadius: 60,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 50,

                }}
                 onPress = { ()=> this.onPressSubmit(this.state.name, this.state.add_info, this.state.where_it_happend, this.state.what_time, this.state.color)}>
                  <Text style={{
                      color:'white',
                      fontSize: 21,
                      fontWeight: '600'
                    }}> Submit </Text>
              </TouchableOpacity>



      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 200,
    paddingBottom: 40,
  },
  colorcontainer:{
    borderColor: 'black',
  },
  inputs:{

    flexDirection: 'column',
    justifyContent: 'space-around',
    // alignItems: 'center',
    flexWrap: 'wrap',
    margin: 5,
  },
  inputs_top:{
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },

  inputs_bot:{

    flexDirection: 'column',
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
  title:{

  },
  submitooft:{
    // flex:1,
    marginTop: 100,
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },

  submitBut: {
    backgroundColor: "#7a42f4",
    padding: 10,
    borderRadius: 10,
    elevation: 8,
    marginTop: 100,

    // flex:2

  }
})

export default HomeScreen;
