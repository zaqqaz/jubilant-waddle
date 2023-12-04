import ReactMarkdown from 'react-markdown';
import Head from 'next/head';
import styled from 'styled-components';
import { getStaticPropsPostPage, getStaticPathsPostPages } from '@/helpers/getProps';
import {RelatedBlogs} from "@/components/RelatedBlogs";

// Styled components with updated styles
const BlogContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const BlogTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const BlogDate = styled.span`
  font-size: 1rem;
  color: #7f8c8d;
  display: block;
  margin-bottom: 20px;
`;

const BlogDivider = styled.hr`
  border: 1px solid #bdc3c7;
  margin-bottom: 20px;
`;

const MarkdownContent = styled(ReactMarkdown)`
  font-size: 1.2rem;
  color: #333;
`;

// Component
export default function Blog({ frontmatter, markdown, relatedBlogs }) {
    const title = `${frontmatter.title} | My Blog`;

    return (
        <BlogContainer>
            <Head>
                <title>{title}</title>
            </Head>
            <BlogTitle>{frontmatter.title}</BlogTitle>
            <BlogDate>{frontmatter.date}</BlogDate>
            <BlogDivider />
            <MarkdownContent>{markdown}</MarkdownContent>
            <RelatedBlogs relatedBlogs={relatedBlogs}/>
        </BlogContainer>
    );
}

// Use 'getStaticProps' and 'getStaticPaths' from styled component file
export const getStaticProps = getStaticPropsPostPage;
export const getStaticPaths = getStaticPathsPostPages;
