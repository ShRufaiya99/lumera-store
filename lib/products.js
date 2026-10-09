export const categories = [
  { slug: "body-care", name: "Body Care", from: "#e9c9b0", to: "#b9714b", shape: "pump" },
  { slug: "serum", name: "Serum", from: "#d9bf8c", to: "#8a6a35", shape: "bottle" },
  { slug: "oil-cleansers", name: "Oil Cleansers", from: "#3a2a22", to: "#150e0b", shape: "dropper" },
  { slug: "facial-cream", name: "Facial Cream", from: "#e0b9a0", to: "#a56a4d", shape: "tube" },
];

export const products = [
  { id: 1, slug: "jumbo-lip-crayon", name: "Orchid Lip Crayon", category: "makeup", price: 24.0, rating: 4.5, tint: "#c04fb0", shape: "crayon", badge: "New", desc: "A creamy, buildable lip crayon with a soft satin finish. Glides on without tugging and lasts through the day." },
  { id: 2, slug: "oat-honey-soap", name: "Oat & Honey Soap Duo", category: "body-care", price: 18.5, rating: 4, tint: "#c98f5d", shape: "soap", desc: "Cold-processed bar soaps with oat milk and raw honey for a gentle, nourishing cleanse." },
  { id: 3, slug: "radiance-glow-serum", name: "Radiance Glow Serum", category: "serum", price: 62.0, rating: 5, tint: "#6b5a52", shape: "dropper", badge: "Best seller", desc: "Vitamin C and niacinamide serum that visibly brightens and evens tone in two weeks." },
  { id: 4, slug: "silk-blush-brush", name: "Silk Blush & Brush Set", category: "makeup", price: 36.0, rating: 4, tint: "#d77a8c", shape: "brush", desc: "Pigmented cream blush paired with a dense, ultra-soft vegan brush for a seamless flush." },
  { id: 5, slug: "natural-coconut-wash", name: "Natural Coconut Hand Wash", category: "body-care", price: 45.99, rating: 4.5, tint: "#d8b99a", shape: "pump", desc: "Coconut-based foaming hand wash. Cleans deeply while keeping skin soft and balanced." },
  { id: 6, slug: "botanical-night-cream", name: "Botanical Night Cream", category: "facial-cream", price: 54.0, rating: 4.5, tint: "#e6c8b2", shape: "jar", badge: "-15%", desc: "Rich overnight cream with squalane and bakuchiol that wakes up plump, rested skin." },
  { id: 7, slug: "cloud-cleansing-oil", name: "Cloud Cleansing Oil", category: "oil-cleansers", price: 39.0, rating: 5, tint: "#9a6b3c", shape: "dropper", desc: "A lightweight oil that melts makeup and SPF, then rinses clean without residue." },
  { id: 8, slug: "dew-tube-moisturiser", name: "Dew Tube Moisturiser", category: "facial-cream", price: 33.0, rating: 4, tint: "#cc9272", shape: "tube", desc: "Fast-absorbing gel-cream with hyaluronic acid for all-day, weightless hydration." },
];

export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const money = (n) => `$${n.toFixed(2)}`;
