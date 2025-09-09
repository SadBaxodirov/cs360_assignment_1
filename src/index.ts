//express server setup
import * as express from "express";
import * as db from './TranscriptManager'
import {Request, Response} from "express";

const app: express.Application = express();
db.initialize()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.get(
    '/transcripts',
    (req: Request, res: Response) => {
        let studentId: db.StudentID = parseInt(req.body.studentID as string);
        console.log("student id is ", studentId);
        res.status(200).send({"success":true,"transcripts":db.getAll()});
    }
)
app.listen(8080,()=>{
    console.log("Listening on 8080");
});