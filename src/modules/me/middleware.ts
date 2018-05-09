import { Resolver } from "../../types/graphql-utils";

export default async (
  resolver: Resolver,
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // middleware
  const result = await resolver(parent, args, context, info);
  // afterware

  return result;
};
