import { useEffect, useState } from "react"

export default function SessionTimer(){

const [seconds,setSeconds] = useState(0)

useEffect(()=>{

const timer = setInterval(()=>{
setSeconds(s=>s+1)
},1000)

return ()=> clearInterval(timer)

},[])

const minutes = Math.floor(seconds/60)
const sec = seconds % 60

return(

<div style={{
background:"rgba(255,255,255,0.04)",
padding:"20px",
borderRadius:"12px"
}}>

<h3>SESSION TIMER</h3>

<h1 style={{fontSize:"40px"}}>
{minutes}:{sec.toString().padStart(2,"0")}
</h1>

</div>

)

}