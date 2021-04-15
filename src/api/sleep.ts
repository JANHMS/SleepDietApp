// this is an api helper to fetch the sleep data and convert it to the needed format
import firebase from 'firebase/app'
import 'firebase/auth'
import { firestore } from '../firebase'

export const getUserSleep = (uid: string) =>
  firestore.collection('profiles')
    .doc(uid)
    .collection('getUserSleep')
    .get()
    .then(snapshot => {
      const services = snapshot.docs.map(doc => ({date: doc.id, ...doc.data()}))
      return services
    })
