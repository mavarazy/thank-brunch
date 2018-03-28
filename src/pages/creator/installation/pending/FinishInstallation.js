import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createProject } from "reducers/project.actions";
import Resource from "components/Resource";
import { BackIcon, InstallIcon } from "components/Icon";
import { Form, reduxForm } from "redux-form";
import ProjectFormSection from "components/form/ProjectFormSection";

function EditProject({ initialValues, submitting, handleSubmit }) {
  return (
    <Form className="profile" onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column is-one-quarter">
          <div className="project-image">
            <figure className="image is-1by1 is-small">
              <img src={initialValues.project.avatar} className="is-centered"/>
            </figure>
            <br/>
          </div>
        </div>
        <div className="column is-two-third">
          <ProjectFormSection/>
        </div>
      </div>
      <button className={`button is-small is-primary ${submitting && "is-loading"}`} type="submit">
        <InstallIcon>Finish</InstallIcon>
      </button>
    </Form>
  );
}

EditProject = reduxForm({})(EditProject);

const FinishInstallation = ({ project, createProject, previous }) => (
  <Fragment>
    <li className="timeline-item is-primary is-large">
      <div className="timeline-marker is-medium is-primary"/>
      <div className="timeline-content">
        <p className="heading">
          <Resource url={project.url}/>
        </p>
        <EditProject initialValues={{ project }} form={`new-project-${project.url}`} onSubmit={({ project }) => createProject(project)}/>
      </div>
    </li>
    <li className="timeline-header is-success">
      <a className="tag is-primary" onClick={previous}>
        <BackIcon>Back</BackIcon>
      </a>
    </li>
  </Fragment>
);

export default connect(({ project: { pending }}, { url }) => ({ project: pending[url] || { url }}), (dispatch) => bindActionCreators({ createProject }, dispatch))(FinishInstallation);
