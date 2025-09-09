export type StudentID = number
export type Student = {studentID: number, studentName: string}
export type CourseName = string
export type CourseGrade = {courseName:CourseName, grade:number}
export type Transcript = {student:Student, grades:CourseGrade[]}

// in-memory database (for demo)
let students: Student[] = []
let transcripts: Transcript[] = []
// initializes the database with 4 students,
// each with an empty transcript (handy for debugging)
export function initialize(){
    addStudent("Sardor")
    addStudent("Jasur")
    addStudent("Jasur")
    addStudent("Nigora")
    //each with empty transcript
    students.forEach(student => {
        transcripts.push({
            student: student,
            grades: []
        })
    })
}

// returns a list of all the transcripts.
// handy for debugging
export function getAll(){
    return transcripts
}

// creates an empty transcript for a student with this name,
// and returns a fresh ID number
export function addStudent(name:string) : StudentID {
    let newStudentID = students.length + 1
    let newStudent: Student = {studentID: newStudentID, studentName:name}
    students.push(newStudent)
    return newStudentID
}

// gets transcript for given ID.  Returns undefined if missing
export function getTranscript(studentID:number) : Transcript {
    throw "not implemented"
}

// returns list of studentIDs matching a given name
export function getStudentIDs(studentName:string) : StudentID[] {
    throw "not implemented"
}

