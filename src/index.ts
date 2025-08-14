import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import StatusCodes from 'http-status-codes';

import router from './routes';
import { corsOptions } from './utils/corsOptionsUtils';

dotenv.config();
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`ISCO JOB BOARD SYSTEM SERVER IS RUNNING ON PORT ${PORT}`);
});

app.get('**', (req, res) => {
  res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'WELCOME TO THE ISCO JOB BOARD SYSTEM SERVER.' });
});

export default app;
