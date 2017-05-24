import React, {Component} from "react";

import Hero from 'components/landing/Hero';
import Proofs from 'components/landing/Proofs';
import What from 'components/landing/contributor/What';
import NotReadyToJoin from 'components/landing/NotReadyToJoin';
import Footer from "components/Footer";

export default class Contributor extends Component {
    render() {
        return (
            <div>
                <Hero
                    image="contributor/default/Hero.jpg"
                    title="Voice of the people"
                    subtitle="Microtip revolution"
                    button="Change the world"
                />
                <Proofs
                    proofs={["Lincoln", "Che", "Napoleon"]}
                    subtitle="Would approve (we are almost certain)"
                />
                <What/>
                <Proofs
                    proofs={["NYT", "Mashable", "Tech Crunch"]}
                    subtitle="Have no idea we exist (YET)"
                />
                <NotReadyToJoin role="contributor"/>
                <Footer/>
            </div>
        );
    }
}