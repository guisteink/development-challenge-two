import AWS from 'aws-sdk';
import createError from 'http-errors';
import commomMiddleware from '../utils/commomMiddleware';
import _ from 'lodash'

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function deletePatientById(event, context)
{
    const { id } = event.pathParameters;

    try {
        await dynamodb.delete({
            TableName: process.env.PATIENTS_TABLE_NAME,
            Key: { id }
        }).promise();

    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify("Patient successfully deleted"),
    };
}

export const handler = commomMiddleware(deletePatientById);


