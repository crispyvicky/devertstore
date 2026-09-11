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
const img115 = "/storefront/img115.jpg";
const img116 = "/storefront/img116.jpg";
const img117 = "/storefront/img117.jpg";
const img118 = "/storefront/img118.jpg";
const img119 = "/storefront/img119.jpg";
const img120 = "/storefront/img120.jpg";
const img121 = "/storefront/img121.jpg";
const img122 = "/storefront/img122.jpg";
const img123 = "/storefront/img123.jpg";
const img124 = "/storefront/img124.jpg";
const img125 = "/storefront/img125.jpg";
const img126 = "/storefront/img126.jpg";
const img127 = "/storefront/img127.jpg";
const img128 = "/storefront/img128.jpg";
const img129 = "/storefront/img129.jpg";
const img130 = "/storefront/img130.jpg";
const img131 = "/storefront/img131.jpg";
const img132 = "/storefront/img132.jpg";
const img133 = "/storefront/img133.jpg";

const projectData = [
    { img: img115, title: "Classic Flap Icons", items: ["Maxi Classic Flap", "Jumbo Classic Flap", "Medium Classic Flap", "Small Classic Flap"], prices: ["$12,800", "$12,200", "$11,300", "$10,900"] },
    { img: img116, title: "The Mini Collection", items: ["Mini Rectangular Flap", "Mini Square Flap", "Classic Wallet on Chain (WOC)"], prices: ["$5,400", "$5,200", "$3,500"] },
    { img: img117, title: "Boy Chanel Series", items: ["Large Boy Bag", "New Medium Boy Bag", "Old Medium Boy Bag", "Small Boy Bag", "Boy Wallet on Chain"], prices: ["$8,200", "$7,600", "$6,700", "$7,000", "$3,575"] },
    { img: img118, title: "Chanel 22 & 19 Line", items: ["Chanel 22 Large Bag", "Chanel 22 Medium Bag", "Chanel 19 Large Bag", "Chanel 19 Small Bag", "Chanel 22 Mini Bag"], prices: ["$6,700", "$6,200", "$7,600", "$6,900", "$5,100"] },
    { img: img119, title: "Chanel Signature Shoes", items: ["Lambskin Ballerina Flats", "Two-Tone Slingback Pumps", "Grosgrain Ballet Flats", "Patent Leather Mary Janes"], prices: ["$1,025", "$1,150", "$1,325", "$1,300"] },
    { img: img120, title: "Chanel Fragrance & Beauté", items: ["N°5 Eau de Parfum 100ml", "Les Exclusifs de Chanel - Coromandel", "Bleu de Chanel Parfum 100ml", "Coco Mademoiselle 100ml", "Chance Eau Tendre 100ml"], prices: ["$172", "$500", "$190", "$172", "$172"] },
    { img: img121, title: "Exotic & Specialty Flaps", items: ["Alligator Small Flap", "Python Medium Flap", "Sequin Evening Bag", "Velvet Mini Flap"], prices: ["$32,000", "$18,500", "$6,200", "$4,800"] },
    { img: img122, title: "Chanel Coco Handle", items: ["Large Coco Handle", "Medium Coco Handle", "Small Coco Handle", "Extra Mini Coco Handle"], prices: ["$7,500", "$6,800", "$6,200", "$5,400"] },
    { img: img123, title: "Luxury Loafers & Boots", items: ["Quilted Lambskin Moccasins", "Lace-Up Combat Boots", "Chain Detail Ankle Boots", "Sock Boots"], prices: ["$1,425", "$2,100", "$1,750", "$1,525"] },
    { img: img124, title: "Fashion fades, only style remains the same.", items: [], prices: [] },
    { img: img125, title: "Seasonal Handbags", items: ["Spring Bowling Bag", "Small Hobo Bag", "Heart Clutch with Chain", "Star Evening Bag"], prices: ["$5,100", "$4,900", "$5,500", "$7,200"] },
    { img: img126, title: "Sandals & Summer Wear", items: ["Dad Sandals (Quilted)", "Interlocking CC Slides", "Cord & Leather Sandals", "Platform Thong Sandals"], prices: ["$1,450", "$1,125", "$1,250", "$1,350"] },
    { img: img127, title: "A girl should be two things: classy and fabulous.", items: [], prices: [] },
    { img: img128, title: "Chanel Vanity Cases", items: ["Large Filigree Vanity", "Small Vanity Case with Chain", "Mini Round Vanity Case"], prices: ["$6,400", "$5,100", "$3,200"] },
    { img: img129, title: "Duffle Bags & Backpacks", items: ["Classic Quilted Backpack", "Duma Backpack", "Chanel 22 Backpack", "Chanel Duffle Bag"], prices: ["$6,100", "$5,800", "$5,900", "$3,600"] },
    { img: img130, title: "In order to be irreplaceable one must always be different.", items: [], prices: [] },
    { img: img131, title: "Chanel Eyewear", items: ["Oversized Square Sunglasses", "Butterfly Chain Sunglasses", "Shield Sunglasses", "Cat Eye Opticals", "Pilot Metal Frames"], prices: ["$620", "$750", "$580", "$495", "$535"] },
    { img: img132, title: "Small Leather Goods", items: ["Classic Flap Wallet", "Boy Zip Coin Purse", "Card Holder on Chain", "Quilted Key Holder"], prices: ["$1,250", "$725", "$1,850", "$650"] },
    { img: img133, title: "Luxury is not the opposite of poverty, but the opposite of vulgarity.", items: [], prices: [] }
];

gsap.registerPlugin(ScrollTrigger);

const ChanelApp = () => {
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

    // 3. DIAMOND QUILT & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const cells = row.querySelectorAll(".grid-cell");
            const sideList = row.querySelector(".side-list-container");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.to(cells, {
                opacity: 0,
                scale: 0,
                rotate: 45,        // THE DIAMOND TWEAK: Rotates cells as they vanish
                duration: 0.7,
                stagger: {
                    amount: 1.2,
                    grid: [10, 10], 
                    from: "top left", // Creates the DIAGONAL wave
                    ease: "power2.in"
                },
                ease: "expo.inOut"
            })
            .to(sideList, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");
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
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            <CartRoot />
            <div style={{ backgroundColor: '#000', color: uiColor, minHeight: '100vh', overflowX: 'hidden' }}>
                
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ 
                        marginBottom: '400px', 
                        paddingTop: i === 0 ? '250px' : '0',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px' }}>
                            
                            {/* IMAGE CONTAINER */}
                            <div className="img-container" style={{ 
                                position: 'relative', 
                                width: '100%', 
                                height: '75vh', 
                                overflow: 'hidden', 
                                marginBottom: '50px',
                                backgroundColor: '#0a0a0a' 
                            }}>
                                <img 
                                    src={mediaUrl(project.img)} 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                                    alt={project.title} 
                                />
                                
                                {/* 10x10 PURE BLACK GRID OVERLAY */}
                                <div className="grid-overlay" style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(10, 1fr)',
                                    zIndex: 2
                                }}>
                                    {[...Array(100)].map((_, j) => (
                                        <div key={j} className="grid-cell" style={{
                                            backgroundColor: '#000', 
                                            width: '101%', height: '101%'
                                        }} />
                                    ))}
                                </div>
                            </div>

                            {/* LIST CONTENT */}
                            <div className="side-list-container" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                <h3 style={{ 
                                    fontSize: '42px', borderBottom: '1px solid #333', 
                                    paddingBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px'
                                }}>
                                    {project.title}
                                </h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Chanel"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px' }}
                                    priceStyle={{ fontSize: '15px', color: '#888' }}
                                />
                            </div>

                        </div>
                    </div>
                ))}

                {/* --- CONTACT PANEL (DEVERT STORE) --- */}
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

export default ChanelApp;

