import React, { Component, useState, useEffect } from "react";
import DisplayNote from "./DisplayNote";
import { UserService } from "../../services/UserService";
import Header from './Header';

function TrashNote(props) {

  let noteService = new UserService();

  const [notes, setNotes] = useState({ notesArray: [] });

  let trashMyNote = () => {
    console.log("Note id for trash " + notes.noteId);
    noteService.getAllNotes(false, true)
      .then(resp => {
        setNotes(resp.data.data)
        console.log(resp.data);
      }).catch(err => {
        console.log(err);
      })
    console.log("This note id trash " + notes.noteId);
  }

  useEffect(() => { trashMyNote() }, [])

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9 allNotes">
          <h2>Trash notes</h2>

          {
            notes.length > 0 && notes.map((note, index) => {
              return (

                (notes.isTrash) ?
                  <div key={index}></div>
                  :
                  <DisplayNote
                    key={index}
                    noteId={note.noteId}
                    title={note.title}
                    description={note.description}
                    bgColor={note.bgColor}
                    reminder={note.reminder}
                    isArchive={note.isArchive}
                    isTrash={note.isTrash}
                    trashMyNote={trashMyNote}
                  />
              )
            }
            )
          }
        </div>
      </div>


    </>
  )

}

export default TrashNote;