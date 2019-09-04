import React from "react";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";
import { DB_CONFIG } from "./Config/config";
import firebase from "firebase/app";
import "firebase/database";
import "./App.css";

//This is Steven Corrales from CS4261 modifying your first programming assignment with a comment. scorrales3 903353126.

class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);

    this.app = !firebase.apps.length
      ? firebase.initializeApp(DB_CONFIG)
      : firebase.app();
    this.database = this.app
      .database()
      .ref()
      .child("notes");

    this.state = {
      notes: []
    };
  }

  componentWillMount() {
    const previousNotes = this.state.notes;
    this.database.on("child_added", snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent
      });
      this.setState({
        notes: previousNotes
      });
    });
  }

  addNote(note) {
    this.database.push().set({ noteContent: note });
  }

  render() {
    return (
      <div className="notesWrapper">
        <div className="notesHeader">
          <div className="heading">React and Firebase To-Do List</div>
        </div>
        <div className="notesBody">
          {this.state.notes.map(note => {
            return (
              <Note
                noteContent={note.noteContent}
                noteId={note.id}
                key={note.id}
              />
            );
          })}
        </div>
        <div className="notesFooter">
          <NoteForm addNote={this.addNote} />
        </div>
      </div>
    );
  }
}

export default App;
