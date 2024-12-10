import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import FireBaseConfig from "./config/FireBaseConfig";

const Firebase = initializeApp(FireBaseConfig)

const auth = getAuth(Firebase)
const db = getFirestore(Firebase)

export  {auth, db} ;
