function Footer() {
  const footerClass = "text-slate-300 italic text-sm";
  const footerHeader = "font-semibold italic mb-[15px] text-slate-100";
  const eachColClass = "w-[200px] ml-[150px] text-left";
  return (
    <footer className="bg-black text-white grid grid-cols-3 content-center justify-start max-w-[100%] h-[200px] mt-auto">
      {/* First col */}
      <div className={eachColClass}>
        <h1 className={footerHeader}>CUSTOMER SERVICES</h1>
        <ul>
          <li>
            <a href="#" className={footerClass}>
              Help & Contact us
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              Returns & Refunds
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              Online Stores
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>
      {/* Second col */}
      <div className={eachColClass}>
        <h1 className={footerHeader}>COMPANY</h1>
        <ul>
          <li>
            <a href="#" className={footerClass}>
              What we do
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              Available services
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              Latest Posts
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              FAQs
            </a>
          </li>
        </ul>
      </div>
      {/* Third col */}
      <div className={eachColClass}>
        <h1 className={footerHeader}>SOCIAL MEDIA</h1>
        <ul>
          <li>
            <a href="#" className={footerClass}>
              Twitter
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              Instagram
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              Facebook
            </a>
          </li>
          <li>
            <a href="#" className={footerClass}>
              Pinterest
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
