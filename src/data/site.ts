/**
 * ============================================================================
 * SITE DATA — EDIT YOUR CONTENT & IMAGES HERE
 * ============================================================================
 *
 * Replace the `src` values below with your own photography (use local files
 * under src/assets or hosted URLs). Every image on the site is referenced
 * from this file so you only need to touch it in one place.
 */

export interface Project {
    id: string;
    name: string;
    description: string;
    category: string;
    src: string;
    span?: "wide" | "tall" | "standard";
}

export interface Category {
    name: string;
    description: string;
    src: string;
}

export interface Testimonial {
    quote: string;
    name: string;
    location: string;
}

export interface CraftStep {
    number: string;
    title: string;
    description: string;
}

export interface StudioItem {
    src: string;
    alt: string;
}

export const brandName = "Stitch & Story";

export const brandStatement =
    "Handmade embroidery and threadwork, crafted slowly with care.";

/* Change this to your real address — used by the order CTAs and footer. */
export const contactEmail = "mushkanjangratosham@gmail.com";

/* ---------------------------------------------------------
 * SOCIAL
 * Point instagramUrl at your profile when you're ready. The
 * "See more work" button passes through to it as-is.
 * --------------------------------------------------------- */
export const instagramUrl =
    "https://www.instagram.com/officialfashiondesigner123?stkn=MWpyd3NkbDkzbHlpag==";

/* ------------------------------- IMAGES --------------------------------- */

export const images = {
    hero: {
        main: "https://images.unsplash.com/photo-1623605004748-3af12342204f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        detail: "https://images.unsplash.com/photo-1568288796918-03e7d93306bd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVtYnJvaWRlcnl8ZW58MHx8MHx8fDA%3DF",
    },
    craft: {
        thread: "https://images.unsplash.com/photo-1771409046903-1ffb0f45cda9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmxvcmFsJTIwdGhyZWFkd29ya3xlbnwwfHwwfHx8MA%3D%3D",
        needle: "https://media.istockphoto.com/id/1830588571/photo/close-up-of-hand-embroidery-with-hoop-stand.webp?a=1&b=1&s=612x612&w=0&k=20&c=HjOoKdW95R88pevSq_geIh6slyJxD3gxTLGU4bBhlU4=",
        fabric: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop",
        hoop: "https://images.unsplash.com/photo-1599416382481-6715e3497de6?q=80&w=900&auto=format&fit=crop",
    },
    story: "https://images.unsplash.com/photo-1771555739335-95ea325f29d2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGZsb3JhbCUyMHRocmVhZHdvcmt8ZW58MHx8MHx8fDA%3D",
};

/* --------------------------- FEATURED PROJECTS -------------------------- */

export const projects: Project[] = [
    {
        id: "linen-handkerchief",
        name: "Linen Handkerchief",
        description:
            "Delicate floral motif hand-stitched onto pure Irish linen.",
        category: "Handkerchiefs",
        src: "https://images.unsplash.com/photo-1771409046920-4dfed351939a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fGZsb3JhbCUyMHRocmVhZHdvcmt8ZW58MHx8MHx8fDA%3D",
        span: "wide",
    },
    {
        id: "embroidered-tee",
        name: "Embroidered Tee",
        description:
            "A single stem of wildflowers traced across organic cotton.",
        category: "T-Shirts",
        src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=900&auto=format&fit=crop",
        span: "standard",
    },
    {
        id: "floral-threadwork",
        name: "Floral Threadwork",
        description: "Layered petals and thread in muted terracotta and sage.",
        category: "Fabric Art",
        src: "https://images.unsplash.com/photo-1527016021513-b09758b777bd?q=80&w=900&auto=format&fit=crop",
        span: "tall",
    },
    {
        id: "initial-embroidery",
        name: "Initial Embroidery",
        description:
            "A custom monogram stitched in a graceful serif letterform.",
        category: "Custom Embroidery",
        src: "https://images.pexels.com/photos/13631019/pexels-photo-13631019.jpeg",
        span: "standard",
    },
    {
        id: "artistic-fabric",
        name: "Artistic Fabric Design",
        description:
            "Freedom stitched into textile — an open, flowing composition.",
        category: "Fabric Art",
        src: "https://images.unsplash.com/photo-1518732836484-bd257665c9d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZW1icm9pZGVyeXxlbnwwfHwwfHx8MA%3D%3D",
        span: "standard",
    },
    {
        id: "stitch-detail",
        name: "Stitching in Detail",
        description:
            "A macro close-up of the handwork — every stitch placed by hand.",
        category: "Detail",
        src: "https://images.unsplash.com/photo-1592169138776-7c9211066fc8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGVtYnJvaWRlcnl8ZW58MHx8MHx8fDA%3D",
        span: "wide",
    },
];

/* ---------------------------- CRAFT STEPS --------------------------------- */

export const craftSteps: CraftStep[] = [
    {
        number: "01",
        title: "The Idea",
        description:
            "It begins as a feeling — a flower, a memory, a name. We talk it through until the shape of it is clear.",
    },
    {
        number: "02",
        title: "The Sketch",
        description:
            "The design is drawn and refined by hand, choosing which lines deserve to become thread.",
    },
    {
        number: "03",
        title: "The Stitch",
        description:
            "Slowly, stitch by stitch, the design rises from the fabric. This is where patience becomes visible.",
    },
    {
        number: "04",
        title: "The Finished Piece",
        description:
            "The work is pressed, inspected, and finished — a small object meant to be kept and remembered.",
    },
];

/* --------------------------- PRODUCT CATEGORIES --------------------------- */

export const categories: Category[] = [
    {
        name: "Handkerchiefs",
        description:
            "Delicate linen and cotton, stitched with quiet floral details.",
        src: "https://images.pexels.com/photos/30295968/pexels-photo-30295968.jpeg",
    },
    {
        name: "T-Shirts",
        description: "Wearable embroidery on organic cotton, one of a kind.",
        src: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=700&auto=format&fit=crop",
    },
    {
        name: "Custom Embroidery",
        description:
            "Names, initials and personal stories, stitched just for you.",
        src: "https://images.pexels.com/photos/10816966/pexels-photo-10816966.jpeg",
    },
    {
        name: "Fabric Art",
        description:
            "Thread as medium — larger works made to hang and to hold.",
        src: "https://images.pexels.com/photos/14422198/pexels-photo-14422198.jpeg",
    },
    {
        name: "Gifts",
        description: "Handmade pieces chosen to mean something to someone.",
        src: "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=700&auto=format&fit=crop",
    },
];

/* ------------------------------ TESTIMONIALS ------------------------------ */

export const testimonials: Testimonial[] = [
    {
        quote: "The detailing was even more beautiful in person. You can actually see the care that went into every stitch.",
        name: "Amelia",
        location: "Portland, OR",
    },
    {
        quote: "I asked for my grandmother’s initials on a handkerchief. It arrived feeling like something she would have treasured.",
        name: "Daniel",
        location: "Brooklyn, NY",
    },
    {
        quote: "It’s not just a shirt — it’s a tiny piece of art that happens to be wearable. I get asked about it constantly.",
        name: "Priya",
        location: "Austin, TX",
    },
];

/* ------------------------------ STUDIO GALLERY ---------------------------- */

export const studioItems: StudioItem[] = [
    {
        src: "https://images.unsplash.com/photo-1596003906949-67221c37965c?q=80&w=600&auto=format&fit=crop",
        alt: "Embroidered handkerchief",
    },
    {
        src: "https://images.unsplash.com/photo-1584270281582-6ce153e29051?q=80&w=600&auto=format&fit=crop",
        alt: "Threadwork detail",
    },
    {
        src: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
        alt: "Spools of thread",
    },
    {
        src: "https://images.unsplash.com/photo-1599416382481-6715e3497de6?q=80&w=600&auto=format&fit=crop",
        alt: "Embroidery hoop",
    },
    {
        src: "https://images.unsplash.com/photo-1527016021513-b09758b777bd?q=80&w=600&auto=format&fit=crop",
        alt: "Floral fabric art",
    },
    {
        src: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=600&auto=format&fit=crop",
        alt: "Embroidered tee",
    },
];
