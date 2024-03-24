import { FormGroup, Input, Form, Button, Col, Label, Container } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  function handleSubmit(e) {
    console.log(e)
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries());


    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"date":formJson.date,"easy":formJson.easy, "hard":formJson.hard, "kilometers":formJson.kilometers});
    // create a JSON object with parameters for API call and store in a variable
    console.log(raw)
    
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
      <Container fluid>
        <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label
                  for="date"
                  xl={2}
                >
                  Date
                </Label>
                <Col xl={10}>
                  <Input
                    id="date"
                    name="date"
                    placeholder="1970-01-01"
                    type="date"
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

      </header>
    </div>
  );
}

export default App;
