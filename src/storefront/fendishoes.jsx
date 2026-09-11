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

const img228 = "/storefront/img228.jpg";
const img229 = "/storefront/img229.jpg";
const img230 = "/storefront/img230.jpg";
const img231 = "/storefront/img231.jpg";
const img232 = "/storefront/img232.jpg";
const img233 = "/storefront/img233.jpg";
const img234 = "/storefront/img234.jpg";
const img235 = "/storefront/img235.jpg";
const img236 = "/storefront/img236.jpg";

const projectData = [
  { 
    img: img228, 
    title: "Roman Modernity: The Art of Fendi Footwear.", 
    items: [], 
    prices: [] 
  },
  { 
    img: img229, 
    title: "Women's Fendi First & Signature Heels",
    items: ["Fendi First Leather Slingback", "Colibrì Lite Mesh Pump", "Baguette FF Mirror Heel", "Fendi Filo Leather Pump", "Fendi First Metallic Sandal", "Colibrì Medium Heel Bootie"],
    prices: ["$1,450", "$1,150", "$1,290", "$1,100", "$1,350", "$1,250"]
  },
  { 
    img: img232, 
    title: "Signature FF Slide Sandals",
    items: ["FF Motif Rubber Slide", "Fendi Feel Leather Slide", "Baguette FF Buckle Sandal", "FF Canvas Flat Mule", "Fendi First Shearling Slide", "FF Leather Slide Sandal"],
    prices: ["$450", "$850", "$950", "$790", "$1,150", "$1,050"]
  },
  { 
    img: img231, 
    title: "Excellence in every step, from Rome to the world.", 
    items: [], 
    prices: [] 
  },
  { 
    img: img230, 
    title: "High-Fashion Platform Sandals",
    items: ["Fendi First Platform Sandal", "Baguette Wedge Sandal", "Sunshine FF Platform Mule", "FF Leather Chunky Sandal", "Fendi Filo Platform Heel", "FF Motif Espadrille Wedge"],
    prices: ["$1,390", "$1,250", "$990", "$1,100", "$1,450", "$890"]
  },
  { 
    img: img233, 
    title: "Women's Luxury FF Boots",
    items: ["Biker II FF Leather Boot", "Fendi First Ankle Boot", "FF Canvas Over-the-Knee Boot", "Delfina FF Leather Bootie", "Fendi Filo Tall Boot", "Baggy FF Biker Boot"],
    prices: ["$1,350", "$1,750", "$2,100", "$1,490", "$2,450", "$1,550"]
  },
  { 
    img: img234, 
    title: "Seasonal Shearling & Rain Boots",
    items: ["FF Felt Moon Boot", "Fendigraphy Rain Boot", "FF Shearling Snow Boot", "Baguette Leather Chelsea Boot", "Fendi First Fur-Lined Bootie", "FF Lug Sole Combat Boot"],
    prices: ["$1,250", "$950", "$1,450", "$1,390", "$1,850", "$1,290"]
  },
  { 
    img: img235, 
    title: "Men's Fendi Flow & Match Sneakers",
    items: ["Fendi Flow Suede Sneaker", "Fendi Match Leather Low-Top", "FF Mesh Tech Sneaker", "Fendi Faster Knit Sneaker", "FF O'Lock Runner Sneaker", "Fendi Flow Mixed Media Sneaker"],
    prices: ["$950", "$930", "$890", "$1,100", "$1,050", "$990"]
  },
  { 
    img: img236, 
    title: "Crafting the future of style since 1925.", 
    items: [], 
    prices: [] 
  }
];

gsap.registerPlugin(ScrollTrigger);

const FendishoesApp = () => {
    // 1. STATE & REFS
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);

    const uiColor = "#F5F5F7"; 
    const fendiYellow = "#F9B100"; // ICONIC FENDI ROMA YELLOW

    // 2. LISTEN FOR EXTERNAL HTML TOGGLE ('toggleContact')
    useEffect(() => {
        const handleToggle = () => setIsContactOpen(true);
        window.addEventListener('toggleContact', handleToggle);
        return () => window.removeEventListener('toggleContact', handleToggle);
    }, []);

    // 3. FENDI SLAT & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const slats = row.querySelectorAll(".slat-cell");
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

            // Atmospheric Drift
            tl.fromTo(mainImg, 
                { scale: 1.15, filter: "brightness(0.6)" },
                { scale: 1, filter: "brightness(1)", duration: 1.8, ease: "power2.out" }, 
                0
            )
            
            // Structural Slat Unfold (Shrink horizontally)
            .to(slats, {
                scaleX: 0,
                opacity: 0,
                duration: 1.2,
                stagger: {
                    amount: 0.8,
                    from: "center", 
                },
                ease: "expo.inOut"
            }, 0)
            
            // Liquid Split Content
            .to(title, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
            .to((leftCol?.querySelectorAll("p") || []), { 
                opacity: 1, x: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" 
            }, "-=0.5")
            .to((rightCol?.querySelectorAll("p") || []), { 
                opacity: 1, x: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" 
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
                    <div key={i} className="row-wrapper" style={{ marginBottom: '400px', paddingTop: i === 0 ? '250px' : '0' }}>
                        <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
                            
                            <div className="img-container" style={{ position: 'relative', height: '75vh', overflow: 'hidden', backgroundColor: '#0a0a0a' }}>
                                <img src={mediaUrl(project.img)} className="main-image" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} alt={project.title} />
                                
                                <div className="slat-overlay" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', zIndex: 2 }}>
                                    {[...Array(12)].map((_, j) => (
                                        <div key={j} className="slat-cell" style={{
                                            backgroundColor: fendiYellow,
                                            flex: 1, height: '100%',
                                            transformOrigin: "center",
                                            borderLeft: '0.5px solid rgba(0,0,0,0.05)',
                                            borderRight: '0.5px solid rgba(0,0,0,0.05)'
                                        }} />
                                    ))}
                                </div>
                            </div>

                            <div className="side-list-container" style={{ marginTop: '40px' }}>
                                <h3 style={{ fontSize: '42px', borderBottom: '1px solid #333', paddingBottom: '20px', textTransform: 'uppercase', opacity: 0, transform: 'translateY(20px)' }}>{project.title}</h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Fendi"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px', opacity: 0, transform: 'translateX(-60px)' }}
                                    priceStyle={{ fontSize: '15px', color: '#888', opacity: 0, transform: 'translateX(60px)' }}
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

export default FendishoesApp;

