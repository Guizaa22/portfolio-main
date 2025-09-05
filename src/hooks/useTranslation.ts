"use client"

import { useState, useEffect } from 'react'

type TranslationKey = 
  | 'hero.title' 
  | 'hero.subtitle' 
  | 'hero.description'
  | 'skills.title'
  | 'experience.title'
  | 'projects.title'
  | 'feedback.title'
  | 'feedback.subtitle'
  | 'cta.title'
  | 'cta.description'
  | 'cta.contact'
  | 'cta.email'

const translations = {
  en: {
    'hero.title': 'Mohamed Guizani',
    'hero.subtitle': 'Senior Technical in Electronics',
    'hero.description': 'Highly skilled and motivated Electronic Technical with expertise in automation, electrotechnics, and electronics. I specialize in designing innovative electronic solutions, IoT systems, and automotive testing equipment. Passionate about continuous learning and creating efficient, durable electronic systems.',
    'skills.title': 'Technical Skills',
    'experience.title': 'Experience',
    'projects.title': 'Projects',
    'feedback.title': 'Client Feedback & Reviews',
    'feedback.subtitle': 'Discover what clients say about working with me on electronics, IoT, and automation projects',
    'cta.title': 'Ready to Work Together?',
    'cta.description': "I'm passionate about solving complex electronic problems and building innovative IoT solutions. Let's create something amazing together!",
    'cta.contact': 'Get In Touch',
    'cta.email': 'Send Email',
  },
  fr: {
    'hero.title': 'Mohamed Guizani',
    'hero.subtitle': 'Technicien Supérieur en Électronique',
    'hero.description': 'Technicien électronique hautement qualifié et motivé avec une expertise en automatisation, électrotechnique et électronique. Je me spécialise dans la conception de solutions électroniques innovantes, systèmes IoT et équipements de test automobiles. Passionné par l\'apprentissage continu et la création de systèmes électroniques efficaces et durables.',
    'skills.title': 'Compétences Techniques',
    'experience.title': 'Expérience',
    'projects.title': 'Projets',
    'feedback.title': 'Avis et Évaluations Clients',
    'feedback.subtitle': 'Découvrez ce que les clients disent de leur collaboration avec moi sur des projets d\'électronique, IoT et automatisation',
    'cta.title': 'Prêt à Travailler Ensemble?',
    'cta.description': 'Je suis passionné par la résolution de problèmes électroniques complexes et la création de solutions IoT innovantes. Créons quelque chose d\'extraordinaire ensemble!',
    'cta.contact': 'Me Contacter',
    'cta.email': 'Envoyer un Email',
  },
  zh: {
    'hero.title': '穆罕默德·吉扎尼',
    'hero.subtitle': '高级电子技术员',
    'hero.description': '技能娴熟且积极进取的电子技术员，在自动化、电工技术和电子学方面具有专业知识。我专门设计创新的电子解决方案、物联网系统和汽车测试设备。热衷于持续学习和创建高效、耐用的电子系统。',
    'skills.title': '技术技能',
    'experience.title': '工作经验',
    'projects.title': '项目',
    'feedback.title': '客户反馈与评价',
    'feedback.subtitle': '了解客户对我在电子、物联网和自动化项目合作方面的评价',
    'cta.title': '准备好合作了吗？',
    'cta.description': '我热衷于解决复杂的电子问题并构建创新的物联网解决方案。让我们一起创造出色的成果！',
    'cta.contact': '联系我',
    'cta.email': '发送邮件',
  },
  de: {
    'hero.title': 'Mohamed Guizani',
    'hero.subtitle': 'Leitender Elektroniktechniker',
    'hero.description': 'Hochqualifizierter und motivierter Elektroniktechniker mit Expertise in Automatisierung, Elektrotechnik und Elektronik. Ich spezialisiere mich auf die Entwicklung innovativer elektronischer Lösungen, IoT-Systeme und Automobilprüfgeräte. Leidenschaftlich für kontinuierliches Lernen und die Entwicklung effizienter, langlebiger elektronischer Systeme.',
    'skills.title': 'Technische Fähigkeiten',
    'experience.title': 'Erfahrung',
    'projects.title': 'Projekte',
    'feedback.title': 'Kundenfeedback & Bewertungen',
    'feedback.subtitle': 'Erfahren Sie, was Kunden über die Zusammenarbeit mit mir bei Elektronik-, IoT- und Automatisierungsprojekten sagen',
    'cta.title': 'Bereit zur Zusammenarbeit?',
    'cta.description': 'Ich bin leidenschaftlich daran interessiert, komplexe elektronische Probleme zu lösen und innovative IoT-Lösungen zu entwickeln. Lassen Sie uns gemeinsam etwas Außergewöhnliches schaffen!',
    'cta.contact': 'Kontakt aufnehmen',
    'cta.email': 'E-Mail senden',
  },
  ar: {
    'hero.title': 'محمد قيزاني',
    'hero.subtitle': 'تقني أول في الإلكترونيات',
    'hero.description': 'تقني إلكترونيات ماهر ومحفز للغاية مع خبرة في الأتمتة والكهروتقنية والإلكترونيات. أتخصص في تصميم حلول إلكترونية مبتكرة وأنظمة إنترنت الأشياء ومعدات اختبار السيارات. شغوف بالتعلم المستمر وإنشاء أنظمة إلكترونية فعالة ومتينة.',
    'skills.title': 'المهارات التقنية',
    'experience.title': 'الخبرة',
    'projects.title': 'المشاريع',
    'feedback.title': 'آراء وتقييمات العملاء',
    'feedback.subtitle': 'اكتشف ما يقوله العملاء حول العمل معي في مشاريع الإلكترونيات وإنترنت الأشياء والأتمتة',
    'cta.title': 'مستعد للعمل معًا؟',
    'cta.description': 'أنا شغوف بحل المشاكل الإلكترونية المعقدة وبناء حلول مبتكرة لإنترنت الأشياء. دعونا ننشئ شيئًا مذهلاً معًا!',
    'cta.contact': 'تواصل معي',
    'cta.email': 'إرسال بريد إلكتروني',
  },
}

export function useTranslation() {
  const [language, setLanguage] = useState<keyof typeof translations>('en')

  useEffect(() => {
    // Load saved language on component mount
    const savedLanguage = localStorage.getItem('preferred-language') as keyof typeof translations
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }

    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent) => {
      const newLanguage = event.detail.language as keyof typeof translations
      if (translations[newLanguage]) {
        setLanguage(newLanguage)
      }
    }

    window.addEventListener('languageChange', handleLanguageChange as EventListener)

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener)
    }
  }, [])

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key
  }

  const changeLanguage = (newLanguage: keyof typeof translations) => {
    setLanguage(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)
  }

  return {
    language,
    t,
    changeLanguage,
  }
}
