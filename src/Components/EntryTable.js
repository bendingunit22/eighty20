import {Table} from 'reactstrap'
import Entry from './Entry';

export default function EntryTable({data, deleteHandler}) {
    const d = JSON.parse({data}.data)
    return (
    <div>
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
                    <th>
                    </th>
                </tr>
            </thead>
            <tbody >
                { d.length > 0 &&
                    d.map(entry =>
                        <Entry
                            key = {entry[0].stringValue}
                            id = {entry[0].stringValue}
                            date = {entry[1].stringValue}
                            easy = {entry[2].longValue}
                            hard = {entry[3].longValue}
                            kilometers = {entry[4].doubleValue}
                            deleteHandler={deleteHandler}
                    ></Entry>) 
                }
            </tbody>

        </Table>
    </div>
    );
}