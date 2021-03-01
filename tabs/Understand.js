import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Dimensions, Text, Image, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { getDatabase } from "../database";
import { NavigationContainer } from '@react-navigation/native';
import firebase from '@firebase/app';
import '@firebase/auth';

const { height, width } = Dimensions.get("window");

class Understand extends React.Component {
  constructor(){
    super();
    this.state = {
      entryList: [],
      searchText: '',
      arrayholder: [],
      //Stats for filtered entries
      intensity: 0,
      valence: 0,
      accountability: '',
      obstacles: '',

      //boolean for rendering
      isChoosen: false,
      viewScript: false,

      chosenEmotion: '',
    }

  }
  componentDidMount()
  {
    getDatabase().ref('userstest/' + firebase.auth().currentUser.uid).on('value', (snapshot) =>{
      var list =[];
      console.log(snapshot);
      console.log(firebase.auth().currentUser.uid);
      snapshot.forEach((child) => {
        list.push({
          key: child.key,
          valenceValue: child.val().valenceValue,
          intensityValue: child.val().intensityValue,
          what_happened: child.val().what_happened,
          where_happened: child.val().where_happend,
          who_was_involved: child.val().who_was_involved,
          challenges_goals: child.val().challanges_goals,
          accountability: child.val().accountability,
          emotionone: child.val().emotionone,
          emotiontwo: child.val().emotiontwo,
          emotionthree: child.val().emotionthree,
          uri: child.val().uri
        })
      })
      this.setState({entryList: list})
      this.setState({arrayholder: list})
      console.log(list)
    })
  }

  filterFunction = (text) =>{
    const newData = this.state.arrayholder.filter(item =>
    {
      const itemData = item.emotionone.toUpperCase();
      // const text = "anger";
      const textData = text.toUpperCase();
      return itemData.indexOf(textData)>-1
    });
    // this.state.chosenEmotion = text;


    this.setState({entryList: newData, isChoosen: true, chosenEmotion: text});
  }


  logEntries = () =>{
    console.log(this.state.entryList);
  }

  //For some reason doesn't update automatically, have to press the button 2 times.
  findAverage =()=>{
    let intens = 0;
    let valence = 0;
    let obstacle = 0;
    let obstacleOutput = '';
    let accountability = 0;
    let accountabilityOutput = '';

    this.state.entryList.map((entry) => {
      intens += entry.intensityValue;
      valence += entry.valenceValue;
      console.log("going through map");
      if(entry.challenges_goals === "yes")
      {
        obstacle ++;
      }
      else if(entry.challenges_goals === "no")
      {
        obstacle --;
      }
      if(entry.accountability === "not_me")
      {
        accountability ++;
      }
      else if (entry.accountability ==="me")
      {
        accountability --;
      }
    })

    if(obstacle > 0)
    {
      obstacleOutput = "presents an obstacle towards a goal"
    }else {
      obstacleOutput = "doesn't present an obstacles towards a goal"
    }
    if(accountability >= 0)
    {
      accountabilityOutput = "not_me"
    }
    else{
      accountabilityOutput = "me"
    }

    intens = intens / this.state.entryList.length;
    intens = (Math.round(intens*100)/100).toFixed(2);
    valence = valence / this.state.entryList.length;
    valence = (Math.round(valence*100)/100).toFixed(2);

    this.setState({
      intensity: intens,
      valence: valence,
      accountability: accountabilityOutput,
      obstacles: obstacleOutput,
      viewScript: true
    })

    // this.setState({isChoosen: true})
    console.log("intensity: "+ intens + "| valence: " + valence +
    "| presents an obstacle: "+ obstacle + " " + obstacleOutput + "| accountability: " + accountability + " " + accountabilityOutput);
  }

  displayAccountability = () =>
    {
      if (this.state.accountability === "not_me") {
      return(
        <Text style={{fontSize: 18}}>When you think that someone else is accountable for the event</Text>
      )
    }else if(this.state.accountability === "me"){
      return(
        <Text style={{fontSize: 18}}>When you think that You are accountable for the event </Text>
      )
    }
  }


  renderStats = () =>{

    if(this.state.isChoosen && this.state.viewScript)
    {

      return(
        <View style={{borderWidth: 1, borderColor: 'black', marginVertical: 40}}>
          <Text>You have a tendancy to feel this emotion when..:</Text>


          <Text style={{fontSize: 18}}>The intensity of the emotional event is: {this.state.intensity} / 10</Text>

          <Text style={{fontSize: 18}}>The valence for the emotion is: {this.state.valence} / 10</Text>


          <Text style={{fontSize: 18}}>When the emotional event {this.state.obstacles}</Text>
          {this.displayAccountability()}
        </View>
      )
    }else {
      return(
        <View style={{justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{fontSize: 18}}>Tap on an emotion and then on 'View Script' to display your most used scripts for that emotion.</Text>
        </View>


      )
    }
  }


  render () {
    return(
      <View style={{backgroundColor: 'white', flex:1}}>

        <Text style={{fontSize: 18, fontWeight: '600'}}>On this page you can view the "scripts" for Your emotions.</Text>



        <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
          <TouchableOpacity style={styles.emotionBut} onPress={() => {this.filterFunction("angry")}}>
            <Image style={{height:60, width: 60}}source={require('../emojis/angry.jpg')}/>
            <Text style={styles.emotionText}>Anger</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emotionBut} onPress={() => {this.filterFunction("sad")}}>
            <Image style={{height:60, width: 60}}source={require('../emojis/sad.jpg')}/>
            <Text style={styles.emotionText}>Sadness</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emotionBut} onPress={() => {this.filterFunction("fear")}}>
            <Image style={{height:60, width: 60}}source={require('../emojis/afraid.jpg')}/>
            <Text style={styles.emotionText}>Fear</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.emotionBut} onPress={() => {this.filterFunction("shame")}}>
            <Image style={{height:60, width: 60}}source={require('../emojis/ashamed.jpg')}/>
            <Text style={styles.emotionText}>Shame</Text>

          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center'}}>
          <TouchableOpacity style={styles.emotionBut} onPress={() => {this.filterFunction("happy")}}>
            <Image style={{height:60, width: 60}}source={require('../emojis/happy.jpg')}/>
            <Text style={styles.emotionText}>Happy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emotionBut} onPress={() => {this.filterFunction("joy")}}>
            <Image style={{height:60, width: 60}}source={require('../emojis/joy.jpg')}/>
            <Text style={styles.emotionText}>Joy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emotionBut} onPress={() => {this.filterFunction("surprise")}}>
            <Image style={{height:60, width: 60}}source={require('../emojis/surprise.jpg')}/>
            <Text style={styles.emotionText}>Surprise</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.emotionBut} onPress={() => {this.filterFunction("calm")}}>
            <Image style={{height:60, width: 60}}source={require('../emojis/calm.jpg')}/>
            <Text style={styles.emotionText}>Calm</Text>
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
          <TouchableOpacity style={{borderWidth: 1, borderColor: 'black', width: width*0.2, marginTop: 20}}onPress={() => {this.findAverage()}}><Text style={{alignSelf: 'center', fontSize: 16}}>View Script</Text></TouchableOpacity>
        </View>


        {this.renderStats()}

        <TouchableOpacity style={{paddingVertical: 10, bottom: 0, position: 'absolute', backgroundColor: '#1b1054'}} onPress={() => this.props.navigation.navigate("UnderstandNew", {entryList: this.state.arrayholder})}
        ><Text style={{color: 'white'}}>Tap here to test your understanding of why you experience emotions</Text></TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  filterButton: {
    width: width*0.2,
    height: height*0.12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1b1054",
    borderRadius: 60,
    marginRight: 10
  },
  emotionBut:{
    width: width*0.2,
    height: height*0.12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  emotionText:{
    alignSelf: 'center'
  },
  filterButtonText:{
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  }
})

export default Understand;
