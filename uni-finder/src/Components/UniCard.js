import React from 'react';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';

class UniCard extends React.Component {

    constructor(props) {
        super();
        var information = props.result
        console.log(information);
        const uniList = information.map((uni) => {
            return (

            <div class={"UniCard"}>
                <h2>University Name: {uni.uniname}</h2>
                <ul>
                    <li><span>Amount of Sports: </span>{uni.sports}</li>
                    <li><span>Nightlife: </span>{uni.nightlife}</li>
                    <li><span>Location: </span>{uni.location}</li>
                    <li><span>Average Required Grades: </span>{uni.averagerequiredgrades}</li>
                    <li><span>Guardian Ranking: </span>{uni.rankingGuardian}</li>
                    <li><span>Undergraduate Class Size: </span>{uni.undergraduateClassSize}</li>
                    <li><span>Average Required Grades: </span>{uni.averagerequiredgrades}</li>
                    <li><span>Website: </span><a target="_blank" href={uni.website}>{uni.website}</a></li>
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