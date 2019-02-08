import React from "react";
import { connect } from "react-redux";
import { removeLesson } from "../actions/courses";

const Lesson = props => {
  return (
    <li key={props.course_id}>
      <h4>
        {props.course_short_name +
          " - Séance°" +
          props.lesson_number +
          " - " +
          props.date +
          " " +
          props.hour}
        <button>Éditer</button>
        <button
          onClick={() => (
            props.course_id,
            props.dispatch(removeLesson(props.course_id, props.lesson_number))
          )}
        >
          Supprimer
        </button>
      </h4>
      <p>
        Location : {props.location}
        <br />
        Description : {props.description}
      </p>
    </li>
  );
};

export default connect()(Lesson);
