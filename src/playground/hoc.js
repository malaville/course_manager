// Higher Order Component (HOC):
// -> A component that renders another component
import React from "react";
import ReactDOM from "react-dom";

const Info = props => (
  <div>
    <h1> Info</h1>
    <p> The info is : {props.info}</p>
  </div>
);

const requireAuthentication = WrappedComponent => {
  return props => (
    <div>
      {props.authenticated ? (
        <div>
          Welcome <WrappedComponent {...props} />
        </div>
      ) : (
        <p>Please Authenticate</p>
      )}
    </div>
  );
};

const AuthenticatedInfo = requireAuthentication(Info);
ReactDOM.render(
  <AuthenticatedInfo authenticated={true} info="YOO" />,
  document.getElementById("app")
);
