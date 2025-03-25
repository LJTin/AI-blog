import { BlogPost } from '@/types/blog';

let posts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js',
    content: 'Next.js is a powerful framework for building React applications. It provides a great developer experience with features like server-side rendering, static site generation, and API routes out of the box.',
    excerpt: 'Learn how to get started with Next.js and build modern web applications.',
    createdAt: '2024-03-20T10:00:00Z',
    updatedAt: '2024-03-20T10:00:00Z',
    author: 'John Doe',
    slug: 'getting-started-with-nextjs',
    tags: ['Next.js', 'React', 'Web Development'],
  },
  {
    id: '2',
    title: 'Understanding TypeScript',
    content: 'TypeScript adds static typing to JavaScript, making it easier to write and maintain large-scale applications. It helps catch errors early in development.',
    excerpt: 'A comprehensive guide to understanding and using TypeScript in your projects.',
    createdAt: '2024-03-19T15:30:00Z',
    updatedAt: '2024-03-19T15:30:00Z',
    author: 'Jane Smith',
    slug: 'understanding-typescript',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
  },
  {
    id: '3',
    title: 'The Art of CSS Grid',
    content: 'CSS Grid is a powerful layout system that allows you to create complex web layouts with ease. Learn how to master this essential web design tool.',
    excerpt: 'Master the art of CSS Grid and create beautiful, responsive layouts.',
    createdAt: '2024-03-18T09:15:00Z',
    updatedAt: '2024-03-18T09:15:00Z',
    author: 'Mike Johnson',
    slug: 'art-of-css-grid',
    tags: ['CSS', 'Web Design', 'Frontend'],
  },
  {
    id: '4',
    title: 'Building REST APIs with Node.js',
    content: 'Node.js and Express make it easy to build powerful REST APIs. Learn the best practices and common patterns for API development.',
    excerpt: 'A practical guide to building REST APIs using Node.js and Express.',
    createdAt: '2024-03-17T14:20:00Z',
    updatedAt: '2024-03-17T14:20:00Z',
    author: 'Sarah Wilson',
    slug: 'building-rest-apis-nodejs',
    tags: ['Node.js', 'API', 'Backend'],
  },
  {
    id: '5',
    title: 'Docker for Beginners',
    content: 'Docker is a platform for developing, shipping, and running applications in containers. Learn how to containerize your applications.',
    excerpt: 'Get started with Docker and learn how to containerize your applications.',
    createdAt: '2024-03-16T11:45:00Z',
    updatedAt: '2024-03-16T11:45:00Z',
    author: 'David Brown',
    slug: 'docker-for-beginners',
    tags: ['Docker', 'DevOps', 'Containers'],
  },
  {
    id: '6',
    title: 'GraphQL vs REST',
    content: 'GraphQL and REST are two popular approaches to building APIs. Learn about their differences and when to use each.',
    excerpt: 'Compare GraphQL and REST APIs to choose the right approach for your project.',
    createdAt: '2024-03-15T16:30:00Z',
    updatedAt: '2024-03-15T16:30:00Z',
    author: 'Emily Davis',
    slug: 'graphql-vs-rest',
    tags: ['GraphQL', 'API', 'Backend'],
  },
  {
    id: '7',
    title: 'Testing React Applications',
    content: 'Testing is crucial for building reliable applications. Learn how to test React components and applications effectively.',
    excerpt: 'Learn best practices for testing React applications and components.',
    createdAt: '2024-03-14T13:15:00Z',
    updatedAt: '2024-03-14T13:15:00Z',
    author: 'Tom Wilson',
    slug: 'testing-react-applications',
    tags: ['React', 'Testing', 'Frontend'],
  },
  {
    id: '8',
    title: 'MongoDB Best Practices',
    content: 'MongoDB is a popular NoSQL database. Learn the best practices for working with MongoDB in your applications.',
    excerpt: 'Essential best practices for working with MongoDB in your applications.',
    createdAt: '2024-03-13T10:45:00Z',
    updatedAt: '2024-03-13T10:45:00Z',
    author: 'Lisa Chen',
    slug: 'mongodb-best-practices',
    tags: ['MongoDB', 'Database', 'Backend'],
  },
  {
    id: '9',
    title: 'Web Security Fundamentals',
    content: 'Security is crucial for web applications. Learn about common security threats and how to protect your applications.',
    excerpt: 'Essential security practices for web applications and developers.',
    createdAt: '2024-03-12T15:20:00Z',
    updatedAt: '2024-03-12T15:20:00Z',
    author: 'Alex Thompson',
    slug: 'web-security-fundamentals',
    tags: ['Security', 'Web Development', 'Best Practices'],
  },
  {
    id: '10',
    title: 'CI/CD with GitHub Actions',
    content: 'GitHub Actions makes it easy to automate your development workflow. Learn how to set up CI/CD pipelines.',
    excerpt: 'Set up continuous integration and deployment with GitHub Actions.',
    createdAt: '2024-03-11T09:30:00Z',
    updatedAt: '2024-03-11T09:30:00Z',
    author: 'Rachel Green',
    slug: 'cicd-github-actions',
    tags: ['CI/CD', 'DevOps', 'GitHub'],
  },
  {
    id: '11',
    title: 'State Management in React',
    content: 'Managing state in React applications can be challenging. Learn about different approaches and when to use them.',
    excerpt: 'Understanding state management in React applications.',
    createdAt: '2024-03-10T14:15:00Z',
    updatedAt: '2024-03-10T14:15:00Z',
    author: 'Chris Anderson',
    slug: 'state-management-react',
    tags: ['React', 'State Management', 'Frontend'],
  },
  {
    id: '12',
    title: 'AWS Lambda Functions',
    content: 'AWS Lambda is a serverless compute service. Learn how to build and deploy serverless functions.',
    excerpt: 'Build and deploy serverless functions with AWS Lambda.',
    createdAt: '2024-03-09T11:20:00Z',
    updatedAt: '2024-03-09T11:20:00Z',
    author: 'Mark Taylor',
    slug: 'aws-lambda-functions',
    tags: ['AWS', 'Serverless', 'Cloud'],
  },
  {
    id: '13',
    title: 'Python for Data Science',
    content: 'Python is a powerful language for data science. Learn about essential libraries and tools for data analysis.',
    excerpt: 'Essential Python tools and libraries for data science.',
    createdAt: '2024-03-08T16:45:00Z',
    updatedAt: '2024-03-08T16:45:00Z',
    author: 'Sophie Chen',
    slug: 'python-data-science',
    tags: ['Python', 'Data Science', 'Programming'],
  },
  {
    id: '14',
    title: 'Kubernetes Basics',
    content: 'Kubernetes is the standard for container orchestration. Learn the basics of deploying and managing containerized applications.',
    excerpt: 'Get started with Kubernetes and container orchestration.',
    createdAt: '2024-03-07T13:30:00Z',
    updatedAt: '2024-03-07T13:30:00Z',
    author: 'James Wilson',
    slug: 'kubernetes-basics',
    tags: ['Kubernetes', 'DevOps', 'Containers'],
  },
  {
    id: '15',
    title: 'Machine Learning Fundamentals',
    content: 'Machine learning is transforming industries. Learn the basics of ML and how to get started.',
    excerpt: 'Introduction to machine learning concepts and applications.',
    createdAt: '2024-03-06T10:15:00Z',
    updatedAt: '2024-03-06T10:15:00Z',
    author: 'Emma Davis',
    slug: 'machine-learning-fundamentals',
    tags: ['Machine Learning', 'AI', 'Data Science'],
  }
];

export const getPosts = () => posts;
export const getPost = (id: string) => posts.find(post => post.id === id);
export const getPostBySlug = (slug: string) => posts.find(post => post.slug === slug);

export const createPost = (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newPost: BlogPost = {
    ...post,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.push(newPost);
  return newPost;
};

export const updatePost = (id: string, post: Partial<BlogPost>) => {
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  posts[index] = {
    ...posts[index],
    ...post,
    updatedAt: new Date().toISOString(),
  };
  return posts[index];
};

export const deletePost = (id: string) => {
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  posts = posts.filter(p => p.id !== id);
  return true;
}; 