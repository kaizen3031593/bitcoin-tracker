# [Bitcoin Patrol](https://bitcoin-patrol.com)

A website that displays a graph of bitcoin prices and allows users to set notifications for different thresholds. 

## 🚧🚧🚧🚧🚧🚧🚧 In Progress! 🚧🚧🚧🚧🚧🚧🚧

### Design

The frontend of the website should show a live graph of the bitcoin price along with additional statistics. It would be a **huge** plus to get this graph interactive. To achieve this, I will call on the free API from [coinbase](https://developers.coinbase.com/) or something like [polygon](https://polygon.io). The website would have to continuously make these API calls to get up-to-date data. This data could then be stored in **redis/memcached**. For an interactive thing, perhaps embedding a gadget like Tableau would be the way to go, but that is a nice-to-have far down the road.

The website should start with basic functionality to enter an email address and a bitcoin price threshold. The first task is to set up a lambda function that gets triggered and sends a confirmation email to the user. The next task is to store the information in a sorted list to keep track of it. Then, when the bitcoin price crosses a certain threshold, a second lambda should be triggered that sends an email to the user. The AWS components neccesary here would be **lambda**, **SNS**, and **Api Gateway**.

### Motivation 

  - Practice developing infrastructure-as-code through the AWS CDK. Provisioned resources include **S3**, **CloudFront**, **route53**, **Lambda**, and **Api Gateway**!
  - Learn **React** with **TypeScript**.
  - Demonstrate strong software engineering techniques. 
