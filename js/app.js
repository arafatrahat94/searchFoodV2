const loadData = async (name,datalimit) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    displayData(data.meals,datalimit);
}
const displayData = (data,datalimit) => {
    
    
        
        const foodContainer = document.getElementById('foods');
        foodContainer.innerHTML = '';
        const error = document.getElementById('error')
        if(data === null){
            error.classList.remove('hidden')
            isspinning(false)
            return
        }
        else{
            error.classList.add('hidden')
            
        }
        if(datalimit && data.length > 5){
            data = data.slice(0,5);
            document.getElementById('showAll').classList.remove('hidden')
        }
    else{
        data = data
        document.getElementById('showAll').classList.add('hidden')
    }
        data.forEach(element => {
        const div = document.createElement('div');
        
        div.innerHTML = `<div onclick="showDetails(${element.idMeal})">
        <div  class="relative hover:bg-blue-100 hover:shadow-blue-500 shadow-lg shadow-black flex w-80 mx-auto md:w-96 flex-col rounded-xl md:h-[440px] my-auto bg-clip-border text-gray-700">
        <div class="relative mx-4 mt-2 h-40 md:h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img class=""
            src="${element.strMealThumb}"
          />
        </div>
        <div class="p-6">
          <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            ${element.strMeal}
          </h5>
          <p class="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
            Category : ${element.strCategory} <br>
            Area : ${element.strArea}
          </p>
        </div>
        <div class="p-6 pt-0">
        
          <button onclick="my_modal_5.showModal()"
            class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            Details
          </button>
        </div>
      </div></div>`
      
      foodContainer.appendChild(div);
    });
    
    isspinning(false)
}
const showDetails = ids => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ids}`
    fetch(url)
    .then(res => res.json())
    .then(data => modalData(data.meals))
    // console.log(data)
}
const modalData = data => {
    const dailog = document.getElementById('dailogue')
    dailog.innerHTML = ''
    data.forEach(element => {
        
        const div = document.createElement('div');
        div.classList.add('mx-auto')
            div.innerHTML = `
            <h3 class="font-bold text-lg">${element.strMeal}</h3>
            <div class="relative mx-4 mt-2 h-40 md:h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
          <img class=""
            src="${element.strMealThumb}"
          />
        </div>
        <p class='my-6'>Cooking Instruction :<br>${element.strInstructions}</p>
            <div class="modal-action">
            <div id="isspinning2" class="hidden">
            <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
            <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_3GIrwN3h0z.json" class="my-auto mx-auto mt-10" background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop autoplay></lottie-player>
        </div>
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none">Close</button>
            
            <a href="${element.strYoutube}"><button"
            class="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            data-ripple-light="true"
          >
            Youtube
          </button></a>
            </div>`
            dailog.appendChild(div)
    });
    
}
const datalimit = data => {
    const inputfeild = document.getElementById('search').value;
    loadData(inputfeild, data)
}

document.getElementById('Searchbut').addEventListener('click', function(){
    isspinning(true)
    datalimit(5);
    document.getElementById('mians').classList.remove('hidden')
})
document.getElementById('search').addEventListener('keypress', function(event){
    if(event.key === 'enter'){
        isspinning(true)
        datalimit(5);
    }
})
document.getElementById('showAll').addEventListener('click', function(){
    datalimit()
})
const isspinning = isLoading => {
    const loading = document.getElementById('isspinning');
    if(isLoading){
        loading.classList.remove('hidden')
    }
    else{
        loading.classList.add('hidden')
    }
}
document.getElementById('fo').addEventListener('click', function(event){
  event.preventDefault()
})