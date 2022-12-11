import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import Header from '../../components/base/Header'
import Button from '../../components/base/Button'
import EmptyState from '../../components/base/EmptyState'
import Card from '../../components/base/Card'
import moment from 'moment'
import { AddDefaultTodo, getListTodo } from '../../config/services'
import Modal from '../../components/base/Modal'
import Alert from '../../components/base/Alert'


function Home() {
  const [listItem, setListItem] = useState([])
  const [clickCount, setClickCount] = useState(0);
  const [show, setShow] = useState(false)
  const [alert, setAlert] = useState(false)
  const [activityData, setActivityData] = useState({
    title: "",
    id: ""
  })
  const navigate = useNavigate()

  const clickButtonTambah = () => {
    setClickCount(clickCount + 1)
  }

  const moveToDetailActivity = (id) => {
    navigate(`/detail/${id}`)
  }

  useEffect(() => {
    getListTodo(setListItem)
  }, [clickCount, alert])

  return (
    <div className='fluid-container home'>
      <Header />
      <div className='container'>
        <div className="activity mt-5">
          <h1 className='text-start' data-cy="activity-title">Activity</h1>
          <Button onClick={() => {
            clickButtonTambah()
            AddDefaultTodo()
          }} className="button_tambah text-end" data-cy="activity-add-button">
            <span className='icon_plus'></span>
            <span>Tambah</span>
          </Button>
        </div>

        {listItem.length > 0 ? <div className='activity_list_container'>
          {listItem.map((item) => (
            <Card isiData={() => {
              setActivityData({
                title: item.title,
                id: item.id
              })
            }} onClick={()=>{
              moveToDetailActivity(item.id)
            }} showModal={() => {
              setShow(true)
            }}
            title={item.title} textDate={moment(item.date).format('DD MMMM yyyy')} key={item.id} className="activity_card" data-cy="activity-item" />
          ))}
        </div> :

          <EmptyState />}
      </div>
      <Modal showAlert={() => { setAlert(true) }} data={activityData} onClose={() => { setShow(false) }} show={show} />
      <Alert onClose={() => { setAlert(false) }} show={alert} />
    </div>
  )
}

export default Home