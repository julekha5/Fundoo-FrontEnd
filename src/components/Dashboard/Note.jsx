import React from 'react'
import Header from './Header';
import TakeNote from './TakeNote'
import DisplayNote from './DisplayNote'
import { useState, useEffect } from 'react';
import { UserService } from '../../services/UserService';
import ArchiveNote from './ArchiveNote';
import TrashNote from './TrashNote';

function Note(props) {
  let noteService = new UserService();
  const [notes, setNotes] = useState({ notesArray: [] });

  const onTextChange = (e) => {
    setNotes(() => (
      { ...notes, [e.target.name]: e.target.value }
    ))
  }

  // get all notes 
  useEffect(() => {
    const getAllNotes = () => {
      console.log("Inside get all note 3")
      noteService.getAllNotes(false, false)
        .then(resp => {
          setNotes(resp.data.data)
          console.log(resp.data);
        }).catch(err => {
          console.log(err);
        })
    };
    getAllNotes();
  }, []);

  return (
    <>
      <Header />

      <div id="dash-page" >
        <TakeNote
          useEffect={useEffect}
        />
      </div>

      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-9 allNotes" style={{ backgroundColor: props.bgColor }}>
          <h2>All Notes</h2>

          <div>{notes.length}</div>
          {
            notes.length > 0 && notes.map((note, index) => {
              console.log(note)
              return (

                (notes.isArchive || notes.isTrash) ?
                  <div key={index} style={{ backgroundColor: notes.bgColor }}>
                  </div>
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
                    onChange={onTextChange}
                    style={{ backgroundColor: notes.bgColor }}
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

export default Note