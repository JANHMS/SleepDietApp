import React, { Component } from 'react';
import { IonContent, IonPage } from "@ionic/react"
import Dropzone from 'react-dropzone';
import { firestore, storage } from '../firebase'
import csv from 'csv';

async function saveUserSleep(userSleep) {
  const sleepRef = storage.ref(`/sleep/${Date.now()}`);
  const snapshot = await sleepRef.put(userSleep);
  console.log('saved csv:', snapshot);
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
          const Movements = SingleData[11];
          const TimeInBed = SingleData[12];
          const TimeAsleep = SingleData[13];
          const TimeBeforeSleep = SingleData[14];
          const DidSnore = SingleData[15];
          const SnoreTime = SingleData[16];
        
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
        console.log(sleepList)
        saveUserSleep(sleepList)
      });
    };

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