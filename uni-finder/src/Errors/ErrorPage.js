import React, { useState } from 'react';

const ErrorPage = (props) => {

    let status = <span></span>;
    if (props.error.response) {
        status = <span>{props.error.response}</span>
    } else if (props.error.request) {
        //no response received
        status =<span>no response seen</span>;
    }
    return (
        <div class='errorPageContainer'>
            <h1>{status}: {props.error.message}</h1>
        </div>
    );
}

export default ErrorPage