import React from 'react';
import './componentsStyle.css'; // Import the CSS file

const Footer = () => {
  const footerSections = [
    {
      title: 'Social Media',
      links: [
        { name: 'GitHub', url: 'https://github.com/Pramila2004' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pramila-kolhe-91740228a/' },
        { name: 'Portfolio', url: 'https://pramila-kolhe.vercel.app/' }, // Link to the portfolio page in your app
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Pricing', url: '/' },
        { name: 'Documentation', url: '/' },
        { name: 'Guides', url: '/' },
        { name: 'API Status', url: '/' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'Home', url: '/' },
        { name: 'About', url: '/about' },
        { name: 'Contact', url: '/contact' },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h1 className="footer-logo1">NEXTSPHERE</h1>
          <p>Shaping the Future of Development By Today.</p>
        </div>

        {/* Footer Links */}
        <div className="links">
          {footerSections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      className="footer-link"
                      target={link.url.startsWith('http') ? '_blank' : '_self'}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 NEXTSPHERE. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
