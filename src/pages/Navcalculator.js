import React from 'react';
import './main.css';
import MainCalculator from './MainCalculator';
import { Helmet } from 'react-helmet';

export function Homesgpaandcgpa() {
  return (
    <>
    <Helmet>
        <title>VTU SGPA & CGPA Calculator (2022 Scheme) | Notezy</title>
        <meta
          name="description"
          content="Easily calculate your VTU SGPA, CGPA, and percentage online for the 2022 CBCS scheme. Fast, accurate, and student-friendly calculator by Notezy."
        />
        <meta
          name="keywords"
          content="VTU SGPA calculator, VTU CGPA calculator, VTU percentage calculator, VTU CBCS scheme 2022, VTU grade calculator, engineering CGPA calculator"
        />
        <link rel="canonical" href="https://notezy.online/sgpa-and-cgpa-calculator-2022-scheme" />

        {/* Open Graph */}
        <meta property="og:title" content="VTU SGPA & CGPA Calculator (2022 Scheme) | Notezy" />
        <meta
          property="og:description"
          content="Quickly calculate VTU SGPA, CGPA & percentage online. Supports 2022 CBCS scheme with accurate results."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://notezy.online/sgpa-and-cgpa-calculator-2022-scheme" />
        <meta property="og:image" content={`${window.location.origin}/feather-pen.png`} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VTU SGPA & CGPA Calculator - Notezy" />
        <meta
          name="twitter:description"
          content="Accurate & fast VTU SGPA, CGPA & percentage calculator for 2022 CBCS scheme."
        />
        <meta name="twitter:image" content={`${window.location.origin}/feather-pen.png`} />
      </Helmet>
      <MainCalculator/>
  </>
  );
}
