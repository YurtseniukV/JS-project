document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.querySelector('.usersContainer');
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    const fetchUsers = async () => {
        try {
            const response = await fetch(apiUrl)
            if (!response.ok){
                throw new Error('Failed to fetch users.');
            }
            const users = await response.json();
            renderUsers(users);
        } catch (error) {
            console.error(error);
        }
    };


    const renderUsers = (users) => {
        usersContainer.innerHTML = '';
        users.forEach(user => {
            const userBlock = document.createElement('div');
            userBlock.classList.add('userBlock');
            userBlock.innerHTML = `
                <h3>${user.name}</h3>
                <p>ID: ${user.id}</p>
                <button onclick="goToUserDetails(${user.id})">More details</button>
            `;
            usersContainer.appendChild(userBlock);
        });
    };


    window.goToUserDetails = (userId) => {
        location.href = `user-details.html?id=${userId}`;
    };

    fetchUsers();
});
