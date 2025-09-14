//express server setup
import * as express from "express";
import * as db from './TranscriptManager'
import {Request, Response} from "express";
//create app
const app: express.Application = express();
db.initialize()//get data from database
//types of inputs
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//list method
app.get(
    '/transcripts',
    (req: Request, res: Response) => {
        res.status(200).send({"success": true, "transcripts": db.getAll()});
    }
)
//get specific transcript using id
app.get(
    '/transcripts/:id',
    (req: Request, res: Response) => {
        //search for transcript
        const id = parseInt(req.params.id);//get id from params
        const transcript = db.getTranscript(id);
        if (transcript) {
            res.status(200).send(transcript);
        } else {
            res.status(404).send("Transcript not Found");
        }
    }
)
//post transcript
app.post(
    '/transcripts/',
    (req: Request, res: Response) => {
        const studentName: string = req.body.studentName;
        let student = db.addStudent(studentName);
        db.addTranscript(student)
        res.status(201).send({"student":student,"grades":[]});
    }
)

//search students using name
app.get('/students', (req: Request, res: Response) => {
    const studentName:string = req.query.name as string;
    const ids = db.getStudentIDs(studentName)
    res.status(200).send(ids);
})

//delete transcript using id
app.delete('/transcripts/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        let result:boolean = db.delTranscriptWithStudentId(id)
        if (result) {
            res.status(204).send({"msg": "transcript deleted successfully"});
        } else{
            res.status(404).send("Transcript not Found");
        }
    } catch (error) {
        res.status(404).send(error.toString());
    }
})

// Catch-all route for any method and any path that wasn't matched earlier
app.use((req, res) => {
    console.log(defaultErrorMessage(req.method, req.originalUrl));
    res.sendStatus(404);
});


//error msg for routes that dont exist
function defaultErrorMessage (
    method: string,
    request: string
): string {
    return `unknown ${method} request "${request}"`
}

//start server
app.listen(8080, () => {
    console.log("Listening on 8080");
});