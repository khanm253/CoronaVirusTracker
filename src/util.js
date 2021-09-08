import React from "react";
import { Circle, Popup } from "react-leaflet";


const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#800080",
      rgb: "rgb(251, 68, 67)",
      multiplier: 2000,
    },
  };

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        if(a.cases > b.cases){
            return -1;
        }else{
            return 1;
        }
    })

    return sortedData;
}

export const showDataOnMap = (data, casesType='cases') => {
    
    let color;

    if(casesType == 'cases'){
        color='#CC1034'
    }else if(casesType == 'recovered'){
        color = '#7dd71d'
    }else{
        color = '#800080'
    }

    return (
        data.map(country => (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={color}
                fillColor={color}
                radius={
                    Math.sqrt(country[casesType]/10) * casesTypeColors[casesType].multiplier
                }
            >
                <Popup>
                    <div className="info-container">
                        <div
                            className="info-flag"
                            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
                        />
                        <div className="info-name">{country.country}</div>
                        <div className="info-confirmed">Cases: {country.cases}</div>
                        <div className="info-recovered">Recovered: {country.recovered}</div>
                        <div className="info-deaths">Deaths: {country.deaths}</div>
                    </div>
                </Popup>
            </Circle>
        ))
    )
};