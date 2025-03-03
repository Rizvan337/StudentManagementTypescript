document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const studentList = document.getElementById('studentList');
    const submitButton = document.querySelector('#studentForm button');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');
    let editingStudentId = null; 
    let currentPage = 1;
    const studentsPerPage = 3;

    // Fetch and display students with pagination
    async function fetchStudents() {
        const response = await fetch('/students');
        const students = await response.json();
        displayStudents(students);
    }

    function displayStudents(students) {
        studentList.innerHTML = '';
        const start = (currentPage - 1) * studentsPerPage;
        const paginatedStudents = students.slice(start, start + studentsPerPage);

        paginatedStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent('${student._id}', '${student.name}', '${student.age}', '${student.email}', '${student.course}')">✏️ Edit</button>
                    <button class="delete-btn" onclick="confirmDelete('${student._id}')">❌ Delete</button>
                </td>
            `;
            studentList.appendChild(row);
        });

        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(students.length / studentsPerPage)}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage >= Math.ceil(students.length / studentsPerPage);
    }

    // Pagination controls
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchStudents();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        currentPage++;
        fetchStudents();
    });

    // Add or Update Student
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const studentData = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            email: document.getElementById('email').value,
            course: document.getElementById('course').value
        };

        if (editingStudentId) {
            await fetch(`/students/${editingStudentId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
            editingStudentId = null;
            submitButton.textContent = "Add Student"; 
        } else {
            await fetch('/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(studentData)
            });
        }

        form.reset();
        fetchStudents();
    });

    // Edit Student
    window.editStudent = (id, name, age, email, course) => {
        document.getElementById('name').value = name;
        document.getElementById('age').value = age;
        document.getElementById('email').value = email;
        document.getElementById('course').value = course;
        editingStudentId = id;
        submitButton.textContent = "Update Student"; 
    };

    // Confirm & Delete Student
    window.confirmDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            await fetch(`/students/${id}`, { method: 'DELETE' });
            Swal.fire("Deleted!", "The student has been removed.", "success");
            fetchStudents();
        }
    };

    fetchStudents();
});
