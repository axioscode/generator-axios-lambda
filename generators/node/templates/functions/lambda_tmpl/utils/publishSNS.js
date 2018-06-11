const SNS = require("aws-sdk/clients/sns");

module.exports = async ({
  jsonMsg,
  topicArn,
  summaryStr="SNS summary"
}) => {
  console.log("Publishing SNS");
  const params = {
    TopicArn: topicArn,
    Message: JSON.stringify(jsonMsg),
    MessageStructure: "string",
    MessageAttributes: {
      "summary": {
          StringValue: summaryStr,
          DataType: "String"
        }
    }
  };
  const sns = new SNS();
  let data;
  try {
    data = await sns.publish(params);
  } catch (error) {
    console.error("Error publishing SNS");
    console.error(error);
  }
  return data;
}
