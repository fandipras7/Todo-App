import axios from 'axios'

export const getListTodo = async (setListItem) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_LIST_APP_API}/activity-groups?email=fprasetyo4@gmail.com`)
        setListItem(response.data.data)

    } catch (error) {
        
    }
}

export const AddDefaultTodo = async () => {
    try {
        const data = {
            email: 'fprasetyo4@gmail.com',
            title: 'New Activity'
        }

        await axios.post(`${process.env.REACT_APP_LIST_APP_API}/activity-groups/`, data)
    } catch (error) {
        console.log(error);
    }
}

export const getDetailActivity = async (id, setDetail) => {
 try {
    const response = await axios.get(`${process.env.REACT_APP_LIST_APP_API}/activity-groups/${id}`)
    setDetail(response.data)
 } catch (error) {
    console.log(error);
 }
}

export const editTitle = async (id, title) => {
    try {
       await axios.patch(`${process.env.REACT_APP_LIST_APP_API}/activity-groups/${id}`, {title})
    } catch (error) {
       console.log(error);
    }
   }

export const deleteActivity = (data) => {
    return axios.delete(`${process.env.REACT_APP_LIST_APP_API}/activity-groups/${data.id}`)
}