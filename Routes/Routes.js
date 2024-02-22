const express= require('express')
const routess =express.Router()
const controler=require('../Controller/Controller')
const MiddelWare=require('../MiddelWare/middelware')


routess.post('/register/teacher', controler.Teacher_registration)

routess.post('/register/student', controler.Student_registration)

routess.post('/register/admin',controler.Admin_registration)

routess.post('/login',controler.Login)

routess.post('./logout',controler.Logout)

routess.post('/admin/add-student', controler.add_student)

routess.post('/admin/add-teacher',controler.add_teacher)

routess.post('/admin/add-course',controler.add_course)

routess.post('/admin/delete-student',controler.delete_student)

routess.post('/admin/delete-teacher',controler.delete_teacher)

routess.post('/admin/delete-course',controler.delete_course)

routess.post('/student/add/course', MiddelWare.authenticateToken , controler.Student_Add_Course)

routess.get('/teacher/:id', controler.teacher_information)

routess.get('/student/:id',controler.student_information)

routess.post('/record-attendance',controler.Record_Attend)


routess.get('/attendance/:studentId',controler.Get_Attend)


module.exports=routess
