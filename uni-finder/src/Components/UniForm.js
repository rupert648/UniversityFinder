import React from 'react';
import LabelItem from './LabelItem'
import UniCard from './UniCard'
import ErrorPage from '../Errors/ErrorPage'

var { nightlifeOptions, sportsOptions, locationOptions, campusOptions, subjects, aLevelGrades} = require('../data/Options')
const axios = require('axios').default;

class UniForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subjectofstudy: null,
            formSubmitted: false,
            nightlife: null,
            sports: null,
            location: null,
            typeofcampus: null,
            grade1: null,
            grade2: null,
            grade3: null,
            grade4: null,
            inputStyles: {
                subjectofstudy: '',
                nightlife: '',
                sports: '',
                location: '',
                typeofcampus: '',
                averagerequiredgrades: '',
                grade1: '',
                grade2: '',
                grade3: '',
                grade4: '',
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
        const {subjectofstudy, nightlife, sports, location, typeofcampus, grades} = this.state;        
        
        let currentComponent = this;
        let inputStyles = currentComponent.state.inputStyles;

        let areNullValues = false;
        for (let [key, value] of Object.entries(this.state)) {
            if (value === null) {
                if (key !== "grade4") { //don't have to have 4 a levels
                    areNullValues = true;
                    inputStyles[key] = '1px solid red';
                }
            }
            else {
                inputStyles[key] = '';
            }
        }

        
        if (!areNullValues) {

            let averagerequiredgrades = this.state.grade1 + this.state.grade2 + this.state.grade3 + (this.state.grade4 ? this.state.grade4: '');
            console.log(averagerequiredgrades);

            let response = {
                subjectofstudy: subjectofstudy, 
                nightlife: nightlife, 
                sports: sports, 
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
                                handleChange={this.handleChange}
                                options = {subjects}
                                isEmpty={inputStyles.subjectofstudy}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>Which of these 'nights out' would you most prefer?</div>} 
                                name="nightlife" 
                                handleChange={this.handleChange}
                                options = {nightlifeOptions}
                                isEmpty = {inputStyles.nightlife}
                            />
                        </div>
                        <div>
                            <LabelItem 
                                text={<div class='labelClass'>How much sport would you say you play?</div>} 
                                name="sports" 
                                handleChange={this.handleChange}
                                options = {sportsOptions}
                                isEmpty = {inputStyles.sports}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>Which of these locations would you most prefer?</div>} 
                                name="location" 
                                handleChange={this.handleChange}
                                options = {locationOptions}
                                isEmpty = {inputStyles.location}
                            />
                        </div>
                        <div>
                            <LabelItem
                                text={<div class='labelClass'>What kind of university site are you looking for?</div>} 
                                name="typeofcampus" 
                                handleChange={this.handleChange}
                                options = {campusOptions}
                                isEmpty = {inputStyles.typeofcampus}
                            />
                        </div>
                        <div class='gradesArea'>
                            <div>What are your expected Grades (A Level)? (Pick multiple)</div>
                            <LabelItem
                                text={<div class='labelClass'>Subject 1</div>} 
                                name="grade1" 
                                handleChange={this.handleChange}
                                options = {aLevelGrades}
                                isEmpty = {inputStyles.grade1}
                            />
                            <LabelItem
                                text={<div class='labelClass'>Subject 2</div>} 
                                name="grade2" 
                                handleChange={this.handleChange}
                                options = {aLevelGrades}
                                isEmpty = {inputStyles.grade2}
                            />
                            <LabelItem
                                text={<div class='labelClass'>Subject 3</div>} 
                                name="grade3" 
                                handleChange={this.handleChange}
                                options = {aLevelGrades}
                                isEmpty = {inputStyles.grade3}
                            />
                            <LabelItem
                                text={<div class='labelClass'>Subject 4</div>} 
                                name="grade4" 
                                handleChange={this.handleChange}
                                options = {aLevelGrades}
                                isEmpty = {inputStyles.grade4}
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