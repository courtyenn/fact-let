import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import {editTitle, createQuiz} from '../actions'
import Sublist from './Sublist'

class CreateQuiz extends PureComponent {
    render() {
        const {onCreate} = this.props
        return (
            <div>
                <div className="title"> 
                    <h1>{this.props.title}</h1>
                </div>
                <div className="content">
                <p>Get The Facts Straight helps clarifies subjects of controversy. Create categories that are often muddled and shed light on topics that need clarification. Then, copy the link and play with your friends.</p>
                <form>
                    <label htmlFor="title">Title:</label>
                    <input id="title" type="text" name="title" placeholder="Common Logic Quiz" className="input-wide" value={this.props.title} onChange={e => this.props.onNameChange(e.target.value)}/>
                    <label htmlFor="editor">Create categories to compare and contrast</label>
                    <Sublist />
                    <input type="submit" onClick={e => { e.preventDefault(); onCreate()}} />
                </form>
                </div>
            </div>
        )
    }
}

export default connect(state => ({
    title: state.title
}),
    dispatch => ({
        onNameChange: name => { dispatch(editTitle(name)) },
        onCreate: () => { dispatch(createQuiz()) }
    })
)(CreateQuiz)