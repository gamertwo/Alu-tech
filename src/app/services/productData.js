// app/products/productData.js

export const productData = [
    {
      id: 'extrusions',
      title: "Aluminium Extrusions",
      image: "/img/products/aluminum-extrusion.jpg",
      description: "Custom and standard profiles for various applications with precise tolerances and excellent finishes.",
      price: 499.99,
      rating: 5,
      reviews: 42,
      badge: "popular",
      details: [
        { label: "Material Options", value: "6061, 6063, 7075 alloys" },
        { label: "Applications", value: "Automotive, construction, electronics" },
        { label: "Key Benefits", value: "High strength, lightweight, corrosion-resistant" },
        { label: "Customization", value: "Tailored shapes, cutting, drilling, and coating" },
        { label: "Finish Options", value: "Mill finish, anodized, powder coated" },
        { label: "Length Options", value: "Standard and custom lengths available" }
      ]
    },
    {
      id: 'sheets',
      title: "Aluminium Sheets & Plates",
      image: "/img/products/aluminum-sheets.jpg",
      description: "High-quality flat-rolled products available in various alloys, tempers, and dimensions.",
      price: 349.99,
      oldPrice: 399.99,
      rating: 4,
      reviews: 36,
      badge: "sale",
      details: [
        { label: "Thickness Range", value: "0.5mm to 100mm" },
        { label: "Available Alloys", value: "1100, 5052, 6061, 7075" },
        { label: "Surface Finishes", value: "Mill finish, brushed, anodized" },
        { label: "Common Uses", value: "Aerospace, marine, signage, roofing" },
        { label: "Sheet Sizes", value: "Standard and custom sizes available" },
        { label: "Temper Options", value: "O, H32, H34, T4, T6, and more" }
      ]
    },
    {
      id: 'castings',
      title: "Aluminium Castings",
      image: "/img/products/aluminum-casting.jpg",
      description: "Die-cast and sand-cast components with excellent surface finish and dimensional accuracy.",
      price: 649.99,
      rating: 5,
      reviews: 28,
      details: [
        { label: "Casting Methods", value: "Sand casting, die casting, investment casting" },
        { label: "Key Features", value: "High precision, durable, heat-resistant" },
        { label: "Industries Served", value: "Automotive, aerospace, machinery" },
        { label: "Customization", value: "Complex geometries, tight tolerances, post-processing" },
        { label: "Alloys Available", value: "A356, A380, 713, 518, and custom alloys" },
        { label: "Weight Range", value: "From a few grams to several kilograms" }
      ]
    },
    {
      id: 'treatments',
      title: "Surface Treatments",
      image: "/img/products/aluminum-surface.jpg",
      description: "Anodizing, powder coating, and other finishes to enhance durability and aesthetics.",
      price: 229.99,
      rating: 4,
      reviews: 45,
      details: [
        { label: "Anodizing", value: "Improves corrosion resistance & appearance" },
        { label: "Powder Coating", value: "Durable, weather-resistant, wide color options" },
        { label: "Polishing & Brushing", value: "Enhances aesthetic appeal" },
        { label: "Applications", value: "Architectural, automotive, electronics" },
        { label: "Color Options", value: "Clear, black, bronze, custom colors available" },
        { label: "Thickness Range", value: "5-25 microns for anodizing, 60-80 microns for powder coating" }
      ]
    },
    {
      id: 'cnc',
      title: "CNC Machining",
      image: "/img/products/cnc-machine.jpg",
      description: "Precision machining services for complex aluminium components with tight tolerances.",
      price: 899.99,
      oldPrice: 999.99,
      rating: 5,
      reviews: 31,
      badge: "sale",
      details: [
        { label: "Precision Tolerance", value: "±0.01mm" },
        { label: "Capabilities", value: "Milling, turning, drilling, tapping" },
        { label: "Industries", value: "Medical, aerospace, industrial automation" },
        { label: "Customization", value: "Prototype to large-scale production" },
        { label: "Equipment", value: "5-axis CNC machines for complex geometries" },
        { label: "Materials", value: "All aluminum alloys and grades" }
      ]
    },
    {
      id: 'custom',
      title: "Custom Extrusion",
      image: "/img/products/aluminium-fabrication.jpg",
      description: "Tailored solutions including cutting, bending, welding, and assembly services.",
      price: 749.99,
      rating: 4,
      reviews: 19,
      details: [
        { label: "Processes", value: "Bending, welding, cutting, forming" },
        { label: "Tailored Solutions", value: "Design assistance for unique applications" },
        { label: "Industries", value: "Furniture, transportation, solar energy" },
        { label: "Finishing Options", value: "Powder coating, anodizing, polishing" },
        { label: "Design Support", value: "CAD/CAM assistance and optimization" },
        { label: "Production Runs", value: "Both small and large volumes" }
      ]
    },
    {
      id: 'windows',
      title: "Window & Door Profiles",
      image: "/img/products/window-profiles.jpg",
      description: "Specialized aluminum profiles designed for high-performance windows and door systems.",
      price: 599.99,
      rating: 5,
      reviews: 52,
      badge: "popular",
      details: [
        { label: "Profile Types", value: "Casement, sliding, fixed, tilt & turn" },
        { label: "Thermal Performance", value: "Thermal break technology for energy efficiency" },
        { label: "Weather Resistance", value: "Designed for high water and air tightness" },
        { label: "Security Features", value: "Multi-point locking compatibility" },
        { label: "Finish Options", value: "Anodized, powder coated, wood effect" },
        { label: "Applications", value: "Residential, commercial, industrial buildings" }
      ]
    },
    {
      id: 'solar',
      title: "Solar Panel Channels",
      image: "/img/products/solar-channels.jpg",
      description: "Specialized aluminum mounting systems for efficient solar panel installation and performance.",
      price: 449.99,
      rating: 4,
      reviews: 27,
      badge: "new",
      details: [
        { label: "Mounting Types", value: "Roof mount, ground mount, BIPV systems" },
        { label: "Durability", value: "Corrosion-resistant, weather-proof design" },
        { label: "Certification", value: "UL, TÜV, and MCS certified systems" },
        { label: "Installation", value: "Quick-install designs for reduced labor costs" },
        { label: "Load Capacity", value: "High wind and snow load ratings" },
        { label: "Compatibility", value: "Fits all standard solar panel dimensions" }
      ]
    }
  ];