import React from "react";
import { connect } from "react-redux";
import { removeLesson, editLesson } from "../actions/courses";

export class Lesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...props, editMode: false };
  }

  onInputChange = e => {
    const value = e.target.value;
    const field = e.target.name;
    this.setState(() => ({
      [field]: value
    }));
  };

  toggleEditMode = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  };

  onSubmit = e => {
    e.preventDefault();
    // Avoids that the page refreshes
    const descriptionIsNotEmpty = !!this.state.description;
    const dateIsNotEmpty = !!this.state.date;
    const hourIsNotEmpty = !!this.state.date;
    if (descriptionIsNotEmpty && dateIsNotEmpty && hourIsNotEmpty) {
      this.props.dispatch(
        editLesson(this.props.course_id, this.props.lesson_number, {
          date: this.state.date,
          hour: this.state.hour,
          description: this.state.description,
          location: this.state.location
        })
      );
      this.toggleEditMode();
    }
  };
  render() {
    return (
      <li key={this.props.course_id}>
        <h4>
          {this.props.course_short_name +
            " - Séance°" +
            this.props.lesson_number +
            " - " +
            this.props.date +
            " " +
            this.props.hour}
          <button
            className="btn btn-primary"
            onClick={() => {
              this.toggleEditMode();
            }}
          >
            Éditer
          </button>
          <button
            className="btn btn-danger"
            onClick={() => (
              this.props.course_id,
              this.props.dispatch(
                removeLesson(this.props.course_id, this.props.lesson_number)
              )
            )}
          >
            Supprimer
          </button>
        </h4>
        <p>
          Location : {this.props.location}
          <br />
          Description : {this.props.description}
        </p>
        {this.state.editMode && (
          <form
            onSubmit={e => {
              this.onSubmit(e);
            }}
          >
            <input
              type="text"
              placeholder="Année-Mois-Jour"
              name="date"
              value={this.state.date}
              onChange={e => this.onInputChange(e)}
            />
            <input
              type="text"
              placeholder="HH:MM"
              name="hour"
              value={this.state.hour}
              onChange={e => this.onInputChange(e)}
            />
            <br />
            Lieu :<br />
            <input
              type="text"
              placeholder="Lieu"
              name="location"
              value={this.state.location}
              onChange={e => this.onInputChange(e)}
            />
            <br />
            Description : <br />
            <textarea
              type="text"
              rows="5"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={e => this.onInputChange(e)}
            />
            <br />
            <button type="submit">Enregistrer</button>
          </form>
        )}
      </li>
    );
  }
}

export default connect()(Lesson);
