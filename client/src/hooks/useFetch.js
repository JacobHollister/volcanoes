import { useEffect, useRef, useState } from "react";
import axios from "axios"

export function useFetch(url, config) {
    const fetchedDataUrl = useRef(null);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(fetchedDataUrl.current !== url){
            setLoading(true)
            axios({...config, timeout: 10000})
                .then((result) => {
                    setData(result.data);
                })
                .catch((e) => {
                    setError(e.response ? e.response.data.message : e.message);
                })
                .finally(() => {
                    setLoading(false);
                    fetchedDataUrl.current = url
                });
        }
    }, [url, config]);
    
    return {
        loading,
        data,
        error,
    };
}