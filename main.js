const find = document.getElementById('find')
const loader = document.querySelector('.load-wrapper')
const notFound = document.querySelector('.not-found')

const fullName = document.getElementById('name')
const height = document.getElementById('height')
const gender = document.getElementById('gender')
const birthYear = document.getElementById('birthYear')
const homeWorld = document.getElementById('homeWorld')

const dataBox = document.getElementById('data')

let id = 0;

const findSomeone = async () => {
    id = Math.floor(Math.random() * 83);

    fetch(`https://swapi.dev/api/people/${id}/`)
    .then(loader.classList.remove('hidden'))
    .then(response => response.json())
    .then(setTimeout(() => {
            loader.classList.add('hidden')
    }, 500))
    .then(data=> {
        dataBox.style.display = "block";
        notFound.classList.add('hidden')
        console.log(data)
        fullName.textContent = data.name;
        height.textContent = data.height;
        gender.textContent = data.gender;
        birthYear.textContent = data.birth_year;

        fetch(`${data.homeworld}`)
        .then(resp => resp.json())
        .then(planet => {
            homeWorld.textContent = planet.name
        })
        .catch(err => {
            setTimeout(() => {
                dataBox.style.display = "none";
                notFound.classList.remove('hidden')
        }, 500)
        })
    })
    .catch(e => console.log(e, "failed"))
}

find.addEventListener('click', findSomeone)
