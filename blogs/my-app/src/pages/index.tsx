import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import { getStaticPropsHomePage } from '@/helpers/getProps';

// Styled components with updated styles
const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #7f8c8d;
  margin-bottom: 30px;
`;

const BlogList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BlogListItem = styled.li`
  margin-bottom: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
`;

const BlogLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;

  &:hover {
    text-decoration: underline;
  }
`;

// Component
export default function Home({ blogs }) {
    return (
        <Container>
            <Head>
                <title>My Awesome Blog</title>
            </Head>
            <Header>Welcome to My Awesome Blog</Header>
            <Subtitle>Discover the latest in device reviews and more!</Subtitle>
            <BlogList>
                {blogs.map((blog) => (
                    <BlogListItem key={blog.slug}>
                        <BlogLink href={`/blog/${blog.slug}`}>
                            {blog.date}: {blog.title}
                        </BlogLink>
                    </BlogListItem>
                ))}
            </BlogList>
        </Container>
    );
}

// Use 'getStaticProps' from styled component file
export const getStaticProps = getStaticPropsHomePage;
