let loginBtn = document.getElementById('login-btn')
let logoutBtn = document.getElementById('logout-btn')

let token = localStorage.getItem('token')

if (token) {
    loginBtn.remove()
} else {
    logoutBtn.remove()
} 

logoutBtn.addEventListener('click', (e) => {
    e.preventDefault()
    localStorage.removeItem('token')
    alert("You have been successfully logged out!")
    window.location.href = 'https://davidudo.github.io/devsearch-api-web/'
})



let projectsUrl = 'https://devsearchweb.herokuapp.com/api/projects/'

let getProjects = () => {

    fetch(projectsUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            buildProjects(data)
        })  

}

let buildProjects = (projects) => {
    let projectsWrapper = document.getElementById('projects--wrapper')
    projectsWrapper.innerHTML = ''
    for (let i = 0; projects.length > i; i++) {
        let project = projects[i]

        let projectCard = `
                <div class="project--card">
                    <img src="${project.featured_image}" />
                    
                    <div> 
                        <div class="card--header">
                            <h3>${project.title}</h3>
                            <strong class="vote--option" data-vote="up" data-project="${project.id}" >&#43;</strong>
                            <strong class="vote--option" data-vote="down" data-project="${project.id}"  >&#8722;</strong>
                        </div>
                        <i>${project.vote_ratio}% Positive feedback </i>
                        <p>${project.description.substring(0, 150)}</p>
                    </div>
                
                </div>
        `
        projectsWrapper.innerHTML += projectCard
    }

    addVoteEvents()

    //Add an listener
}

let addVoteEvents = () => {
    let voteBtns = document.getElementsByClassName('vote--option')

    for (let i = 0; voteBtns.length > i; i++) {

        voteBtns[i].addEventListener('click', (e) => {
            let token = localStorage.getItem('token')
            console.log('TOKEN:', token)
            
            if (token != null) {
              let vote = e.target.dataset.vote
              let project = e.target.dataset.project
  
              fetch(`https://devsearchweb.herokuapp.com/api/projects/${project}/vote/`, {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`
                  },
                  body: JSON.stringify({ 'value': vote })
              })
                  .then(response => response.json())
                  .then(data => {
                      console.log('Success:', data)
                      getProjects()
                  })
            } else {
              alert('You need to login to access this feature.')
            }

        })
    }
} 


getProjects()
