"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getStudents = void 0;
const studentModel_1 = require("../models/studentModel");
const studentServices_1 = require("../services/studentServices");
// Get All Students
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield studentServices_1.studentService.getAllStudents();
        res.json(students);
    }
    catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});
exports.getStudents = getStudents;
// Get Single Student
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield studentModel_1.Student.findById(req.params.id);
        if (!student)
            res.status(404).json({ message: "Student not found" });
        return;
        res.json(student);
    }
    catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
});
exports.getStudentById = getStudentById;
// Create a Student
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, email, course } = req.body;
        const newStudent = new studentModel_1.Student({ name, age, email, course });
        yield newStudent.save();
        res.status(201).json(newStudent);
    }
    catch (err) {
        res.status(400).json({ error: "Error creating student" });
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedStudent = yield studentModel_1.Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(200).json(updatedStudent);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating student' });
    }
});
exports.updateStudent = updateStudent;
// Delete Student
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedStudent = yield studentModel_1.Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting student' });
    }
});
exports.deleteStudent = deleteStudent;
