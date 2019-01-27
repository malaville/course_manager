import React from "react";
import { Redirect } from "react-router-dom";

const coursesList = [["1", "The First Course"], ["2", "The Second Course"]];

const CoursesListPage = props => {
  console.log(props);

  let courseIsInList = !props.match.params.id || false;
  let names_are_not_matching = false;
  let url_name;

  coursesList.forEach((course, index) => {
    if (course[0] == props.match.params.id) {
      courseIsInList = true;
      const number_course_in_list = index;
      const name_of_the_course = coursesList[number_course_in_list][1];
      url_name = name_of_the_course.toLowerCase().replace(/\s+/g, "_");
      names_are_not_matching =
        !props.match.params.name_of_the_course ||
        url_name != props.match.params.name_of_the_course;
    }
  });

  if (!courseIsInList) {
    return <Redirect to="/courses/" />;
  }

  if (names_are_not_matching) {
    return <Redirect to={`/courses/${props.match.params.id}/${url_name}`} />;
  }

  return (
    <div>
      This is from my edit expense component.
      <br />
      {props.match.params.name_of_the_course &&
        `You queried the course n°${
          props.match.params.id
        } and name ${props.match.params.name_of_the_course
          .toUpperCase()
          .replace(/_/g, " ")}`}
    </div>
  );
};

export default CoursesListPage;
