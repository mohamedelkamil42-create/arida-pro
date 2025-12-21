
import { Category, PetitionModel } from './types';

export const COURTS = [
  'قاضي محكمة المدينة',
  'قاضي المحكمة الجزئية',
  'قاضي المحكمة العامة',
  'قاضي المحكمة الشرعية',
  'قاضي محكمة الاستئناف',
  'قاضي المحكمة العليا'
];

export const INVESTIGATION_OFFICES = [
  'رئيس قسم الشرطة',
  'المتحري',
  'وكيل النيابة',
  'وكيل اول النيابة',
  'وكيل اعلى النيابة',
  'رئيس النيابة العامة',
  'النائب العام'
];

export const PETITION_MODELS: PetitionModel[] = [
  // --- العريضة العامة ---
  {
    id: 'general-petition',
    title: 'العريضة العامة (محرر شامل)',
    category: Category.GENERAL,
    contentTemplate: 'نلتمس من سيادتكم التكرم بالنظر في هذا الطلب المقدم من طرفنا للآتي من أسباب:\n(اكتب وقائع طلبك هنا بالتفصيل...)'
  },

  // --- العرائض الجنائية ---
  {
    id: 'crim-murder',
    title: 'عريضة دعوى قتل عمد',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﻭﻗﺎﺋﻊ ﺍﻟﺒﻼﻍ ( ﺍﻟﻤﺸﻜﻮ ﺿﺪه ﻭﺑﺘﺎﺭﻳﺦ تذكر التاريخ قام ﺑﻄﻌﻦ ﺍﻟﻤﺠﻨﻲ ﻋﻠﻴﺔ ﺏ ( ﺳﻜﻴﻦ) ﻭﺍﺭدﺍﻩ ﻗﺘﻴﻼ .\n3 ـ ﺑﺬﻟﻚ ﻳﻜﻮﻥ ﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ ﻗﺪ ﺧﺎﻟﻒ ﻧﺺ ﺍﻟﻤﺎﺩﺓ (130) ﻣﻦ ﻕ .ﺝ ﻟﺴﻨﺔ 1991 ﺗﻌﺪﻳﻞ 2020 ﻡ.\n4 - ﻟﻤﺎ ﺗﻘﺪﻡ ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ : ﻓﺘﺢ ﺑﻼﻍ، إﺻﺪﺍﺭ ﺇﻣﺮ ﻗﺒﺾ، ﺍﻟﻘﺼﺎﺹ ﻭﺍﻟﺪﻳﺔ ﻛﺎﻣﻠﺔ.'
  },
  {
    id: 'crim-wound',
    title: 'عريضة دعوى جراح عمد',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﺑﺘﺎﺭﻳﺦ.../.../2022 ﻗﺎﻡ ﺍﻟﺸﺎﻛﻲ ﺑﻀﺮﺏ ﺍﻟﻤﺸﻜﻮ ﺿﺪه وسبب له جراح في ( ) وتم نقله للمستشفى.\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ (139) ﻣﻦ ﺍﻟﻘﺎﻧﻮﻥ ﺍﻟﺠﻨﺎﺋﻲ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ ﻭإﺻﺪﺍﺭ ﺇﻣﺮ ﻗﺒﺾ.'
  },
  {
    id: 'crim-child',
    title: 'عريضة بلاغ طفل',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﺍﻷﻓﻌﺎﻝ ﺍﻟﺘﻲ ﻗﺎﻡ ﺑﻬﺎ ﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ هي ( ).\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ ( ) ﻣﻦ ﻗﺎﻧﻮﻥ ﺍﻟﻄﻔﻞ ﻟﺴﻨﺔ 2010.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ ﻭإﺻﺪﺍﺭ ﺇﻣﺮ ﻗﺒﺾ.'
  },
  {
    id: 'crim-drugs',
    title: 'عريضة بلاغ مخدرات',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺻﻔﺔ ﺍﻟﺸﺎﻛﻲ ( رﻗﻴﺐ ﻓﻨﻲ ﻓﻲ ﻣﺒﺎﺣﺚ ﻗﺴﻢ ﻣﻜﺎﻓحه ﺍﻟﻤﺨﺪﺭﺍﺕ).\n2 - ﻣﻮﺿﻮﻉ ﺍﻟﺒﻼﻍ (أثناء ﺩﻭﺭﻳﺔ ﻭﺟﺪ ﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ وبحوزته مواد مخدرة).\n3 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ ﺗﺤﺖ ﻧﺺ ﺍﻟﻤﺎﺩﺓ ( ) ﻣﻦ ﻗﺎﻧﻮﻥ ﺍﻟﻤﺨﺪﺭﺍﺕ ﻟﺴﻨﺔ 1994.'
  },
  {
    id: 'crim-trespass',
    title: 'عريضة دعوى التعدي الجنائي',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ( ﺍﻟﺸﺎﻛﻲ ﻟﺪﻳﺔ ﻣﻨﺰﻝ بالرقم ( ) ﻭﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ ﻳﺴﻜﻦ ﻓﻲ ﺍﻟﻤﻨﻘﻄﺔ).\n2 - قام ﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ بالتبعدي ﻋﻠﻲ ﻣﻨﺰﻝ ﺍﻟﺸﺎﻛﻲ (تذكر التعدي).\n3 ـ ﺑﺬﻟﻚ ﻳﻜﻮﻥ ﻗﺪ خالف ﺍﻟﻤﺎﺩﺓ (183) ﻣﻦ ﻕ.ﺝ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﺇﺯﺍﻟﺔ ﺍﻟﺘﻌﺪﻱ ﻭﻓﺘﺢ ﺑﻼﻍ.'
  },
  {
    id: 'crim-damage',
    title: 'عريضة دعوى الاتلاف الجنائي',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﺍﻟﺸﺎﻛﻲ ﺫﻛﺮ ﻟﻠﻤﺸﻜﻮ ﺿﺪﻩ ( ﺍﻻﻟﻔﺎﻅ) ﻗﺎﺻﺪﺍ ﺇﻫﺎﻧﺘﺔ وإتلاف ( ).\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ (182) ﻣﻦ ﺍﻟﻘﺎﻧﻮﻥ ﺍﻟﺠﻨﺎﺋﻲ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ ﻭإﺻﺪﺍﺭ ﺇﻣﺮ ﻗﺒﺾ.'
  },
  {
    id: 'crim-possession',
    title: 'عريضة دعوى التملك الجنائي',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 . ﺍﻟﺸﺎﻛﻲ ﻗﺎﻡ ﺑﺈﻋﻄﺎﺀ ﺍﻟﻤﺸﻜﻮ ﺿﺪﻩ ( ) ﻭﻋﻨﺪ ﺍﻟﻤﻄﺎﻟﺒﺔ ﺑﺎﺳﺘﺮﺩﺍﺩﻫﺎ ﺭﻓﺾ ﻭﺟﺤﺪ .\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ (180) ﻣﻦ ﺍﻟﻘﺎﻧﻮﻥ ﺍﻟﺠﻨﺎﺋﻲ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ الاسترداد وﻓﺘﺢ ﺑﻼﻍ.'
  },
  {
    id: 'crim-check',
    title: 'عريضة دعوى اعطاء صك مردود',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﺣﺮﺭ ﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ ﺷﻴﻚ ﺑﻤﺒﻠﻎ ( ) ﻭﻋﻨﺪ ﺍﻟﺘﻘﺪﻳﻢ ﺍﺭﺗﺪ ﺍﻟﺸﻴﻚ بسبب ( ).\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ (179) ﻣﻦ ﺍﻟﻘﺎﻧﻮﻥ ﺍﻟﺠﻨﺎﺋﻲ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ ﻭإﻟﺰﺍﻡ الخصم ﺑﺎﻟﺴﺪﺍﺩ.'
  },
  {
    id: 'crim-fraud',
    title: 'عريضة دعوى احتيال',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟطرفان يعملان في التجارة.\n2 - اشترى ﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ بضاعة بمبلغ ( ) واختفى.\n3 ـ ﺑﺬﻟﻚ ﻳﻜﻮﻥ قد خالف المادة (178) ﻣﻦ القانون الجنائي.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓتح بلاغ ﻭإﺻﺪﺍﺭ ﺇﻣﺮ ﻗﺒﺾ.'
  },
  {
    id: 'crim-trust',
    title: 'عريضة دعوى خيانة امانة',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﻗﺎﻡ ﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ ﺑﺄﺧﺬ ( ) ﻭجحده وحوله لمنفعته.\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ (177) ﻣﻦ ﺍﻟﻘﺎﻧﻮﻥ ﺍﻟﺠﻨﺎﺋﻲ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ.'
  },
  {
    id: 'crim-theft',
    title: 'عريضة دعوى سرقة',
    category: Category.CRIMINAL,
    contentTemplate: '1 ـ ( ﺍﻟﺸﺎﻛﻲ ﻳﻌﻤﻞ ﻓﻲ ﺩﻛﺎﻥ ﻟﻠﺘﺠﺎﺭﺓ ﻓﻲ ﻣﺪﻳﻨﺔ ــــــ ﺣﻲ ـــــــ).\n2 ـ ﻭﺟﺪ ﺍﻟﺸﺎﻛﻲ ﺧﺰﻧﺘه ﺑﺎﻟﺪﻛﺎﻥ ﻣﻜﺴﻮﺭﺓ ﻭتم سرقة مبلغ ( ).\n3 ـ ﻛﺎﻥ ﻗﺪ ﺷﺎﻫﺪ ﺍﻟﻤﺸﻜﻮ ﺿﺪﺓ ﺣﺎﻣﻼ ﺍﻟﻤﻌﺮﻭﺿﺎﺕ ﻭﻓﺮ ﻫﺎﺭﺑﺎ.\n4 ـ ﺍﻟﺸﺎﻛﻲ ﻟﺪﻳﺔ ﻛﺎﻣﻴﺮﺍﺕ ﻣﺮﺍﻗﺒﺔ (ﻣﺮﻓﻖ ﻓﻼﺷه).\n5 . ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺩﻋﻮﻱ ﺟﻨﺎﺋﻴﺔ تحت المادة (174).'
  },
  {
    id: 'crim-abuse',
    title: 'عريضة دعوى اساءة وسباب',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﺍﻟﺸﺎﻛﻲ ﺫﻛﺮ ﻟﻠﻤﺸﻜﻮ ﺿﺪﻩ (ﺍﻻﻟﻔﺎﻅ) ﻗﺎﺻﺪﺍ ﺇﻫﺎﻧﺘه.\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ (160) ﻣﻦ ﺍﻟﻘﺎﻧﻮﻥ ﺍﻟﺠﻨﺎﺋﻲ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ.'
  },
  {
    id: 'crim-defamation',
    title: 'عريضة دعوى اشانة سمعة',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﺍﻟﻤﺸﻜﻮ ﺿﺪﻩ ﺫﻛﺮ ﻟﻠﺸﺎﻛﻲ ( ﺍﻷﻟﻔﺎﻅ) ﺃمام ﺟﻤﻊ ﻣﻦ ﺍﻟﻨﺎﺱ.\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ (159) ﻣﻦ ﺍﻟﻘﺎﻧﻮﻥ ﺍﻟﺠﻨﺎﺋﻲ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ.'
  },
  {
    id: 'crim-injury',
    title: 'عريضة دعوى اذى',
    category: Category.CRIMINAL,
    contentTemplate: '1- ﺍﻟﻌﻼﻗﺔ ﺑﻴﻦ ﺍﻟﺸﺎﻛﻲ ﻭﺍﻟﻤﺘﻬﻢ .\n2 - ﺍﻷﻓﻌﺎﻝ ﺍﻟﺘﻲ ﻗﺎﻡ ﺑﻬﺎ ﺍﻟﻤﺸﻜﻮ ﺿﺪه هي ( ).\n3 ـ ﺍﻷﻓﻌﺎﻝ ﺗﻌﺘﺒﺮ ﻣﺨﺎﻟﻔﺔ ﻟﻨﺺ ﺍﻟﻤﺎﺩﺓ (142) ﻣﻦ ﺍﻟﻘﺎﻧﻮﻥ ﺍﻟﺠﻨﺎﺋﻲ.\n4 - ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ ﻓﺘﺢ ﺑﻼﻍ.'
  },
  {
    id: 'crim-false',
    title: 'عريضة دعوى اتهام كاذب',
    category: Category.CRIMINAL,
    contentTemplate: '1. ﺍﻟﻤﺸﻜﻮ ﺿﺪﻩ ﻗﺎﻡ ﺑﻔﺘﺢ ﺩﻋﻮى ﺟﻨﺎﺋﻲ بالرقم ( ) ﻭﺻﺪﺭ ﺣﻜﻢ ﺑﺸﻄﺐ ﺍﻟﺘﻬﻤﺔ.\n2. ﻃﺎﻟﺐ ﺍﻟﺸﺎﻛﻲ ﺍﻟﻤﺤﻜﻤﺔ ﺑﺈﻋﻄﺎﺋﻪ ﺍﻹﺫﻥ (ﻣﺮﻓﻖ).\n3. تضرر ﺍﻟﺸﺎﻛﻲ ﻣﺎﺩﻳﺎ ﻭﻣﻌﻨويﺎ.\n4. ﻳﻠﺘﻤﺲ ﺍﻟﺸﺎﻛﻲ فتح بلاغ تحت المادة (114) والتعويض.'
  },

  // --- الأحوال الشخصية ---
  {
    id: 'pers-mother-alim',
    title: 'عريضة دعوى نفقة امومة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / ﺍﻟﻤﺪﻋﻲ ﻋﻠﻴﺔ ﻫﻮ ﻭﻟﺪ ﺍﻟﻤﺪﻋﻴﺔ ﻧﺴﺒﺎ.\n2 / ﺍﻟﻤﺪﻋﻴﺔ ﻓﻘﻴﺮﺓ ﻭﻧﻔﻘﺘﻬﺎ ﻭﺍجﺒﺔ ﻋﻠﻲ ابنها وهو مقصر فيها.\n3 / ﺍﻟﻤﺪﻋﻲ ﻋﻠﻴﺔ ميسور الحال.\n4 / تﻠﺘﻤﺲ ﺍﻟﻤﺪﻋﻴﺔ الحكم لها بنفقة بمبلغ ( ).'
  },
  {
    id: 'pers-divorce-harm',
    title: 'عريضة دعوى التطليق للضرر',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / ﺍﻟﻤﺪﻋﻴﺔ ﺯﻭﺟﺔ ﺷﺮﻋﻴﺔ ﻟﻠﻤﺪﻋﻲ ﻋﻠﻴﺔ.\n2 / المدعى عليه قام بـ (تذكر الضرر) مما يتعذر معه دوام العشرة.\n3 / ﺗﻠﺘﻤﺲ ﺍﻟﻤﺪﻋﻴﺔ الحكم لها بتطليقها طلقة بائنة للضرر.'
  },
  {
    id: 'pers-visitation',
    title: 'عريضة دعوى رؤية واصطحاب محضون',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعي كان زوجاً للمدعى عليها وطلقها.\n2 / له منها ابنة ( ) في حضانة والدتها.\n3 المدعى عليها تحول بينه وبين رؤية ابنته.\n4 / ﻳﻠﺘﻤﺲ ﺍﻟمدعي الحكم بزيارة ابنته واصطحابها.'
  },
  {
    id: 'pers-custody-foreign',
    title: 'عريضة دعوى إسقاط حضانة للزواج بأجنبي',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعى عليها مطلقة المدعي وبيدها الحضانة.\n2 / المدعى عليها عقد قرانها على أجنبي عن المحضونين.\n3 / ﻳﻠﺘﻤﺲ ﺍﻟمدعي إسقاط حضانتها وتسليمه الأبناء.'
  },
  {
    id: 'pers-custody-neglect',
    title: 'عريضة دعوى إسقاط حضانة للإهمال',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعى عليها غير قادرة على تربية المحضونين للإهمال (تذكر الوقائع).\n2 / ﻳﻠﺘﻤﺲ ﺍﻟمدعي إسقاط حضانتها وتسليمه الأبناء.'
  },
  {
    id: 'pers-breastfeed',
    title: 'عريضة دعوى اجرة رضاعة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعية رزقت من المدعى عليه بولد ولم يكمل السنتين.\n2 / تحتاج المدعية لأجرة رضاعة وهو قادر على سدادها.\n3 / ﺗﻠﺘﻤﺲ ﺍﻟﻤﺪﻋﻴﺔ الحكم لها بمبلغ ( ).'
  },
  {
    id: 'pers-custody-age',
    title: 'عريضة دعوى ضم محضون لتجاوز سن حضانة النساء',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المحضونين ( ) تجاوزوا سن حضانة النساء.\n2 / ﻳﻠﺘﻤﺲ ﺍﻟمدعي الحكم بضمهم إليه.'
  },
  {
    id: 'pers-marriage-null',
    title: 'عريضة دعوى فسخ نكاح',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعية بكر بالغ وزوجها وليها دون إذنها ورضاها.\n2 / ﺗﻠﺘﻤﺲ ﺍﻟﻤﺪﻋﻴﺔ فسخ نكاحها ومنع الخصم من التعرض لها.'
  },
  {
    id: 'pers-divorce-money',
    title: 'عريضة دعوى التطليق على فدية',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعية زوجة ممتنعة عن تنفيذ حكم الطاعة.\n2 / تعرض على الزوج مبلغ ( ) لقاء حل العصمة.\n3 / ﺗﻠﺘﻤﺲ الحكم بتطليقها طلقة بائنة على فدية.'
  },
  {
    id: 'pers-divorce-sterile',
    title: 'عريضة دعوى التطليق للعقم',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعى عليه عقيم والمدعية تخشى فوات فرصة الإنجاب.\n2 / ﺗﻠﺘﻤﺲ الحكم بتطليقها طلقة بائنة للعقم.'
  },
  {
    id: 'pers-divorce-absent',
    title: 'عريضة دعوى التطليق للغيبة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعى عليه غاب لأكثر من سنة إلى جهة مجهولة.\n2 / تضررت المدعية من الغياب.\n3 / ﺗﻠﺘﻤﺲ الحكم بتطليقها طلقة بائنة للغيبة.'
  },
  {
    id: 'pers-divorce-impotent',
    title: 'عريضة دعوى التطليق للعنة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعى عليه عجز عن معاشرتها لأنه عنين.\n2 / ﺗﻠﺘﻤﺲ الحكم بتطليقها طلقة بائنة للعنة.'
  },
  {
    id: 'pers-divorce-discord',
    title: 'عريضة دعوى التطليق للشقاق',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / استمر الشقاق وتعذر الإصلاح ومضى على حكم سابق أكثر من 3 أشهر.\n2 / ﺗﻠﺘﻤﺲ الحكم بتطليقها طلقة بائنة للشقاق.'
  },
  {
    id: 'pers-divorce-insolvent',
    title: 'عريضة دعوى التطليق للإعسار',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعى عليه أعسر عن النفقة وغاب في مكان مجهول.\n2 / ﺗﻠﺘﻤﺲ الحكم بتطليقها للإعسار.'
  },
  {
    id: 'pers-divorce-nonpay',
    title: 'عريضة دعوى التطليق لعدم الإنفاق',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعى عليه ميسور الحال وممتنع عن النفقة.\n2 / ﺗﻠﺘﻤﺲ الحكم بتطليقها لعدم الإنفاق.'
  },
  {
    id: 'pers-proof-divorce-money',
    title: 'عريضة دعوى إثبات طلاق علي مال',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / طلقها الزوج نظير البراءة من حقوقها المالية ووافقت.\n2 / رفض تسليم الوثيقة.\n3 / ﺗﻠﺘﻤﺲ إثبات هذه الطلقة قضائياً.'
  },
  {
    id: 'pers-proof-divorce-cert',
    title: 'عريضة دعوى إثبات طلاق مصادق عليها',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / طلقها الزوج بلفظ "أنت طالق" ولم يرجعها.\n2 / ﺗﻠﺘﻤﺲ إثبات هذه الطلقة قضائياً.'
  },
  {
    id: 'pers-correct-marriage',
    title: 'تصحيح وثيقة زواج',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المأذون حرر طلاقاً بائناً خطأً واللفظ كان رجعياً.\n2 / ﻳﻠﺘﻤﺲ تصحيح وصف الوثيقة لتصبح طلقة رجعية.'
  },
  {
    id: 'pers-alim-siblings',
    title: 'عريضة دعوى نفقة اخوة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعية فقيرة والنفقة واجبة على أخيها الميسور.\n2 / ﺗﻠﺘﻤﺲ الحكم بنفقة إخوة مبلغ ( ).'
  },
  {
    id: 'pers-alim-father',
    title: 'عريضة دعوى نفقة ابوة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعي فقير والنفقة واجبة على ابنه الميسور.\n2 / ﻳﻠﺘﻤﺲ الحكم بنفقة أبوة مبلغ ( ).'
  },
  {
    id: 'pers-alim-iddah',
    title: 'عريضة دعوى نفقة عدة ومتعه',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / تستحق المدعية نفقة عدة ونفقة متعة لمدة 6 أشهر.\n2 / ﺗﻠﺘﻤﺲ الحكم لها بالمبالغ المذكورة.'
  },
  {
    id: 'pers-alim-increase',
    title: 'عريضة دعوى زيادة نفقة بنوة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / لارتفاع تكاليف الحياة وزيادة أعمار الأولاد.\n2 / ﺗﻠﺘﻤﺲ الحكم بزيادة النفقة لتصبح ( ).'
  },
  {
    id: 'pers-alim-child',
    title: 'عريضة دعوى نفقة بنوة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / امتنع الأب عن الإنفاق على أبنائه رغم يساره.\n2 / ﺗﻠﺘﻤﺲ الحكم بنفقة بنوة.'
  },
  {
    id: 'pers-alim-wife',
    title: 'عريضة دعوى نفقة زوجية',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / المدعية زوجة في الطاعة وامتنع زوجها عن نفقتها.\n2 / ﺗﻠﺘﻤﺲ الحكم بنفقة زوجية مبلغ ( ).'
  },
  {
    id: 'pers-permit-foreign',
    title: 'عريضة مادة اذن زواج من اجنبي',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / تقدم لخطبتها ( ) وهو أجنبي ووافق وليها.\n2 / ﺗﻠﺘﻤﺲ مخاطبة المأذون لإتمام الزواج.'
  },
  {
    id: 'pers-late-dowry',
    title: 'عريضة دعوى مطالبة بمؤخر صداق',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / طلقت المدعية وتبقى لها مؤخر صداق مبلغ ( ).\n2 / ﺗﻠﺘﻤﺲ الحكم لها بمؤخر صداقها.'
  },
  {
    id: 'pers-marriage-permit',
    title: 'عريضة مادة اذن زواج',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / عضل الوالد ابنته ورفض تزويجها من كفء.\n2 / ﺗﻠﺘﻤﺲ منحها الإذن بالزواج بولاية شقيقها.'
  },
  {
    id: 'pers-marriage-certify',
    title: 'عريضة مادة تصادق علي زواج',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / تم عقد القران شرعاً ولم يثبت رسمياً.\n2 / ﻳﻠﺘﻤﺲ إثبات الزيجة قضائياً ومخاطبة المأذون.'
  },
  {
    id: 'pers-return-engagement',
    title: 'عريضة دعوى رد مال خطبة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / عدلت المخطوبة عن الخطبة دون مقتضى.\n2 / ﻳﻠﺘﻤﺲ رد المهر والشبكة والهدايا.'
  },
  {
    id: 'pers-house-items',
    title: 'عريضة دعوى أمتعة منزلية',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / طلقت المدعية ولها أمتعة بيد المدعى عليه جحدها.\n2 / ﺗﻠﺘﻤﺲ الحكم بتسليمها الأمتعة عيناً أو قيمتها.'
  },
  {
    id: 'pers-obedience-case',
    title: 'عريضة دعوى طاعة',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / الزوجة ممتنعة عن الطاعة رغم تهيئة المسكن الشرعي.\n2 / ﻳﻠﺘﻤﺲ الحكم بدخولها في طاعته.'
  },
  {
    id: 'pers-jewelry-return',
    title: 'عريضة دعوى استرداد مصاغ',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / أحضر الزوج مصاغاً للزينة ورفضت الزوجة رده بعد الطلاق.\n2 / ﻳﻠﺘﻤﺲ الحكم باسترداده.'
  },
  {
    id: 'pers-travel-permit',
    title: 'عريضة دعوى إذن سفر بالمحضون',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / ترغب الأم في السفر بالمحضون ورفض الوالد دون سبب.\n2 / ﺗﻠﺘﻤﺲ الإذن بالسفر.'
  },
  {
    id: 'pers-paternity',
    title: 'عريضة دعوى إثبات نسب',
    category: Category.PERSONAL_STATUS,
    contentTemplate: '1 / رزقت منه بولد ورفض الإقرار بأبوته.\n2 / ﺗﻠﺘﻤﺲ إثبات صحة نسب الصغير.'
  },

  // --- المدنية ---
  {
    id: 'civ-evict-morals',
    title: 'عريضة دعوى اخلاء للإزعاج العام وافعال منافيه للآداب',
    category: Category.CIVIL,
    contentTemplate: '1 . الجار تضرر من أفعال المدعي عليه الإزعاجية والمنافية للآداب.\n2 . ﻳﻠﺘﻤﺲ الحكم بالإخلاء والتعويض.'
  },
  {
    id: 'civ-evict-sub',
    title: 'عريضة دعوى ﺇﺧﻼﺀ للاﻳﺠﺎﺭﺓ ﻣﻦ ﺍﻟﺒﺎﻃﻦ',
    category: Category.CIVIL,
    contentTemplate: '1 . المستأجر أجر العقار من الباطن دون علم المالك.\n2 . ﻳﻠﺘﻤﺲ الحكم بالإخلاء للطرفين.'
  },
  {
    id: 'civ-evict-change',
    title: 'عريضة دعوى ﺇﺧﻼﺀ ﻹﺟﺮﺍﺀ ﺗﻐﻴﺮﺍﺕ ﺟﻮﻫرية',
    category: Category.CIVIL,
    contentTemplate: '1 . إجراء تغييرات في العقار دون علمنا.\n2 . ﻳﻠﺘﻤﺲ الحكم بالإخلاء.'
  },
  {
    id: 'civ-evict-owner',
    title: 'عريضة دعوى ﺇﺧﻼﺀ ﻟﻠﻤﺎﻟﻚ ﺍﻟﺠﺪﻳﺪ',
    category: Category.CIVIL,
    contentTemplate: '1 . المالك الجديد أنذر المستأجر بالإخلاء.\n2 . ﻳﻠﺘﻤﺲ الحكم بالإخلاء.'
  },
  {
    id: 'civ-evict-end',
    title: 'عريضة دعوى اخلاء لانتهاء الاجارة الحكمية',
    category: Category.CIVIL,
    contentTemplate: '1 . انتهاء الأمد القانوني للإجارة.\n2 . ﻳﻠﺘﻤﺲ الحكم بالإخلاء.'
  },
  {
    id: 'civ-rent-fair',
    title: 'عريضة دعوى اجرة المثل',
    category: Category.CIVIL,
    contentTemplate: '1 . تعديل الأجرة لتناسب المثل وغلاء المعيشة.\n2 . ﻳﻠﺘﻤﺲ الحكم بتعديل الأجرة.'
  },
  {
    id: 'civ-partnership',
    title: 'عريضة دعوى فض شراكة',
    category: Category.CIVIL,
    contentTemplate: '1 . مخالفة عقد الشراكة في توزيع الأرباح.\n2 . ﻳﻠﺘﻤﺲ فض الشراكة وسداد المستحقات.'
  },
  {
    id: 'civ-possession',
    title: 'عريضة دعوى إثبات حيازة',
    category: Category.CIVIL,
    contentTemplate: '1 . التعدي على حيازة هادئة ومستقرة للقطعة ( ).\n2 . ﻳﻠﺘﻤﺲ إثبات الحيازة والإخلاء.'
  },
  {
    id: 'civ-labor',
    title: 'عريضة دعوى عمل',
    category: Category.CIVIL,
    contentTemplate: '1 . فصل تعسفي وحرمان من الإجازات ومكافأة الخدمة.\n2 . ﻳﻠﺘﻤﺲ التعويض وبدل الإجازات.'
  },
  {
    id: 'civ-claim-1',
    title: 'عريضة دعوى مطالبة مالية 1',
    category: Category.CIVIL,
    contentTemplate: '1 . مديونية بضاعة تجارية مبلغ ( ).\n2 . ﻳﻠﺘﻤﺲ إلزام الخصم بالسداد.'
  },
  {
    id: 'civ-claim-2',
    title: 'عريضة دعوى مطالبة مالية 2',
    category: Category.CIVIL,
    contentTemplate: '1 . قرض شخصي والمدعى عليه يماطل.\n2 . ﻳﻠﺘﻤﺲ إلزام الخصم بالسداد.'
  },
  {
    id: 'civ-proof-sale',
    title: 'عريضة دعوى إثبات بيع',
    category: Category.CIVIL,
    contentTemplate: '1 . سداد ثمن المنزل ورفض تحويل السجل.\n2 . ﻳﻠﺘﻤﺲ إثبات البيع ومخاطبة التسجيلات.'
  },
  {
    id: 'civ-easement',
    title: 'عريضة دعوى حق الارتفاق',
    category: Category.CIVIL,
    contentTemplate: '1 . فتح نوافذ تطل على عقار المدعي.\n2 . ﻳﻠﺘﻤﺲ إزالة الضرر وقفل النوافذ.'
  },
  {
    id: 'civ-urgent-need',
    title: 'عريضة دعوى الحوجة الماسة',
    category: Category.CIVIL,
    contentTemplate: '1 . المالك يحتاج العقار للسكنى حوجة ماسة.\n2 . ﻳﻠﺘﻤﺲ الحكم بالإخلاء.'
  },
  {
    id: 'civ-fail-pay',
    title: 'عريضة دعوى اخلا للفشل في السداد',
    category: Category.CIVIL,
    contentTemplate: '1 . فشل المستأجر في سداد الأجرة.\n2 . ﻳﻠﺘﻤﺲ الحكم بالإخلاء وسداد المتأخرات.'
  }
];

export const FOOTER_LINKS = [
  { name: 'MEELAWFIRM', url: 'https://www.meelawfirm.info/الصفحة-الرئيسية' },
  { name: 'إخلاء المسئولية', url: 'https://www.meelawfirm.info/الصفحة-الرئيسية/إخلاء-المسؤولية-القانونية' },
  { name: 'سياسة الخصوصية', url: 'https://www.meelawfirm.info/الصفحة-الرئيسية/سياسة-الخصوصية' },
  { name: 'شروط الاستخدام', url: 'https://www.meelawfirm.info/الصفحة-الرئيسية/اتفاقية-الاستخدام' },
  { name: 'من نحن', url: 'https://www.meelawfirm.info/الصفحة-الرئيسية/من-نحن' },
  { name: 'اتصل بنا', url: 'https://www.meelawfirm.info/الصفحة-الرئيسية/اتصل-بنا' }
];

export const SOCIAL_LINKS = {
  youtube: 'https://www.youtube.com/@MEELAWFIRM',
  facebook: 'https://www.facebook.com/share/17Ziq62xJD/',
  tiktok: 'https://www.tiktok.com/@meelawfirm?_r=1&_t=ZM-92O7WHWak9I',
  email: 'meelawfirm1@gmail.com'
};
