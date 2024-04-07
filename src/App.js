import {Container} from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import EntryTable from './Components/EntryTable';
import SummaryTable from './Components/SummaryTable';
import SubmitForm from './Components/SubmitForm'

function App() {
  const [entries, setEntries] = useState([]);
  const [stats, setStats] = useState([]);
  const [entryRefreshes, setEntryRefreshes] = useState(0);


  useEffect(() => {
    fetch("https://7komdlerp2.execute-api.us-east-1.amazonaws.com/dev")
    .then((response) => response.json())
    .then((data) => {
       setEntries(data.body);
       setStats(data.stats)
    })
    .catch((err) => {
       console.log(err.message);
    });
  }, [entryRefreshes]);

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
    .then(_ => setEntryRefreshes(_ => _ + 1))
    .then(form.reset())
    .catch(error => console.log('error', error));
  }

  function deleteEntry(e) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({"id":e.id});
    
    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://7komdlerp2.execute-api.us-east-1.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(_ => setEntryRefreshes(_ => _ + 1))
    .catch(error => console.log('error', error));
  }


  return (
    <div className="App">
      <header className="App-header">
      {
          (entries || []).length > 0 ? (
            <div>
            <Container className='entryContainer' fluid>  
              <Container className='entryHistory' fluid>
                <EntryTable
                  data={entries}
                  deleteHandler={deleteEntry}>
                </EntryTable>
              </Container>
              <Container className='entryHistory' fluid>
              <SummaryTable stats={stats}>
                </SummaryTable>
              </Container>
            </Container>
            </div>
        ):(
          <Container className='entryHistory' fluid>
            <DNA></DNA>
          </Container>
        )

      }
      <Container className='mainContainer' fluid>
        <h5 className='entryHeading'>Submit a new entry</h5>
        <SubmitForm
          handler = {handleSubmit}
        ></SubmitForm>
      </Container>
      </header>
    </div>
  );
}

export default App;
