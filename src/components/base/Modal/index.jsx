import React from 'react'
import './index.scss'
import { deleteActivity, deleteItemActivity } from '../../../config/services'
import warningIcon from '../../../assets/icons/warning.svg'

function Modal({ data, edit, setEdit, setRequest, showAlert, show, ...props }) {
    if (!show) {
        return null
    }
    console.log(data);

    return (
        <div className='modal' data-cy="modal-delete" onClick={()=>{
                        props.onClose()
                        setEdit(false)
                    }}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <img data-cy="modal-delete-icon" src={warningIcon} alt="iconwarning" />
                </div>
                <div className="modal-body" data-cy="modal-delete-title">
                    <p>Apakah anda yakin menghapus activity</p>
                    <p>"{data.title}"</p>
                </div>
                <div className="modal-footer">
                    <button data-cy="modal-delete-cancel-button" onClick={()=>{
                        props.onClose()
                        setEdit(false)
                    }} className='button_cancel'><span>Batal</span></button>
                    <button data-cy="modal-delete-confirm-button"
                        onClick={()=>{
                            if(!edit){
                                deleteActivity(data)
                                .then(()=>{
                                    props.onClose()
                                    showAlert()
                                })
                                return
                            }
                            deleteItemActivity(data)
                            .then(()=>{
                                props.onClose()
                                showAlert()
                                setEdit(false)
                                setRequest((prev)=> prev+=1)
                            })
                            return
                        }} 
                        className='button_delete'><span>Hapus</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal