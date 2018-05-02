import {request} from "graphql-request";
import {startServer} from "../../startServer";
import {User} from "../../entity/User";
import {
  duplicateEmail,
  emailNotLongEnough,
  invalidEmail,
  passwordNotLongEnough
} from "./errorMessages";

let getHost = () => "";

beforeAll(async () => {
  const app = await startServer();
  const {port} = app.address();
  getHost = () => `http://127.0.0.1:${port}`;
});

const email = "tom@bob.com";
const password = "jalksdf";

const mutation = (e: string, p: string) => `
mutation {
  register(email: "${e}", password: "${p}") {
    path
    message
  }
}
`;

describe("A register mutation", async () => {
  it("should register a valid user", async () => {
    console.log(getHost());
    const response = await request(getHost(), mutation(email, password));
    expect(response).toEqual({register: null});

    const users = await User.find({where: {email}});
    expect(users).toHaveLength(1);
    expect(users[0].email).toEqual(email);
    expect(users[0].password).not.toEqual(password);
  });

  it("should not register a duplicate user", async () => {
    const response: any = await request(getHost(), mutation(email, password));
    expect(response.register).toHaveLength(1);
    expect(response.register[0].path).toEqual("email");
    expect(response.register[0].message).toEqual(duplicateEmail);
  });

  it("should not register a user with an invalid email", async () => {
    const response: any = await request(getHost(), mutation("a", password));
    expect(response.register).toHaveLength(2);

    expect(response.register).toEqual([{
        "message": emailNotLongEnough,
        "path": "email"
      }, {
        "message": invalidEmail,
        "path": "email"
      }]
    )
  });

  it("should not register a user with an invalid password", async () => {
    const response: any = await request(getHost(), mutation(email, "a"));
    expect(response.register).toHaveLength(1);

    expect(response.register).toEqual([{
        "message": passwordNotLongEnough,
        "path": "password"
      }]
    )
  });

  it("should not register a user with an invalid password and invalid email", async () => {
    const response: any = await request(getHost(), mutation("a", "a"));
    expect(response.register).toHaveLength(3);

    expect(response.register).toEqual([{
        "message": emailNotLongEnough,
        "path": "email"
      }, {
        "message": invalidEmail,
        "path": "email"
      }, {
        "message": passwordNotLongEnough,
        "path": "password"
      },]
    )
  });
});
