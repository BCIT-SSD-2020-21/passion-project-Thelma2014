import React, { Component } from 'react'
import {Link } from "react-router-dom" ;
import {CopyToClipboard} from 'react-copy-to-clipboard';


export default class PersonalNotes extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          original_notes: [],
          notes: [],
          search_term: '',
          show_sync_modal: false,
          note_ids: ''
        };
      }

      componentWillMount() {
        if (window.localStorage) {
          const notes = (localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')).reverse() : []); 
    
          this.setState({
            notes: notes,
            original_notes: notes
          })
        }
      }


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
