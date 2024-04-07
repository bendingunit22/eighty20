import {Table} from 'reactstrap'
import Entry from './Entry';

export default function EntryTable({stats}) {
    const s = JSON.parse({stats}.stats)
    return (
    <div>   

        <Table>
            <tbody>
                <Entry
                    date = {s.needed}
                    easy = {s.easy}
                    hard = {s.hard}
                    kilometers = {s.kilometers}
                    isStatBar={true}
                >
                </Entry>
            </tbody>
            <tfoot className="statsFooter">
                <tr>
                    <th>
                        Minutes needed
                    </th>
                    <th>
                        Total easy min.
                    </th>
                    <th>
                        Total hard min.
                    </th>
                    <th>
                        Avg. Km
                    </th>
                    <th>
                    </th>
                </tr>
            </tfoot>
        </Table>
    </div>
    );
}