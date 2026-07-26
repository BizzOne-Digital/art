import type { SiteData } from "./types";

export const seedData: SiteData = {
  settings: {
    siteName: "Elite Body Fitness Pros",
    email: "art@elitebodyfitnesspros.com",
    phone: "19162233228",
    headline: "Unleash The Strongest Version of You",
    tagline:
      "Delivering personalized, science-based training that fits your schedule and transforms your results.",
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
          body: "Delivering personalized, science-based training that fits your schedule and transforms your results.",
          image:
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80",
          ctaText: "Start Training",
          ctaLink: "/booking",
        },
        {
          id: "home-about",
          key: "about-preview",
          title: "Built For Real Results",
          subtitle: "Who We Are",
          body: "We craft elite training experiences grounded in science, discipline, and personalization. Every program is designed around your schedule, goals, and lifestyle.",
          image:
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80",
        },
        {
          id: "home-services",
          key: "services-preview",
          title: "Training That Transforms",
          subtitle: "Our Services",
          body: "From one-on-one coaching to performance programming — choose the path that unlocks your strongest self.",
          image:
            "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
        },
        {
          id: "home-why",
          key: "why-us",
          title: "Strength With Purpose",
          subtitle: "Why Elite Body",
          body: "Dark, focused, and results-driven coaching designed to transform how you train, recover, and perform.",
          image:
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
        },
        {
          id: "home-method",
          key: "method",
          title: "From First Session To Full Transformation",
          subtitle: "The Process",
          body: "A clear path designed for momentum — consult, program, train, and transform with elite coaching at every step.",
          image:
            "https://images.unsplash.com/photo-1599058945522-28d584b6f14f?w=1200&q=80",
        },
        {
          id: "home-cta",
          key: "cta",
          title: "Ready To Level Up?",
          body: "Book a session and start building the strongest version of you.",
          ctaText: "Book Now",
          ctaLink: "/booking",
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
          title: "Science. Discipline. Results.",
          subtitle: "About Elite Body Fitness Pros",
          body: "Delivering personalized, science-based training that fits your schedule and transforms your results.",
          image:
            "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1600&q=80",
        },
        {
          id: "about-mission",
          key: "mission",
          title: "Our Mission",
          body: "To empower every client with elite coaching, proven methods, and unwavering accountability — so you can unleash the strongest version of yourself.",
          image:
            "https://images.unsplash.com/photo-1599058945522-28d584b6f14f?w=1200&q=80",
        },
        {
          id: "about-approach",
          key: "approach",
          title: "Our Approach",
          body: "We blend biomechanics, progressive overload, recovery science, and lifestyle coaching into programs that fit real schedules — not fantasies.",
          image:
            "https://images.unsplash.com/photo-1574680096145-d05b974e3047?w=1200&q=80",
        },
      ],
    },
    {
      slug: "services",
      name: "Services",
      sections: [
        {
          id: "services-hero",
          key: "hero",
          title: "Elite Training Services",
          subtitle: "What We Offer",
          body: "Personalized coaching designed to transform your body, mindset, and performance.",
          image:
            "https://images.unsplash.com/photo-1517963879433-6ad2b056d944?w=1600&q=80",
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
          title: "Let's Build Your Strongest Self",
          subtitle: "Get In Touch",
          body: "Questions about training, products, or booking? Reach out — we respond fast.",
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
          title: "The Grind. The Glow.",
          subtitle: "Gallery",
          body: "Moments from the floor — intensity, focus, and transformation.",
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
          title: "Invest In Your Strength",
          subtitle: "Pricing",
          body: "Transparent packages built for lasting results. Choose your intensity.",
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
          title: "Elite Gear & Essentials",
          subtitle: "Shop",
          body: "Premium products curated for performance. Inquire for pricing on every item.",
          image:
            "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1600&q=80",
        },
      ],
    },
    {
      slug: "booking",
      name: "Booking",
      sections: [
        {
          id: "booking-hero",
          key: "hero",
          title: "Book Your Session",
          subtitle: "Start Training",
          body: "Reserve your spot and take the first step toward the strongest version of you.",
          image:
            "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1600&q=80",
        },
      ],
    },
    {
      slug: "faq",
      name: "FAQ",
      sections: [
        {
          id: "faq-hero",
          key: "hero",
          title: "Questions. Answered.",
          subtitle: "FAQ",
          body: "Everything you need to know before you start training with us.",
          image:
            "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=1600&q=80",
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
          title: "Real Clients. Real Strength.",
          subtitle: "Testimonials",
          body: "Hear from people who transformed their bodies and mindset with Elite Body Fitness Pros.",
          image:
            "https://images.unsplash.com/photo-1599058947525-85fbcf6e0a7f?w=1600&q=80",
        },
      ],
    },
  ],
  products: [
    {
      id: "prod-1",
      name: "Elite Resistance Band Set",
      description:
        "Professional-grade resistance bands for warm-ups, mobility, and strength work at any level.",
      category: "Equipment",
      image:
        "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80",
      featured: true,
      active: true,
    },
    {
      id: "prod-2",
      name: "Performance Training Hoodie",
      description:
        "Sleek black training hoodie with neon accent stitching — built for the grind.",
      category: "Apparel",
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      featured: true,
      active: true,
    },
    {
      id: "prod-3",
      name: "Elite Protein Shaker",
      description:
        "Leak-proof, dual-compartment shaker designed for pre and post workout nutrition.",
      category: "Accessories",
      image:
        "https://images.unsplash.com/photo-1579722820308-d74e57ce3e79?w=800&q=80",
      featured: false,
      active: true,
    },
    {
      id: "prod-4",
      name: "Grip Strength Trainer",
      description:
        "Adjustable grip trainer to build forearm power and improve lift stability.",
      category: "Equipment",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
      featured: false,
      active: true,
    },
    {
      id: "prod-5",
      name: "Recovery Foam Roller",
      description:
        "High-density foam roller for deep tissue recovery and mobility sessions.",
      category: "Recovery",
      image:
        "https://images.unsplash.com/photo-1599901860904-17e6bd22081b?w=800&q=80",
      featured: true,
      active: true,
    },
    {
      id: "prod-6",
      name: "Elite Training Cap",
      description:
        "Minimal black performance cap with embroidered neon green mark.",
      category: "Apparel",
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
      featured: false,
      active: true,
    },
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Heavy Lift Focus",
      category: "Training",
      image:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1000&q=80",
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
      title: "Form Check",
      category: "Coaching",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1000&q=80",
    },
    {
      id: "gal-4",
      title: "Strength Session",
      category: "Training",
      image:
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1000&q=80",
    },
    {
      id: "gal-5",
      title: "Mobility Work",
      category: "Recovery",
      image:
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1000&q=80",
    },
    {
      id: "gal-6",
      title: "Elite Atmosphere",
      category: "Facility",
      image:
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1000&q=80",
    },
    {
      id: "gal-7",
      title: "Pull Day",
      category: "Training",
      image:
        "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1000&q=80",
    },
    {
      id: "gal-8",
      title: "Team Energy",
      category: "Community",
      image:
        "https://images.unsplash.com/photo-1574680096145-d05b974e3047?w=1000&q=80",
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
      id: "faq-2",
      question: "How are training sessions scheduled?",
      answer:
        "Sessions are booked around your availability. Use our Booking page or contact us directly to lock in times that fit your week.",
      order: 2,
    },
    {
      id: "faq-3",
      question: "Are product prices listed online?",
      answer:
        "Product pricing is available on request. Click Inquire for Price on any item and we'll get back to you quickly.",
      order: 3,
    },
    {
      id: "faq-4",
      question: "What should I bring to my first session?",
      answer:
        "Comfortable training clothes, water, and a mindset ready to work. We'll handle the programming and coaching.",
      order: 4,
    },
    {
      id: "faq-5",
      question: "Can I train online or hybrid?",
      answer:
        "Yes. We offer in-person, remote, and hybrid coaching so your training stays consistent no matter your schedule.",
      order: 5,
    },
  ],
  pricing: [
    {
      id: "plan-1",
      name: "Starter",
      price: "$79",
      period: "/month",
      description: "Perfect for building consistent habits and foundational strength.",
      features: [
        "2 sessions / week",
        "Custom workout plan",
        "Form coaching",
        "Progress check-ins",
      ],
      highlighted: false,
    },
    {
      id: "plan-2",
      name: "Premium",
      price: "$149",
      period: "/month",
      description: "Our most popular package for serious transformation.",
      features: [
        "4 sessions / week",
        "Fully personalized program",
        "Nutrition guidance",
        "Priority booking",
        "Weekly progress reviews",
      ],
      highlighted: true,
    },
    {
      id: "plan-3",
      name: "Elite",
      price: "$249",
      period: "/month",
      description: "Maximum coaching intensity for athletes and high performers.",
      features: [
        "Unlimited sessions",
        "1-on-1 elite coaching",
        "Meal planning",
        "Recovery protocols",
        "24/7 coach access",
      ],
      highlighted: false,
    },
  ],
  services: [
    {
      id: "svc-1",
      title: "Personal Training",
      description:
        "One-on-one coaching calibrated to your goals, schedule, and performance markers.",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=900&q=80",
      icon: "dumbbell",
    },
    {
      id: "svc-2",
      title: "Strength Programming",
      description:
        "Periodized strength plans built on progressive overload and recovery science.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=900&q=80",
      icon: "zap",
    },
    {
      id: "svc-3",
      title: "Nutrition Coaching",
      description:
        "Practical fueling strategies that support fat loss, muscle gain, and energy.",
      image:
        "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80",
      icon: "apple",
    },
    {
      id: "svc-4",
      title: "Online Coaching",
      description:
        "Remote programming with video form checks and weekly accountability.",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80",
      icon: "monitor",
    },
    {
      id: "svc-5",
      title: "Group Sessions",
      description:
        "High-energy small group training that keeps intensity high and community strong.",
      image:
        "https://images.unsplash.com/photo-1574680096145-d05b974e3047?w=900&q=80",
      icon: "users",
    },
    {
      id: "svc-6",
      title: "Mobility & Recovery",
      description:
        "Targeted mobility work and recovery protocols to keep you training pain-free.",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80",
      icon: "heart",
    },
  ],
  orders: [],
};
