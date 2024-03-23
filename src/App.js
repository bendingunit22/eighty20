import { FormGroup, Input, Form, Button } from 'reactstrap';
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
    var raw = JSON.stringify({"firstName":formJson.firstName,"lastName":formJson.lastName});
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
        <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First name"
                type="string">
              </Input>
            </FormGroup>
            <FormGroup>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last name"
                type="string">
              </Input>
            </FormGroup>
            <Button>
              Upload
            </Button>
        </Form>
      </header>
    </div>
  );
}

export default App;
