import { type Api, Context, type SessionFlavor } from 'grammy';
import type { Update, UserFromGetMe } from 'grammy/types';
import type { Logger } from 'logger';

export type SessionData = {
  // field?: string;
};

type ExtendedContextFlavor = {
  logger: Logger;
};

export type MyContext = Context & SessionFlavor<SessionData> & ExtendedContextFlavor;

interface Dependencies {
  logger: Logger;
}

export function createContextConstructor({ logger }: Dependencies) {
  return class extends Context implements ExtendedContextFlavor {
    logger: Logger;

    constructor(update: Update, api: Api, me: UserFromGetMe) {
      super(update, api, me);

      this.logger = logger.child({
        update_id: this.update.update_id,
      });
    }
  } as unknown as new (
    update: Update,
    api: Api,
    me: UserFromGetMe,
  ) => MyContext;
}
