export default function BookmarkItem({ bookmark }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <div>
        <h4 className="font-semibold">
          {bookmark.title}
        </h4>
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 text-sm"
        >
          {bookmark.url}
        </a>
      </div>
    </div>
  );
}
