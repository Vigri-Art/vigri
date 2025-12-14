import { logout } from "./(auth)/actions";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Vigri</h1>
      <form action={logout}>
          <button 
              type="submit" 
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
              Log Out
          </button>
        </form>
    </div>
  );
}
