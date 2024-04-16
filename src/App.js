import {Container, PopoverBody} from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import EntryTable from './Components/EntryTable';
import SummaryTable from './Components/SummaryTable';
import SubmitForm from './Components/SubmitForm'
import { DNA } from 'react-loader-spinner'
import EasyTimeSeries from './Components/EasyTimeSeries';
import { Button, ButtonGroup, UncontrolledPopover } from 'reactstrap';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';



function App() {
  const [ entries, setEntries ] = useState([]);
  const [ stats, setStats ] = useState([]);
  const [ entryRefreshes, setEntryRefreshes ] = useState(0);
  const [ rSelected, setRSelected ] = useState(0);
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
};

  useEffect(() => {
    if (!entries || entries.length === 0) {
      fetch("https://7komdlerp2.execute-api.us-east-1.amazonaws.com/dev")
      .then((response) => response.json())
      .then((data) => {
        setEntries(data.body);
        setStats(data.stats)
      })
      .catch((err) => {
        console.log(err.message);
      });
    }
    if (!profile || profile.length === 0) {
      fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }})
        .then((response) => response.json())
        .then((data) => {
          setProfile(data)
        })
        .catch((err) => console.log(err));
    }
    
  }, [entryRefreshes, user, entries, stats]);

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
      {profile ? (
        <header className="App-header">
          {
            (entries || []).length > 0 ? (
              <div>
                <Container className='entryContainer' fluid>
                  <Container className='profileContainer'>
                  <button
                    id='profileButton'
                    style={{
                      borderWidth: "0px",
                      }}
                  >
                    <img className='profilePicture'
                      id='profilePic'
                      src={profile.picture}
                      width="42"
                      height="42"
                      style={{
                        borderRadius: "50%"
                      }}
                    ></img> 
                   </button>
                   <UncontrolledPopover
                    placement="left"
                    target="profileButton"
                    trigger="click"
                  >
                    <PopoverBody>
                      <div style={{textAlign: "left"}}>
                        {profile.email}<br/>
                        {profile.name}
                      </div>
                      <Container className='buttonContainer' style={{textAlign: "left", paddingLeft: "0px"}}fluid>
                          <Button className='logoutButton'
                            onClick={logOut}
                            size='sm'
                            >
                            Log out
                            </Button>
                      </Container>
                    </PopoverBody>
                    </UncontrolledPopover>  
                </Container>


                  <Container className='buttonContainer' fluid>
                    <ButtonGroup className="buttons">
                      <Button
                        outline
                        onClick={() => setRSelected(0)}
                        active={rSelected === 0}
                        size='sm'
                      >
                        Table
                      </Button>
                      <Button
                        outline
                        onClick={() => setRSelected(1)}
                        active={rSelected === 1}
                        size='sm'
                      >
                        Chart
                      </Button>
                    </ButtonGroup>
                  </Container>
                  {
                    rSelected === 1 ? 
                    (
                      <Container className='entryHistory' fluid>
                        <EasyTimeSeries data={entries}></EasyTimeSeries>
                      </Container>
                    ) :
                    (
                    <div>
                      <Container className='entryHistory' fluid>
                        <EntryTable
                          data={entries}
                          deleteHandler={deleteEntry}>
                        </EntryTable>
                      </Container>
                      <Container className='entryHistory' fluid>
                        <SummaryTable stats={stats}></SummaryTable>
                      </Container>
                    </div>
                    )
                  }
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
      ) : (
        <header className="App-header">
          <Button 
            onClick={() => login()} 
            style={{width:"15%", margin:"auto"}}
          >
          Sign in with Google
          </Button>
        </header>
      )} 
    </div>
  );
}

export default App;
