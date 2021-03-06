import React,{useState,useEffect} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Form from 'react-bootstrap/Form'

export const User = ({match}) => {
    const [user,setUser] = useState({})
    const [slotBooked,setSlotBooked] = useState(false)
    const [selectedDate,setSelectedDate] = useState(new Date())
    const  id=match.params.id

    useEffect(() => {
        const getUsers = async() => {
            await axios.get(`https://reqres.in/api/users/${id}`)
                .then(res => {
                    // console.log(res.data)
                    setUser(res.data.data)
                })
        }
        getUsers();
    },[id])

    const onSubmit = (e) => {
        e.preventDefault();
        const slot = {
            name:`${user.first_name} ${user.last_name}`,
            email:`${user.email}`,
            date:selectedDate
        }
        console.log(slot);

        axios.post('http://localhost:9000/api/slot/book', slot)
            .then(res => {
                console.log(res.data)
                if(res.data === 'slot booked!') alert('Your slot is booked')
                setSlotBooked(true)
            })
    }

    const doubleBooking = (e) => {
        e.preventDefault();
        alert('OOPS! Your slot is already booked!')
    }

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',marginTop:'40px'}}>
            <img src={user.avatar} alt={user.first_name}/>
            <Form onSubmit={slotBooked ? doubleBooking : onSubmit}>
            <h5> Name: {`${user.first_name} ${user.last_name}`} </h5>   
            <h5>Email: {user.email}</h5>
            <DatePicker className='ml-5' selected={selectedDate} minDate={new Date()} isClearable showYearDropdown scrollableMonthYearDropdown onChange={date => setSelectedDate(date)}/><br />
            <button className={slotBooked ? 'btn btn-primary mt-3 ml-5 disabled' : 'btn btn-primary mt-3 ml-5'} type='submit'>Book Slot</button>
            </Form>
        </div>
    )
}
