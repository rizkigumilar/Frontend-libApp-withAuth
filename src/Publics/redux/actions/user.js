import axios from 'axios';

export const getUsers = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`http://localhost:3001/user`,
        {
            headers: {
                "authorization": "x-control-app",
                "x-access-token": `token: ${localStorage.jwToken}`,
                "x-control-user": localStorage.userid
            }
        })
    }
}

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`http://localhost:3001/user/register`, data)
    }
}

export const deleteMember = (userid) => {
    return {
        type: 'DELETE_USER', userid,
        payload: axios.delete(`http://localhost:3001/user/member/${userid}`)
    }

};

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`http://localhost:3001/user/login`, data,{
            headers: {
                "authorization": "x-control-app",
            }
        }).then( res => {
            const token = res.data.result.token
            const userid = res.data.result.userid
            const name = res.data.result.fullname
            const status = res.data.result.status
            const idNum = res.data.result.idNum
            localStorage.setItem('idNum', idNum)
            localStorage.setItem('status', status)
            localStorage.setItem('userid', userid)
            localStorage.setItem('jwToken', token)
            localStorage.setItem('name', name)
            
        })
    }
}
