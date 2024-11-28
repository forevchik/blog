// Load recent posts dynamically
const postsUrl = 'data/posts.json';

async function loadPosts() {
    const res = await fetch(postsUrl);
    const posts = await res.json();
    const postGrid = document.getElementById('post-grid');
    posts.slice(0, 3).forEach(post => {
        postGrid.innerHTML += `
            <article class="post-card">
                <img src="${post.image}" alt="${post.title}">
                <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
                <p>${post.description}</p>
            </article>`;
    });
}

document.addEventListener('DOMContentLoaded', loadPosts);
