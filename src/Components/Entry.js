export default function Entry({date, easy, hard, kilometers}) {
    return (
            <tr>
                <td>
                {date}
                </td>
                <td>
                {easy}
                </td>
                <td>
                {hard}
                </td>
                <td>
                {kilometers}
                </td>
            </tr>
    );
}
