import {Container} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import EntryTable from './EntryTable';
import SummaryTable from './SummaryTable';
import RunningForm from './RunningForm'
import { DNA } from 'react-loader-spinner'
import EasyTimeSeries from './EasyTimeSeries';

export default function RunningView(){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const [ rSelected, setRSelected ] = useState(0);
    const [ entries, setEntries ] = useState([]);
    const [ stats, setStats ] = useState([]);
    const [ entryRefreshes, setEntryRefreshes ] = useState(0);


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
        .then(form.reset())
        .then(_ => setEntryRefreshes(entryRefreshes + 1))
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
    

      })

      return (
        <div>
                     {
            (entries || []).length > 0 ? (
              <div>

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
              </div>
            ):(
              <Container className='entryHistory' fluid>
                <DNA></DNA>
              </Container>
            )
          }
          <Container className='mainContainer' fluid>
            <h5 className='entryHeading'>Submit a new entry</h5>
            <RunningForm
              handler = {handleSubmit}
            ></RunningForm>
          </Container>
        </div>
    );
};