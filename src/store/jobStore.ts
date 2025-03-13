import { create } from 'zustand';
import { Job, FilterOptions, SortOption } from '../types';

interface JobState {
  jobs: Job[];
  savedJobs: Set<string>;
  currentPage: number;
  itemsPerPage: number;
  filterOptions: FilterOptions;
  sortOption: SortOption;
  setFilterOptions: (options: FilterOptions) => void;
  setSortOption: (option: SortOption) => void;
  setCurrentPage: (page: number) => void;
  toggleSaveJob: (jobId: string) => void;
  updateApplicationStatus: (jobId: string, status: Job['applicationStatus']) => void;
}

// Sample job data
const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechVision Industries',
    location: 'Bengaluru, Karnataka',
    salary: 25,
    industry: 'Technology',
    description: "Join our innovative team to build cutting-edge web applications using React, TypeScript, and modern frontend technologies. You'll work on projects that impact millions of users.",
    requirements: ['5+ years React experience', 'TypeScript expertise', 'State Management (Redux/MobX)', 'Performance optimization'],
    posted: '2024-03-15',
  },
  {
    id: '2',
    title: 'Full Stack Engineer',
    company: 'InnovateX Solutions',
    location: 'Mumbai, Maharashtra',
    salary: 28,
    industry: 'Technology',
    description: "Looking for a passionate full-stack developer to join our fast-growing startup. You'll work on our core product and help shape the future of our platform.",
    requirements: ['Node.js', 'React', 'MongoDB', 'AWS', 'Microservices'],
    posted: '2024-03-14',
  },
  {
    id: '3',
    title: 'AI/ML Engineer',
    company: 'DataMinds Analytics',
    location: 'Hyderabad, India',
    salary: 30,
    industry: 'Artificial Intelligence',
    description: 'Join our AI team to develop cutting-edge machine learning solutions for enterprise clients. Work with the latest AI technologies and large-scale data.',
    requirements: ['Python', 'TensorFlow/PyTorch', 'Computer Vision', 'MLOps'],
    posted: '2024-03-13',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    company: 'CloudTech Solutions',
    location: 'Chennai, India',
    salary: 22,
    industry: 'Cloud Computing',
    description: 'Looking for an experienced DevOps engineer to improve and maintain our cloud infrastructure and CI/CD pipelines.',
    requirements: ['AWS/Azure', 'Kubernetes', 'Docker', 'Jenkins', 'Terraform'],
    posted: '2024-03-12',
  },
  {
    id: '5',
    title: 'Product Manager',
    company: 'Innovation Labs',
    location: 'Mumbai, India',
    salary: 27,
    industry: 'Product Management',
    description: 'Lead product development for our flagship SaaS platform. Work closely with engineering, design, and business teams.',
    requirements: ['3+ years PM experience', 'Technical background', 'Agile/Scrum', 'Data analysis'],
    posted: '2024-03-11',
  },
  {
    id: '6',
    title: 'Mobile App Developer',
    company: 'AppCraft Technologies',
    location: 'Pune, India',
    salary: 18,
    industry: 'Mobile Development',
    description: 'Develop high-quality mobile applications for iOS and Android platforms using React Native.',
    requirements: ['React Native', 'JavaScript/TypeScript', 'Native modules', 'App Store deployment'],
    posted: '2024-03-10',
  },
  {
    id: '7',
    title: 'UI/UX Designer',
    company: 'DesignFirst Digital',
    location: 'Delhi, India',
    salary: 15,
    industry: 'Design',
    description: 'Create beautiful and intuitive user interfaces for web and mobile applications. Work on multiple projects with different design challenges.',
    requirements: ['Figma/Sketch', 'User Research', 'Prototyping', 'Design Systems'],
    posted: '2024-03-09',
  },
  {
    id: '8',
    title: 'Blockchain Developer',
    company: 'CryptoTech Solutions',
    location: 'Bangalore, India',
    salary: 26,
    industry: 'Blockchain',
    description: 'Develop decentralized applications and smart contracts. Work with multiple blockchain platforms and protocols.',
    requirements: ['Solidity', 'Web3.js', 'Smart Contracts', 'DeFi experience'],
    posted: '2024-03-08',
  },
  {
    id: '9',
    title: 'Data Engineer',
    company: 'DataFlow Systems',
    location: 'Hyderabad, India',
    salary: 24,
    industry: 'Data Engineering',
    description: 'Build and maintain data pipelines, warehouses, and ETL processes. Work with big data technologies and cloud platforms.',
    requirements: ['Python', 'SQL', 'Apache Spark', 'AWS/GCP', 'Airflow'],
    posted: '2024-03-07',
  },
  {
    id: '10',
    title: 'Technical Project Manager',
    company: 'Project Solutions Ltd',
    location: 'Chennai, India',
    salary: 29,
    industry: 'Project Management',
    description: 'Lead technical projects from inception to delivery. Manage multiple teams and stakeholders across different time zones.',
    requirements: ['PMP certification', 'Agile methodologies', 'Technical background', 'Stakeholder management'],
    posted: '2024-03-06',
  },
  {
    id: '11',
    title: 'Backend Developer',
    company: 'ServerLogic Systems',
    location: 'Pune, Maharashtra',
    salary: 22,
    industry: 'Technology',
    description: 'Join our backend team to build scalable APIs and microservices using Node.js and Python.',
    requirements: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'API Design'],
    posted: '2024-03-05',
  },
  {
    id: '12',
    title: 'Data Scientist',
    company: 'Analytics Hub',
    location: 'Bengaluru, Karnataka',
    salary: 28,
    industry: 'Data Science',
    description: 'Work on advanced analytics projects using machine learning and statistical modeling.',
    requirements: ['Python', 'R', 'Machine Learning', 'Statistical Analysis', 'SQL'],
    posted: '2024-03-04',
  },
  {
    id: '13',
    title: 'Cloud Architect',
    company: 'CloudFirst Technologies',
    location: 'Mumbai, Maharashtra',
    salary: 35,
    industry: 'Cloud Computing',
    description: 'Design and implement cloud-native solutions for enterprise clients.',
    requirements: ['AWS Solutions Architect', 'Azure', 'Cloud Migration', 'Microservices'],
    posted: '2024-03-03',
  },
  {
    id: '14',
    title: 'Security Engineer',
    company: 'SecureNet Solutions',
    location: 'Hyderabad, Telangana',
    salary: 26,
    industry: 'Cybersecurity',
    description: 'Implement and maintain security measures across our infrastructure.',
    requirements: ['Network Security', 'CISSP', 'Penetration Testing', 'Security Auditing'],
    posted: '2024-03-02',
  },
  {
    id: '15',
    title: 'Quality Assurance Lead',
    company: 'QualityFirst Software',
    location: 'Chennai, Tamil Nadu',
    salary: 20,
    industry: 'Technology',
    description: 'Lead the QA team in implementing automated testing strategies.',
    requirements: ['Selenium', 'Jest', 'CI/CD', 'Test Planning', 'Team Leadership'],
    posted: '2024-03-01',
  },
  {
    id: '16',
    title: 'Solutions Architect',
    company: 'Enterprise Systems Ltd',
    location: 'Noida, Uttar Pradesh',
    salary: 32,
    industry: 'Technology',
    description: 'Design and architect enterprise-level software solutions.',
    requirements: ['System Design', 'Enterprise Architecture', 'Technical Leadership', 'Cloud Platforms'],
    posted: '2024-02-29',
  },
  {
    id: '17',
    title: 'Performance Engineer',
    company: 'SpeedTech Solutions',
    location: 'Bengaluru, Karnataka',
    salary: 25,
    industry: 'Technology',
    description: 'Optimize application performance and implement monitoring solutions.',
    requirements: ['Performance Testing', 'APM Tools', 'Load Testing', 'System Optimization'],
    posted: '2024-02-28',
  },
  {
    id: '18',
    title: 'ML Operations Engineer',
    company: 'AI Systems India',
    location: 'Pune, Maharashtra',
    salary: 27,
    industry: 'Artificial Intelligence',
    description: 'Build and maintain ML infrastructure and deployment pipelines.',
    requirements: ['MLOps', 'Docker', 'Kubernetes', 'Python', 'CI/CD for ML'],
    posted: '2024-02-27',
  }
];

export const useJobStore = create<JobState>((set) => ({
  jobs: sampleJobs,
  savedJobs: new Set(),
  currentPage: 1,
  itemsPerPage: 6,
  filterOptions: {
    location: '',
    minSalary: 0,
    industry: '',
  },
  sortOption: 'recent',
  setFilterOptions: (options) => set({ filterOptions: options, currentPage: 1 }),
  setSortOption: (option) => set({ sortOption: option, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  toggleSaveJob: (jobId) =>
    set((state) => {
      const newSavedJobs = new Set(state.savedJobs);
      if (newSavedJobs.has(jobId)) {
        newSavedJobs.delete(jobId);
      } else {
        newSavedJobs.add(jobId);
      }
      return { savedJobs: newSavedJobs };
    }),
  updateApplicationStatus: (jobId, status) =>
    set((state) => ({
      jobs: state.jobs.map((job) =>
        job.id === jobId ? { ...job, applicationStatus: status } : job
      ),
    })),
}));