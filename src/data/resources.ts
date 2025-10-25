export interface Resource {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'video' | 'link';
  description: string;
  fileUrl?: string;
  tags: string[];
  category: string;
}

export const resources: Resource[] = [
  {
    id: '1',
    title: 'Ruhi Book 1: Reflections on the Life of the Spirit',
    type: 'pdf',
    description: 'The first book in the Ruhi Institute series, designed to help participants deepen their understanding of spiritual concepts and develop the capacity to serve humanity.',
    fileUrl: '#',
    tags: ['study', 'ruhi', 'spiritual growth'],
    category: 'Study Materials',
  },
  {
    id: '2',
    title: 'Ruhi Book 3: Teaching Children\'s Classes, Grade 1',
    type: 'pdf',
    description: 'A training course for teaching children\'s classes, focusing on spiritual education for young learners.',
    fileUrl: '#',
    tags: ['children', 'education', 'teaching'],
    category: 'Study Materials',
  },
  {
    id: '3',
    title: 'Ruhi Book 5: Raising Up Animators of Junior Youth Groups',
    type: 'pdf',
    description: 'Training material for those who wish to guide junior youth in their spiritual and moral empowerment.',
    fileUrl: '#',
    tags: ['junior youth', 'empowerment', 'service'],
    category: 'Study Materials',
  },
  {
    id: '4',
    title: 'Prayers and Meditations - Audio Collection',
    type: 'audio',
    description: 'A collection of prayers from the Baháʼí writings, beautifully recited for devotional listening.',
    fileUrl: '#',
    tags: ['prayers', 'audio', 'devotional'],
    category: 'Devotional',
  },
  {
    id: '5',
    title: 'Introduction to the Baháʼí Faith',
    type: 'video',
    description: 'A short video introduction to the fundamental beliefs and principles of the Baháʼí Faith.',
    fileUrl: '#',
    tags: ['introduction', 'basics', 'video'],
    category: 'Educational',
  },
  {
    id: '6',
    title: 'The Life of Baháʼu'lláh - Documentary',
    type: 'video',
    description: 'A documentary exploring the life, teachings, and historical context of Baháʼu'lláh, the Founder of the Baháʼí Faith.',
    fileUrl: '#',
    tags: ['history', 'bahaullah', 'documentary'],
    category: 'Educational',
  },
  {
    id: '7',
    title: 'World Centre Pilgrimage Guide',
    type: 'pdf',
    description: 'Information and guidelines for those planning to make a pilgrimage to the Baháʼí World Centre in Haifa, Israel.',
    fileUrl: '#',
    tags: ['pilgrimage', 'world centre', 'haifa'],
    category: 'Information',
  },
  {
    id: '8',
    title: 'Community Building Study Outline',
    type: 'pdf',
    description: 'Framework and guidance for building vibrant, unified communities through the core activities.',
    fileUrl: '#',
    tags: ['community', 'study', 'activities'],
    category: 'Study Materials',
  },
  {
    id: '9',
    title: 'Official Baháʼí Reference Library',
    type: 'link',
    description: 'Link to the official online library of Baháʼí writings and authoritative texts.',
    fileUrl: 'https://www.bahai.org/library',
    tags: ['library', 'writings', 'reference'],
    category: 'External Links',
  },
  {
    id: '10',
    title: 'Songs of the Ancient Beauty - Music Album',
    type: 'audio',
    description: 'Musical compositions inspired by the writings of Baháʼu'lláh.',
    fileUrl: '#',
    tags: ['music', 'devotional', 'album'],
    category: 'Devotional',
  },
];
