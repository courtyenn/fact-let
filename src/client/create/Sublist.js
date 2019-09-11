import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import uuidv1 from 'uuid/v1';
import EditableLabel from './EditableLabel';
import AddButton from './AddButton';

class Sublist extends Component {
  createAnswerList(i) {
    let { editChoiceId, onEditChoice, onEditChoiceTitle, onRemoveChoice, onAddChoice, answers } = this.props;
    const filtered = answers.filter(n => n.correctId === i);
    return filtered.map((answer, j) => {
      // if (answer.id !== editChoiceId) {
      return React.createElement('li', { key: answer.id }, (
        <EditableLabel
          label={{ value: answer.title, id: answer.id }}
          edit={answer.id !== editChoiceId}
          clickLabel={onEditChoice}
          blurLabel={onEditChoice}
          changeLabel={onEditChoiceTitle}>
          <span className="addField" onClick={() => { onAddChoice(uuidv1(), answer.correctId) }}></span>
          {filtered.length > 1 ? <span className="removeField" onClick={e => { onRemoveChoice(answer.id) }}></span> : null}
        </EditableLabel>
      ))
    });
  }

  createList() {
    let { columns, onEditColumn, onEditColumnTitle, editColumnTitle, onRemoveColumn } = this.props;
    let fields = columns.map(item => {
      let list = this.createAnswerList(item.id);
      if (item.id !== editColumnTitle) {
        return (
          <div className="sublist" key={item.id}>
            <span className="removeField" onClick={e => onRemoveColumn(item.id)}></span>
            <h3 onClick={e => onEditColumn(item.id)}>{item.title}</h3>
            <ul className="sub-sublist">
              {list}
            </ul>
          </div>);
      }
      else {
        return (
          <div className="sublist" key={item.id}>
            <span className="removeField"></span>
            <h3><input
              autoFocus
              className="input-inline"
              value={item.title}
              onChange={e => onEditColumnTitle(item.id, e.target.value)}
              onBlur={e => onEditColumn(null)}
              type="text" /></h3>
            <ul className="sub-sublist">
              {list}
            </ul>
          </div>
        )
      }
    });

    return fields;
  }
  render() {
    let { columns, onAddColumn } = this.props;
    let list = this.createList()
    return (<div>{list}<button type="button" onClick={e => { onAddColumn(uuidv1(), uuidv1()) }}>Add Column</button></div>);
  }
};
export default connect(state => ({
  columns: state.columns,
  answers: state.answers,
  editColumnTitle: state.editColumnTitle,
  editChoiceId: state.editChoiceId
}),
  dispatch => ({
    onAddColumn: (columnId, id) => { dispatch(Actions.addColumn(columnId, id)) },
    onAddChoice: (id, columnId) => { dispatch(Actions.addChoice(id, columnId)) },
    onRemoveColumn: id => { dispatch(Actions.removeColumn(id)) },
    onRemoveChoice: id => { dispatch(Actions.removeChoice(id)) },
    onEditColumn: id => { dispatch(Actions.editColumn(id)) },
    onEditColumnTitle: (id, val) => { dispatch(Actions.editColumnTitle(id, val)) },
    onEditChoice: (id, val) => { dispatch(Actions.editChoice(id)) },
    onEditChoiceTitle: (id, val) => { dispatch(Actions.editChoiceTitle(id, val)) },
  }))(Sublist)