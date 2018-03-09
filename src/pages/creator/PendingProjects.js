import React, { Fragment } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createProject, enrichProject } from "reducers/project.actions";
import Resource from "components/Resource";
import { InstallIcon, PendingIcon } from "components/Icon";
import { expandableComponent } from "components/timeline/util";
import InstallationPage from "./installation";
import RefreshLink from "components/RefreshLink";
import { Field, FieldArray, Form, reduxForm } from "redux-form";
import { LoadingButton, required, smallFieldWithLabel } from "components/form/form.utils";
import Tags from "components/form/Tags";

function EditProject({ initialValues, submitting, handleSubmit }) {
  return (
    <Form className="profile" onSubmit={handleSubmit}>
      <div className="columns">
        <div className="column is-one-quarter">
          <div className="project-image">
            <figure className="image is-1by1 is-small">
              <img src={initialValues.avatar} className="is-centered"/>
            </figure>
            <br/>
          </div>
        </div>
        <div className="column is-two-third">
          <Field name="avatar" component={smallFieldWithLabel} type="url" placeholder="Avatar URL"/>
          <Field name="title" component={smallFieldWithLabel} placeholder="Title" validate={[required]}/>
          <Field name="description" component={smallFieldWithLabel} type="textarea" className="textarea" placeholder="Description" validate={[required]}/>
          <Field name="rss" component={smallFieldWithLabel} type="url" placeholder="RSS"/>
          <FieldArray name="tags" component={(props) => {
            let { fields } = props;
            let tags = fields.getAll() || [];
            return (
              <div className="field">
                <label className="label is-small">Tags</label>
                <Tags tags={tags} removeTag={(tag) => {
                  fields.remove(tags.indexOf(tag))
                }} addTag={({ tag }) => {
                  fields.push(tag)
                }}/>
              </div>
            )
          }}/>
        </div>
      </div>
      <button className={`button is-small is-primary ${submitting && "is-loading"}`} type="submit">
        <InstallIcon>Finish</InstallIcon>
      </button>
    </Form>
  );
}

EditProject = reduxForm({})(EditProject);

let PendingProjectStep2 = ({ project, createProject }) => (
  <Fragment>
    <li className="timeline-item is-primary is-large">
      <div className="timeline-marker is-medium is-primary"/>
      <div className="timeline-content">
        <p className="heading">
          <Resource url={project.url}/>
        </p>
        <EditProject initialValues={project} form={`new-project-${project.url}`} onSubmit={(project) => createProject(project)}/>
      </div>
    </li>
  </Fragment>
);

PendingProjectStep2 = connect(({ project: { pending }}, { url }) => ({ project: pending[url] || { url }}), (dispatch) => bindActionCreators({ createProject }, dispatch))(PendingProjectStep2);

let PendingProjectStep1 = ({ project, handleExpand }) => (
  <li className="timeline-item is-primary is-large">
    <div className="timeline-marker is-medium is-primary"/>
    <div className="timeline-content">
      <p className="heading">
        <Resource url={project.url}/>
      </p>
      <InstallationPage url={project.url} webStack={project.webStack}/>
      <br/>
      <div className="button is-small is-primary is-outlined" onClick={handleExpand}>
        <InstallIcon>Next</InstallIcon>
      </div>
    </div>
  </li>
);

PendingProjectStep1 = connect(({ project: { pending }}, { url }) => ({ project: pending[url] || { url }}))(PendingProjectStep1);

const PendingProjectInstallation = expandableComponent(PendingProjectStep2, PendingProjectStep1);


let PendingProjectCollapsed = ({ url, handleExpand, enrichProject }) => (
  <li className="timeline-item is-primary">
    <div className="timeline-marker is-medium is-primary"/>
    <div className="timeline-content">
      <p className="heading">
        <Resource url={url}/>
      </p>
      <RefreshLink className="button is-small is-primary" onClick={() => enrichProject(url).then(handleExpand)}>
        <InstallIcon>Install</InstallIcon>
      </RefreshLink>
    </div>
  </li>
);

PendingProjectCollapsed = connect(undefined, (dispatch) => bindActionCreators({ enrichProject }, dispatch))(PendingProjectCollapsed);


const PendingProject = expandableComponent(PendingProjectInstallation, PendingProjectCollapsed);

const NoPending = () => (
  <li className="timeline-item is-primary">
    <div className="timeline-marker is-medium is-primary"/>
    <div className="timeline-content">
      <p className="heading">All urls were successfully installed</p>
    </div>
  </li>
);

const PendingProjects = ({ projects }) => {
  return <Fragment>
    <li className="timeline-header is-success">
        <span className="tag is-primary">
          <PendingIcon>Pending</PendingIcon>
        </span>
    </li>
    {projects.map((project) => (<PendingProject key={project.url} {...project}/>))}
    {projects.length === 0 && <NoPending/>}
  </Fragment>;
};

export default PendingProjects;