import 'dotenv/config'
import env from 'env-var'

export class Env {
  static TOKEN = env.get('BOT_TOKEN').required().asString()
  // static ADMIN_IDS = env.get('ADMIN_IDS').required().asJsonArray() as Number[]
}
