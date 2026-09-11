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


const img153 = "/storefront/img153.jpg";
const img154 = "/storefront/img154.jpg";
const img155 = "/storefront/img155.jpg";
const img156 = "/storefront/img156.jpg";
const img157 = "/storefront/img157.jpg";
const img158 = "/storefront/img158.jpg";
const img159 = "/storefront/img159.jpg";
const img160 = "/storefront/img160.jpg";
const img161 = "/storefront/img161.jpg";
const img162 = "/storefront/img162.jpg";
const img163 = "/storefront/img163.jpg";
const img164 = "/storefront/img164.jpg";
const img165 = "/storefront/img165.jpg";
const img166 = "/storefront/img166.jpg";
const img167 = "/storefront/img167.jpg";
const img168 = "/storefront/img168.jpg";
const img169 = "/storefront/img169.jpg";
const img170 = "/storefront/img170.jpg";
const img171 = "/storefront/img171.jpg";

const projectData = [
    { img: img153, title: "The Knott Collection", 
      items: ["Knott Medium Shoulder Bag", "Knott Large Tote", "Knott Commuter Bag", "Knott Medium Saddle Bag", "Knott Mini Crossbody", "Knott Zip Slim Wallet"], 
      prices: ["$348", "$398", "$398", "$298", "$198", "$148"] 
    },
    { img: img154, title: "Classic Sam Series", 
      items: ["Sam Icon Nylon Small Tote", "Sam Icon Leather Mini Tote", "Sam Icon Crystal Embellished Mini", "Sam Icon Patent Leather Shoulder Bag", "Sam Icon Embroidered Floral Tote", "Sam Icon Spazzolato Box Bag"], 
      prices: ["$248", "$248", "$448", "$348", "$378", "$328"] 
    },
    { img: img155, title: "Spade New York Monogram", 
      items: ["Spade Flower Monogram Manhattan Tote", "Spade Flower Coated Canvas Case", "Spade Flower Hobo Bag", "Spade Flower Jacquard Drum Bag", "Spade Flower Card Holder"], 
      prices: ["$398", "$128", "$358", "$298", "$78"] 
    },
    { img: img156, title: "Katy & Morgan Series", 
      items: ["Katy Textured Leather Shoulder Bag", "Katy Medium Top-Handle Bag", "Morgan Card Holder", "Morgan Compact Wallet", "Morgan Flap Crossbody", "Morgan Zip-Around Continental Wallet"], 
      prices: ["$358", "$398", "$78", "$148", "$198", "$198"] 
    },
    { img: img157, title: "Kate Spade Footwear", 
      items: ["Veronica Ballet Flats", "Maren Leather Pumps", "Keds x Kate Spade Glitter Sneakers", "Pizazz Bow Sandals", "Amelia Jewel Mules", "Fete Platform Sandals"], 
      prices: ["$198", "$228", "$95", "$148", "$178", "$198"] 
    },
    { img: img158, title: "Fragrance & Beauty", 
      items: ["Kate Spade New York Eau de Parfum 100ml", "Bloom Eau de Toilette 100ml", "Cherish Eau de Parfum 100ml", "Sparkle Intense Parfum", "Kate Spade Body Lotion"], 
      prices: ["$99", "$85", "$105", "$110", "$45"] 
    },
    { img: img159, title: "Hudson & Gramercy", 
      items: ["Hudson Medium Messenger", "Gramercy Medium Flap Shoulder Bag", "Hudson Convertible Crossbody", "Gramercy Textured Leather Mini Bag", "Hudson Large Work Tote"], 
      prices: ["$298", "$398", "$248", "$278", "$348"] 
    },
    { img: img160, title: "Live Colorfully.", items: [], prices: [] },
    { img: img161, title: "Work & Travel Essentials", 
      items: ["Manhattan Large Tote", "Chelsea Weekender Duffle", "Universal 15-inch Laptop Sleeve", "Chelsea Nylon Backpack", "Staci Travel Wallet", "Jeweled Luggage Tag"], 
      prices: ["$498", "$328", "$98", "$248", "$188", "$35"] 
    },
    { img: img162, title: "Party Ready: Novelty Bags", 
      items: ["Pizza Slice 3D Clutch", "Champagne Bottle Crossbody", "Pitter Patter Heart Bag", "Lemon Drop Straw Tote", "Wicker Elephant Bag", "Boxcar 3D Bag"], 
      prices: ["$448", "$498", "$398", "$348", "$398", "$498"] 
    },
    { img: img163, title: "She is quick and curious and playful and strong.", items: [], prices: [] },
    { img: img164, title: "Jewelry & Timepieces", 
      items: ["Heritage Spade Thin Bangle", "Candy Shop Pearl Drop Earrings", "Park Row Silicone Watch", "Social Butterfly Pendant", "Pave Heart Ring", "Scallop Apple Watch Band"], 
      prices: ["$98", "$78", "$150", "$128", "$68", "$100"] 
    },
    { img: img165, title: "Kate Spade Sunglasses", 
      items: ["Gayla Square Oversized", "Adelais Cat Eye Frames", "Zonno Gradient Aviators", "Fayanne Round Frames", "Ayleen Rectangular Sunglasses"], 
      prices: ["$160", "$185", "$175", "$160", "$150"] 
    },
    { img: img166, title: "In order to be irreplaceable one must always be different.", items: [], prices: [] },
    { img: img167, title: "Small Leather Goods", 
      items: ["Staci Bifold Wallet", "Madison Zip Around Wallet", "Spencer Card Holder", "Dumont Passport Holder", "Knott Key Pouch", "Morgan L-Zip Wristlet"], 
      prices: ["$158", "$188", "$68", "$98", "$88", "$118"] 
    },
    { img: img168, title: "Tech Accessories", 
      items: ["iPhone 15 MagSafe Flower Case", "AirPods Pro Silicone Case", "Scallop Laptop Bag", "MagSafe Wallet Stand", "iPad Pro Folio Case"], 
      prices: ["$55", "$45", "$148", "$45", "$85"] 
    },
    { img: img169, title: "Home & Lifestyle", 
      items: ["Larabee Dot Crystal Vase", "Take Note Journal Set", "Insulated Tumbler with Straw", "Polka Dot Picture Frame", "Scallop Serving Bowl"], 
      prices: ["$75", "$24", "$20", "$45", "$65"] 
    },
    { img: img170, title: "Signature Belts & Scarves", 
      items: ["Reversible Spade Leather Belt", "Silk Square Floral Scarf", "Bow Skinny Belt", "Signature Spade Poncho", "Cashmere Blend Beanie"], 
      prices: ["$88", "$98", "$68", "$148", "$78"] 
    },
    { img: img171, title: "Smile, it’s the best accessory you can wear.", items: [], prices: [] }
];


gsap.registerPlugin(ScrollTrigger);

  const KatespadeApp = () => {
    // 1. STATE & REFS
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);

    const uiColor = "#F5F5F7"; 
    const spadePink = "#e31b6d"; // ICONIC KATE SPADE PINK

    // 2. LISTEN FOR EXTERNAL HTML TOGGLE ('toggleContact')
    useEffect(() => {
        const handleToggle = () => setIsContactOpen(true);
        window.addEventListener('toggleContact', handleToggle);
        return () => window.removeEventListener('toggleContact', handleToggle);
    }, []);

    // 3. POLKA DOT POP & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const dots = row.querySelectorAll(".dot-cell");
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
                { scale: 1.15 },
                { scale: 1, duration: 1.5, ease: "power2.out" }, 
                0
            )
            // Polka Dot Pop (Dots shrink and bounce away)
            .to(dots, {
                opacity: 0,
                scale: 0,
                duration: 0.8,
                stagger: {
                    amount: 1,
                    grid: [5, 5],
                    from: "random",
                },
                ease: "back.in(1.7)" 
            }, 0)
            
            // Content Entrance
            .to(title, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
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
                            
                            <div className="img-container" style={{ position: 'relative', height: '70vh', overflow: 'hidden', backgroundColor: '#111' }}>
                                <img src={mediaUrl(project.img)} className="main-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={project.title} />
                                
                                <div className="grid-overlay" style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(5, 1fr)',
                                    zIndex: 2
                                }}>
                                    {[...Array(25)].map((_, j) => (
                                        <div key={j} className="dot-cell" style={{
                                            backgroundColor: spadePink,
                                            borderRadius: '50%',
                                            width: '90%', height: '90%',
                                            margin: 'auto'
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
                                    brand="Kate Spade"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px', opacity: 0, transform: 'translateX(-40px)' }}
                                    priceStyle={{ fontSize: '15px', color: '#888', opacity: 0, transform: 'translateX(40px)' }}
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
        <h2 style={{ color: '#fff', letterSpacing: '4px' }}>GRAZIE</h2>
        <p style={{ color: '#888' }}>Your inquiry has been received.</p>
    </div>
)}
                </div>

            </div>
        </ReactLenis>
    );
};

export default KatespadeApp;

