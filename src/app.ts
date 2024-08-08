import express, { Application, Request, Response } from 'express'
const app: Application = express()
import cors from 'cors';


// parser
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the ScholarQuest😎')
})

export default app;