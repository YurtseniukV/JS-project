document.addEventListener('DOMContentLoaded', () => {
    const userDetailsContainer = document.querySelector('.userDetailsContainer');
    const userId = new URLSearchParams(window.location.search).get('id');
    const userApiUrl = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const postsApiUrl = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

    let postsVisible = false;

    const fetchUserDetails = async () => {
        try {
            const userResponse = await fetch(userApiUrl);
            const user = await userResponse.json();
            renderUserDetails(user);
        } catch (error) {
            console.error(error);
        }
    };

    const renderUserDetails = (user) => {
        userDetailsContainer.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Website:</strong> ${user.website}</a></p>
            <button id="viewPostsButton">View Posts</button>
        `;
        const postsButton = document.querySelector('#viewPostsButton');
        if (postsButton) {
            postsButton.addEventListener('click', togglePostsVisibility);
        }
    };

    const togglePostsVisibility = async () => {
        if (!postsVisible) {
            const posts = await fetchPosts();
            renderPosts(posts);
        } else {
            hidePosts();
        }
        postsVisible = !postsVisible;
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch(postsApiUrl);
            const posts = await response.json();
            return posts;
        } catch (error) {
            console.error(error);
        }
    };

    const renderPosts = (posts) => {
        const postsContainer = document.createElement('div');
        postsContainer.classList.add('postsContainer');
        posts.forEach(post => {
            const postBlock = document.createElement('div');
            postBlock.classList.add('postBlock');
            postBlock.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <a href="post-details.html?postId=${post.id}">Read more...</a>
            `;
            postsContainer.appendChild(postBlock);
        });
        userDetailsContainer.appendChild(postsContainer);
    };

    const hidePosts = () => {
        const postsContainer = document.querySelector('.postsContainer');
        if (postsContainer) {
            postsContainer.remove();
        }
    };

    fetchUserDetails();
});
