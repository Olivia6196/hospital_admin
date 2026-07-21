export type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  content: string;
  highlights?: Array<{ title: string; answer: string }>;
  author?: string;
  readTime?: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Advances in Minimally Invasive Surgery",
    excerpt:
      "New techniques in laparoscopic and robotic-assisted surgery are reducing recovery time and improving patient outcomes dramatically.",
    category: "Surgery",
    date: "Jul 20, 2026",
    image: "/images/surgery.jpg",
    slug: "minimally-invasive",
    content:
      "Minimally invasive surgery has transformed the modern operating room by allowing surgeons to treat a wide range of conditions with smaller incisions, less tissue disruption, and faster recovery periods. Compared with traditional surgery, these approaches often lead to reduced pain, shorter hospital stays, lower infection risk, and a quicker return to daily routines. For many patients, this means a less stressful surgical experience and a faster overall recovery.\n\nAt our hospital, advanced laparoscopic and robotic-assisted procedures are used in carefully selected cases where they can improve precision and patient comfort. Surgeons can operate through small openings while still maintaining excellent control, visibility, and safety. These methods are especially valuable for procedures involving the abdomen, pelvis, and some specialized areas of the body.\n\nAlthough minimally invasive surgery is not appropriate for every condition, it remains a major step forward in modern medicine. The growing use of these techniques reflects the broader commitment to surgical excellence, patient-centered recovery, and outcomes that support both physical wellbeing and quality of life.\n\nPatients exploring surgical options are encouraged to ask about the benefits, risks, and recovery expectations of each approach so they can make confident, informed decisions in partnership with their care team.",
  },
  {
    title: "Nutrition and Brain Health: What the Research Says",
    excerpt:
      "Emerging research shows strong links between diet and cognitive function. Learn which foods support a healthy brain.",
    category: "Neurology",
    date: "Jul 14, 2026",
    image: "/images/news_five.webp",
    slug: "brain-nutrition",
    content:
      "Nutrition plays a significant role in brain health because the foods we eat influence inflammation, energy levels, blood vessel health, and even memory function. Diets rich in leafy greens, colorful vegetables, nuts, seeds, beans, whole grains, and omega-3-rich foods can support long-term cognitive wellness. These nutrients help the brain function efficiently while supporting the body’s broader systems.\n\nResearch continues to show that what we eat can affect focus, mood, sleep quality, and the risk of age-related decline. A balanced diet can also improve blood flow to the brain, which is essential for maintaining attention, problem-solving, and overall mental clarity. At our hospital, neurologists and dietitians often discuss how nutrition supports recovery, prevention, and everyday brain function.\n\nThe link between food and mind health is not about quick fixes or miracle diets. Instead, it is about consistency, balance, and making healthy choices that are realistic over time. Small improvements such as limiting highly processed foods, staying hydrated, and eating regularly can make a meaningful difference.\n\nFor patients concerned about memory, concentration, or long-term neurological health, nutrition is one of the most practical and empowering areas to begin improving. With the right guidance, healthy eating can become an important part of sustaining brain performance throughout life.",
  },
  {
    title: "Managing Diabetes: A Comprehensive Guide",
    excerpt:
      "Living with diabetes requires careful management. Our endocrinologists share practical tips for maintaining healthy blood sugar levels.",
    category: "Wellness",
    date: "Jul 8, 2026",
    image: "/images/news_six.webp",
    slug: "diabetes-management",
    content:
      "Managing diabetes successfully often requires a blend of medication, nutrition, monitoring, movement, and education. The goal is not simply to lower blood sugar, but to build a sustainable routine that improves energy, protects organs, and supports long-term wellbeing. A care plan tailored to each patient’s needs is far more effective than one-size-fits-all advice.\n\nOur endocrinology team works with patients to identify practical ways to maintain healthy glucose levels while keeping daily life manageable. This may include understanding meal timing, reviewing medications, tracking patterns in the body, and recognizing symptoms that require medical attention. Patients often benefit from regular follow-up visits that help refine their plan as their health changes.\n\nLifestyle choices are a major part of diabetes care. Choosing balanced meals, staying physically active, sleeping well, limiting stress, and keeping appointments with healthcare providers can all reduce complications. Diabetes management is also deeply personal, and our clinicians focus on making care realistic, supportive, and tailored to each stage of life.\n\nWhen diabetes is managed carefully, patients can reduce risks related to vision, kidney health, circulation, and heart disease. The most effective approach is one that combines medical expertise with daily habits, education, and ongoing encouragement.",
  },
  {
    title: "The Rise of Telemedicine: Changing Healthcare Access",
    excerpt:
      "Telemedicine has revolutionized how patients access care. Discover the benefits and limitations of virtual healthcare visits.",
    category: "Wellness",
    date: "Jul 1, 2026",
    image: "/images/news_seven.webp",
    slug: "telemedicine",
    content:
      "Telemedicine has transformed healthcare access by allowing patients to connect with clinicians from home, work, or anywhere with a stable internet connection. This approach has helped reduce travel barriers, improve convenience, and support follow-up care for people with busy schedules, mobility challenges, or chronic conditions. For many patients, virtual visits make healthcare feel more approachable and less stressful.\n\nOur hospital uses telemedicine to expand access to specialist consultations, medication reviews, post-treatment follow-up, and routine discussion of symptoms and progress. In some cases, virtual care can provide a quick assessment that helps determine whether an in-person visit is necessary. It is especially useful for ongoing management and education rather than every single medical need.\n\nAlthough telemedicine offers clear benefits, it also requires thoughtful use. The best virtual appointments are well planned, include accurate medical history, and are supported by clear instructions for when a patient should seek urgent care. Technology can never fully replace the importance of physical examination in every case, but it can complement care in meaningful ways.\n\nAs online healthcare continues to grow, the goal remains the same: provide safe, effective, and compassionate access to medical support in the way that works best for each patient.",
  },
  {
    title: "Understanding Heart Disease: Prevention and Early Detection",
    excerpt:
      "Heart disease remains the leading cause of death worldwide. Learn how to reduce your risk with lifestyle changes and regular screenings.",
    category: "Cardiology",
    date: "Jun 10, 2026",
    image: "/images/news_one.jpg",
    slug: "heart-disease",
    content:
      "Heart disease remains one of the most common long-term health concerns affecting adults, but it is also one of the most preventable when patients receive timely education and support. At our hospital, cardiologists work closely with patients to explain how everyday habits, family history, stress, sleep quality, and existing medical conditions can influence cardiovascular health.\n\nA full picture of heart health often begins with simple but crucial steps such as tracking blood pressure, monitoring cholesterol levels, staying active, and understanding how diet affects circulation. We encourage patients to look beyond symptoms and think about prevention as an ongoing routine that protects the heart well before problems become severe. In many cases, a person may feel fine while underlying concerns are quietly developing, which is why regular screening and guided follow-up care are so valuable.\n\nOur care team emphasizes that prevention is not about perfection but consistency. Small changes such as reducing processed foods, walking more often, managing stress, avoiding smoking, and taking prescribed medication correctly can dramatically reduce the likelihood of complications. We also help families and patients interpret test results, make informed decisions, and create realistic plans that fit their lifestyles.\n\nWhen heart disease is detected early, treatment options are often more effective and less invasive. That is why our hospital continues to promote public awareness, early assessment, and personalized care plans that empower patients to take control of their health long before an emergency arises.",
    highlights: [
      {
        title: "How often should I get screened?",
        answer:
          "Most adults should discuss blood pressure, cholesterol, and heart-risk screening with their doctor based on age, family history, and lifestyle. Our team can help you determine the right schedule for your needs.",
      },
      {
        title: "What changes help reduce risk quickly?",
        answer:
          "Even small changes such as regular walking, better sleep, less smoking, and improved diet can make a meaningful difference over time. We guide patients toward realistic habits that are easier to maintain.",
      },
      {
        title: "When should I see a cardiologist?",
        answer:
          "You should consider a specialist visit if you have chest discomfort, persistent shortness of breath, a family history of heart disease, or abnormal test results. Early review can prevent complications.",
      },
    ],
    author: "Hospital Cardiology Team",
    readTime: "5 min read",
  },
  {
    title: "The Importance of Regular Health Check-Ups",
    excerpt:
      "Regular health screenings can catch problems early when they are most treatable. Discover the key tests every adult should have.",
    category: "Wellness",
    date: "Jun 5, 2026",
    image: "/images/news_two.jpg",
    slug: "check-ups",
    content:
      "Routine health check-ups are one of the most effective ways to protect long-term wellness because they allow doctors to detect small concerns before they develop into more serious conditions. During a standard appointment, our primary care physicians may review blood pressure, blood sugar, cholesterol, weight, sleep, stress, and other important indicators that reflect a patient’s overall health.\n\nThese visits also create space for patients to talk openly about concerns that may not seem urgent at first but can affect quality of life over time. A check-up is not just about treating illness; it is also an opportunity to discuss nutrition, exercise, mental health, vaccines, family history, and lifestyle adjustments. Patients often leave with practical guidance that helps them feel more confident in managing their health day to day.\n\nOur hospital believes prevention is most powerful when it is proactive. Even if someone feels healthy, an annual or periodic medical review can uncover hidden issues such as high blood pressure, early diabetes, anemia, or concerns that would otherwise go unnoticed. With early detection, treatment becomes simpler, more comfortable, and more successful.\n\nThe value of regular check-ups is especially important for older adults, people with chronic conditions, and families managing long-term health goals. A well-structured visit can help coordinate follow-up care, recommend relevant screenings, and keep patients connected to the right specialists when they need them most.",
    highlights: [
      {
        title: "What tests are usually included?",
        answer:
          "Common check-up tests may include blood pressure, cholesterol, blood sugar, weight review, and age-based screenings. Your physician can tailor the visit to your health history and risks.",
      },
      {
        title: "Why are check-ups important even when I feel fine?",
        answer:
          "Many serious issues develop silently, so preventive visits can catch concerns before they develop into symptoms or emergencies. They also help you stay on track with wellness goals.",
      },
      {
        title: "How often should I schedule one?",
        answer:
          "Many adults benefit from an annual visit, while others may need more frequent follow-up depending on age, chronic conditions, or family history. Our team can recommend the best schedule.",
      },
    ],
    author: "Primary Care Department",
    readTime: "4 min read",
  },
  {
    title: "Children's Mental Health: What Parents Should Know",
    excerpt:
      "Mental health is just as important as physical health. Here's how to support your child's emotional wellbeing.",
    category: "Pediatrics",
    date: "Jun 28, 2026",
    image: "/images/news_three.jpg",
    slug: "childrens-mental-health",
    content:
      "Children’s mental health deserves the same attention and care as physical wellbeing because emotional struggles often have a major effect on learning, relationships, behavior, and self-esteem. Parents play a crucial role in recognizing changes in mood, energy, motivation, appetite, sleep, or social interaction. When these patterns begin to shift, early support can make a lasting difference.\n\nOur pediatric specialists remind families that mental health concerns are not a sign of weakness or poor parenting. They are common, treatable challenges that can affect children and adolescents in many ways. Some children may withdraw from activities they once enjoyed, while others may become irritable, anxious, or unusually overwhelmed by school or social situations. The earlier these patterns are noticed, the more effective the support can be.\n\nAt our hospital, we encourage parents to create open, judgement-free spaces where children feel safe discussing their feelings. Honest conversations, consistent routines, and professional guidance can help children build resilience, confidence, and healthy coping tools. We work closely with families to connect them with pediatric counselors, therapists, and specialists when additional support is needed.\n\nMental health care is not only about treating a crisis. It is also about building emotional strength over time so children can grow into balanced, confident adults who know how to ask for help when they need it.",
    highlights: [
      {
        title: "What signs should parents watch for?",
        answer:
          "Common signs include sudden mood changes, withdrawal, irritability, sleep disruption, appetite changes, declining school performance, and persistent worry. These patterns are worth discussing early.",
      },
      {
        title: "How can I talk to my child about mental health?",
        answer:
          "Start with calm, open conversations, listen without judgement, and let your child know they can speak safely about their feelings. Gentle consistency often helps more than pressure.",
      },
      {
        title: "When should professional help be considered?",
        answer:
          "Professional support is a good option when concerns last for weeks, affect daily life, or seem too big for the child to manage alone. Early care often leads to better outcomes.",
      },
    ],
    author: "Pediatric Wellness Team",
    readTime: "4 min read",
  },
  {
    title: "Understanding Anxiety Disorders: Signs and Treatment",
    excerpt:
      "Anxiety affects millions of people worldwide. Learn to recognize the signs and explore evidence-based treatment options.",
    category: "Mental Health",
    date: "Jun 25, 2026",
    image: "/images/anxiety.jpg",
    slug: "anxiety-disorders",
    content:
      "Anxiety disorders can affect thoughts, emotions, sleep, relationships, and daily functioning, often making ordinary responsibilities feel overwhelming. They can appear as persistent worry, panic episodes, fear of specific situations, or physical symptoms such as racing heart, dizziness, or muscle tension. The important thing to understand is that anxiety is a real medical condition, not a personal weakness.\n\nOur mental health team encourages people to pay attention to patterns rather than dismiss symptoms as temporary stress. When anxiety begins to interfere with work, school, rest, or social life, professional treatment can offer significant relief. Early recognition is important because untreated anxiety can worsen over time and affect overall health.\n\nEvidence-based treatment options often include counseling, stress-management strategies, behavioral therapies, and, when appropriate, medication. The right approach depends on the severity of symptoms, the person’s history, and the support available in their home and community. Our clinicians take a compassionate, individualized approach to make treatment practical and effective.\n\nRecovery from anxiety is rarely about instant change. It is usually a process of building awareness, learning coping tools, and creating routines that support calm and confidence in daily life.",
  },
  {
    title: "Bone Health After 50: Prevention of Osteoporosis",
    excerpt:
      "As we age, maintaining strong bones becomes increasingly important. Discover key strategies to prevent bone loss and fractures.",
    category: "Wellness",
    date: "Jun 18, 2026",
    image: "/images/orthpedics.jpg",
    slug: "bone-health",
    content:
      "Bone health after 50 becomes increasingly important because the body naturally loses strength and density over time, especially for women after menopause and for people with limited physical activity or poor nutrition. Maintaining strong bones is about more than avoiding fractures; it is also about staying mobile, independent, and active as people age. Preventive care can make a meaningful difference in long-term quality of life.\n\nOur orthopedic and wellness specialists recommend a combination of weight-bearing exercise, adequate calcium and vitamin D intake, regular screening where appropriate, and healthy lifestyle choices. These habits support bone density and help reduce the risk of osteoporosis and related injuries. If someone has a history of falls, family history of fractures, or a medical condition that affects bone strength, a more detailed assessment may be necessary.\n\nThe best approach to bone health is proactive rather than reactive. Patients often benefit from understanding risk factors early, discussing medications that may affect bone strength, and creating a plan that includes movement, nutrition, and follow-up care. Even modest lifestyle changes can have a strong impact when sustained over time.\n\nBy taking bone health seriously early, patients can preserve strength, reduce fracture risk, and remain active and confident well into later life.",
  },
].sort((a, b) => {
  const parseDate = (value: string) => {
    const match = value.match(/^([A-Za-z]{3})\s+(\d{1,2}),\s*(\d{4})$/);

    if (!match) {
      return new Date(0);
    }

    const [, month, day, year] = match;
    const monthIndex = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].indexOf(month);

    return new Date(Number(year), monthIndex, Number(day));
  };

  return parseDate(b.date).getTime() - parseDate(a.date).getTime();
});

export const featuredBlogPost = blogPosts[0];

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug) ?? null;
}
