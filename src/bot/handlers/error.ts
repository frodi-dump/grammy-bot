import type { MyContext } from "bot/context";
import { getUpdateInfo } from "bot/helpers";
import type { ErrorHandler } from "grammy";

export const errorHandler: ErrorHandler<MyContext> = (error) => {
  const { ctx } = error;

  ctx.logger.error({
    err: error.error,
    update: getUpdateInfo(ctx),
  });
};
