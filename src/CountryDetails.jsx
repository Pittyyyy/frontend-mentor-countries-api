import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from "react-router";

function CountryDetails({darkMode, countries, refetch}) {
  const params = useParams();
  const navigate = useNavigate();

  let name;
  let flagImg;
  let nativeName;
  let population;
  let region;
  let subregion;
  let topLevelDomain;
  let capital;
  let currencies = [];
  let languages = [];
  let borders = [];

  countries.forEach((country) => {
    if (country.cca3 === params.countryCode) {
      name = country.name.common
      capital = country.capital
      population = country.population
      region = country.region
      flagImg = country.flags.png
      nativeName = country.name.official
      subregion = country.subregion
      topLevelDomain = country.tld

      currencies = Object.values(country.currencies).map((currency) => currency.name);
      languages = Object.values(country.languages).map((language) => language);
      
      country.borders?.forEach((border) => {
        borders.push(border)
      });
    }} 
    )


  const handleClick = () => {
    navigate('/');
  };
  return (
    <div className="country_details">
      <button className={`back ${darkMode ? 'darkMode' : ""}`} onClick={handleClick}>
        <ArrowBackIcon/>
        <p>Go back</p>
      </button>

      <div className="country_details_body">
        <div className="img_container">
          <img src={flagImg} alt="" />
        </div>

        <div className="info">
          <h2>{name}</h2>
          <div className="info_container">
            <div className="left_info">
              <p>Native Name:{" "}
              <span className={`values ${darkMode ? 'darkMode' : ""}`}>{nativeName}</span>
              </p>
              <p>Population:{" "}
              <span className={`values ${darkMode ? 'darkMode' : ""}`}>{population}</span>
              </p>
              <p>Region:{" "}
              <span className={`values ${darkMode ? 'darkMode' : ""}`}>{region}</span>
              </p>
              <p>Sub region:{" "}
              <span className={`values ${darkMode ? 'darkMode' : ""}`}>{subregion}</span>
              </p>

            </div>
            <div className="right_info">
              <p>Capital:{" "}
              <span className={`values ${darkMode ? 'darkMode' : ""}`}>{capital}</span>
              </p>
              <p>Top-level Domain:{" "}
              <span className={`values ${darkMode ? 'darkMode' : ""}`}>{topLevelDomain}</span>
              </p>
              <p>Currencies:{" "}
                {currencies.map((currency, index) => (
                  <span key={index} className={`values ${darkMode ? 'darkMode' : ""}`}>
                    {index < currencies.length - 1 ? `${currency}, ` : currency}
                  </span>
                ))}
              </p>
              <p>Languages:{" "}
              {languages.map((currency, index) => (
                  <span key={index} className={`values ${darkMode ? 'darkMode' : ""}`}>
                    {index < currencies.length - 1 ? `${currency}, ` : currency}
                  </span>
                ))}
              </p>
            </div>
          </div>

          Border Countries:
                {borders.length ? (
                  borders.map((border) => (
                    <div className={`border_country ${darkMode ? "darkMode" : ""}`} onClick={() => {
                      refetch();
                      navigate(`/${border}`)
                    }}>
                      {border}
                    </div>
                  ))
                ) : (
                  <div className={`values ${darkMode ? "darkMode" : ""}`}>
                      <p>No border...</p>
                    </div>
                )}
        </div>
      </div>
    </div>
  )
}

export default CountryDetails