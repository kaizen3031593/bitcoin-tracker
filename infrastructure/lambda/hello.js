exports.handler = async function(event) {
  console.log("request:", JSON.stringify(event, undefined, 2));
  const email = event.queryStringParameters.email;
  const threshold = event.queryStringParameters.threshold;

  return {
    statusCode: 200,
    headers: { 
      "Content-Type": "text/plain",
      "Access-Control-Allow-Headers" : "*",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    body: `Success! We will alert ${email} when Bitcoin hits ${threshold}\n`
  };
};