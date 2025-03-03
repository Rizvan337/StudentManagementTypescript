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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentService = void 0;
const axios_1 = __importDefault(require("axios"));
const studentModel_1 = require("../models/studentModel");
class StudentService {
    constructor() {
        this.externalApiUrl = 'http://localhost:5000/api/students';
    }
    // Fetch students from external API
    fetchExternalStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(this.externalApiUrl);
                return response.data;
            }
            catch (error) {
                console.error('Error fetching external students:', error);
                throw new Error('Failed to fetch students');
            }
        });
    }
    // Fetch students from MongoDB
    getAllStudents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield studentModel_1.Student.find();
        });
    }
}
exports.studentService = new StudentService();
