import AWS from 'aws-sdk';
import createError from 'http-errors';
import commomMiddleware from '../utils/commomMiddleware';
import _ from 'lodash'

const dynamodb = new AWS.DynamoDB.DocumentClient();

export async function getPatientById(event, context)
{
    let findPatient;
    const { id } = event.pathParameters;

    try {
        const result = await dynamodb.get({
            TableName: process.env.PATIENTS_TABLE_NAME,
            Key: { id }
        }).promise();

        findPatient = _.get(result, 'Item');
    } catch (error) {
        console.log(error);
        throw new createError.InternalServerError(error)
    }

    if (_.isEmpty(findPatient)) throw new createError.NotFound(`Patient with ID "${id}" not found!`)

    return {
        statusCode: 200,
        body: JSON.stringify(findPatient),
    };
}

export const handler = commomMiddleware(getPatientById);


