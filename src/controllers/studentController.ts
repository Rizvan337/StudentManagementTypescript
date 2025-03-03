import { Request, Response } from 'express';
import { Student } from '../models/studentModel';

// Get All Students
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Get Single Student
export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)  res.status(404).json({ message: "Student not found" });
    return
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

// Create a Student
export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, age, email, course } = req.body;
    const newStudent = new Student({ name, age, email, course });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: "Error creating student" });
  }
};

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!updatedStudent) {
        res.status(404).json({ message: 'Student not found' });
        return; 
      }
  
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ error: 'Error updating student' });
    }
  };

// Delete Student
export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedStudent = await Student.findByIdAndDelete(req.params.id);
  
      if (!deletedStudent) {
        res.status(404).json({ message: 'Student not found' });
        return; 
      }
  
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting student' });
    }
  };
