import React, { Component } from 'react'
import { TrixEditor } from "react-trix";
import { Link } from "react-router-dom";
import "../style/containers/Home.css";



export default class Home extends Component {
    render() {
        return (
          <div className="NewNote">
            <form>
              <div className="title">
                <input type="text"  placeholder="Title"  />
              </div>
              <div className="buttons">
                <div className="submit">
                  <span  type="submit" data-hint="Please add a title and a body to your note">Publish</span>
                </div>
                <div className="secondary-links-container">
                  <div className="action new_note hint" data-hint="Create a new note"></div>
                  <Link className="action list_notes hint" rel="noopener noreferrer" to={`/mynotes`} data-hint="My notes"></Link>
                </div>
              </div>
              <div className="body">
                <TrixEditor placeholder="Your note"/>
              </div>
            </form>
          </div>
        );
      }
}
