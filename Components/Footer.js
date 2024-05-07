import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-blue-950 text-white px-4 h-16 flex justify-center items-center">
      <p className="text-center">
        CopyRight &copy; {currentYear} Get Me A Chai - All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
