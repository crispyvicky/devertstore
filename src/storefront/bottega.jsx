"use client";

import { mediaUrl } from "./media";


import React, { useState, useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CartRoot } from "./CartUI";
import ProductGrid from "./ProductGrid";
import "./atelier.css";




// 1. IMAGE IMPORTS
const img96 = "/storefront/img96.jpg"; const img97 = "/storefront/img97.jpg"; const img98 = "/storefront/img98.jpg";
const img99 = "/storefront/img99.jpg"; const img100 = "/storefront/img100.jpg"; const img101 = "/storefront/img101.jpg";
const img102 = "/storefront/img102.jpg"; const img103 = "/storefront/img103.jpg"; const img104 = "/storefront/img104.jpg";
const img105 = "/storefront/img105.jpg"; const img106 = "/storefront/img106.jpg"; const img107 = "/storefront/img107.jpg";
const img108 = "/storefront/img108.jpg"; const img109 = "/storefront/img109.jpg"; const img110 = "/storefront/img110.jpg";
const img111 = "/storefront/img111.jpg"; const img112 = "/storefront/img112.jpg"; const img113 = "/storefront/img113.jpg";
const img114 = "/storefront/img114.jpg";



    
const projectData = [
    { img: img96, title: "Andiamo Heritage", items: ["Large Andiamo with Handle", "Medium Andiamo"], prices: ["$8,000", "$5,100"] },
    { img: img97, title: "The Andiamo Signature", items: ["Small Andiamo", "Andiamo Clutch"], prices: ["$4,100", "$2,650"] },
    { img: img98, title: "Andiamo Long Collection & Bottega Clutches", items: ["Andiamo Long Shoulder Bag", "Small Andiamo Long", "Bottega Veneta Women's Intrecciato Lambskin Clutch", "Bottega Veneta The Pouch Clutch", "Bottega Veneta Women's Intrecciato Lambskin Clutch", "BOTTEGA VENETA Lauren 1980 Intrecciato Lambskin Clutch"], prices: ["$4,500", "$3,900", "$3,600", "$906.99", "$3,700", "$3,800"] },
    { img: img99, title: "Intrecciato Classics", items: ["Small Cabat", "Mini Wallace", "Bottega Veneta Sardine Mini Leather Shoulder Bag", "BOTTEGA VENETA Mini Hop Shoulder Bag"], prices: ["$4,900", "$2,200", "$3,600", "$3,400"] },
    { img: img100, title: "Bottega Fragrance", items: ["Parco Palladiano XV 100ml", "Illusione for Her 75ml", "Knot Eau de Parfum 75ml"], prices: ["$330", "$165", "$175"] },
    { img: img101, title: "Bottega Veneta pumps", items: ["Knot glossed-leather pumps", "Sofia intrecciato leather", "Canalazzo intrecciato leather pumps", "Canalazzo striped intrecciato leather pumps"], prices: ["$1,990", "$1,890", "$2,600", "$3,900"] },
    { img: img102, title: "Bottega Joaillerie", items: ["Drop Earrings (Small)", "Fin Ring in Silver"], prices: ["$820", "$650"] },
    { img: img103, title: "Ready-to-Wear Essentials", items: ["Leather Trench Coat", "Oversized Wool Sweater"], prices: ["$9,800", "$1,450"] },
    { img: img104, title: "Footwear Icons", items: ["Puddle Boots", "Atomic Pump", "Haddock Boat Shoe", "Lug Boot", "Bee Knee-High Boot"], prices: ["$650", "$1,100", "$950", "$1,450", "$1,650"] },
    { img: img105, title: "When your own initials are enough.", items: [], prices: [] },
    { img: img106, title: "Sandals & Mules", items: ["Jack Flat Sandal", "Stretch Mule", "Ginger Sandal", "Punta Mule"], prices: ["$850", "$1,050", "$950", "$1,150"] },
    { img: img107, title: "Travel & Messenger", items: ["Intrecciato Duffel Bag", "Large Hop Bag", "Cassette Messenger", "Small Intrecciato Backpack", "Jet Set Suitcase", "Belt Bag"], prices: ["$5,200", "$4,400", "$2,800", "$3,500", "$6,500", "$1,950"] },
    { img: img108, title: "Simplicity is the ultimate sophistication.", items: [], prices: [] },
    { img: img109, title: "The Knot & Kalimero", items: ["Knot Minaudiere", "Mini Kalimero Bucket", "Medium Kalimero", "Knot On Strap", "Candy Kalimero"], prices: ["$3,800", "$3,500", "$7,500", "$2,100", "$2,800"] },
    { img: img110, title: "Signature Belts", items: ["Intrecciato Wide Belt", "Horseshoe Slim Belt", "Double Knot Belt", "Triangle Buckle Belt", "Reversible Intrecciato"], prices: ["$950", "$550", "$680", "$590", "$720"] },
    { img: img111, title: "Craftsmanship is a journey, not a destination.", items: [], prices: [] },
    { img: img112, title: "Bottega Eyewear", items: ["Angle Rectangular Frames", "Cat-Eye Acetate", "Aviator Metal", "Square Oversized", "D-Frame Injection", "Men's Navigator", "Round Metal Opticals", "Classic Geometric"], prices: ["$440", "$480", "$520", "$490", "$410", "$550", "$420", "$450"] },
    { img: img113, title: "Small Leather Goods", items: ["Intrecciato Card Case", "Cassette Zipped Wallet", "Bi-fold Wallet", "Key Pouch", "Tri-fold Compact Wallet", "Long Flap Wallet"], prices: ["$390", "$750", "$580", "$450", "$650", "$920"] },
    { img: img114, title: "A new form of craft, rooted in the past but looking to the future.", items: [], prices: [] }
];



gsap.registerPlugin(ScrollTrigger);

const BottegaApp = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);

    // 1. LISTEN FOR YOUR HTML LINK EVENT
     useEffect(() => {
            const handleToggle = () => { setIsSubmitted(false); setIsContactOpen(true); };
            window.addEventListener('toggleContact', handleToggle);
            return () => window.removeEventListener('toggleContact', handleToggle);
        }, []);

    // 2. LUXURY DISSOLVE
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray(".row-wrapper").forEach((row, index) => {
            const tiles = row.querySelectorAll(".grid-tile");
            gsap.set(tiles, { opacity: 1, scale: 1.01 });

            gsap.to(tiles, {
                opacity: 0, scale: 0.85, duration: 1.5, ease: "power2.inOut",
                stagger: { grid: [10, 10], from: "random", amount: 1.8 },
                scrollTrigger: {
                    trigger: row,
                    start: index === 0 ? "top 95%" : "top 85%",
                    toggleActions: "play none none reverse",
                }
            });
        });
    }, []);

    // 3. FIXED SLIDE-OUT (Prevents peeking on load)
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
            <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', overflowX: 'hidden' }}>
                
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ paddingTop: i === 0 ? '250px' : '0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ width: '100%', maxWidth: '1100px' }}>
                            <div className="img-container" style={{ position: 'relative', height: '700px', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(10, 1fr)', backgroundColor: '#050505' }}>
                                <img src={mediaUrl(project.img)} style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                {[...Array(100)].map((_, j) => (
                                    <div key={j} className="grid-tile" style={{ backgroundColor: '#000', zIndex: 2, position: 'relative' }} />
                                ))}
                            </div>
                            
                            <div style={{ marginTop: '28px', borderTop: '1px solid #1a1a1a', paddingTop: '20px' }}>
                                <h2 style={{ fontSize: '22px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '16px' }}>{project.title}</h2>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Bottega Veneta"
                                    collection={project.title}
                                    itemStyle={{ color: '#888' }}
                                    priceStyle={{ color: '#fff', fontWeight: 'bold' }}
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- RIGHT SIDE SLIDE-OUT PANEL --- */}
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

export default BottegaApp;

