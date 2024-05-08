import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import RunningView from './Components/RunningView'
import { Button, ButtonGroup, UncontrolledPopover } from 'reactstrap';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { Row, Col } from 'reactstrap';
import { Container, PopoverBody } from 'reactstrap';


function App() {
  const [ activeView, setActiveView ] = useState('running')
  const [ profile, setProfile ] = useState([]);
  const [ user, setUser ] = useState([]);
  const [ dropdownOpen, setDropdownOpen ] = useState(false);
  const [ rSelected, setRSelected ] = useState(0);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  
  const viewSelector = {
    'running': RunningView
  }


  useEffect(() => {
    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
      headers: {
        Authorization: `Bearer ${user.access_token}`,
        Accept: 'application/json'
      }})
      .then((response) => response.json())
      .then((data) => {
        setProfile(data)
      })
      .catch((err) => { 
        console.log(err)
      });

      console.log("above :" + rSelected)

  }, [user, rSelected]);

  return (
    <div className="App">
      {profile ? (
        <header className="App-header">
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
            <Container className='tableGraphSelector' fluid>
                <Row style={{paddingRight: "0px", marginRight: "0px"}}>
                    <Col style={{textAlign: "left"}}>
                        <Dropdown 
                        className='viewDropdown' 
                        size='sm' 
                        isOpen={dropdownOpen} 
                        toggle={toggle}
                        >
                            <DropdownToggle caret>
                            Workout Type
                            </DropdownToggle>
                            <DropdownMenu container="body">
                            <DropdownItem onClick={function noRefCheck(){}}>
                                Running
                            </DropdownItem>
                            <DropdownItem onClick={function noRefCheck(){}}>
                                Weight Training
                            </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col style={{textAlign: "right"}}>
                        <ButtonGroup className="chartButtons" style={{paddingRight: "0px"}}>
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
                    </Col>
                </Row>
            </Container>
            {typeof rSelected !== 'undefined' &&
            <RunningView>
              viewState={rSelected}
            </RunningView>
            }
          </Container>
        </header>
      ) : (
        <header className="unauthenticatedView">
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
