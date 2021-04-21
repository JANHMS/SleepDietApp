import firebase from 'firebase/app'
import 'firebase/auth'

import { firestore } from '../firebase'

const createUserProfile = (userProfile: { [x: string]: any; uid?: string; fullName?: string; email?: string; avatar?: string }) => 
  firestore.collection('users')
    .doc(userProfile.uid)
    .set(userProfile)

export const register = async ({email, password, fullName, avatar}: any) => {
  try {
    const res = await firebase.auth().createUserWithEmailAndPassword(email, password)
    const { user } = res
    // Added "?" to only get uid when user is not null
    const userProfile = { uid: user?.uid, fullName, email, avatar}
    await createUserProfile(userProfile)
    return userProfile
  } catch(error) {
    return Promise.reject(error.message)
  }
}

export const login = ({email, password}: any) => 
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(error => Promise.reject(error.message))

export const logout = () => firebase.auth().signOut()

export const getUserProfile = (uid: string) =>
  firestore.collection('users')
    .doc(uid)
    .get()
    .then(snapshot => ({uid, ...snapshot.data()}))