import React, { Component } from 'react';
import { IonContent, IonPage } from "@ionic/react"
import Dropzone from 'react-dropzone';
import csv from 'csv';

class UploadCSV extends Component {

  onDrop(files) {

    this.setState({ files });

    var file = files[0];

    const reader = new FileReader();
    reader.onload = () => {
      csv.parse(reader.result, (err, data) => {

        var userList = [];
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
        
          const newUser = { 
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
          userList.push(newUser);
          // fetch('https://[FIREBASE_URL]/users.json', {
          //   method: 'POST',
          //   headers: {
          //     'Accept': 'application/json',
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(newUser)
          // })
        };
        console.log(userList)
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