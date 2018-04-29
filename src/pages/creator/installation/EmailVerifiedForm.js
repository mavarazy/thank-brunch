import React from "react";
import { connect } from "react-redux";
import { InstallIcon } from "components/Icon";
import { projectByEmail } from "reducers/project.actions";
import { Field, Form, reduxForm } from "redux-form";
import { emailFormat, flatField, LoadingButton, required } from "components/form/form.utils";

import { reset } from 'redux-form';

let EmailVerifiedForm = ({ handleSubmit, submitting }) => (
  <li className="timeline-item is-primary">
    <div className="timeline-marker is-primary">
    </div>
    <div className="timeline-content">
      <p className="heading">
        We'll send you verification link
      </p>
      <div className="content">
        <Form onSubmit={handleSubmit} className="is-fullwidth" style={{ width: "100%" }}>
          <div className="field has-addons" style={{ flexGrow: 1 }}>
            <div className="control" style={{ flexGrow: 1 }}>
              <Field type="text" className="input is-small" name="email" component={flatField} validate={[required, emailFormat]}/>
            </div>
            <div className="control">
              <LoadingButton className="button is-small is-primary" submitting={submitting}>
                <InstallIcon>Add</InstallIcon>
              </LoadingButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </li>
);

EmailVerifiedForm = reduxForm({ form: "project-email" })(EmailVerifiedForm);

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (form) => dispatch(projectByEmail(form)).then(() => {
    dispatch(reset("project-email"))
  })
});

const EmailVerification = connect(undefined, mapDispatchToProps)(EmailVerifiedForm);

export default EmailVerification;