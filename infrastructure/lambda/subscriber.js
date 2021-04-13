const { DynamoDB, Lambda } = require('aws-sdk');

exports.handler = async function(event, context) {
  console.log("request:", JSON.stringify(event, undefined, 2));

  const email = event.queryStringParameters.email;
  const threshold = event.queryStringParameters.threshold;
  const id = context.awsRequestId;

  // create AWS SDK clients
  const docClient = new DynamoDB.DocumentClient();
  const lambda = new Lambda();

  var params = {
    TableName: process.env.HITS_TABLE_NAME,
    Item: {
      "id": id,
      "email": email,
      "threshold": threshold
    }
  }

  // update dynamo entry for "path" with hits++
  // await dynamo.updateItem({
  //   TableName: process.env.HITS_TABLE_NAME,
  //   Key: { id: { S: id } },
  //   UpdateExpression: 'ADD email :incr',
  //   ExpressionAttributeValues: { ':incr': { N: '1' } }
  // }).promise();

  await docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
    }
  });

  // call downstream function and capture response
  const resp = await lambda.invoke({
    FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
    Payload: JSON.stringify(event),
  }).promise();

  console.log('downstream response:', JSON.stringify(resp, undefined, 2));

  // return response back to upstream caller
  return JSON.parse(resp.Payload);
};
