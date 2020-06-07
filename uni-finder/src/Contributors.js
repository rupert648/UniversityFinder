import React, { Component } from 'react';

class Contributors extends Component {


    render () {
        return (
            <div class="contributorsContainer">
                <p>Want to see my <code>source code</code>?</p>
                <p>Here is the link to the github repository</p>
                <code><a target ="_blank" href="https://github.com/rupert648/UniversityFinder">https://github.com/rupert648/UniversityFinder</a></code> 

                <p>Built using <a target="_blank" href="https://www.reactjs.org">react</a> and an <a target="_blank" href="https://www.expressjs.com">express</a> app backend written in node.</p>
            </div>
        )
    }
}

export default Contributors;