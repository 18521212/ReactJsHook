import { useEffect, useState} from "react";
import axios from "axios";
import moment from "moment/moment";
import useData from "../custom/fetch";

const Covid = () => {
    // const today = new Date(new Date().setHours(0, 0, 0, 0));

    // const priorDate = moment().subtract(31, 'day');
    const today = moment().startOf('day').toISOString(true);;
    const priorDate = moment().startOf('day').subtract(31, 'days').toISOString(true);;
    // const [dataCovid, setDataCovid] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [isError, setIsError] = useState(false);
    // // componentDidMount
    // useEffect(() => {
    //     async function covid() {
    //         try {
    //             let res = await axios.get('https://api.covid19api.com/country/vietnam?from=2021-10-01T00:00:00Z&to=2021-10-20T00:00:00Z')
    //             let data = res && res.data ? res.data : [];
    //             if (data && data.length > 0) {
    //                 data.map(item => {
    //                     item.Date = moment(item.Date).format('DD/MM/YYYY');
    //                     return item;
    //                 })
    //                 data = data.reverse()
    //             }
    //             setDataCovid(data)
    //             setIsLoading(false)
    //         }
    //         catch (e) {
    //             setIsError(true);
    //             setIsLoading(false);
    //         }
    //     }
    //     covid()
    // }, []);
    const {data: dataCovid, isLoading, isError} = useData(`https://api.covid19api.com/country/vietnam?from=${priorDate}&to=${today}`, true)
    return (
        <>
            <h3>Covid 19 tracking in VietNam:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Confirmed</th>
                        <th>Active</th>
                        <th>Deaths</th>
                        <th>Recovered</th>
                    </tr>
                </thead>
                <tbody>
                    {isError == false && isLoading == false && dataCovid && dataCovid.length > 0 &&
                        dataCovid.map(item => {
                            return (
                                <tr key={item.ID}>
                                    <td>{item.Date}</td>
                                    <td>{item.Confirmed}</td>
                                    <td>{item.Active}</td>
                                    <td>{item.Deaths}</td>
                                    <td>{item.Recovered}</td>
                                </tr>
                            )
                        })
                    }
                    {isLoading == true
                        && <tr>
                            <td colSpan='5' style={{ 'textAlign': 'Center' }}>Loading</td>
                        </tr>
                    }
                    {isError == true
                        && <tr>
                            <td colSpan='5' style={{ 'textAlign': 'Center' }}>Something wrong</td>
                        </tr>
                    }
                </tbody>
            </table>
        </>
    )
}

export default Covid;