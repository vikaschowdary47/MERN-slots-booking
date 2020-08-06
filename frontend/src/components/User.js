import React,{useState,useEffect} from 'react'
import axios from 'axios'

export const User = ({match}) => {
    const [user,setUser] = useState({})
    console.log(match.params.id)
    const  id=match.params.id

    useEffect(() => {
        const getUsers = async() => {
            await axios.get(`https://reqres.in/api/users/${id}`)
                .then(res => {
                    console.log(res.data)
                    setUser(res.data.data)
                })
        
        }
        getUsers();
    },[])


    return (
        <div>
            <h1>{user.email}</h1>
        </div>
    )
}
