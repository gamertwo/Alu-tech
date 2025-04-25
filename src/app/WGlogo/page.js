"use client"
// pages/index.js
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const logoRef = useRef(null);
  
  useEffect(() => {
    if (logoRef.current) {
      // Simple animation with CSS transitions
      const logo = logoRef.current;
      logo.style.transition = 'transform 0.5s ease-in-out';
      
      // Example animation function
      const animateLogo = () => {
        logo.style.transform = 'scale(1.05)';
        setTimeout(() => {
          logo.style.transform = 'scale(1)';
        }, 500);
      };
      
      // Trigger animation every 3 seconds
      const interval = setInterval(animateLogo, 3000);
      
      // Clean up interval on component unmount
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="container">
      <Head>
        <title>White Gold Aluminum Products</title>
        <meta name="description" content="White Gold Aluminum Products logo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div className="logo-container" ref={logoRef}>
          <svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Circle background */}
            <circle cx="150" cy="150" r="145" fill="white" stroke="black" strokeWidth="2" />
            
            {/* WG Logo - corrected based on the latest image */}
            <g>
              {/* W part - now showing as proper W */}
              <path
                d="M75,210 L90,140 L105,180 L120,140 L135,210 Z"
                fill="#0066FF"
                stroke="#0057B8"
                strokeWidth="1"
              />
              <path
                d="M80,205 L93,145 L105,180 L117,145 L130,205 Z"
                fill="#1E88E5"
                stroke="none"
              />
              
              {/* G part - as a circle with gap */}
              <circle cx="170" cy="175" r="45" fill="#0066FF" stroke="#0057B8" strokeWidth="1" />
              <circle cx="170" cy="175" r="38" fill="#1E88E5" stroke="none" />
              <circle cx="170" cy="175" r="28" fill="white" stroke="none" />
              
              {/* G opening and line */}
              <path
                d="M170,175 L205,175 M205,175 L205,190"
                stroke="white"
                strokeWidth="28"
                strokeLinecap="round"
              />
              <path
                d="M170,175 L200,175 M200,175 L200,185"
                stroke="#0066FF"
                strokeWidth="22"
                strokeLinecap="round"
              />
            </g>
            
            {/* WHITE GOLD ALUMINUM PRODUCTS text */}
            <g>
              <rect x="65" y="225" width="170" height="25" rx="2" fill="#0A285F" />
              <text
                x="150"
                y="242"
                textAnchor="middle"
                fill="white"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fontWeight="bold"
                letterSpacing="0.3"
              >
                WHITE GOLD ALUMINUM PRODUCTS
              </text>
            </g>
            
            {/* Note speech bubble (optional - can be removed) */}
            <g className="note-bubble" style={{display: 'none'}}>
              <rect x="100" y="80" width="70" height="30" rx="5" fill="#333" />
              <polygon points="125,110 130,120 135,110" fill="#333" />
              <text
                x="135"
                y="100"
                textAnchor="middle"
                fill="white"
                fontFamily="Arial, sans-serif"
                fontSize="12"
              >
                Note...
              </text>
              <polygon points="160,85 160,90 165,87.5" fill="white" />
              <polygon points="160,100 160,105 165,102.5" fill="white" />
            </g>
          </svg>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #000;
          color: white;
        }
        
        .main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        
        .logo-container {
          position: relative;
          transition: transform 0.5s ease;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          background-color: #000;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}