// Load project data and generate project grid
window.addEventListener('load', () => {
    fetch('data/project_data.json')
        .then(response => response.json())
        .then(data => {
            createProjectGrid(data);
        })
        .catch(error => console.error('Error loading project data:', error));
});

function createProjectGrid(projects) {
    const projectGrid = document.getElementById('project_grid');
    projectGrid.innerHTML = ''; // Clear any existing tiles

    projects.forEach((project) => {
        const projectTile = document.createElement('div');
        projectTile.classList.add('project_container');

        // Title and Link on the same line
        const titleLinkContainer = document.createElement('div');
        titleLinkContainer.classList.add('title_link_container');

        // Project title
        const title = document.createElement('span');
        title.classList.add('project_title');
        title.textContent = project.title;

        // Dash separator
        const dash = document.createElement('span');
        dash.textContent = ' - ';
		dash.classList.add('dash_separator')


        // PDF link logic
        const pdfFileName = project.pdf_file;
        const pdfLink = document.createElement('a');

        // Check if the file name contains ".pdf"
        if (pdfFileName.includes('.pdf')) {
            // Use the assets folder for PDF files
            pdfLink.href = `../assets/${pdfFileName}`;
        } else {
            // Use the value from project.pdf_file as a custom link
            pdfLink.href = project.pdf_file;
        }

        pdfLink.target = '_blank';
        pdfLink.textContent = ' Link';
        pdfLink.classList.add('pdf_link');


        // Append title and link to the container
        titleLinkContainer.appendChild(title);
        titleLinkContainer.appendChild(dash);
        titleLinkContainer.appendChild(pdfLink);

        // Project description
        const description = document.createElement('p');
        description.classList.add('project_description');
        const firstParagraph = project.body.find(item => item.type === 'p');
        description.textContent = firstParagraph ? firstParagraph.content : 'No description available.';

        // Project tags
        const tagContainer = document.createElement('div');
        tagContainer.classList.add('tag_container');
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('tag');
            tagElement.textContent = tag;
            tagContainer.appendChild(tagElement);
        });

        // Append elements to project tile
        projectTile.appendChild(titleLinkContainer);
        projectTile.appendChild(description);
        projectTile.appendChild(tagContainer);

        projectGrid.appendChild(projectTile);
    });
}
