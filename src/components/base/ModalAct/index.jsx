import React from 'react'
import { editTodo, tambahListItem } from '../../../config/services'
import Button from '../Button'
import './index.scss'

function ModalAct({ edit, data, show, setShow, setRequest, setEdit, setData }) {

    function setFormatValue(value) {
        if(value === "Medium") {
            return "normal"
        }
        const result = value.split(' ').join('-').toLowerCase()
        return result
    }

    const onInputChange = (e) => {
        setData({
            ...data,
            title: e.target.value
        })
    }

    function setPriority(value) {
        setData({
            ...data,
            priority: value
        })
        setShow({
            ...show,
            dropdown: !show.dropdown
        })
    }

    function checkAllVelue(value) {
        if (value.title === '' || value.priority === '') {
            return true
        }

        return false
    }

    function tambahData(e) {
        e.preventDefault()
        console.log(data);
        const dataSubmit = {
            ...data,
            priority: setFormatValue(data.priority),
            activity_group_id: data.activity_group_id
        }
        if(!edit) {
            tambahListItem(dataSubmit)
            .then(()=>{
                setShow({
                    modal: !show.modal,
                    dropdown: true
                })
                setRequest((prev)=> prev+=1)
                return
            })
            .catch((err)=>{
                console.log(err);
                return
            })

            return
        }
        const dataEdit = {
            is_active: data.is_active,
            priority: setFormatValue(data.priority),
            title: data.title
        }
        editTodo(data.id, dataEdit)
        .then(()=>{
            setShow({
                modal: !show.modal,
                dropdown: true
            })
            setRequest((prev)=> prev+=1)
            return
        })
        .catch((err)=>{
            console.log(err);
            return
        })
    }

    

    if (!show.modal) {
        return null
    }

    return (
        <div className='modal-action' onClick={()=>{
            setShow({ modal: !show.modal, dropdown: true })
            setEdit(false)
        } }>
            <form onSubmit={(e) => { tambahData(e) }}>
                <div className="modal-content" data-cy="modal-add" onClick={(e) => {e.stopPropagation()}}>
                    <div className="modal-header">
                        <p data-cy="modal-add-title">{edit ? "Edit Item" : "Tambah List Item"}</p>
                        <span onClick={() => {
                            setShow({
                                modal: !show.modal,
                                dropdown: true
                            })
                            setEdit(false)
                        }} className='close' data-cy="modal-add-close-button" />
                    </div>
                    <div className="modal-body">
                        <p data-cy="modal-add-name-title">NAMA LIST ITEM</p>
                        <input value={data.title} onChange={(e) => { onInputChange(e) }} type="text" placeholder='Tambahkan nama list item' data-cy="modal-add-name-input" />

                        <p className='mt-5' data-cy="modal-add-priority-title">PRIORITY</p>
                        <div onClick={() => {
                            setShow({
                                ...show,
                                dropdown: !show.dropdown
                            })
                        }} className='dropdown' type="text" data-cy="modal-add-priority-dropdown">
                            <div className='priority-item' data-cy="modal-add-priority-item">
                                <span className={`${setFormatValue(data.priority)}`} />
                                <span>{data.priority ? data.priority : "Pilih priority"}</span>
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
                                    <span className='normal'></span>
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
                            <Button type="submit" data-cy="add-save-button" disabled={checkAllVelue(data)} className="button_save">Simpan</Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ModalAct