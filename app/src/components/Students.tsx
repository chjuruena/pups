import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch('https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad');
      const data = await response.json();
      setStudents(data);
    };

    const fetchCourses = async () => {
      const response = await fetch('https://run.mocky.io/v3/34bdbb5f-70c0-41ce-aa0c-2bf46befa477');
      const data = await response.json();
      setCourses(data);
    };

    fetchStudents();
    fetchCourses();
  }, []);

  const headers = [
    { label: 'Profile Picture', key: 'profilePicture' },
    { label: 'Full Name', key: 'fullName' },
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Email', key: 'email' },
    { label: 'Major', key: 'major' },
    { label: 'Status', key: 'status' },
    { label: 'Total Course Count', key: 'totalCourseCount' },
  ];

  const sortTable = (key) => {
    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const sortedStudents = () => {
    let sorted = [...students];

    if (sortConfig.key !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return sorted;
  };

  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} onClick={() => sortTable(header.key)}>
                {header.label}
                {sortConfig.key === header.key && (
                  <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedStudents().map((student) => (
            <tr key={student.id}>
              <td>
                <img src={student.profilePicture} alt="Profile" width="50" height="50" />
              </td>
              <td>
                <Link to={`/students/${student.id}`}>{student.fullName}</Link>
              </td>
              <td>{student.phoneNumber}</td>
              <td>{student.email}</td>
              <
