import React from 'react';
import Sidebaritem from './Sidebaritem'

function Sidebar(props) {
    const {isAddingNewNote,
            handleAddNote,
            title,
            handleTitleChange,
            handleAddingNoteToArr,
            notesArr,
            handleNoteClick,} = props
    return (
        <>
            <section className='side-bar'>
                    <button className='btn' onClick={handleAddNote}>
                        {
                            isAddingNewNote? 
                            'Cancel':
                            'Add New Note'
                            
                        }
                    </button>
                    {
                        isAddingNewNote? (
                        <div>
                            <input type='text' value={title} onChange={handleTitleChange} className='title-input' placeholder='Add Note Title'/> 
                            <button type='button' className='btn-add' onClick={handleAddingNoteToArr} >Add</button>

                        </div>
                        ):
                        null
                    }
                    <ul className='list'>
                        {
                            notesArr.map((note) => <Sidebaritem key={note.id} title={note.title} text={note.text} handleNoteClick={()=> handleNoteClick(note.id)} />)
                        }
                    </ul>
            </section>
        </>
    )
}

export default Sidebar
