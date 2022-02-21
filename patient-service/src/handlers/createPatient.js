import { v4 as uuid } from 'uuid';
import AWS from 'aws-sdk';
import createError from 'http-errors';
import commomMiddleware from '../utils/commomMiddleware';
import _ from 'lodash'

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function createPatient(event, context)
{
    const { name, birthDate, email, address } = _.get(event, 'body');
    const now = new Date();

    if (_.isEmpty(name) || _.isEmpty(email)) throw new createError.BadRequest("Name and email are required");

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


