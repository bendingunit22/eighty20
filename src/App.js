import {Container } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import EntryTable from './Components/EntryTable';
import SubmitForm from './Components/SubmitForm'

function App() {
  const [entries, setEntries] = useState([]);
  
  useEffect(() => {
    fetch("https://7komdlerp2.execute-api.us-east-1.amazonaws.com/dev")
    .then((response) => response.json())
    .then((data) => {
      //  console.log("network call")
      //  console.log(data);
       setEntries(data.body);
    })
    .catch((err) => {
       console.log(err.message);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries());

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"date":formJson.date,"easy":formJson.easy, "hard":formJson.hard, "kilometers":formJson.kilometers});
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://7komdlerp2.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => alert(JSON.parse(result).body))
    .catch(error => console.log('error', error));
  }

  return (
    <div className="App">
      <header className="App-header">
      <Container className='entryHistory' fluid>
        {  entries.length && 
          <EntryTable
            data={entries}>
          </EntryTable>
        }
      </Container>
      <Container className='mainContainer' fluid>
        <SubmitForm
          handler = {handleSubmit}
        ></SubmitForm>
      </Container>
      </header>
    </div>
  );
}

export default App;
