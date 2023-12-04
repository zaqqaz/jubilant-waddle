// components/RelatedBlogs.js

import Link from 'next/link';
import styled from 'styled-components';

const WidgetContainer = styled.div`
  margin-top: 30px;
`;

const WidgetHeader = styled.h2`
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const WidgetList = styled.div`
  list-style: none;
  padding: 0;
`;

const WidgetListItem = styled.div`
  margin-bottom: 10px;
`;

const WidgetLink = styled(Link)`
  color: #3498db;
  text-decoration: none;
  font-size: 1.2rem;

  &:hover {
    text-decoration: underline;
  }
`;
export const RelatedBlogs = ({ relatedBlogs }) => {
    return (
        <WidgetContainer>
            <WidgetHeader>You may also find interesting</WidgetHeader>
            <WidgetList>
                {relatedBlogs.map((blog) => (
                    <WidgetListItem key={blog.slug}>
                        <WidgetLink href={`/blog/${blog.slug}`}>
                            {blog.title}
                        </WidgetLink>
                    </WidgetListItem>
                ))}
            </WidgetList>
        </WidgetContainer>
    );
};
