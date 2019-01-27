import React from "react";

const AddExpensePage = () => (
  <div>
    This is from my add expense component
    <form>
      Title and id : <br />
      <input type="text" placeholder="Titre du Cours" name="title" />
      <input type="text" placeholder="id" name="id" />
      <br />
      Professor in charge :
      <br />
      <input
        type="text"
        placeholder="Nom du professeur principal"
        name="prof"
      />
      <br />
      Description : <br />
      <textarea
        type="text"
        rows="10"
        placeholder="Description"
        name="description"
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default AddExpensePage;
