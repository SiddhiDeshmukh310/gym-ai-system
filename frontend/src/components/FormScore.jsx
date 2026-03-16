export default function FormScore({ score }) {

const safeScore = Number.isFinite(score) ? score : 0

const radius = 60
const circumference = 2 * Math.PI * radius

const progress = Math.min(Math.max(safeScore,0),100)
const offset = circumference - (progress / 100) * circumference

return(

<div style={{textAlign:"center"}}>

<svg width="160" height="160">

<circle
cx="80"
cy="80"
r={radius}
stroke="#1f2937"
strokeWidth="12"
fill="none"
/>

<circle
cx="80"
cy="80"
r={radius}
stroke="#C8FF00"
strokeWidth="12"
fill="none"
strokeDasharray={circumference}
strokeDashoffset={offset}
/>

</svg>

<h2 style={{marginTop:"-110px",color:"#C8FF00"}}>
{progress}
</h2>

<p>FORM SCORE</p>

</div>

)

}