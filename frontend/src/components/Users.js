import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

export const Users = () => {
    const [users,setUsers]  = useState([])
    const [search,setSearch] = useState('')
    
    
   
    useEffect(() => {
        const getUsers = async() => {
            await axios.get('https://reqres.in/api/users')
                .then(res => {
                    console.log(res.data.data)
                    setUsers(res.data.data)
                })
        
        }
        getUsers();
    },[])

// filtering users
    let filteredUsers = users.filter((user) => {
         return (
             user.first_name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
             user.last_name.toLowerCase().indexOf(search.toLowerCase()) !== -1
             )
    });
    
    return (
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            
            <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} placeholder='search users'
            style={{margin:'50px 0'}}></input>
            {filteredUsers.map(user => (
                    <div key={user.id} style={{display:'flex',flexDirection:'column'}}>
                        <Link to ={`/users/${user.id}`}>
                    <img src={user.avatar} width='40' height='40' alt={user.first_name}/>
            
                   <h5> {`${user.first_name} ${user.last_name}`} </h5>
                   </Link>
                </div>
            ))}
    
        </div>
    )
}
