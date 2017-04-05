import React, {Component} from "react";
import Navigation from "../components/Navigation";
import Profile from "../components/user/Profile";
import ThankTransaction from "../components/ThankTransaction";
import Thank from "../components/Thank";
import ComponentWrap from "../components/ComponentWrap";


export default class Love extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <ComponentWrap>
                    <Profile id={this.props.params.id}/>
                </ComponentWrap>
                <ComponentWrap>
                    <Thank/>
                </ComponentWrap>
                <ComponentWrap>
                    <ThankTransaction id={this.props.params.id}/>
                </ComponentWrap>
            </div>
        );
    }
}