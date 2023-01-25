import { useState } from "react";

function App() {
  const [work, setwork] = useState('')
  return (
    <h1 className="flex gap-8 h-screen items-center justify-center border border-red-500">
      <input 
      type="text"
      className="outline-none border border-blue-600 px-4 py-2 w-[400px]"
      value={work}
      onChange={e => setwork(e.target.value)}
      />
      
      <button
      type="button"
      className="outline-none px-4 py-2 bg-blue-500 rounded-md text-white"
      >
        add
      </button>
    </h1>
  );
}

export default App;
