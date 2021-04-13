import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export interface SubscriberProps {
  /** the function for which we want to count url hits **/
  downstream: lambda.IFunction;
}

export class Subscriber extends cdk.Construct {

  /** allows accessing the counter function */
  public readonly handler: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props: SubscriberProps) {
    super(scope, id);

    const table = new dynamodb.Table(this, 'Subscribers', {
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING }
    });

    this.handler = new lambda.Function(this, 'SubscriberHandler', {
        runtime: lambda.Runtime.NODEJS_10_X,
        handler: 'subscriber.handler',
        code: lambda.Code.fromAsset('lambda'),
        environment: {
            DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
            HITS_TABLE_NAME: table.tableName
        }
    });

    // grant the lambda role read/write permissions to our table
    table.grantReadWriteData(this.handler);

    // grant the lambda role invoke permissions to the downstream function
    props.downstream.grantInvoke(this.handler);
  }
}
