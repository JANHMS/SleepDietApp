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

          const Start = SingleData[0];
          const End = SingleData[1];
          const Sleep_quality = SingleData[2];
          const Regularity = SingleData[3];
          const Movements_per_hour = SingleData[4];
          const Time_in_bed_seconds = SingleData[5];
          const Time_asleep_seconds = SingleData[6];
          const Time_before_sleep_seconds = SingleData[7];
          const Did_snore = SingleData[8];
          const Snore_time = SingleData[9];
          const Time_in_bed = SingleData[10];
          const Time_asleep = SingleData[11];
          const Weekday = SingleData[12];
          const Month = SingleData[13];
          const To_bed_hour = SingleData[14];
          const Wake_up_hour = SingleData[15];
        
          const newSleep =  { 
            Start:  Start,
            End:  End,
            Sleep_quality:  Sleep_quality,
            Regularity:  Regularity,
            Movements_per_hour:  Movements_per_hour ,
            Time_in_bed_seconds:  Time_in_bed_seconds ,
            Time_asleep_seconds:  Time_asleep_seconds ,
            Did_snore: Did_snore,
            Snore_time: Snore_time,
            Time_in_bed:  Time_in_bed ,
            Time_asleep:  Time_asleep ,
            Weekday:  Weekday ,
            Month:  Month ,
            To_bed_hour:  To_bed_hour ,
            Wake_up_hour:  Wake_up_hour ,
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