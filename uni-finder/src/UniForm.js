import React from 'react';
import LabelItem from './LabelItem'
import UniCard from './UniCard'
var { nightlifeOptions, sportsOptions, locationOptions, campusOptions, subjects} = require('./data/Options')
const axios = require('axios').default;

class UniForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subjectofstudy: null,
            formSubmitted: false,
            nightlife: null,
            sport: null,
            location: null,
            typeofcampus: null,
            averagerequiredgrades: null,
            notSubmittedText: {
                subjectofstudy: '',
                nightlife: '',
                sport: '',
                location: '',
                typeofcampus: '',
                averagerequiredgrades: '',
            },
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(e, name) {
        this.setState({
          [name]: e.value,        
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const {subjectofstudy, nightlife, sport, location, typeofcampus, averagerequiredgrades} = this.state;
        
        let currentComponent = this;
        let notSubmittedText = currentComponent.state.notSubmittedText;
        console.log(notSubmittedText);
        let areNullValues = false;
        for (let [key, value] of Object.entries(this.state)) {
            if (value === null) {
                areNullValues = true;
                console.log(`${key} : ${value}`)
                notSubmittedText[key] = '2px solid red';
                console.log(notSubmittedText)
            } else {
                notSubmittedText[key] = '';
            }
        }

        console.log(notSubmittedText);

        if (!areNullValues) {
            axios.post('http://localhost:6483/uni-finder', currentComponent.state)
                .then(function (response) {
                    currentComponent.setState({
                        formSubmitted: true,
                        result: response.data
                    });

                    console.log(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
            alert("form submitted")
        } else {
            currentComponent.setState({
                notSubmittedText: notSubmittedText
            })
        }
    }

    render() {
        
        const isSubmitted = this.state.formSubmitted;
        if(!isSubmitted) {
            
            let notSubmittedText = this.state.notSubmittedText;

            return (                
                <div class="uniFormContainer">
                        <h1><span>University</span> Matcher <span>;)</span></h1>
                    <div >
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <LabelItem 
                                text = {<div class='labelClass'>What subject do you want to study?</div>}
                                name="subjectofstudy"
                                value={this.state.subjectofstudy}
                                handleChange={this.handleChange}
                                options = {subjects}
                                isEmpty={notSubmittedText.subjectofstudy}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>Which of these 'nights out' would you most prefer?</div>} 
                                name="nightlife" 
                                value={this.state.nightlife} 
                                handleChange={this.handleChange}
                                options = {nightlifeOptions}
                                isEmpty = {notSubmittedText.nightlife}
                            />
                        </div>
                        <div>
                            <LabelItem 
                                text={<div class='labelClass'>How much sport would you say you play?</div>} 
                                name="sport" 
                                value={this.state.sport} 
                                handleChange={this.handleChange}
                                options = {sportsOptions}
                                isEmpty = {notSubmittedText.sport}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>Which of these locations would you most prefer?</div>} 
                                name="location" 
                                value={this.state.location} 
                                handleChange={this.handleChange}
                                options = {locationOptions}
                                isEmpty = {notSubmittedText.location}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>What kind of university site are you looking for?</div>} 
                                name="typeofcampus" 
                                value={this.state.typeofcampus} 
                                handleChange={this.handleChange}
                                options = {campusOptions}
                                isEmpty = {notSubmittedText.typeofcampus}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>Please enter your required grades</div>} 
                                name="averagerequiredgrades" 
                                value={this.state.averagerequiredgrades} 
                                handleChange={this.handleChange}
                                options={["hmmmm"]}
                                isEmpty = {notSubmittedText.averagerequiredgrades}
                            />
                        </div>
                    <input type="submit" value="Submit" />
                    </form>
                    </div>
                </div>
                )
        } else {
            var information = this.state.result
            const uniList = information.map((uni) => {
                return (
                    <div>
                        <UniCard 
                            uniname={uni.uniname}
                            typeofcampus={uni.typeofcampus}
                            sports={uni.sports}
                            nightlife={uni.nightlife}
                            location={uni.location}
                        />
                    </div>
                )
            });

            return (
                uniList
            )
        }
    }
}

export default UniForm