export type StudentID = number
export type Student = { studentID: number, studentName: string }
export type CourseName = string
export type CourseGrade = { courseName: CourseName, grade: number }
export type Transcript = { student: Student, grades: CourseGrade[] }

// in-memory database (for demo)
let students: Student[] = []
let transcripts: Transcript[] = []
// initializes the database with 4 students,
// each with an empty transcript (handy for debugging)
export function initialize() {
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
export function getAll() {
    return transcripts
}

// creates an empty transcript for a student with this name,
// and returns a fresh ID number
export function addStudent(name: string): Student {
    let newStudentID = students.length + 1
    let newStudent: Student = {studentID: newStudentID, studentName: name}
    students.push(newStudent)
    return newStudent
}

// gets transcript for given ID.  Returns undefined if missing
export function getTranscript(studentID: number): Transcript | undefined {
    const transcript = transcripts.find(t => t.student.studentID === studentID);
    if (!transcript) return undefined;
    return {student: transcript.student, grades: transcript.grades};
}

//add new transcripts with empty grades
export function addTranscript(student:Student){
    transcripts.push({
        student:student,
        grades: []
    })
}

// returns list of studentIDs matching a given name,case not specific
export function getStudentIDs(studentName: string): StudentID[] {
    return students.filter(s => s.studentName.toLowerCase() === studentName.toLowerCase()).map(s => s.studentID)
}
//delete transcript using student id
export function delTranscriptWithStudentId(id: number):boolean {
    //find transcript
    const index = transcripts.findIndex(t => t.student.studentID === id);
    if (index !== -1) {
        transcripts.splice(index, 1);//delete transcript
        return true;
    } else{
        return false;
    }
}

