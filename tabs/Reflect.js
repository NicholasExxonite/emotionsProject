import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Alert, Image, Dimensions, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { getDatabase } from "../database";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { NavigationContainer } from '@react-navigation/native';
import firebase from '@firebase/app';
import '@firebase/auth';


//height and width of the screen
const { height, width } = Dimensions.get("window");
class Reflect extends React.Component {
  constructor(){
    super();
    this.state = {
      entryList: [],
      searchText: '',
      arrayholder: [],
      compareArray: [],
      shouldCompare: false,
      dialogVisible: false,
      angry: require('../emojis/angry.jpg'),
      sad: require('../emojis/sad.jpg'),
      fear: require('../emojis/afraid.jpg'),
      shame: require('../emojis/ashamed.jpg'),
      happy: require('../emojis/happy.jpg'),
      calm: require('../emojis/calm.jpg'),
      surprise: require('../emojis/surprise.jpg'),
      joy: require('../emojis/joy.jpg'),
    }
  }



  componentDidMount()
  {
    getDatabase().ref('userstest/' + firebase.auth().currentUser.uid).on('value', (snapshot) =>{
      var list =[];

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
          reflection: child.val().reflection,
          image: child.val().image,
          isSelect: false,
          selectedClass: styles.list,
          // uri: require('../emojis/'+ child.val().image),
          // uri: require("../emojis/angry.jpg"),


        })
      })
      this.setState({entryList: list})
      this.setState({arrayholder: list})

    })
  }


  searchFilterFunction = (text) =>{

    const newData = this.state.arrayholder.filter(item =>{
      const itemData = item.emotionone.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData)> -1
    });

    this.setState({entryList: newData, searchText: text});
  }

  itemSeparator = () =>{
    return(
      <View style={{
          height: 1,
          width: width*0.8,
          backgroundColor: "#000",
          opacity: 80,
        }}></View>
    )
  }

  logEntries = () =>{
    console.log();
  }

  selectItem = data => {
    data.isSelect = !data.isSelect;
    data.selectedClass = data.isSelect ? styles.selected : styles.list;

    const index = this.state.entryList.findIndex(
      item => data.id === item.id
    );

    this.state.entryList[index] = data;

    this.setState({
      entryList: this.state.entryList,
      });
  };

  addForCompare = (data) =>{
    let newArray = this.state.compareArray;

    newArray.push(data);

    this.setState({compareArray: newArray})
    // console.log("data pushed:");
    // console.log(this.state.compareArray.length);
    if(this.state.compareArray.length === 2)
    {
      // console.log("2 ELEMENTS");

      this.props.navigation.navigate("Compare", {compArray: this.state.compareArray});
      this.setState({compareArray: []});
    }
  }

  selectItem = (data) =>{
    // console.log("haha" + data.item.isSelect);
    data.item.isSelect = !data.item.isSelect;
    data.item.selectedClass = data.item.isSelect? styles.selected : styles.entry;

     // const index = this.state.entryList.findIndex(data.item);
    // this.state.entryList[index] = data.item;
    console.log(data.item.emotionone);

    if(data.item.isSelect)
    {
      this.addForCompare(data.item)
    }

    //console.log(this.state.entryList[index].emotionone + " " + this.state.entryList[index].what_happened);
    this.setState({
      entryList: this.state.entryList,
    });
    // if(item.isSelect){
    //
    // }
  }



  pressEntry = (data) =>{
    if(this.state.shouldCompare){
      // console.log("comparing..");
      this.selectItem(data);
    }else {
      // console.log("navigating..");

      {this.props.navigation.navigate("Entry",
        {
          key: data.item.key,
          valenceValue: data.item.valenceValue,
          intensityValue: data.item.intensityValue,
          what_happened: data.item.what_happened,
          where_happened: data.item.where_happened,
          who_was_involved: data.item.who_was_involved,
          challenges_goals: data.item.challanges_goals,
          accountability: data.item.accountability,
          image: data.item.image,
          emotionone: data.item.emotionone,
          emotiontwo: data.item.emotiontwo,
          emotionthree: data.item.emotionthree,
          reflection: data.item.reflection,
          uri: this.getImageUri(data.item.emotionone)
        })}
    }
  }

  getImageUri= (text) =>{
    if(text === 'angry'){
      return this.state.angry
    }else if (text==='sad'){
      return this.state.sad
    }else if (text==="shame") {
      return this.state.shame
    }else if (text==="fear") {
      return this.state.fear
    }else if (text==='calm'){
      return this.state.calm
    }else if (text==="surprise") {
      return this.state.surprise
    }else if (text==="happy") {
      return this.state.happy
    }else if (text==="joy") {
      return this.state.joy
    }

  }



  renderItem = (data) =>{
    var imageuri = '';
    // console.log(data.item.emotionone);
    // console.log(this.state.entryList[0].uri);
    imageuri = this.getImageUri(data.item.emotionone);
    // if(data.item.emotionone === "Anger"){
    //   imageuri = this.state.angry;
    // }else {
    //   imageuri = this.state.sad;
    // }
    // console.log(imageuri);


    return(
      <TouchableOpacity
      style={[styles.entry, data.item.selectedClass]}

      onPress={() => this.pressEntry(data)}
      >

          <View style={{
            alignItems: 'flex-end', flexDirection: 'row'}}>

            <View>
              <Image source={imageuri}
                style={{width:60, height:60}}
                alt="haha"/>
            </View>


            <View style={{marginLeft: 100}}>
              <Text style={styles.emotionText}>{data.item.emotionone}</Text>
              <Text style={styles.descText}>{data.item.what_happened}</Text>
            </View>



        </View>
      </TouchableOpacity>
    )
  }

  setShouldCompare=()=>{
    this.setState({shouldCompare: !this.state.shouldCompare})
    // console.log(this.state.shouldCompare);
  }

  displayMode=()=>{
    if(this.state.shouldCompare){
      return(
        <Text style={{fontSize: 20, fontWeight: '600'}}>Compare</Text>
      )
    }else {
      return(
        <Text style={{fontSize: 20, fontWeight: '600'}}>Reflect</Text>
      )
    }
  }
  //
  // onPress={() => {this.props.navigation.navigate("Entry",
  // {
  //   key: item.key,
  //   valenceValue: item.valenceValue,
  //   intensityValue: item.intensityValue,
  //   what_happened: item.what_happened,
  //   where_happened: item.where_happend,
  //   who_was_involved: item.who_was_involved,
  //   challenges_goals: item.challanges_goals,
  //   accountability: item.accountability,
  //   emotionone: item.emotionone,
  //   emotiontwo: item.emotiontwo,
  //   emotionthree: item.emotionthree,
  // })}}

  //FLAT LIST RETURN
  // return(
  //   <TouchableOpacity
  //   style={styles.entry}
  //   onPress={() => this.selectItem(item)}
  //   >
  //
  //       <View style={{
  //         alignItems: 'flex-end', flexDirection: 'row'}}>
  //
  //         <Text>Img</Text>
  //
  //         <View style={{marginLeft: 100}}>
  //           <Text style={styles.emotionText}>{item.emotionone}</Text>
  //           <Text style={styles.descText}>{item.what_happened}</Text>
  //         </View>
  //
  //
  //     </View>
  //   </TouchableOpacity>
  render () {
    return(
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>

        <View style={{alignItems: 'center', backgroundColor: 'white'}}>

          <TouchableOpacity style={{marginBottom: 5, height:30, justifyContent: 'center', width: width, backgroundColor: "black"}} onPress={() => this.setShouldCompare()}><Text style={{color: 'white', alignSelf: 'center'}}>Tap to change mode..</Text></TouchableOpacity>

          <TextInput style={styles.textinput}
            onChangeText={(text) => this.searchFilterFunction(text)}
            value={this.state.searchText}

            placeholder="Search here.."
          />

          {this.displayMode()}
        </View>


        <FlatList
          style={{marginTop: 20, width: width}}
          data={this.state.entryList}
          numColumns={1}
          ItemSeparatorComponent= {this.itemSeparator}
          keyExtractor={(item, index)=>index.toString()}
          renderItem={item => this.renderItem(item)}
          extraData={this.state}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  entry:{
    width: width,
    height: height*0.12,
    // marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: "white",
  },
  textinput:{
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 8,
    width: width*0.8,
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 10
  },
  selected:{
    width: width,
    height: height*0.12,
    // marginBottom: 20,
    justifyContent: 'center',
    backgroundColor: "#FA7B5F"
  },
  emotionText:{
    fontSize: 20,
    fontWeight: '700',
  },
  descText:{
    fontSize: 14,
    fontWeight: '200',

  }
})

export default Reflect;
