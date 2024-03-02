import dotenv from 'dotenv';
import app from "./app";

dotenv.config();

const port = process.env.PORT || 7000;


// run the server
app.listen(port, () => {
    console.log(`Barber Voyage server is running on port: ${port}`);
})