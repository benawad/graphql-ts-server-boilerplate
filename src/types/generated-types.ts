/* tslint:disable */
import { GraphQLResolveInfo } from "graphql";

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<Result> | Result;

export type SubscriptionResolver<
  Result,
  Parent = any,
  Context = any,
  Args = any
> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): AsyncIterator<R | Result>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo
  ): R | Result | Promise<R | Result>;
};

export interface Query {
  me?: User | null;
}

export interface User {
  id: string;
  email: string;
}

export interface Mutation {
  sendForgotPasswordEmail?: (SendForgotPasswordEmailResult | null)[] | null;
  forgotPasswordChange?: Error[] | null;
  login?: Error[] | null;
  logout?: boolean | null;
  register?: Error[] | null;
}

export interface SendForgotPasswordEmailError {
  path?: string | null;
  message?: string | null;
}

export interface Error {
  path: string;
  message: string;
}
export interface SendForgotPasswordEmailMutationArgs {
  email: string;
}
export interface ForgotPasswordChangeMutationArgs {
  newPassword: string;
  key: string;
}
export interface LoginMutationArgs {
  email: string;
  password: string;
}
export interface RegisterMutationArgs {
  email: string;
  password: string;
}

export type SendForgotPasswordEmailResult =
  | Boolean
  | SendForgotPasswordEmailError;

export namespace QueryResolvers {
  export interface Resolvers<Context = any> {
    me?: MeResolver<User | null, any, Context>;
  }

  export type MeResolver<
    R = User | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = any> {
    id?: IdResolver<string, any, Context>;
    email?: EmailResolver<string, any, Context>;
  }

  export type IdResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type EmailResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = any> {
    sendForgotPasswordEmail?: SendForgotPasswordEmailResolver<
      (SendForgotPasswordEmailResult | null)[] | null,
      any,
      Context
    >;
    forgotPasswordChange?: ForgotPasswordChangeResolver<
      Error[] | null,
      any,
      Context
    >;
    login?: LoginResolver<Error[] | null, any, Context>;
    logout?: LogoutResolver<boolean | null, any, Context>;
    register?: RegisterResolver<Error[] | null, any, Context>;
  }

  export type SendForgotPasswordEmailResolver<
    R = (SendForgotPasswordEmailResult | null)[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, SendForgotPasswordEmailArgs>;
  export interface SendForgotPasswordEmailArgs {
    email: string;
  }

  export type ForgotPasswordChangeResolver<
    R = Error[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, ForgotPasswordChangeArgs>;
  export interface ForgotPasswordChangeArgs {
    newPassword: string;
    key: string;
  }

  export type LoginResolver<
    R = Error[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, LoginArgs>;
  export interface LoginArgs {
    email: string;
    password: string;
  }

  export type LogoutResolver<
    R = boolean | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type RegisterResolver<
    R = Error[] | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context, RegisterArgs>;
  export interface RegisterArgs {
    email: string;
    password: string;
  }
}

export namespace SendForgotPasswordEmailErrorResolvers {
  export interface Resolvers<Context = any> {
    path?: PathResolver<string | null, any, Context>;
    message?: MessageResolver<string | null, any, Context>;
  }

  export type PathResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
  export type MessageResolver<
    R = string | null,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}

export namespace ErrorResolvers {
  export interface Resolvers<Context = any> {
    path?: PathResolver<string, any, Context>;
    message?: MessageResolver<string, any, Context>;
  }

  export type PathResolver<R = string, Parent = any, Context = any> = Resolver<
    R,
    Parent,
    Context
  >;
  export type MessageResolver<
    R = string,
    Parent = any,
    Context = any
  > = Resolver<R, Parent, Context>;
}
