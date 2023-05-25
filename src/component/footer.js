import React from 'react'

const Footer = () => {
    const date = new Date().getFullYear();
  return (
    <div>
      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span> &copy; AMS{date} 
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
