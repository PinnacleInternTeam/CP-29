import { useState, useEffect } from 'react'
import './App.css'
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyAa9Wis47gW7Kbr5miQa7pstNid1qwnVq4",
  authDomain: "cp-29-6cbdf.firebaseapp.com",
  projectId: "cp-29-6cbdf",
  storageBucket: "cp-29-6cbdf.appspot.com",
  messagingSenderId: "699288388155",
  appId: "1:699288388155:web:072e436efc82ef6c5e121e",
  measurementId: "G-Y482LSNP8J"
};


const app = firebase.initializeApp(firebaseConfig);
export const db = app.firestore();


function App() {
  const [data,setData] = useState("");

  useEffect(() => {
      getData();
  },[])

  useEffect(() => {
      if(data) {
          onChange(data);
      }
  },[data])

  const getData = () => { 
      const unsub = onSnapshot(
          doc(db, "data", "MYDOC"),
          { includeMetadataChanges: true },
          (doc) => {
              console.log(doc.data())
              setData(doc.data().data)
          });
  }

  const onChange = async (data) => {
       setDoc(doc(db, "data", "MYDOC"), {
          data
      });
  }
  return (
      <div className='container'>
          <textarea value={data} onChange={e => setData(e.target.value)}>

          </textarea>
      </div>
  )
}

export default App
