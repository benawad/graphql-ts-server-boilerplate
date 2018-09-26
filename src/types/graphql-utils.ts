import { Redis } from "ioredis";
import { Resolver, QueryResolvers, MutationResolvers } from "./generated-types";

export interface Session extends Express.Session {
  userId?: string;
}

export interface Context {
  redis: Redis;
  url: string;
  session: Session;
  req: Express.Request;
}

export type GraphQLMiddlewareFunc<Result> = (
  resolver: Resolver<Result, any, Context>,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  Query?: QueryResolvers.Resolvers<Context>,
  Mutation?: MutationResolvers.Resolvers<Context>
}