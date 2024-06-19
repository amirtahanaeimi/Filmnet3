let movies;
const movieslistEl=document.getElementById("movieslist")



function fetchmovies(page=1){
    fetch("https://moviesapi.codingfront.dev/api/v1/movies?page="+page).then(function(response){
        return response.json()
    }).then(function(json){
        console.log(json)
        toggleloading()
        renderlist(json.data)
         renderpagination(json.metadata)
    
    }).catch(function(e){
        console.log(e)
    })
    
}
function rendercard(movie){
    const cardEl=document.createElement('div')
    cardEl.classList.add("card1")
    const imgEl=document.createElement('img')
    imgEl.classList.add("card-img-top1")
    imgEl.src=movie.poster
    const cardbodyEl=document.createElement('div')
    cardbodyEl.classList.add('cardbody1')
    const cardtitelEl=document.createElement('h5')
    cardtitelEl.classList.add('cardtitel1')
    cardtitelEl.innerHTML=movie.title
    
    imgEl.style.width='100%'
    imgEl.style.height='358px'

    cardbodyEl.appendChild(cardtitelEl)
    cardEl.appendChild(imgEl)
    cardEl.appendChild(cardbodyEl)
    movieslistEl.appendChild(cardEl)



}

function toggleloading(){
    document.getElementsByClassName("spinner-border")[0].classList.toggle('d-none')

}

function renderlist(movies){
    movies.forEach(function(movie){
        rendercard(movie)
    })
}

function renderpagination(metadata){
    const paginationEl=document.getElementsByClassName("pagination")[0];
    for (let i=1;i<= metadata.page_count;i++){
    const itembuttonEl=document.createElement('button')
    itembuttonEl.classList.add("page-link")
    itembuttonEl.innerHTML=i
    itembuttonEl.onclick=function(){
        movieslistEl.innerHTML=""
        paginationEl.innerHTML=""
        toggleloading()
        fetchmovies(i)
    }
    const itemliEl=document.createElement('li')
    itemliEl.classList.add("page-item")
    if(Number(metadata.current_page)===i){
        itemliEl.classList.add("active")
    }
    itemliEl.appendChild(itembuttonEl)
    paginationEl.appendChild(itemliEl)

    }
}

fetchmovies()