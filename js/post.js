// Отримуємо параметри з URL
const params = new URLSearchParams(window.location.search);
let postId = params.get('id'); 

// Дані постів
const posts = [
    {
        id: 1,
        title: "How to Start Coding",
        description: `
1. Define Your Goal  
Start by identifying why you want to learn coding. Whether it’s building websites, creating apps, or automating tasks, having a clear purpose will guide your learning path.

2. Choose a Programming Language  
Select a beginner-friendly language like Python, JavaScript, or Scratch. Each language serves different purposes, so pick one aligned with your goals.

3. Set Up Your Environment  
Install necessary tools such as a code editor (e.g., VS Code) and learn how to use version control systems like Git to manage your code.

4. Learn the Basics  
Understand fundamental concepts like variables, loops, and functions. Use free resources like online tutorials, coding platforms, or YouTube videos.

5. Practice with Small Projects  
Apply what you’ve learned by creating simple projects, like a calculator, to-do list app, or a basic webpage. Hands-on practice solidifies your skills.

6. Explore Online Coding Platforms  
Use platforms like Codecademy, freeCodeCamp, or LeetCode to access structured courses and practice problems.

7. Join a Community  
Engage with other learners on forums like Stack Overflow, Reddit, or local meetups. A support network can keep you motivated and help solve challenges.

8. Debugging Skills  
Learn how to debug your code using error messages, debugging tools, and online resources. Problem-solving is a crucial part of coding.

9. Expand Your Knowledge  
Once comfortable with basics, explore advanced topics like data structures, algorithms, or frameworks related to your chosen language.

10. Build a Portfolio  
Showcase your work by creating a GitHub profile or a personal website. Employers and collaborators value tangible projects.
`
,
        image: "images/post1.jpg"
    },
    {
        id: 2,
        title: "Top 10 Web Design Trends",
        description: `
1. Minimalism and Simplified Layouts  
Clean, uncluttered designs with plenty of white space continue to dominate.

2. Dark Mode  
With dark mode's popularity rising, many designers are adopting it.

3. 3D and Immersive Design Elements  
Three-dimensional graphics, animations, and parallax scrolling create depth and realism.

4. Micro-Animations and Interactive Elements  
Small animations, like hover effects and transitions, make websites feel dynamic and alive.

5. Bold Typography  
Oversized fonts grab attention and convey a brand's personality.

6. AI-Powered Personalization  
Websites leverage AI for personalized content and improved user engagement.

7. Asymmetrical Layouts  
Creative, dynamic compositions break away from traditional grid-based designs.

8. Sustainable and Eco-Friendly Design  
Energy-efficient practices and eco-conscious branding are shaping design strategies.

9. Neumorphism (Soft UI)  
Soft shadows and smooth, 3D-like elements combine flat design and skeuomorphism.

10. Voice User Interface (VUI)  
Voice search and navigation enhance hands-free user experiences.
`
,
        image: "images/post2.png"
    }
];

// Завантаження посту
const post = posts.find(p => p.id == postId);

if (post) {
    document.querySelector('.blog-title').textContent = post.title;
    document.querySelector('.blog-image').src = post.image;

    const contentContainer = document.querySelector('.blog-content');
    const descriptionLines = post.description.split('\n').filter(line => line.trim() !== '');
    descriptionLines.forEach(line => {
        const element = /^\d+\./.test(line) ? document.createElement('h2') : document.createElement('p');
        element.textContent = line.trim();
        contentContainer.appendChild(element);
    });
} else {
    document.querySelector('.blog-container').innerHTML = '<p>Post not found.</p>';
}

// Коментарі
const commentsKey = `comments_${postId}`;
const commentsList = document.getElementById('commentsList');

function loadComments() {
    const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
    commentsList.innerHTML = '';
    comments
        .slice()
        .reverse()
        .forEach(({ name, comment, timestamp }) => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');

            const date = new Date(timestamp);
            const formattedDate = date.toLocaleString();

            commentElement.innerHTML = `
                <h3>${name}</h3>
                <p>${comment}</p>
                <small>${formattedDate}</small>
            `;
            commentsList.appendChild(commentElement);
        });
}

document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('nameInput').value;
    const comment = document.getElementById('commentInput').value;

    const comments = JSON.parse(localStorage.getItem(commentsKey)) || [];
    const timestamp = new Date().toISOString();

    comments.push({ name, comment, timestamp });
    localStorage.setItem(commentsKey, JSON.stringify(comments));

    document.getElementById('nameInput').value = '';
    document.getElementById('commentInput').value = '';
    loadComments();
});

// Очищення коментарів, якщо кнопка існує
const clearCommentsButton = document.getElementById('clearCommentsButton');
if (clearCommentsButton) {
    clearCommentsButton.addEventListener('click', function () {
        localStorage.removeItem(commentsKey); // Видаляємо коментарі з localStorage
        loadComments(); // Оновлюємо відображення
    });
}

loadComments();