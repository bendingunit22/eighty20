import { FormGroup, Input, Form, Button, Col, Label, Container } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import EntryTable from './Components/EntryTable';


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
      <Container className='mainContainer' fluid>
        <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label
                  for="date"
                  xl={2}
                >
                  Date
                </Label>
                <Col className='column' xl={10}>
                  <Input
                    id="date"
                    name="date"
                    placeholder="1970-01-01"
                    type="date"
                    className='formEntry'
                  >
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
              <Label
                  for="easy"
                  sm={2}
                >
                  Easy
                </Label>
                <Col xl={10}
                >
                  <Input
                    id="easy"
                    name="easy"
                    placeholder="0"
                    type="integer"
                  >
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
              <Label
                  for="hard"
                  sm={2}
                >
                  Hard
                </Label>
                <Col xl={10}
                >
                  <Input
                    id="hard"
                    name="hard"
                    placeholder="0"
                    type="integer"
                  >
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
              <Label
                  for="kilometers"
                  sm={2}
                >
                  Kilometers
                </Label>
                <Col xl={10}
                >
                  <Input
                    id="kilometers"
                    name="kilometers"
                    placeholder="0"
                    type="float"
                  >
                  </Input>
                </Col>
              </FormGroup>
              <Button>
                Upload
              </Button>
          </Form>
      </Container>
      <Container className='bottomContainer' fluid>
        {  entries.length && 
          <EntryTable data={entries}>
          </EntryTable>
        }
      </Container>
      <Col >
      </Col>

      </header>
    </div>
  );
}

export default App;
