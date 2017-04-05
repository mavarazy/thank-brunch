import React, {Component} from "react";
import Navigation from "../components/Navigation";
import Profile from "../components/user/Profile";
import ComponentWrap from "../components/ComponentWrap";
import ResourceOwnership from '../components/thank/ResourceOwnership';


export default class Love extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <ComponentWrap>
                    <Profile id={this.props.params.id}/>
                </ComponentWrap>
                <ComponentWrap>
                    <ResourceOwnership id={this.props.params.id}/>
                </ComponentWrap>
            </div>
        );
    }
}