import React from 'react';
import './TakeNote.css';
import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { UserService } from '../../services/UserService';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DisplayNote = (props) => {

  let noteService = new UserService();

  const [notes, setNotes] = useState(props);

  const onTextChange = (e) => {
    
    setNotes(
      { ...notes, [e.target.name]: e.target.value }
    )
  }

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  }
  const handleShow = () => {
    setShow(true);
  }

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

  /**
   * set backgroundColor of notes using this function
   */
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

  /**
   * Update note function
   */
  let updateNote = (event, notes) => {
    event.preventDefault();
    handleClose();
    console.log("inside all notes : " + notes);
    if (notes.title !== "" || notes.description !== "") {
      noteService
        .updateNote(notes)
        .then(function (response) {
          console.log(response);
          getNotes();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  let getNotes = () => {
    console.log("Inside getNotes function");
    noteService.getAllNotes(false, false)
      .then(resp => {
        setNotes(resp.data)
        console.log(resp.data);
      }).catch(err => {
        console.log(err);
      })
  }

  let archiveMyNote = () => {
    noteService.archiveNote(notes.noteId);
    getNotes();
    handleClose();
  }

  let trashMyNote = () => {
    console.log("Note id for delete " + notes.noteId);
    noteService.deleteNote(notes.noteId);
    getNotes();
    handleClose();
    console.log("This note id trashed " + notes.noteId);
  }

  return (
    <>
      <div noteId={props.noteId}>
        <div className='notebox-container' onClick={handleShow} style={{ backgroundColor: notes.bgColor }}>
          <div className='cardOpen' style={{ display: 'flex', flexDirection: 'row', backgroundColor: notes.bgColor }}>
            <div className=''>
              <input
                className='addnoteinput'
                type='text'
                placeholder='Title'
                name='title'
                value={props.title}
                readonly="readonly"
                onChange={(e) => onTextChange(e)}
                style={{ backgroundColor: notes.bgColor }}
              />
            </div>

            <div className='' style={{ backgroundColor: notes.bgColor, marginLeft: '90px' }}>
              <button className="btn pin2-icon" name="pin"></button>
            </div>
          </div>

          <div className='input-container' style={{ backgroundColor: notes.bgColor }}>
            <input
              className='addnotetext'
              type='text'
              placeholder='My note...'
              name='description'
              value={props.description}
              readonly="readonly"
              onChange={(e) => onTextChange(e)}
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
                    value={props.startDate}
                    readonly="readonly"
                    disabled
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
                    value={props.bgColor}
                    disabled
                    readonly="readonly"
                  />
                </OverlayTrigger>
              </div>
              <input type="button" className="btn image-icon" disabled />
              <input type="button" className="btn archived-icon"
                value={props.isArchive}
                disabled
              />
              <input type="button"
                className="btn trash-icon"
                value={props.isTrash}
                disabled
              />
            </div>
          </div>
        </div>

        <Modal id="dialog-box1" show={show} onHide={handleClose} >
          <div className='cardOpen' style={{ display: 'flex', flexDirection: 'row', backgroundColor: notes.bgColor }}>
            <div className=''>
              <input
                className='addnoteinput'
                type='text'
                name='title'
                value={notes['title']}
                style={{ backgroundColor: notes.bgColor }}
                onChange={onTextChange}
              />
            </div>
            <div className='' style={{ backgroundColor: notes.bgColor, marginLeft: '230px' }}>
              <button className="btn pin-icon" name="pin"></button>
            </div>
          </div>
          <div className='input-container' style={{ backgroundColor: notes.bgColor }}>
            <input
              type='text'
              multiline
              name='description'
              value={notes['description']}
              style={{ backgroundColor: notes.bgColor }}
              onChange={(e) => onTextChange(e)}
            />
          </div>
          <div className='footer-container' style={{ backgroundColor: notes.bgColor }}>
            <div className='icons-container'>
              <div className='remider-btn'>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popoverReminder}>
                  <input
                    type="button"
                    className="btn reminder-icon"
                    onChange={(e) => handleShow(e)}
                    value={notes['reminder']}
                    data-toggle="tooltip"
                    data-placement="bottom" 
                    title="Reminder Me"
                  />
                </OverlayTrigger>
              </div>
              <input type="button" className="btn collaborator-icon" />

              <div className="color-pallete">
                <OverlayTrigger trigger="click" placement="bottom" overlay={popoverColor}>
                  <input
                    type="button"
                    className="btn color-icon"
                    onChange={(e) => handleShow(e)}
                    value={notes['bgColor']}
                    data-toggle="tooltip"
                    data-placement="bottom" 
                    title="Background color"
                  />
                </OverlayTrigger>
              </div>
              <input type="button" className="btn image-icon" />
              <input type="button"
                className="btn archived-icon"
                value={notes['isArchive']}
                onClick={archiveMyNote}
                onChange={(e) => onTextChange(e)}
                data-toggle="tooltip"
                data-placement="bottom" 
                title="Archive"
              />
              <input type="button"
                className="btn trash-icon"
                value={notes['isTrash']}
                onClick={trashMyNote}
                onChange={(e) => onTextChange(e)}
                data-toggle="tooltip"
                data-placement="bottom" 
                title="Trash"
              />
              <input type="button" className="btn redo-icon" />
            </div>

            <div className='footer-button'>
              <button className='btn-close' style={{ backgroundColor: notes.bgColor }} onClick={(event) => updateNote(event, notes)}>Close</button>
            </div>

          </div>
        </Modal>

      </div>


    </>
  )
}
export default DisplayNote;






