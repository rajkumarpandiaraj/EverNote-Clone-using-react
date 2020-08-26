import React from 'react'

function Sidebaritem(props) {
    const {title, text, handleNoteClick} = props
    return (
        <>
            <li className='item' onClick={handleNoteClick}>
                <h2>{title}</h2>
                <p>{
                    text.length > 15?
                    `${text.substring(0, 15)}...`:
                    text
                    }
                    </p>
            </li>
            <hr className='divider'/>
        </>
    )
}

export default Sidebaritem
