import React from 'react';


class UniCard extends React.Component {

    render() {


        return (
            <div class={"UniCard"}>
                <p>Uniname: {this.props.uniname}</p>
                <p>Type of Campus: {this.props.typeofcampus}</p>
                <p>Amount of Sports: {this.props.sports}</p>
                <p>Nightlife: {this.props.nightlife}</p>
                <p>Location: {this.props.location}</p>
                <p>Average Required Grades: {this.props.averagerequiredgrades}</p>
            </div>
        )
    }
}

export default UniCard  