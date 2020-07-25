import React, {useState} from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

const Createemployee = (navigation) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [position, setPosition] = useState('');
  const [modal, setModal] = useState(false);

  const submitData = async () => {
    fetch('http://192.168.43.117:3000/send-data', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name}saved success`);
        navigation.navigate('Home');
      });
  };

  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };

  const imagepicker = () => {
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker ');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let newfile = {
          uri: response.uri,
          type: `test/${response.uri.split('.')[1]}`,
          name: `test.${response.uri.split('.')[1]}`,
        };
        handleUpload(newfile);
      }
    });
  };

  const gallerypicker = () => {
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        //     let newfile = {
        //       uri: response.uri ,
        //       type:`test/${response.uri.split(".")[1]}`,
        //      name:`test.${response.uri.split(".")[1]}`
        //    };
        // handleUpload(newfile)
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior="position">
      <View>
        <TextInput
          style={styles.inputStyle}
          label="Name"
          value={name}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.inputStyle}
          label="Email"
          value={email}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.inputStyle}
          label="Phone"
          value={phone}
          theme={theme}
          mode="outlined"
          keyboardType="number-pad"
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={styles.inputStyle}
          label="Salary"
          value={salary}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setSalary(text)}
        />
        <Button
          style={styles.inputStyle}
          icon="upload"
          mode="contained"
          theme={theme}
          onPress={() => setModal(true)}>
          Upload Image
        </Button>
        <Button
          style={styles.inputStyle}
          icon="content-save"
          mode="contained"
          theme={theme}
          onPress={() => submitData()}>
          save
        </Button>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(false);
          }}>
          <View style={styles.modalView}>
            <View style={styles.modalButtonView}>
              <Button
                theme={theme}
                icon="camera"
                mode="contained"
                onPress={() => imagepicker()}>
                camera
              </Button>
              <Button
                theme={theme}
                icon="image-area"
                mode="contained"
                onPress={() => gallerypicker()}>
                gallery
              </Button>
            </View>
            <Button theme={theme} onPress={() => setModal(false)}>
              cancel
            </Button>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};
const theme = {
  colors: {
    primary: '#006aff',
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyle: {
    margin: 5,
  },
  modalView: {
    position: 'absolute',
    bottom: 2,
    width: '100%',
    backgroundColor: 'white',
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Createemployee;
