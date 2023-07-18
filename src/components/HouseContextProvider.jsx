import React, { useState, useEffect, createContext } from "react";
import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("property type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("any price");
  const [loading, setLoading] = useState(false);

  //return all countries

  useEffect(() => {
    const allCountries = houses.map((house) => {
      return house.country;
    });
    // remove all duplicate country
    const uniqueCountries = ["location any", ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, []);

  //return all properties

  useEffect(() => {
    const allProperties = houses.map((house) => {
      return house.type;
    });
    // remove all duplicate property
    const uniqueProperties = ["location any", ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);
    // create a function that check if the string includes 'any'
    const isDefault = (str) => {
      return str.split("").includes("(any)");
    };

    // get first value of price and parse it to number
    const minPrice = parseInt(price.split("-")[0]);

    // get seco9nd value of price which is the max price and parse it to number
    const maxPrice = parseInt(price.split("-")[1]);
    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);
      //if all value are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      // if all value are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }
      // if country is not default
      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      // if property is not default

      if (!isDefault(property) && isDefault(price) && isDefault(country)) {
        return house.type === property;
      }

      // if price is not default
      if (!isDefault(price) && isDefault(property) && isDefault(country)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }
      // if country and property is not default
      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }
      // if country and price are not default
      if (!isDefault(country) && !isDefault(price) && isDefault(property)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }
      // if property and price are not default
      if (!isDefault(property) && !isDefault(price) && isDefault(country)) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });
    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        houses,
        loading,
        handleClick,
        loading,
      }}>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
