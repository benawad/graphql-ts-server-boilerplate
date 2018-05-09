import axios from "axios";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";
import { Connection } from "typeorm";

let userId: string;
let conn: Connection;
const email = "bob5@bob.com";
const password = "jlkajoioiqwe";

beforeAll(async () => {
  conn = await createTypeormConn();
  const user = await User.create({
    email,
    password,
    confirmed: true
  }).save();
  userId = user.id;
});

afterAll(async () => {
  conn.close();
});

const loginMutation = (e: string, p: string) => `
mutation {
  login(email: "${e}", password: "${p}") {
    path
    message
  }
}
`;

const meQuery = `
{
  me {
    id
    email
  }
}
`;

describe("me", () => {
  // test("can't get user if not logged in", async () => {
  // later
  // });

  test("get current user", async () => {
    await axios.post(
      process.env.TEST_HOST as string,
      {
        query: loginMutation(email, password)
      },
      {
        withCredentials: true
      }
    );

    const response = await axios.post(
      process.env.TEST_HOST as string,
      {
        query: meQuery
      },
      {
        withCredentials: true
      }
    );

    expect(response.data.data).toEqual({
      me: {
        id: userId,
        email
      }
    });
  });
});
