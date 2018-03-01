import React from "react";

import { Route, Switch } from 'react-router-dom';
import SupporterDashboardPage from "./DashboardPage";

export default function DashboardRouter() {
  return (
    <section className="section">
      <div className="container">
        <Switch>
          <Route path="/dashboard/:id" render={(({ match: { params: { id } } }) => <SupporterDashboardPage id={id} />)}/>
        </Switch>
      </div>
    </section>
  );
}
