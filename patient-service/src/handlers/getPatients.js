import AWS from 'aws-sdk';
import createError from 'http-errors';
import commomMiddleware from '../utils/commomMiddleware';
import _ from 'lodash'

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getPatients(event, context)
{
    let patients;

    try {
        const result = await dynamodb.scan({
            TableName: process.env.PATIENTS_TABLE_NAME
        }).promise();

        patients = result.Items;
    } catch (error) {
        console.log(error)
        throw new createError.InternalServerError(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify(patients),
    };
}

export const handler = commomMiddleware(getPatients);


