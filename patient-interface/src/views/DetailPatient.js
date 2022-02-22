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
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom'
import { useParams } from "react-router-dom";

export default function DetailPatient()
{
    const [patient, setPatient] = useState()
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() =>
    {
        loadPatient()
    }, [])

    const loadPatient = async () =>
    {
        try {
            const response = await api.getPatientById(id)
            setPatient(_.get(response, 'data'))
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) =>
    {
        let clonedData = patient;
        clonedData[e.target.name] = e.target.value;
        // console.log(e.target.name)
        setPatient(clonedData);
        //   setTickets(clonedData);
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
            width: '80vw',
            background: 'rgba(120, 120, 120, 0.1)',
            backdropFilter: "blur(3px) saturate(100%) contrast(45%) brightness(130%)",
        }} >
            <Stack spacing={3}>
                <TextField
                    sx={{ width: '80vw' }}
                    type="Text"
                    label="Name"
                    autoComplete="name"
                    onChange={(e) => handleChange(e)}
                    value={patient?.name}
                    id="outlined-basic" />

                <TextField
                    sx={{ width: '80vw' }}
                    type="text"
                    label="Birth date"
                    autoComplete="birthdate"
                    value={patient?.birthDate}
                    id="outlined-basic" />

                <TextField
                    sx={{ width: '80vw' }}
                    type="email"
                    label="Email"
                    autoComplete="email"
                    value={patient?.email}
                    id="outlined-basic" />

                <TextField
                    sx={{ width: '80vw', color: 'white' }}
                    type="Text"
                    label="Address"
                    autoComplete="address"
                    value={patient?.address}
                    id="outlined-basic" />

                <ButtonGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} variant="contained" size="large" aria-label="large button group">
                    <Button onClick={() => console.log(patient)} sx={{ width: '50%', }} color="primary">Save</Button>
                    <Button onClick={() => navigate('/home')} sx={{ width: '50%' }} color="secondary">Back</Button>
                </ButtonGroup>
            </Stack>

        </Box>
    </Box>
}