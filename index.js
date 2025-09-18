async function addMovie(){

    let title = document.getElementById('title').value 
    let year = document.getElementById('year').value 
    let genere = document.getElementById('genere').value 
    let image = document.getElementById('image').value

    if(!title || !year|| !genere || !image){
        alert("Some info is empty in the box!")
        return
    }

    try {
    let movie = {
        title : document.getElementById('title').value ,
        year : document.getElementById('year').value ,
        genere : document.getElementById('genere').value ,
        image : document.getElementById('image').value 
    }
    let res = await fetch('https://moviedatabase-d3e2f-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json',
        {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(movie)
        }
    )

    document.getElementById('title').value = ""
    document.getElementById('year').value = ""
    document.getElementById('genere').value = ""
    document.getElementById('image').value = ""

    if(res.ok){
        alert('Movies Added Successfull !')
    }
    fetchMovie()

    } catch (error) {
        console.log('Failed to post Data',error)
    }
}

async function fetchMovie(){
    let container = document.getElementById('movieContainer')
    container.innerHTML = ""

    try {
        let res = await fetch('https://moviedatabase-d3e2f-default-rtdb.asia-southeast1.firebasedatabase.app/movies.json')
        let moviedata = await res.json()

        let movieArr = []
        for(let key in moviedata){
            movieArr.push({id : key , ...moviedata[key]})
        }
        
        movieArr.forEach((movie)=>{
            let movieBox = document.createElement('div')
            movieBox.className='movie-box'
            movieBox.innerHTML = `
                <img src="${movie.image}" alt="movie-image">
                <h4>${movie.title} (${movie.year})</h4>
                <p>${movie.genere}</p>
                <button onclick="deleteMovie('${movie.id}')">Delete</button>
            `
            container.appendChild(movieBox)
        })
    } catch (error) {
        console.log('Error in Fetching', error)
    }
}

async function deleteMovie(movieId){
    await fetch(`https://moviedatabase-d3e2f-default-rtdb.asia-southeast1.firebasedatabase.app/movies/${movieId}.json`,{
        method : "DELETE"
    })
    fetchMovie()
    alert('movie deleted')
}

fetchMovie()