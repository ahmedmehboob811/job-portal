import { User, UserRole, Company, Job, Application } from './types';

// Mock Data

export const USERS: User[] = [
  { id: 1, name: 'Alice Student', email: 'alice@example.com', role: UserRole.STUDENT },
  { id: 2, name: 'Bob Recruiter', email: 'bob@example.com', role: UserRole.RECRUITER, companyId: 1 },
  { id: 3, name: 'Charlie Student', email: 'charlie@example.com', role: UserRole.STUDENT },
];

export const COMPANIES: Company[] = [
  { id: 1, name: 'Innovate Inc.', logoUrl: 'https://via.placeholder.com/150/4F46E5/FFFFFF?Text=I' },
  { id: 2, name: 'CodeGenius', logoUrl: 'https://via.placeholder.com/150/DC2626/FFFFFF?Text=C' },
  { id: 3, name: 'DataWave', logoUrl: 'https://via.placeholder.com/150/16A34A/FFFFFF?Text=D' },
];

export const JOBS: Job[] = [
  {
    id: 1,
    title: 'Frontend Developer',
    description: 'Join our team to build beautiful and responsive user interfaces for our next-gen products.',
    companyId: 1,
    category: 'Software Engineering',
    location: 'Remote',
    experienceLevel: 'Mid-Level',
  },
  {
    id: 2,
    title: 'Backend Engineer',
    description: 'Design and implement scalable backend services and APIs using Node.js and GraphQL.',
    companyId: 2,
    category: 'Software Engineering',
    location: 'New York, NY',
    experienceLevel: 'Senior',
  },
  {
    id: 3,
    title: 'Data Scientist',
    description: 'Analyze large datasets to extract meaningful insights and build predictive models.',
    companyId: 3,
    category: 'Data Science',
    location: 'San Francisco, CA',
    experienceLevel: 'Entry-Level',
  },
  {
    id: 4,
    title: 'Product Manager',
    description: 'Define product vision, strategy, and roadmap. Work with cross-functional teams.',
    companyId: 1,
    category: 'Product Management',
    location: 'Remote',
    experienceLevel: 'Senior',
  },
  {
    id: 5,
    title: 'UX/UI Designer',
    description: 'Create intuitive and visually appealing designs for web and mobile applications.',
    companyId: 2,
    category: 'Design',
    location: 'New York, NY',
    experienceLevel: 'Mid-Level',
  },
];

export const APPLICATIONS: Application[] = [
    {
        id: 1,
        jobId: 2,
        userId: 1,
        userName: 'Alice Student',
        resumeUrl: 'alice_resume.pdf',
        resumeText: `
Alice Student
(123) 456-7890 | alice.student@email.com | linkedin.com/in/alicestudent

Summary
Highly motivated Computer Science student with a passion for backend development. Proficient in Python and Java, with experience in building REST APIs and working with databases. Eager to apply academic knowledge to real-world challenges in a fast-paced environment.

Education
B.S. in Computer Science | State University | 2021 - Present
- GPA: 3.8/4.0
- Relevant Coursework: Data Structures, Algorithms, Database Systems, Web Development

Projects
E-commerce Platform (Backend)
- Developed a RESTful API using Flask for a mock e-commerce site.
- Implemented user authentication, product catalog, and order processing features.
- Utilized PostgreSQL for data storage and SQLAlchemy for ORM.

Skills
- Languages: Python, Java, JavaScript, SQL
- Frameworks: Flask, Spring Boot
- Databases: PostgreSQL, MongoDB
- Tools: Git, Docker, Postman
        `
    },
    {
        id: 2,
        jobId: 2,
        userId: 3,
        userName: 'Charlie Student',
        resumeUrl: 'charlie_resume.pdf',
        resumeText: `
Charlie Student
charlie@web.com

Objective
Seeking a challenging backend engineering role to leverage my skills in distributed systems and cloud computing.

Experience
Software Engineering Intern | Tech Solutions Inc. | Summer 2023
- Contributed to the development of a microservices-based application using Go.
- Wrote unit and integration tests to ensure code quality and reliability.
- Gained experience with AWS services like EC2, S3, and Lambda.

Education
Bachelor of Science in Software Engineering | Tech Institute | Graduated May 2024

Technical Skills
- Programming: Go, Python, C++
- Cloud: AWS, Google Cloud Platform
- Other: Kubernetes, Docker, Terraform, CI/CD
        `
    }
];

export const JOB_CATEGORIES = ['All', 'Software Engineering', 'Data Science', 'Product Management', 'Design', 'Marketing'];
export const JOB_LOCATIONS = ['All', 'Remote', 'New York, NY', 'San Francisco, CA', 'Austin, TX'];
export const EXPERIENCE_LEVELS = ['All', 'Entry-Level', 'Mid-Level', 'Senior'];
