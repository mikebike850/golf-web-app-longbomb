import React, { useState, useEffect } from "react";
import "./GolfCourses.css";

function GolfCourses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Replace this URL with your actual golf courses API endpoint.
        const response = await fetch("https://api.example.com/golfcourses");
        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || "Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="golf-courses-container">
      <h1 className="page-title">Golf Courses & Club Library</h1>
      {error && <p className="error-message">Error: {error}</p>}
      {!error && courses.length === 0 && <p>Loading courses...</p>}
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <h3>{course.name}</h3>
            <p>{course.location}</p>
            <p>Par: {course.par}</p>
            {/* You can include more information like club details here */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GolfCourses;
