import { ResolverMap } from "../../types/graphql-utils";
import { userSessionIdPrefix, redisSessionPrefix } from "../../constants";

export const resolvers: ResolverMap = {
  Query: {
    dummy: () => "dummy"
  },
  Mutation: {
    logout: async (_, __, { session, redis }) => {
      const { userId } = session;
      if (userId) {
        const sessionIds = await redis.lrange(
          `${userSessionIdPrefix}${userId}`,
          0,
          -1
        );

        const promises = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < sessionIds.length; i += 1) {
          promises.push(redis.del(`${redisSessionPrefix}${sessionIds[i]}`));
        }
        await Promise.all(promises);
        return true;
      }

      return false;
    }
  }
};
