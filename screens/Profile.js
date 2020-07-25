import React, { Component } from 'react';
import { View, Text,Image, StyleSheet,Linking,Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Title, Card,Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';

const Profile=(props)=>{

  const{id,name,email,picture,phone,salary,position}=props.route.params.item

  const openDial=()=>{
    if(Platform.OS === "android"){
         Linking.openURL("tel:{phone}")
    }else{
      Linking.openURL("telprompt:{phone}")
    }
  }
  return(
    <View style={styles.root}>
      <LinearGradient
      colors={["#0033ff","#6bc1ff"]}
      style={{height:"20%"}}

      />
      <View style={{alignItems:"center"}}>
  
      <Image
         style={{width:140,height:140,borderRadius:140/2,marginTop:-50}}
          source={{uri:picture}}
      />
      </View>
      <View style={{alignItems:"center"}}>
        <Title>{name}</Title>
  <Text style={{fontSize:15}}>{position}</Text>
      </View>  
      <View style={{marginTop:40}}>
      <Card style={styles.mycard} onPress={()=>{
        Linking.openURL("mailto:{email}")
      }}>
        <View style={styles.cardcontent}>
        <Icon name="envelope" size={32} color="#006aff" />
        <Text style={styles.mytext}>{email}</Text>
        </View> 

      </Card>

      <Card style={styles.mycard} onPress={()=>openDial()}>
        <View style={styles.cardcontent}>
        <Icon name="phone" size={32} color="#006aff" />
        <Text style={styles.mytext}>{phone}</Text>
        </View> 

      </Card>

      <Card style={styles.mycard}>
        <View style={styles.cardcontent}>
        <Icon name="dollar" size={32} color="#006aff" />
        <Text style={styles.mytext}>{salary}</Text>
        </View> 

      </Card>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
      <Button icon="account-edit" 
      mode="contained" 
      theme={theme}
      onPress={() => console.log('Pressed')}>
    EDIT 
  </Button>

  
      <Button icon="delete" 
      mode="contained" 
      theme={theme}
      onPress={() => console.log('Pressed')}>
    FIRE EMPLOYEE
  </Button>
  </View>


     

    
    </View>
  )
}

const theme={
  colors:{
      primary:"#006aff"
  }
}

const styles=StyleSheet.create({
  root:{
    flex:1
  },
  mycard:{
    margin:3
  },
  cardcontent:{
    flexDirection:"row",
    padding:8
  },
  mytext:{
    fontSize:18,
    marginTop:3,
    marginLeft:5
  }
})

export default Profile
