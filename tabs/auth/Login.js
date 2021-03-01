/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Dimensions
} from 'react-native';
// import firebasefrom '@firebase-auth';
// import * as firebase from 'firebase';
import firebase from '@firebase/app';
import '@firebase/auth';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class Register extends Component {
  constructor(props){
    super(props);

    this.state={
      email: '',
      password: '',
    }
    // this.onSignUp = this.onSignUp.bind(this)
  }



  onSignIn(){
    const { email, password} = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((result) =>{
      console.log((result));
    })
    .catch(err => {
      console.log(err);
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput
        style={{
          height: height*0.1,
          width: width,
          borderBottomWidth: 1,
          marginBottom: 50,
          marginTop: 30,
          borderBottomColor: '#1b1054'
          }}
        placeholder="email" onChangeText={(email)=> this.setState({email})}/>
        <TextInput
        style={{
          height: height*0.1,
          width: width,
          borderBottomWidth: 1,
          borderBottomColor: '#1b1054'
          }}
         placeholder="password" secureTextEntry={true} onChangeText={(password)=> this.setState({password})}/>

        <TouchableOpacity
         style={{
           height: height*0.14,
           width: width*0.7,
           position: 'absolute',
           bottom: 0,
           backgroundColor: '#1b1054',
           borderRadius: 60,
           alignItems: 'center',
           alignSelf: 'center',
           justifyContent: 'center'
           }}
         onPress={()=>{this.onSignIn()}}>
            <Text style={{
              color: 'white',
              fontSize: 24,
              fontWeight: '700'
              }}>Log In</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafc'
  },
});
