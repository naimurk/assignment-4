import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });



export default {
    PORT: process.env.PORT,
    DB: process.env.DB_URL,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    default_password: process.env.default_password,
    jwt_access_secret: process.env.jwt_access_secret,
    jwt_access_expires_in: process.env.jwt_access_expires_in 
 
    
}