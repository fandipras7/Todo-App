import React from 'react'
import { useState } from 'react'
import Button from '../Button'
import './index.scss'

function ModalAct({ show, setShow }) {
    const [dataForm, setDataForm] = useState({
        title: '',
        priority: '',
    })

    function setFormatValue(value) {
        const result = value.split(' ').join('-').toLowerCase()
        console.log(result);
        return result
    }

    const onInputChange = (e) => {
        setDataForm({
            ...dataForm,
            title: e.target.value
        })
    }

    function setPriority(value) {
        console.log("ini value: " + value);
        setDataForm({
            ...dataForm,
            priority: value
        })
        setShow({
            ...show,
            dropdown: !show.dropdown
        })
    }

    function checkAllVelue(value) {
        // console.log(value);
        if(value.title == '' || value.priority == ''){
            console.log(value);
            return true
        }

        return false
    }

    // console.log("ini priority: " + dataForm.priority);
    // console.log("ini title: " + dataForm.title);

    // console.log(dataForm.priority);

    if (!show.modal) {
        return null
    }
    return (
        <div className='modal-action' onClick={() => { setShow({ modal: !show.modal, dropdown: true }) }}>
            <div className="modal-content" data-cy="modal-add" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <p data-cy="modal-add-title">Tambah List Item</p>
                    <span onClick={() => {
                        setShow({
                            modal: !show.modal,
                            dropdown: true
                        })
                    }} className='close' data-cy="modal-add-close-button" />
                </div>
                <div className="modal-body">
                    <p data-cy="modal-add-name-title">NAMA LIST ITEM</p>
                    <input onChange={(e) => { onInputChange(e) }} type="text" placeholder='Tambahkan nama list item' data-cy="modal-add-name-input" />

                    <p className='mt-5' data-cy="modal-add-priority-title">PRIORITY</p>
                    <div onClick={() => {
                        setShow({
                            ...show,
                            dropdown: !show.dropdown
                        })
                    }} className='dropdown' type="text" data-cy="modal-add-priority-dropdown">
                        <div className='priority-item' data-cy="modal-add-priority-item">
                            <span className={`${setFormatValue(dataForm.priority)}`} />
                            <span>{dataForm.priority ? dataForm.priority : "Pilih priority"}</span>
                        </div>
                        <span className='select' />
                    </div>
                    <div className="dropdown-content" onClick={() => { setShow({ ...show, dropdown: !show.dropdown }) }} hidden={show.dropdown}>
                        <ul onClick={e => e.stopPropagation()}>
                            <li data-cy="modal-add-priority-very-high" onClick={() => { setPriority("Very High") }}>
                                <span className='very-high'></span>
                                <span>Very High</span>
                            </li>
                            <li data-cy="modal-add-priority-high" onClick={() => { setPriority("High") }}>
                                <span className='high'></span>
                                <span>High</span>
                            </li>
                            <li data-cy="modal-add-priority-medium" onClick={() => { setPriority("Medium") }}>
                                <span className='medium'></span>
                                <span>Medium</span>
                            </li>
                            <li data-cy="modal-add-priority-low" onClick={() => { setPriority("Low") }}>
                                <span className='low'></span>
                                <span>Low</span>
                            </li>
                            <li data-cy="modal-add-priority-very-low" onClick={() => { setPriority("Very Low") }}>
                                <span className='very-low'></span>
                                <span>Very Low</span>
                            </li>
                        </ul>
                    </div>

                    <div className="modal-footer">
                        <Button disabled={checkAllVelue(dataForm)} className="button_save">Simpan</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAct