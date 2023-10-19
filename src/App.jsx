import './App.css'
import Header from './Header.jsx'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Country from './Country.jsx'
import { Routes, Route } from 'react-router-dom'
import CountryDetails from './CountryDetails';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const countriesInputRef = useRef();
  const regionRef = useRef();
  const navigate = useNavigate();

  const noCountries = countries.status || countries.message;

  const switchMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  },[]);
  

  const fetchData = async () => {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();

    if (data.status === 404) {
      setCountries([]);
      return;
    }
    setCountries(data);
    console.log(data)
  };

  const searchCountries = () => {
    const searchValue = countriesInputRef.current.value;
    
    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const response = await fetch(`https://restcountries.com/v3.1/name/${searchValue}`)
        const data = await response.json()

        setCountries(data);
      }

      try {
        fetchSearch()
      } catch (error) {
        console.log(error)
      }
    } else {
      fetchData();
    }

  };

  const selectRegion = () => {
    const selectValue = regionRef.current.value;

    if (selectValue.trim()) {
      const fetchSelect = async () => {
        const response = await fetch (`https://restcountries.com/v3.1/region/${selectValue}`);
        const data = await response.json();

        if (selectValue === "All") {
          try {
            fetchData()
          } catch (error) {
            console.log(error);
          }
          return;
        }

        setCountries(data);
      }

      try {
        fetchSelect();
      } catch (error) {
        console.log(error)
      }
    }
  }

  const showDetails = (code) => {
    navigate(`/${code}`);

  }

  return (
   <div className={`app ${darkMode ? `darkMode` : ''}`}>
      <Header onClick={switchMode} darkMode={darkMode}/>

      <Routes>
        <Route path="/" element={
                <div className="app_body">
                <div className="inputs">
                  <div className={`search_input ${darkMode ? `darkMode` : ''}`}>
                    <SearchOutlinedIcon style={{color: 'gray'}}/>
                    <input type="text" placeholder="Search for a country..." ref={countriesInputRef} onChange={searchCountries}/>
                  </div>
                  <div className={`select_region ${darkMode ? `darkMode` : ''}`}>
                    <select className={`select ${darkMode ? `darkMode` : ''}`} ref={regionRef} onChange={selectRegion}>
                      <option>All</option>
                      <option>Africa</option>
                      <option>Americas</option>
                      <option>Asia</option>
                      <option>Europe</option>
                      <option>Oceania</option>
                    </select>
                  </div>
                </div>
        
                <div className="countries">
                  { !noCountries ? (
                    countries.map((country) => (<Country darkMode={darkMode} 
                      key={country.alpha3Code} 
                      code={country.cca3}
                      name={country.name.common}
                      capital={country.capital}
                      population={country.population}
                      region={country.region}
                      flag={country.flags.png}
                      showDetails={showDetails}
                      />))
                  ) : (
                    <p>No coutries found ...</p>
                  )}
                </div>
              </div>
        } />
        <Route path="/:countryCode" element={<CountryDetails darkMode={darkMode} countries={countries} refetch={fetchData}/>}/>
      </Routes>

   </div>
  )
}

export default App
