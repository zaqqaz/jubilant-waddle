import fs from "fs";
import matter from 'gray-matter';

export async function getStaticPropsHomePage({params}) {
    const currentPage = params?.page ? parseInt(params.page, 10) : 1;

    // List of files in the blogs folder
    const filesInBlogs = fs.readdirSync('./content/blogs');

    // Get the front matter and slug (the filename without .md) of all files
    const blogs = filesInBlogs.map((filename) => {
        const file = fs.readFileSync(`./content/blogs/${filename}`, 'utf8');
        const matterData = matter(file);

        return {
            ...matterData.data, // matterData.data contains front matter
            slug: filename.slice(0, filename.indexOf('.')),
        };
    });

    // Pagination logic
    const itemsPerPage = 1;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);
    const totalPages = Math.ceil(blogs.length / itemsPerPage);

    return {
        props: {
            relatedBlogs: getRandomItems(blogs),
            blogs: paginatedBlogs,
            currentPage,
            totalPages,
        },
    };
};

const getRandomItems = (allBlogs, count = 5) => {
    const filteredBlogs = allBlogs; // no filter for now
    const randomItems = [];

    while (randomItems.length < count && filteredBlogs.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredBlogs.length);
        const randomBlog = filteredBlogs.splice(randomIndex, 1)[0];
        randomItems.push(randomBlog);
    }

    return randomItems;
};

export async function getStaticPropsPostPage({params: {slug}}) {

    // List of files in the blogs folder
    const filesInBlogs = fs.readdirSync('./content/blogs');

    // Get the front matter and slug (the filename without .md) of all files
    const blogs = filesInBlogs.map((filename) => {
        const file = fs.readFileSync(`./content/blogs/${filename}`, 'utf8');
        const matterData = matter(file);

        return {
            ...matterData.data, // matterData.data contains front matter
            slug: filename.slice(0, filename.indexOf('.')),
        };
    });

    const fileContent = matter(fs.readFileSync(`./content/blogs/${slug}.md`, 'utf8'))
    let frontmatter = fileContent.data
    const markdown = fileContent.content

    return {
        props: {frontmatter, markdown, relatedBlogs: getRandomItems(blogs),}
    }
}

export async function getStaticPathsPostPages() {
    const filesInProjects = fs.readdirSync('./content/blogs')

    const paths = filesInProjects.map(file => {
        const filename = file.slice(0, file.indexOf('.'))
        return {params: {slug: filename}}
    })

    return {
        paths,
        fallback: false // This shows a 404 page if the page is not found
    }
}
