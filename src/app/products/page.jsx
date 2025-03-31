// app/products/page.jsx
import { Metadata } from 'next';
import ProductOverview from './ProductOverview';
import Header from '../components/Header';
import Footer from '../components/Footer';
export const metadata = {
  title: 'Aluminum Products | White Gold Aluminum',
  description: 'Explore our comprehensive range of premium aluminum products including extrusions, sheets, castings, and custom solutions for diverse industry applications.',
  keywords: 'aluminum products, aluminum extrusions, aluminum sheets, aluminum castings, CNC machining, custom aluminum solutions',
  openGraph: {
    title: 'Premium Aluminum Products | White Gold Aluminum',
    description: 'High-quality aluminum solutions for industrial and commercial applications with precision engineering and excellent finish.',
    images: [
      {
        url: '/og-products.jpg',
        width: 1200,
        height: 630,
        alt: 'White Gold Aluminum Products',
      },
    ],
  },
};

export default function Products() {
  return (
    <main>
        <Header/>
      <ProductOverview />
      <Footer/>
    </main>
  );
}