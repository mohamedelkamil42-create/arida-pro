
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Category, PetitionModel, FormData as IFormData } from './types.ts';
import { PETITION_MODELS, COURTS, INVESTIGATION_OFFICES, FOOTER_LINKS, SOCIAL_LINKS } from './constants.ts';

// --- Modern SVG Icons Components ---

const GeneralIcon = () => (
  <svg className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
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
    extraDetails: '',
    additionalStatement: ''
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
    if (typeof window.print === 'function') {
      window.print();
    } else {
      alert("خاصية الطباعة غير مدعومة في هذا المتصفح.");
    }
  };

  const exportToPDF = () => {
    const element = document.getElementById('printable-document-content');
    if (!element) {
      alert("حدث خطأ في العثور على محتوى المستند.");
      return;
    }

    // @ts-ignore
    const opt = {
      margin:       15,
      filename:     `عريضة_${formData.applicantName || 'قانونية'}.pdf`,
      image:        { type: 'jpeg', quality: 1.0 },
      html2canvas:  { 
        scale: 4, 
        useCORS: true, 
        letterRendering: true,
        scrollX: 0,
        scrollY: 0,
        backgroundColor: '#ffffff'
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  const exportToWord = () => {
    const content = document.getElementById('printable-document-content')?.innerHTML;
    if (!content) {
      alert("حدث خطأ في استرداد محتوى المستند.");
      return;
    }

    const styles = `
      <style>
        body { 
          font-family: 'Calibri', 'Segoe UI', 'Arial', sans-serif; 
          direction: rtl; 
          text-align: right; 
          padding: 1in;
          line-height: 1.6;
          mso-bidi-font-family: 'Calibri';
          mso-ascii-font-family: 'Calibri';
          mso-hansi-font-family: 'Calibri';
          unicode-bidi: embed;
        }
        .text-center { text-align: center; }
        .font-bold { font-weight: bold; }
        .underline { text-decoration: underline; }
        .mb-1 { margin-bottom: 5pt; }
        .mb-2 { margin-bottom: 15pt; }
        .border-y { border-top: 1.5pt solid black; border-bottom: 1.5pt solid black; }
        .border-b { border-bottom: 1pt solid black; }
        .border-t { border-top: 1pt solid black; }
        .py-0\\.5 { padding-top: 2pt; padding-bottom: 2pt; }
        p, div { 
          margin: 0; 
          padding: 0; 
          font-size: 14pt; 
          direction: rtl; 
          unicode-bidi: isolate; 
        }
        .text-justify { text-align: justify; }
        .whitespace-pre-wrap { white-space: pre-wrap; }
        .flex { display: block; width: 100%; }
        .justify-between { display: block; width: 100%; overflow: hidden; }
        .text-left { text-align: left; }
        .mt-2 { margin-top: 20pt; }
        .pt-1 { padding-top: 5pt; }
        .pt-2 { padding-top: 15pt; }
        .w-48 { width: 220pt; display: inline-block; vertical-align: top; }
        .w-36 { width: 160pt; margin: 0 auto; }
        .flex-1 { display: inline-block; width: 55%; vertical-align: top; }
      </style>
    `;

    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40' lang="ar" dir="rtl">
      <head>
        <meta charset='utf-8'>
        <meta name="ProgId" content="Word.Document">
        <title>MEELAWFIRM Petition</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
            <w:RelyOnVML/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        ${styles}
      </head>
      <body lang="AR-SA" dir="RTL" style="tab-interval:36.0pt; unicode-bidi:embed">
    `;
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;
    
    const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/vnd.ms-word;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `عريضة_${formData.applicantName || 'قانونية'}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toArabicDigits = (num: number | string) => {
    return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
  };

  const inputClass = "p-4 border-2 border-slate-300 rounded-[1rem] focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium bg-white text-right";
  const labelClass = "font-bold text-slate-800 mb-1 block text-right";

  const partyRoleOptions = [
    'مدعي', 'مدعى عليه', 'شاكي', 'مشكو ضده', 'متهم', 'مستانف', 'مستانف ضده', 'طاعن', 'مطعون ضده', 'مقدم العريضة', 'المقدم ضده العريضة', 'أخرى'
  ];

  const getEffectivePartyRole = (role: string, custom: string) => role === 'أخرى' ? custom : role;

  const PrintableDocument = ({ id }: { id: string }) => (
    <div 
      id={id} 
      lang="ar" 
      dir="rtl" 
      className="bg-white w-full max-w-[210mm] pt-[30mm] p-[10mm] md:pt-[40mm] md:p-[15mm] shadow-none md:shadow-2xl petition-font text-[14pt] leading-[1.6] min-h-[297mm] relative text-black text-right flex flex-col" 
      style={{ direction: 'rtl', unicodeBidi: 'isolate', textAlign: 'right' }}
    >
      {/* Header Layout */}
      <div className="text-center mb-0.5 font-bold text-[16pt]" dir="rtl" style={{ unicodeBidi: 'embed' }}>لدى {formData.policeStation || '....................'}</div>
      <div className="text-center mb-0.5 font-bold text-[12pt]" dir="rtl">فيمابين</div>
      <div className="text-center mb-0.5 font-bold text-[15pt]" dir="rtl" style={{ unicodeBidi: 'embed' }}>
        {formData.applicantName || '....................'} - {getEffectivePartyRole(formData.partyRole, formData.customPartyRole)} - {formData.applicantAddress || '.......'} - {formData.applicantPhone || '.......'}
      </div>
      <div className="text-center mb-0.5 font-bold text-[12pt]" dir="rtl">ضد</div>
      <div className="text-center mb-0.5 font-bold text-[15pt]" dir="rtl" style={{ unicodeBidi: 'embed' }}>
        {formData.defendantName || '....................'} - {getEffectivePartyRole(formData.secondPartyRole, formData.customSecondPartyRole)} - {formData.defendantAddress || '.......'} - {formData.defendantPhone || '.......'}
      </div>
      
      {formData.additionalStatement && (
        <div className="text-center mb-0.5 font-bold text-[14pt] text-slate-900" dir="rtl" style={{ unicodeBidi: 'embed' }}>
          {formData.additionalStatement}
        </div>
      )}

      <div className="text-center mb-2 font-bold border-y border-black/20 py-1" dir="rtl" style={{ unicodeBidi: 'embed' }}>رقم الدعوى: {formData.caseNumber || '......... / .........'}</div>
      <div className="text-center mb-4" dir="rtl">
        <span className="font-bold underline decoration-1 underline-offset-8 text-[16pt]" style={{ unicodeBidi: 'embed' }}>الموضوع / {formData.subject}</span>
      </div>
      
      {/* Updated Judge/Court Title Section - Back to Slash / */}
      <div className="mb-6 border-b border-black/10 pb-2" dir="rtl">
        <div className="font-bold text-right text-[15pt] mb-2" style={{ unicodeBidi: 'embed' }}>السيد/ {formData.judgeTitle}</div>
        <div className="font-bold text-center text-[15pt]">الموقر</div>
      </div>
      
      <div className="text-center font-bold mb-4 text-[13pt]" dir="rtl">بعد التحية والاحترام</div>
      
      {/* Body & Requests - Reduced spacing to look unified */}
      <div className="text-justify whitespace-pre-wrap text-[14pt] leading-[1.8] mb-4" style={{ unicodeBidi: 'isolate', direction: 'rtl' }}>
        {formData.body}
        {formData.requests && (
          <div className="mt-4" dir="rtl">
            <p className="font-bold underline decoration-1 underline-offset-4 mb-2" dir="rtl">الطلبات:</p>
            <div className="pr-6" dir="rtl" style={{ unicodeBidi: 'embed' }}>{formData.requests}</div>
          </div>
        )}
      </div>
      
      {/* Unified Conclusion - mt-8 instead of mt-auto to avoid huge gaps */}
      <div className="mt-8 border-t border-black/10 pt-4" dir="rtl">
        <div className="text-center font-bold text-[14pt] mb-4" dir="rtl">ولعدالتكم فائق الاحترام والتقدير</div>

        <div className="flex justify-between items-start mb-2 overflow-hidden" dir="rtl">
          <div className="text-right space-y-0 flex-1 float-right" style={{ width: '60%' }} dir="rtl">
              <p className="font-bold underline decoration-1 underline-offset-4 text-[12pt] mb-1" dir="rtl">الشهود:</p>
              {formData.witnesses.split(/[\n,]+/).filter(w => w.trim()).length > 0 ? (
                formData.witnesses.split(/[\n,]+/).filter(w => w.trim()).map((w, idx) => (
                  <p key={idx} className="text-[12pt] leading-relaxed" dir="rtl" style={{ unicodeBidi: 'embed' }}>{toArabicDigits(idx + 1)}. {w.trim()}</p>
                ))
              ) : (
                <p className="text-[12pt]" dir="rtl">{toArabicDigits(1)}. ....................</p>
              )}
          </div>

          <div className="text-center w-48 pt-2 float-left" style={{ width: '40%' }} dir="rtl">
              <p className="font-bold text-[12pt] mb-1" dir="rtl">
                {formData.userRole === 'محامي' ? 'عن مقدم العريضة' : 'مقدم العريضة'}
              </p>
              <p className="font-bold text-[12pt] mb-1 leading-tight truncate px-2" dir="rtl" style={{ unicodeBidi: 'embed' }}>{formData.applicantName || '....................'}</p>
              <div className="border-t border-black w-40 mx-auto opacity-50 mt-4"></div>
              <p className="text-[9pt] mt-1" dir="rtl">(التوقيع)</p>
          </div>
          <div style={{ clear: 'both' }}></div>
        </div>

        <div className="pt-4 border-t border-black/10" dir="rtl">
          <p className="font-bold underline decoration-1 underline-offset-2 text-[11pt] mb-1" dir="rtl">المستندات المرفقة:</p>
          <p className="text-[11pt] opacity-80 leading-relaxed" dir="rtl" style={{ unicodeBidi: 'embed' }}>{formData.documents || '................................'}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="fixed opacity-0 pointer-events-none -z-50" aria-hidden="true">
        <PrintableDocument id="printable-document-content" />
      </div>

      <header className="bg-white/95 backdrop-blur-lg shadow-sm py-4 md:py-6 sticky top-0 z-50 px-4 no-print border-b border-gray-100">
        <div className="container mx-auto flex flex-col items-center">
            <button onClick={goHome} className="group flex flex-col items-center transition-all duration-500 transform">
                <h1 className="text-3xl md:text-5xl font-bold text-center text-emerald-600 tracking-tighter group-hover:scale-105 transition-transform duration-500">MEELAWFIRM</h1>
                <div className="flex items-center gap-2 mt-1 overflow-hidden">
                  <span className="h-[2px] w-4 bg-blue-600/30 group-hover:w-8 transition-all duration-500"></span>
                  <span className="text-sm md:text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">محرر العرائض والطلبات</span>
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
                  placeholder="ابحث عن العريضة المطلوبة..."
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
                    <button onClick={() => handleModelSelect(PETITION_MODELS[0])} className="w-full text-center py-8 px-6 bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-all flex flex-col items-center gap-2">
                        <span className="text-2xl">📝</span> لم يتم العثور على نتيجة؟ استخدم العريضة العامة
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Main Interactive Grid */}
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
                    <button key={model.id} onClick={() => handleModelSelect(model)} className="p-6 border border-gray-100 rounded-[1.5rem] hover:bg-blue-50/50 text-right transition-all group flex justify-between items-center">
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
                  <label className={labelClass}>صفة مقدم الطلب أو العريضة</label>
                  <select className={inputClass} value={formData.userRole} onChange={e => setFormData({...formData, userRole: e.target.value as any})}>
                    <option>محامي</option>
                    <option>مقدم الطلب بنفسه</option>
                  </select>
                </div>

                <div className="hidden md:block"></div>

                <div className="md:col-span-2 bg-blue-50/30 p-6 md:p-8 rounded-[2rem] border-2 border-blue-100 space-y-6">
                  <h3 className="font-bold text-blue-800 border-b-2 border-blue-200 pb-2 flex items-center gap-2 text-xl">
                    <span className="w-2 h-8 bg-blue-600 rounded-full"></span> بيانات الطرف الأول
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
                        <label className={labelClass}>الصفة المخصصة</label>
                        <input type="text" className={inputClass} value={formData.customPartyRole} onChange={e => setFormData({...formData, customPartyRole: e.target.value})} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <label className={labelClass}>الاسم الكامل</label>
                      <input type="text" className={inputClass} value={formData.applicantName} onChange={e => setFormData({...formData, applicantName: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>العنوان</label>
                      <input type="text" className={inputClass} value={formData.applicantAddress} onChange={e => setFormData({...formData, applicantAddress: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>رقم الهاتف</label>
                      <input type="text" className={inputClass} dir="ltr" value={formData.applicantPhone} onChange={e => setFormData({...formData, applicantPhone: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 bg-red-50/30 p-6 md:p-8 rounded-[2rem] border-2 border-red-100 space-y-6">
                  <h3 className="font-bold text-red-800 border-b-2 border-red-200 pb-2 flex items-center gap-2 text-xl">
                    <span className="w-2 h-8 bg-red-600 rounded-full"></span> بيانات الطرف الثاني
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
                        <label className={labelClass}>الصفة المخصصة</label>
                        <input type="text" className={inputClass} value={formData.customSecondPartyRole} onChange={e => setFormData({...formData, customSecondPartyRole: e.target.value})} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <label className={labelClass}>اسم الخصم</label>
                      <input type="text" className={inputClass} value={formData.defendantName} onChange={e => setFormData({...formData, defendantName: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>عنوان الخصم</label>
                      <input type="text" className={inputClass} value={formData.defendantAddress} onChange={e => setFormData({...formData, defendantAddress: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>هاتف الخصم</label>
                      <input type="text" className={inputClass} dir="ltr" value={formData.defendantPhone} onChange={e => setFormData({...formData, defendantPhone: e.target.value})} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className={labelClass}>الجهة (لدى...)</label>
                  <input type="text" className={inputClass} value={formData.policeStation} onChange={e => setFormData({...formData, policeStation: e.target.value})} />
                </div>
                <div className="flex flex-col">
                  <label className={labelClass}>المسؤول (السيد / ...)</label>
                  <select className={inputClass} value={formData.judgeTitle} onChange={e => setFormData({...formData, judgeTitle: e.target.value})}>
                    {COURTS.map(c => <option key={c}>{c}</option>)}
                    {INVESTIGATION_OFFICES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className={labelClass}>بيانات إضافية (اختياري)</label>
                  <input type="text" className={inputClass} value={formData.additionalStatement} onChange={e => setFormData({...formData, additionalStatement: e.target.value})} />
                </div>
                <div className="flex flex-col">
                  <label className={labelClass}>رقم الدعوى</label>
                  <input type="text" className={inputClass} value={formData.caseNumber} onChange={e => setFormData({...formData, caseNumber: e.target.value})} />
                </div>
                <div className="flex flex-col">
                    <label className={labelClass}>الموضوع</label>
                    <input type="text" className={`${inputClass} font-bold`} value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>وقائع العريضة أو الطلب</label>
                  <textarea rows={10} className={`${inputClass} petition-font text-2xl leading-relaxed shadow-inner`} value={formData.body} onChange={e => setFormData({...formData, body: e.target.value})} />
                </div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={`${labelClass} text-blue-700`}>الطلبات الختامية</label>
                  <textarea rows={4} className={`${inputClass} petition-font text-2xl border-blue-300 shadow-inner`} value={formData.requests} onChange={e => setFormData({...formData, requests: e.target.value})} />
                </div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>الشهود</label>
                  <textarea rows={3} className={inputClass} value={formData.witnesses} onChange={e => setFormData({...formData, witnesses: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>المستندات المرفقة</label>
                  <input type="text" className={inputClass} value={formData.documents} onChange={e => setFormData({...formData, documents: e.target.value})} />
                </div>
              </div>

              {/* Main Action Buttons Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-gray-100 shadow-inner">
                <button onClick={() => setShowPreviewModal(true)} className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-slate-800 text-white py-6 rounded-3xl font-bold text-lg hover:bg-slate-900 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  <span>معاينة المستند</span>
                </button>
                <button onClick={exportToWord} className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-6 rounded-3xl font-bold text-lg hover:shadow-blue-200/50 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <span>تصدير ملف Word</span>
                </button>
                <button onClick={exportToPDF} className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-rose-600 to-pink-700 text-white py-6 rounded-3xl font-bold text-lg hover:shadow-rose-200/50 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/><path d="M9 9h6M9 13h6M9 17h6"/></svg>
                  <span>حفظ بصيغة PDF</span>
                </button>
                <button onClick={handlePrint} className="group relative overflow-hidden flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-6 rounded-3xl font-bold text-lg hover:shadow-emerald-200/50 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                  <span>طباعة العريضة</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl flex flex-col max-h-[96vh] border border-gray-200">
            <div className="p-8 flex justify-between items-center border-b no-print bg-slate-50 rounded-t-[3rem]">
              <h3 className="font-bold text-2xl text-slate-800 tracking-tight">معاينة المستند</h3>
              <div className="flex gap-3">
                <button onClick={exportToWord} title="تصدير Word" className="p-3 bg-white border border-gray-200 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-90 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </button>
                <button onClick={exportToPDF} title="تصدير PDF" className="p-3 bg-white border border-gray-200 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all active:scale-90 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/><path d="M9 9h6M9 13h6M9 17h6"/></svg>
                </button>
                <button onClick={handlePrint} title="طباعة" className="p-3 bg-white border border-gray-200 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all active:scale-90 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                </button>
                <button onClick={() => setShowPreviewModal(false)} className="p-3 bg-slate-200 text-slate-600 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-12 bg-slate-100 flex justify-center" dir="rtl">
                <PrintableDocument id="printable-document-modal" />
            </div>
            <div className="p-8 bg-white border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 no-print rounded-b-[3rem]">
               <button onClick={exportToPDF} className="group relative overflow-hidden flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-rose-600 to-pink-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-rose-200/50 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/><path d="M9 9h6M9 13h6M9 17h6"/></svg>
                  <span>تصدير PDF</span>
               </button>
               <button onClick={handlePrint} className="group relative overflow-hidden flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-emerald-200/50 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/></svg>
                  <span>الطباعة المباشرة</span>
               </button>
               <button onClick={exportToWord} className="group relative overflow-hidden flex flex-col items-center justify-center gap-1 bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-blue-200/50 transition-all shadow-xl hover:-translate-y-1 active:scale-95">
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <span>تصدير Word</span>
               </button>
               <button onClick={() => setShowPreviewModal(false)} className="group relative overflow-hidden flex flex-col items-center justify-center gap-1 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-lg hover:bg-slate-200 transition-all active:scale-95 shadow-lg">
                  <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  <span>إغلاق المعاينة</span>
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-50 text-slate-600 py-12 px-4 no-print mt-auto border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <button onClick={scrollToTop} className="text-2xl font-bold text-emerald-600 tracking-tighter hover:text-blue-600 transition-all hover:scale-105">MEELAWFIRM</button>
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
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z"/></svg>
              </a>
            </div>

            <div className="flex gap-4 text-[9px] font-bold uppercase tracking-widest text-slate-700">
              {FOOTER_LINKS.slice(1, 6).map(link => (
                <a key={link.name} href={link.url} target="_blank" className="hover:text-blue-600 transition-colors">{link.name}</a>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold border-t border-gray-200 pt-8 uppercase tracking-tighter text-slate-500">
            <span>إصدار V: 2.3.2 (Professional)</span>
            <span className="md:mr-auto"></span>
            <span>&copy; 2026 MEELAWFIRM - جميع الحقوق محفوظة</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
