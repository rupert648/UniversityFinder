import React from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class UniCard extends React.Component {

    constructor(props) {
        super();
        var information = props.result
        const uniList = information.map((uni) => {
            return (

            <div class={"UniCard"}>
                <h2>University Name: {uni.uniname}</h2>
                <ul>
                    <li>Amount of Sports: {uni.sports}</li>
                    <li>Nightlife: {uni.nightlife}</li>
                    <li>Location: {uni.location}</li>
                    <li>Average Required Grades: {uni.averagerequiredgrades}</li>
                </ul>
            </div>

            )
        });

        this.state = {
            value: 0,
            slides: uniList
        }
        this.onchange = this.onchange.bind(this);
    }

    onchange(value) {
        this.setState({ value });
    }

    render() {

        return (
            <div>
                <Carousel
                    value={this.state.value}
                    slides={this.state.slides}
                    onChange={this.onchange}
                />
                <Dots value={this.state.value} onChange={this.onchange} number={this.state.slides.length} />
            </div>
        )
    }
}

export default UniCard  