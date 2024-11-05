
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="w-full max-w-lg p-5 flex flex-col items-center justify-center text-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-gray-400 mb-6">
          Login to
          <span className="text-blue-500 ml-2">Biblioteca</span>
        </h1>

        <section className="w-full mt-4 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full h-10 rounded-md border text-black border-gray-300 px-4"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-10 rounded-md border text-black border-gray-300 px-4"
          />
          <button className="w-full h-10 rounded-md text-sm text-pretty bg-blue-500 text-white">
            Login
          </button>
          <p className="text-sm text-gray-500">
            Don't have an account? <a className="text-blue-500">Register</a>
          </p>
        </section>
      </div>
    </main>
  );
}
