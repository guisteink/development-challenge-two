import AWS from 'aws-sdk';
import createError from 'http-errors';
import commomMiddleware from '../utils/commomMiddleware';
import _ from 'lodash'
import { getPatientById } from './getPatientById'

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function updatePatientById(event, context)
{
    const { id } = event.pathParameters;

    const findPatient = await dynamodb.get({
        TableName: process.env.PATIENTS_TABLE_NAME,
        Key: { id }
    }).promise();

    let patient = _.get(findPatient, 'Item');

    const { name, birthDate, email, address } = event.body;
    const now = new Date();

    if (_.isEmpty(findPatient)) throw new createError.NotFound("Patient not exits")
    if (_.isEmpty(id)) throw new createError.BadRequest("Need to pass the id to this operation")

    const udpatedParams = {
        TableName: process.env.PATIENTS_TABLE_NAME,
        Key: { id },
        UpdateExpression: "set #patientName = :name, birthDate = :birthDate, email = :email, address = :address, updatedAt= :updatedAt",
        ExpressionAttributeValues: {
            ":name": name ? name : patient?.name,
            ":birthDate": birthDate ? birthDate : patient?.birthDate,
            ":email": email ? email : patient?.email,
            ":address": address ? address : patient?.address,
            ":updatedAt": now.toISOString()
        },
        ExpressionAttributeNames: { "#patientName": "name" },
        ReturnValues: 'UPDATED_NEW',
    };

    let updatedPatient;

    try {
        const result = await dynamodb.update(udpatedParams).promise();
        updatedPatient = _.get(result, 'Attributes');
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(updatedPatient),
    };
}

export const handler = commomMiddleware(updatePatientById);


