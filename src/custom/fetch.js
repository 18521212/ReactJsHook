import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const useData = (url, isCovidData) => {
    const [data, setData] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const ourRequest = axios.CancelToken.source()
        
        async function data() {
            try {
                let res = await axios.get(url)
                let data = (res && res.data) ? res.data : [];
                if (data && data.length > 0 && isCovidData === true) {
                    data.map(item => {
                        item.Date = moment(item.Date).format('DD/MM/YYYY');
                        return item;
                    })
                    data = data.reverse()
                }
                setData(data);
                setIsLoading(false);
                setIsError(false);
            }
            catch (e) {
                setIsError(true);
                setIsLoading(false);
            }
        }
        setTimeout(() => {
            data();
        }, 3000);
        return () => {
            ourRequest.cancel('Operation canceled by the user')
        }
    }, [url])

    return {
        data, isLoading, isError
    }
}

export default useData;