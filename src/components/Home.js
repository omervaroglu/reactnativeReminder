import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Dimensions,
  AsyncStorage,
  Alert
} from 'react-native';
import Note from './Note';

const window = Dimensions.get('window');

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        noteArray: [],
        noteText: "",
    };
  }
  componentWillMount() {
    console.log('giris');
    this.getKey();
  }

async getKey() {
  console.log('getkey');
    console.log(this.state.noteArray + "---");
  try {
    console.log('getıtem');
    const value = await AsyncStorage.getItem("key");
    this.state.noteArray = JSON.parse(value);
    console.log(JSON.parse(value));
    } catch (error) {
    console.log('Error retrieving data' + error);
  }
}
async saveKey() {
  if (this.state.noteText) {
    this.state.noteArray.push({
        note: this.state.noteText
    });
  console.log("saving starting");
  console.log(this.state.noteText);
  try {
    await AsyncStorage.setItem("key", JSON.stringify(this.state.noteArray));
    console.log('kayıt');
  } catch (error) {
    console.log("Error saving data" + error);
  }
    this.getKey();
}
}
  deleteNote(key) {
   this.state.noteArray.splice(key, 1);
   this.setState({ noteArray: this.state.noteArray });
}

  render() {
    const notes = this.state.noteArray.map((val, key) => {
      return (
      <Note
      key={key} keyval={key} val={val}
      deleteMethod={() => this.deleteNote(key)}
      />
            );
     });
    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white', }} >
        <View>
        <View style={styles.headerstyle}>
          <Text style={styles.headertextstyle}> REMİNDER </Text>
        </View>
          <View style={{ flexDirection: 'row', padding: 8, justifyContent: 'space-between' }}>
            <TextInput
                style={styles.textInput}
                placeholder='Create Reminder'
                onChangeText={(value) => this.setState({ noteText: value })}
                //value={(this.state.noteText)}
                placeholderTextColor='white'
                underlineColorAndroid='transparent'
            />
            <TouchableOpacity onPress={() => {this.saveKey();}} >
              <View style={styles.viewStyle}>
                <Text style={styles.textstyle}> Save </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView >
            {notes}
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  headerstyle: {
  width: window.width,
  height: 50,
  backgroundColor: '#f0f0f0',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
},
headertextstyle: {
  color: '#1A1B1A',
  fontSize: 21,
},
  viewStyle: {
    height: 50,
    width: 50,
    backgroundColor: '#5C6BC0',
    borderRadius: 6.25,
  },
  textstyle: {
    color: '#B3BCEC',
    marginHorizontal: 3,
    fontSize: 18,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  textInput: {
    width: (4 * window.width) / 5,
    borderRadius: 6.25,
    backgroundColor: '#c5c5c5',
  },
});

export default Home;
