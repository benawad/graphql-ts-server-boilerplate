import { Resolver } from "../../../types/generated-types";
import { Context } from "../../../types/graphql-utils";

export default async <Result>(
  resolver: Resolver<Result, any, Context>,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  return resolver(parent, args, context, info);
};
