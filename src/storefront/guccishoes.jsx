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

const img219 = "/storefront/img219.jpg";
const img220 = "/storefront/img220.jpg";
const img221 = "/storefront/img221.jpg";
const img222 = "/storefront/img222.jpg";
const img223 = "/storefront/img223.jpg";
const img224 = "/storefront/img224.jpg";
const img225 = "/storefront/img225.jpg";
const img226 = "/storefront/img226.jpg";
const img227 = "/storefront/img227.jpg";

const projectData = [
  { 
    img: img219, 
    title: "Gucci Heritage: A Legacy of Italian Craftsmanship.", items: [], prices: []},
  { 
    img: img220, 
    title: "Women's Designer Sandals",
    items: [
        "Women's Interlocking G Slide Sandal", 
        "Women's Horsebit Leather Sandal", 
        "Women's Thong Sandal with Double G", 
        "Women's Slide Sandal with Horsebit", 
        "Women's Platform Sandal with Double G", 
        "Women's Crystal Bombshell Slide"
    ],
    prices: ["$550", "$990", "$880", "$770", "$1,390", "$1,650"]
  },
  { 
    img: img221, 
    title: "Iconic Women's Loafers",
    items: [
        "Women's Jordaan Horsebit Loafer", 
        "Women's Brixton Leather Loafer", 
        "Women's Ragazzo GG Canvas Loafer", 
        "Women's Horsebit 1953 Loafer", 
        "Women's Lug-Sole Horsebit Loafer", 
        "Women's GG Crystal Jordaan Loafer"
    ],
    prices: ["$1,090", "$1,090", "$1,090", "$1,090", "$1,270", "$1,590"]
  },
  { 
    img: img222, 
    title: "Elegance defined through every silhouette.", items: [], prices: []},
  { 
    img: img223, 
    title: "Women's Luxury Boots",
    items: [
        "Women's Signora Leather Bootie", 
        "Women's GG Monogram Combat Boots", 
        "Women's Bombshell GG Canvas Boot", 
        "Women's Horsebit Suede Ankle Boot", 
        "Women's Vittoria Leather Bootie", 
        "Women's Pointed-Toe Knee-High Boot"
    ],
    prices: ["$1,650", "$1,550", "$2,500", "$1,550", "$1,700", "$1,724"]
  },
  { 
    img: img224, 
    title: "Men's Signature Sneakers & Ace Collection",
    items: [
        "Men's Ace Leather Sneaker with Web", 
        "Men's Stretch Leather Low-Top Sneaker", 
        "Men's Re-Web Mixed Media Sneaker", 
        "Men's Screener GG Canvas Sneaker", 
        "Men's Rhyton Logo Leather Sneaker", 
        "Men's Interlocking G Mesh Sneaker"
    ],
    prices: ["$830", "$980", "$1,190", "$1,060", "$1,166", "$920"]
  },
  { 
    img: img225, 
    title: "Men's Formal Loafers & Formal Styles",
    items: [
        "Men's Horsebit 1953 Leather Loafer", 
        "Men's Jordaan Horsebit Loafer", 
        "Men's Terenze Horsebit Loafer", 
        "Men's GG Supreme Leather Loafer", 
        "Men's William Penny Loafer", 
        "Men's Next Studded Horsebit Loafer"
    ],
    prices: ["$1,090", "$1,050", "$1,150", "$1,100", "$1,190", "$1,690"]
  },
  { 
    img: img226, 
    title: "Sophisticated Women's Heels",
    items: [
        "Women's Horsebit Mid-Heel Pump", 
        "Women's Blondie Interlocking G Sandal", 
        "Women's Loafer Pump with Horsebit", 
        "Women's GG-Patterned Heeled Loafer", 
        "Women's 75mm Leather Pump", 
        "Women's Crystal Embellished Mesh Heel"
    ],
    prices: ["$990", "$960", "$1,120", "$990", "$1,490", "$1,250"]
  },
  { 
    img: img227, title: "Walk with confidence in timeless Italian style.", items: [], prices: []}
];

  
gsap.registerPlugin(ScrollTrigger);

const GuccishoesApp = () => {
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

    // 3. GUCCI PRISM REVEAL & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const redChannel = row.querySelector(".rgb-red");
            const greenChannel = row.querySelector(".rgb-green");
            const finalImg = row.querySelector(".main-image-final");
            const title = row.querySelector("h3"); 
            const content = row.querySelector(".side-list-container");
            const items = row.querySelectorAll(".items-col p"); // Add this
            const prices = row.querySelectorAll(".prices-col p"); // Add this
            const priceTags = row.querySelectorAll(".price-tag");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 85%",
                    end: "top 15%",
                    scrub: 1.5,
                }
            });

            

            // The Prism Reveal (RGB Separation)
            tl.fromTo(redChannel, { x: -40, y: -20, opacity: 0 }, { x: 0, y: 0, opacity: 0.6, duration: 2 }, 0)
              .fromTo(greenChannel, { x: 40, y: 20, opacity: 0 }, { x: 0, y: 0, opacity: 0.6, duration: 2 }, 0)
              .fromTo(finalImg, { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 1.5 }, 0.8);

            // Content & Price Shimmer
            const contentTl = gsap.timeline({
                scrollTrigger: {
                    trigger: row,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            contentTl.to(row.querySelector("h3"), { opacity: 1, y: 0, duration: 1 })
                .to(items, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1 }, "-=0.5")
                .to(prices, { opacity: 1, x: 0, duration: 0.8, stagger: 0.1 }, "-=0.8");

            contentTl.to(content, { opacity: 1, y: 0, duration: 1 })
                     .fromTo(priceTags, 
                        { backgroundPosition: "-200% 0", opacity: 0, x: 20 }, 
                        { backgroundPosition: "200% 0", opacity: 1, x: 0, duration: 1.2, stagger: 0.15, ease: "power2.out" }, 
                        "-=0.5"
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
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            <CartRoot />
            <div style={{ backgroundColor: '#000', minHeight: '100vh', color: uiColor, fontFamily: 'Roboto, sans-serif', overflowX: 'hidden' }}>
                
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '400px', paddingTop: i === 0 ? '250px' : '0' }}>
                        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px' }}>
                            
                            {/* IMAGE CONTAINER */}
                            <div className="img-container" style={{ position: 'relative', width: '100%', height: '70vh', overflow: 'hidden', backgroundColor: '#050505' }}>
                                <div className="rgb-red" style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url("${mediaUrl(project.img)}")`, backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'screen', filter: 'sepia(1) hue-rotate(-50deg) brightness(1.2)', zIndex: 1 }}></div>
                                <div className="rgb-green" style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url("${mediaUrl(project.img)}")`, backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'screen', filter: 'sepia(1) hue-rotate(80deg) brightness(1.2)', zIndex: 1 }}></div>
                                <div className="main-image-final" style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: `url("${mediaUrl(project.img)}")`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 2, opacity: 0 }}></div>
                            </div>

                            {/* TEXT CONTENT */}
                              <div className="side-list-container" style={{ marginTop: '40px' }}>
                                <h3 style={{ fontSize: '42px', borderBottom: '1px solid #333', paddingBottom: '20px', textTransform: 'uppercase', opacity: 0, transform: 'translateY(20px)' }}>{project.title}</h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Gucci"
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
}

export default GuccishoesApp;

