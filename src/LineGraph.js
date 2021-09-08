import React, {useEffect, useState} from 'react'
import './App.css';

function LineGraph() {

    const [dataRecord, setDataRecord] = useState([]);

    useEffect(() => {
        fetch('https://api.caw.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then((data) => {
            const datare = []
            for(let date in data['cases']){
               datare.push(data['cases'][date]);
            }
            setDataRecord(datare);
        })
    }, [])

    const netCases = dataRecord[dataRecord.length - 1] - dataRecord[0];

    return (
        <div className="new__cases">
            <h1>+ {netCases}</h1>
        </div>
    )
}

export default LineGraph
