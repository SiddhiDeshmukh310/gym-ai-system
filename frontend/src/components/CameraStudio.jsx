export default function CameraStudio(){

return(

<div className="grid grid-cols-2 h-screen">

<div className="bg-black flex items-center justify-center">

<img 
src="http://127.0.0.1:5000/video"
className="rounded-xl border border-green-500"
/>

</div>

<div className="bg-gray-900 p-6">

<h2 className="text-green-400 text-2xl">
Real Time Metrics
</h2>

<div className="mt-6 space-y-4">

<p>Exercise : Bicep Curl</p>
<p>Reps : 12</p>
<p>Form Score : 87%</p>

</div>

</div>

</div>

)

}