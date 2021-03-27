import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as iam from '@aws-cdk/aws-iam';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'bitcoin-tracker',
      websiteIndexDocument: 'index.html', // Specify index document for website
      blockPublicAccess: new s3.BlockPublicAccess({ restrictPublicBuckets: false}) // Allow public access
    });

    // Create bucket policy allowing anyone access to bucket.
    const bucketPolicy = new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [
        `${bucket.bucketArn}/*`,
      ],
      principals: [new iam.AnyPrincipal()],
    })
    bucket.addToResourcePolicy(bucketPolicy); // Add policy to bucket
  }
}
