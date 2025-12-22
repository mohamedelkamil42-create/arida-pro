
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Category, PetitionModel, FormData as IFormData } from './types.ts';
import { PETITION_MODELS, COURTS, INVESTIGATION_OFFICES, FOOTER_LINKS, SOCIAL_LINKS } from './constants.ts';

// --- Modern SVG Icons Components ---

const GeneralIcon = () => (
  <svg className="w-10 h-10 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

const CivilIcon = () => (
  <svg className="w-10 h-10 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16s3-2 3-5a7 7 0 1 0-14 0c0 3 3 5 3 5" />
    <path d="M5 20h14" />
    <path d="M12 9v4" />
    <path d="M10 14h4" />
  </svg>
);

const CriminalIcon = () => (
  <svg className="w-10 h-10 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const PersonalIcon = () => (
  <svg className="w-10 h-10 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M19 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// --- Social Icons Components ---

const YouTubeIcon = () => (
  <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
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
    lawyerName: '',
    partyRole: 'الشاكي',
    customPartyRole: '',
    secondPartyRole: 'المشكو ضده',
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

  const scrollToTop = () => {
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
      partyRole: model.category === Category.CRIMINAL ? 'الشاكي' : 'المدعي',
      secondPartyRole: model.category === Category.CRIMINAL ? 'المشكو ضده' : 'المدعى عليه'
    }));
    setIsEditing(true);
    setIsSearchFocused(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const exportToPDF = async () => {
    const element = document.getElementById('printable-document-content');
    if (!element) return;

    const fileName = formData.subject ? `${formData.subject}.pdf` : 'عريضة_قانونية.pdf';

    const opt = {
      margin: 0,
      filename: fileName,
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        backgroundColor: '#ffffff',
        width: 794,
        windowWidth: 794,
        scrollY: 0,
        scrollX: 0,
        x: 0,
        y: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      // @ts-ignore
      await html2pdf().set(opt).from(element).save();
    } catch (error) {
      console.error("PDF Export Error:", error);
      alert("حدث خطأ أثناء تصدير PDF. يرجى المحاولة مرة أخرى.");
    }
  };

  const exportToWord = () => {
    const content = document.getElementById('preview-inner')?.innerHTML || document.getElementById('printable-document-content')?.innerHTML;
    if (!content) return;
    const fileName = formData.subject ? `${formData.subject}.doc` : 'عريضة_قانونية.doc';
    const styles = `<style>body{font-family:'Traditional Arabic',serif;direction:rtl;text-align:right;padding:1in;line-height:1.2;}.text-center{text-align:center;}.font-bold{font-weight:bold;}.underline{text-decoration:underline;}p,div{font-size:16pt;}</style>`;
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40' lang="ar" dir="rtl"><head><meta charset='utf-8'>${styles}</head><body lang="AR-SA" dir="RTL">`;
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;
    const blob = new Blob(['\ufeff', sourceHTML], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const toArabicDigits = (num: number | string) => {
    return num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)]);
  };

  const getEffectivePartyRole = (role: string, custom: string) => role === 'أخرى' ? custom : role;

  const renderPartyDetailsLine = (name: string, role: string, address: string, phone: string) => {
    const parts = [];
    parts.push(name || '....................');
    parts.push(role);
    if (address && address.trim()) parts.push(address.trim());
    if (phone && phone.trim()) parts.push(phone.trim());
    return parts.join(' - ');
  };

  const PrintableDocument = ({ id, isPreview = false }: { id: string, isPreview?: boolean }) => {
    const effectiveRole = getEffectivePartyRole(formData.partyRole, formData.customPartyRole);
    const signatureLabel = formData.userRole === 'محامي' ? `عن ${effectiveRole}` : effectiveRole;

    return (
      <div 
        id={id} 
        className={`pdf-export-container petition-font ${isPreview ? 'shadow-2xl mx-auto' : ''}`}
      >
        <div className="pdf-content-wrapper">
          <div className="text-center font-bold text-[16pt] mb-1">لدى {formData.policeStation || '....................'}</div>
          <div className="text-center font-bold text-[16pt] mb-1">فيمابين</div>
          <div className="text-center font-bold text-[16pt] mb-1">
            {renderPartyDetailsLine(formData.applicantName, effectiveRole, formData.applicantAddress, formData.applicantPhone)}
          </div>
          <div className="text-center font-bold text-[16pt] mb-1">ضد</div>
          <div className="text-center font-bold text-[16pt] mb-2">
            {renderPartyDetailsLine(
                formData.defendantName, 
                getEffectivePartyRole(formData.secondPartyRole, formData.customSecondPartyRole), 
                formData.defendantAddress, 
                formData.defendantPhone
            )}
          </div>
          {formData.additionalStatement && (
            <div className="text-center font-bold text-[16pt] mb-1">{formData.additionalStatement}</div>
          )}
          <div className="text-center font-bold border-y border-black/40 py-1 mb-2 text-[16pt]">رقم الدعوى: {formData.caseNumber || '......... / .........'}</div>
          <div className="text-center mb-4"><span className="font-bold underline text-[16pt]">الموضوع {formData.subject}</span></div>
          <div className="mb-2 border-b border-black/10 pb-1">
            <div className="font-bold text-right text-[16pt]">السيد {formData.judgeTitle}</div>
            <div className="font-bold text-center text-[16pt]">الموقر</div>
          </div>
          <div className="text-center font-bold mb-2 text-[16pt]">بعد التحية والاحترام</div>
          <div className="text-justify whitespace-pre-wrap text-[16pt] mb-6 flex-grow" style={{ lineHeight: '1.4' }}>
            {formData.body}
            {formData.requests && (
              <div className="mt-4">
                <p className="font-bold underline mb-1">الطلبات:</p>
                <div className="pr-4">{formData.requests}</div>
              </div>
            )}
          </div>
          
          <div className="mt-auto border-t border-black/10 pt-4">
            <div className="text-center font-bold text-[16pt] mb-4">ولعدالتكم وافر الاحترام والتقدير</div>
            <div className="flex w-full mb-6">
               <div className="text-center mr-auto ml-0 min-w-[200px]">
                  <p className="font-bold text-[16pt]">{signatureLabel}</p>
                  <p className="font-bold text-[16pt] mt-1">
                    {formData.userRole === 'محامي' 
                      ? (formData.lawyerName || '....................') 
                      : (formData.applicantName || '....................')}
                  </p>
                  <div className="border-t-[1.5pt] border-black w-full mt-6 mb-1"></div>
                  <p className="text-[14pt] font-bold">التوقيع</p>
               </div>
            </div>
            <div className="mt-4 border-t border-black/10 pt-4 text-right">
              <p className="font-bold underline text-[14pt] mb-1">الشهود:</p>
              <div className="mb-4">
                {formData.witnesses.split(/[\n,]+/).filter(w => w.trim()).length > 0 ? (
                  formData.witnesses.split(/[\n,]+/).filter(w => w.trim()).map((w, idx) => (
                    <p key={idx} className="text-[14pt]">{toArabicDigits(idx + 1)}. {w.trim()}</p>
                  ))
                ) : (
                  <p className="text-[14pt]">١. ................................................................</p>
                )}
              </div>
              <p className="font-bold underline text-[14pt] mb-1">المستندات المرفقة:</p>
              <p className="text-[14pt] opacity-80">{formData.documents || '................................................................'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const inputClass = "p-4 border-2 border-slate-300 rounded-[1rem] focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium bg-white text-right";
  const labelClass = "font-bold text-slate-800 mb-1 block text-right";
  
  const partyRoleOptions = [
    'المدعي', 'المدعى عليه', 
    'الشاكي', 'المشكو ضده', 
    'مقدم الطلب', 'المقدم ضده الطلب',
    'المتهم', 'المستأنف', 'المستأنف ضده', 
    'الطاعن', 'المطعون ضده', 
    'مقدم العريضة', 'مقدم ضده العريضة', 
    'أخرى'
  ];

  const DecoratedSubtitle = ({ className = "" }) => (
    <div className={`flex items-center gap-3 ${className}`}>
        <span className="h-px w-6 md:w-12 bg-blue-300"></span>
        <p className="text-xs md:text-sm font-bold text-blue-600 whitespace-nowrap">محرر العرائض والطلبات</p>
        <span className="h-px w-6 md:w-12 bg-blue-300"></span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div style={{ position: 'absolute', right: '-10000px', top: '0', pointerEvents: 'none', zIndex: -100 }}>
        <PrintableDocument id="printable-document-content" />
      </div>

      <header className="bg-white/95 backdrop-blur-lg shadow-sm py-4 sticky top-0 z-50 px-4 no-print border-b border-gray-100">
        <div className="container mx-auto flex flex-col items-center">
            <button onClick={goHome} className="flex flex-col items-center group transition-transform hover:scale-105 active:scale-95">
                <h1 className="text-3xl md:text-5xl font-bold text-emerald-600 drop-shadow-sm group-hover:text-emerald-500 transition-colors">MEELAWFIRM</h1>
                <DecoratedSubtitle className="mt-1" />
            </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {!isEditing ? (
          <>
            <div ref={searchRef} className="max-w-3xl mx-auto mb-12 relative no-print">
              <input
                type="text"
                placeholder="ابحث عن العريضة المطلوبة... (قتل، نفقة، إخلاء...)"
                className="w-full p-6 pr-14 rounded-[2rem] border-2 border-gray-100 outline-none shadow-xl text-xl text-right focus:border-emerald-400 transition-all"
                value={searchQuery}
                onFocus={() => setIsSearchFocused(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isSearchFocused && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-[2rem] mt-4 overflow-hidden z-50 border border-gray-100">
                    {filteredModels.map(model => (
                      <button key={model.id} onClick={() => handleModelSelect(model)} className="w-full text-right px-8 py-5 hover:bg-emerald-50 flex justify-between items-center transition-all group">
                        <span className="font-bold text-gray-700 group-hover:text-emerald-700">{model.title}</span>
                        <span className="text-xs text-gray-400">{model.category}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto mb-16 no-print">
              {[
                { id: Category.GENERAL, title: 'المحرر العام', icon: <GeneralIcon />, gradient: 'from-indigo-600 to-indigo-700' },
                { id: Category.CIVIL, title: 'العرائض المدنية', icon: <CivilIcon />, gradient: 'from-emerald-600 to-emerald-700' },
                { id: Category.CRIMINAL, title: 'العرائض الجنائية', icon: <CriminalIcon />, gradient: 'from-slate-700 to-slate-800' },
                { id: Category.PERSONAL_STATUS, title: 'أحوال شخصية', icon: <PersonalIcon />, gradient: 'from-rose-600 to-rose-700' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id as Category)}
                  className={`group relative bg-gradient-to-br ${item.gradient} text-white p-2 md:p-10 rounded-[2rem] shadow-lg hover:-translate-y-1 transition-all flex flex-col items-center justify-center text-center aspect-square w-full`}
                >
                  <div className="mb-2">{item.icon}</div>
                  <span className="text-sm md:text-2xl font-bold leading-tight px-1 break-words max-w-full">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            {activeCategory && activeCategory !== Category.GENERAL && (
              <div className="max-w-5xl mx-auto bg-white rounded-[2rem] p-8 shadow-2xl border border-gray-100 no-print animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <h2 className="text-xl md:text-2xl font-bold">اختر نوع العريضة ({activeCategory})</h2>
                  <button onClick={() => setActiveCategory(null)} className="text-red-500 font-bold hover:scale-110 transition-transform">إغلاق ×</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {PETITION_MODELS.filter(m => m.category === activeCategory).map(model => (
                    <button key={model.id} onClick={() => handleModelSelect(model)} className="p-4 border border-gray-100 rounded-xl hover:bg-emerald-50 text-right transition-all font-bold text-gray-700 hover:text-emerald-700">
                      {model.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-6xl mx-auto space-y-8 no-print">
            <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border-t-8 border-t-emerald-600">
              <button onClick={goHome} className="mb-6 text-emerald-600 font-bold hover:translate-x-1 transition-transform">&larr; العودة للأنواع</button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className={labelClass}>صفة المحرر (محامي أم مقدم طلب)</label>
                  <select className={inputClass} value={formData.userRole} onChange={e => setFormData({...formData, userRole: e.target.value as any})}>
                    <option value="محامي">محامي</option>
                    <option value="مقدم الطلب بنفسه">مقدم الطلب بنفسه</option>
                  </select>
                </div>
                
                {formData.userRole === 'محامي' ? (
                  <div className="flex flex-col animate-in slide-in-from-top-4 duration-300">
                    <label className={labelClass}>اسم المحامي</label>
                    <input 
                      type="text" 
                      className={inputClass} 
                      placeholder="أدخل اسم المحامي بالكامل"
                      value={formData.lawyerName} 
                      onChange={e => setFormData({...formData, lawyerName: e.target.value})} 
                    />
                  </div>
                ) : <div className="hidden md:block"></div>}

                {/* القسم الأول: مقدم الطلب / العريضة */}
                <div className="md:col-span-2 bg-emerald-50/30 p-6 rounded-[2rem] border border-emerald-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <label className={labelClass}>الاسم الكامل</label>
                      <input type="text" className={inputClass} value={formData.applicantName} onChange={e => setFormData({...formData, applicantName: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>الصفة</label>
                      <select className={inputClass} value={formData.partyRole} onChange={e => setFormData({...formData, partyRole: e.target.value})}>
                        {partyRoleOptions.map(o => <option key={o}>{o}</option>)}
                      </select>
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

                {/* القسم الثاني: المقدم ضده الطلب / العريضة */}
                <div className="md:col-span-2 bg-red-50/30 p-6 rounded-[2rem] border border-red-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <label className={labelClass}>اسم الخصم</label>
                      <input type="text" className={inputClass} value={formData.defendantName} onChange={e => setFormData({...formData, defendantName: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>الصفة</label>
                      <select className={inputClass} value={formData.secondPartyRole} onChange={e => setFormData({...formData, secondPartyRole: e.target.value})}>
                        {partyRoleOptions.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>العنوان</label>
                      <input type="text" className={inputClass} value={formData.defendantAddress} onChange={e => setFormData({...formData, defendantAddress: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>الهاتف</label>
                      <input type="text" className={inputClass} dir="ltr" value={formData.defendantPhone} onChange={e => setFormData({...formData, defendantPhone: e.target.value})} />
                    </div>
                </div>

                {/* حقل البيان الإضافي الجديد */}
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>بيان إضافي (يظهر بعد أسماء الأطراف)</label>
                  <input 
                    type="text" 
                    className={inputClass} 
                    placeholder="مثلاً: بصفته ولياً عن القاصر، أو أي تفاصيل إضافية للأطراف"
                    value={formData.additionalStatement} 
                    onChange={e => setFormData({...formData, additionalStatement: e.target.value})} 
                  />
                </div>

                <div className="flex flex-col">
                  <label className={labelClass}>الجهة (لدى...)</label>
                  <input 
                    type="text" 
                    className={inputClass} 
                    placeholder="مثلاً: محكمة، نيابة، قسم شرطة"
                    value={formData.policeStation} 
                    onChange={e => setFormData({...formData, policeStation: e.target.value})} 
                  />
                </div>
                <div className="flex flex-col"><label className={labelClass}>المسؤول</label><select className={inputClass} value={formData.judgeTitle} onChange={e => setFormData({...formData, judgeTitle: e.target.value})}>{COURTS.concat(INVESTIGATION_OFFICES).map(c => <option key={c}>{c}</option>)}</select></div>
                <div className="flex flex-col"><label className={labelClass}>رقم الدعوى</label><input type="text" className={inputClass} value={formData.caseNumber} onChange={e => setFormData({...formData, caseNumber: e.target.value})} /></div>
                <div className="flex flex-col"><label className={labelClass}>الموضوع</label><input type="text" className={`${inputClass} font-bold`} value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} /></div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>وقائع العريضة</label>
                  <textarea rows={8} className={`${inputClass} text-xl leading-relaxed`} value={formData.body} onChange={e => setFormData({...formData, body: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>الطلبات</label>
                  <textarea rows={3} className={inputClass} value={formData.requests} onChange={e => setFormData({...formData, requests: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex flex-col"><label className={labelClass}>الشهود</label><textarea rows={2} className={inputClass} value={formData.witnesses} onChange={e => setFormData({...formData, witnesses: e.target.value})} /></div>
                <div className="md:col-span-2 flex flex-col"><label className={labelClass}>المستندات</label><input type="text" className={inputClass} value={formData.documents} onChange={e => setFormData({...formData, documents: e.target.value})} /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                <button onClick={() => setShowPreviewModal(true)} className="p-5 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 shadow-lg active:scale-95 transition-all">معاينة المستند</button>
                <button onClick={exportToWord} className="p-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 shadow-lg active:scale-95 transition-all">تصدير Word</button>
                <button onClick={exportToPDF} className="p-5 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-500 shadow-lg active:scale-95 transition-all">حفظ PDF</button>
                <button onClick={handlePrint} className="p-5 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 shadow-lg active:scale-95 transition-all">طباعة فورية</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-[2rem] shadow-2xl flex flex-col max-h-[98vh]">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b bg-slate-50 rounded-t-[2rem] gap-4">
              <span className="font-bold text-lg text-emerald-800">معاينة التنسيق (A4)</span>
              <div className="flex flex-wrap gap-2 justify-center">
                <button onClick={exportToPDF} className="p-2 bg-rose-600 text-white rounded-lg text-sm px-4 hover:bg-rose-700 transition-colors font-bold">حفظ PDF</button>
                <button onClick={exportToWord} className="p-2 bg-blue-600 text-white rounded-lg text-sm px-4 hover:bg-blue-700 transition-colors font-bold">Word</button>
                <button onClick={handlePrint} className="p-2 bg-emerald-600 text-white rounded-lg text-sm px-4 hover:bg-emerald-700 transition-colors font-bold">طباعة</button>
                <button onClick={() => setShowPreviewModal(false)} className="p-2 bg-gray-200 text-gray-700 rounded-lg text-sm px-4 hover:bg-gray-300 transition-colors">إغلاق ×</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-12 bg-gray-300 flex justify-center">
              <div className="scale-[0.45] min-[400px]:scale-[0.55] sm:scale-[0.75] md:scale-[0.85] lg:scale-100 origin-top">
                <PrintableDocument id="preview-inner" isPreview={true} />
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="bg-slate-50 py-16 px-4 no-print border-t border-slate-200 mt-auto text-slate-800">
        <div className="container mx-auto max-w-6xl text-center flex flex-col items-center">
          
          <button onClick={scrollToTop} className="group transition-transform hover:-translate-y-1 active:scale-95 mb-4">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-600 group-hover:text-emerald-500 transition-colors">MEELAWFIRM</h2>
          </button>

          <div className="flex justify-center items-center gap-4 md:gap-6 mb-10 flex-wrap">
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" 
              className="group p-4 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-red-500/20 transition-all duration-300">
               <YouTubeIcon />
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" 
              className="group p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-blue-500/20 transition-all duration-300">
               <FacebookIcon />
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" 
              className="group p-4 bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-slate-500/20 transition-all duration-300">
               <TikTokIcon />
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} 
              className="group p-4 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-emerald-500/20 transition-all duration-300">
               <EmailIcon />
            </a>
          </div>

          <DecoratedSubtitle className="mb-8" />
          
          <div className="flex justify-center gap-4 md:gap-8 text-[12px] md:text-[14px] text-slate-500 font-bold mb-10 flex-wrap max-w-2xl">
            {FOOTER_LINKS.map(l => (
              <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-600 transition-colors border-b border-transparent hover:border-emerald-600 pb-1">
                {l.name}
              </a>
            ))}
          </div>

          <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-8 opacity-50"></div>
          
          <p className="text-[11px] text-slate-400 font-bold tracking-widest uppercase">&copy; 2026 MEELAWFIRM - PROFESSIONAL LEGAL PWA V3.8.6</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
