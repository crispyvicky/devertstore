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

const img191 = "/storefront/img191.jpg";
const img192 = "/storefront/img192.jpg";
const img193 = "/storefront/img193.jpg";
const img194 = "/storefront/img194.jpg";
const img195 = "/storefront/img195.jpg";
const img196 = "/storefront/img196.jpg";
const img197 = "/storefront/img197.jpg";
const img198 = "/storefront/img198.jpg";
const img199 = "/storefront/img199.jpg";
const img200 = "/storefront/img200.jpg";
const img201 = "/storefront/img201.jpg";
const img202 = "/storefront/img202.jpg";
const img203 = "/storefront/img203.jpg";
const img204 = "/storefront/img204.jpg";
const img205 = "/storefront/img205.jpg";
const img206 = "/storefront/img206.jpg";
const img207 = "/storefront/img207.jpg";
const img208 = "/storefront/img208.jpg";
const img209 = "/storefront/img209.jpg";



const projectData = [
    { img: img191, title: "Iconic Baguette Series", 
      items: ["Baguette Large in FF Canvas", "Baguette Chain Midi", "Baguette Pouch with Handle", "Baguette Embroidery", "Baguette Mini with Fringe", "Sequined Baguette 1997"], 
      prices: ["$3,750", "$3,290", "$2,150", "$4,300", "$2,850", "$4,900"] 
    },
    { img: img192, title: "The Peekaboo Collection", 
      items: ["Peekaboo ISeeU Medium", "Peekaboo ISeeU Small", "Peekaboo Cut in Python", "Peekaboo X-Lite", "Peekaboo Petite with Crystals", "Peekaboo Soft Leather Tote"], 
      prices: ["$5,400", "$4,600", "$6,800", "$4,200", "$5,900", "$5,200"] 
    },
    { img: img193, title: "Fendi First & Shoppers", 
      items: ["Fendi First Medium Clutch", "Fendi First Small in Nappa", "Fendi Sunshine Medium Tote", "Fendi Sunshine Shopper Mini", "Fendi First Sight Bag", "FF Monogram Canvas Tote"], 
      prices: ["$3,950", "$3,100", "$3,100", "$1,750", "$2,850", "$2,450"] 
    },
    { img: img194, title: "Mon Tresor & Origami", 
      items: ["Mon Tresor Bucket Bag Small", "Fendi Origami Medium", "Mon Tresor FF Jacquard Mini", "Fendi Origami Mini", "Mon Tresor with Fur Trim"], 
      prices: ["$1,950", "$2,950", "$1,850", "$2,100", "$2,600"] 
    },
    { img: img195, title: "Fendi Signature Footwear", 
      items: ["Fendi First Leather Slingbacks", "Colibrì Lite Mesh Pumps", "Fendi Match Sneakers", "Baguette Heel Sandals", "Fendi Domino Low-Tops", "Zucca Print Biker Boots"], 
      prices: ["$1,350", "$1,150", "$930", "$1,250", "$795", "$1,450"] 
    },
    { img: img196, title: "Fendi Fragrance & Beauty", 
      items: ["Fendi Furiosa Eau de Parfum", "Fan di Fendi 100ml", "Fendi L'Acquarossa Parfum", "Fendi Theorema", "Fendi Palazzo"], 
      prices: ["$145", "$130", "$155", "$180", "$140"] 
    },
    { img: img197, title: "Ready-To-Wear Icons", 
      items: ["FF Monogram Cashmere Sweater", "Silk FF Karligraphy Shirt", "Shearling FF Jacket", "Reversible Mink Fur Coat", "Nappa Leather Pencil Skirt"], 
      prices: ["$1,850", "$1,450", "$6,500", "$18,000", "$3,200"] 
    },
    { img: img198, title: "Fendi is my Italian version of creativity.", items: [], prices: [] },
    { img: img199, title: "Scarves & Silk Accents", 
      items: ["FF Cashmere Scarf", "Silk Karligraphy Wrap", "Fox Fur Stole", "Baguette Silk Twilly", "Logo Print Poncho", "Personalized Wool Wrap"], 
      prices: ["$850", "$450", "$2,800", "$220", "$1,350", "$950"] 
    },
    { img: img200, title: "Travel & Lifestyle", 
      items: ["FF Cabin Suitcase", "Zucca Canvas Duffel Bag", "Fendi Passport Cover", "FF Nylon Backpack", "Logo Luggage Tag", "Fendi Travel Set in Silk"], 
      prices: ["$3,800", "$2,450", "$420", "$2,100", "$250", "$850"] 
    },
    { img: img201, title: "The Fendi logo is more than just a symbol; it's a family history.", items: [], prices: [] },
    { img: img202, title: "Small Leather Goods", 
      items: ["Baguette Continental Wallet", "FF Micro Tri-fold Wallet", "Peekaboo Card Case", "Fendi First Coin Purse", "Baguette Key Ring", "O’Lock Zip Wallet"], 
      prices: ["$850", "$590", "$450", "$650", "$420", "$790"] 
    },
    { img: img203, title: "Fendi Eyewear", 
      items: ["Fendi First Square Sunglasses", "Baguette Metal Aviators", "FF Monogram Cat-Eye", "O'Lock Oval Frames", "Fendi Sky Opticals"], 
      prices: ["$520", "$480", "$450", "$410", "$390"] 
    },
    { img: img204, title: "Elegance is the only beauty that never fades.", items: [], prices: [] },
    { img: img205, title: "Fendi Casa & Pet Essentials", 
      items: ["FF Logo Dog Leash", "Zucca Canvas Pet Carrier", "Fendi Casa Silk Pillow", "FF Motif Dog Collar", "Cashmere Pet Blanket", "Fendi Casa Velvet Throw"], 
      prices: ["$450", "$2,600", "$550", "$380", "$1,150", "$1,450"] 
    },
    { img: img206, title: "O’Lock & Fashion Jewelry", 
      items: ["O’Lock Bracelet in Gold Finish", "F Is Fendi Stud Earrings", "FF Monogram Ring", "Baguette Chain Necklace", "O'Lock Hair Clip"], 
      prices: ["$590", "$350", "$320", "$750", "$420"] 
    },
    { img: img207, title: "Kids & Baby Monster", 
      items: ["Monster Eyes Leather Booties", "Zucca Print Changing Bag", "Kids FF Down Jacket", "Monster Eyes Cotton Tee", "Baby FF Gift Set"], 
      prices: ["$380", "$1,550", "$1,100", "$220", "$450"] 
    },
    { img: img208, title: "Belts & Hardware Accents", 
      items: ["FF Baguette Reversible Belt", "F Is Fendi Slim Belt", "O’Lock Buckle Belt", "Zucca Fabric Belt", "Baguette Chain Belt"], 
      prices: ["$620", "$490", "$550", "$450", "$850"] 
    },
    { img: img209, title: "Creativity is the engine of the Roman soul.", items: [], prices: [] }
];



gsap.registerPlugin(ScrollTrigger);

const FendiApp = () => {
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

    // 3. FENDI RIPPLE & CONTENT ANIMATION
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

            // Image Zoom
            tl.fromTo(mainImg, 
                { scale: 1.2, filter: "brightness(0.5)" },
                { scale: 1, filter: "brightness(1)", duration: 1.6, ease: "power2.out" }, 
                0
            )
            // Ripple Reveal from Center
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
                                
                                <div className="grid-overlay" style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(10, 1fr)',
                                    zIndex: 2
                                }}>
                                    {[...Array(100)].map((_, j) => (
                                        <div key={j} className="grid-cell" style={{
                                            backgroundColor: fendiYellow,
                                            width: '101%', height: '101%',
                                            border: '0.5px solid rgba(0,0,0,0.1)'
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

export default FendiApp;

