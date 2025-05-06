import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../index.js'
 
export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-wrap gap-10 justify-between">
                    <div>
                        <Logo width="120px" />
                        <p className="mt-4 text-sm text-gray-400 max-w-xs">
                            InkNova is a creative blogging space where ideas come alive. Share your story, your way.
                        </p>
                        <p className="text-xs text-gray-500 mt-4">&copy; {new Date().getFullYear()} InkNova. All rights reserved.</p>
                    </div>

                    <div>
                        <h4 className="uppercase tracking-widest font-semibold mb-3 text-gray-400">Navigate</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-white">Home</Link></li>
                            <li><Link to="/all-posts" className="hover:text-white">All Posts</Link></li>
                            <li><Link to="/add-post" className="hover:text-white">Write a Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="uppercase tracking-widest font-semibold mb-3 text-gray-400">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
                            <li><Link to="/help" className="hover:text-white">Help</Link></li>
                            <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="uppercase tracking-widest font-semibold mb-3 text-gray-400">Follow Us</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">GitHub</a></li>
                            <li><a href="#" className="hover:text-white">Twitter</a></li>
                            <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
