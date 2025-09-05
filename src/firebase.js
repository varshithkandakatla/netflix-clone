
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCjGinjbAMpNqkfJ3xHWHd6OHtkUPhgM8I",
  authDomain: "netflix-clone-67623.firebaseapp.com",
  projectId: "netflix-clone-67623",
  storageBucket: "netflix-clone-67623.firebasestorage.app",
  messagingSenderId: "773491390928",
  appId: "1:773491390928:web:630f07cffd252bab3361d5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try{
        const response = await createUserWithEmailAndPassword(auth,email,password);
        const user =  response.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    }catch (error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const logout = ()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};