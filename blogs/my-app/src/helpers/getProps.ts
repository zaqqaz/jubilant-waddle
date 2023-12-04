import fs from "fs";
import matter from 'gray-matter';
export async function getStaticPropsHomePage() {
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

    return {
        props: {
            blogs,
        },
    };
}

export async function getStaticPropsPostPage({params: {slug}}) {
    const fileContent = matter(fs.readFileSync(`./content/blogs/${slug}.md`, 'utf8'))
    let frontmatter = fileContent.data
    const markdown = fileContent.content

    return {
        props: {frontmatter, markdown}
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
