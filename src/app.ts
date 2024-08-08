import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';


// parser
app.use(cors());
app.use(express.json());

// routing
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the ScholarQuest😎')
})

// global error handler
app.use(globalErrorHandler);

export default app;