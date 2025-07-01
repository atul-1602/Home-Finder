import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Pricing from '../../components/Pricing';

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Pricing />
      </div>
      <Footer />
    </>
  );
} 