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
          data = data.slplit(";")
          const start = data[i][0];
          const end = data[i][1];
          const sleepQuality = data[i][2];
          const Regularity = data[i][3];
          const Movements = data[i][11];
          const TimeInBed = data[i][12];
          const TimeAsleep = data[i][13];
          const TimeBeforeSleep = data[i][14];
          const DidSnore = data[i][15];
          const SnoreTime = data[i][16];

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
          console.log(userList)

          // fetch('https://[FIREBASE_URL]/users.json', {
          //   method: 'POST',
          //   headers: {
          //     'Accept': 'application/json',
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify(newUser)
          // })
        };
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