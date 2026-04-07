import "./footer.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const teamName = "Handcraft Haven Team 08";

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: "fab fa-facebook-f",
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: "fab fa-instagram",
    },
    { name: "Twitter", href: "https://twitter.com", icon: "fab fa-twitter" },
    {
      name: "TikTok",
      href: "https://tiktok.com",
      icon: "fab fa-tiktok",
    },
  ];

  return (
    <footer className="footer-root" role="contentinfo">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-section left">
            <h2 className="footer-title">Handcrafted Haven</h2>
            <p className="footer-desc">
              Connecting talented creators with those who appreciate the beauty
              of handmade products.
            </p>
            <p className="footer-copyright">
              &copy; {currentYear} {teamName}.<br className="footer-copyright-mobile" />
              <span className="footer-copyright-desktop"> </span>
              All rights reserved.
            </p>
          </div>
          <div className="footer-section right">
            <h3 className="footer-title" style={{ fontSize: '1.125rem', fontWeight: 600 }}>Follow Us</h3>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-link"
                  aria-label={`Visit our ${social.name} page`}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
            <p className="footer-social-note">
              Stay updated with the latest creations and artist stories.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {teamName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
