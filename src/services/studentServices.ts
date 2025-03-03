import axios from 'axios';
import { Student, IStudent } from '../models/studentModel';

class StudentService {
    private externalApiUrl = 'http://localhost:5000/api/students';

  // Fetch students from external API
  async fetchExternalStudents(): Promise<IStudent[]> {
    try {
      const response = await axios.get(this.externalApiUrl);
      return response.data;
    } catch (error) {
      console.error('Error fetching external students:', error);
      throw new Error('Failed to fetch students');
    }
  }

  // Fetch students from MongoDB
  async getAllStudents(): Promise<IStudent[]> {
    return await Student.find();
  }
}

export const studentService = new StudentService();
