let allData=[];


const managespinner=(status)=>{
  if(status==true){
    document.getElementById('spinner').classList.remove('hidden')

  }
  else{
     document.getElementById('spinner').classList.add('hidden')

  }

}






const tracker=()=>{
  managespinner(true);
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then((res)=>res.json())
    .then(data=>{
      allData=data.data;
      display(allData)
     managespinner(false)})
    
     
}




const Search=()=>{
const search=document.getElementById('search')
const searches=search.value



if(searches){
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searches}`)
  .then((res)=>res.json())
  .then((data)=>{display(data.data);
})}
else{
  display(allData)
}}














const display=(issues)=>{


  const count=document.getElementById('count')
  if(count){
    count.innerText=`${issues.length}`
  }


    const trackers=document.getElementById('trackers')
    trackers.innerHTML='';
 const gridDiv = document.createElement('div')
 gridDiv.className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'
    for(let issue of issues){
let border='';
      
  if(issue.status.toLowerCase()=='open'){
     border='border-t-green-500 border-t-5';
  }
  else{
     border='border-t-purple-500 border-t-5';
  }
       const card=document.createElement('div')

      card.onclick=()=>{
        showdetail(issue.id)

      }
       card.className='cursor-pointer';
        card.innerHTML=`
<div class="card bg-base-100 shadow-sm border ${border} p-6 rounded-2xl w-full max-w-md pt-5 mt-9">
  
  <section class="space-y-4">
    <div class="flex justify-between items-center pb-4">
      <div class="p-2 bg-green-50 rounded-full">
        <img class="w-6 h-6" src="assets/Open-Status.png" alt="Open">
      </div>
      <span class="badge badge-error badge-outline bg-red-50 text-red-500 font-bold px-4 py-3 border-none">${issue.priority}</span>
    </div>

    <h2 class="text-xl font-bold hover:text-blue-600 cursor-pointer transition-colors">
     ${issue.title}
    </h2>
    <p class="text-gray-500 text-sm leading-relaxed line-clamp-1">
    ${issue.description}
    </p>

    <div class="flex gap-2 py-2">
      <div class="badge badge-outline border-red-200 text-red-500 flex gap-2 items-center px-3 py-3 bg-red-50 font-semibold text-xs">
        <i class="fa-solid fa-circle-dot"></i>BUG
      </div>
      <div class="badge badge-outline border-yellow-200 text-yellow-600 flex gap-2 items-center px-3 py-3 bg-yellow-50 font-semibold text-xs">
        <i class="fa-solid fa-handshake"></i> HELP WANTED
      </div>
    </div>

    <div class="border-t border-gray-100 pt-4 mt-2 text-gray-400 text-xs  items-center">
      <p>#1 by <span class="font-medium text-gray-500">john_doe</span></p>
      <p>1/15/2024</p>
     
    </div>
  </section>
  
</div>



</div>`
gridDiv.append(card)
    }
    trackers.append(gridDiv);

    
}
const filterissue=(status)=>{
  if(status=='all')
  {
    display(allData)
  }
  else{
    const filtered=allData.filter(item=>item.status.toLowerCase()===status.toLowerCase())
    display(filtered)

 
  }
}




const showdetail=(id)=>{
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
  .then(res=>res.json())
  .then(data=>{
    const issue=data.data
    const modalbox=document.getElementById('my_modal_1')
    modalbox.innerHTML=`
  <div class="modal-box w-11/12 max-w-2xl">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          
          <div class="flex items-center gap-3 mb-4">
             <div class="p-2 bg-green-50 rounded-full">
                <img class="w-6 h-6" src="assets/Open-Status.png" alt="Status">
             </div>
             <span class="badge badge-error badge-outline bg-red-50 text-red-500 font-bold px-4 py-3 border-none">${issue.priority}</span>
          </div>

          <h3 class="font-bold text-2xl text-blue-600 mb-2">${issue.title}</h3>
          <p class="text-gray-600 leading-relaxed mb-6">${issue.description}</p>
          
          <div class="flex gap-2 mb-6">
            <div class="badge badge-outline border-red-200 text-red-500 flex gap-2 items-center px-3 py-3 bg-red-50 font-semibold text-xs">
              <i class="fa-solid fa-circle-dot"></i> BUG
            </div>
            <div class="badge badge-outline border-yellow-200 text-yellow-600 flex gap-2 items-center px-3 py-3 bg-yellow-50 font-semibold text-xs">
              <i class="fa-solid fa-handshake"></i> HELP WANTED
            </div>
          </div>

          <div class="border-t border-gray-100 pt-4 text-gray-400 text-sm flex justify-between">
            
           
            <p>Status: <span class="text-green-600 font-bold uppercase">${issue.status}</span></p>
          </div>

          <div class="modal-action">
            <form method="dialog">
              <button class="btn btn-primary">Got it!</button>
            </form>
          </div>
        </div>
    `
    modalbox.showModal();
  })
}





tracker();







