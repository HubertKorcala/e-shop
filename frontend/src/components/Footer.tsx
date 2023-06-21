const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content rounded-box mt-auto shadow-inner">
      <div>
        <p>{`Copyright © ${currentYear} - All right reserved by E-shop`}</p>
      </div>
    </footer>
  );
};

export default Footer;
