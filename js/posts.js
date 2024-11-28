// Завантаження постів із JSON-файлу
document.addEventListener('DOMContentLoaded', async () => {
    const postList = document.getElementById('post-list');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const autocomplete = document.getElementById('autocomplete');

    let posts = [];

    // Завантажити пости
    async function fetchPosts() {
        try {
            const response = await fetch('data/posts.json');
            posts = await response.json();
            displayPosts(posts);
        } catch (error) {
            console.error('Помилка завантаження постів:', error);
        }
    }

    // Відобразити пости
    function displayPosts(filteredPosts) {
        postList.innerHTML = '';
        if (filteredPosts.length === 0) {
            postList.innerHTML = '<p>Пости не знайдено.</p>';
            return;
        }
        filteredPosts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';
            postCard.innerHTML = `
                <img src="${post.image}" alt="${post.title}">
                <h2>${post.title}</h2>
                <p>${post.description}</p>
            `;
            postCard.addEventListener('click', () => openPost(post));
            postList.appendChild(postCard);
        });
    }

    // Відкриття посту
    function openPost(post) {
        const postUrl = `post.html?id=${post.id}`;
        window.location.href = postUrl;
    }

    // Фільтрація та автозаповнення
    function filterPosts() {
        const searchText = searchInput.value.trim().toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filteredPosts = posts.filter(post => {
            // Пошук по кожній букві введеного тексту в назві
            const titleMatches = post.title.toLowerCase().includes(searchText); // Перевірка на наявність введеного тексту в назві поста
            const matchesCategoryFilter = selectedCategory === 'all' || post.category === selectedCategory;

            return titleMatches && matchesCategoryFilter;
        });

        displayPosts(filteredPosts);
        updateAutocomplete(filteredPosts, searchText);
    }

    // Оновлення автозаповнення
    function updateAutocomplete(filteredPosts, searchText) {
        autocomplete.innerHTML = '';
        if (!searchText) {
            autocomplete.style.display = 'none';
            return;
        }

        const suggestions = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(searchText)
        );

        if (suggestions.length === 0) {
            autocomplete.style.display = 'none';
            return;
        }

        suggestions.forEach(post => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = post.title;
            item.addEventListener('click', () => {
                searchInput.value = post.title; // Вставляємо вибрану підказку в поле пошуку
                filterPosts(); // Фільтруємо список
                autocomplete.style.display = 'none'; // Ховаємо підказки
            });
            autocomplete.appendChild(item);
        });

        autocomplete.style.display = 'block';
    }

    // Додати обробники подій
    searchInput.addEventListener('input', filterPosts);
    categoryFilter.addEventListener('change', filterPosts);

    // Виклик завантаження постів
    fetchPosts();
});
