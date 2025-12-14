interface Props {
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
}

export default function TagsFilter({ allTags, selectedTags, onToggleTag }: Props) {
  return (
    <div className="bg-base-200 text-card-text rounded-lg p-6 shadow-md sticky top-4">
      <h3 className="text-lg font-bold mb-4">Filter by Tags</h3>
      <div className="flex flex-col gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => onToggleTag(tag)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition text-left ${
              selectedTags.includes(tag)
                ? 'bg-secondary text-secondary-content'
                : 'bg-base-100 text-base-content hover:bg-base-300'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-base-300">
          <button
            onClick={() => selectedTags.forEach(tag => onToggleTag(tag))}
            className="text-sm text-accent-cyan hover:text-accent-cyan-dark hover:underline w-full text-left transition"
          >
            Clear tag filters
          </button>
        </div>
      )}
    </div>
  );
}
