import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

const googleKeys = {
    clientId: process.env.google_client_id,
    clientSecret: process.env.google_client_secret,
    redirect: process.env.google_redirect_uri
}

export const oAuthClient = new google.auth.OAuth2(googleKeys.clientId, googleKeys.clientSecret, googleKeys.redirect);
