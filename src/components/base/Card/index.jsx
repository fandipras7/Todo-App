import React from 'react'
import './index.scss'
import Modal from '../Modal'

function Card({className, onClick, title, textDate, showModal, isiData, ...props}) {
  return (
    <div className={className} {...props}>
        <p onClick={onClick} data-cy="activity-item-title">{title}</p> 

        <div className="activity_info">
            <span className='date' data-cy="activity-item-date">{textDate}</span>
            <span onClick={()=>{
              showModal()
              isiData()
            }} className='trash_icon' data-cy="activity-item-delete-button"></span>
        </div>
    </div>
  )
}
export default Card