let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector('#toy-collection')
  // fetch to get the data
  fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then((toys) => {
      for (const toy of toys) {
        renderToy(toy)
      }
    })
    //function to render the data
    function renderToy(toy) {
      const div = document.createElement('div')
      div.classList.add("card")
      const name = document.createElement('h2')
      name.textContent = toy.name
      const image = document.createElement('img')
      image.src = toy.image
      image.classList.add("toy-avatar")
      const likes = document.createElement('p')
      likes.textContent = toy.likes
      const button = document.createElement('button')
      button.setAttribute('id', `${toy.id}`)
      button.classList.add("like-btn")
      button.textContent = 'Like ❤️'
      div.appendChild(name)
      div.appendChild(image)
      div.appendChild(likes)
      div.appendChild(button)
      toyCollection.append(div)
      button.addEventListener('click', (e) => {
        const id = e.target.id;
        const likesIncrement = 1; // Increment likes by 1
        const oldLikes = likes.textContent;
        const current = (Number(oldLikes) + Number(likesIncrement));
      
        fetch(`http://localhost:3000/toys/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            likes: `${current}`
          })
        })
        .then(response => response.json())
        .then(updatedToy => {
          // Update the likes value in the DOM
          likes.textContent = updatedToy.likes;
          console.log(updatedToy);
        })
        .catch(error => {
          console.error(error);
        });
      });
      
      
      
    }
  const form = document.querySelector('form')
  // event listener for the submit event
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    // object for the toy which was created
    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value
    }
    // post info
    const options = {
      method: 'POST',
      body: JSON.stringify(newToy),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer mytoken'
      }
    };
    //post request
    fetch('http://localhost:3000/toys', options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(toy => renderToy(toy))
    .catch(error => console.error('Error:', error))
  })

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
 
