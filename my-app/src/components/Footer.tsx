import React from 'react';
import Link from 'next/link';
import { PUBLIC_PATH } from '../constant/path';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          <div className="flex flex-col">
            <Link href="/" className="flex items-center text-3xl font-medium tracking-wide text-slate-800 mb-10">
              <div className="flex items-baseline italic">
                <span className="text-3xl font-black text-[#1a73e8] group-hover:scale-105 transition-transform duration-300">E-</span>
                <span className="text-2xl font-extrabold tracking-widest text-slate-800 uppercase">Learning</span>
              </div>
            </Link>
            
            <p className="text-slate-700 font-medium mb-4">
              Connect with us
            </p>
            
            <div className="flex items-center gap-5 text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-pink-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="hover:text-blue-700 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-slate-800 font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-slate-600 font-medium">
              <li><Link href={PUBLIC_PATH.HOME} className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><Link href={PUBLIC_PATH.COURSES} className="hover:text-blue-600 transition-colors">Courses</Link></li>
              <li><Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-blue-600 transition-colors">Mentors</Link></li>
              <li><Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-blue-600 transition-colors">About Us</Link></li>
              <li><Link href={PUBLIC_PATH.COMING_SOON} className="hover:text-blue-600 transition-colors">Contact us</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-slate-800 font-semibold text-lg mb-6">Legal</h3>
            <ul className="space-y-4 text-slate-600 font-medium">
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Trust & Safety</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-blue-600 transition-colors">Fraud Alert</Link></li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="text-slate-800 font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-slate-600 font-medium">
              <li>193, Viet Nam</li>
              <li>+1125156363</li>
              <li><a href="mailto:learn123@gmail.com" className="hover:text-blue-600 transition-colors">E-learning123@gmail.com</a></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
}