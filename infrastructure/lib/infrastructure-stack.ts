import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as route53 from '@aws-cdk/aws-route53';
import * as certificateManager from '@aws-cdk/aws-certificatemanager';
import * as targets from '@aws-cdk/aws-route53-targets';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, 'WebsiteBucket', {
      bucketName: 'bitcoin-tracker',
      websiteIndexDocument: 'index.html', // Specify index document for website
    });

    // Create reference to hosted zone
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'bitcoin-patrol.com',
    });

    // Create DNS validated certificate
    const certificate = new certificateManager.DnsValidatedCertificate(this, 'Certificate', {
      domainName: 'bitcoin-patrol.com',
      hostedZone,
      region: 'us-east-1',
    });

    // Restrict access to bucket to only CloudFront
    const cloudFrontOAI = new cloudfront.OriginAccessIdentity(this, 'OAI');

    const distribution = new cloudfront.CloudFrontWebDistribution(this, 'MyDistribution', {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: bucket,
            originAccessIdentity: cloudFrontOAI,
          },
          behaviors: [{ isDefaultBehavior: true }]
        }
      ],
      viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(
        certificate, // Specify cloudfront certificate that should be used
        {
          aliases: ['bitcoin-patrol.com'],
          securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1,
          sslMethod: cloudfront.SSLMethod.SNI,
        },
      ),
    });

    // Create a record in route53 and point to cloudfront
    new route53.ARecord(this, 'Alias', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
    });

    bucket.grantRead(cloudFrontOAI.grantPrincipal);
  }
}
