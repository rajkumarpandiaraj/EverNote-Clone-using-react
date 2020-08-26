import React, { Component } from 'react';
import Sidebar from './Sidebar';
import Editor from './Editor';
import { v4 as uuidv4 } from 'uuid';
let arr
localStorage.getItem('notesArr') === null?
arr = [] :
arr = JSON.parse(localStorage.getItem('notesArr'));

export class Evernote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            note : {
                id : '',
                title : '',
                text : ''

            },
            isAddingNewNote : false,
            notesArr : arr,
            selectedNote : null,
            selectedNoteIndex : null

        }


    }

    creatingNewNote = () =>{
        if(this.state.isAddingNewNote){
            this.setState({
                note : {
                    id : uuidv4(),
                    title : '',
                    text : ''
                }
            })
        }else{
            this.resetingNote();
        }
    }   
    
    resetingNote = () =>{
        this.setState({
            note : {
                id : uuidv4(),
                title : '',
                text : ''
            }
        })
    }

    handleAddingNoteToArr = () =>{
        this.setState({
            notesArr : [...this.state.notesArr, this.state.note]
        }, ()=> {
            this.resetingNote()
            console.log(this.state.notesArr);
            localStorage.setItem('notesArr', JSON.stringify(this.state.notesArr));
            
        })
    }
    handleAddNote = () =>{
        this.setState({
            isAddingNewNote : !this.state.isAddingNewNote
        }, this.creatingNewNote)
    }

    handleTitleChange = (e) =>{
        this.setState({
            note : {
                ...this.state.note,
                title : e.target.value
            }
        })
    }

    handleNoteClick = (id) =>{
        let clickedNote = this.state.notesArr.find( note => note.id === id );
        let clickedNoteIndex = this.state.notesArr.findIndex(note => note.id === clickedNote.id )
        this.setState({
            selectedNote : clickedNote,
            selectedNoteIndex : clickedNoteIndex
        },() => {
            console.log(this.state);
        })
    }

    handleUpdateSelectedNote = (text) =>{
        this.setState({
            selectedNote : {
                ...this.state.selectedNote,
                text : text
            }
        }, () => {
            let duplicateNotesArr = this.state.notesArr ;
            duplicateNotesArr[this.state.selectedNoteIndex] = this.state.selectedNote
            this.setState({
                notesArr : duplicateNotesArr
            }, ()=> localStorage.setItem('notesArr', JSON.stringify(this.state.notesArr)))
    
        })
        
    }

    componentDidMount= ()=>{
        console.log(typeof this.state.selectedNote);
        console.log(typeof {});

    }

    // handleSelectedNoteChange = (e)=>{
    //     console.log(this.state.selectedNote);
    //     // console.log(e.target.value);
    //     // this.setState({
    //     //     selectedNote : {
    //     //         ...this.state.selectedNote,
    //     //         text : e.target.value
    //     //     }
    //     // })
    // }

    componentDidUpdate = ()=> {
        console.log('hi');
    }
    render() {
        return (
            <div className='container'>
                <Sidebar isAddingNewNote={this.state.isAddingNewNote}
                            handleAddNote={this.handleAddNote} title={this.state.note.title} 
                            handleTitleChange={this.handleTitleChange} handleAddingNoteToArr={this.handleAddingNoteToArr}
                            notesArr={this.state.notesArr} handleNoteClick={this.handleNoteClick} />
                {
                    this.state.selectedNote !== null && <Editor selectedNote={this.state.selectedNote}
                    handleUpdateSelectedNote={this.handleUpdateSelectedNote}/>
                }
            </div>
        )
    }
}

export default Evernote
