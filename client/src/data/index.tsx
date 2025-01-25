export type Stages = 'new' | 'inProgress' | 'done';

export const stages = ['new', 'inProgress', 'done'] as const;

export interface Task {
  id: string;
  title: string;
  company: string;
  category: string;
  date: string;
  dateRange?: {
    start: string;
    end: string;
  };
  timeEstimate?: string;
  stage: 'new' | 'inProgress' | 'done';
  assignee?: User;
  important?: boolean;
}

export interface User {
  id: string;
  name: string;
  image?: string;
}

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Implement Authentication',
    company: 'TechCorp',
    category: 'Development',
    date: '2023-10-01',
    dateRange: {
      start: '2023-10-01',
      end: '2023-10-05',
    },
    timeEstimate: '5 days',
    stage: 'inProgress',
    assignee: {
      id: '1',
      name: 'Alice Johnson',
      image: 'https://example.com/images/alice.jpg',
    },
    important: false,
  },
  {
    id: '2',
    title: 'Design Database Schema',
    company: 'TechCorp',
    category: 'Development',
    date: '2023-10-02',
    timeEstimate: '3 days',
    stage: 'new',
    assignee: {
      id: '2',
      name: 'Bob Smith',
      image: 'https://example.com/images/bob.jpg',
    },
    important: true,
  },
  {
    id: '3',
    title: 'Setup CI/CD Pipeline',
    company: 'TechCorp',
    category: 'DevOps',
    date: '2023-10-03',
    dateRange: {
      start: '2023-10-03',
      end: '2023-10-04',
    },
    timeEstimate: '2 days',
    stage: 'done',
    assignee: {
      id: '3',
      name: 'Charlie Brown',
      image: 'https://example.com/images/charlie.jpg',
    },
    important: false,
  },
  {
    id: '4',
    title: 'Conduct User Testing',
    company: 'TechCorp',
    category: 'QA',
    date: '2023-10-04',
    timeEstimate: '1 day',
    stage: 'inProgress',
    assignee: {
      id: '4',
      name: 'Diana Prince',
      image: 'https://example.com/images/diana.jpg',
    },
    important: true,
  },
  {
    id: '5',
    title: 'Prepare Release Notes',
    company: 'TechCorp',
    category: 'Documentation',
    date: '2023-10-05',
    timeEstimate: '2 days',
    stage: 'new',
    assignee: {
      id: '5',
      name: 'Eve Adams',
      image: 'https://example.com/images/eve.jpg',
    },
    important: false,
  },
  {
    id: '6',
    title: 'Optimize Performance',
    company: 'TechCorp',
    category: 'Development',
    date: '2023-10-06',
    dateRange: {
      start: '2023-10-06',
      end: '2023-10-08',
    },
    timeEstimate: '3 days',
    stage: 'inProgress',
    assignee: {
      id: '6',
      name: 'Frank Castle',
      image: 'https://example.com/images/frank.jpg',
    },
    important: true,
  },
  {
    id: '7',
    title: 'Update Dependencies',
    company: 'TechCorp',
    category: 'Maintenance',
    date: '2023-10-07',
    timeEstimate: '1 day',
    stage: 'done',
    assignee: {
      id: '7',
      name: 'Grace Hopper',
      image: 'https://example.com/images/grace.jpg',
    },
    important: false,
  },
  {
    id: '8',
    title: 'Refactor Codebase',
    company: 'TechCorp',
    category: 'Development',
    date: '2023-10-08',
    dateRange: {
      start: '2023-10-08',
      end: '2023-10-12',
    },
    timeEstimate: '5 days',
    stage: 'new',
    assignee: {
      id: '8',
      name: 'Hank Pym',
      image: 'https://example.com/images/hank.jpg',
    },
    important: true,
  },
  {
    id: '9',
    title: 'Implement Dark Mode',
    company: 'TechCorp',
    category: 'Development',
    date: '2023-10-09',
    timeEstimate: '2 days',
    stage: 'inProgress',
    assignee: {
      id: '9',
      name: 'Ivy Pepper',
      image: 'https://example.com/images/ivy.jpg',
    },
    important: false,
  },
  {
    id: '10',
    title: 'Fix Security Vulnerabilities',
    company: 'TechCorp',
    category: 'Security',
    date: '2023-10-10',
    timeEstimate: '1 day',
    stage: 'done',
    assignee: {
      id: '10',
      name: 'Jack Ryan',
      image: 'https://example.com/images/jack.jpg',
    },
    important: true,
  },
  {
    id: '11',
    title: 'Improve Accessibility',
    company: 'TechCorp',
    category: 'Development',
    date: '2023-10-11',
    dateRange: {
      start: '2023-10-11',
      end: '2023-10-13',
    },
    timeEstimate: '3 days',
    stage: 'new',
    assignee: {
      id: '11',
      name: 'Karen Page',
      image: 'https://example.com/images/karen.jpg',
    },
    important: false,
  },
  {
    id: '12',
    title: 'Conduct Code Review',
    company: 'TechCorp',
    category: 'Development',
    date: '2023-10-12',
    timeEstimate: '1 day',
    stage: 'inProgress',
    assignee: {
      id: '12',
      name: 'Leo Fitz',
      image: 'https://example.com/images/leo.jpg',
    },
    important: true,
  },
  {
    id: '13',
    title: 'Deploy to Production',
    company: 'TechCorp',
    category: 'DevOps',
    date: '2023-10-13',
    timeEstimate: '1 day',
    stage: 'done',
    assignee: {
      id: '13',
      name: 'Maya Lopez',
      image: 'https://example.com/images/maya.jpg',
    },
    important: false,
  },
];

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    image: 'https://example.com/images/alice.jpg',
  },
  {
    id: '2',
    name: 'Bob Smith',
    image: 'https://example.com/images/bob.jpg',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    image: 'https://example.com/images/charlie.jpg',
  },
  {
    id: '4',
    name: 'Diana Prince',
    image: 'https://example.com/images/diana.jpg',
  },
  {
    id: '5',
    name: 'Eve Adams',
    image: 'https://example.com/images/eve.jpg',
  },
  {
    id: '6',
    name: 'Frank Castle',
    image: 'https://example.com/images/frank.jpg',
  },
  {
    id: '7',
    name: 'Grace Hopper',
    image: 'https://example.com/images/grace.jpg',
  },
  {
    id: '8',
    name: 'Hank Pym',
    image: 'https://example.com/images/hank.jpg',
  },
  {
    id: '9',
    name: 'Ivy Pepper',
    image: 'https://example.com/images/ivy.jpg',
  },
  {
    id: '10',
    name: 'Jack Ryan',
    image: 'https://example.com/images/jack.jpg',
  },
  {
    id: '11',
    name: 'Karen Page',
    image: 'https://example.com/images/karen.jpg',
  },
  {
    id: '12',
    name: 'Leo Fitz',
    image: 'https://example.com/images/leo.jpg',
  },
  {
    id: '13',
    name: 'Maya Lopez',
    image: 'https://example.com/images/maya.jpg',
  },
];
