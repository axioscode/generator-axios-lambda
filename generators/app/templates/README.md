<%= meta.name %>
---

<%= meta.description %>

This project was created with `generator-axios:lambda`, Axios' Yeoman generator for making AWS Lambda functions for bots, cron jobs, and APIs. Once created, these are deployed using a tool called Apex. This documentation will help you work with the Lambda rig to make awesome internet things.

`yo axios:lambda`

## Getting Started
If this is your first time making a lambda function with this rig, be sure to follow these instructions first.

### Installing Dependencies
The following, one-line command will install everything you need. If you need to install anything more, please edit `setup.sh`

```
sh setup.sh
```

### Setting your Credentials
To publish to S3 you'll need to create an `axios` profile in your `~/.aws/credentials` file. You will need to have the aws command line tools installed to do this (`npm run setup`). To set up your credentials, simply run:

```bash
$ aws configure --profile axios
AWS Access Key ID [None]: [PUT YOUR ACCESS_KEY HERE]
AWS Secret Access Key [None]: [PUT YOUR SECRET_ACCESS_KEY HERE]
Default region name [None]: us-east-1
Default output format [None]: text
```

## Developing

Checkout our deploy tool's Github repo, Apex, for [more examples](https://github.com/apex/apex/tree/master/_examples) of developing AWS Lambda functions in different languages. If you're writing functions in Node.js or Python, you can use the generator again.

### axios:lambda-node

`yo axios:lambda-node function_name`

Generate an AWS Lambda project with a Node.js function, named `function_name`

```bash
mkdir [project-name] && cd $_
yo axios:lambda-node [function-name]
```

#### Multiple functions

To generate multiple Lambda functions within a project, just re-use the generator

```bash
yo axios:lambda-node [function-name]
```

### axios:lambda-python

`yo axios:lambda-python function_name`

Generate an AWS Lambda project with a Python function, named `function_name`

```bash
mkdir [project-name] && cd $_
yo axios:lambda-python [function-name]
```

#### Multiple functions

To generate multiple Lambda functions within a project, just re-use the generator

```bash
yo axios:lambda-python [function-name]
```

## Deploying

### Connecting to AWS Lambda
We use a build tool `apex`. For more information, documentation, and examples visit [apex.run](http://apex.run).

```
apex init
```

### Multiple Environments

Multiple environments are supported with the --env flag. By default project.json and function.json are used, however when --env is specified project.ENV.json and function.ENV.json will be used, falling back on function.json for cases when staging and production config is the same. For example your directory structure may look something like the following:

```
project.stage.json
project.prod.json
functions
├── bar
│   ├── function.stage.json
│   ├── function.prod.json
│   └── index.js
└── foo
    ├── function.stage.json
    ├── function.prod.json
    └── index.js
```

If you prefer your "dev" or "staging" environment to be the implied default then leave the files as project.json and function.json:

```
project.json
project.prod.json
functions
├── bar
│   ├── function.json
│   ├── function.prod.json
│   └── index.js
└── foo
    ├── function.json
    ├── function.prod.json
    └── index.js
```

### Building a zip with dependencies for Lambda

Apex generates a zip file for you upon deploy, however sometimes it can be useful to see exactly what's included in this file for debugging purposes. The `apex build` command outputs the zip to STDOUT for this purpose.

#### Examples

Output zip to out.zip:

```sh
$ apex build foo > dist/out.zip
$ apex deploy foo --zip dist/foo.zip
```

OR

```sh
$ apex deploy foo -z dist/foo.zip
```

## Scheduling
Scheduleding a Lambda function must be down within the AWS interface. Login to view the function apex deployed via [console.aws.amazon.com](https://console.aws.amazon.com/lambda/home?region=us-east-1#/)

### Testing
Select "Scheduled Event" from the dropdown to simulate cron trigger a lambda function

### Triggering
Under the "Triggers" table, add a "CloudWatch Events - Schedule" trigger. If you have not set up a CloudWatch Event to trigger a lambda function, you may do so by [creating a CloudWatch Event rule](https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#rules:)

## Troubleshooting
`apex --help`

### Check the logs

`apex logs <function-name>`

Want to watch the logs live?

`apex logs <function-name> --follow`

OR

`apex logs <function-name> --f`

### Check the stats

`apex metrics`

Shows you:

* total cost ($USD)
* invocations (integer & $)
* duration (datetime & $)
* throttles (integer)
* errors (integer)
* memory (integer)

### Rollback to previous version

`apex rollback <function-name>`
