import React from 'react'
import Header from '../../components/base/Header'
import backIcon from '../../assets/icons/back.svg'
import pencil from '../../assets/icons/pencil.svg'
import todoempty from '../../assets/icons/todo-empty-state.svg'
import Button from '../../components/base/Button'
import ListItem from '../../components/base/ListItem'
import './index.scss'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailActivity, editTitle } from '../../config/services'
import ModalAct from '../../components/base/ModalAct'
import { useEffect } from 'react'

function Detail() {
    const [display, setDisplay] = useState({
        title: false,
        editTitle: true
    })
    const navigate = useNavigate()
    const [detail, setDetail] = useState({})
    const [show, setShow] = useState({
        modal: false,
        dropdown: true,
    })

    function onChange(e) {
        setDetail({
            ...detail,
            [e.target.name]: e.target.value
        })
    }

    function onClickEdit() {
        setDisplay({
            title: !display.title,
            editTitle: !display.editTitle
        })
    }
    const { id } = useParams()

    useEffect(() => {
        getDetailActivity(id, setDetail)
    }, [])

    console.log(detail);
    return (
        <div className='fluid-container detail'>
            <Header />
            <div className="container">
                <div className="new-activity">
                    <div className="edit-title">
                        <img onClick={() => { navigate('/') }} data-cy="todo-back-button" src={backIcon} alt="backIcon" />
                        <h1 id='title' data-cy="todo-title" hidden={display.title}>{detail.title}</h1>
                        <input onChange={
                            (e) => {
                                onChange(e)
                            }}
                            onBlur={async () => {
                                await editTitle(id, detail.title)
                                getDetailActivity(id, setDetail)
                                setDisplay({
                                    title: !display.title,
                                    editTitle: !display.editTitle
                                })
                            }}
                            name='title' type="text"
                            value={detail.title}
                            id='editTitle'
                            hidden={display.editTitle
                            }
                        />
                        <img onClick={onClickEdit} data-cy="todo-title-edit-button" src={pencil} alt="pencil" />
                    </div>
                    <div className='control-button'>
                        <Button onClick={() => {
                            setShow({
                                ...show,
                                modal: !show.modal

                            })
                        }} className="button_tambah" data-cy="activity-add-button">
                            <span className='icon_plus'></span>
                            <span>Tambah</span>
                        </Button>
                    </div>
                </div>
                {
                    detail.todo_items?.length !== 0 ?
                        <div className="content" data-cy="todo-empty-state">
                            <img src={todoempty} alt="" />
                        </div>
                        :
                        <ListItem />

                }
                <ModalAct 
                    onCloseModal={() => {
                        setShow({
                            ...show,
                            modal: !show.modal
                        })
                    }}
                    setShow={setShow}
                    show={show}
                />
            </div>
        </div>
    )
}

export default Detail