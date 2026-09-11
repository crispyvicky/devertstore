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




// 1. IMAGE IMPORTS
const img77 = "/storefront/img77.jpg"; const img78 = "/storefront/img78.jpg"; const img79 = "/storefront/img79.jpg";
const img80 = "/storefront/img80.jpg"; const img81 = "/storefront/img81.jpg"; const img82 = "/storefront/img82.jpg";
const img83 = "/storefront/img83.jpg"; const img84 = "/storefront/img84.jpg"; const img85 = "/storefront/img85.jpg";
const img86 = "/storefront/img86.jpg"; const img87 = "/storefront/img87.jpg"; const img88 = "/storefront/img88.jpg";
const img89 = "/storefront/img89.jpg"; const img90 = "/storefront/img90.jpg"; const img91 = "/storefront/img91.jpg";
const img92 = "/storefront/img92.jpg"; const img93 = "/storefront/img93.jpg"; const img94 = "/storefront/img94.jpg";
const img95 = "/storefront/img95.jpg";



    const projectData = [

    { img: img77, title: "Gucci Bamboo Heritage", items: ["Gucci Bamboo 1947 Small Bag", "Gucci Bamboo 1947 Mini Bag"], prices: ["$4,500", "$3,200"] },
    { img: img78, title: "The Horsebit Icon", items: ["Gucci Horsebit 1955 Shoulder Bag", "Gucci Horsebit 1955 Mini Bag"], prices: ["$3,250", "$1,450"] },
    { img: img79, title: "GG Marmont Collection & Totes", items: ["GG Marmont Mini Shoulder Bag","Gucci Gg Marmont Leather Camera Crossbody Bag","Gucci GG Marmont Small Shoulder Bag","Gucci GG-Marmont Quilted Shoulder Bag","Medium Ophidia GG Tote", "Small Ophidia GG Tote"], prices: ["$1,550","$1,050","$2,600","$2,800","$1,750", "$1,550"] },
    { img: img80, title: "GG Marmont Series", items: ["GG Marmont Shoulder Bag", "GG Marmont Small Matelassé Bag"], prices: ["$2,550", "$1,900"] },
    { img: img81, title: "Gucci Beauty & Fragrance", items: ["Gucci Flora Gorgeous Gardenia 100ml", "Gucci Guilty Elixir de Parfum", "Gucci Bloom Eau de Parfum 100ml"], prices: ["$168", "$183", "$165"] },
    { img: img82, title: "Gucci Re-Web Sneaker", items: ["Men's Re-Web Low-Top Sneaker", "Women's Re-Web Sneaker"], prices: ["$890", "$890"] },
    { img: img83, title: "Gucci Fine Jewelry", items: ["Icon 18k Thin Band", "Interlocking G Pendant Necklace"], prices: ["$950", "$1,850"] },
    { img: img84, title: "Gucci Rosso Ancora", items: ["Gucci Ancora Wool Cardigan", "Cotton Jersey Hooded Sweatshirt"], prices: ["$2,300", "$1,450"] },
    { img: img85, title: "Ace & Screener Sneakers", items: ["Gucci Ace Sneaker with Web", "Screener GG Sneaker", "Men's MAC80 Sneaker", "Gucci Basket High-Top Sneaker", "Gucci Run Sneaker"], prices: ["$850", "$930", "$950", "$1,100", "$920"] },
    { img: img86, title: "Fashion is a way of saying who you are without having to speak.", items: [], prices: [] },
    { img: img87, title: "Gucci Slide & Sandal", items: ["Women's Platform Perforated Slide", "Interlocking G Rubber Slide", "Men's Horsebit Leather Slipper", "Women's GG Matelassé Slide"], prices: ["$620", "$450", "$890", "$750"] },
    { img: img88, title: "Gucci Savoy Travel", items: ["Ophidia GG Suitcase", "Gucci Savoy Duffel Bag", "Men's GG Supreme Messenger", "Ophidia Small Backpack", "Gucci Porter Cabin Trolley", "GG Supreme Belt Bag"], prices: ["$3,980", "$2,450", "$1,300", "$2,100", "$3,500", "$1,150"] },
    { img: img89, title: "The quality is remembered long after the price is forgotten.", items: [], prices: [] },
    { img: img90, title: "Jackie & Dionysus Collection", items: ["Gucci Jackie 1961 Small Bag", "Dionysus Small Shoulder Bag", "Jackie 1961 Mini Bag", "Dionysus GG Super Mini", "Aphrodite Small Shoulder Bag"], prices: ["$2,950", "$3,100", "$2,400", "$1,100", "$1,980"] },
    { img: img91, title: "Gucci Signature Belts", items: ["GG Marmont Wide Leather Belt", "Gucci Horsebit Slim Belt", "Interlocking G Web Belt", "Blondie Leather Belt", "Reversible GG Belt"], prices: ["$520", "$490", "$490", "$590", "$620"] },
    { img: img94, title: "Fragrance is the first thing people notice and the last thing they forget.", items: [], prices: [] },
    { img: img93, title: "Gucci Eyewear", items: ["GG Rectangular Sunglasses", "Mask Sunglasses with Web", "Aviator Metal Sunglasses", "Oversized Square Sunglasses", "Cat-eye Injection Sunglasses", "Men's Navigator Sunglasses", "Round Frame Metal Glasses", "Square Frame Opticals"], prices: ["$420", "$565", "$535", "$495", "$400", "$510", "$435", "$450"] },
    { img: img92, title: "Small Leather Goods", items: ["GG Marmont Card Case", "Ophidia GG Key Case", "Horsebit 1955 Card Case Wallet", "Dionysus GG Coin Purse", "Gucci Blondie Compact Wallet", "GG Supreme Zip Wallet"], prices: ["$320", "$430", "$550", "$590", "$690", "$750"] },
    { img: img95, title: "Eccentricity is the first small step towards a new world.", items: [], prices: [] }
];


  gsap.registerPlugin(ScrollTrigger);

const GucciApp = () => {
    // 1. STATE & REFS
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);
    const uiColor = "#F5F5F7"; // Bone White

    // 2. LISTEN FOR EXTERNAL HTML TOGGLE ('toggleContact')
    useEffect(() => {
        const handleToggle = () => setIsContactOpen(true);
        window.addEventListener('toggleContact', handleToggle);
        return () => window.removeEventListener('toggleContact', handleToggle);
    }, []);

    // 3. GUCCI VINTAGE SHUTTER & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const mask = row.querySelector(".slicing-mask");
            const content = row.querySelector(".side-list-container");
            const mainImg = row.querySelector(".slicing-mask");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 90%", 
                    end: "top 20%",   
                    toggleActions: "play none none reverse",
                    scrub: 1.2,       
                }
            });

            // Shadow Drift: Zoom out
            tl.fromTo(mainImg, 
                { scale: 1.2, filter: "brightness(0.5)" },
                { scale: 1, filter: "brightness(1)", ease: "power2.out" }, 
                0
            )
            // Horizontal Shutter Slice
            .to(mask, {
                clipPath: "inset(0% 0% 0% 0%)",
                webkitClipPath: "inset(0% 0% 0% 0%)",
                ease: "power2.inOut"
            }, 0);

            // Content Entrance
            gsap.to(content, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: row,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        setTimeout(() => ScrollTrigger.refresh(), 500);
    }, []);

    // 4. CONTACT PANEL SLIDE-OUT ANIMATION
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

    const inputStyle = { 
        background: 'transparent', border: 'none', borderBottom: '1px solid #333', 
        color: '#fff', padding: '12px 0', width: '100%', outline: 'none', 
        marginBottom: '20px', fontSize: '13px' 
    };

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
            <CartRoot />
            {/* VINTAGE GRAIN OVERLAY */}
            <div className="grain-overlay" style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                zIndex: 9000, pointerEvents: 'none', opacity: 0.04,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}></div>

            <div style={{ backgroundColor: '#000', minHeight: '100vh', color: uiColor, fontFamily: 'Roboto, sans-serif', overflowX: 'hidden' }}>
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ 
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '400px', paddingTop: i === 0 ? '250px' : '0' 
                    }}>
                        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px' }}>
                            <div className="img-container" style={{ 
                                position: 'relative', width: '100%', height: 'clamp(350px, 65vh, 750px)', 
                                overflow: 'hidden', marginBottom: '40px', 
                                backgroundColor: '#64161b', // GUCCI RED
                                boxShadow: 'inset 0 0 100px rgba(0,0,0,0.8)' 
                            }}>
                                <div className="slicing-mask" style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    backgroundImage: `url("${mediaUrl(project.img)}")`, 
                                    backgroundSize: 'cover', backgroundPosition: 'center',
                                    clipPath: 'inset(0% 100% 0% 0%)', webkitClipPath: 'inset(0% 100% 0% 0%)',
                                    transformOrigin: 'center center'
                                }}></div>
                            </div>

                            <div className="side-list-container" style={{ opacity: 0, transform: 'translateY(40px)' }}>
                                <h3 style={{ fontSize: 'clamp(28px, 5vw, 42px)', borderBottom: '1px solid #333', paddingBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                    {project.title}
                                </h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Gucci"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px', color: '#ccc' }}
                                    priceStyle={{ fontSize: '15px', color: '#888' }}
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
                        textTransform: 'uppercase' }}>CLOSE [✕]</div>

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
                            fontFamily: 'RobotoThin' }}>+91 94971 94971</p>

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

export default GucciApp;

