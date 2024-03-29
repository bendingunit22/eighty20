import {Table} from 'reactstrap'
import Entry from './Entry';

export default function EntryTable({data, stats}) {
    const d = JSON.parse({data}.data)
    console.log({stats}.stats)
    const s = JSON.parse({stats}.stats)
    return (
        <Table striped>
            <thead>
                <tr>
                    <th>
                        Date
                    </th>
                    <th>
                        Easy
                    </th>
                    <th>
                        Hard
                    </th>
                    <th>
                        Kilometers
                    </th>
                </tr>
            </thead>
            <tbody>
                { d.length > 0 &&
                    d.map(entry => 
                        <Entry 
                            date = {entry.date.S}
                            easy = {entry.easy.N}
                            hard = {entry.hard.N}
                            kilometers = {entry.kilometers.S}
                    ></Entry>) 
                }
                <Entry
                    date = {s.needed}
                    easy = {s.easy}
                    hard = {s.hard}
                    kilometers = {s.kilometers}
                >    
                </Entry>
            </tbody>
        </Table>
    );
}