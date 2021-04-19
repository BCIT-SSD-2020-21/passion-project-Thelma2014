import React, { Component } from 'react'
import {Link } from "react-router-dom" ;
import {CopyToClipboard} from 'react-copy-to-clipboard';
export default class PersonalNotes extends Component {
    render() {
        return (
            <div className="Notes">
            <div className="title">
              <h1>My Notes</h1>
            </div>
            <div className="buttons">
              <Link className="btn" to="/">New note</Link>
            </div>
           
          </div>
        );
    }
}
