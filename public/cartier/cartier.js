// Inside your useGSAP loop, after the mask animations:
tl.to(container.querySelector(".side-list-container"), {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: "power2.out"
}, "-=0.5"); 

