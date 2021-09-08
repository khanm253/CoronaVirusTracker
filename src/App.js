import {React, useState, useEffect} from 'react'
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import MapMod from './MapMod'
import Table from './Table'
import {sortData} from './util'
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css";
import Footer from './Footer';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState("Worldwide");
  const [selectedcountryInfo, setselectedCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setcasesType] = useState('cases')

  useEffect(() => {
    fetch('https://api.caw.sh/v3/covid-19/all')
    .then((response) => response.json())
    .then(data => {
      setselectedCountryInfo(data);
    })
  },[])

  useEffect(() => {
     async function getCountriesData() {
      await fetch('https://api.caw.sh/v3/covid-19/countries')
      .then(response => response.json())
      .then((data) => {
        const getcountries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
        }))

        const sortedData = sortData(data);
        setCountries(getcountries)
        setMapCountries(data)
        setTableData(sortedData)
      })
    }

    getCountriesData();
  }, []);
  
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url = (countryCode === 'Worldwide') ? 'https://api.caw.sh/v3/covid-19/all' 
    : `https://api.caw.sh/v3/covid-19/countries/${countryCode}?strict=true`;

    await fetch(url)
    .then(response => response.json())
    .then((data) => {
        setSelectCountry(countryCode);
        setselectedCountryInfo(data);

        setMapCenter([data.countryInfo.lat,data.countryInfo.long])
        setMapZoom(4)
    })

  }

  return (
    <div>
    <div className="App">
      {/*Header*/}
      {/*Title + Select input dropdown field */}
      <div className="app__left">
              <div className="app__header">
          <h1 className="title">COVID-19 TRACKER : {selectCountry == "Worldwide" ? selectCountry : selectedcountryInfo.country}</h1>
          <FormControl className='app__dropdown'>
              <label><strong>SELECT COUNTRY:</strong></label>
              <Select
                variant="outlined"
                value={selectCountry}
                onChange={onCountryChange}
              >
              
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

              </Select>
          </FormControl>
        </div>


        <div className="app__stats">
                <InfoBox onClick={e => setcasesType('cases')} className="cases__infobox" title="Coronavirus Cases" cases={selectedcountryInfo.todayCases} total={selectedcountryInfo.cases}/>
                <InfoBox onClick={e => setcasesType('recovered')} className="recovered__infobox" title="Number of Recoveries" cases={selectedcountryInfo.todayRecovered} total={selectedcountryInfo.recovered}/>
                <InfoBox onClick={e => setcasesType('deaths')} className="deaths__infobox" title="Number of Deaths" cases={selectedcountryInfo.todayDeaths} total={selectedcountryInfo.deaths} />
        </div>
          
          <MapMod
            countries={mapCountries}
            casesType = {casesType}
            center={mapCenter}
            zoom={mapZoom}
          />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country:</h3>
          <Table countries = {tableData}/>
          <br/>
          <h3 className="new__cases__label">Worldwide new cases (Past 4 months):</h3>
          <LineGraph/>
        </CardContent>
      </Card>
    </div>
     <Footer/>
    </div>
  );
}

export default App;
