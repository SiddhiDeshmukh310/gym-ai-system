export default function ExerciseSelector(){

const exercises=[
"PUSHUP",
"SQUAT",
"BICEP CURL",
"DEADLIFT",
"PLANK"
]

return(

<div style={{display:"flex",gap:"10px",flexWrap:"wrap"}}>

{exercises.map(ex=>(
<button
key={ex}
style={{
padding:"10px 18px",
borderRadius:"25px",
background:"#0A0F1E",
border:"1px solid #C8FF00",
color:"#C8FF00",
fontWeight:"bold"
}}
>
{ex}
</button>
))}

</div>

)

}