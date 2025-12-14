import { useState, useMemo } from 'react';
import type { Resource } from '../data/resources';
import TagsFilter from './TagsFilter';

interface Props {
  resources: Resource[];
  categories: readonly string[];
  allTags: string[];
}

export default function SearchableResources({ resources, categories, allTags }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter resources based on search and filters
  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' ||
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (resource.author && resource.author.toLowerCase().includes(searchLower));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;

      // Tags filter
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => resource.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [resources, searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedTags([]);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Website':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'Book':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'Video':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      case 'Article':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'Study Program':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Search and Filter Controls */}
        <div className="bg-base-200 rounded-lg p-6 shadow-md">
        {/* Search Bar */}
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-base-content mb-2">
            Search Resources
          </label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, description, tags, or author..."
            className="w-full px-4 py-2 border border-base-300 rounded-lg bg-base-100 text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-base-content mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-100 text-base-content hover:bg-base-300'
              }`}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-content'
                    : 'bg-base-100 text-base-content hover:bg-base-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        {(searchQuery || selectedCategory !== 'all' || selectedTags.length > 0) && (
          <div className="mt-4">
            <button
              onClick={clearFilters}
              className="text-sm text-accent-cyan hover:text-accent-cyan-dark hover:underline transition"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="text-base-content">
        <p className="text-sm">
          Showing <strong>{filteredResources.length}</strong> of <strong>{resources.length}</strong> resources
        </p>
      </div>

      {/* Resource Cards */}
      {filteredResources.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <article
              key={resource.id}
              className="bg-base-200 text-base-content rounded-lg shadow-md hover:shadow-lg transition p-6 flex flex-col"
            >
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-accent-cyan">
                  {getCategoryIcon(resource.category)}
                </span>
                <span className="text-xs font-semibold text-accent-cyan uppercase tracking-wide">
                  {resource.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-base-content mb-2 leading-tight">
                {resource.title}
              </h3>

              {/* Author */}
              {resource.author && (
                <p className="text-sm text-base-content opacity-70 mb-2">
                  by {resource.author}
                </p>
              )}

              {/* Description */}
              <p className="text-sm text-base-content opacity-80 mb-4 flex-grow">
                {resource.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {resource.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-base-300 text-base-content px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
                {resource.tags.length > 3 && (
                  <span className="text-xs text-base-content opacity-60">
                    +{resource.tags.length - 3} more
                  </span>
                )}
              </div>

              {/* Link */}
              <a
                href={resource.link}
                target={resource.link.startsWith('http') ? '_blank' : undefined}
                rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-accent-cyan hover:text-accent-cyan-dark font-medium text-sm transition"
              >
                {resource.link.startsWith('http') ? 'Visit Resource' : 'View'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-base-200 text-base-content rounded-lg p-12 text-center">
          <svg className="w-16 h-16 text-base-content opacity-40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-base-content mb-2">No resources found</h3>
          <p className="text-base-content opacity-70 mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <button
            onClick={clearFilters}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
      </div>

      {/* Sidebar - Tags Filter (Desktop: right side, Mobile: below content) */}
      <aside className="lg:w-64 lg:order-last order-first lg:order-none">
        <TagsFilter
          allTags={allTags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
        />
      </aside>
    </div>
  );
}
