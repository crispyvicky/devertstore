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
const img20 = "/storefront/img33.jpg"; const img21 = "/storefront/img21.jpg"; const img22 = "/storefront/img22.jpg";
const img23 = "/storefront/img23.jpg"; const img24 = "/storefront/img24.jpg"; const img25 = "/storefront/img25.jpg";
const img26 = "/storefront/img26.jpg"; const img27 = "/storefront/img27.jpg"; const img28 = "/storefront/img28.jpg";
const img29 = "/storefront/img29.jpg"; const img30 = "/storefront/img30.jpg"; const img31 = "/storefront/img31.jpg";
const img32 = "/storefront/img32.jpg"; const img33 = "/storefront/img20.jpg"; const img34 = "/storefront/img34.jpg";
const img35 = "/storefront/img35.jpg"; const img36 = "/storefront/img36.jpg"; const img37 = "/storefront/img37.jpg";
const img38 = "/storefront/img38.jpg";


    const projectData = [
        { img: img20, title: "Monogram Heritage", items: ["Keepall Bandoulière 50", "Christopher Backpack", "Neverfull PM"], prices: ["$2,570", "$3,450", "$1,400"] },
        { img: img21, title: "The Art of Gifting", items: ["Pocket Organizer", "Slender Wallet", "Multiple Wallet"], prices: ["$460", "$555", "$525"] },
        { img: img22, title: "Women's Leather Goods", items: ["Neverfull MM", "Speedy Bandoulière 25", "Onthego GM"], prices: ["$2,030", "$1,820", "$3,100"] },
        { img: img23, title: "Capucines Collection", items: ["Capucines Mini", "Capucines BB", "Capucines MM"], prices: ["$6,100", "$6,750", "$7,300"] },
        { img: img24, title: "Fragrance Savoir-Faire", items: ["L'Immensité", "Matière Noire", "Rose des Vents"], prices: ["$320", "$320", "$320"] },
        { img: img28, title: "Men's Footwear", items: ["LV Trainer Sneaker", "LV Ollie Sneaker", "Luxembourg"], prices: ["$1,220", "$1,010", "$935"] },
        { img: img30, title: "Tambour Watches", items: ["Street Diver", "Horizon Light Up", "Tambour Slim"], prices: ["$5,750", "$3,600", "$3,150"] },
        { img: img27, title: "Monogram Multicolore", items: ["Takashi Murakami Alma", "Murakami Speedy 30", "Lodge PM"], prices: ["$2,230", "$7,620", "$1,640"] },
        { img: img25, title: "High Jewelry", items: ["Empreinte Ring", "Volt Multi Ring", "Idylle Blossom"], prices: ["$1,980", "$3,950", "$2,420"] },
        { img: img29, title: "The Spirit of Travel remains the heartbeat of the Maison.", items: [], prices: [] },
        { img: img26, title: "The Da Vinci Masters Collection", items: ["Masters Speedy 30", "Da Vinci Neverfull", "Montaigne MM"], prices: ["$2,890", "$3,299", "$3,420"] },
        { img: img31, title: "Iconic Heritage Bags", items: ["Horizon 55 Suitcase", "Keepall Monogram", "Onthego Reverse"], prices: ["$3,650", "$1,980", "$3,200"] },
        { img: img32, title: "Elegance is not about being noticed, it's about being remembered.", items: [], prices: [] },
        { img: img33, title: "Monogram Sneaker Collection", items: ["Time Out Sneaker", "LV Sneakerina", "Archlight Sneaker"], prices: ["$1,450", "$1,250", "$2,620"] },
        { img: img34, title: "Belts Collection", items: ["LV Initiales 40mm", "LV Pont 9 35mm", "LV Pyramide"], prices: ["$590", "$710", "$625"] },
        { img: img35, title: "Style is a way to say who you are without having to speak.", items: [], prices: [] },
        { img: img36, title: "Sunglasses Collection", items: ["1.1 Millionaires", "Cyclone Sunglasses", "LV Waimea L"], prices: ["$890", "$850", "$620"] },
        { img: img37, title: "Small Leather Goods", items: ["Zippy Wallet", "Victorine Wallet", "Sarah Wallet"], prices: ["$850", "$575", "$720"] },
        { img: img38, title: "Effortless Parisian elegance meets timeless heritage luxury.", items: [], prices: [] },
    ];

    // 3x3 Grid Logic
    const initialClipPaths = [
        "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)", "polygon(33% 0%, 33% 0%, 33% 0%, 33% 0%)", "polygon(66% 0%, 66% 0%, 66% 0%, 66% 0%)",
        "polygon(0% 33%, 0% 33%, 0% 33%, 0% 33%)", "polygon(33% 33%, 33% 33%, 33% 33%, 33% 33%)", "polygon(66% 33%, 66% 33%, 66% 33%, 66% 33%)",
        "polygon(0% 66%, 0% 66%, 0% 66%, 0% 66%)", "polygon(33% 66%, 33% 66%, 33% 66%, 33% 66%)", "polygon(66% 66%, 66% 66%, 66% 66%, 66% 66%)",
    ];

    const finalClipPaths = [
        "polygon(0% 0%, 33.5% 0%, 33.5% 33.5%, 0% 33.5%)", "polygon(33% 0%, 66.5% 0%, 66.5% 33.5%, 33% 33.5%)", "polygon(66% 0%, 100% 0%, 100% 33.5%, 66% 33.5%)",
        "polygon(0% 33%, 33.5% 33%, 33.5% 66.5%, 0% 66.5%)", "polygon(33% 33%, 66.5% 33%, 66.5% 66.5%, 33% 66.5%)", "polygon(66% 33%, 100% 33%, 100% 66.5%, 66% 66.5%)",
        "polygon(0% 66%, 33.5% 66%, 33.5% 100%, 0% 100%)", "polygon(33% 66%, 66.5% 66%, 66.5% 100%, 33% 100%)", "polygon(66% 66%, 100% 66%, 100% 100%, 66% 100%)",
    ];

    const animationOrder = [[".m-0"], [".m-1", ".m-3"], [".m-2", ".m-4", ".m-6"], [".m-5", ".m-7"], [".m-8"]];

const LouisApp = () => {
    // 2. STATE & REFS
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);

    // 3. LISTEN FOR EXTERNAL HTML TOGGLE
    useEffect(() => {
        const handleToggle = () => setIsContactOpen(true);
        window.addEventListener('toggleContact', handleToggle);
        return () => window.removeEventListener('toggleContact', handleToggle);
    }, []);

    // 4. LOUIS VUITTON REVEAL ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray(".row-wrapper").forEach((row) => {
            const masks = row.querySelectorAll(".mask");
            const sideList = row.querySelector(".side-list-container");

            masks.forEach((mask, index) => gsap.set(mask, { clipPath: initialClipPaths[index], webkitClipPath: initialClipPaths[index] }));
            gsap.set(sideList, { opacity: 0, y: 30 });

            const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 85%" } });
            animationOrder.forEach((targets, index) => {
                const elements = targets.map((cls) => row.querySelector(cls));
                tl.to(elements, {
                    clipPath: (i, el) => finalClipPaths[Array.from(masks).indexOf(el)],
                    webkitClipPath: (i, el) => finalClipPaths[Array.from(masks).indexOf(el)],
                    duration: 0.7,
                    ease: "power3.out"
                }, index * 0.12);
            });
            tl.to(sideList, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.2");
        });
    }, []);

    // 5. CONTACT PANEL SLIDE-OUT
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
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
            <CartRoot />
            <div style={{ backgroundColor: '#000000', minHeight: '100vh', paddingBottom: '300px', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
                
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ 
                        width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '400px', marginTop: i === 0 ? '250px' : '0' 
                    }}>
                        <div style={{ width: '100%', maxWidth: '1100px', padding: '0 20px' }}>
                            <div className="img-container" style={{ position: 'relative', width: '100%', height: '700px', overflow: 'hidden', marginBottom: '40px' }}>
                                {[...Array(9)].map((_, j) => (
                                    <div key={j} className={`mask m-${j}`} style={{
                                        position:'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        backgroundImage: `url("${mediaUrl(project.img)}")`, backgroundSize: 'cover', backgroundPosition: 'center'
                                    }}></div>
                                ))}
                            </div>
                            <div className="side-list-container" style={{ width: '100%' }}>
                                <h3 style={{ color: '#fff', fontSize: '42px', marginBottom: '30px', borderBottom: '1px solid #ddd', paddingBottom: '15px', textTransform: 'uppercase' }}>
                                    {project.title}
                                </h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Louis Vuitton"
                                    collection={project.title}
                                    itemStyle={{ margin: '12px 0', color: '#fff' }}
                                    priceStyle={{ margin: '12px 0', color: '#fff' }}
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
                            fontFamily: 'RobotoBold',
                            color: '#fff' }}>DEVERT STORE</h2>

                        <p style={{ 
                            color: '#666', 
                            fontSize: '11px', 
                            marginBottom: '5px',
                            color: '#fff' }}>ADDRESS</p>

                        <p style={{ 
                            fontSize: '14px', 
                            marginBottom: '25px', 
                            fontFamily: 'RobotoThin',
                            color: '#fff' }}>Devert Store, Hyderabad</p>

                        <p style={{ 
                            color: '#666', 
                            fontSize: '11px', 
                            marginBottom: '5px',
                            color: '#fff' }}>PHONE</p>

                        <p style={{ 
                            fontSize: '14px', 
                            marginBottom: '40px', 
                            fontFamily: 'RobotoThin',
                            color: '#fff' }}>+91 94971 94971 � +91 89197 21762</p>

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


export default LouisApp;

