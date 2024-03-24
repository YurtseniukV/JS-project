let url = new URL('http://jsonplaceholder.typicode.com/users');

fetch(url)
    .then(value => value.json())
    .then(users => {

        for (const user of users) {
            let userBlock = document.createElement('div');
            userBlock.classList.add('userBlock');

            userBlock.innerText = `ID : ${user.id},  name: ${user.name}`

let button = document.createElement('button');
button.classList.add('userDetails');
button.innerText = 'More details'
            button.addEventListener('click', ()=>{
                location.href = `user-details.html`;
                // user.html?id=${user.id}
            })


            userBlock.appendChild(button);
            document.body.appendChild(userBlock);

        }
    })