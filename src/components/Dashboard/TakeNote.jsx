import React from 'react';
import { useState } from 'react';
import './TakeNote.css'
import { UserService } from '../../services/UserService';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TakeNote = () => {

  let noteService = new UserService();

  const [note, openNote] = useState(true);

  const [notes, setNotes] = useState({
    title: '',
    description: '',
    bgColor: '',
    reminder: '',
  });

  const setOpen = () => {
    openNote(!note)
  }

  const onTextChange = (e) => {
    setNotes(() => (
      { ...notes, [e.target.name]: e.target.value }
    ))
  }

  /* 
   * add new note onclick saveNote function
  */
  const saveNote = () => {
    console.log("Inside saveNote")
    let data = {
      "noteId": notes.noteId,
      "title": notes.title,
      "description": notes.description,
      "bgColor": notes.bgColor,
      "reminder": startDate,
      "isArchive": '',
      "isTrash": ''
    }

    if (notes.title !== '' || notes.description !== '') {
      setOpen()
      noteService.addNote(data)
        .then(resp => {
          console.log("Inside addNote")
          setNotes()
          console.log(resp);
          noteService.getAllNotes(false, false);
        }).catch(err => {
          console.log(err);
        })
    }
  }

  const setNoteColor = (e) => {
    setNotes(
      { ...notes, 'bgColor': e.target.id }
    )
  }

  const popoverColor = (

    <Popover component={'span'} style={{ display: 'flex', flexDirection: 'row', padding: '8px' }}>
      <div id="#ffff7e" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#ffff7e' }}></div>
      <div id="#E6E6FA" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#E6E6FA' }}></div>
      <div id="#DDA0DD" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#DDA0DD' }}></div>
      <div id="#FFFACD" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#FFFACD' }}></div>
      <div id="#90EE90" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#90EE90' }}></div>
      <div id="#FFF0F5" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#FFF0F5' }}></div>
      <div id="#C0C0C0" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#C0C0C0' }}></div>
      <div id="#87CEFA" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#87CEFA' }}></div>
      <div id="#40E0D0" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#40E0D0' }}></div>
      <div id="#BDB76B" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#BDB76B' }}></div>
      <div id="#F08080" onClick={setNoteColor} className="select-color" style={{ backgroundColor: '#F08080' }}></div>

    </Popover>
  );

  //datepicker
  const [startDate, setStartDate] = useState(new Date());

  const popoverReminder = (
    <Popover id="reminder">
      <div classname="remind-box">
        <h6 className="text-center">Reminder:</h6>
        <i className="fa fa-clock-o">Pick date and time</i>

        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          timeInputLabel="Time:"
          dateFormat="MM/dd/yyyy h:mm aa"
          showTimeInput
        />
      </div>
    </Popover>
  )
  noteService.getAllNotes(false, false);

  return (
    <>
      <div className='note-container'>
        {
          note ?
            <div className='card-container' onClick={() => setOpen()} >
              <div className='input-container'>
                <div>
                  <input
                    className='addnoteinput'
                    type='text'
                    placeholder='Take a note...'
                    onChange={(e) => onTextChange(e)}
                  />
                </div>
              </div>
              <div className='icon-container'>
                <input type="button" className="btn checkbox-icon" />
                <input type="button" className="btn brush-icon" />
                <input type="button" className="btn image-icon" />
              </div>
            </div>
            :
            <div className='cards-container' style={{ backgroundColor: notes.bgColor }}>
              <div className='row'>
                <div className='col-sm-10'>
                  <div className='cardOpen' >
                    <input
                      className='addnoteinput'
                      type='text'
                      placeholder='Title'
                      onChange={(e) => onTextChange(e)}
                      name='title'
                      value={notes.title}
                      style={{ backgroundColor: notes.bgColor }}
                    />
                  </div>
                </div>
                <div className="col-sm-2">
                  <div>
                    <button className="btn pin-icon" name="pin"></button>
                  </div>
                </div>
              </div>
              <div className='input-container'>
                <input
                  className='addnotetext'
                  type='text'
                  placeholder='Take a note...'
                  onChange={(e) => onTextChange(e)}
                  name='description'
                  value={notes.description}
                  style={{ backgroundColor: notes.bgColor }}
                />
              </div>
              <div className='footer-container'>
                <div className='icons-container'>

                  <div className='remider-btn'>
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popoverReminder}>
                      <input type="button"
                        className="btn reminder-icon"
                        onChange={(e) => onTextChange(e)}
                        value={notes.startDate}
                      />
                    </OverlayTrigger>
                  </div>

                  <input type="button" className="btn collaborator-icon" />

                  <div className="color-pallete">
                    <OverlayTrigger trigger="click" placement="bottom" overlay={popoverColor}>
                      <input
                        type="button"
                        className="btn color-icon"
                        onChange={(e) => onTextChange(e)}
                        value={notes.bgColor}
                      />
                    </OverlayTrigger>
                  </div>

                  <input type="button" className="btn image-icon" />
                  <input type="button" className="btn archived-icon" value={notes.isArchive} />
                  <input type="button" className="btn more-icon" />
                  <input type="button" className="btn undo-icon" />
                  <input type="button" className="btn redo-icon" />
                </div>

                <div className='footer-button'>
                  <button className='btn-close'
                    style={{ backgroundColor: notes.bgColor }}
                    onClick={saveNote}>
                    SAVE
                  </button>
                </div>
              </div>
            </div>
        }
      </div>

    </>
  )
}

export default TakeNote;