import fs from 'fs';
import Home, {getStaticProps} from "@/pages";

export default Home;
export {getStaticProps};

export const getStaticPaths = async () => {
    const filesInBlogs = fs.readdirSync('./content/blogs');
    const itemsPerPage = 1;
    const totalPages = Math.ceil(filesInBlogs.length / itemsPerPage);

    const paths = Array.from({length: totalPages}, (_, index) => ({
        params: {page: (index + 1).toString()},
    }));

    return {
        paths,
        fallback: false,
    };
};
