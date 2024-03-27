import {Table} from 'reactstrap'
import Entry from './Entry';

export default function EntryTable({data}) {
    const d = JSON.parse({data}.data)
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
            </tbody>
        </Table>
    );
}