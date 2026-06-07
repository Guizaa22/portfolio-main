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
    'hero.description': "I'm a 4th-year Cybersecurity Engineering student, building on a Licence degree in Embedded Systems. I haven't tied myself to a single branch of cybersecurity yet — instead I'm exploring it broadly, from SOC operations and network security to offensive testing and secure development. I'm genuinely open to any opportunity that will sharpen my skills: I learn fast, embrace real-world challenges, and I'm eager to grow with a team that helps me discover where I can contribute most.",
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
    'hero.description': "Étudiant en 4ème année de Génie Cybersécurité, fort d'une Licence en Systèmes Embarqués. Je ne me suis pas encore enfermé dans une seule branche de la cybersécurité : je l'explore largement, des opérations SOC et la sécurité réseau aux tests offensifs et au développement sécurisé. Je suis réellement ouvert à toute opportunité qui renforcera mes compétences : j'apprends vite, j'aime relever des défis concrets, et je suis impatient de grandir au sein d'une équipe qui m'aidera à trouver où je peux le mieux contribuer.",
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
    'hero.description': '网络安全工程四年级学生，拥有嵌入式系统学士（Licence）学位。我尚未将自己局限于网络安全的某个分支，而是广泛探索这一领域——从 SOC 运营、网络安全到攻击性测试与安全开发。我真诚地对任何能提升我技能的机会持开放态度：我学习能力强，乐于迎接真实世界的挑战，并渴望在能帮助我发现自身最大价值的团队中成长。',
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
    'hero.description': "Cybersecurity-Engineering-Student im 4. Jahr, aufbauend auf einem Licence-Abschluss in Embedded Systems. Ich habe mich noch nicht auf einen einzelnen Bereich der Cybersicherheit festgelegt – stattdessen erkunde ich das Feld breit, von SOC-Betrieb und Netzwerksicherheit bis hin zu offensiven Tests und sicherer Entwicklung. Ich bin wirklich offen für jede Gelegenheit, die meine Fähigkeiten schärft: Ich lerne schnell, stelle mich gerne realen Herausforderungen und möchte in einem Team wachsen, das mir hilft herauszufinden, wo ich am meisten beitragen kann.",
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
    'hero.description': 'طالب في السنة الرابعة من هندسة الأمن السيبراني، بالاعتماد على شهادة إجازة (ليسانس) في الأنظمة المدمجة. لم أحصر نفسي بعد في فرع واحد من الأمن السيبراني، بل أستكشف المجال بشكل واسع — من عمليات SOC وأمن الشبكات إلى الاختبارات الهجومية والتطوير الآمن. أنا منفتح بصدق على أي فرصة تصقل مهاراتي: أتعلّم بسرعة، وأحب خوض التحديات الواقعية، وأتطلّع إلى النمو ضمن فريق يساعدني على اكتشاف حيث يمكنني تقديم أفضل مساهمة.',
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
