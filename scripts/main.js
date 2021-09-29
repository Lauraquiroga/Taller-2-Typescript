import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var studentTbody = document.getElementById('student');
var btnfilterByCreditRange = document.getElementById("button-filterByRange");
var minSearchBox = document.getElementById("min-box");
var maxSearchBox = document.getElementById("max-box");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCreditRange.onclick = function () { return applyFilterByRange(); };
renderStudentInTable(dataStudent);
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    console.log('Desplegando estudiante');
    var name = document.getElementById('studentName');
    name.innerHTML = student.name;
    var headers = ["Código", "Cédula", "Edad", "Dirección", "Teléfono"];
    var values = [student.code, student.id, student.age, student.address, student.telephone];
    for (var i = 0; i < 5; i++) {
        var trElement = document.createElement('tr');
        trElement.innerHTML = "<td>" + headers[i] + " </td>\n                              <td>" + values[i] + "</td>";
        studentTbody.appendChild(trElement);
    }
    ;
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
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
    var minText = minSearchBox.value;
    var maxText = maxSearchBox.value;
    if (minText != null && maxText != null) {
        var min = Number(minText);
        var max = Number(maxText);
        clearCoursesInTable();
        var coursesFiltered = searchCourseByRange(min, max, dataCourses);
        renderCoursesInTable(coursesFiltered);
    }
}
function searchCourseByRange(min, max, courses) {
    return courses.filter(function (c) {
        return c.credits >= min && c.credits <= max;
    });
}
