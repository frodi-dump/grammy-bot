import type { Middleware } from "grammy";
import type { Update } from "@grammyjs/types";
import type { MyContext } from "bot/context";

export function getUpdateInfo(ctx: MyContext): Omit<Update, "update_id"> {
  // eslint-disable-next-line camelcase, @typescript-eslint/no-unused-vars
  const { update_id, ...update } = ctx.update;

  return update;
}

export function logHandle(id: string): Middleware<MyContext> {
  return (ctx, next) => {
    ctx.logger.info({
      msg: `handle ${id}`,
      ...(id.startsWith("unhandled") ? { update: getUpdateInfo(ctx) } : {}),
    });

    return next();
  };
}
