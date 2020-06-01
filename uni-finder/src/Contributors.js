import React, { Component } from 'react';

class Contributors extends Component {


    render () {
        return (
            <div class="contributorsContainer">
                <p>Want to see my <code>source code</code>?</p>
                <p>Here is the link to the github repository</p>
                <code><a href="https://github.com/rupert648">https://github.com/rupert648</a></code> 

                <p>Built using <a rel="external" target="_blank" href="www.reactjs.org">react</a> and an <a rel="external" target="_blank" href="www.expressjs.com">express</a> app backend written in node.</p>
            </div>
        )
    }
}

export default Contributors;