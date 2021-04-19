import React, { Component } from 'react'
import { Link } from "react-router-dom" ;
import {CopyToClipboard} from 'react-copy-to-clipboard';
import "../style/containers/Notes.css"

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

			handleClickRemove(event) {
				if (window.confirm("Are you sure you want to remove this note from your list?\n\nAs a reminder, the note will NOT be deleted but simply removed from your list. You can always add it back by clicking on the \"Add to my notes\" button on the note page.")) {
					if (window.localStorage) {
						let notes = (localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []);
						let cached_note_index = notes.findIndex(x => x.id === event.target.getAttribute("data-note"));
		
		
						if (cached_note_index > -1) {
							notes.splice( cached_note_index, 1 );
							localStorage.setItem('notes', JSON.stringify(notes));
							this.setState({
								notes: notes,
								original_notes: notes
							})
						}
					}
				}
			}

      handleSearch = event => {
        const searchTerm = event.target.value;
    
        if (searchTerm.length > 0) {
          let filtered_notes = this.state.original_notes.filter(note =>
            note.title.toLowerCase().includes(searchTerm)
          );
    
          this.setState({
            notes: filtered_notes,
            search_term: searchTerm
          });
        } else {
          this.setState({
            search_term: '',
            notes: this.state.original_notes
          })
        }
      }

      openSyncModal = (event)=> {
        event.preventDefault();
        let note_ids = "";
        
        if (window.localStorage) {
          const notes = (localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []);
          notes.forEach((note) =>{
            note_ids += note.id +":"+ note.token +";" 
          })
        }
    
        this.setState({
          show_sync_modal: true,
          note_ids: note_ids
        })
      }
    
      closeSyncModal = (event) => {
        this.setState({ show_sync_modal: false })
      }


    render() {
        
        let content;
				if (this.state.original_notes.length > 0) {
					content = (
						<div>
							<input type="text" placeholder="Search notes..." className="search_notes" value={this.state.search_term} onChange={this.handleSearch} />
							<ul className="mynotes nolist">
								{this.state.notes.map((note) =>
									<li key={note.id}>
										<div className="remove_note action hint" data-hint="Remove note" onClick={this.handleClickRemove.bind(this)} data-note={note.id}></div>
										<Link to={`/${note.id}`}>{note.title}</Link>
									</li> 
								)}
							</ul>
						</div>
					)
				} else {
					content = (
						<p>You haven't created any note yet. <Link to="/">Create a note now</Link></p>
					)
				}

        return (
            <div className="Notes">
            <div className="title">
              <h1>My Notes</h1>
            </div>
            <div className="buttons">
              <Link className="btn" to="/">New note</Link>
            </div>
            <a href="#" onClick={this.openSyncModal} className="simple-link">Sync notes with another device</a> - <Link className="simple-link" to="/sync">Import notes</Link>
        <div className="body">
          {content}
        </div>
        <div className={`sync-modal ${this.state.show_sync_modal ? "show" : ""}`}>
          <div className="modal">
            <h2>Sync your notes with another device</h2>
            <p>To sync your notes with a different device follow these steps:</p>
            <ol>
              <li>Copy the following backup code<br/>
                  <textarea value={this.state.note_ids} id="export-ids" readOnly></textarea>
                  <CopyToClipboard text={this.state.note_ids}>
                    <button className="sync-copy">Copy</button>
                  </CopyToClipboard><br/>
              </li>
              <li><p>In your other device go to <Link className="simple-link" to="/mynotes">http://localhost:3000/mynotes</Link></p></li>
              <li><p>Click on <Link className="simple-link" to="/sync">Import notes</Link></p></li>
            </ol>
            <Link className="btn" to="#" onClick={this.closeSyncModal}>Close modal</Link>
          </div>
        </div>
      </div>
        );
    }
}
