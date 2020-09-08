import { google } from 'googleapis';
import googleKeys from '../config/googleConfig';

const oAuthClient = new google.auth.OAuth2(googleKeys.clientId, googleKeys.clientSecret, googleKeys.redirect);

export default oAuthClient;
