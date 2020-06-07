import React from 'react';
import LabelItem from './LabelItem'
import UniCard from './UniCard'
import ErrorPage from './Errors/ErrorPage'
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
            inputStyles: {
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
        let inputStyles = currentComponent.state.inputStyles;

        let areNullValues = false;
        for (let [key, value] of Object.entries(this.state)) {
            if (value === null) {
                areNullValues = true;
                inputStyles[key] = '1px solid red';
            } else {
                inputStyles[key] = '';
            }
        }


        if (!areNullValues) {
            let response = {
                subjectofstudy: subjectofstudy, 
                nightlife: nightlife, 
                sport: sport, 
                location: location, 
                typeofcampus: typeofcampus, 
                averagerequiredgrades: averagerequiredgrades
            }
            axios.post('http://localhost:6483/uni-finder', response)
                .then(function (response) {
                    currentComponent.setState({
                        formSubmitted: true,
                        result: response.data
                    });

                    console.log(response.data)
                })
                .catch(function (error) {
                    currentComponent.setState({
                        formSubmitted: true,
                        error: error
                    });
                });

        } else {
            currentComponent.setState({
                inputStyles: inputStyles
            })
        }
    }

    render() {
        
        const isSubmitted = this.state.formSubmitted;
        if(!isSubmitted) {
            
            let inputStyles = this.state.inputStyles;

            return (                
                <div class="uniFormContainer">
                        <h1><span>University</span> Matcher</h1>
                    <div >
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <LabelItem 
                                text = {<div class='labelClass'>What subject do you want to study?</div>}
                                name="subjectofstudy"
                                value={this.state.subjectofstudy}
                                handleChange={this.handleChange}
                                options = {subjects}
                                isEmpty={inputStyles.subjectofstudy}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>Which of these 'nights out' would you most prefer?</div>} 
                                name="nightlife" 
                                value={this.state.nightlife} 
                                handleChange={this.handleChange}
                                options = {nightlifeOptions}
                                isEmpty = {inputStyles.nightlife}
                            />
                        </div>
                        <div>
                            <LabelItem 
                                text={<div class='labelClass'>How much sport would you say you play?</div>} 
                                name="sport" 
                                value={this.state.sport} 
                                handleChange={this.handleChange}
                                options = {sportsOptions}
                                isEmpty = {inputStyles.sport}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>Which of these locations would you most prefer?</div>} 
                                name="location" 
                                value={this.state.location} 
                                handleChange={this.handleChange}
                                options = {locationOptions}
                                isEmpty = {inputStyles.location}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>What kind of university site are you looking for?</div>} 
                                name="typeofcampus" 
                                value={this.state.typeofcampus} 
                                handleChange={this.handleChange}
                                options = {campusOptions}
                                isEmpty = {inputStyles.typeofcampus}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>Please enter your required grades</div>} 
                                name="averagerequiredgrades" 
                                value={this.state.averagerequiredgrades} 
                                handleChange={this.handleChange}
                                options={["hmmmm"]}
                                isEmpty = {inputStyles.averagerequiredgrades}
                            />
                        </div>
                    <input type="submit" value="Submit" />
                    </form>
                    </div>
                </div>
                )
        } else {

            if (this.state.result) {
                return (
                    <UniCard result={this.state.result}/>
                )
            } else if (this.state.error){    //error
                return (
                    <ErrorPage error={this.state.error} />
                )
            } else {
                //default error
            }
        }
    }
}

export default UniForm  