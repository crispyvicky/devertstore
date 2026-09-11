"use client";

import { mediaUrl } from "./media";


import React, { useState, useRef, useEffect } from 'react';
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CartRoot } from "./CartUI";
import ProductGrid from "./ProductGrid";
import "./atelier.css";

const img255 = "/storefront/img255.jpg";
const img256 = "/storefront/img256.jpg";
const img257 = "/storefront/img257.jpg";
const img258 = "/storefront/img258.jpg";
const img259 = "/storefront/img259.jpg";
const img260 = "/storefront/img260.jpg";
const img261 = "/storefront/img261.jpg";
const img262 = "/storefront/img262.jpg";

const projectData = [
  { 
    img: img255, 
    title: "Crafting the Extraordinary: The Bottega Veneta Intrecciato Legacy.", 
    items: [], 
    prices: [] 
  },
  { 
    img: img256, 
    title: "Essential Crossbody Purses",
    items: [
        "Small Loop Camera Bag", 
        "Mini Wallace Leather Crossbody", 
        "Small Desiree Shoulder Bag", 
        "Mini Cobble Crossbody", 
        "Small Gemelli Shoulder Bag", 
        "Candy Cassette Crossbody"
    ],
    prices: ["$2,650", "$2,100", "$3,200", "$2,900", "$3,600", "$1,250"]
  },
  { 
    img: img257, 
    title: "Mini Gold & Mini Purses",
    items: [
        "Mini Jodie with Gold-Finish Handle", 
        "Mini Sardine with Metallic Handle", 
        "Mini Kalimero Bucket Bag", 
        "Candy Wallace Gold Leather", 
        "Mini Pouch with Gold Chain", 
        "Mini Knot Clutch in Gold"
    ],
    prices: ["$2,800", "$3,100", "$5,900", "$1,950", "$1,750", "$2,400"]
  },
  { 
    img: img258, 
    title: "The Padded Cassette Collection",
    items: [
        "Padded Cassette in Parakeet", 
        "Padded Cassette with Gold Chain", 
        "Small Padded Cassette Suede", 
        "Padded Cassette Metallic Silver", 
        "Padded Tech Cassette Nylon", 
        "Maxi Padded Cassette"
    ],
    prices: ["$4,500", "$5,500", "$3,900", "$4,700", "$2,500", "$4,900"]
  },
  { 
    img: img259, 
    title: "Tactile textures that redefine modern luxury.", 
    items: [], 
    prices: [] 
  },
  { 
    img: img260, 
    title: "The Lauren Bags & Clutches",
    items: [
        "The Lauren 1980 Intrecciato Clutch", 
        "Large Lauren Bag in Barolo", 
        "Small Lauren Suede Clutch", 
        "The Lauren Metallic Weave", 
        "Medium Lauren Top Handle", 
        "The Lauren 1980 Snakeskin Edition"
    ],
    prices: ["$3,400", "$4,200", "$2,800", "$3,900", "$4,500", "$5,100"]
  },
  { 
    img: img261, 
    title: "Intrecciato Document Cases",
    items: [
        "Classic Document Case in Fondant", 
        "Large Zip Document Case", 
        "Intrecciato Flat Pouch", 
        "Document Case with Wristlet", 
        "Business Document Folder", 
        "Tech Document Case"
    ],
    prices: ["$2,200", "$2,500", "$1,650", "$1,900", "$2,400", "$1,450"]
  },
  { 
    img: img262, 
    title: "Craft in Motion: A Study of Dynamic Elegance.", 
    items: [], 
    prices: [] 
  }
];

gsap.registerPlugin(ScrollTrigger);


const BottegapursesApp = () => {
    // These were causing the "ReferenceError" because they weren't imported
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);
    const uiColor = "#F5F5F7"; 

    // 1. LISTEN FOR EXTERNAL HTML TOGGLE
    useEffect(() => {
        const handleToggle = () => setIsContactOpen(true);
        window.addEventListener('toggleContact', handleToggle);
        return () => window.removeEventListener('toggleContact', handleToggle);
    }, []);

    // 2. SMOKE WEAVE & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const straps = row.querySelectorAll(".weave-strap");
            const title = row.querySelector("h3");
            const items = row.querySelectorAll(".item-p");
            const prices = row.querySelectorAll(".price-p");
            const mainImg = row.querySelector(".main-image");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(mainImg, 
                { scale: 1.1, filter: "brightness(0.5)" },
                { scale: 1, filter: "brightness(1)", duration: 2, ease: "power2.out" }, 
                0
            )
            .to(straps, {
                xPercent: (i) => (i % 2 === 0 ? -110 : 110), 
                duration: 1.6,
                stagger: { amount: 0.8, from: "center" },
                ease: "expo.inOut"
            }, 0.1)
            .to(title, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
            .to(items, { opacity: 1, x: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" }, "-=0.5")
            .to(prices, { opacity: 1, x: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" }, "-=0.8");
        });

        setTimeout(() => ScrollTrigger.refresh(), 500);
    }, []);

    // 3. CONTACT PANEL SLIDE-OUT
    useGSAP(() => {
           if (isFirstRun.current) {
               gsap.set(contactPanelRef.current, { x: "100%", autoAlpha: 0 });
               isFirstRun.current = false;
               return;
           }
           gsap.to(contactPanelRef.current, {
               x: isContactOpen ? 0 : "100%",
               autoAlpha: isContactOpen ? 1 : 0,
               duration: 0.8,
               ease: "expo.inOut"
           });
       }, [isContactOpen]);

    const inputStyle = { background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#fff', padding: '12px 0', width: '100%', outline: 'none', marginBottom: '20px', fontSize: '13px' };

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            <CartRoot />
            <div style={{ backgroundColor: '#000', color: uiColor, minHeight: '100vh', overflowX: 'hidden' }}>
                
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ marginBottom: '400px', paddingTop: i === 0 ? '250px' : '0' }}>
                        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                            <div className="img-container" style={{ position: 'relative', height: '70vh', overflow: 'hidden', backgroundColor: '#050505' }}>
                                <img src={mediaUrl(project.img)} className="main-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={project.title} />
                                <div className="weave-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    {[...Array(12)].map((_, j) => (
                                        <div key={j} className="weave-strap" style={{
                                            backgroundColor: 'rgba(15, 15, 15, 0.98)', 
                                            flex: 1, width: '100%',
                                            backdropFilter: 'blur(10px)',
                                            WebkitBackdropFilter: 'blur(10px)',
                                            borderBottom: '0.5px solid rgba(255,255,255,0.05)',
                                            zIndex: 2
                                        }} />
                                    ))}
                                </div>
                            </div>

                            <div className="side-list-container" style={{ marginTop: '50px' }}>
                                <h3 style={{ fontSize: '42px', borderBottom: '1px solid #333', paddingBottom: '20px', textTransform: 'uppercase', opacity: 0, transform: 'translateY(20px)' }}>{project.title}</h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Bottega Veneta"
                                    collection={project.title}
                                    itemClass="item-p"
                                    priceClass="price-p"
                                    itemStyle={{ fontSize: '15px', opacity: 0, transform: 'translateX(-40px)' }}
                                    priceStyle={{ fontSize: '15px', color: '#888', opacity: 0, transform: 'translateX(40px)' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- RIGHT SIDE BOUTIQUE PANEL --- */}
                    <div ref={contactPanelRef} style={{ 
                    position: 'fixed', 
                    top: 0, 
                    right: 0, 
                    width: '400px', 
                    height: '100vh', 
                    backgroundColor: '#0a0a0a', 
                    zIndex: 10000, 
                    padding: '80px 40px', 
                    borderLeft: '1px solid #222', 
                    transform: 'translateX(100%)', 
                    visibility: 'hidden' }}>

                    <div onClick={() => setIsContactOpen(false)} style={{ 
                        position: 'absolute', 
                        right: '100%', 
                        top: '50%', 
                        transform: 'translateY(-50%)', 
                        backgroundColor: '#0a0a0a', 
                        border: '1px solid #222', 
                        borderRight: 'none', 
                        padding: '25px 12px', 
                        cursor: 'pointer', 
                        writingMode: 'vertical-rl', 
                        fontSize: '12px', 
                        letterSpacing: '3px', 
                        color: '#fff', 
                        textTransform: 'uppercase' }}>CLOSE [âœ•]</div>

                    <div style={{ marginBottom: '60px' }}>
                        <h2 style={{ 
                            fontSize: '24px', 
                            letterSpacing: '4px', 
                            marginBottom: '40px', 
                            fontFamily: 'RobotoBold' }}>DEVERT STORE</h2>

                        <p style={{ 
                            color: '#666', 
                            fontSize: '11px', 
                            marginBottom: '5px' }}>ADDRESS</p>

                        <p style={{ 
                            fontSize: '14px', 
                            marginBottom: '25px', 
                            fontFamily: 'RobotoThin' }}>Devert Store, Hyderabad</p>

                        <p style={{ 
                            color: '#666', 
                            fontSize: '11px', 
                            marginBottom: '5px' }}>PHONE</p>

                        <p style={{ 
                            fontSize: '14px', 
                            marginBottom: '40px', 
                            fontFamily: 'RobotoThin' }}>+91 94971 94971 · +91 89197 21762</p>

                        <hr style={{ 
                            borderColor: '#222', 
                            borderTop: 'none' }} />
                    </div>

{!isSubmitted ? (
    <form 
        onSubmit={async (e) => { 
            e.preventDefault(); 
            
            // 1. Capture data (MUST have 'name' attributes on inputs below)
            const formData = new FormData(e.currentTarget);
            formData.append("access_key", "dd54a250-0a91-4e2d-9a9b-194cc629c447");

            // 2. Send the request
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            // 3. Only show GRAZIE if it worked
            if (response.ok) {
                setIsSubmitted(true); 
            } else {
                alert("Submission failed. Please try again.");
            }
        }}
    >
        {/* IMPORTANT: I added name="name", name="email", and name="message" for Web 3 Forms */}
        <input name="name" placeholder="NAME" required style={inputStyle} />
        <input name="email" type="email" placeholder="EMAIL" required style={inputStyle} />
        <textarea name="message" placeholder="MESSAGE" required style={{ ...inputStyle, height: '100px' }} />
        
        <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', padding: '15px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
            SEND
        </button>
    </form>
) : (
    <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        textAlign: 'center',
        paddingBottom: '80px'
    }}>
        <h2 style={{ letterSpacing: '4px' }}>GRAZIE</h2>
        <p style={{ color: '#888' }}>Your inquiry has been received.</p>
    </div>
)}
                </div>
            </div>
        </ReactLenis>
    );
};

export default BottegapursesApp;

