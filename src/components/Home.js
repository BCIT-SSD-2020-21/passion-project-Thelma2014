import React, { Component } from 'react'
import { TrixEditor } from "react-trix";
import { Link } from "react-router-dom";
import * as trixLib from "../libs/trixLib";
import * as commonLib from "../libs/commonLib";
import "../style/containers/Home.css";
import "../style/containers/Editor.css";
export default class Home extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: null,
          title: "",
          content: "",
          note: null,
          cache: "current_note"
        };
      }

      async componentDidMount() {
        await trixLib.didMount();
        await commonLib.onboarding();
      }
    
      async componentWillUnmount() {
        await trixLib.willUnmount();
      }
    
      async set_localstorage() {
        var source_param = await commonLib.getParam("utm_source");
        if (source_param === "chrome_extension" || source_param === "firefox_extension") {
          this.setState({
            cache: "current_note_popup"
          });
        }
      }
      
      async handleEditorReady(editor) {
        await this.set_localstorage();
        await this.prepopulateContent(editor);
        extraTrix.createUploadButton(editor);
        extraTrix.createDividerButton(editor);
        extraTrix.createHeadingsButtons(editor);
        extraTrix.createVideoButton(editor);
        editor.insertHTML(this.state.content);
      }

      validateForm() {
        return (this.state.title && this.state.title.length > 0) && (this.state.content && this.state.content.length > 0 && this.state.content !== "<p><br></p>");
      } 

      handleChange = (html, text) => {

        this.setState({
          content: html
        });
    
        this.updateLocalStorage();
      }

      handleClickNewNote() {
        if (this.state.title || this.state.content) {
          if (window.confirm("Are you sure you want to leave this page? Your changes will not be saved.")) {
            var element = document.querySelector("trix-editor");
            if (element) {
              element.editor.loadHTML("");
            }
            this.setState({
              title: "",
              content: ""
            });
            if (window.localStorage) {
              localStorage.removeItem(this.state.cache);
            }
            this.props.history.push("/");
          } else {
            return;
          }
        } else {
          this.props.history.push("/");
        }
      }

      handleSubmit = async event => {
        event.preventDefault();
    
        if (this.validateForm()) {
    
          this.setState({ isLoading: true });
    
          try {
            var newNote = await this.createNote({
              title: this.state.title,
              content: this.state.content
              //token: await common.makeid()
            });
    
            // Track event on Tag Manager
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'event': 'new_note'
            });
    
            if (window.localStorage) {
              let notes = (localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : []);
              notes.push({
                id: newNote.noteId,
                title: newNote.title
                //token: newNote.token
              });
              localStorage.setItem('notes', JSON.stringify(notes));
              localStorage.removeItem(this.state.cache); // Remove current_note from localstorage
            }
    
            this.props.history.push("/"+newNote.noteId);
          } catch (e) {
            alert(e);
            this.setState({ isLoading: false });
          }
        }
      }

    render() {
        return (
          <div className="NewNote">
            <form>
              <div className="title">
                <input type="text"  value={this.state.title} placeholder="Title" onChange={this.ChangeTitle} />
              </div>
              <div className="buttons">
                <div className="submit">
                  <span  className={`btn ${(!this.validateForm() || this.state.isLoading) ? "disabled" : ""}`} onClick={this.handleSubmit} type="submit" data-hint="Please add a title and a body to your note">Publish</span>
                </div>
                <div className="secondary-links-container">
                  <div className="action new_note hint" data-hint="Create a new note" onClick={this.handleClickNewNote.bind(this)}></div>
                  <Link className="action list_notes hint" rel="noopener noreferrer" to={`/mynotes`} data-hint="My notes"></Link>
                </div>
              </div>
              <div className="body">
                <TrixEditor autoFocus={true} value={this.state.content} onChange={this.handleChange.bind(this)} placeholder="Your note" onEditorReady={this.handleEditorReady.bind(this)}/>
              </div>
            </form>
          </div>
        );
      }
}
