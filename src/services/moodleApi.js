// src/services/moodleApi.js
const BASE_URL = "http://localhost/webservice/rest/server.php";
const TOKEN = "90cc2c96e40135f0678108455c344664";
const FORMAT = "json";

export async function getCourses() {
  const url = `${BASE_URL}?wstoken=${TOKEN}&wsfunction=core_course_search_courses&moodlewsrestformat=json&criterianame=search&criteriavalue=`;

  const response = await fetch(url);
  const data = await response.json();

  // Zwracamy tylko listę kursów
  return data.courses;
}