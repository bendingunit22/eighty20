export default function Entry({date, easy, hard, kilometers, isStatBar}) {
    return (
            <tr className={isStatBar ? "statsBar" : null}>
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
