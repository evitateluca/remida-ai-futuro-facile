
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow relative">
        {/* Sfondo tech-pattern semi-trasparente per un look più sofisticato */}
        <div className="absolute inset-0 bg-tech-pattern opacity-10 pointer-events-none z-0"></div>
        
        <div className="relative z-10">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
