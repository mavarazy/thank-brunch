import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserResources } from "../../reducers/thank/resource.actions";


function Project({ type, uri }) {
  return (
    <li className="active">
      <a>{uri}</a>
    </li>
  );
}

function AddProject() {
  return (
    <li>
      <Link to="/integration">
        Add
      </Link>
    </li>
  );
}

const ProjectNavigation = ({ resources }) => {
  return (
    <div>
      <h1 className="subtitle">Projects</h1>
      <div className="tabs">
        {resources.map((resource, id) => <Project key={id} {... resource}/>)}
        <AddProject/>
      </div>
      <br/>
    </div>
  );
};

const mapStateToProps = ({ thank: { resource } }) => {
  let resources = resource.my ? resource.my.owns : [];
  return {
    resources
  };
};

const mapDispatchToProps = (dispatch) => {
  dispatch(getUserResources("my"));
  return {
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectNavigation);