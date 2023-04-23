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
    const [data,setData]=useState()
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
  return (
    
    <div className='box'>
    <Button>ALL</Button>
     <Box>
     <TableContainer >
  <Table variant='striped' colorScheme='blue' size='sm' fontSize="xs">
    <TableCaption>Imperial to metric conversion factors</TableCaption>
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
        {data?.map((d)=>(

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
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot>
  </Table>
</TableContainer>
    </Box>
 
    </div>
    )
}

export default SortTable;
