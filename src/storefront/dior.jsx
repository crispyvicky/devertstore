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
const img58 = "/storefront/img58.jpg"; const img59 = "/storefront/img59.jpg"; const img60 = "/storefront/img60.jpg";
const img61 = "/storefront/img61.jpg"; const img62 = "/storefront/img62.jpg"; const img63 = "/storefront/img63.jpg";
const img64 = "/storefront/img64.jpg"; const img65 = "/storefront/img65.jpg"; const img66 = "/storefront/img66.jpg";
const img67 = "/storefront/img67.jpg"; const img68 = "/storefront/img68.jpg"; const img69 = "/storefront/img69.jpg";
const img70 = "/storefront/img70.jpg"; const img71 = "/storefront/img71.jpg"; const img72 = "/storefront/img72.jpg";
const img73 = "/storefront/img73.jpg"; const img74 = "/storefront/img74.jpg"; const img75 = "/storefront/img75.jpg";
const img76 = "/storefront/img76.jpg";



    const projectData = [
        { img: img58, title: "Lady Dior Heritage", items: ["Lady Dior My ABCDior Bag", "Lady D-Joy Bag"], prices: ["$6,000", "$5,100"] },
        { img: img59, title: "The Saddle Icon", items: ["Saddle Bag with Strap", "Saddle Pouch"], prices: ["$4,400", "$2,450"] },
        { img: img60, title: "Dior Book Tote", items: ["Medium Dior Book Tote", "Small Dior Book Tote"], prices: ["$3,350", "$3,100"] },
        { img: img61, title: "30 Montaigne Series", items: ["30 Montaigne Avenue Bag", "30 Montaigne Box Bag"], prices: ["$3,700", "$3,500"] },
        { img: img62, title: "Dior Fragrance", items: ["Miss Dior Eau de Parfum 100ml", "Sauvage Elixir 60ml", "Dior Poison Girl Eau de Parfum 100ml"], prices: ["$175", "$180", "$180"] },
        { img: img63, title: "B23 Sneaker Line", items: ["B23 High-Top Sneaker", "B23 Low-Top Sneaker"], prices: ["$1,200", "$1,100"] },
        { img: img64, title: "Dior Joaillerie", items: ["Bois de Rose Ring", "Rose des Vents Necklace"], prices: ["$2,350", "$10,500"] },
        { img: img65, title: "Dior 8 Collection", items: ["Dior 8 Cargo Pants", "Dior 8 Hooded Cardigan"], prices: ["$2,100", "$2,550"] },
        { img: img66, title: "B27 Sneakers", items: ["B27 Low-Top Sneaker", "B27 High-Top Sneaker", "B20 Line High Performance Tech Sneaker", "B33 Line with Dior Gravity Leather", "B57 Line classic basketball silhouette"], prices: ["$1,100", "$1,250", "$1,250", "$1,185", "$1,200"] },
        { img: img67, title: "In the world of fashion, the name Dior is a myth.", items: [], prices: [] },
        { img: img68, title: "D-Connect Series", items: ["D-Connect Sneaker", "D-Connect Sandal", "Dior Women's Dioract Lambskin Sandal", "Dior Women's Dioract Platform Lambskin Sandal"], prices: ["$1,050", "$975", "$1,200", "$1,350"] },
        { img: img69, title: "Women & Men's Saddle Collection", items: ["Dior Lingot 22 Bag", "Saddle Messenger Bag", "Dior Men's CD Icon Zipped Messenger Bag", "Dior Men's Saddle Messenger Bag", "Dior Men's Safari Bag in Dior Oblique Jacquard", "Dior Men's Rider 2.0 Zipped Messenger Bag"], prices: ["$2,350", "$2,900", "$2,900", "$2,900", "$2,600", "$2,600"] },
        { img: img70, title: "Elegance must be the right combination of distinction and naturalness.", items: [], prices: [] },
        { img: img71, title: "CD Signature & Hobo Collection", items: ["CD Signature Hobo Bag", "CD Signature Oval Bag", "Dior Women's CD Signature Hobo Mini Bag in Dior Oblique Jacquard", "Dior Women's Diorstar Hobo Bag in Dior Oblique Jacquard", "Dior Miss Caro Hobo Mini Bag in Lambskin"], prices: ["$3,300", "$2,100", "$1,895","$2,500", "$2,750" ] },
        { img: img72, title: "Dior's Saddle and 30 Montaigne Belts", items: ["Dior Women's Reversible Saddle Calfskin Belt", "Dior Women's Saddle Belt in Dior Oblique Jacquard", "Dior Women's Saddle Calfskin Belt","30 Montaigne Belt", "Saddle Belt"], prices: ["$740", "$680","$680", "$710", "$650"] },
        { img: img73, title: "A woman's perfume tells more about her than her handwriting.", items: [], prices: [] },
        { img: img74, title: "Dior Eyewear", items: ["DiorMidnight S1I", "DiorClub M1U", "Dior 30MONTAIGNE S10F Square Ladies Sunglasses", "Dior Women's DiorSignature B1U Butterfly Sunglasses", "Christian Dior Women's B2I Butterfly Sunglasses", "Dior Clover S2U Gradient Square Sunglasses", "Dior DiorB23 S1I DM40052I Sunglasses Men", "DIOR - Diorblacksuit Ri Black Pantos Sunglasses Men"], prices: ["$450", "$710", "$580", "$590", "$500", "630", "$480", "$490"] },
        { img: img75, title: "Small Leather Goods", items: ["Lady Dior 5-Gusset Card Holder", "Saddle Lotus Wallet", "Women Dior Dior Freesia Card Holder", "Dior Women's Saddle Lotus Grained Calfskin Wallet", "Dior Lady Dior Bloom Card Holder in Cannage Lambskin", "Dior Women's Caro Dahlia Cannage Calfskin Wallet"], prices: ["$550", "$650", "$430", "$680", "$530", "$680"] },
        { img: img76, title: "Everything I know, see, or hear, every part of my life is transformed into dresses.", items: [], prices: [] },
    ];


  gsap.registerPlugin(ScrollTrigger);

const DiorApp = () => {
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

    // 3. DIOR IRIS REVEAL & CONTENT ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        const rows = gsap.utils.toArray(".row-wrapper");

        rows.forEach((row) => {
            const mask = row.querySelector(".iris-mask");
            const content = row.querySelector(".side-list-container");

            if (mask) {
                gsap.fromTo(mask, 
                    { autoAlpha: 1, clipPath: "circle(0.1% at 50% 50%)", webkitClipPath: "circle(0.1% at 50% 50%)" },
                    {
                        clipPath: "circle(75% at 50% 50%)",
                        webkitClipPath: "circle(75% at 50% 50%)",
                        scrollTrigger: {
                            trigger: row,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: 1
                        }
                    }
                );
            }

            if (content) {
                gsap.to(content, {
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: row,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        });
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
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '300px', paddingTop: i === 0 ? '250px' : '0' 
                    }}>
                        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px' }}>
                            <div className="img-container" style={{ position: 'relative', width: '100%', height: 'clamp(350px, 65vh, 750px)', overflow: 'hidden', marginBottom: '40px' }}>
                                <div className="iris-mask" style={{
                                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                    backgroundImage: `url("${mediaUrl(project.img)}")`, 
                                    backgroundSize: 'cover', 
                                    backgroundPosition: 'center',
                                    clipPath: 'circle(0% at 50% 50%)', 
                                    webkitClipPath: 'circle(0% at 50% 50%)'
                                }}></div>
                            </div>

                            <div className="side-list-container" style={{ opacity: 0, transform: 'translateY(30px)' }}>
                                <h3 style={{ fontSize: 'clamp(28px, 5vw, 42px)', borderBottom: '1px solid #333', paddingBottom: '15px', textTransform: 'uppercase' }}>
                                    {project.title}
                                </h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Dior"
                                    collection={project.title}
                                    itemStyle={{ fontSize: '15px', color: '#ccc' }}
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

export default DiorApp;

