import preset from "canvas-preset";
import gsap from "gsap";

const image = "a.jpeg";

export default (direction: -1 | 1) => () => {
    const { draw, render, renderGroup, clear, size } = preset()
    const initialSize = window.innerWidth;
    const space = 0.025;
    const getX = () => window.innerWidth * (0.5 - space * direction)
    const getArc = () => ({ radius: 11.25, y: 68 + 7.5, x: getX(), color: "#f4f4f4" });
    const arcsAmount = 3;
    const arcs = [...new Array(arcsAmount)].map(getArc);
    const getWindowSize = () => ({ width: window.innerWidth, height: window.innerHeight });
    const background = { x: 0, y: 0, ...getWindowSize(), color: "black" };

    const tl = gsap.timeline()

    tl.to(arcs, {
        // radius: 22.5,
        y: window.innerHeight / 2,
        duration: 3,
        color: "white", // "#1b1b1b",
        ease: "bounce.out",
        stagger: 0.5, // Stagger animation between objects
        onComplete: () => {
            gsap.to(background, {
                color: "transparent",
                duration: .5,
                delay: 2.5
            });
        }
    }).to(arcs, {
        radius: window.innerHeight > window.innerWidth ? window.innerHeight : window.innerWidth,
        duration: 3,
        color: "transparent",
        ease: "bounce.in",
    });

    draw(() => {
        size();
        clear();
        render({ ...background, ...getWindowSize() }).rect()
        renderGroup("arc", arcs.map(arc => ({
            ...arc,
            x: getX()
        })));
    });
}