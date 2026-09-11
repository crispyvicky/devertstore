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

const img237 = "/storefront/img237.jpg";
const img238 = "/storefront/img238.jpg";
const img239 = "/storefront/img239.jpg";
const img240 = "/storefront/img240.jpg";
const img241 = "/storefront/img241.jpg";
const img242 = "/storefront/img242.jpg";
const img243 = "/storefront/img243.jpg";
const img244 = "/storefront/img244.jpg";
const img245 = "/storefront/img245.jpg";

const projectData = [
  { 
    img: img237, 
    title: "Dior Savoir-Faire: The Art of the Modern Silhouette.", 
    items: [], 
    prices: [] 
  },
  { 
    img: img238, 
    title: "The Leather Tote Collection",
    items: [
        "Medium Dior Book Tote Black Macrocannage Calfskin", 
        "Medium Dior Book Tote Black Calfskin", 
        "Large Dior Toujours Bag Black Macrocannage Calfskin", 
        "Medium Dior Toujours Bag Olive Taupe Calfskin", 
        "Small Dior Toujours Vertical Tote Bag Black Calfskin", 
        "Medium D-Journey Bag Black Flat Macrocannage"
    ],
    prices: ["$4,400", "$3,450", "$4,700", "$4,300", "$3,600", "$4,700"]
  },
  { 
    img: img239, 
    title: "Iconic Saddle Purse Styles",
    items: [
        "Saddle Bag with Strap Black Grained Calfskin", 
        "Saddle Bag with Strap Blue Dior Oblique Jacquard", 
        "Saddle Bag with Strap Black Ultramatte Calfskin", 
        "Small Saddle Bag with Strap Latte Grained Calfskin", 
        "Saddle Bag with Strap Blue and Tobacco Oblique Denim", 
        "Mini Saddle Bag with Strap Black Grained Calfskin"
    ],
    prices: ["$4,700", "$4,700", "$4,700", "$4,400", "$5,000", "$4,200"]
  },
  { 
    img: img240, 
    title: "Elegance is the only beauty that never fades.", 
    items: [], 
    prices: [] 
  },
  { 
    img: img241, 
    title: "Lady Dior & Lady D-Joy Purses",
    items: [
        "Medium Lady D-Joy Bag Latte Cannage Lambskin", 
        "Small Lady D-Joy Bag Black Cannage Lambskin", 
        "Mini Lady D-Joy Bag Trench Cannage Lambskin", 
        "Small Lady Dior My ABCDior Bag Black Lambskin", 
        "Medium Lady Dior Bag Blue Oblique Canvas", 
        "My Dior Mini Bag Black Cannage Lambskin"
    ],
    prices: ["$5,800", "$5,200", "$4,950", "$5,700", "$6,500", "$3,250"]
  },
  { 
    img: img242, 
    title: "The 30 Montaigne & Caro Collection",
    items: [
        "30 Montaigne Bag Blue Dior Oblique Jacquard", 
        "30 Montaigne Chain Bag Blue Dior Oblique Jacquard", 
        "30 Montaigne East-West Bag with Chain Black Calfskin", 
        "Dior Caro Small Bag Black Supple Cannage Calfskin", 
        "Dior Caro Medium Bag Blush Cannage Calfskin", 
        "Dior Voyage Bag Latte Flat Macrocannage Calfskin"
    ],
    prices: ["$4,100", "$4,000", "$3,600", "$4,100", "$4,500", "$4,600"]
  },
  { 
    img: img243, 
    title: "The New 2026 Bow Bag Series",
    items: [
        "Small Dior Bow Bag Rose Songe Lambskin", 
        "Small Dior Bow Bag Black Lambskin", 
        "Medium Dior Bow Bag Black Lambskin", 
        "Small Dior Bow Bag Latte Lambskin", 
        "Small Dior Bow Bag Buttercup Yellow Lambskin", 
        "Small Dior Bow Bag Hermitage Pink Lambskin"
    ],
    prices: ["$4,400", "$4,400", "$4,900", "$4,400", "$4,200", "$4,200"]
  },
  { 
    img: img244, 
    title: "Novelty & Runway Evening Bags",
    items: [
        "Dior Trianon Bag with Chain Black Macrocannage", 
        "Large Diorly Bag Chocolate Suede Calfskin", 
        "Medium Diorly Bag Sabbia Suede Calfskin", 
        "Dior Jolie Top Handle Mini Bag Black Lambskin", 
        "Dior Book Tote Literary Classics 'Dracula' Edition", 
        "Medium Lady D-Joy Bag Powder Pink Cannage"
    ],
    prices: ["$4,500", "$4,900", "$4,500", "$3,050", "$3,900", "$5,800"]
  },
  { 
    img: img245, 
    title: "Crafting a legacy through material innovation.", 
    items: [], 
    prices: [] 
  }
];
  
gsap.registerPlugin(ScrollTrigger);

const DiorpursesApp = () => {
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

    // 3. TRIPTYCH ASSEMBLY & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const fragments = row.querySelectorAll(".img-fragment");
            const content = row.querySelector(".side-list-container");

            // Triptych Assembly Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 95%", 
                    end: "top 15%",
                    scrub: 1.5, 
                }
            });

            tl.fromTo(fragments[0], { y: 150, scale: 0.8, opacity: 0 }, { y: 0, scale: 1, opacity: 1 }, 0)
              .fromTo(fragments[1], { y: -150, scale: 1.2, opacity: 0 }, { y: 0, scale: 1, opacity: 1 }, 0.1)
              .fromTo(fragments[2], { y: 200, scale: 0.9, opacity: 0 }, { y: 0, scale: 1, opacity: 1 }, 0.2);

            // Text Content Entrance
            gsap.fromTo(content, 
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
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
            <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'Roboto, sans-serif', overflowX: 'hidden' }}>
                
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ 
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '400px', paddingTop: i === 0 ? '250px' : '0' 
                    }}>
                        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px' }}>
                            
                            {/* TRIPTYCH FRAGMENT CONTAINER */}
                            <div className="img-container" style={{ position: 'relative', width: '100%', height: '70vh', display: 'flex', gap: '10px', overflow: 'hidden' }}>
                                {[0, 1, 2].map((j) => (
                                    <div key={j} className="img-fragment" style={{ flex: 1, height: '100%', overflow: 'hidden', position: 'relative', backgroundColor: '#0a0a0a' }}>
                                        <div style={{
                                            position: 'absolute', width: '300%', height: '100%',
                                            backgroundImage: `url("${mediaUrl(project.img)}")`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
                                            left: `-${j * 100}%`
                                        }} />
                                    </div>
                                ))}
                            </div>

                            {/* TEXT CONTENT AREA */}
                            <div className="side-list-container" style={{ marginTop: '50px' }}>
                                <h3 style={{ fontSize: 'clamp(28px, 5vw, 42px)', borderBottom: '1px solid #333', paddingBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '300' }}>
                                    {project.title}
                                </h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Dior"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px', color: '#ccc' }}
                                    priceStyle={{ fontSize: '15px', color: '#888', fontWeight: '500' }}
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

export default DiorpursesApp;

