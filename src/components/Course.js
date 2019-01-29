import React from "react";

const Course = props => {
  return (
    <li key={props.short_name}>
      <h3>{props.short_name + " - " + props.title}</h3>
      <p>
        Main Teacher : {props.main_teacher}
        <br />
        Description : {props.description}
      </p>
    </li>
  );
};

export default Course;
