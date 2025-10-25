export interface Event {
  id: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime: string;
  location: string;
  isPublic: boolean;
  registrationLink?: string;
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Nineteen-Day Feast — Devotional',
    description: 'A community devotional gathering for all ages. Join us for prayers, readings, and fellowship.',
    startDateTime: '2025-11-02T19:00:00',
    endDateTime: '2025-11-02T20:30:00',
    location: 'Community Centre, Main St.',
    isPublic: true,
  },
  {
    id: '2',
    title: 'Study Circle - Book 1',
    description: 'Ruhi Institute Book 1: Reflections on the Life of the Spirit. Open to all seekers and community members.',
    startDateTime: '2025-11-05T18:30:00',
    endDateTime: '2025-11-05T20:00:00',
    location: 'Local Baháʼí Centre',
    isPublic: true,
    registrationLink: '#',
  },
  {
    id: '3',
    title: 'Junior Youth Empowerment Program',
    description: 'Activities and discussions for ages 11-14, exploring spiritual and moral themes through service and creativity.',
    startDateTime: '2025-11-08T16:00:00',
    endDateTime: '2025-11-08T17:30:00',
    location: 'Youth Hall, Community Centre',
    isPublic: true,
  },
  {
    id: '4',
    title: 'Community Devotions',
    description: 'Weekly devotional program with prayers, music, and reflection. All are welcome.',
    startDateTime: '2025-11-10T10:00:00',
    endDateTime: '2025-11-10T11:00:00',
    location: 'Garden Pavilion',
    isPublic: true,
  },
  {
    id: '5',
    title: 'Interfaith Dialogue: Unity in Diversity',
    description: 'Join leaders from various faith traditions for a dialogue on building unity while respecting diversity.',
    startDateTime: '2025-11-15T19:00:00',
    endDateTime: '2025-11-15T21:00:00',
    location: 'City Library Auditorium',
    isPublic: true,
    registrationLink: '#',
  },
  {
    id: '6',
    title: "Children's Classes",
    description: 'Spiritual education classes for children ages 5-10. Stories, songs, games, and arts & crafts.',
    startDateTime: '2025-11-12T14:00:00',
    endDateTime: '2025-11-12T15:30:00',
    location: 'Community Centre',
    isPublic: true,
  },
];
