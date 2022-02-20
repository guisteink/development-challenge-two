import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import createError from 'http-errors';
import commomMiddleware from '../utils/commomMiddleware';


const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createPatient(event, context)
{
    const { name, birthDate, email, address } = event.body;
    const now = new Date();

    const newPatient = {
        id: uuid(),
        name,
        birthDate,
        email,
        address,
        createAt: now.toISOString(),
    };

    try {
        await dynamodb.put({
            TableName: process.env.PATIENTS_TABLE_NAME,
            Item: newPatient
        }).promise();

    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(newPatient),
    };
}

export const handler = commomMiddleware(createPatient);


