import React from "react";

export default class AddCoursePage extends React.Component {
  state = {
    title: "",
    short_name: "",
    main_teacher: "",
    description: ""
  };

  onInputChange = e => {
    const value = e.target.value;
    const field = e.target.name;
    this.setState(() => ({
      [field]: value
    }));
  };

  render() {
    return (
      <div>
        This is from my add expense component
        <form>
          Title and short name : <br />
          <input
            type="text"
            placeholder="Title of the course"
            name="title"
            value={this.state.title}
            onChange={e => this.onInputChange(e)}
          />
          <input
            type="text"
            placeholder="Short name (i.e. CR3)"
            name="short_name"
            value={this.state.short_name}
            onChange={e => this.onInputChange(e)}
          />
          <br />
          Professor in charge :
          <br />
          <input
            type="text"
            placeholder="Professor in charge"
            name="main_teacher"
            value={this.state.main_teacher}
            onChange={e => this.onInputChange(e)}
          />
          <br />
          Description : <br />
          <textarea
            type="text"
            rows="10"
            placeholder="Description"
            name="description"
            value={this.state.description}
            onChange={e => this.onInputChange(e)}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// const mock_course2 = {
//   id: 2,
//   title: "Management de l'innovation ",
//   short_name: "I4",
//   main_teacher: "J-M. Dalle",
//   description: "This course is the first of the innovation seminary",
//   last_modified: 0,
//   lessons: [
//     {
//       location: "Telecom",
//       hour: "16:30",
//       date: "2019-01-18",
//       course_id: 2,
//       lesson_number: 1,
//       description:
//         "M. Bry will give you very interesting tips to build your first business model !"
//     },
//     {
//       location: "Telecom",
//       hour: "16:30",
//       date: "2019-01-27",
//       course_id: 2,
//       lesson_number: 2,
//       description:
//         "Nicolas Bry will introduce you to the famous post-it technique"
//     },
//     {
//       location: "Telecom",
//       hour: "14:30",
//       date: "2019-01-26",
//       course_id: 2,
//       lesson_number: -1,
//       description:
//         "You will now present your project, even if it is very shitty"
//     },
//     {
//       location: "Telecom",
//       hour: "9:30",
//       date: "2019-02-12",
//       course_id: 2,
//       lesson_number: -1,
//       description: "Ce cours n'existe pas"
//     }
//   ]
// };
