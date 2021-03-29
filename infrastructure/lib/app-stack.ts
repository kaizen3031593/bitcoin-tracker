import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';
import { HitCounter } from './hitcounter';


export class AppStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // defines an AWS Lambda resource
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,    // execution environment
            code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" directory
            handler: 'hello.handler'                // file is "hello", function is "handler"
        });

        const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
            downstream: hello
        });
      
        // defines an API Gateway REST API resource backed by our "hello" function.
        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: helloWithCounter.handler,
            defaultCorsPreflightOptions: {
                allowOrigins: apigw.Cors.ALL_ORIGINS,
                allowMethods: apigw.Cors.ALL_METHODS
            }
        });

        // const table = new dynamodb.Table(this, 'Hits', {
        //     tableName: 'subscribers',
        //     partitionKey: { name: 'date', type: dynamodb.AttributeType.NUMBER }
        // });

        // table.grantReadWriteData(this.handler);
    }
}