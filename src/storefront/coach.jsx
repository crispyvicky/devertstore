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


const img134 = "/storefront/img134.jpg";
const img135 = "/storefront/img135.jpg";
const img136 = "/storefront/img136.jpg";
const img137 = "/storefront/img137.jpg";
const img138 = "/storefront/img138.jpg";
const img139 = "/storefront/img139.jpg";
const img140 = "/storefront/img140.jpg";
const img141 = "/storefront/img141.jpg";
const img142 = "/storefront/img142.jpg";
const img143 = "/storefront/img143.jpg";
const img144 = "/storefront/img144.jpg";
const img145 = "/storefront/img145.jpg";
const img146 = "/storefront/img146.jpg";
const img147 = "/storefront/img147.jpg";
const img148 = "/storefront/img148.jpg";
const img149 = "/storefront/img149.jpg";
const img150 = "/storefront/img150.jpg";
const img151 = "/storefront/img151.jpg";
const img152 = "/storefront/img152.jpg";

const projectData = [
    { img: img134, title: "The Tabby Series", items: ["Tabby Shoulder Bag 26", "Soft Tabby Hobo", "Pillow Tabby 18", "Tabby Wristlet"], prices: ["$450", "$395", "$350", "$225"] },
    { img: img137, title: "Coach Rogue Icons", items: ["Rogue Bag 25 in Regenerative Leather", "Rogue Top Handle", "Rogue Briefcase"], prices: ["$695", "$595", "$795"] },
    { img: img136, title: "Willow Bags & Market Totes", items: ["Willow Tote 24", "Market Tote in Polished Pebble", "Willow Shoulder Bag"], prices: ["$295", "$350", "$395"] },
    { img: img135, title: "Brooklyn & Empire Collection", items: ["Brooklyn Shoulder Bag 39", "Empire Carryall 40", "Brooklyn Bag 28"], prices: ["$495", "$750", "$295"] },
    { img: img138, title: "Signature Footwear", items: ["Leah Platform Loafer", "Irene Mule", "Hanna Loafer", "C301 High Top Sneaker"], prices: ["$195", "$150", "$165", "$225"] },
    { img: img139, title: "Coach Fragrance", items: ["Coach Love Eau de Parfum 90ml", "Coach Dreams Moonlight", "Coach Wild Rose 90ml"], prices: ["$112", "$108", "$112"] },
    { img: img140, title: "Cary & Cassie Crossbody", items: ["Cary Shoulder Bag", "Cassie Crossbody 19", "Cary Crossbody"], prices: ["$395", "$295", "$295"] },
    { img: img141, title: "Heritage Backpacks", items: ["Charter Backpack", "Gotham Backpack in Signature Canvas", "League Flap Backpack"], prices: ["$550", "$595", "$650"] },
    { img: img142, title: "Boots & Outerwear", items: ["Stina Bootie", "Moto Boot", "Shearling Aviator Jacket", "Signature Trench Coat"], prices: ["$275", "$295", "$1,200", "$550"] },
    { img: img143, title: "Craft and creativity are at the heart of everything we do.", items: [], prices: [] },
    { img: img144, title: "The Swinger & Penn", items: ["Swinger Bag with Zip", "Penn Shoulder Bag", "Studio Baguette Bag"], prices: ["$295", "$250", "$350"] },
    { img: img145, title: "Coach Sandals", items: ["Udele Slide", "Natalee Jelly Sandal", "Juliet Sandal"], prices: ["$95", "$95", "$185"] },
    { img: img146, title: "Authenticity is the soul of Coach.", items: [], prices: [] },
    { img: img147, title: "Business Essentials", items: ["Metropolitan Portfolio", "Kennedy Briefcase", "Charter Slim Case"], prices: ["$450", "$550", "$350"] },
    { img: img148, title: "Small Leather Goods", items: ["Wyn Small Wallet", "Billfold Wallet", "Zip Card Case", "Essential Card Case"], prices: ["$150", "$125", "$95", "$75"] },
    { img: img149, title: "Design for the long haul.", items: [], prices: [] },
    { img: img150, title: "Coach Eyewear", items: ["Sculpted C Square Sunglasses", "Horse and Carriage Aviators", "Cat Eye Frames"], prices: ["$185", "$165", "$175"] },
    { img: img151, title: "Jewelry & Belts", items: ["Harness Buckle Belt", "Signature Chain Link Bracelet", "Tea Rose Stud Earrings"], prices: ["$125", "$95", "$65"] },
    { img: img152, title: "Coach is about being your true self.", items: [], prices: [] }
];

gsap.registerPlugin(ScrollTrigger);

 const CoachApp = () => {
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

    // 3. SPIRAL MOSAIC & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const cells = row.querySelectorAll(".grid-cell");
            const title = row.querySelector("h3");
            const leftCol = row.querySelector(".items-col");
            const rightCol = row.querySelector(".prices-col");
            const mainImg = row.querySelector(".main-image");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            });

            // Shadow Drift: Subtle zoom out
            tl.fromTo(mainImg, 
                { scale: 1.2, filter: "brightness(0.4)" },
                { scale: 1, filter: "brightness(1)", duration: 1.5, ease: "power2.out" }, 
                0
            )
            // Spiral Mosaic: Dissolve from center
            .to(cells, {
                opacity: 0,
                scale: 0,
                duration: 0.8,
                stagger: {
                    amount: 1.2,
                    grid: [10, 10],
                    from: "center",
                    ease: "power2.in"
                },
                ease: "expo.inOut"
            }, 0) 
            
            // Liquid Split Content
            .to(title, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.6")
            .to((leftCol?.querySelectorAll("p") || []), { 
                opacity: 1, x: 0, stagger: 0.05, duration: 0.8, ease: "back.out(1.7)" 
            }, "-=0.5")
            .to((rightCol?.querySelectorAll("p") || []), { 
                opacity: 1, x: 0, stagger: 0.05, duration: 0.8, ease: "back.out(1.7)" 
            }, "-=0.8");
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
                        display: 'flex', flexDirection: 'column', alignItems: 'center'
                    }}>
                        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px' }}>
                            
                            <div className="img-container" style={{ 
                                position: 'relative', width: '100%', height: '75vh', 
                                overflow: 'hidden', marginBottom: '50px', backgroundColor: '#000' 
                            }}>
                                <img 
                                    src={mediaUrl(project.img)} 
                                    className="main-image"
                                    style={{ 
                                        width: '100%', height: '100%', objectFit: 'cover', 
                                        display: 'block', transformOrigin: 'center center' 
                                    }} 
                                    alt={project.title} 
                                />
                                
                                <div className="grid-overlay" style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(10, 1fr)',
                                    zIndex: 2
                                }}>
                                    {[...Array(100)].map((_, j) => (
                                        <div key={j} className="grid-cell" style={{
                                            backgroundColor: '#000', width: '101%', height: '101%'
                                        }} />
                                    ))}
                                </div>
                            </div>

                            <div className="side-list-container">
                                <h3 style={{ 
                                    fontSize: '42px', borderBottom: '1px solid #333', 
                                    paddingBottom: '20px', textTransform: 'uppercase', 
                                    opacity: 0, transform: 'translateY(20px)' 
                                }}>
                                    {project.title}
                                </h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Coach"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px', opacity: 0, transform: 'translateX(-60px)' }}
                                    priceStyle={{ fontSize: '15px', color: '#888', opacity: 0, transform: 'translateX(60px)' }}
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

export default CoachApp;

