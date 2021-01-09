import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

firebase.initializeApp();

const db = firebase.firestore();
const auth = firebase.auth();

const usersCollection = db.collection("users");

export { db, auth, usersCollection };
