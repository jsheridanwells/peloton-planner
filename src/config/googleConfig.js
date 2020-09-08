import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export default {
    clientId: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    redirect: process.env.google_redirect_uri
}
