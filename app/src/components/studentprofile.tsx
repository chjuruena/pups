import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const StudentProfile = ({ match }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      const studentId = match.params.id;
      const response = await fetch(`https://run.mocky.io/v3/214aef9d-b18a-4188-b55f-a25046408a7e?id=${studentId}`);
      const data = await response.json();
      setStudent(data);
    };

    fetchStudent();
  }, [match.params.id]);

  if (!student) {
    return <div>Loading...</div>;
  }

  const { profilePicture, fullName, nickname, major, year, status, courses } = student;

  const sortedCourses = [...courses].sort((a, b) => a.semesterCode.localeCompare(b.semesterCode));
  const filteredCourses = sortedCourses.filter((course, index, courses) => {
    const isDuplicate = index > 0 && course.courseSelection === courses[index - 1].courseSelection && course.semesterCode === courses[index - 1].semesterCode;
    return !isDuplicate;
  });

  const getStatusValue = (statusDate) => {
    const statusValueChart = {
      "2022-01-01": "Prospective",
      "2022-02-01": "Enrolled",
      "2022-03-01": "On Leave",
      "2022-04-01": "Graduated",
    };

    const latestStatusDate = Object.keys(statusValueChart).sort().reverse().find(date => date <= statusDate);
    return statusValueChart[latestStatusDate];
  }

  return (
    <div>
      <h1>{fullName}{nickname && ` (${nickname})`}</h1>
      <img src={profilePicture} alt={fullName} />
      <p>Major: {major}</p>
      <p>Year: {year}</p>
      <p>Status: {getStatusValue(status[status.length - 1].date)}</p>
      <table>
        <thead>
          <tr>
            <th>Semester Code</th>
            <th>Course Name</th>
            <th>Course Selection</th>
            <th>Course Fee</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course) => (
            <tr key={`${course.semesterCode}-${course.courseSelection}`}>
              <td>{course.semesterCode}</td>
              <td>{course.courseName}</td>
              <td>{course.courseSelection}</td>
              <td>{course.courseFee}</td>
            </tr>
          ))}
        </
