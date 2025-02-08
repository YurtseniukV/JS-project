document.addEventListener('DOMContentLoaded', () => {
    const postDetailsContainer = document.querySelector('.postDetailsContainer');
    const postId = new URLSearchParams(window.location.search).get('postId');
    const postApiUrl = `https://jsonplaceholder.typicode.com/posts/${postId}`;

    const fetchPostDetails = async () => {
        try {
            const postResponse = await fetch(postApiUrl);
            const post = await postResponse.json();
            renderPostDetails(post);
        } catch (error) {
            console.error(error);
        }
    };

    const renderPostDetails = (post) => {
        postDetailsContainer.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
        `;
        fetchComments();
    };



    fetchPostDetails();
});
