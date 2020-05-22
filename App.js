import React, {Component} from "react";
import { AppRegistry,StyleSheet, Text, View, Image,Vibration, Platform,FlatList} from "react-native";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default class App extends React.Component {
 constructor (props) {
super(props);
this.state ={
  expoPushToken: '',
  notification: {},
  1 : { 
   id:1,
   id_bth:'Y cert: Y-920 (29):; Y (09):',
   nom_code:'citoyen 1',
   date_renc:'2020-01-04',
   duree_renc:1,
   statut_cov:0,
   statut_gue:0,
  
 },

 2 : { 
  id:2,
  id_bth:'Y cert: Y-960 (45):; Y (76):',
  nom_code:'citoyen 2',
  date_renc:'2020-05-01',
  duree_renc:5,
  statut_cov:1,
  statut_gue:0,
 
},
3: { 
  id:3,
  id_bth:'Y cert: Y-679 (32):; Y (09):',
  nom_code:'citoyen 3',
  date_renc:'2020-04-11',
  duree_renc:11,
  statut_cov:0,
  statut_gue:0,
},
4: { 
  id:4,
  id_bth:'Y cert: Y-650 (27):; Y (09):',
  nom_code:'citoyen 4',
  date_renc:'2020-03-17',
  duree_renc:41,
  statut_cov:1,
  statut_gue:0,
},
5: { 
  id:5,
  id_bth:'Y cert: Y-670 (27):; Y (00):',
  nom_code:'citoyen 5',
  date_renc:'2020-05-19',
  duree_renc:2,
  statut_cov:1,
  statut_gue:1,
},
6: { 
  id:6,
  id_bth:'Y cert: Y-070 (20):; Y (10):',
  nom_code:'citoyen 6',
  date_renc:'2020-05-04',
  duree_renc:3,
  statut_cov:1,
  statut_gue:0,
},
data:[
   { 
    id:1,
    id_bth:'Y cert: Y-920 (29):; Y (09):',
    nom_code:'citoyen 1',
    date_renc:'2020-04-01',
    duree_renc:1,
    statut_cov:0,
    statut_gue:0,
  
  },
 
   { 
   id:2,
   id_bth:'Y cert: Y-960 (45):; Y (76):',
   nom_code:'citoyen 2',
   date_renc:'2020-05-01',
   duree_renc:5,
   statut_cov:1,
   statut_gue:0,
  
 },
  { 
   id:3,
   id_bth:'Y cert: Y-679 (32):; Y (09):',
   nom_code:'citoyen 3',
   date_renc:'2020-04-11',
   duree_renc:11,
   statut_cov:0,
   statut_gue:0,
 },
  { 
   id:4,
   id_bth:'Y cert: Y-650 (27):; Y (09):',
   nom_code:'citoyen 4',
   date_renc:'2020-03-17',
   duree_renc:41,
   statut_cov:1,
   statut_gue:0,
 },
  { 
   id:5,
   id_bth:'Y cert: Y-670 (27):; Y (00):',
   nom_code:'citoyen 5',
   date_renc:'2020-05-19',
   duree_renc:2,
   statut_cov:1,
   statut_gue:1,
 },
  { 
   id:6,
   id_bth:'Y cert: Y-070 (20):; Y (10):',
   nom_code:'citoyen 6',
   date_renc:'2020-05-04',
   duree_renc:3,
   statut_cov:1,
   statut_gue:0,
 }
]
};
}
// Fonction qui génère le token pour pouvoir envoyer la notification
registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    try {
     let  token = await Notifications.getExpoPushTokenAsync();
     // token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      this.setState({ expoPushToken: token });
      } catch (error) {
      console.log(error.message);
      }

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
};

componentDidMount() {
  this.registerForPushNotificationsAsync();
  this._notificationSubscription = Notifications.addListener(this._handleNotification);
}

_handleNotification = notification => {
  Vibration.vibrate();
  console.log(notification);
  this.setState({ notification: notification });
};

// Fonction qui envoie la notification
sendPushNotification = async ( nom_code, jour,duree_renc) => {
  const message = {
    to: this.state.expoPushToken,
    sound: 'default',
    title: 'Information Importante',
    body: 'Alerte Stop Covid-19!',
    data: { nom:nom_code , jours:jour, durée:duree_renc },
    _displayInForeground: true,
  };
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};
  render(){
    
      // Fonction qui simule chaque 01 min la mise à jour des données 
      //en exécutant une fonction vu que nous sommes dans le cas d'un POC
      this.timeoutCheck=setInterval(
        () => {
          this.recuperationData();
          }, 60000 );
  return (
    //Interface Affichage des données
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headLeft}>
        <Image
        style={styles.Logo}
        source={require('./assets/logo.png')}
      />
        </View>
        <View style={styles.headRight}>
          <Text style={styles.headTextRight}>Stop Covid-19</Text>
          </View>
      </View>
      <View style={styles.resulpredic}>
            <Text>Liste des personnes croisées</Text>
       </View>
       
      <View style={styles.liste}>
      <FlatList
        data={this.state.data}        
        renderItem={({ item }) => (
          <View style={styles.listecount}>
            <Text>Code Bluetooth:{item.id_bth}</Text>
            <Text>Temps de proximité: {item.duree_renc} min</Text>
            <Text>{item.nom_code}    Date de rencontre: {item.date_renc} </Text>
          </View>
        )}
        keyExtractor={item => item.id_bth}
      />
     
    </View>  
    </View>
  );

}

/*
// Fonction de stockage de données ....
initialisation(){
  for(var j=1;j<=2;j++){
      AsyncStorage.setItem('personne_'+j, JSON.stringify(this.state[j]));
      this.setState({
        j: AsyncStorage.getItem('personne_'+j),
       data: AsyncStorage.getItem('personne_'+j)
      })
      console.log("Asyncstorage ok etape 1");
    }
}*/

// Fonction de calcul de la différence de date
dayDiff(d1)
{
  console.log(d1);
 var de1 =  new Date().getDate() - new Date(d1).getDate() ;
 var de2 = de1 / (1000 * 3600 * 24);
  return de2;
}
// Fonction de simulation de traitement et envoi de notification
recuperationData(){
var i= Math.floor(Math.random() * 6) + 1 ;
try {
  
  // Si la personne rencontrée est atteint du covid19
  if ((this.state[i].statut_cov==1) && (this.state[i].statut_gue==0)){
    //Calcul du nombre de jour
    var jour = this.dayDiff(this.state[i].date_renc);
   
    if (((jour<=15)&&(this.state[i].duree_renc>=15))||((jour>=15)&&(this.state[i].duree_renc>=15))){
      // Envoi de notification et alerte si l'application est ouverte
      this.registerForPushNotificationsAsync();
      this.sendPushNotification(this.state[i].nom_code,jour,this.state[i].duree_renc);
      console.log("Attention !!! une de vos rencontres est contaminée. Rencontre il y a "+jour+" jour(s). Durée (Min) : "+this.state[i].duree_renc+" min. Vu la durée de votre rencontre, il y a de fortes chances que vous soyez contaminé(e). Merci de consulter votre medecin et continuez de suivre les mesures barrières. Prenez soin de vous et de vos proches");
      alert("Attention !!! une de vos rencontres est contaminée. Rencontre il y a "+jour+" jour(s). Durée (Min) : "+this.state[i].duree_renc+" min. Vu la durée de votre rencontre, il y a de fortes chances que vous soyez contaminé(e). Merci de consulter votre medecin et continuez de suivre les mesures barrières. Prenez soin de vous et de vos proches");
    }else if (((jour<=15)&&(this.state[i].duree_renc<=15))||((jour>=15)&&(this.state[i].duree_renc<=15))){
      // Envoi de notification et alerte si l'application est ouverte
      this.registerForPushNotificationsAsync();
      this.sendPushNotification(this.state[i].nom_code,jour,this.state[i].duree_renc);
      console.log("Attention !!! une de vos rencontres est contaminée. Rencontre il y a "+jour+" jour(s). Durée (Min) : "+this.state[i].duree_renc+" min. Vu la durée de votre rencontre, il y a de pas de risques que vous soyez contaminé(e) mais restez vigilant. Contactez votre medecin au moindre soucis, Prenez soin de vous et de vos proches");
      alert("Attention !!! une de vos rencontres est contaminée. Rencontre il y a "+jour+" jour(s). Durée (Min) : "+this.state[i].duree_renc+" min. Vu la durée de votre rencontre, il y a de pas de risques que vous soyez contaminé(e) mais restez vigilant. Contactez votre medecin au moindre soucis, Prenez soin de vous et de vos proches");
      }

  } 
  // Si la personne rencontrée a été atteint du covid19 et que votre rencontre a eu lieu avant la guérison 
  else if ((this.state[i].statut_cov==1) && (this.state[i].statut_gue==1)){
    var jour = this.dayDiff(this.state[i].date_renc);
    if (((jour<=15)&&(this.state[i].duree_renc>=15))||((jour>=15)&&(this.state[i].duree_renc>=15))){
      // Envoi de notification et alerte si l'application est ouverte
      this.registerForPushNotificationsAsync();
      this.sendPushNotification(this.state[i].nom_code,jour,this.state[i].duree_renc);
      console.log("Attention !!! une de vos rencontres a été recemment contaminée mais est GUERI. Rencontre il y a "+jour+" jour(s). Durée (Min) : "+this.state[i].duree_renc+" min. Vu la durée de votre rencontre, il y a de fortes chances que vous soyez contaminé(e). Merci de consulter votre medecin et continuez de suivre les mesures barrières. Prenez soin de vous et de vos proches");
      alert("Attention !!! une de vos rencontres a été recemment contaminée mais est GUERI. Rencontre il y a "+jour+" jour(s). Durée (Min) : "+this.state[i].duree_renc+" min. Vu la durée de votre rencontre, il y a de fortes chances que vous soyez contaminé(e). Merci de consulter votre medecin et continuez de suivre les mesures barrières. Prenez soin de vous et de vos proches");
    }else if (((jour<=15)&&(this.state[i].duree_renc<=15))||((jour>=15)&&(this.state[i].duree_renc<=15))){
     // Envoi de notification et alerte si l'application est ouverte
      this.registerForPushNotificationsAsync();
      this.sendPushNotification(this.state[i].nom_code,jour,this.state[i].duree_renc);
      console.log("Attention !!! une de vos rencontres a été recemment contaminée mais est GUERI. Rencontre il y a "+jour+" jour(s). Durée (Min) : "+this.state[i].duree_renc+" min. Vu la durée de votre rencontre, il y a de pas de risques que vous soyez contaminé(e) mais restez vigilant. Contactez votre medecin au moindre soucis, Prenez soin de vous et de vos proches");
      alert("Attention !!! une de vos rencontres a été recemment contaminée mais est GUERI. Rencontre il y a "+jour+" jour(s). Durée (Min) : "+this.state[i].duree_renc+" min. Vu la durée de votre rencontre, il y a de pas de risques que vous soyez contaminé(e) mais restez vigilant. Contactez votre medecin au moindre soucis, Prenez soin de vous et de vos proches");
      }
  }
  

} catch (error) {
  console.log(error);
}
}

}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#87CEFA',
    paddingTop:50,
    paddingBottom:30,
  
  },
  header:{
     
     flexDirection:"row",
     paddingLeft:80,
     height:70
  },
  headLeft:{
    top:10,

  },
  headRight:{
    top:20,
    left:10,
  },
 headTextRight:{
  fontSize:20,
  color:'white',
  fontWeight:"bold",

},
  Logo:{
    width:50,
    height:50,
    alignContent: 'center',
  },
  liste:{
    backgroundColor:'white',
    

 },
 listecount:{
  borderWidth : 1 , 
  borderRadius : 4 , 
  borderColor : '#ddd' , 
  borderBottomWidth : 1 , 
  shadowColor : '#000' , 
  shadowOpacity : 0.1 , 
  shadowRadius : 4,  
  marginLeft : 4 , 
  marginRight : 4 , 
  marginTop : 10 ,
  padding:20,
  borderTopWidth:0,
  borderLeftWidth:0,
  alignItems:"center",
   
   

},
 resulpredic:{
  backgroundColor:'white',
  alignItems: 'center',
  justifyContent:"center",
  marginTop:10,
  height:50,
  fontWeight:"700",
  
},
});
AppRegistry.registerComponent('App', () => App);