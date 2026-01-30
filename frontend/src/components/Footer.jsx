import React from 'react';
import { FaFacebookF } from 'react-icons/fa';
import {FaTiktok,FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6">
      <div className="pl-24 max-w-8xl mx-auto grid grid-cols-4 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-semibold text-base text-white mb-4">CATEGORIES</h3>
          <ul className="space-y-2 text-sm">
            <li>Men</li>
            <li>Women</li>
            <li>Kids & Baby</li>
            <li>Home & Living</li>
            <li>Health & Beauty</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base text-white mb-4">COMPANY & OUR POLICIES</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
            <li>Return & Exchanges Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base text-white mb-4">UNI-T FASHION ONLINE STORE</h3>
          <ul className="space-y-2 text-sm">
            <li>Mon–Fri : 9:00 AM to 6:00 PM</li>
            <li>Saturday : 9:00 AM to 2:00 PM</li>
            <li>Sunday : Closed</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-base text-white mb-4">CONTACT US</h3>
          <ul className="space-y-2 text-sm">
            <li>Hotline – (011) XXX XXXX</li>
            <li>Email – online@uni-tfashion.lk</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between">

        <div className="flex gap-3 text-base text-white text-center md:text-left">
          <div>© 2025 UNI-T Fashion Online. All Rights Reserved.</div> 
          <div>|</div>
          <div>Website by Sajith</div>
        </div>

        <div>
          <div className='text-lg text-white pb-3'>Follow Us</div>
          <div className='flex gap-5'>
              <a href="." className="w-10 h-10 pt-2.5 pl-2 text-[22px] bg-white text-black rounded-lg hover:bg-blue-700 hover:text-white">
                  <FaFacebookF title='UNI-T Fashion on Facebook'/>
              </a>

              <a href="." className="w-10 h-10 pt-0.5 pl-0.5 text-[36px] bg-white text-black rounded-lg hover:bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:text-white">
                  <FaInstagram title='UNI-T Fashion on Instagram' />
              </a>

              <a href="." className="text-black text-[26px] pt-1.5 pl-1.5 bg-white border-white rounded-lg  border-2 w-10 h-10 hover:bg-black hover:text-white">
                  <FaTiktok title='UNI-T Fashion on Tiktok' />
            
              </a>

              <a href="." className="text-black text-[30px] pt-1 pl-1.5 bg-white rounded-lg w-10 h-10 hover:bg-green-600 hover:text-white">
                  <FaWhatsapp title='UNI-T Fashion on Whatsapp' />
              </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
