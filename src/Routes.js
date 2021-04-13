import React from 'react';
import { Route, Swich } from "react-router-dom";

export default function Routes() {
    return (
        <Swich>
            <Route exact path="/">
                <Home />
            </Route>
        </Swich>
    )
}
