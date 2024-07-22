import dotenv from 'dotenv';
import app from "./app";
import configs from './app/configs';

dotenv.config();

const port = configs.port || 5000;


// run the server
app.listen(port, () => {
    console.log(`Barber Voyage server is running on port: ${port}`);
})