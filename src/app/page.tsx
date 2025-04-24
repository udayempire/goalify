import { Navbar } from "./components/landing/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20"> {/* Add padding to offset the fixed navbar */}
        {/* Your content here */}
      </main>
    </>
  );
}
