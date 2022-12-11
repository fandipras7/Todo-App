import React from 'react'
import './index.scss'
import pencil from '../../../assets/icons/pencil.svg';
import deleteIcon from '../../../assets/icons/trashIcon.svg' 

function ListItem({data, onChange, onEdit, onDelete}) {
    
    return (
        <div className="list-activity" data-cy="todo-item">
            <div className='group-action'>
                <input checked={data.is_active === 0 ? true : false} onChange={onChange} type="checkbox" data-cy="todo-item-checkbox"/>
                <span className={`${data.priority}`} data-cy="todo-item-priority-indicator"></span>
                <p className={data.is_active === 0 ? "done" : "not_done"} data-cy="todo-item-title">{data.title}</p>
                <img onClick={onEdit} src={pencil} alt="" data-cy="todo-item-edit-button" />
            </div>
            <div className='delete_action'>
                <img onClick={onDelete} src={deleteIcon} alt="delete" data-cy="todo-item-delete-button"/>
            </div>
        </div>
    )
}

export default ListItem