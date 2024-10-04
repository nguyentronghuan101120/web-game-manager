import Footer from "../components/footer";
import NavBar from "../components/nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {/* <h1>
      <FormattedMessage id="greeting" />
    </h1> */}
      <div className="bg-white dark:bg-gray-900 flex flex-col items-center justify-center py-8">
        {children}
      </div>
      <Footer />
    </>
  );
}
