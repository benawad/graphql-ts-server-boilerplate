import * as SparkPost from "sparkpost";
const client = new SparkPost(process.env.SPARKPOST_API_KEY);

export const sendEmail = async (recipient: string, url: string) => {
  const response = await client.transmissions.send({
    options: {
      sandbox: true
    },
    content: {
      from: "testing@sparkpostbox.com",
      subject: "Confirm Email",
      html: `<html>
        <body>
        <p>Testing SparkPost - the world's most awesomest email service!</p>
        <a href="${url}"><img src="${url}.jpg" width="200" height="50" alt="Click here to confirm" /></a>
        </body>
        </html>`
    },
    recipients: [{ address: recipient }]
  });
  console.log(response);
};
