import moment from "moment"
import { useEffect, useState } from "react"
import "./calender.css"

export const Calender = () => {

    const [calender , setCalender] = useState([])
    const [value , setValue] = useState(moment())

    const startDay = value.clone().startOf('month').startOf('week')
    const endDay = value.clone().endOf('month').endOf('week')
    

    useEffect( () => {
        const day = startDay.clone().subtract(1,'day')
    const a = []
    while(day.isBefore(endDay , 'day')){
        a.push(
            Array(7).fill(0).map(() => day.add(1 , 'day').clone())
        )
        // console.log(calender)
    }
       setCalender( a )

        },[value])

    function isSelected(day){
        return value.isSame(day,'day')
    }    

    function isToday(day){
        return day.isSame( new Date(), 'day')
    } 
    
    function dayStyles(day)
    {
        if(isSelected(day)) return "selected"
        if(isToday(day)) return "today"
        return ""
    }

    function currMonthName(){
        return value.format("MMM")
    }

    function currYear(){
        return value.format("YYYY")
    }

    function prevMonth(){
        return value.clone().subtract(1,'month')
    }

    function nextMonth(){
        return value.clone().add(1,'month')
    }

    return (
        <div className="main" style={{ border : "none"}}>
        <div className="header">
           <div style={{ cursor : "pointer"}}
             onClick={() => setValue(prevMonth())}
           >{String.fromCharCode(171)}</div>
           <div style={{ margin : 'auto'}}>
            {currMonthName()} {currYear()}
           </div>
           <div style={{ paddingRight : '20px' , cursor : "pointer"}}
            onClick={ () => setValue(nextMonth())}
           >{String.fromCharCode(187)}</div>
        </div>
        <div className="main">
         <div className="day-names">
            {
                ["S", "M", "T", "W", "T", "F", "S",].map( d => (
                    <div className="week">{d}</div>
                ))
            }
        </div>   
        {calender.map( week => (
            <div className="container" >
                {week.map( (day) => (
                    <div style={{ cursor : 'pointer' , textAlign : 'center'}}
                    onClick={ () => setValue(day)}
                    className= { dayStyles(day)}
                    >{day.format("D").toString()}</div>
                ))}
            </div>
        ))}
        </div>
        </div>
    )
}