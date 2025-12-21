
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Category, PetitionModel, FormData as IFormData } from './types.ts';
import { PETITION_MODELS, COURTS, INVESTIGATION_OFFICES, FOOTER_LINKS, SOCIAL_LINKS } from './constants.ts';

// --- Modern SVG Icons Components ---

const GeneralIcon = () => (
  <svg className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const CivilIcon = () => (
  <svg className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16s3-2 3-5a7 7 0 1 0-14 0c0 3 3 5 3 5" />
    <path d="M5 20h14" />
    <path d="M12 9v4" />
    <path d="M10 14h4" />
  </svg>
);

const CriminalIcon = () => (
  <svg className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const PersonalIcon = () => (
  <svg className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selectedModel, setSelectedModel] = useState<PetitionModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<IFormData>({
    userRole: 'محامي',
    partyRole: 'شاكي',
    customPartyRole: '',
    secondPartyRole: 'مشكو ضده',
    customSecondPartyRole: '',
    applicantName: '',
    applicantAddress: '',
    applicantPhone: '',
    defendantName: '',
    defendantAddress: '',
    defendantPhone: '',
    policeStation: '',
    investigator: '',
    prosecutor: '',
    courtName: '',
    judgeTitle: COURTS[0],
    caseNumber: '',
    subject: '',
    body: '',
    requests: '',
    witnesses: '',
    documents: '',
    extraDetails: ''
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goHome = () => {
    setIsEditing(false);
    setSelectedModel(null);
    setActiveCategory(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return PETITION_MODELS.filter(m => 
      m.title.toLowerCase().includes(lowerQuery) || 
      m.category.toLowerCase().includes(lowerQuery)
    ).slice(0, 8);
  }, [searchQuery]);

  const handleCategoryClick = (cat: Category) => {
    setActiveCategory(cat);
    if (cat === Category.GENERAL) {
      handleModelSelect(PETITION_MODELS[0]);
    }
  };

  const handleModelSelect = (model: PetitionModel) => {
    setSelectedModel(model);
    setFormData(prev => ({
      ...prev,
      subject: model.title,
      body: model.contentTemplate,
      requests: '',
      partyRole: model.category === Category.CRIMINAL ? 'شاكي' : 'مدعي',
      secondPartyRole: model.category === Category.CRIMINAL ? 'مشكو ضده' : 'مدعى عليه'
    }));
    setIsEditing(true);
    setIsSearchFocused(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const exportToWord = () => {
    const content = document.getElementById('printable-document')?.innerHTML;
    if (!content) return;

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Export Word</title>
        <style>
          body { font-family: 'Amiri', serif; direction: rtl; text-align: right; }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .text-left { text-align: left; }
          .font-bold { font-weight: bold; }
          .underline { text-decoration: underline; }
          .mb-1 { margin-bottom: 0.1rem; }
          .mb-2 { margin-bottom: 0.2rem; }
          .mb-4 { margin-bottom: 0.5rem; }
        </style>
      </head>
      <body>
    `;
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `عريضة_${formData.applicantName || 'قانونية'}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const exportToPDF = () => {
    window.print();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const inputClass = "p-4 border-2 border-slate-300 rounded-[1rem] focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium bg-white";
  const labelClass = "font-bold text-slate-800 mb-1 block";

  const partyRoleOptions = [
    'مدعي', 'مدعى عليه', 'شاكي', 'مشكو ضده', 'متهم', 'مستانف', 'مستانف ضده', 'طاعن', 'مطعون ضده', 'مقدم العريضة', 'المقدم ضده العريضة', 'أخرى'
  ];

  const getEffectivePartyRole = (role: string, custom: string) => role === 'أخرى' ? custom : role;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-sm py-4 md:py-6 sticky top-0 z-50 px-4 no-print border-b border-gray-100">
        <div className="container mx-auto flex flex-col items-center">
            <button 
                onClick={goHome}
                className="group flex flex-col items-center transition-all duration-500 transform"
            >
                <h1 className="text-3xl md:text-5xl font-bold text-center text-emerald-600 tracking-tighter group-hover:scale-105 transition-transform duration-500">
                  MEELAWFIRM
                </h1>
                <div className="flex items-center gap-2 mt-1 overflow-hidden">
                  <span className="h-[2px] w-4 bg-blue-600/30 group-hover:w-8 transition-all duration-500"></span>
                  <span className="text-sm md:text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                    محرر العرائض والطلبات
                  </span>
                  <span className="h-[2px] w-4 bg-blue-600/30 group-hover:w-8 transition-all duration-500"></span>
                </div>
            </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {!isEditing ? (
          <>
            {/* Search Section */}
            <div ref={searchRef} className="max-w-3xl mx-auto mb-16 relative">
              <div className={`relative transition-all duration-500 transform ${isSearchFocused ? 'scale-[1.02]' : 'scale-100'}`}>
                <input
                  type="text"
                  placeholder="ابحث عن العريضة المطلوبة... (مثلاً: قتل، طلاق، إخلاء)"
                  className={`w-full p-6 pr-14 rounded-[2rem] border-2 outline-none transition-all shadow-xl text-xl text-right bg-white ${isSearchFocused ? 'border-blue-500 shadow-blue-50' : 'border-gray-200 shadow-gray-100'}`}
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className={`absolute right-6 top-1/2 -translate-y-1/2 transition-all duration-300 ${isSearchFocused ? 'text-blue-600 scale-110' : 'text-gray-300'}`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
              </div>
              
              {isSearchFocused && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-[2rem] mt-4 overflow-hidden z-50 border border-gray-100 animate-in fade-in slide-in-from-top-4">
                  {filteredModels.length > 0 ? (
                    <div className="py-2">
                      {filteredModels.map(model => (
                        <button
                          key={model.id}
                          onClick={() => handleModelSelect(model)}
                          className="w-full text-right px-8 py-5 hover:bg-blue-50 flex justify-between items-center transition-all group"
                        >
                          <span className="font-bold text-gray-700 group-hover:text-blue-700">{model.title}</span>
                          <span className="text-xs text-gray-400">{model.category}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <button 
                        onClick={() => handleModelSelect(PETITION_MODELS[0])}
                        className="w-full text-center py-8 px-6 bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-all flex flex-col items-center gap-2"
                    >
                        <span className="text-2xl">📝</span>
                        لم يتم العثور على نتيجة؟ استخدم العريضة العامة للتشكيل اليدوي
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Main Interactive Grid (2x2 Mobile) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto mb-16">
              {[
                { id: Category.GENERAL, title: 'المحرر العام', icon: <GeneralIcon />, gradient: 'from-indigo-600 to-indigo-700' },
                { id: Category.CIVIL, title: 'العرائض المدنية', icon: <CivilIcon />, gradient: 'from-emerald-600 to-emerald-700' },
                { id: Category.CRIMINAL, title: 'العرائض الجنائية', icon: <CriminalIcon />, gradient: 'from-slate-700 to-slate-800' },
                { id: Category.PERSONAL_STATUS, title: 'أحوال شخصية', icon: <PersonalIcon />, gradient: 'from-rose-600 to-rose-700' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id as Category)}
                  className={`group relative bg-gradient-to-br ${item.gradient} text-white p-6 md:p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center justify-center gap-4 text-center aspect-square`}
                >
                  <div className="drop-shadow-lg group-hover:scale-105 transition-transform">{item.icon}</div>
                  <span className="text-lg md:text-2xl font-bold tracking-tight">{item.title}</span>
                </button>
              ))}
            </div>

            {/* Category Model List */}
            {activeCategory && activeCategory !== Category.GENERAL && (
              <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-500">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-800">اختر نوع العريضة ({activeCategory})</h2>
                  <button onClick={() => setActiveCategory(null)} className="text-gray-400 hover:text-red-500">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PETITION_MODELS.filter(m => m.category === activeCategory).map(model => (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect(model)}
                      className="p-6 border border-gray-100 rounded-[1.5rem] hover:bg-blue-50/50 text-right transition-all group flex justify-between items-center"
                    >
                      <span className="font-bold text-gray-700 group-hover:text-blue-700">{model.title}</span>
                      <span className="text-blue-200">←</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Editor Section */
          <div className="max-w-7xl mx-auto space-y-10">
            <div className="bg-white p-6 md:p-10 rounded-[3rem] shadow-2xl no-print border border-gray-100 border-t-8 border-t-blue-600">
              <button onClick={goHome} className="mb-6 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-bold no-print transition-all">
                <span>&rarr;</span> العودة لتغيير النوع
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className={labelClass}>صفة مقدم الطلب</label>
                  <select className={inputClass} value={formData.userRole} onChange={e => setFormData({...formData, userRole: e.target.value as any})}>
                    <option>محامي</option>
                    <option>مقدم الطلب بنفسه</option>
                  </select>
                </div>

                <div className="hidden md:block"></div>

                {/* Party Data */}
                <div className="md:col-span-2 bg-blue-50/30 p-6 md:p-8 rounded-[2rem] border-2 border-blue-100 space-y-6">
                  <h3 className="font-bold text-blue-800 border-b-2 border-blue-200 pb-2 flex items-center gap-2 text-xl">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                    بيانات الطرف الأول (مقدم العريضة)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <label className={labelClass}>الصفة القانونية</label>
                      <select className={inputClass} value={formData.partyRole} onChange={e => setFormData({...formData, partyRole: e.target.value})}>
                        {partyRoleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    {formData.partyRole === 'أخرى' && (
                      <div className="flex flex-col">
                        <label className={labelClass}>اكتب الصفة المخصصة</label>
                        <input type="text" placeholder="مثلاً: مستأنف..." className={inputClass} value={formData.customPartyRole} onChange={e => setFormData({...formData, customPartyRole: e.target.value})} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <label className={labelClass}>الاسم الكامل</label>
                      <input type="text" placeholder="الاسم الرباعي" className={inputClass} value={formData.applicantName} onChange={e => setFormData({...formData, applicantName: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>العنوان</label>
                      <input type="text" placeholder="مكان الإقامة" className={inputClass} value={formData.applicantAddress} onChange={e => setFormData({...formData, applicantAddress: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>رقم الهاتف</label>
                      <input type="text" placeholder="0XXXXXXXXX" className={inputClass} dir="ltr" value={formData.applicantPhone} onChange={e => setFormData({...formData, applicantPhone: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-red-50/30 p-6 md:p-8 rounded-[2rem] border-2 border-red-100 space-y-6">
                  <h3 className="font-bold text-red-800 border-b-2 border-red-200 pb-2 flex items-center gap-2 text-xl">
                    <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                    بيانات الطرف الثاني (الخصم/المقدم ضده)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <label className={labelClass}>الصفة القانونية</label>
                      <select className={inputClass} value={formData.secondPartyRole} onChange={e => setFormData({...formData, secondPartyRole: e.target.value})}>
                        {partyRoleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    {formData.secondPartyRole === 'أخرى' && (
                      <div className="flex flex-col">
                        <label className={labelClass}>اكتب الصفة المخصصة</label>
                        <input type="text" placeholder="مثلاً: خصم..." className={inputClass} value={formData.customSecondPartyRole} onChange={e => setFormData({...formData, customSecondPartyRole: e.target.value})} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <label className={labelClass}>اسم الخصم</label>
                      <input type="text" placeholder="اسم الطرف الثاني" className={inputClass} value={formData.defendantName} onChange={e => setFormData({...formData, defendantName: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>عنوان الخصم</label>
                      <input type="text" placeholder="عنوان الطرف الثاني" className={inputClass} value={formData.defendantAddress} onChange={e => setFormData({...formData, defendantAddress: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>هاتف الخصم</label>
                      <input type="text" placeholder="رقم التواصل" className={inputClass} dir="ltr" value={formData.defendantPhone} onChange={e => setFormData({...formData, defendantPhone: e.target.value})} />
                    </div>
                  </div>
                </div>

                {/* Investigating / Court Details */}
                <div className="flex flex-col">
                  <label className={labelClass}>الجهة (لدى...)</label>
                  <input type="text" className={inputClass} value={formData.policeStation} onChange={e => setFormData({...formData, policeStation: e.target.value})} placeholder="نيابة... / محكمة..." />
                </div>
                <div className="flex flex-col">
                  <label className={labelClass}>المسؤول (السيد / ...)</label>
                  <select className={inputClass} value={formData.judgeTitle} onChange={e => setFormData({...formData, judgeTitle: e.target.value})}>
                    {COURTS.map(c => <option key={c}>{c}</option>)}
                    {INVESTIGATION_OFFICES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className={labelClass}>رقم الدعوى</label>
                  <input type="text" className={inputClass} placeholder="ق م / ... / 2024" value={formData.caseNumber} onChange={e => setFormData({...formData, caseNumber: e.target.value})} />
                </div>
                <div className="flex flex-col">
                    <label className={labelClass}>الموضوع</label>
                    <input type="text" className={`${inputClass} font-bold`} value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </div>

                {/* Petition Body */}
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>وقائع العريضة (المتن)</label>
                  <textarea rows={10} className={`${inputClass} petition-font text-2xl leading-relaxed shadow-inner`} placeholder="اكتب وقائع وأسباب العريضة هنا..." value={formData.body} onChange={e => setFormData({...formData, body: e.target.value})} />
                </div>

                {/* Requests Field */}
                <div className="md:col-span-2 flex flex-col">
                  <label className={`${labelClass} text-blue-700`}>الطلبات الختامية</label>
                  <textarea rows={4} className={`${inputClass} petition-font text-2xl border-blue-300 shadow-inner`} placeholder="ماذا تطلب من المحكمة/النيابة في نهاية العريضة؟" value={formData.requests} onChange={e => setFormData({...formData, requests: e.target.value})} />
                </div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>الشهود (اكتب كل شاهد في سطر منفصل)</label>
                  <textarea rows={3} className={inputClass} value={formData.witnesses} onChange={e => setFormData({...formData, witnesses: e.target.value})} placeholder="1. الشاهد الأول&#10;2. الشاهد الثاني..." />
                </div>
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>المستندات المرفقة</label>
                  <input type="text" className={inputClass} value={formData.documents} onChange={e => setFormData({...formData, documents: e.target.value})} placeholder="عقود، إفادات، صور..." />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-12 bg-slate-50 p-6 rounded-[2rem] border border-gray-100">
                <button onClick={() => setShowPreviewModal(true)} className="flex-1 bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-lg">👁️ معاينة المستند</button>
                <button onClick={exportToWord} className="flex-1 bg-blue-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-600 transition-all shadow-lg flex items-center justify-center gap-2">
                    تصدير Word
                </button>
                <button onClick={exportToPDF} className="flex-1 bg-rose-500 text-white py-5 rounded-2xl font-bold text-lg hover:bg-rose-600 transition-all shadow-lg flex items-center justify-center gap-2">
                    تصدير PDF
                </button>
                <button onClick={handlePrint} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg">🖨️ طباعة</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col max-h-[96vh] border border-gray-200">
            <div className="p-8 flex justify-between items-center border-b no-print">
              <h3 className="font-bold text-2xl text-slate-800 tracking-tight">تنسيق المستند النهائي A4</h3>
              <div className="flex gap-4">
                <button onClick={exportToWord} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold hover:bg-blue-100 transition-all text-sm">Word</button>
                <button onClick={exportToPDF} className="bg-rose-50 text-rose-600 px-4 py-2 rounded-xl font-bold hover:bg-rose-100 transition-all text-sm">PDF</button>
                <button onClick={() => setShowPreviewModal(false)} className="bg-slate-50 text-slate-400 w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-50 transition-all text-xl">✕</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-100 flex justify-center">
               <div id="printable-document" className="bg-white w-full max-w-[210mm] p-[10mm] md:p-[15mm] shadow-2xl petition-font text-[14pt] leading-[1.3] min-h-[297mm] relative text-black text-right flex flex-col" style={{ direction: 'rtl' }}>
                  
                  {/* Header Layout */}
                  <div className="text-center mb-0.5 font-bold">لدى {formData.policeStation || '....................'}</div>
                  <div className="text-center mb-0.5 font-bold text-[11pt]">فيمابين</div>
                  <div className="text-center mb-0.5 font-bold text-[14pt]">
                    {formData.applicantName || '....................'} ({getEffectivePartyRole(formData.partyRole, formData.customPartyRole)}) - {formData.applicantAddress || '.......'} - {formData.applicantPhone || '.......'}
                  </div>
                  <div className="text-center mb-0.5 font-bold text-[11pt]">ضد</div>
                  <div className="text-center mb-0.5 font-bold text-[14pt]">
                    {formData.defendantName || '....................'} ({getEffectivePartyRole(formData.secondPartyRole, formData.customSecondPartyRole)}) - {formData.defendantAddress || '.......'} - {formData.defendantPhone || '.......'}
                  </div>
                  <div className="text-center mb-1.5 font-bold border-y border-black/10 py-0.5">رقم الدعوى: {formData.caseNumber || '......... / .........'}</div>
                  <div className="text-center mb-2"><span className="font-bold underline decoration-1 underline-offset-4">الموضوع / {formData.subject}</span></div>
                  
                  <div className="flex justify-between mb-1.5 border-b border-black/5 pb-0.5">
                    <div className="font-bold">السيد / {formData.judgeTitle}</div>
                    <div className="font-bold text-left">الموقر,,,</div>
                  </div>
                  
                  <div className="text-center font-bold mb-1.5 text-[12pt]">بعد التحية والاحترام</div>
                  
                  {/* Body & Requests */}
                  <div className="text-justify whitespace-pre-wrap text-[13pt] leading-[1.4] mb-1">
                    {formData.body}
                    {formData.requests && (
                      <div className="mt-2">
                        <p className="font-bold underline mb-0.5">الطلبات:</p>
                        <div className="pr-4">{formData.requests}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Unified Conclusion, Witnesses and Signature Block */}
                  <div className="mt-2 border-t border-black/5 pt-2">
                    <div className="text-center font-bold text-[13pt] mb-2">ولعدالتكم فائق الاحترام والتقدير</div>

                    <div className="flex justify-between items-start mb-1">
                      {/* Witnesses Section */}
                      <div className="text-right space-y-0 flex-1">
                          <p className="font-bold underline text-[11pt] mb-0.5">الشهود:</p>
                          {formData.witnesses.split(/[\n,]+/).filter(w => w.trim()).length > 0 ? (
                            formData.witnesses.split(/[\n,]+/).filter(w => w.trim()).map((w, idx) => (
                              <p key={idx} className="text-[11pt] leading-tight">{idx + 1}. {w.trim()}</p>
                            ))
                          ) : (
                            <p className="text-[11pt]">1. ....................</p>
                          )}
                      </div>

                      {/* Signature Section */}
                      <div className="text-center w-48 pt-1">
                          <p className="font-bold text-[11pt] mb-0.5">مقدم العريضة</p>
                          <p className="font-bold text-[11pt] mb-0.5 leading-tight truncate px-2">{formData.applicantName || '....................'}</p>
                          <div className="border-t border-black w-36 mx-auto opacity-60"></div>
                          <p className="text-[8pt] mt-0.5">(التوقيع)</p>
                      </div>
                    </div>

                    {/* Documents moved immediately below Witnesses and Signature */}
                    <div className="pt-2 border-t border-black/5">
                      <p className="font-bold underline text-[10pt] mb-0.5">المستندات المرفقة:</p>
                      <p className="text-[10pt] opacity-80 leading-tight">{formData.documents || '................................'}</p>
                    </div>
                  </div>
               </div>
            </div>
            <div className="p-8 bg-white border-t flex gap-6 no-print">
               <button onClick={handlePrint} className="flex-1 bg-blue-600 text-white py-4 rounded-[1.5rem] font-bold text-xl hover:bg-blue-700 shadow-xl">تأكيد وطباعة</button>
               <button onClick={() => setShowPreviewModal(false)} className="flex-1 bg-slate-100 text-slate-600 py-4 rounded-[1.5rem] font-bold text-xl hover:bg-slate-200">العودة للتعديل</button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-600 py-12 px-4 no-print mt-auto border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <button 
                onClick={scrollToTop}
                className="text-2xl font-bold text-emerald-600 tracking-tighter hover:text-blue-600 transition-all hover:scale-105"
              >
                MEELAWFIRM
              </button>
              <p className="text-[11px] opacity-70 font-bold text-slate-800">محرر العرائض والطلبات</p>
            </div>
            
            <div className="flex gap-6 items-center">
              <a href={SOCIAL_LINKS.facebook} target="_blank" className="text-slate-400 hover:text-blue-600 transition-all hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" className="text-slate-400 hover:text-red-600 transition-all hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" className="text-slate-400 hover:text-black transition-all hover:-translate-y-1">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31 0 2.59.32 3.72.93a6.52 6.52 0 0 1-1.6 4.3 6.51 6.51 0 0 1-4.3 2.02v3.01c2.14 0 4.14.77 5.7 2.07l.01.01c1.55 1.3 2.53 3.24 2.53 5.41 0 3.86-3.14 7-7 7s-7-3.14-7-7a6.97 6.97 0 0 1 1.76-4.6l.01-.01c1.3-1.55 3.24-2.53 5.41-2.53V7.02c-1.89 0-3.64-.74-4.95-1.95L7 4.02C5.7 2.72 5 1 5 0h3.01c0 1.1.45 2.09 1.17 2.81l.01.01c.71.72 1.7 1.17 2.81 1.17V.02zM12.5 14.5c-1.1 0-2.09.45-2.81 1.17l-.01.01c-.72.71-1.17 1.7-1.17 2.81 0 2.21 1.79 4 4 4s4-1.79 4-4c0-1.1-.45-2.09-1.17-2.81l-.01-.01c-.72-.72-1.71-1.17-2.82-1.17z"/></svg>
              </a>
              <a href={`mailto:${SOCIAL_LINKS.email}`} className="text-slate-400 hover:text-blue-500 transition-all hover:-translate-y-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </a>
            </div>

            <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest text-slate-700">
              {FOOTER_LINKS.slice(1, 6).map(link => (
                <a key={link.name} href={link.url} target="_blank" className="hover:text-blue-600 transition-colors">{link.name}</a>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold border-t border-gray-200 pt-8 uppercase tracking-tighter text-slate-500">
            <span>إصدار V: 2.1.7 (PWA)</span>
            <span className="md:mr-auto"></span>
            <span>&copy; 2026 MEELAWFIRM - جميع الحقوق محفوظة</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
