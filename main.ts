import { Course } from './course.js';
import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';
import { dataStudent } from './dataStudent.js';


let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByCreditRange: HTMLElement = document.getElementById("button-filterByRange")!;
const minSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("min-box")!;
const maxSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("max-box")!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCreditRange.onclick = () => applyFilterByRange();

renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
 
function renderStudentInTable(student: Student): void {
  console.log('Desplegando estudiante');
  let name = document.getElementById('studentName')!;

  name.innerHTML = student.name;
    let headers = ["Código", "Cédula", "Edad", "Dirección", "Teléfono"]
    let values = [student.code, student.id, student.age, student.address, student.telephone];
    for (var i = 0; i<5; i++)
    {
        let trElement = document.createElement('tr');
        trElement.innerHTML = `<td>${headers[i]} </td>
                              <td>${values[i]}</td>`;
        studentTbody.appendChild(trElement);
    }
  ;
}


function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}

function applyFilterByRange() { 
  let minText = minSearchBox.value;
  let maxText = maxSearchBox.value;
 
  if (minText!=null && maxText!=null){
    let min = Number(minText);
    let max = Number(maxText);
    clearCoursesInTable();
    let coursesFiltered: Course[] = searchCourseByRange(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
  }
  
}

function searchCourseByRange(min: number, max: number, courses: Course[]) {
    return courses.filter( c => 
      c.credits>=min && c.credits<=max);
  
}