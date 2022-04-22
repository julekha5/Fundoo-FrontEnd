import React, {useState, useEffect } from "react";
import DisplayNote from "./DisplayNote";
import { UserService } from "../../services/UserService";
import Header from './Header';
function ArchiveNote(props) {

  let noteService = new UserService();

  const [notes, setNotes] = useState({ notesArray: [] });

  let archiveMyNote = () => {
    console.log("Note id for archive " + notes.noteId);
    noteService.getAllNotes(true, false)
      .then(resp => {
        setNotes(resp.data.data)
        console.log(resp.data);
      }).catch(err => {
        console.log(err);
      })
    console.log("This note id archived " + notes.noteId);
  }

  useEffect(() => { archiveMyNote() }, [])

  let unArchiveMyNote = () => {
    console.log("Unarchive my note");
    props.handleClose();
  }

  return (
    <>
      <Header />
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9 allNotes">
          <h2>Archive</h2>

          <div>{notes.length}</div>
          {
            notes.length > 0 && notes.map((note, index) => {
              return (

                (notes.archived && !notes.inTrash) ?
                  <div key={index}></div>
                  :
                  <DisplayNote
                    key={index}
                    noteId={note.noteId}
                    title={note.title}
                    description={note.description}
                    bgColor={note.bgColor}
                    reminder={note.reminder}
                    isArchive={unArchiveMyNote}
                    isTrash={note.isTrash}
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

export default ArchiveNote;