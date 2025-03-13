export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: number;
  industry: string;
  description: string;
  requirements: string[];
  posted: string;
  applicationStatus?: 'saved' | 'applied' | 'interviewing' | 'rejected' | 'accepted';
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface FilterOptions {
  location: string;
  minSalary: number;
  industry: string;
}

export type SortOption = 'recent' | 'salary';