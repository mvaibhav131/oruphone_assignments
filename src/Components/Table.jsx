import React, { useEffect, useState } from 'react'
// import Data from '.././db.json'
import '../Components/table.scss'
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
  } from '@chakra-ui/react'

const SortTable = () => {
    const [data,setData]=useState();
   const [render,setRender]=useState(); 
const fetchData = async () => {
    try{
        const response = await fetch("http://localhost:8080/user")
        const data = await response.json()
        setData(data)
        console.log(data)
    }catch(e){
        console.error(e)
    }
  }
    useEffect(()=>{
        fetchData()
    },[])
    const allData=()=>{
         setRender(data)
    }
    const priceData=()=>{
    const res=  data.filter(function(x){ return Number(x.phone_price>10000)})
      setRender(res)
      console.log(res)
    }
    const lowIncomeData=()=>{
      const income= data.filter(function(x){ return Number(parseInt(x.income))*82.04 <400})
      console.log(income)
    }

    const startMData=()=>{
      
    }

    const carBrandData=()=>{
      
    }

    const cityData=()=>{
      
    }

  return (
    
    <div className='box'>
    <Button  colorScheme='teal' size='sm' m={5} onClick={()=>allData()}>ALL DATA</Button>
    <Button  colorScheme='teal' size='sm' m={5} onClick={()=>lowIncomeData()}>LOWER INCOME</Button>
    <Button  colorScheme='teal' size='sm' m={5} onClick={()=>priceData()}>PHONE PRICE&gt;10000</Button>
    <Button  colorScheme='teal' size='sm' m={5} onClick={()=>startMData()}>START M</Button>
    <Button  colorScheme='teal' size='sm' m={5} onClick={()=>carBrandData()}>BMW,MERCEDES,AUDI</Button>
    <Button  colorScheme='teal' size='sm' m={5} onClick={()=>cityData()}>TOP 10 CITY</Button>

     <Box>
     <TableContainer >
  <Table variant='striped' colorScheme='blue' size='sm' fontSize="xs">
    <TableCaption>Created By VAIBHAV MORE</TableCaption>
    <Thead>
      <Tr>
        <Th fontSize="xs">ID</Th>
        <Th fontSize="xs">FIRST NAME</Th>
        <Th fontSize="xs">LAST NAME</Th>
        <Th fontSize="xs">EMAIL</Th>
        <Th fontSize="xs">GENDER</Th>
        <Th fontSize="xs">INCOME</Th>
        <Th fontSize="xs">CITY</Th>
        <Th fontSize="xs">CAR</Th>
        <Th fontSize="xs">QUOTE</Th>
        <Th fontSize="xs">PHONE PRICE</Th>
      </Tr>
    </Thead>
    <Tbody>
        {render?.map((d)=>(
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
    )
}

export default SortTable;
