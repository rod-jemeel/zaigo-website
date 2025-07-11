export default function FontTestPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">DM Sans Font Test</h1>
      
      <div className="space-y-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Visual Test</h2>
          <p className="mb-4">Look for these DM Sans characteristics:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Geometric sans-serif design with rounded terminals</li>
            <li>The "g" has a single-story design</li>
            <li>Clear, modern letterforms optimized for readability</li>
          </ul>
        </div>

        <div className="text-6xl space-y-4">
          <p>i I l 1</p>
          <p>Building Sustainable</p>
          <p>The quick brown fox</p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Current Font:</h3>
            <p className="text-3xl">i I l 1 g a e</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Forced Helvetica:</h3>
            <p className="text-3xl" style={{ fontFamily: 'Helvetica' }}>i I l 1 g a e</p>
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p>To verify: Open DevTools → Elements → Select any text → Computed → font-family</p>
          <p>You should see "DM Sans" as the first font in the list.</p>
        </div>
      </div>
    </div>
  );
}