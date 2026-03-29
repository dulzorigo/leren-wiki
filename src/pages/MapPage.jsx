export default function MapPage() {
  return (
    <div className="max-w-3xl mx-auto text-center py-16">
      <h1 className="font-display text-2xl text-bright mb-4">The Map of Leren</h1>
      <p className="text-muted mb-8">
        The cartographers are still charting these lands. A map shall appear here in time.
      </p>

      {/* Placeholder map area */}
      <div className="aspect-[16/10] border border-border border-dashed flex items-center justify-center bg-surface/30">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto text-border mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={0.75}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <p className="text-muted/60 text-sm">
            Place your world map image at<br />
            <code className="text-xs text-cyan bg-deep px-2 py-0.5 mt-1 inline-block">
              public/map.png
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}
