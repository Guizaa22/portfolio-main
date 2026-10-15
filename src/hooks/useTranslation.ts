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
    'hero.subtitle': '4th Year Cybersecurity Engineering Student',
    'hero.description': "I audit APIs, run open-source SOC pipelines and write up exactly what broke. Looking for a summer internship in cybersecurity.",
    'skills.title': 'Technical Skills',
    'experience.title': 'Experience',
    'projects.title': 'Projects',
    'feedback.title': 'Client Feedback & Reviews',
    'feedback.subtitle': 'Discover what clients say about working with me on cybersecurity, IoT, and automation projects',
    'cta.title': 'Ready to Work Together?',
    'cta.description': "I'm passionate about cybersecurity, network infrastructure, and building innovative IoT solutions. Let's create something amazing together!",
    'cta.contact': 'Get In Touch',
    'cta.email': 'Send Email',
  },
  fr: {
    'hero.title': 'Mohamed Guizani',
    'hero.subtitle': 'Étudiant en 4ème année Génie Cybersécurité',
    'hero.description': "J'audite des API, je monte des pipelines SOC open source et je documente précisément ce qui a cédé. À la recherche d'un stage d'été en cybersécurité.",
    'skills.title': 'Compétences Techniques',
    'experience.title': 'Expérience',
    'projects.title': 'Projets',
    'feedback.title': 'Avis et Évaluations Clients',
    'feedback.subtitle': 'Découvrez ce que les clients disent de leur collaboration avec moi sur des projets de cybersécurité, IoT et automatisation',
    'cta.title': 'Prêt à Travailler Ensemble?',
    'cta.description': 'Je suis passionné par la cybersécurité, l\'infrastructure réseau et la création de solutions IoT innovantes. Créons quelque chose d\'extraordinaire ensemble!',
    'cta.contact': 'Me Contacter',
    'cta.email': 'Envoyer un Email',
  },
  zh: {
    'hero.title': '穆罕默德·吉扎尼',
    'hero.subtitle': '网络安全工程四年级学生',
    'hero.description': "我审计 API，搭建开源 SOC 流水线，并详细记录每一个被攻破的环节。正在寻找网络安全方向的暑期实习。",
    'skills.title': '技术技能',
    'experience.title': '工作经验',
    'projects.title': '项目',
    'feedback.title': '客户反馈与评价',
    'feedback.subtitle': '了解客户对我在网络安全、物联网和自动化项目合作方面的评价',
    'cta.title': '准备好合作了吗？',
    'cta.description': '我热衷于网络安全、网络基础设施和构建创新的物联网解决方案。让我们一起创造出色的成果！',
    'cta.contact': '联系我',
    'cta.email': '发送邮件',
  },
  de: {
    'hero.title': 'Mohamed Guizani',
    'hero.subtitle': 'Student im 4. Jahr Cybersecurity Engineering',
    'hero.description': "Ich prüfe APIs, betreibe Open-Source-SOC-Pipelines und dokumentiere genau, was gebrochen ist. Auf der Suche nach einem Sommerpraktikum in der Cybersicherheit.",
    'skills.title': 'Technische Fähigkeiten',
    'experience.title': 'Erfahrung',
    'projects.title': 'Projekte',
    'feedback.title': 'Kundenfeedback & Bewertungen',
    'feedback.subtitle': 'Erfahren Sie, was Kunden über die Zusammenarbeit mit mir bei Cybersecurity-, IoT- und Automatisierungsprojekten sagen',
    'cta.title': 'Bereit zur Zusammenarbeit?',
    'cta.description': 'Ich bin leidenschaftlich an Cybersecurity, Netzwerkinfrastruktur und innovativen IoT-Lösungen interessiert. Lassen Sie uns gemeinsam etwas Außergewöhnliches schaffen!',
    'cta.contact': 'Kontakt aufnehmen',
    'cta.email': 'E-Mail senden',
  },
  ar: {
    'hero.title': 'محمد قيزاني',
    'hero.subtitle': 'طالب هندسة الأمن السيبراني - السنة الرابعة',
    'hero.description': "أُدقّق واجهات API، وأبني خطوط SOC مفتوحة المصدر، وأوثّق بدقة ما تمّ اختراقه. أبحث عن تدريب صيفي في الأمن السيبراني.",
    'skills.title': 'المهارات التقنية',
    'experience.title': 'الخبرة',
    'projects.title': 'المشاريع',
    'feedback.title': 'آراء وتقييمات العملاء',
    'feedback.subtitle': 'اكتشف ما يقوله العملاء حول العمل معي في مشاريع الأمن السيبراني وإنترنت الأشياء والأتمتة',
    'cta.title': 'مستعد للعمل معًا؟',
    'cta.description': 'أنا شغوف بالأمن السيبراني والبنية التحتية للشبكات وبناء حلول مبتكرة لإنترنت الأشياء. دعونا ننشئ شيئًا مذهلاً معًا!',
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
