import React, { useEffect, useState } from "react";
import "../Components/table.scss";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";

const SortTable = () => {
  const regexNumber = /^([^0-9]*)$/;

  const [data, setData] = useState();
  const [render, setRender] = useState();
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080/user");
      const data = await response.json();
      setData(data);
      // console.log(data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const allData = () => {
    setRender(data);
  };

  // Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
  const lowIncomeData = () => {
    const income = data.filter(function (e) {
      return (
        Number(e.income.charAt(1)) < 5 &&
        (e.car === "BMW" || e.car === "Mercedes-Benz")
      );
    });
    setRender(income);
    // console.log(income);
  };

  //Male Users which have phone price greater than 10,000.
  const priceData = () => {
    const res = data.filter(function (x) {
      return x.gender === "Male" && Number(x.phone_price > 10000);
    });
    setRender(res);
    // console.log(res);
  };

  //Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name
  const startMData = () => {
    const mStart = data.filter(function (e) {
      return (
        e.last_name.startsWith("M") &&
        e.quote.length > 15 &&
        e.email.includes(e.last_name.toLowerCase())
      );
    });
    setRender(mStart);
    // console.log(mStart);
  };

  // Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
  const carBrandData = () => {
    const carBrand = data.filter(function (e) {
      return (
        Number(
          e.car === "Audi" || e.car === "BMW" || e.car === "Mercedes-Benz"
        ) && regexNumber.test(e.email)
      );
    });
    setRender(carBrand);
    // console.log(carBrand);
  };

  //Show the data of top 10 cities which have the highest number of users and their average income.
  const cityData = () => {
    let city = [];
    data.filter(function (e) {
      return city.push(e.city);
    });
    // console.log(city);

    const cityList = city.reduce(function (acc, curr) {
      // eslint-disable-next-line
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});
    // console.log(cityList);

    const sortCity = Object.values(cityList).sort(function (a, b) {
      return b - a;
    });
    const topTenCity = sortCity.slice(0, 10);
    console.log(topTenCity);

    setRender(data.slice(0, 10));
  };

  return (
    <div className="box">
      <Button colorScheme="teal" size="sm" m={5} onClick={() => allData()}>
        ALL DATA WITHOUT ANY FILTER
      </Button>
      <Button
        colorScheme="teal"
        size="sm"
        m={5}
        onClick={() => lowIncomeData()}
      >
        INCOME LESS 5$ AND CAR BMW,MERCEDES-BENZ
      </Button>
      <Button colorScheme="teal" size="sm" m={5} onClick={() => priceData()}>
        MALE USERS PHONE PRICE&gt;10000
      </Button>
      <Button colorScheme="teal" size="sm" m={5} onClick={() => startMData()}>
        LAST NAME M WITH QUOTE LENGTH 15
      </Button>
      <Button colorScheme="teal" size="sm" m={5} onClick={() => carBrandData()}>
        CAR BRAND WITH EMAIL VALIDATIONS
      </Button>
      <Button colorScheme="teal" size="sm" m={5} onClick={() => cityData()}>
        TOP 10 CITY 
      </Button>

      <Box>
        <TableContainer>
          <Table variant="striped" colorScheme="black" size="sm" fontSize="xs">
            <TableCaption color="black">Created By VAIBHAV MORE</TableCaption>
            <Thead>
              <Tr>
                <Th fontSize="xs" color="black">
                  ID
                </Th>
                <Th fontSize="xs" color="black">
                  FIRST NAME
                </Th>
                <Th fontSize="xs" color="black">
                  LAST NAME
                </Th>
                <Th fontSize="xs" color="black">
                  EMAIL
                </Th>
                <Th fontSize="xs" color="black">
                  GENDER
                </Th>
                <Th fontSize="xs" color="black">
                  INCOME
                </Th>
                <Th fontSize="xs" color="black">
                  CITY
                </Th>
                <Th fontSize="xs" color="black">
                  CAR
                </Th>
                <Th fontSize="xs" color="black">
                  QUOTE
                </Th>
                <Th fontSize="xs" color="black">
                  PHONE PRICE
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {render?.map((d) => (
                <Tr key={d.id}>
                  <Td fontSize="xs">{d.id}</Td>
                  <Td fontSize="xs">{d.first_name}</Td>
                  <Td fontSize="xs">{d.last_name}</Td>
                  <Td fontSize="xs">{d.email}</Td>
                  <Td fontSize="xs">{d.gender}</Td>
                  <Td fontSize="xs">{d.income}</Td>
                  <Td fontSize="xs">{d.city}</Td>
                  <Td fontSize="xs">{d.car}</Td>
                  <Td fontSize="xs">{d.quote}</Td>
                  <Td fontSize="xs">{d.phone_price}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default SortTable;
