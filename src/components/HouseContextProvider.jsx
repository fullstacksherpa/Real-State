import React, {useState, useEffect, createContext} from 'react';
import {housesData} from "../data"

export const HouseContext = createContext();

const HouseContextProvider = ({children}) => {
  const [houses, setHouses] = useState(housesData)
  const [country, setCountry] = useState("Nepal")
  const [countries, setCountries] = useState([])
  const [property, setProperty] = useState('900')
  const [properties, setProperties] = useState([])
  const [price, setPrice] = useState("any price")
  const [loading, setLoading] = useState(false)

  //return all countries

  useEffect(()=>{
    const allCountries = houses.map((house)=>{
      return house.country
    })
// remove all duplicate country
    const uniqueCountries = ['location any', ... new Set(allCountries)]
    setCountries(uniqueCountries)
  },[]);
  return (
    <HouseContext.Provider value={{country, setCountry, countries, property, setProperty, properties, price, setPrice, houses, loading}}>
      {children}
    </HouseContext.Provider>
  )
};

export default HouseContextProvider;
