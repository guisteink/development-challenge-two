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
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom'

export default function Home()
{
    const [buttonLoading, setButtonLoading] = useState(false)
    const [patients, setPatients] = useState([])
    const [alert, setAlert] = useState(false)
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

    const handleDelete = async (id) =>
    {
        setButtonLoading(true)
        try {
            const result = await api.deletePatientById(id) //! fix retorno serverless
            if (result.status === 200) setAlert({ type: 'success', description: 'Sucesso ao deletar usuário' })
            setTimeout(() =>
            {
                setButtonLoading(false)
                setAlert(null)
                window.location.reload()
            }, 2000);

            setButtonLoading(false)
        } catch (error) {
            setButtonLoading(false)
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
                {alert &&
                    <Alert variant="filled" severity={alert?.type}>
                        {alert?.description}
                    </Alert>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '20px 20px 20px 20px', fontSize: '40px', fontWeight: 'bold', color: 'white', textShadow: '1px 1px 1px black' }}>

                    <Button onClick={() => navigate(`/create`)} variant="contained" sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Add patient</Button>

                </Box>
                <Table sx={{ minWidth: 650, border: '3px solid white' }} aria-label="a dense table">
                    <TableHead>
                        <TableRow sx={{ color: 'white' }}>
                            <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Complete name</TableCell>
                            <TableCell sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }} align="center">Birth Date</TableCell>
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
                                        <Button disabled={buttonLoading ? true : false} color="info" onClick={() => navigate(`/create/${row.id}`)} sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Update</Button>
                                        <Button disabled={buttonLoading ? true : false} color="primary" onClick={() => navigate(`/detail/${row.id}`)} sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Show</Button>
                                        <Button disabled={buttonLoading ? true : false} color="secondary" onClick={() => handleDelete(row.id)} sx={{ color: 'white', textShadow: '1px 1px 1px black', fontSize: '20px' }}>Delete</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        })}

                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    </Box>
}