import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [studentsProfile, setstudentsProfile] = useState([]);
  // const [images, setImages] = useState([]);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const images = [];
  for (let i = 1; i <= 20; i++) {
    images.push(`user_${i}`);
  }

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(
        'https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad',
      );
      const data = await response.json();
      setStudents(data);
    };

    const fetchCourses = async () => {
      const response = await fetch(
        'https://run.mocky.io/v3/34bdbb5f-70c0-41ce-aa0c-2bf46befa477',
      );
      const data = await response.json();
      // data.forEach((course: any) => {
      //   course.user_id = parseInt(course.user_id.replace('user_', ''));
      // });
      setCourses(data);
    };
    const fetchProfile = async () => {
      const response = await fetch(
        'https://run.mocky.io/v3/214aef9d-b18a-4188-b55f-a25046408a7e',
      );
      const data = await response.json();
      setstudentsProfile(data);
    };
    fetchCourses();
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(
        'https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad',
      );

      const data = await response.json();
      // Manipulate the student data to add major, total course, and status
      const newData = data.map((student, index) => {
        const studentCourses = courses.filter((course) => {
          const userId = parseInt(course.user_id.replace('user_', '')); // Manipulate the user_id by removing the "user_" prefix
          return userId === student.id; // Filter by the manipulated user_id
        });

        const { major, status } = studentsProfile
          .filter(
            (profile) =>
              parseInt(profile.user_id.replace('user_', '')) === student.id,
          )
          .find((profile) => profile.major) || {
          major: '',
          status: '',
        };

        const processStatus = () => {
          const getTypeString = (type) => {
            switch (type) {
              case 1:
                return 'good';
              case 2:
                return 'probation';
              case 3:
                return 'inactive';
              default:
                return 'Withdrawn';
            }
          };

          const stat =
            status.length > 0
              ? status.sort((a, b) => new Date(b.date) - new Date(a.date))[0]
              : {};
          const statVal = getTypeString(stat.type);
          return statVal;
        };

        // const checkImageExists = async (imageUrl: string): Promise<boolean> => {
        //   try {
        //     const response = await fetch(imageUrl, { method: 'HEAD' });
        //     return response.ok;
        //   } catch (error) {
        //     return false;
        //   }
        // };

        // // Usage:
        // const profileImg = () => {
        //   const url = `/assets/user_${student.id}.jpg`;
        //   checkImageExists(url).then((exists) => {
        //     return exists ? url : `/assets/default.jpg`;
        //   });
        // };
        return {
          ...student,
          major,
          totalCourses: studentCourses.length,
          status: processStatus(),
          profilePicture: `/assets/user_${student.id}.jpg`,
        };
      });

      setStudents(newData);
    };
    fetchStudents();
  }, [courses, studentsProfile]);

  const headers = [
    { label: 'Profile Picture', key: 'profilePicture' },
    { label: 'Full Name', key: 'name' },
    { label: 'Phone Number', key: 'number' },
    { label: 'Email', key: 'email' },
    { label: 'Major', key: 'major' },
    { label: 'Status', key: 'status' },
    { label: 'Total Course Count', key: 'totalCourseCount' },
    // { label: 'Courses', key: 'courses' },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  };

  const sortTable = (key) => {
    let direction = 'ascending';

    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    setSortConfig({ key, direction });
  };

  const sortedStudents = () => {
    const sorted = [...students];

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

  const filteredStudents = sortedStudents().filter((student) => {
    const searchableValues = [
      student.name,
      student.nickname,
      student.number,
      student.email,
      student.major,
      student.status,
      student.totalCourses,
    ];
    const lowerSearchTerm = searchTerm.toLowerCase();

    return searchableValues.some((value) => {
      // console.log(value);
      return value.toLowerCase().includes(lowerSearchTerm);
    });
  });

  return (
    <>
      <div>
        <h1>Student List</h1>
        <input type="text" placeholder="Search" onChange={handleSearch} />
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key} onClick={() => sortTable(header.key)}>
                  {header.label}
                  {sortConfig.key === header.key && (
                    <span>
                      {sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <img
                      src={
                        student.profilePicture
                          ? student.profilePicture
                          : '/assets/default.jpg'
                      }
                      alt={student.name}
                      onError={(e) => {
                        e.target.src = '/assets/default.jpg';
                      }}
                    />
                  </td>
                  <td>
                    {/* <Link to={`/students/${student.id}`}>
                      {student.fullName}
                    </Link> */}
                    {student.name} {student.nickname && `(${student.nickname})`}
                  </td>
                  <td>{student.phone}</td>
                  <td>{student.email}</td>
                  <td>{student.major}</td>
                  <td>{student.status}</td>
                  <td>{student.totalCourses}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 1}>No data found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
