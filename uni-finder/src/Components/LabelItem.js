import React from 'react';
import ReactDOM from 'react-dom';
import Select from "react-select";

class LabelItem extends React.Component {

    render() {

        const options = this.props.options;
        let customStyle;
        if (this.props.isEmpty !== '') { 
            customStyle = {
                option: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? 'white' : 'black',
                  backgroundColor: state.isSelected ? 'orange' : 'white',
                  padding: 20,
                }),
                control: provided => ({
                    ...provided,
                    border: this.props.isEmpty,
                }),
                singleValue: (provided, state) => {
                  const opacity = state.isDisabled ? 0.5 : 1;
                  const transition = 'opacity 300ms';
              
                  return { ...provided, opacity, transition };
                }
              }

        } else {
            customStyle = {
                option: (provided, state) => ({
                  ...provided,
                  color: state.isSelected ? 'white' : 'black',
                  backgroundColor: state.isSelected ? 'orange' : 'white',
                }),
                control: provided => ({
                    ...provided,
                }),
                singleValue: (provided, state) => {
                  const opacity = state.isDisabled ? 0.5 : 1;
                  const transition = 'opacity 300ms';
              
                  return { ...provided, opacity, transition };
                }
              }
        }

        return (
            <div class='LabelItem'>
                <label>
                    {this.props.text}
                    <Select 
                        onChange={e => this.props.handleChange(e, this.props.name)}
                        options={options}
                        styles={customStyle}
                    />
                </label>
            </div>
        )
    }   
}

export default LabelItem