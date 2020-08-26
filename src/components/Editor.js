
import React, { Component } from 'react';
import ReactQuill from 'react-quill';


export class Editor extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            text : '',
            title : ''
        }
    }
    

    componentDidMount = () => {
        this.setState({
            id : this.props.selectedNote.id,
            title : this.props.selectedNote.title,
            text : this.props.selectedNote.text,
        })
        console.log('timeseted');
        setInterval(()=>{
            console.log('timerunning');
            if(this.props.selectedNote.text !== this.state.text.replace(/<[^>]+>/g, '')){
                this.props.handleUpdateSelectedNote(this.state.text.replace(/<[^>]+>/g, ''))

            }
        }, 10000)

    }
    componentDidUpdate = () => {
        if(this.state.id !== this.props.selectedNote.id){
            this.setState({
                id : this.props.selectedNote.id,
                title : this.props.selectedNote.title,
                text : this.props.selectedNote.text,
            })
        }

        if(this.props.selectedNote.text !== this.state.text.replace(/<[^>]+>/g, '')){

        
        }
}

    handleTextChange = (val) => {
        this.setState({
            text : val
        })
    }

    
    render() {

        return (
            <>
                <section className='editor'>
                    <h1 className='editor-title'>{this.state.title}</h1>
                    <ReactQuill value={this.state.text} onChange={this.handleTextChange}>
                    </ReactQuill>
                </section>
            </>
        )
    }
}

export default Editor
