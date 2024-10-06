import HomePage from "./(client)/page";
import Footer from "./components/footer";
import NavBar from "./components/nav-bar";

export default function Home() {
  return (
    <>
      <NavBar />

      <div className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center py-8">
        <HomePage />
      </div>
      <Footer />
    </>
  );
}
