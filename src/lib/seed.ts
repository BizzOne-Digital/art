import type { SiteData } from "./types";

export const seedData: SiteData = {
  settings: {
    siteName: "Elite Body Fitness Pros",
    email: "art@elitebodyfitnesspros.com",
    phone: "19162233228",
    headline: "Unleash The Strongest Version of You",
    tagline:
      "At Elite Body Fitness Pros, we deliver personalized, science-based training that fits your schedule and transforms your results.",
    disclaimer:
      "Consult your physician before beginning this or any exercise program. This information is not intended as a substitute for medical advice. Use of information provided on this site is solely at your own risk.",
    heroExternalUrl: "http://www.powerfulteees.etsy.com/",
    heroExternalLabel: "Visit Our Shop",
    musicUrl:
      "https://open.spotify.com/track/2siqSsVoviIIkwb9D4A9wj",
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-man-training-in-a-gym-40941-large.mp4",
  },
  pages: [
    {
      slug: "home",
      name: "Home",
      sections: [
        {
          id: "home-hero",
          key: "hero",
          title: "Unleash The Strongest Version of You",
          subtitle: "Elite Body Fitness Pros",
          body: "At Elite Body Fitness Pros, we deliver personalized, science-based training that fits your schedule and transforms your results.",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80",
          ctaText: "Explore Packages",
          ctaLink: "/packages",
        },
        {
          id: "home-about",
          key: "about-preview",
          title: "Built For Real Results",
          subtitle: "At Elite Body Fitness Pros",
          body: "At Elite Body Fitness Pros, we craft training experiences grounded in science, discipline, and personalization. Every program is designed around your schedule, goals, and lifestyle.",
          image:
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
        },
        {
          id: "home-services",
          key: "services-preview",
          title: "What You Get With Elite Body Fitness Pros",
          subtitle: "Our Packages",
          body: "What you get with Elite Body Fitness Pros is coaching built for real results — choose the package that fits your goals and lifestyle.",
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
        },
        {
          id: "home-why",
          key: "why-us",
          title: "Why Train With Elite Body Fitness Pros",
          subtitle: "Why Choose Us",
          body: "Focused, and results-driven programs designed to transform how you train, recover, and perform.",
          image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
        },
        {
          id: "home-method",
          key: "method",
          title: "How Elite Body Fitness Pros Transforms You",
          subtitle: "The Process",
          body: "At Elite Body Fitness Pros, we follow a clear path designed for momentum — program, train, and transform with coaching at every step.",
          image:
            "https://images.unsplash.com/photo-1599058945522-28d584b6f14f?w=1200&q=80",
        },
        {
          id: "home-cta",
          key: "cta",
          title: "Ready To Train With Elite Body Fitness Pros?",
          body: "Contact Elite Body Fitness Pros today and start building the strongest version of you.",
          ctaText: "Contact Us",
          ctaLink: "/contact",
          image:
            "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80",
        },
      ],
    },
    {
      slug: "about",
      name: "About Us",
      sections: [
        {
          id: "about-hero",
          key: "hero",
          title: "About Elite Body Fitness Pros",
          subtitle: "Our Story",
          body: "At Elite Body Fitness Pros, we help clients unleash their strongest selves through personalized, science-based training. Full About details can be updated anytime.",
          image:
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1600&q=80",
        },
        {
          id: "about-mission",
          key: "mission",
          title: "Our Mission",
          subtitle: "Mission Statement",
          body: "We believe fitness should fit your life — not the other way around. That's why we built Elite Body Fitness Pros, a choice of fitness apps designed to meet you wherever you are, whether that's a packed gym, a quiet living room, or the middle of a busy travel schedule.\n\nWe're not here to sell you a one-size-fits-all program. We're here to give you tools that adapt — smart tracking, personalized plans, and real support — so consistency feels achievable, not exhausting. So you can “Unleash the strongest version of you”.",
          image:
            "https://images.unsplash.com/photo-1599058945522-28d584b6f14f?w=1200&q=80",
        },
        {
          id: "about-approach",
          key: "approach",
          title: "What We Stand For",
          body: "We believe real transformation happens with our expert training instructional apps. That's why we combine proven training methods with a culture of self belief, ensuring no one on their fitness journey ever feels like they're doing it alone. Elite Body Fitness Pros is a movement toward becoming your strongest and most self confident.",
          image:
            "https://images.unsplash.com/photo-1574680096145-d05b974e3047?w=1200&q=80",
        },
      ],
    },
    {
      slug: "packages",
      name: "Packages",
      sections: [
        {
          id: "packages-hero",
          key: "hero",
          title: "Packages At Elite Body Fitness Pros",
          subtitle: "What You Get With Elite Body Fitness Pros",
          body: "What you get with Elite Body Fitness Pros is flexible coaching packages built for your goals, schedule, and performance level.",
          image:
            "https://images.unsplash.com/photo-1517963879433-6ad2b056d944?w=1600&q=80",
        },
      ],
    },
    {
      slug: "programs",
      name: "Training Programs",
      sections: [
        {
          id: "programs-hero",
          key: "hero",
          title: "Training Programs At Elite Body Fitness Pros",
          subtitle: "Programs",
          body: "At Elite Body Fitness Pros, our training programs are designed to build strength, improve performance, and create lasting habits.",
          image:
            "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1600&q=80",
        },
      ],
    },
    {
      slug: "contact",
      name: "Contact",
      sections: [
        {
          id: "contact-hero",
          key: "hero",
          title: "Contact Elite Body Fitness Pros",
          subtitle: "Get In Touch",
          body: "Have questions about Elite Body Fitness Pros apps, packages, or shop products? Reach out — we respond fast.",
          image:
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1600&q=80",
        },
      ],
    },
    {
      slug: "gallery",
      name: "Gallery",
      sections: [
        {
          id: "gallery-hero",
          key: "hero",
          title: "Inside Elite Body Fitness Pros",
          subtitle: "Gallery",
          body: "Explore the energy, focus, and transformation happening at Elite Body Fitness Pros — intensity, discipline, and real results.",
          image:
            "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=1600&q=80",
        },
      ],
    },
    {
      slug: "pricing",
      name: "Pricing",
      sections: [
        {
          id: "pricing-hero",
          key: "hero",
          title: "Pricing At Elite Body Fitness Pros",
          subtitle: "Invest In Your Strength",
          body: "See what you get with Elite Body Fitness Pros pricing options built for lasting results. Final rates can be confirmed with our team.",
          image:
            "https://images.unsplash.com/photo-1434682881908-b43d495dd23d?w=1600&q=80",
        },
      ],
    },
    {
      slug: "shop",
      name: "Products / Shop",
      sections: [
        {
          id: "shop-hero",
          key: "hero",
          title: "Shop Elite Body Fitness Pros Gear",
          subtitle: "Shop",
          body: "Train with Elite Body Fitness Pros essentials curated for performance. Inquire for pricing on every item.",
          image:
            "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80",
        },
      ],
    },
    {
      slug: "testimonials",
      name: "Testimonials",
      sections: [
        {
          id: "testimonials-hero",
          key: "hero",
          title: "Designed App Results",
          subtitle: "Testimonials",
          body: "Real stories from people using Elite Body Fitness Pros designed fitness apps — smarter tracking, personalized plans, and results that stick.",
          image:
            "https://images.unsplash.com/photo-1599058947525-85fbcf6e0a7f?w=1600&q=80",
        },
      ],
    },
  ],
  products: [
    {
      id: "prod-1",
      name: "Apparel",
      description:
        "Training tees, hoodies, and performance wear from our Powerfulteees shop.",
      category: "Apparel",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      featured: true,
      active: true,
      externalUrl: "http://www.powerfulteees.etsy.com/",
      ctaLabel: "Visit Shop",
    },
    {
      id: "prod-2",
      name: "Resistance Bands",
      description:
        "Professional-grade resistance bands for warm-ups, mobility, and strength work.",
      category: "Equipment",
      image:
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80",
      featured: true,
      active: true,
      externalUrl: "",
      ctaLabel: "Coming Soon!",
    },
    {
      id: "prod-3",
      name: "Accessories",
      description:
        "Fitness accessories and essentials including gym water bottles.",
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
      featured: true,
      active: true,
      externalUrl: "http://www.powerfulteees.etsy.com/",
      ctaLabel: "Visit Shop",
    },
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Strength Session",
      category: "Training",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1000&q=80",
    },
    {
      id: "gal-2",
      title: "Cardio Burn",
      category: "Training",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1000&q=80",
    },
    {
      id: "gal-3",
      title: "Mobility Work",
      category: "Recovery",
      image:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&q=80",
    },
    {
      id: "gal-4",
      title: "Heavy Lift Focus",
      category: "Training",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80",
    },
  ],
  faqs: [
    {
      id: "faq-1",
      question: "Do I need prior gym experience?",
      answer:
        "Not at all. We coach beginners through advanced athletes with programs tailored to your current level.",
      order: 1,
    },
    {
      id: "faq-3",
      question: "Are product prices listed online?",
      answer:
        "Product pricing is available on request. Click Inquire for Price on any item and we'll get back to you quickly.",
      order: 2,
    },
    {
      id: "faq-4",
      question: "What should I bring to my first session?",
      answer:
        "Comfortable training clothes, water, and a mindset ready to work. We'll handle the programming and coaching.",
      order: 3,
    },
  ],
  pricing: [
    {
      id: "plan-1",
      name: "Starter Package",
      price: "$99",
      period: "",
      description:
        "Perfect for building consistent habits and foundational strength.",
      features: [
        "Beginners program",
        "Basic routine",
        "Form and functional exercises",
        "Start of journey!",
      ],
      highlighted: false,
    },
    {
      id: "plan-2",
      name: "Elite Package",
      price: "$199",
      period: "",
      description: "Our most popular package for serious transformation.",
      features: [
        "Full training workouts",
        "Intermediate clients who need structured programs",
        "Goal specific training system",
        "Form design program for max results",
      ],
      highlighted: true,
    },
    {
      id: "plan-3",
      name: "Platinum Package",
      price: "$299",
      period: "",
      description:
        "Maximum coaching intensity for athletes and high performers.",
      features: [
        "Full workout programs for advanced results",
        "Meal guidance",
        "Zoom accountability calls",
        "Weekly coach access",
        "Free workout t-shirt for motivation",
      ],
      highlighted: false,
    },
  ],
  services: [
    {
      id: "svc-1",
      title: "Scientifically Designed Program Structure",
      description: "",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
      icon: "layers",
    },
    {
      id: "svc-2",
      title: "Strength Programming",
      description: "",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
      icon: "zap",
    },
    {
      id: "svc-3",
      title: "Nutritional Guidance",
      description: "",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80",
      icon: "apple",
    },
  ],
  programs: [
    {
      id: "prog-1",
      title: "Strength Foundations",
      description:
        "Perfect for building consistent habits and foundational strength.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
      level: "Beginner",
    },
    {
      id: "prog-2",
      title: "Athletic Performance",
      description: "Our most popular package for serious transformation.",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
      level: "Intermediate",
    },
    {
      id: "prog-3",
      title: "Elite Transformation",
      description:
        "Maximum coaching intensity for athletes and high performers.",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=900&q=80",
      level: "Advanced",
    },
  ],
  orders: [],
};
