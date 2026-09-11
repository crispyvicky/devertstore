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
const img39 = "/storefront/img39.jpg"; const img40 = "/storefront/img40.jpg"; const img41 = "/storefront/img41.jpg";
const img42 = "/storefront/img42.jpg"; const img43 = "/storefront/img43.jpg"; const img44 = "/storefront/img44.jpg";
const img45 = "/storefront/img45.jpg"; const img46 = "/storefront/img46.jpg"; const img47 = "/storefront/img47.jpg";
const img48 = "/storefront/img48.jpg"; const img49 = "/storefront/img49.jpg"; const img50 = "/storefront/img50.jpg";
const img51 = "/storefront/img51.jpg"; const img52 = "/storefront/img52.jpg"; const img53 = "/storefront/img53.jpg";
const img54 = "/storefront/img54.jpg"; const img55 = "/storefront/img55.jpg"; const img56 = "/storefront/img56.jpg";
const img57 = "/storefront/img57.jpg";

// 2. MATHEMATICAL PATH GENERATION (10x10 Grid with Overlap Fix)
const cols = 10;
const rows = 10;
const initialClipPaths = [];
const finalClipPaths = [];

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        const x = c * (100 / cols);
        const y = r * (100 / rows);
        const w = 100 / cols;
        const h = 100 / rows;
        
        // ADDED OVERLAP: Increase width/height by 0.5% to hide black gaps
        const w_overlap = w + 0.5;
        const h_overlap = h + 0.5;
        
        initialClipPaths.push(`polygon(${x}% ${y}%, ${x}% ${y}%, ${x}% ${y}%, ${x}% ${y}%)`);
        finalClipPaths.push(`polygon(${x}% ${y}%, ${x + w_overlap}% ${y}%, ${x + w_overlap}% ${y + h_overlap}%, ${x}% ${y + h_overlap}%)`);
    }
}

    const projectData = [
        { img: img39, title: "Prada Galleria", items: ["Galleria Saffiano Bag", "Small Saffiano Tote"], prices: ["$4,100", "$3,500"] },
        { img: img40, title: "Re-Edition Series", items: ["Re-Edition 2005", "Re-Nylon Backpack"], prices: ["$1,950", "$2,350"] },
        { img: img41, title: "Brushed Leather Cleo", items: ["Cleo Shoulder Bag", "Mini Cleo Bag"], prices: ["$2,700", "$2,300"] },
        { img: img42, title: "The Symbole Collection", items: ["Symbole Jacquard Tote", "Symbole Shoulder Bag"], prices: ["$3,300", "$2,600"] },
        { img: img43, title: "Prada Paradoxe", items: ["Paradoxe EDP 90ml", "Paradoxe Intense"], prices: ["$165", "$175"] },
        { img: img44, title: "Monolith Footwear", items: ["Monolith Boots", "Monolith Loafers"], prices: ["$1,550", "$1,150"] },
        { img: img45, title: "Eternal Gold Jewelry", items: ["Eternal Gold Ring", "Eternal Gold Necklace"], prices: ["$2,800", "$12,400"] },
        { img: img46, title: "Prada Linea Rossa", items: ["Technical Fabric Jacket", "Nylon Sneakers"], prices: ["$2,450", "$975"] },
        { img: img47, title: "America's Cup Sneakers", items: ["Original Patent", "Matte Bike Sneaker"], prices: ["$850", "$850"] },
        { img: img48, title: "The Prada Spirit: Innovation meets Heritage.", items: [], prices: [] },
        { img: img49, title: "Cloudbust Thunder", items: ["Cloudbust High-Top", "Cloudbust Knit"], prices: ["$1,150", "$1,070"] },
        { img: img50, title: "Men's Saffiano Leather", items: ["Brique Shoulder Bag", "Saffiano Briefcase"], prices: ["$2,300", "$3,600"] },
        { img: img51, title: "Obsession with detail defines the aesthetic.", items: [], prices: [] },
        { img: img52, title: "Triangle Logo Series", items: ["Triangle Shoulder Bag", "Triangle Mini Bag"], prices: ["$2,500", "$1,700"] },
        { img: img53, title: "Prada Accessories", items: ["Saffiano Belt", "Logo Plaque Belt"], prices: ["$575", "$625"] },
        { img: img54, title: "Sophistication is the refusal of the ordinary.", items: [], prices: [] },
        { img: img55, title: "Prada Eyewear", items: ["Symbole Sunglasses", "Cinema Frames"], prices: ["$520", "$480"] },
        { img: img56, title: "Small Leather Goods", items: ["Card Holder", "Bifold Wallet"], prices: ["$450", "$675"] },
        { img: img57, title: "Tradition is only a beginning.", items: [], prices: [] },
    ];

const PradaApp = () => {
    // 1. STATE & REFS
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);

    // 2. LISTEN FOR EXTERNAL HTML TOGGLE ('toggleContact')
    useEffect(() => {
        const handleToggle = () => setIsContactOpen(true);
        window.addEventListener('toggleContact', handleToggle);
        return () => window.removeEventListener('toggleContact', handleToggle);
    }, []);

    // 3. PRADA REVEAL ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row, index) => {
            const masks = row.querySelectorAll(".mask");
            const sideList = row.querySelector(".side-list-container");

            masks.forEach((mask, i) => {
                gsap.set(mask, { 
                    clipPath: initialClipPaths[i],
                    webkitClipPath: initialClipPaths[i],
                    opacity: 0,
                    visibility: "visible"
                });
            });

            const tl = gsap.timeline({ 
                scrollTrigger: { 
                    trigger: row, 
                    start: index === 0 ? "top 95%" : "top 90%", 
                    toggleActions: "play none none reverse",
                    fastScrollEnd: true,
                    immediateRender: false 
                } 
            });

            tl.to(masks, {
                opacity: 1,
                duration: 0.3,
                ease: "none"
            })
            .to(masks, {
                clipPath: (i) => finalClipPaths[i],
                webkitClipPath: (i) => finalClipPaths[i],
                duration: 0.8,
                ease: "power2.inOut",
                stagger: { amount: 0.8, from: "random" },
                immediateRender: false 
            }, "-=0.1")
            .to(sideList, { 
                opacity: 1, y: 0, duration: 0.8, ease: "power2.out" 
            }, "-=0.4");
        });

        const timer = setTimeout(() => { ScrollTrigger.refresh(); }, 100);
        return () => clearTimeout(timer);
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
            <div style={{ backgroundColor: '#000', minHeight: '100vh', overflowX: 'hidden' }}>
                
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ 
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '400px', paddingTop: i === 0 ? '250px' : '0' 
                    }}>
                        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px' }}>
                            
                            <div className="img-container" style={{ position: 'relative', width: '100%', height: '700px', overflow: 'hidden', marginBottom: '40px' }}>
                                {[...Array(100)].map((_, j) => (
                                    <div key={j} className={`mask m-${j}`} style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        backgroundImage: `url("${mediaUrl(project.img)}")`, 
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center',
                                        backgroundAttachment: 'scroll' 
                                    }}></div>
                                ))}
                            </div>

                            <div className="side-list-container" style={{ width: '100%', color: '#fff', opacity: 0, transform: 'translateY(30px)' }}>
                                <h3 style={{ fontSize: '42px', marginBottom: '30px', borderBottom: '1px solid #333', paddingBottom: '15px', textTransform: 'uppercase' }}>
                                    {project.title}
                                </h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Prada"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px' }}
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
                            fontFamily: 'RobotoBold',
                            color: '#fff' }}>DEVERT STORE</h2>

                        <p style={{ 
                            color: '#666', 
                            fontSize: '11px', 
                            marginBottom: '5px',
                            color: '#fff' }}>ADDRESS</p>

                        <p style={{ 
                            fontSize: '14px', 
                            marginBottom: '25px', 
                            fontFamily: 'RobotoThin',
                            color: '#fff' }}>Devert Store, Hyderabad</p>

                        <p style={{ 
                            color: '#666', 
                            fontSize: '11px', 
                            marginBottom: '5px',
                            color: '#fff' }}>PHONE</p>

                        <p style={{ 
                            fontSize: '14px', 
                            marginBottom: '40px', 
                            fontFamily: 'RobotoThin',
                            color: '#fff' }}>+91 94971 94971</p>

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
        <h2 style={{ color: '#fff', letterSpacing: '4px' }}>GRAZIE</h2>
        <p style={{ color: '#888' }}>Your inquiry has been received.</p>
    </div>
)}
                </div>
            </div>
        </ReactLenis>
    );
};



export default PradaApp;

