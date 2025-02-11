// Load blog data and generate blog grid
window.addEventListener('load', () => {
    fetch('../data/blog_data.json')
        .then(response => response.json())
        .then(data => {
            createBlogGrid(data);
        })
        .catch(error => console.error('Error loading blog data:', error));
});

function createBlogGrid(blogs) {
    const blogGrid = document.getElementById('blog_grid');
    blogGrid.innerHTML = ''; // Clear any existing tiles

    blogs.forEach((blog) => {
        // Create blog tile container
        const blogTile = document.createElement('div');
        blogTile.classList.add('blog_tile');

        // Blog title
        const title = document.createElement('h2');
        title.textContent = blog.title;

        // Date posted
        const date = document.createElement('p');
        date.classList.add('blog_date');
        date.textContent = blog.date;

        // Description
        const description = document.createElement('p');
        description.classList.add('blog_description');
        description.textContent = blog.description;

        // Tags
        const tagContainer = document.createElement('div');
        tagContainer.classList.add('tag_container');
        blog.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('tag');
            tagElement.textContent = tag;
            tagContainer.appendChild(tagElement);
        });

        // Link to blog post
        const link = document.createElement('a');
        link.href = blog.link;
        link.textContent = 'Read More →';
        link.classList.add('blog_link');

        // Append everything to the blog tile
        blogTile.appendChild(title);
        blogTile.appendChild(date);
        blogTile.appendChild(description);
        blogTile.appendChild(tagContainer);
        blogTile.appendChild(link);

        blogGrid.appendChild(blogTile);
    });
}
