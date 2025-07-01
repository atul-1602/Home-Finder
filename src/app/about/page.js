import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import About from '../../components/About';

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <About />
      </div>
      <Footer />
    </>
  );
} 