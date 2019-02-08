import React from "react";
import Lesson from "./Lesson";
import { Link } from "react-router-dom";
const Course = ({
  short_name,
  title,
  id,
  main_teacher,
  description,
  lessons,
  showLessons
}) => {
  return (
    <li key={short_name}>
      <h3>
        {short_name + " - " + title}{" "}
        <Link to={`/courses/${id}/${title.toLowerCase().replace(/\s+/g, "_")}`}>
          {" "}
          détails
        </Link>
      </h3>
      <p>
        Main Teacher : {main_teacher}
        <br />
        Description : {description}
        <br />
      </p>
      {showLessons && (
        <ul>
          {lessons.map(lesson => (
            <Lesson
              key={lesson.course_id + "_" + lesson.lesson_number}
              {...lesson}
              course_short_name={short_name}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default Course;
