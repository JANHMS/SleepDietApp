import React, { Component } from 'react';
import { IonContent, IonPage } from "@ionic/react"
import Dropzone from 'react-dropzone';
import { firestore, storage } from '../firebase'
import { toast } from "../toast"
import csv from 'csv';

async function saveUserSleep(sleepList) {
  // other possibility to write it to firestorage as a csv file
  // const sleepRef = storage.ref(`/sleep/${Date.now()}`);
  // await sleepRef.put(userSleep);
  
  //userId is hardcoded but can be retrieved with authentication
  const userId = "1"
  var i;
  for (i = 0; i < sleepList.length; i++) {
    firestore.collection("users")
    .doc(userId)
    .collection("sleep")
    .doc(sleepList[i].start)
    .set(sleepList[i])
    console.log('saved csv:', sleepList[i]);
  }
}


class UploadCSV extends Component {

  onDrop(files) {

    this.setState({ files });

    var file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {

        var sleepList = [];
        for (var i = 0; i < data.length; i++) {
          const SingleData = data[i][0].split(";")
          
          const start = SingleData[0];
          const end = SingleData[1];
          const sleepQuality = SingleData[2];
          const Regularity = SingleData[3];
          const AlarmMode = SingleData[7]
          const Movements = SingleData[10];
          const TimeInBed = SingleData[11];
          const TimeAsleep = SingleData[12];
          const TimeBeforeSleep = SingleData[13];
          const DidSnore = SingleData[16];
          const SnoreTime = SingleData[17];
        
          const newSleep = { 
            start:  start,
            end:  end,
            sleepQuality:  sleepQuality,
            Regularity:  Regularity,
            Movements:  Movements ,
            TimeInBed:  TimeInBed ,
            TimeAsleep:  TimeAsleep ,
            TimeBeforeSleep:  TimeBeforeSleep ,
            DidSnore:  DidSnore ,
            SnoreTime:  SnoreTime ,
          };
          sleepList.push(newSleep);
        };
        saveUserSleep(sleepList).then( () => toast("file saved"))

        console.log(sleepList)
      });          
    };
    saveUserSleep(file).then( () => toast("file saved"))
    reader.readAsBinaryString(file);
  }

  render() {

    const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };
    const fontSize = 5;

    return (
      <IonPage>
        <IonContent>
      <div align="center" oncontextmenu="return false">
        <br /><br /><br />
        <div className="dropzone">
          <Dropzone accept=".csv" onDropAccepted={this.onDrop.bind(this)}>            
          </Dropzone>
          <br /><br /><br />
        </div>
        <h2>Upload or drop your <font size={fontSize} color="#00A4FF">CSV</font><br /> file here.</h2>
      </div>
    </IonContent>
  </IonPage>
    )
  }
}

export default UploadCSV;