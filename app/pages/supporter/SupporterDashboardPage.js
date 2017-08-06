import React, { Component } from "react";
import Navigation from "../../navigation/Navigation";
import ComponentWrap from "../components/ComponentWrap";
import Supported from "./Supported";
import Invite from "./Invite";
import Profile from "../components/Profile";
import ThankTransactions from "../components/thank/Transaction";
import PaymentLimit from "../components/payment/PaymentLimit";
import PaymentMethod from "../components/payment/PaymentMethod";


export default class SupporterDashboardPage extends Component {
  render() {
    let { params: { id } } = this.props;
    return (
      <div>
        <Navigation/>
        <ComponentWrap>
          <div className="columns">
            <div className="column is-one-quarter">
              <Profile id={id}/>
              <Supported id={id}/>
            </div>
            <div className="column is-two-quarter">
              <Invite id={id}/>
              <ThankTransactions id={id}/>
            </div>
            <div className="column is-one-quarter">
              <article className="message is-info">
                <div className="message-body">
                  <PaymentLimit/>
                </div>
              </article>
              <PaymentMethod/>
            </div>
          </div>
        </ComponentWrap>
      </div>
    );
  }
}
