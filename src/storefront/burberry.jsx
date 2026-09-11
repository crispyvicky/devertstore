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


const img172 = "/storefront/img172.jpg";
const img173 = "/storefront/img173.jpg";
const img174 = "/storefront/img174.jpg";
const img175 = "/storefront/img175.jpg";
const img176 = "/storefront/img176.jpg";
const img177 = "/storefront/img177.jpg";
const img178 = "/storefront/img178.jpg";
const img179 = "/storefront/img179.jpg";
const img180 = "/storefront/img180.jpg";
const img181 = "/storefront/img181.jpg";
const img182 = "/storefront/img182.jpg";
const img183 = "/storefront/img183.jpg";
const img184 = "/storefront/img184.jpg";
const img185 = "/storefront/img185.jpg";
const img186 = "/storefront/img186.jpg";
const img187 = "/storefront/img187.jpg";
const img188 = "/storefront/img188.jpg";
const img189 = "/storefront/img189.jpg";
const img190 = "/storefront/img190.jpg";


const projectData = [
    { img: img172, title: "The Heritage Trench", 
      items: ["The Kensington Long Heritage", "The Chelsea Slim Fit", "The Waterloo Relaxed Fit", "The Camden Heritage Car Coat", "Cotton Gabardine Hooded Trench", "Detachable Hood Taffeta Trench"], 
      prices: ["$2,590", "$2,590", "$2,590", "$1,990", "$2,100", "$1,750"] 
    },
    { img: img173, title: "The Knight Bag Series", 
      items: ["Medium Knight Bag", "Small Knight Bag", "Knight Shoulder Bag in Shearling", "Mini Knight Crossbody", "Knight Pouch with Clip", "Large Knight Duffel"], 
      prices: ["$3,490", "$2,890", "$3,800", "$2,150", "$1,450", "$4,200"] 
    },
    { img: img178, title: "Iconic Bags & Check Totes", 
      items: ["Medium London Tote in Check", "Small Shield Tote", "Large Chess Tote", "Mini Rocking Horse Bag", "Check E-canvas Beach Tote", "Reversible Check Leather Tote"], 
      prices: ["$1,850", "$2,350", "$2,950", "$1,950", "$1,250", "$2,100"] 
    },
    { img: img175, title: "Rocking Horse Collection", 
      items: ["Medium Rocking Horse Bag", "Small Rocking Horse Bag", "Rocking Horse Satchel", "Rocking Horse Shoulder Bag in Suede", "Mini Rocking Horse with Chain"], 
      prices: ["$2,950", "$2,450", "$3,100", "$2,750", "$1,850"] 
    },
    { img: img176, title: "Burberry Footwear", 
      items: ["Leather Chelsea Boots", "Check Cotton Sneakers", "Stirrup Leather Rain Boots", "Knight Buckle Sandals", "Marsh High-Top Sneakers", "House Check Ballerinas"], 
      prices: ["$990", "$650", "$750", "$890", "$850", "$690"] 
    },
    { img: img177, title: "Burberry Beauty & Fragrance", 
      items: ["Burberry Goddess Eau de Parfum", "Burberry Her Elixir 100ml", "Burberry Hero Parfum 100ml", "Mr. Burberry Indigo", "My Burberry Blush"], 
      prices: ["$168", "$172", "$185", "$125", "$150"] 
    },
    { img: img189, title: "Outerwear & Quilts", 
      items: ["Diamond Quilted Jacket", "Check Wool Blend Pea Coat", "Nylon Hooded Puffer", "Reversible Check Down Jacket", "Corduroy Collar Barn Jacket"], 
      prices: ["$1,150", "$2,350", "$1,890", "$2,100", "$1,350"] 
    },
    { img: img179, title: "Good design is a combination of function and beauty.", items: [], prices: [] },
    { img: img184, title: "Scarves & Soft Accessories", 
      items: ["Classic Check Cashmere Scarf", "Lightweight Check Wool Scarf", "Logo Detail Silk Square", "Reversible Check Poncho", "Personalized Heritage Scarf", "Monogram Silk Twill"], 
      prices: ["$620", "$450", "$480", "$1,150", "$750", "$320"] 
    },
    { img: img181, title: "Travel & Lifestyle", 
      items: ["Check E-canvas Wash Bag", "Large Check Duffel Bag", "London Check Passport Holder", "Check Nylon Backpack", "Leather Card Case Lanyard", "Travel Coffee Mug in Check"], 
      prices: ["$550", "$1,950", "$320", "$1,550", "$450", "$120"] 
    },
    { img: img174, title: "To be born British is to win first prize in the lottery of life.", items: [], prices: [] },
    { img: img183, title: "Small Leather Goods", 
      items: ["Check Continental Wallet", "Compact Folded Wallet", "Bifold Wallet with Coin Pocket", "Knight Card Case", "Leather Key Ring Charm", "Zippered Travel Organizer"], 
      prices: ["$720", "$550", "$490", "$380", "$290", "$850"] 
    },
    { img: img180, title: "Burberry Eyewear", 
      items: ["Check Detail Navigator", "B Motif Square Sunglasses", "Iconic Shield Frames", "Oversized Cat-Eye Opticals", "Rimless Aviator Frames"], 
      prices: ["$320", "$380", "$450", "$310", "$350"] 
    },
    { img: img185, title: "Style is a way to say who you are without having to speak.", items: [], prices: [] },
    { img: img182, title: "Ready-To-Wear Basics", 
      items: ["Check Cotton Poplin Shirt", "Logo Appliqué Cotton T-shirt", "Cashmere Blend Cardigan", "Checked Wool Pleated Skirt", "Straight Fit Selvedge Denim", "Embroidered Logo Hoodie"], 
      prices: ["$620", "$490", "$1,250", "$990", "$750", "$890"] 
    },
    { img: img187, title: "Tech Accessories", 
      items: ["Check iPhone 15 Pro Case", "AirPods Case in Check Leather", "Quilted Leather Tablet Sleeve", "MagSafe Card Case", "Check Apple Watch Band"], 
      prices: ["$350", "$320", "$550", "$310", "$290"] 
    },
    { img: img188, title: "Kids & Baby Heritage", 
      items: ["Mini Kensington Trench", "Baby Check Gift Set", "Kids Checked Wool Cape", "Logo Print Cotton Dress", "Checked Changing Bag"], 
      prices: ["$1,150", "$450", "$650", "$320", "$1,250"] 
    },
    { img: img186, title: "Belts & Hardware", 
      items: ["Reversible Plaque Buckle Belt", "Check Leather Belt", "Knight Buckle Slim Belt", "Monogram Leather Belt", "Equestrian Knight Silk Tie"], 
      prices: ["$520", "$480", "$550", "$490", "$250"] 
    },
    { img: img190, title: "Innovation and heritage are the two pillars of our house.", items: [], prices: [] }
];


gsap.registerPlugin(ScrollTrigger);

 const BurberryApp = () => {
    // 1. STATE & REFS
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);
    const uiColor = "#F5F5F7"; 
    const burberryBeige = "#D0B48C"; 

    // 2. LISTEN FOR EXTERNAL HTML TOGGLE ('toggleContact')
    useEffect(() => {
        const handleToggle = () => setIsContactOpen(true);
        window.addEventListener('toggleContact', handleToggle);
        return () => window.removeEventListener('toggleContact', handleToggle);
    }, []);

    // 3. BURBERRY GRID & CONTENT ANIMATION
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

            tl.fromTo(mainImg, 
                { scale: 1.15, filter: "brightness(0.6)" },
                { scale: 1, filter: "brightness(1)", duration: 1.6, ease: "power2.out" }, 
                0
            )
            .to(cells, {
                opacity: 0,
                scale: 0.8,
                duration: 0.7,
                stagger: {
                    amount: 1.2,
                    grid: [10, 10],
                    from: "edges", 
                    axis: "x"      
                },
                ease: "expo.inOut"
            }, 0)
            
            .to(title, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
            .to((leftCol?.querySelectorAll("p") || []), { opacity: 1, x: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" }, "-=0.5")
            .to((rightCol?.querySelectorAll("p") || []), { opacity: 1, x: 0, stagger: 0.05, duration: 0.8, ease: "expo.out" }, "-=0.8");
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
                                <img 
                                    src={mediaUrl(project.img)} 
                                    className="main-image" 
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                                    alt={project.title} 
                                />
                                
                                <div className="grid-overlay" style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gridTemplateRows: 'repeat(10, 1fr)',
                                    zIndex: 2
                                }}>
                                    {[...Array(100)].map((_, j) => (
                                        <div key={j} className="grid-cell" style={{
                                            backgroundColor: burberryBeige,
                                            width: '101%', height: '101%',
                                            border: '0.5px solid rgba(0,0,0,0.05)'
                                        }} />
                                    ))}
                                </div>
                            </div>

                            <div className="side-list-container" style={{ marginTop: '40px' }}>
                                <h3 style={{ fontSize: '42px', borderBottom: '1px solid #333', paddingBottom: '20px', textTransform: 'uppercase', opacity: 0, transform: 'translateY(20px)' }}>
                                    {project.title}
                                </h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Burberry"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px', opacity: 0, transform: 'translateX(-50px)' }}
                                    priceStyle={{ fontSize: '15px', color: '#888', opacity: 0, transform: 'translateX(50px)' }}
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
                            fontFamily: 'RobotoThin' }}>+91 94971 94971 � +91 89197 21762</p>

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



export default BurberryApp;

