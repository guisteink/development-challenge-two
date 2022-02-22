import { create } from 'axios'

const patientService = "https://4ih489hb6l.execute-api.eu-west-1.amazonaws.com/dev"

const api = create({
    baseURL: patientService
})

const getPatients = () =>
{
    return api.get('/patients')
}

const getPatientById = id =>
{
    return api.get(`/patient/${id}`)
}

const createPatient = data =>
{
    return api.post('/patient', data)
}

const updatePatientById = (id, data) =>
{
    return api.put(`/patient/${id}`, data)
}

const deletePatientById = id =>
{
    return api.delete(`/patient/${id}`)
}

export default {
    getPatients,
    getPatientById,
    createPatient,
    updatePatientById,
    deletePatientById
}