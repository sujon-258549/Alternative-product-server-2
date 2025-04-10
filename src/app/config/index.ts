import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  ACCESS_EXPIRE_IN: process.env.ACCESS_EXPIRE_IN,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_EXPIRE_IN: process.env.REFRESH_EXPIRE_IN,
  RESET_UI_LINK: process.env.RESET_UI_LINK,
  STORE_ID: process.env.STORE_ID,
  STORE_PASSWORD: process.env.STORE_PASSWORD,
  SUCCESS_URL: process.env.SUCCESS_URL,
  FAIL_URL: process.env.FAIL_URL,
  CANCEL_URL: process.env.CANCEL_URL,
  VALIDATION_URL: process.env.VALIDATION_URL,
};
