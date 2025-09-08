const courses = [
  { code: "CSE 110", name: "Intro to Programming", credits: 2, completed: true },
  { code: "WDD 130", name: "Web Fundamentals", credits: 2, completed: true },
  { code: "CSE 111", name: "Programming with Functions", credits: 2, completed: true },
  { code: "CSE 210", name: "Programming with Classes", credits: 2, completed: true },
  { code: "WDD 131", name: "Dynamic Web Fundamentals", credits: 2, completed: true },
  { code: "WDD 231", name: "Web Frontend Development I", credits: 2, completed: false }
];

const coursesContainer = document.getElementById("courses");
const totalCredits = document.getElementById("total-credits");

function displayCourses(list) {
  coursesContainer.innerHTML = "";
  let credits = 0;

  list.forEach(course => {
    const div = document.createElement("div");
    div.classList.add("course");
    if (course.completed) div.classList.add("completed");
    div.innerHTML = `<strong>${course.code}</strong>: ${course.name} (${course.credits} credits)`;
    coursesContainer.appendChild(div);
    credits += course.credits;
  });

  totalCredits.textContent = `The total credits for courses listed above is ${credits}.`;
}

document.getElementById("all-btn").addEventListener("click", () => displayCourses(courses));
document.getElementById("cse-btn").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("CSE"))));
document.getElementById("wdd-btn").addEventListener("click", () => displayCourses(courses.filter(c => c.code.startsWith("WDD"))));

// Initial load
displayCourses(courses);
