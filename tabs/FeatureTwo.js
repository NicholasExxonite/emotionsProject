import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Dimensions, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getDatabase } from "../database";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '@firebase/app';
import '@firebase/auth';

const defaultcolor = '#bee9e4';
const { height, width } = Dimensions.get("window");
class FeatureTwo extends React.Component{
  constructor(){
    super();
    this.state = {
      entries: [],
      // loading: true,
    };
  }

  checkColor = (col) =>{
    if(JSON.stringify({col}) !== '{}'){
      return col
    }
    else {
      return defaultcolor
    }
  }

  // // Seeting up a hook. Triggers when component mounts
  // useEffect (() => {
  //   getDatabase().collection('entries')
  //   .onSnapShot(() => {
  //     const db_entries = [];
  //   });
  //   return
  // });


// ------------------------------------------------------------------------

componentDidMount()
{
  getDatabase().ref('users/' + firebase.auth().currentUser.uid).on('value', (snapshot) =>{
    var list =[]
    console.log(snapshot);
    snapshot.forEach((child) => {
      list.push({
        key: child.key,
        emotion: child.val().emotion,
        add_info: child.val().additional_information,
        place_it_happened: child.val().place_of_event,
        time: child.val().time_of_event,
        reflectons: child.val().reflections,
        bgcolor: child.val().backgroundColour
      })
    })
    this.setState({entries:list})
  })
}




//-------------------------------------------------------------------------
// componentDidMount(){
//   getDatabase().ref('/test').on('value', (snapshot)=> {
//     data = snapshot.val();
//     var keys = Object.keys(data);
//     var counteri = 0;
//     keys.forEach((key) => {
//       counteri++;
//       console.log("Child numb: " + counteri);
//       console.log(key);
//       console.log(data[key]);
//       console.log("emotions is :" + data[key].emotion);
//     });
//     counteri = 0;
//
//
//     snapshot.forEach((item) => {
//       console.log(item.val().emotion);
//       this.setState({
//         add_info: item.val().emotion
//       })
//     });
//
//     // let data = querySnapShot.val() ? querySnapShot.val() : {};
//     // console.log(data);
//   });
// }
//
// displayEntries(){
//   return this.state.entries.map((entry, i) => {
//     return (
//       <View key={i}>
//         <Text>{entry.emotion}</Text>
//       </View>
//     );
//   });
// }

  render(){
    return(
      <View style={styles.container}>
        <Text>wassup</Text>

          <FlatList
            style={{marginTop: 40}}
            data={this.state.entries}
            numColumns={2}
            keyExtractor={(item)=>item.key}
            renderItem={({item}) => {
              return(
                <TouchableOpacity
                   onPress={() => {this.props.navigation.navigate("ExpandedEntry",
                {
                  key: item.key,
                  emotion: item.emotion,
                  add_info: item.add_info,
                  place_it_happened: item.place_it_happened,
                  time: item.time,
                  reflections: item.reflectons,
                  bgcolor: item.bgcolor,
                })}}
                style={{width: width*0.4, margin: 10}}
                >

                    <View style={{backgroundColor: this.checkColor(item.bgcolor),
                      justifyContent: 'center',
                      marginBottom: 10, height: 150,
                      alignItems: 'center'
                        }}>
                      <Text style={styles.entryText}>Emotion: {item.emotion}</Text>
                      <Text style={styles.entryText}>Time submission: {item.time}</Text>


                  </View>
                </TouchableOpacity>
              )
            }}/>
      </View>
      );
    }
  }

const styles = StyleSheet.create({

  container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#c8dce0'

  },
  itemEntries: {
    justifyContent: 'center',
    marginBottom: 10,
    height: 200
  },
  entryText:{
    color: 'white',
    padding: 10,
    fontSize: 16
  }

})

export default FeatureTwo;
