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

export const getDetailActivity = async (id) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_LIST_APP_API}/activity-groups/${id}`)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const editTitle = async (id, title) => {
    try {
        await axios.patch(`${process.env.REACT_APP_LIST_APP_API}/activity-groups/${id}`, { title })
    } catch (error) {
        console.log(error);
    }
}

export const tambahListItem = (data) => {
    return axios.post(`${process.env.REACT_APP_LIST_APP_API}/todo-items`, data)
}

export const editTodo = (id, data) => {
    return axios.patch(`${process.env.REACT_APP_LIST_APP_API}/todo-items/${id}`, data)
}

export const setActive = (id, data) => {
    return axios.patch(`${process.env.REACT_APP_LIST_APP_API}/todo-items/${id}`, data)
}

export const deleteActivity = (data) => {
    return axios.delete(`${process.env.REACT_APP_LIST_APP_API}/activity-groups/${data.id}`)
}

export const deleteItemActivity = (data) => {
    return axios.delete(`${process.env.REACT_APP_LIST_APP_API}/todo-items/${data.id}`)
}