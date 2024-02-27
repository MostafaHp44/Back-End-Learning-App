
const StudentModel=require('../Models/StudentModel')
const ParentModel=require('../Models/ParentModel')
const TeacherModel=require('../Models/TeacherModel')
const AdminModel=require('../Models/AdminModel')
const CourseModel=require('../Models/CourseModel')
const AttendanceModel =require('../Models/AttendanceModel')
const AssignmentModel =require('../Models/AssignmentModel')
const ExamsModel=require('../Models/ExamsModel')
const ReslutsModel =require('../Models/ResultsModel')
const bcrypt = require('bcrypt');
const twilio = require('twilio');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


// Nodemailer setup
const emailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const phoneNumber = '+1234567890'; // Replace with the recipient's phone number
const mail = 'recipient@example.com'; // Replace with the recipient's email

const smsMessage = 'Download our educational app!';
const emailSubject = 'Download Our Educational App';
const emailMessage = 'Dear user, please download our educational app.';


const Teacher_registration= async(req,res)=>{

    const { firstname,lastname, email, phone, password,subjects} = req.body;
    const existingUser = await TeacherModel.findOne({$or: [{ email }, { phoneNumber }],
    });
  
    if (existingUser) {
      return res.send('Teacher with provided details already exists.').status(409);
    }

    let userType = 'teacher'; // Default type for registration
  
   
  

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const NewTeacher = new TeacherModel({
      firstname,
      lastname,
      email,
      phone,
      subjects,
      password: hashedPassword,
      typeacc: userType,
    });
  
    await NewTeacher.save();
    res.send(` ${NewTeacher.typeacc} Account Created Successfully `).status(201);
  
}

const Student_registration=async(req,res)=>{
  const { firstname,lastname ,middelname,level,email, PhoneNumber, ParentNumber, password,gender} = req.body;

  const existingUser = await StudentModel.findOne({$or: [{ email }, { PhoneNumber }, { ParentNumber }],
  });

  if (existingUser) {
    return res.send('Student with provided details already exists.').status(409);
  }

  let userType = 'Student'; // Default type for registration



    const hashedPassword = await bcrypt.hash(password, 10);
  
    const NewStudent = new StudentModel({
      firstname,
      lastname,
      middelname,
      level,
      email,
      PhoneNumber,
      ParentNumber,
      gender,
      password: hashedPassword,
      typeacc:userType
    });
    await NewStudent.save();
    res.send(`${NewStudent.typeacc} Account Created Successfully `).status(201);
}

const Admin_registration=async(req,res)=>{
  const { name, email, password } = req.body;

  let userType = 'Admin'; 


  const existingAdmin = await AdminModel.findOne({ email });

  if (existingAdmin) {
    return res.status(409).json({ error: 'Admin with provided email already exists.' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const NewAdmin = new AdminModel({
    name,
    email,
    password: hashedPassword,
    typeacc:userType
  });

  await NewAdmin.save();
  res.send(` Hello , We Have A new ${NewAdmin.typeacc} Here !! `).status(201);

}

const Parent_registration= async(req,res)=>{

  const { firstname,lastname, email, PhoneNumber, password,gender} = req.body;
  const existingParent = await ParentModel.findOne({$or: [{ email }, { phoneNumber }],
  });

  if (existingParent) {
    return res.send('parent with provided details already exists.').status(409);
  }

  let userType = 'parent'; // Default type for registration

 


  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const NewParent = new ParentModel({
    firstname,
    lastname,
    email,
    PhoneNumber,
    gender,
    password: hashedPassword,
    typeacc: userType,
  });

  await NewParent.save();
  res.send(` ${NewParent.typeacc} Account Created Successfully `).status(201);

}


const Login=async(req,res)=>{

  const { firstname,lastname, email, phone, guardianNumber, password,subjects} = req.body;

  
  const admin = await AdminModel.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const token = jwt.sign({ email: admin.email, userType: 'admin' }, process.env.JWT_SECRET);
    res.header('Authorization',token)
    res.send(`Welcome ${admin.name}  your mail is ${admin.email} you are a  New ${admin.typeacc}`)


  }

  // Check if the user is a Student
  const student = await StudentModel.findOne({ email });
  if (student && (await bcrypt.compare(password, student.password))) {
    const token = jwt.sign({ email: student.email, userType: 'student' }, process.env.JWT_SECRET,{ expiresIn: '1h' });
    res.header('Authorization',token)
    res.send(`Welcome ${student.firstname} ${student.lastname} you are a  New ${student.typeacc}`)

  }
  // Check if the user is a Teacher
  const teacher = await TeacherModel.findOne({ email });
  if (teacher && (await bcrypt.compare(password, teacher.password))) {
    const token = jwt.sign({ email: teacher.email, userType: 'teacher' }, process.env.JWT_SECRET);
    res.header('Authorization',token)
    res.send(`Welcome ${teacher.firstname} ${teacher.lastname} you are a  New ${teacher.typeacc}`)

  }
  
  // If no matching user is found, return an error
  res.status(401).json({ error: 'Invalid credentials' });

    
  
}

const Logout= async (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('Error during logout');
    } else {
      res.send('Logout successful');
    }
  });
};


const add_student=async(req,res)=>{
  const { name, email, phoneNumber, guardianNumber, password } = req.body;

  const existingStudent = await StudentModel.findOne({ email });

  if (existingStudent) {
    return res.status(409).json({ error: 'Student with provided email already exists.' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const student = new StudentModel({
    name,
    email,
    phoneNumber,
    guardianNumber,
    password: hashedPassword,
  });

  await student.save();
  res.sendStatus(201);

}

const add_teacher=async(req,res)=>{
  const { name, email, phoneNumber, subjects, password } = req.body;

  const existingTeacher = await TeacherModel.findOne({ email });

  if (existingTeacher) {
    return res.status(409).json({ error: 'Teacher with provided email already exists.' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const teacher = new TeacherModel({
    name,
    email,
    phoneNumber,
    subjects,
    password: hashedPassword,
  });

  await teacher.save();
  res.sendStatus(201);

}

const add_parent=async(req,res)=>{
  const { firstname,lastname, email, gender,phoneNumber, password } = req.body;

  const existingParent = await ParentModel.findOne({ email });

  if (existingParent) {
    return res.status(409).json({ error: 'Teacher with provided email already exists.' });
  }

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  const Parent = new ParentModel({
    firstname,
    lastname,
    email,
    phoneNumber,
    gender,
    password: hashedPassword,
  });

  await Parent.save();
  res.sendStatus(201);

}

const add_course=async(req,res)=>{

  const { CourseName, CourseCode, CourseInstructor ,Description} = req.body;

  const existingCourse = await CourseModel.findOne({ CourseName });

  if (existingCourse) {
    return res.status(409).json({ error: 'Course with provided name already exists.' });
  }

  const course = new CourseModel({
    CourseName,
    CourseCode,
    CourseInstructor,
    Description,
  });

  await course.save();
  res.sendStatus(201);

}

const delete_student=async (req,res)=>{

  const { _id } = req.body;

  try {
    await StudentModel.findByIdAndDelete(_id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting student:', error.message);
    res.sendStatus(500);
  }

}

const delete_teacher=async(req,res)=>{
  const { _id } = req.body;

  try {
    await TeacherModel.findByIdAndDelete(_id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting teacher:', error.message);
    res.sendStatus(500);
  }

}



const delete_parent=async(req,res)=>{
  const { _id } = req.body;

  try {
    await ParentModel.findByIdAndDelete(_id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting teacher:', error.message);
    res.sendStatus(500);
  }

}


const delete_course=async(req,res)=>{

  const { _id } = req.body;

  try {
    await CourseModel.findByIdAndDelete(_id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting course:', error.message);
    res.sendStatus(500);
  }

}

const Student_Add_Course=async (req,res)=>{
  const { CourseCode } = req.body;
  

  try {
    // Check if the course exists
    const course = await CourseModel.findById(CourseCode);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Get the student ID from the authenticated user
  const studentId = req.user.userId;  // Adjust the field based on your actual token payload
  console.log('Student ID:', studentId);
    
    // Update the student's courses array
    await StudentModel.findByIdAndUpdate(studentId, { $push: { courses: CourseCode,} });


    res.send(`Course Added ${studentId}`).status(200);
  } catch (error) {
    console.error('Error adding course for the student:', error.message);
    res.sendStatus(500);
  }

}


const SendMessagesSMS= async(phoneNumber, message)=>{
  try {
    await twilioClient.messages.create({
      body: "Download our educational app",
      from: "//Admin mail ",
      to: phoneNumber,
    });
    console.log('SMS sent successfully.');
  } catch (error) {
    console.error('Error sending SMS:', error.message);
  }

}

const SendMessagesEmail=async(email, subject, message)=>{
  try {
    await emailTransporter.sendMail({
      from: 'your-email@gmail.com',
      to: email,
      subject: subject,
      text: message,
    });
    console.log('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error.message);
  }

}

const student_information=async(req,res)=>{
  const _id = req.params.id;

  try {
    const student = await StudentModel.findById(_id);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching student information:', error.message);
    res.sendStatus(500);
  }

  

}

const teacher_information=async(req,res)=>{
  const _id = req.params.id;

  try {
    const student = await TeacherModel.findById(_id);

    if (!student) {
      return res.status(404).json({ error: 'teacher not found' });
    }

    res.json(student);
  } catch (error) {
    console.error('Error fetching Teacher information:', error.message);
    res.sendStatus(500);
  }
}

const Record_Attend=async(req,res)=>{
  try {
    // Assuming the request body contains student ID, subject, and attendance status
    const { studentId, subject, } = req.body;

    // Update the attendance for the student
    const student = await StudentModel.findById(studentId);
    

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const NewStudent_Attendance = new AttendanceModel({
      studentfirstname:student.firstname ,
      studentlastname:student.lastname ,
      date:new Date().toLocaleDateString(),
      attended: true ,
      subject:subject
    });

    await NewStudent_Attendance.save();

    
    student.attendance.push([NewStudent_Attendance]);

    await student.save()

    res.status(200).json({ message: ` ${student.firstname } has Attendance  successfully in ${subject}` });
  } catch (error) {
    console.error('Error recording attendance:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

 const Get_Attend=async(req,res)=>{
  try {
    const studentId = req.params.studentId;
    const student = await AttendanceModel.findById(studentId);

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: ` ${student.studentfirstname } has Attendance  today  ` });
  } 
  catch (error) {
    console.error('Error retrieving attendance records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }

 }

module.exports={Teacher_registration,Parent_registration,Student_registration,Login,Logout,SendMessagesSMS,SendMessagesEmail,teacher_information,student_information,Admin_registration, add_student,add_teacher,add_course,delete_course,delete_student,delete_teacher,Student_Add_Course,Record_Attend,Get_Attend,add_parent,delete_parent}
