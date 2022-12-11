import React from 'react'
import alertIcon from '../../../assets/icons/alert.svg'
import './index.scss'

function Alert({ show, onClose }) {
    if (!show) {
        return null
    }
    return (
        <div className='modal-alert' onClick={onClose} data-cy="modal-information">
            <div className="modal-alert-content">
                <div className='frame-image'>
                    <img className='img-fluid' src={alertIcon} alt="alert" />
                </div>
                <span>Activity berhasil dihapus</span>
            </div>
        </div>
    )
}

export default Alert