import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import _ from 'lodash'
import api from '../services/api'
import { useNavigate  } from 'react-router-dom'

export default function Home()
{
    const [patients, setPatients] = useState([])
    const navigate = useNavigate();

    useEffect(() =>
    {
        loadPatients()
    }, [])

    const loadPatients = async () =>
    {
        try {
            const response = await api.getPatients()
            setPatients(_.get(response, 'data'))
        } catch (error) {
            console.log(error)
        }
    }

    return <Box
        sx={{
            margin: 0,
            padding: 0,
            height: '95vh',
            display: 'flex',
            justifyContent: 'center',
            backgroundImage: `url("https://source.unsplash.com/1600x900/?medical")`,
            alignItems: 'center',
        }}
    >
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            padding: '10px',
            width: '80vw', height: '80vh',
            background: 'transparent',
        }} >

            <TableContainer component={Paper} sx={{
                padding: '50px',
                background: 'rgba(120, 120, 120, 0.1)',
                backdropFilter: "blur(3px) saturate(100%) contrast(45%) brightness(130%)"
            }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px 20px 20px 20px', fontSize: '40px', fontWeight: 'bold', color: 'white', textShadow: '1px 1px 1px black' }}>
                   
                    <Button variant="contained" sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Add patient</Button>
                </Box>
                <Table sx={{ minWidth: 650, border: '1px solid white' }} aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ color: 'white' }}>
                            <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Nome completo</TableCell>
                            <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">Data de aniversário</TableCell>
                            <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">Email</TableCell>
                            <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">Address</TableCell>
                            <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {_.map(patients, (row, index) =>
                        {
                            return <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} component="th" scope="row"> {row.name}</TableCell>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">{row.birthDate}</TableCell>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">{row.email}</TableCell>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">{row.address}</TableCell>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Update</Button>
                                        <Button onClick={() => navigate(`/detail/${row.id}`)} sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Show</Button>
                                        <Button sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        })}


                        {/* {patients.map((row) => (
                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} component="th" scope="row"> {row.name}</TableCell>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">{row.calories}</TableCell>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">{row.fat}</TableCell>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">{row.carbs}</TableCell>
                                <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">
                                    <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                        <Button sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Update</Button>
                                        <Button sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Show</Button>
                                        <Button sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    </Box>
}