import React, { PureComponent } from 'react'

//TODO: Allow component to specify parent wrapper and remove description
export default class EditableLabel extends PureComponent {
    render() {
        const {label, editLabel, blurLabel} = this.props
        if (!this.props.edit) {
            return (
                <div className="flex-container">
                    {this.props.children}
                    <span className="description" onClick={e => clickLabel(label.id)}>{label.value}</span>
                </div>)
        }
        else {
            return (
                <div className="flex-container">
                    {this.props.children}
                    <input
                        className="input-inline"
                        type="text"
                        value={label.value}
                        onChange={e => editLabel(label.id, e.target.value)}
                        onBlur={e => blurLabel(null)}
                        autoFocus />
                </div>
            )
        }
    }
}