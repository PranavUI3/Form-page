const details = document.querySelector('.details');
const generate = document.getElementById('generate');

const fetchapi = async () =>
{
    try {
        const api = await fetch('http://localhost:3000/students/data')
        const data = await api.json();
        data.forEach(student =>
        {
            details.innerHTML += `
            <div class="card">
            <h2>${student.name}</h2>
            <p>Email:${student.email}</p>
            <p>Rollno:${student.rollno}</p>
            </div>`
        });
    } catch (error) {
        console.log(error);
    }
}