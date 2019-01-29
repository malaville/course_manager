import React from "react";
const Lesson = props => {
  return (
    <li key={props.key}>
      <h4>
        {"Séance°" +
          props.lesson_number +
          " - " +
          props.date +
          " " +
          props.hour}
      </h4>
      <p>
        Location : {props.location}
        <br />
        Description : {props.description}
      </p>
    </li>
  );
};

export default Lesson;
