"use client";

import { mediaUrl } from "./media";

import React, { useState, useRef, useEffect } from 'react';
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CartRoot } from "./CartUI";
import { addToCart } from "./cartStore";
import { fetchCatalog, formatLivePrice, matchProduct } from "./api";
import "./atelier.css";
import "./home-landing.css";

const img263 = "/storefront/img263.jpg"; const img264 = "/storefront/img264.jpg";
const img266 = "/storefront/img266.jpg"; const img267 = "/storefront/img267.jpg"; const img268 = "/storefront/img268.jpg";
const img269 = "/storefront/img269.jpg"; const img270 = "/storefront/img270.jpg"; const img271 = "/storefront/img271.jpg";
const img272 = "/storefront/img272.jpg"; const img273 = "/storefront/img273.jpg"; const img274 = "/storefront/img274.jpg";
const img275 = "/storefront/img275.jpg"; const img276 = "/storefront/img276.jpg"; const img277 = "/storefront/img277.jpg";
const img278 = "/storefront/img278.jpg";

gsap.registerPlugin(ScrollTrigger);

const RevealImage = ({ src, className, eager, alt = "Devert Store" }) => (
    <div className={`img-wrapper ${className || ""}`}>
        <img src={mediaUrl(src)} className={eager ? "main-image eager-image" : "main-image"} alt={alt} />
    </div>
);

const addLookToBag = (look, live) => {
    if (!live?.inStock) {
        window.alert(live ? "This look is out of stock." : "Add this SKU in admin inventory first.");
        return;
    }
    try {
        addToCart({
            productId: live.id,
            name: live.name,
            price: live.price,
            image: look.src,
            brand: live.brand,
            collection: "Selected looks",
            stock: live.stock,
        });
        window.dispatchEvent(new CustomEvent("atelier:added"));
        window.dispatchEvent(new CustomEvent("toggleCart"));
        fetchCatalog(true).catch(() => {});
    } catch (err) {
        window.alert(err.message || "Could not add to bag");
    }
};

const LookCard = ({ look, catalog }) => {
    const live = matchProduct(catalog, look.brand, look.name);
    const priceLabel = live ? formatLivePrice(live.price) : "Sync admin";
    const stockLabel = live
        ? live.inStock
            ? `${live.stock} in stock`
            : "Out of stock"
        : "Not in inventory";

    return (
    <article
        className={`lp-look ${look.size || ""}`}
        onClick={() => addLookToBag(look, live)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                addLookToBag(look, live);
            }
        }}
    >
        <RevealImage src={look.src} alt={look.name} />
        <span>{look.n}</span>
        <div className="lp-look-ui">
            <p className="lp-look-brand">{look.brand}</p>
            <p className="lp-look-name">{look.name}</p>
            <p className="lp-look-price">{priceLabel}</p>
            <p className="lp-look-price" style={{ color: "#9a9488" }}>{stockLabel}</p>
            <button type="button" className="lp-look-add" disabled={!live?.inStock} onClick={(e) => { e.stopPropagation(); addLookToBag(look, live); }}>
                {live?.inStock ? "Add to Bag" : "Unavailable"}
            </button>
            <a href={look.href} className="lp-look-shop" onClick={(e) => e.stopPropagation()}>
                Shop {look.brand}
            </a>
        </div>
    </article>
    );
};

const looks = [
    { n: "01", src: img266, size: "tall", brand: "Bottega Veneta", name: "Andiamo Soft Clutch", price: "$3,800", href: "/bottega" },
    { n: "02", src: img267, brand: "Burberry", name: "Pocket Mini Tote", price: "$1,690", href: "/burberry" },
    { n: "03", src: img268, brand: "Burberry", name: "Her Eau de Parfum", price: "$168", href: "/burberry" },
    { n: "04", src: img273, size: "wide", brand: "Chanel", name: "Classic Evening Look", price: "$11,300", href: "/chanel" },
    { n: "05", src: img269, brand: "Louis Vuitton", name: "Capucines MM", price: "$6,800", href: "/louis" },
    { n: "06", src: img271, brand: "Cartier", name: "Declaration Eau de Toilette", price: "$134", href: "/cartier" },
    { n: "07", src: img272, brand: "Kate Spade", name: "Colorblock Pump", price: "$178", href: "/katespadeshoes" },
    { n: "08", src: img270, brand: "Chanel", name: "Coco Mademoiselle", price: "$172", href: "/chanel" },
    { n: "09", src: img275, brand: "Fendi", name: "Colibri Lite Sandal", price: "$950", href: "/fendishoes" },
    { n: "10", src: img276, brand: "Gucci", name: "Rosso Ancora Jacket", price: "$2,300", href: "/gucci" },
    { n: "11", src: img278, brand: "Dior", name: "30 Montaigne Look", price: "$4,200", href: "/dior" },
    { n: "12", src: img277, brand: "Prada", name: "Re-Nylon Tailoring", price: "$2,450", href: "/prada" },
];

const brands = [
    { name: "Bottega Veneta", href: "/bottega" },
    { name: "Burberry", href: "/burberry" },
    { name: "Cartier", href: "/cartier" },
    { name: "Chanel", href: "/chanel" },
    { name: "Coach", href: "/coach" },
    { name: "Dior", href: "/dior" },
    { name: "Fendi", href: "/fendi" },
    { name: "Gucci", href: "/gucci" },
    { name: "Kate Spade", href: "/katespade" },
    { name: "Louis Vuitton", href: "/louis" },
    { name: "Prada", href: "/prada" },
];

const HomeApp = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [catalog, setCatalog] = useState([]);
    const contactPanelRef = useRef(null);
    const isFirstRun = useRef(true);

    useEffect(() => {
        const handleToggle = () => { setIsSubmitted(false); setIsContactOpen(true); };
        window.addEventListener('toggleContact', handleToggle);
        return () => window.removeEventListener('toggleContact', handleToggle);
    }, []);

    useEffect(() => {
        fetchCatalog()
            .then(setCatalog)
            .catch(() => setCatalog([]));
    }, []);

    useGSAP(() => {
        gsap.to(".eager-image", {
            opacity: 1, filter: "blur(0px)", scale: 1,
            duration: 2.2, ease: "power2.inOut", delay: 0.15
        });

        gsap.fromTo(".lp-hero-copy > *",
            { opacity: 0, y: 28, filter: "blur(10px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.6, stagger: 0.12, ease: "power3.out", delay: 0.45 }
        );

        gsap.utils.toArray(".main-image:not(.eager-image)").forEach((img) => {
            gsap.to(img, {
                scrollTrigger: { trigger: img, start: "top 88%", toggleActions: "play none none reverse" },
                opacity: 1, filter: "blur(0px)", scale: 1, duration: 2.2, ease: "power2.inOut"
            });
        });

        gsap.fromTo(".lp-manifesto, .lp-featured, .lp-looks, .lp-brands, .lp-footer",
            { opacity: 0, y: 40 },
            {
                opacity: 1, y: 0, duration: 1.1, ease: "power2.out", stagger: 0.08,
                scrollTrigger: { trigger: ".lp-manifesto", start: "top 85%" }
            }
        );
    }, []);

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

    const inputStyle = { background: 'transparent', border: 'none', borderBottom: '1px solid #333', color: '#fff', padding: '12px 0', width: '100%', outline: 'none', marginBottom: '20px' };

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
            <CartRoot />
            <div className="home-wrap">
                <section className="lp-hero">
                    <div className="lp-hero-stage">
                        <div className="lp-hero-panel lp-hero-panel--woman">
                            <RevealImage src={img263} eager alt="Devert Store look" />
                        </div>
                        <div className="lp-hero-panel lp-hero-panel--man">
                            <RevealImage src={img264} eager alt="Devert Store look" />
                        </div>
                        <div className="lp-hero-veil" />
                        <div className="lp-hero-copy">
                            <p className="lp-kicker">Maison de Couture · Hyderabad</p>
                            <h1 className="hero-title">
                                <span>Devert</span>
                                <span>Store</span>
                            </h1>
                            <p className="lp-hero-line">Heritage houses, privately curated.</p>
                            <a className="lp-hero-cta" href="/chanel">Enter the collection</a>
                        </div>
                    </div>
                    <div className="lp-hero-bar">
                        <span>Est. MMXXIV</span>
                        <span>Devert Store</span>
                        <span>Hyderabad</span>
                    </div>
                </section>

                <section className="lp-manifesto">
                    <p className="lp-index">01 — The Maison</p>
                    <div className="lp-manifesto-grid">
                        <h2>A sanctuary for the world’s most enduring houses.</h2>
                        <div>
                            <p>Devert Store brings Fendi, Chanel, Burberry and their peers under one roof — not as a catalogue, but as a private gallery of craft. Each piece is chosen for the life it will lead, and the legacy it will leave.</p>
                            <p className="lp-italic">The collection is reserved for in-person discovery at Devert Store.</p>
                        </div>
                    </div>
                </section>

                <section className="lp-featured">
                    <div className="lp-featured-media">
                        <RevealImage src={img274} alt="Featured look" />
                    </div>
                    <div className="lp-featured-copy">
                        <p className="lp-index">02 — Private acquisition</p>
                        <h3>Not a store. A salon.</h3>
                        <p>Select from the maisons, then reserve your pieces. An advisor confirms availability and prepares them for your visit.</p>
                        <a href="/gucci">Shop Gucci</a>
                    </div>
                </section>

                <section className="lp-looks">
                    <div className="lp-looks-head">
                        <p className="lp-index">03 — The season</p>
                        <h2>Selected looks</h2>
                        <p className="lp-looks-hint">Click a look to add it to your bag.</p>
                    </div>
                    <div className="lp-looks-grid">
                        {looks.map((look) => (
                            <LookCard key={look.n} look={look} catalog={catalog} />
                        ))}
                    </div>
                </section>

                <div className="lp-marquee" aria-hidden="true">
                    <div className="lp-marquee-track">
                        {[...brands, ...brands].map((brand, i) => (
                            <span key={`${brand.name}-${i}`}>{brand.name}</span>
                        ))}
                    </div>
                </div>

                <section className="lp-brands">
                    <div>
                        <p className="lp-index">04 — Maisons</p>
                        <h2>Selected houses</h2>
                        <p>Every house is presented as it was meant to be found: slowly, and in person.</p>
                    </div>
                    <ul>
                        {brands.map((brand) => (
                            <li key={brand.href}>
                                <a href={brand.href}>{brand.name}</a>
                            </li>
                        ))}
                    </ul>
                </section>

                <footer className="lp-footer">
                    <h2>Where heritage meets the future of style.</h2>
                    <p>Devert Store, Hyderabad · +91 94971 94971 � +91 89197 21762</p>
                </footer>

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
                    visibility: 'hidden'
                }}>
                    <div onClick={() => setIsContactOpen(false)} style={{
                        position: 'absolute',
                        right: '100%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: '#0a0a0a',
                        border: '1px solid #222',
                        borderRight: 'none',
                        padding: '20px 8px',
                        cursor: 'pointer',
                        writingMode: 'vertical-rl',
                        fontSize: '12px',
                        letterSpacing: '3px',
                        color: '#fff',
                        textTransform: 'uppercase'
                    }}>CLOSE [✕]</div>

                    <div style={{ marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '24px', letterSpacing: '4px', marginBottom: '40px' }}>DEVERT STORE</h2>
                        <p style={{ color: '#666', fontSize: '11px', marginBottom: '5px' }}>ADDRESS</p>
                        <p style={{ fontSize: '14px', marginBottom: '25px' }}>Devert Store, Hyderabad</p>
                        <p style={{ color: '#666', fontSize: '11px', marginBottom: '5px' }}>PHONE</p>
                        <p style={{ fontSize: '14px', marginBottom: '40px' }}>+91 94971 94971 � +91 89197 21762</p>
                        <hr style={{ borderColor: '#222', borderTop: 'none' }} />
                    </div>

                    {!isSubmitted ? (
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                formData.append("access_key", "dd54a250-0a91-4e2d-9a9b-194cc629c447");
                                const response = await fetch("https://api.web3forms.com/submit", {
                                    method: "POST",
                                    body: formData
                                });
                                if (response.ok) {
                                    setIsSubmitted(true);
                                } else {
                                    alert("Submission failed. Please try again.");
                                }
                            }}
                        >
                            <input name="name" placeholder="NAME" required style={inputStyle} />
                            <input name="email" type="email" placeholder="EMAIL" required style={inputStyle} />
                            <textarea name="message" placeholder="MESSAGE" required style={{ ...inputStyle, height: '100px' }} />
                            <button type="submit" style={{ background: '#fff', color: '#000', border: 'none', padding: '15px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
                                SEND
                            </button>
                        </form>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', paddingBottom: '80px' }}>
                            <h2 style={{ letterSpacing: '4px' }}>GRAZIE</h2>
                            <p style={{ color: '#888' }}>Your inquiry has been received.</p>
                        </div>
                    )}
                </div>
            </div>
        </ReactLenis>
    );
};

export default HomeApp;

