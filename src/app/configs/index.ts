import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.join((process.cwd(), '.env')) });


export default {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DB_URI,
    jwt_token: process.env.JWT_TOKEN,
    local_client_url: process.env.LOCAL_CLIENT_URL,
    live_client_url: process.env.LIVE_CLIENT_URL,
    local_server_url: process.env.LOCAL_SERVER_URL,
    live_server_url: process.env.LIVE_SERVER_URL,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_session_secret: process.env.GOOGLE_SESSION_SECRET
}