import React from 'react'
import Header from '../../components/base/Header'
import backIcon from '../../assets/icons/back.svg'
import pencil from '../../assets/icons/pencil.svg'
import todoempty from '../../assets/icons/todo-empty-state.svg'
import Button from '../../components/base/Button'
import ListItem from '../../components/base/ListItem'
import Modal from '../../components/base/Modal'
import Alert from '../../components/base/Alert'
import './index.scss'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailActivity, editTitle, setActive } from '../../config/services'
import ModalAct from '../../components/base/ModalAct'
import { useEffect } from 'react'

function Detail() {
    const [display, setDisplay] = useState({
        title: false,
        editTitle: true
    })

    const navigate = useNavigate()
    const [requset, setRequest] = useState(0)
    const [lisItem, setListItem] = useState({})
    const [listTodo, setListTodo] = useState([])
    const [title, setTitle] = useState('')
    const [edit, setEdit] = useState(false)
    const [sortDropdown, setSortDropdown] = useState(true)
    const [detailTodo, setDetailTodo] = useState({
        title: '',
        priority: '',
    })
    const [show, setShow] = useState({
        modal: false,
        dropdown: true,
    })


    const [showDeleteModal, setshowDeleteModal] = useState(false)
    const [alert, setAlert] = useState(false)

    function onChange(e) {
        setListItem({
            ...lisItem,
            [e.target.name]: e.target.value
        })
    }

    function onCheckChange(data) {
        let code = data.is_active;
        if (code === 0) {
            code = 1
        } else {
            code = 0
        }
        const dataTodo = {
            priority: `${data.priority}`,
            is_active: code
        }

        setActive(data.id, dataTodo)
            .then(() => {
                setRequest((prev) => prev += 1)
            })
            .catch((error) => console.log(error))
    }

    function sortingListTodo(key) {
        let result = []

        switch (key) {
            case 'latest':
                result = listTodo.sort((a, b) => {
                    return a.id < b.id
                })
                break;
            case 'oldest':
                result = listTodo.sort((a, b) => {
                    return a.id > b.id
                })
                break;
            case 'asc':
                result = listTodo.sort((a, b) => {
                    return a.title.localeCompare(b.title)
                })
                break;
            case 'desc':
                result = listTodo.sort((a, b) => {
                    return b.title.localeCompare(a.title)
                })
                break;
            case 'unfinished':
                result = listTodo.sort((a, b) => {
                    return a.is_active < b.is_active
                })
                break;
            default:
                break;
        }
        setListItem(result)
        setSortDropdown(true)
    }

    function onClickEdit() {
        setDisplay({
            title: !display.title,
            editTitle: !display.editTitle
        })
    }
    const { id } = useParams()

    useEffect(() => {
        getDetailActivity(id)
            .then((response) => {
                setListItem(response.data)
                setListTodo(response.data.todo_items)
                setTitle(response.data.title)
            })
// eslint-disable-next-line
    }, [requset])

    return (
        <div className='fluid-container detail'>
            <Header />
            <div className="container">
                <div className="new-activity">
                    <div className="edit-title">
                        <img onClick={() => { navigate('/') }} data-cy="todo-back-button" src={backIcon} alt="backIcon" />
                        <h1 id='title' data-cy="todo-title" hidden={display.title}>{title}</h1>
                        <input data-cy="todo-title" onChange={
                            (e) => {
                                onChange(e)
                            }}
                            onBlur={async () => {
                                await editTitle(id, lisItem.title)
                                getDetailActivity(id, setListItem)
                                setDisplay({
                                    title: !display.title,
                                    editTitle: !display.editTitle
                                })
                                setRequest((prev) => prev + 1)
                            }}
                            name='title' type="text"
                            value={lisItem.title}
                            id='editTitle'
                            hidden={display.editTitle
                            }
                        />
                        <img onClick={onClickEdit} data-cy="todo-title-edit-button" src={pencil} alt="pencil" />
                    </div>
                    <div className='control-button'>
                        <Button onClick={() => { setSortDropdown(!sortDropdown) }} data-cy="todo-sort-button" className="button_sort"></Button>
                        <Button onClick={() => {
                            setDetailTodo({
                                activity_group_id: lisItem.id,
                                title: '',
                                priority: '',
                            })
                            setShow({
                                ...show,
                                modal: !show.modal

                            })
                        }} className="button_tambah" data-cy="todo-add-button">
                            <span className='icon_plus'></span>
                            <span>Tambah</span>
                        </Button>
                        <div className="dropdown-sort" hidden={sortDropdown}>
                            <ul data-cy="sort-parent">
                                <li data-cy="sort-latest" onClick={() => { sortingListTodo("latest") }}>
                                    <span className='latest'></span>
                                    <span>Terbaru</span>
                                </li>
                                <li data-cy="sort-oldest" onClick={() => { sortingListTodo("oldest") }}>
                                    <span className='oldest'></span>
                                    <span>Terlama</span>
                                </li>
                                <li data-cy="sort-az" onClick={() => { sortingListTodo("asc") }}>
                                    <span className='asc'></span>
                                    <span>A-Z</span>
                                </li>
                                <li data-cy="sort-za" onClick={() => { sortingListTodo("desc") }}>
                                    <span className='desc'></span>
                                    <span>Z-A</span>
                                </li>
                                <li data-cy="sort-unfinished" onClick={() => { sortingListTodo("unfinished") }}>
                                    <span className='unfinished'></span>
                                    <span>Belum Selesai</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {
                    listTodo?.length > 0 ?
                        <div>
                            {listTodo.map((item) => (
                                <ListItem onEdit={
                                    () => {
                                        setDetailTodo(item)
                                        setEdit(true)
                                        setShow({
                                            ...show,
                                            modal: !show.modal
                                        })
                                    }}
                                    onDelete={() => {
                                        setDetailTodo(item)
                                        setEdit(true)
                                        setshowDeleteModal(true)
                                    }}
                                    onChange={() => { onCheckChange(item) }}
                                    key={item.id}
                                    data={item}
                                />
                            ))}
                        </div>
                        :
                        <div className="content" data-cy="todo-empty-state">
                            <img onClick={() => {
                            }} src={todoempty} alt="" />
                        </div>
                }
                <ModalAct
                    edit={edit}
                    data={detailTodo}
                    setData={setDetailTodo}
                    onCloseModal={() => {
                        setShow({
                            ...show,
                            modal: !show.modal
                        })
                    }}
                    setShow={setShow}
                    setRequest={setRequest}
                    setEdit={setEdit}
                    show={show}
                />
                <Modal setRequest={setRequest} edit={edit} setEdit={setEdit} showAlert={() => { setAlert(true) }} data={detailTodo} onClose={() => { setshowDeleteModal(false) }} show={showDeleteModal} />
                <Alert onClose={() => { setAlert(false) }} show={alert} />
            </div>
        </div>
    )
}

export default Detail