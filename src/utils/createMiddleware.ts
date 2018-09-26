import { GraphQLMiddlewareFunc, Context } from "../types/graphql-utils";
import { Resolver } from "../types/generated-types";

export const createMiddleware = <Result>(
  middlewareFunc: GraphQLMiddlewareFunc<Result>,
  resolverFunc: Resolver<Result, any, Context>
) => (parent: any, args: any, context: any, info: any) =>
  middlewareFunc(resolverFunc, parent, args, context, info);
