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

// 1. ALL 19 IMAGE IMPORTS
const img1 = "/storefront/img1.jpg"; const img2 = "/storefront/img2.jpg"; const img3 = "/storefront/img3.jpg";
const img4 = "/storefront/img4.jpg"; const img5 = "/storefront/img5.jpg"; const img6 = "/storefront/img6.jpg";
const img7 = "/storefront/img7.jpg"; const img8 = "/storefront/img8.jpg"; const img9 = "/storefront/img9.jpg";
const img10 = "/storefront/img10.jpg"; const img11 = "/storefront/img11.jpg"; const img12 = "/storefront/img12.jpg";
const img13 = "/storefront/img13.jpg"; const img14 = "/storefront/img14.jpg"; const img15 = "/storefront/img15.jpg";
const img16 = "/storefront/img16.jpg"; const img17 = "/storefront/img17.jpg"; const img18 = "/storefront/img18.jpg";
const img19 = "/storefront/img19.jpg";


    const projectData = [
        { img: img1, title: "Men's Fragrance Collection", items: ["Cartier Declaration Men Eau De Toilette 3.3 fl oz", "Cartier Declaration Parfum 3.3 fl oz", "Cartier Declaration Haute Fraicheur 3.3 fl oz", "Cartier Pasha De Cartier Eau De Toilette 3.3 fl oz", "Cartier Pasha de Cartier Limited Edition 3.3 fl oz", "Cartier Pasha De Cartier Edition Noire 3.3 fl oz", "Pasha De Edition Noire Sport Cartier 3.3 fl oz"], prices: ["$134", "$155", "$134", "$134", "$168", "$134", "$134"] },
        { img: img2, title: "Women's Fragrance Selection", items: ["Pasha De Cartier 5.1 oz", "Cartier La Panthère Eau de Parfum 1.6 oz", "Cartier Must de Cartier Parfum 1.6 oz", "Rivières de Cartier Allègresse 3.3 oz", "Women’s Discovery Set 3 x 10 ml", "Baiser Volé 5.1oz", "Rivieres de Cartier Luxuriance by Cartier 3.3 oz"], prices: ["$196", "$131", "$177", "$118", "$117", "$180", "$116"] },
        { img: img3, title: "Panthère de Cartier Collection", items: ["Cartier Panthère CT0596S Sunglasses", "Cartier Sunglasses", "Cartier Eyewear Panthère De Cartier Sunglasses",  "Cartier Santos Evolution Pilot Sunglasses", "Cartier Santos de Cartier Men's Sunglasses", "Cartier CT0393S Sunglasses Men", "Cartier Eyewear Signature C Decor Cat-eye", "Cartier Eyewear Santos de Cartier Aviator-Style Sunglasses"], prices: ["$1,295", "$1,295", "$1,495", "$1,745", "$1,495", "$1,595", "$1,295", "$1,195"] },
        { img: img4, title: "Panthère de Cartier Collection", items: ["Cartier Panthère de Mini Cross-Body Bag", "Cartier Panthère Double de Top-Handle Bag", "Cartier Panthère C Bag", "Cartier Panthère Double Hobo Bag", "Cartier Micro Panthère C Bag"], prices: ["$2,950", "$4,950", "$4,330", "$5,550", "$2,090"] },
        { img: img5, title: "Pre-Owned and Vintage Cartier Suits", items: ["70s / 80s Chloe for Cartier", "Vintage 1960s Jacque Cartier Silk Suit", "Cartier 1960s Gina Teresa Wool Mod Two-Piece", "Jacques Cartier Women's Fux Fur Jacket"], prices: ["$799", "$105", "$88", "$120"] },
        { img: img6, title: "Summer Accessories & Silk", items: ["Cartier Panthère Greenhouse Silk-twill Bandeau", "Cartier 90 scarf", "Cartier Bandeau with Panthere Dots", "Precious Mundanity Bandeau"], prices: ["$250", "$620", "$230", "$250"] },
        { img: img7, title: "Luxury Gowns", items: ["Strapless Convertible Dress", "Pallas Couture"], prices: ["$2,700", "$3,200"] },
        { img: img8, title: "Facial Skincare & Moisturizers", items: ["Revitalizing Facial Skincare + Tonifyng All Over", "Alastin C-Radical Defense Antioxidant Serum", "Cartier Les Bases a Perfumer Crème 6.76 oz"], prices: ["$24.99", "$41.15", "$179.95"] },
        { img: img9, title: "Vintage Outerwear", items: ["Jacques Cartier Paris Fit & Flare Swing Faux Fur", "Cartier Blue Wool Vintage Coat", "Cartier Silk Artistic Tree Print Long Coat", "Jacques Cartier Paris Persian Lamb Swing Coat"], prices: ["$189", "$302", "$100", "$179"] },
        { img: img10, title: "Reflect the summer sun with the iconic glow of Cartier.", items: [], prices: [] },
        { img: img11, title: "Cartier Tank Collection", items: ["Cartier Tank Must watch wsta0136", "Cartier Tank Française Watch Large", "Cartier Tank Louis Rose Gold Diamond Watch"], prices: ["$3,800", "$6,750", "$47,400"] },
        { img: img12, title: "LOVE Collection", items: ["Cartier Love ring small", "LOVE ring, classic model", "LOVE Wedding Band"], prices: ["$1,420", "$2,260", "$1,170"] },
        { img: img13, title: "Wear the invisible jewelry of Cartier and leave an unforgettable trail of summer elegance.", items: [], prices: [] },
        { img: img14, title: "Colognes Grooming & Aftershaves", items: ["Vintage Pasha De Cartier After Shave 100ml ", "Cartier Declaration After Shave Lotion", "Cartier Roadster Aftershave Lotion", "Cartier Pasha Noir De Absolu Parfum Men", "Cartier Declaration Men Eau De Toilette", "Santos De Cartier", ], prices: ["$242.98", "$86", "$199.50", "$142.80", "$134", "$289.90"] },
        { img: img15, title: "Trinity Collection", items: ["Cartier - Trinity ring, Small Model - Ring", "Trinity ring, classic model", "Trinity ring, large model, paved"], prices: ["$1,700", "$2,350", "$4,100"] },
        { img: img16, title: "Because Cartier isn't just an accessory—it's a legacy of elegance that lasts a lifetime.", items: [], prices: [] },
        { img: img17, title: "Juste un Clou Collection", items: ["Juste un Clou, Small Model Nail Bracelet", "Juste un Clou, Classic Model Bracelet", "⎯ Diamond Variations available"], prices: ["$3,850", "$8,050"] },
        { img: img18, title: "Juste un Clou & Clash de Cartier", items: ["Cartier Juste un Clou Diamond Necklace", "Cartier Juste Un Clou Pendant Necklace", "Cartier Clash de Cartier Necklace", "Cartier d'Amour pendant, diamond, mini model", "Cartier d'Amour Yellow Gold Diamond Necklace", "Cartier d'Amour pendant, brilliant-cut diamond"], prices: ["$4,950", "$5,328", "$4,800", "$1,230", "$1,530", "$2,490"] },
        { img: img19, title: "Elevate your summer style with the unparalleled heritage and craftsmanship of Cartier, curated exclusively for you at Devert Store.", items: [], prices: [] },
    ];

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

const ImageReveal = () => {
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

    // 4. CARTIER DIAGONAL REVEAL ANIMATION
    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray(".row-wrapper").forEach((row) => {
            const masks = row.querySelectorAll(".mask");
            const sideList = row.querySelector(".side-list-container");

            masks.forEach((mask, index) => gsap.set(mask, { clipPath: initialClipPaths[index] }));
            gsap.set(sideList, { opacity: 0, y: 30 });

            const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 80%" } });
            
            animationOrder.forEach((targets, index) => {
                const elements = targets.map((cls) => row.querySelector(cls));
                tl.to(elements, {
                    clipPath: (i, el) => finalClipPaths[Array.from(masks).indexOf(el)],
                    duration: 0.5,
                    ease: "power2.out"
                }, index * 0.1);
            });
            
            tl.to(sideList, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
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
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            <CartRoot />
            <div style={{ backgroundColor: '#000', minHeight: '100vh', width: '100%', margin: 0, padding: '100px 0', overflowX: 'hidden', color: '#fff' }}>
                
                {projectData.map((project, i) => (
                    <div key={i} className="row-wrapper" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '300px', marginTop: i === 0 ? '150px' : '0' }}>
                        <div style={{ display: 'flex', width: '100%', maxWidth: '1100px', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px' }}>
                            
                            <div className="img-container" style={{ position: 'relative', width: '450px', height: '600px', overflow: 'hidden', flexShrink: 0 }}>
                                {[...Array(9)].map((_, j) => (
                                    <div key={j} className={`mask m-${j}`} style={{
                                        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                        backgroundImage: `url("${mediaUrl(project.img)}")`, backgroundSize: 'cover', backgroundPosition: 'center'
                                    }}></div>
                                ))}
                            </div>

                            <div className="side-list-container" style={{ flex: 1, textAlign: i % 2 === 0 ? 'left' : 'right', paddingLeft: i % 2 === 0 ? '80px' : '0', paddingRight: i % 2 === 0 ? '0' : '80px' }}>
                                <h3 style={{ fontSize: '32px', marginBottom: '20px', textTransform: 'uppercase' }}>{project.title}</h3>
                                <ProductGrid
                                    items={project.items}
                                    prices={project.prices}
                                    image={mediaUrl(project.img)}
                                    brand="Cartier"
                                    collection={project.title}
                                    itemStyle={{ margin: '8px 0' }}
                                    priceStyle={{ margin: '8px 0', fontWeight: 'bold' }}
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
        <h2 style={{ letterSpacing: '4px' }}>GRAZIE</h2>
        <p style={{ color: '#888' }}>Your inquiry has been received.</p>
    </div>
)}
                </div>

            </div>
        </ReactLenis>
    );
};


export default ImageReveal;






