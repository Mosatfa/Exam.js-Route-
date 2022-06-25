// loadingscreen
$(document).ready(function(){
    $(".loadingScreen").fadeOut(1000 , function(){
        $(".loadingScreen").remove()
        $("body").css("overflow","auto")
    })
    
})
// side navbar
$(".btnClose").click(function(){
    
    let menuLeft = $(".menu").css("left")
    if(menuLeft == "-250px")
    {
        $(".menu").animate({left : "0px"} , 300)
        $(".icon").animate({left : "250px"} , 300)
        $(".fa").addClass(" fa-times")
        $(".menu li").animate({opacity : 1 , paddingTop : "25px"} , 1000)
    }
    else
    {
        $(".menu").animate({left : "-250px"} , 300)
        $(".icon").animate({left : "0px"} , 300)
        $(".fa").removeClass(" fa-times")
        $(".menu li").animate({opacity : 0 , paddingTop : "500px"} , 1000)

    }
})
//
/////////////////////////////
//validation
let inputName = document.getElementById("inName")
    inputEmail = document.getElementById("inEmail")
    inputPhone = document.getElementById("inPhone")
    inputAge = document.getElementById("inAge")
    inputPass = document.getElementById("inPass")
    inputRepass = document.getElementById("inRepass")

// regex
let regexName = /[A-Za-z0-9]/
    regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    regexphone = /^01[0-25][0-9]{8}$/
    regexpass = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    regexAge = /^(1[89]|[2-9]\d)$/

inputName.addEventListener("keyup" , validName)
inputEmail.addEventListener("keyup" , validEmail)
inputPhone.addEventListener("keyup" , validPhone)
inputAge.addEventListener("keyup" , validAge)
inputPass.addEventListener("keyup" , validPass)
inputRepass.addEventListener("keyup" , validRePass )



let dataUser = []

$("#btnSubmit").click(function(){

    if(validName() == false && validEmail() == false && validPhone() == false && validAge() == false && validPass() == false && validRePass() == false)
    {
        let infoUser ={
            Uname : inputName.value,
            Uemail: inputEmail.value,
            Uphone: inputPhone.value,
            Uage: inputAge.value,
            Upass : inputPass.value,
            Urepass : inputRepass.value,
        }
    
        dataUser.push(infoUser)
        localStorage.setItem("users" , JSON.stringify(dataUser))
    }

})

// validation
function validName()
{
    if(regexName.test(inputName.value))
    {
        $(".areName").fadeOut(0)
        return false
    }
    else
    {
        $(".areName").fadeIn(0)
   
    }    
}

function validEmail()
{
    if(regexEmail.test(inputEmail.value))
    {
        $(".areEmail").fadeOut(0)
        return false
    }
    else
    {
        $(".areEmail").fadeIn(0)

    }    
}

function validPhone()
{
    if(regexphone.test(inputPhone.value))
    {
        $(".arePhone").fadeOut(0)
        return false
    }
    else
    {
        $(".arePhone").fadeIn(0).html("")

    }    
}

function validAge()
{
    if(regexAge.test(inputAge.value))
    {
        $(".areAge").fadeOut(0)
        return false
    }
    else
    {
        $(".areAge").fadeIn(0).html("You must be at least 18 years old")
    }    
}

function validPass()
{
    if(regexpass.test(inputPass.value))
    {
        $(".arePass").fadeOut(0)
        return false
        
    }
    else
    {
        $(".arePass").fadeIn(0)
    }    
}

function validRePass()
{
    if(inputPass.value == inputRepass.value )
    {
        $(".areRepass").fadeOut(0)
        return false
        
    }
    else
    {
        $(".areRepass").fadeIn(0).html("passsword doesn't match")

    } 
}




// api  
let disPosts = document.querySelector(".disPosts")
let response;
let result;
let dataResult;

let baseUrl = `/movie/now_playing?`
let searchNow = document.getElementById("displaysearch") // search
let searchMov = document.getElementById("searchMoves")


// request api
async function request(Url = baseUrl , quary =`` )
{
    response = await fetch(`https://api.themoviedb.org/3${Url}api_key=eba8b9a7199efdcb0ca1f96879b83c44${quary}`);
    result = await response.json();
    dataResult = result.results
    displayPosts(dataResult) 
}
request()
//display
function displayPosts(data) 
{
   
    let posts = ``

    for(let i =0 ; i < data.length ; i++ )
    {
        posts +=`

            <div class="col-md-4 my-3 shadow ">
                <div class="post position-relative  rounded-3 ">
                    <div><img src="https://image.tmdb.org/t/p/w500${data[i].poster_path}" alt="" class="img-fluid"></div>
                    <div class="layer d-flex justify-content-center align-items-center rounded-3">
                        <div class="info ">
                            <h2>${data[i].title}</h2>
                            <p>${data[i].overview}</p>
                            <p class="mb-2" >rate:${data[i].vote_average}</p>
                            <p>${data[i].release_date}</p>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    disPosts.innerHTML = posts
}

//search in page
searchNow.addEventListener("keyup" , searchIn )
function searchIn(e)
{
    let value = e.target.value
    let searchposts = ``
    for(let i =0 ; i < dataResult.length ; i++ )
    {
        // Tirnary operator
        if(dataResult[i].title.toLowerCase().includes(value.toLowerCase()))
        {
            searchposts += `
                <div class="col-md-4 my-3 shadow ">
                    <div class="post position-relative  rounded-3 ">
                        <div><img src="https://image.tmdb.org/t/p/w500${dataResult[i].poster_path}" alt="" class="img-fluid"></div>
                        <div class="layer d-flex justify-content-center align-items-center rounded-3">
                            <div class="info ">
                                <h2>${dataResult[i].title}</h2>
                                <p>${dataResult[i].overview}</p>
                                <p class="mb-2" >rate:${dataResult[i].vote_average}</p>
                                <p>${dataResult[i].release_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            `
        }
    }
    disPosts.innerHTML = searchposts
}


searchMov.addEventListener("keyup" , sMovies)
function sMovies(e)
{
    let value = e.target.value
    let searchUrl = `/search/movie?`
    let quary = `&query=${value}`
    request(searchUrl , quary)
}

//Nowplaying
$("#Nowplaying").click(dispalyNowplaying)
function dispalyNowplaying()
{
    request(baseUrl)
}

//Popular
$("#Popular").click(dispalyPopular)
function dispalyPopular()
{
    let urlPopular = `/movie/popular?`
    request(urlPopular)
}

//TopRated
$("#TopRated").click(dispalyTopRated)
function dispalyTopRated()
{
    let urlTopRated = `/movie/top_rated?`
    request(urlTopRated)
}

//Trending
$("#Trending").click(dispalyTrending)
function dispalyTrending()
{
    let urlTrending = `/trending/all/day?`
    request(urlTrending)
}

// Upcoming
$("#Upcoming").click(dispalyUpcoming)
function dispalyUpcoming()
{
    let urlUpcoming = `/movie/upcoming?`
    request(urlUpcoming)
}