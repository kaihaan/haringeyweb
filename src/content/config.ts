import { defineCollection, z } from 'astro:content';

const events = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    startDateTime: z.string(),
    endDateTime: z.string(),
    location: z.string(),
    isPublic: z.boolean(),
    registrationLink: z.string().optional(),
  }),
});

const prayers = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const writings = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    shortTitle: z.string(),
    author: z.string(),
    category: z.string(),
    excerpt: z.string(),
    tags: z.array(z.string()),
  }),
});

const resources = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    type: z.enum(['pdf', 'audio', 'video', 'link']),
    description: z.string(),
    fileUrl: z.string().optional(),
    tags: z.array(z.string()),
    category: z.string(),
  }),
});

const news = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    image: z.string().optional(),
    category: z.string(),
  }),
});

export const collections = {
  events,
  prayers,
  writings,
  resources,
  news,
};
