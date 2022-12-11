import React from 'react'
import './index.scss'
import pencil from '../../../assets/icons/pencil.svg';
import deleteIcon from '../../../assets/icons/trashIcon.svg' 

function ListItem() {
    return (
        <div className="list-activity" data-cy="todo-item">
            <div className='group-action'>
                <input type="checkbox" value="Bike" data-cy="todo-item-checkbox"/>
                <span data-cy="todo-item-priority-indicator"></span>
                <h4 data-cy="todo-item-title">NewActivity</h4>
                <img src={pencil} alt="" data-cy="todo-item-edit-button" />
            </div>
            <div className='delete_action'>
                <img src={deleteIcon} alt="delete" data-cy="todo-item-delete-button"/>
            </div>
        </div>
    )
}

export default ListItem