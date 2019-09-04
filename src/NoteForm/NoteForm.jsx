import React, { Component } from "react";
import "./NoteForm.css";

class NoteForm extends Component {
  // state = {  }

  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: ""
    };
    this.handleUserIntput = this.handleUserIntput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }

  handleUserIntput(e) {
    this.setState({
      newNoteContent: e.target.value
    });
  }

  writeNote() {
    this.props.addNote(this.state.newNoteContent);
    this.setState({
      newNoteContent: ""
    });
  }

  render() {
    return (
      <div>
        <input
          className="noteInput"
          placeholder="Write a new note..."
          value={this.state.newNoteContent}
          onChange={this.handleUserIntput}
        />
        <button className="noteButton" onClick={this.writeNote}>
          Add Note
        </button>
      </div>
    );
  }
}

export default NoteForm;
