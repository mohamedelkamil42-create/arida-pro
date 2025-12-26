import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Category, PetitionModel, PetitionFormData, SavedPetition } from './types.ts';
import { PETITION_MODELS, COURTS, INVESTIGATION_OFFICES, REGISTRARS, FOOTER_LINKS, SOCIAL_LINKS } from './constants.ts';

// Declare html2pdf globally to ensure type safety and stability
declare var html2pdf: any;

// Define initial state constant for stability and clean resets
const INITIAL_FORM_DATA: PetitionFormData = {
  userRole: 'محامي',
  lawyerName: '',
  partyRole: 'مقدم الطلب',
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
  judgeTitle: 'ملء يدوي',
  customJudgeTitle: '',
  caseNumber: '',
  subject: '',
  body: '',
  requests: '',
  fees: '',
  witnesses: '',
  documents: '',
  extraDetails: '',
  additionalStatement: ''
};

// --- Modern SVG Icons Components ---

const GeneralIcon = () => (
  <svg className="w-14 h-14 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <path d="M14 2v6h6" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
    <path d="M10 9H8" />
  </svg>
);

const CivilIcon = () => (
  <svg className="w-14 h-14 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 16s3-2 3-5a7 7 0 1 0-14 0c0 3 3 5 3 5" />
    <path d="M5 20h14" />
    <path d="M12 9v4" />
    <path d="M10 14h4" />
  </svg>
);

const CriminalIcon = () => (
  <svg className="w-14 h-14 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const PersonalIcon = () => (
  <svg className="w-14 h-14 md:w-16 md:h-16 transition-transform duration-500 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21v-2a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M19 21v-2a4 4 0 0 0-3-3.87" />
  </svg>
);

// --- Action Icons for Buttons ---

const SearchIcon = () => (
  <svg className="w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const PreviewIcon = () => (
  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const WordIcon = () => (
  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 13v4" />
    <path d="M12 13v4" />
    <path d="M15 13v4" />
  </svg>
);

const PDFIcon = () => (
  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M12 18v-6" />
    <path d="m9 15 3 3 3-3" />
  </svg>
);

const PrintIcon = () => (
  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const HistoryIcon = () => (
  <svg className="w-6 h-6 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// --- Social Icons ---

const YouTubeIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.11 1 12 1 12s0 3.89.46 5.58a2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.89 23 12 23 12s0-3.89-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" />
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
  const [triggerPulse, setTriggerPulse] = useState(0);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [savedPetitions, setSavedPetitions] = useState<SavedPetition[]>([]);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const categoryListRef = useRef<HTMLDivElement>(null);

  // Initialize with the safe constant
  const [formData, setFormData] = useState<PetitionFormData>(INITIAL_FORM_DATA);

  // Load saved petitions on component mount
  useEffect(() => {
    const stored = localStorage.getItem('meelawfirm_saved_v1');
    if (stored) {
      try {
        setSavedPetitions(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse saved petitions", e);
      }
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('meelawfirm_saved_v1', JSON.stringify(savedPetitions));
  }, [savedPetitions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeCategory && categoryListRef.current) {
        categoryListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeCategory]);

  const goHome = () => {
    setIsEditing(false);
    setSelectedModel(null);
    setActiveCategory(null);
    setSearchQuery('');
    setTriggerPulse(prev => prev + 1);
    // Reset to initial clean state
    setFormData(INITIAL_FORM_DATA);
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
      fees: '',
      partyRole: model.category === Category.CRIMINAL ? 'الشاكي' : 'المدعي',
      secondPartyRole: model.category === Category.CRIMINAL ? 'المشكو ضده' : 'المدعى عليه'
    }));
    setIsEditing(true);
    setIsSearchFocused(false);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveToLibrary = () => {
    const newPetition: SavedPetition = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      data: { ...formData }
    };
    setSavedPetitions(prev => [newPetition, ...prev]);
    alert("تم حفظ العريضة بنجاح في مكتبتك.");
  };

  const handleLoadSaved = (petition: SavedPetition) => {
    // Stability Fix: Merge with INITIAL_FORM_DATA to ensure all fields exist 
    // even if the saved petition is from an older version of the schema
    setFormData({
      ...INITIAL_FORM_DATA,
      ...petition.data
    });
    setIsEditing(true);
    setIsHistoryOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSaved = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("سيتم حذف هذه العريضة نهائياً من مكتبتك. هل أنت متأكد؟")) {
      setSavedPetitions(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleEditSaved = (e: React.MouseEvent, petition: SavedPetition) => {
    e.preventDefault();
    e.stopPropagation();
    handleLoadSaved(petition);
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
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff', width: 794, windowWidth: 794, scrollY: 0, scrollX: 0, x: 0, y: 0 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    try {
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

  const getEffectivePartyRole = (role: string, custom: string) => role === 'ملء يدوي' ? custom : role;

  const renderPartyDetailsLine = (name: string, role: string, address: string, phone: string) => {
    const parts = [];
    parts.push(name);
    parts.push(role);
    if (address && address.trim()) parts.push(address.trim());
    if (phone && phone.trim()) parts.push(phone.trim());
    return parts.join(' - ');
  };

  const PrintableDocument = ({ id, isPreview = false }: { id: string, isPreview?: boolean }) => {
    const effectiveRole = getEffectivePartyRole(formData.partyRole, formData.customPartyRole);
    const defendantRole = getEffectivePartyRole(formData.secondPartyRole, formData.customSecondPartyRole);
    
    // منطق "صفة الموقع"
    const hasSpecificRole = effectiveRole && effectiveRole.trim() !== '';
    let signatureLabel = '';
    if (formData.userRole === 'محامي') {
        signatureLabel = hasSpecificRole ? `عن ${effectiveRole}` : 'عن مقدم الطلب';
    } else {
        signatureLabel = hasSpecificRole ? effectiveRole : 'مقدم الطلب';
    }
    
    const displayJudgeTitle = formData.judgeTitle === 'ملء يدوي' ? formData.customJudgeTitle : formData.judgeTitle;

    return (
      <div id={id} className={`pdf-export-container petition-font ${isPreview ? 'shadow-2xl mx-auto' : ''}`}>
        <div className="pdf-content-wrapper">
          <div className="text-center font-bold text-[16pt] mb-1">لدى {formData.policeStation || '....................'}</div>
          
          {formData.applicantName && (
            <>
              {/* تظهر "فيمابين" فقط إذا كان هناك خصم مذكور */}
              {formData.defendantName && (
                <div className="text-center font-bold text-[16pt] mb-1">فيمابين</div>
              )}
              <div className="text-center font-bold text-[16pt] mb-1">
                {renderPartyDetailsLine(formData.applicantName, effectiveRole || 'مقدم الطلب', formData.applicantAddress, formData.applicantPhone)}
              </div>
            </>
          )}

          {formData.defendantName && (
            <>
              {/* تظهر "ضد" فقط إذا تم ملء اسم الخصم */}
              <div className="text-center font-bold text-[16pt] mb-1">ضد</div>
              <div className="text-center font-bold text-[16pt] mb-2">
                {renderPartyDetailsLine(formData.defendantName, defendantRole || 'المشار إليه', formData.defendantAddress, formData.defendantPhone)}
              </div>
            </>
          )}

          {formData.additionalStatement && (
            <div className="text-center font-bold text-[16pt] mb-1">{formData.additionalStatement}</div>
          )}

          {formData.caseNumber && (
            <div className="text-center font-bold border-y border-black/40 py-1 mb-2 text-[16pt]">رقم الدعوى: {formData.caseNumber}</div>
          )}

          <div className="text-center mb-4"><span className="font-bold underline text-[16pt]">الموضوع {formData.subject}</span></div>
          <div className="mb-2 border-b border-black/10 pb-1">
            <div className="font-bold text-right text-[16pt]">السيد {displayJudgeTitle || '....................'}</div>
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
            {formData.fees && (
              <div className="mt-4 text-center">
                <p className="font-bold underline mb-1">الرسوم والأتعاب:</p>
                <div className="font-bold">{formData.fees}</div>
              </div>
            )}
          </div>
          
          <div className="mt-auto border-t border-black/10 pt-4">
            <div className="text-center font-bold text-[16pt] mb-4">ولعدالتكم وافر الاحترام والتقدير</div>
            <div className="flex w-full mb-6">
               <div className="text-center mr-auto ml-0 min-w-[200px]">
                  <p className="font-bold text-[16pt]">{signatureLabel}</p>
                  <p className="font-bold text-[16pt] mt-1">
                    {formData.userRole === 'محامي' ? (formData.lawyerName || '....................') : (formData.applicantName || '....................')}
                  </p>
                  <div className="border-t-[1.5pt] border-black w-full mt-6 mb-1"></div>
                  <p className="text-[14pt] font-bold">التوقيع</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const inputClass = "p-4 border-2 border-slate-300 rounded-[1rem] focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400 font-medium bg-white text-right";
  const labelClass = "font-bold text-slate-800 mb-1 block text-right";
  // تحديث خيارات الصفة: مقدم الطلب أولاً، وملء يدوي أخيراً
  const partyRoleOptions = ['مقدم الطلب', 'المدعي', 'المدعى عليه', 'الشاكي', 'المشكو ضده', 'المقدم ضده الطلب', 'المتهم', 'المستأنف', 'المستأنف ضده', 'الطاعن', 'المطعون ضده', 'مقدم العريضة', 'المقدم ضده العريضة', 'ملء يدوي'];

  const DecoratedSubtitle = ({ className = "" }) => {
    return (
      <div className={`flex items-center gap-2 md:gap-5 ${className}`}>
          <span className="h-px w-4 md:w-16 bg-blue-300"></span>
          <p className="text-sm md:text-2xl font-bold text-blue-600 whitespace-nowrap py-2">
            محرر العرائض والطلبات
          </p>
          <span className="h-px w-4 md:w-16 bg-blue-300"></span>
      </div>
    );
  };

  const ColorfulText = ({ text }: { text: string }) => {
    const words = text.split(' ');
    const colors = ['text-blue-600', 'text-emerald-600', 'text-indigo-600', 'text-rose-600', 'text-slate-700', 'text-amber-600', 'text-teal-600', 'text-violet-600', 'text-cyan-600', 'text-fuchsia-600', 'text-sky-600'];
    return (
        <p className="text-sm md:text-2xl font-bold leading-relaxed md:leading-loose cursor-default flex flex-wrap justify-center gap-x-2">
            {words.map((word, i) => (
                <span key={i} className={`${colors[i % colors.length]} hover:scale-110 hover:brightness-125 transition-all duration-300 interactive-legal-text`}>
                    {word}
                </span>
            ))}
        </p>
    );
  };

  const categories = [
    { id: Category.GENERAL, title: 'المحرر العام', icon: <GeneralIcon />, gradient: 'from-blue-600 to-blue-700' },
    { id: Category.CIVIL, title: 'العرائض المدنية', icon: <CivilIcon />, gradient: 'from-emerald-600 to-emerald-700' },
    { id: Category.CRIMINAL, title: 'العرائض الجنائية', icon: <CriminalIcon />, gradient: 'from-rose-600 to-rose-700' },
    { id: Category.PERSONAL_STATUS, title: 'أحوال شخصية', icon: <PersonalIcon />, gradient: 'from-slate-800 to-black' }
  ];

  const combinedOfficials = useMemo(() => {
    return ['ملء يدوي', ...COURTS, ...INVESTIGATION_OFFICES, ...REGISTRARS];
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div style={{ position: 'absolute', right: '-10000px', top: '0', pointerEvents: 'none', zIndex: -100 }}>
        <PrintableDocument id="printable-document-content" />
      </div>

      <header className="bg-white/95 backdrop-blur-lg py-4 md:py-6 sticky top-0 z-50 px-4 no-print border-b border-gray-100">
        <div className="container mx-auto flex flex-col items-center">
            <button onClick={goHome} className="flex flex-col items-center group transition-transform hover:scale-105 active:scale-95">
                <h1 className="text-4xl md:text-5xl font-black text-emerald-600 drop-shadow-sm group-hover:text-emerald-500 transition-colors tracking-tight">MEELAWFIRM</h1>
                <DecoratedSubtitle className="mt-2 md:mt-3" />
            </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-3 md:py-6">
        {!isEditing ? (
          <div className="flex flex-col gap-4 md:gap-8">
            <div className="max-w-4xl mx-auto text-center px-4 animate-in fade-in slide-in-from-top-4 duration-1000">
               <ColorfulText text="لكتابة العرائض والطلبات والاستئنافات والطعون بسهولة، عبر البحث أو اختيار نوع العريضة، مع محرر عام للنماذج غير المتوفرة" />
            </div>

            <div ref={searchRef} className="max-w-3xl mx-auto w-full relative no-print z-40">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن العريضة المطلوبة... (مثال: دعوى إخلاء، مطالبة مالية، نفقة)"
                  className="w-full p-4 md:p-6 pr-12 md:pr-14 rounded-[1.5rem] md:rounded-[2rem] border-2 border-gray-100 outline-none shadow-xl text-lg md:text-xl text-right focus:border-blue-400 transition-all focus:ring-4 focus:ring-blue-50"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-slate-400">
                  <SearchIcon />
                </div>
              </div>
              {isSearchFocused && searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-2xl rounded-[1.5rem] md:rounded-[2rem] mt-2 overflow-hidden z-50 border border-gray-100 animate-in zoom-in-95 duration-200">
                    {filteredModels.length > 0 ? (
                        filteredModels.map(model => (
                          <button key={model.id} onClick={() => handleModelSelect(model)} className="w-full text-right px-6 md:px-8 py-4 md:py-5 hover:bg-blue-50 flex justify-between items-center transition-all group border-b border-gray-50 last:border-none">
                            <span className="font-bold text-gray-700 group-hover:text-blue-700">{model.title}</span>
                            <span className="text-[10px] md:text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{model.category}</span>
                          </button>
                        ))
                    ) : (
                        <div className="p-8 text-center flex flex-col items-center gap-4">
                            <p className="text-gray-500 font-bold">عذراً، لم نجد نتائج تطابق بحثك.</p>
                            <button 
                                onClick={() => handleModelSelect(PETITION_MODELS[0])}
                                className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
                            >
                                استخدم النموذج العام (محرر شامل)
                            </button>
                        </div>
                    )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto w-full no-print px-1">
              {categories.map((item, idx) => (
                <div key={`${item.id}-${triggerPulse}`} className="entrance-wrapper" style={{ animationDelay: `${idx * 0.15}s` }}>
                  <button
                    onClick={() => handleCategoryClick(item.id as Category)}
                    className={`category-button group overflow-hidden relative bg-gradient-to-br ${item.gradient} text-white p-8 md:p-10 rounded-[1.5rem] md:rounded-[2rem] shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center justify-center text-center aspect-square w-full active:scale-95`}
                  >
                    <div className="shine-overlay"></div>
                    <div className="mb-6 md:mb-6 z-10">{item.icon}</div>
                    <span className="text-2xl md:text-2xl font-bold leading-tight px-1 z-10">
                      {item.title}
                    </span>
                    {/* تأثير التوهج الساكن */}
                    <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] bg-white opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
                  </button>
                </div>
              ))}
            </div>

            {/* --- Saved Petitions Section --- */}
            <div className="max-w-6xl mx-auto w-full no-print mt-2">
               <button 
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="w-full bg-slate-50 hover:bg-slate-100 p-4 md:p-6 rounded-[1.5rem] border-2 border-slate-200 flex items-center justify-between transition-all group"
               >
                  <div className="flex items-center">
                    <HistoryIcon />
                    <span className="text-lg md:text-xl font-bold text-slate-800">عرائضي المحفوظة ({savedPetitions.length})</span>
                  </div>
                  <span className={`text-2xl transition-transform duration-300 ${isHistoryOpen ? 'rotate-180' : ''}`}>▼</span>
               </button>

               {isHistoryOpen && (
                 <div className="bg-white border-x-2 border-b-2 border-slate-100 rounded-b-[1.5rem] p-4 md:p-8 shadow-inner animate-in slide-in-from-top-4 duration-300">
                    {savedPetitions.length === 0 ? (
                      <p className="text-center text-slate-400 font-bold py-8">لا توجد عرائض محفوظة حالياً.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedPetitions.map(petition => (
                          <div 
                            key={petition.id} 
                            onClick={() => handleLoadSaved(petition)}
                            className="p-5 border-2 border-slate-50 rounded-2xl hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all group relative flex flex-col justify-between h-44 shadow-sm"
                          >
                             <div>
                               <h3 className="font-bold text-slate-800 group-hover:text-blue-700 leading-snug mb-1 line-clamp-2">{petition.data.subject || 'بدون عنوان'}</h3>
                               <p className="text-[10px] text-slate-400 font-bold">{new Date(petition.timestamp).toLocaleString('ar-EG')}</p>
                             </div>
                             <div className="flex justify-between items-center mt-4">
                               <span className="text-[9px] bg-slate-100 px-2 py-1 rounded-full font-bold text-slate-500 uppercase">{petition.data.partyRole}</span>
                               <div className="flex gap-2">
                                 <button 
                                  onClick={(e) => handleEditSaved(e, petition)}
                                  className="p-2 hover:bg-blue-100 rounded-full transition-all text-blue-600"
                                  title="تعديل"
                                 >
                                  <EditIcon />
                                 </button>
                                 <button 
                                  onClick={(e) => handleDeleteSaved(e, petition.id)}
                                  className="p-2 hover:bg-red-50 rounded-full transition-all text-red-500"
                                  title="حذف نهائي"
                                 >
                                  <TrashIcon />
                                 </button>
                               </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}
                 </div>
               )}
            </div>

            {activeCategory && activeCategory !== Category.GENERAL && (
              <div ref={categoryListRef} className="max-w-5xl mx-auto w-full bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-2xl border border-blue-50 no-print animate-in slide-in-from-bottom-8 fade-in duration-500">
                <div className="flex justify-between items-center mb-6 md:mb-8 border-b border-gray-100 pb-4 md:pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-8 bg-blue-500 rounded-full"></div>
                    <h2 className="text-lg md:text-3xl font-bold text-slate-800">قائمة {activeCategory}</h2>
                  </div>
                  <button onClick={() => setActiveCategory(null)} className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xl font-bold"> × </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {PETITION_MODELS.filter(m => m.category === activeCategory).map(model => (
                    <button key={model.id} onClick={() => handleModelSelect(model)} className="p-4 md:p-5 border border-gray-100 rounded-2xl hover:bg-blue-50 text-right transition-all group flex items-start gap-3 hover:border-blue-200">
                      <div className="w-2 h-2 rounded-full bg-blue-200 group-hover:bg-blue-500 mt-2 transition-colors"></div>
                      <span className="font-bold text-sm md:text-lg text-gray-700 group-hover:text-blue-700 leading-snug">{model.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-6 md:space-y-8 no-print animate-in fade-in duration-500">
            <div className="bg-white p-5 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl border-t-8 border-t-blue-600">
              <div className="flex justify-between items-center mb-6">
                <button onClick={goHome} className="flex items-center gap-2 text-blue-600 font-bold hover:translate-x-1 transition-transform">
                  <span>&rarr;</span> <span>العودة للرئيسية</span>
                </button>
                <button onClick={handleSaveToLibrary} className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full font-bold hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100">
                  <SaveIcon /> <span>حفظ في مكتبتي</span>
                </button>
              </div>
              
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
                    <input type="text" className={inputClass} placeholder="مثال: الاسم بالكامل" value={formData.lawyerName} onChange={e => setFormData({...formData, lawyerName: e.target.value})} />
                  </div>
                ) : <div className="hidden md:block"></div>}

                <div className="md:col-span-2 bg-blue-50/20 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-blue-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <label className={labelClass}>اسم مقدم الطلب</label>
                      <input type="text" className={inputClass} placeholder="مثال: الاسم الرباعي هنا" value={formData.applicantName} onChange={e => setFormData({...formData, applicantName: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>الصفة</label>
                      <select className={inputClass} value={formData.partyRole} onChange={e => setFormData({...formData, partyRole: e.target.value})}>
                        {partyRoleOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {formData.partyRole === 'ملء يدوي' && (
                        <input 
                          type="text" 
                          className={`${inputClass} mt-2 border-blue-400 animate-in slide-in-from-top-2`} 
                          placeholder="اكتب الصفة هنا..." 
                          value={formData.customPartyRole} 
                          onChange={e => setFormData({...formData, customPartyRole: e.target.value})} 
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>عنوان مقدم الطلب</label>
                      <input type="text" className={inputClass} placeholder="مثال: المدينة - الحي - الرقم" value={formData.applicantAddress} onChange={e => setFormData({...formData, applicantAddress: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>هاتف مقدم الطلب</label>
                      <input type="text" className={inputClass} dir="ltr" placeholder="0000000000" value={formData.applicantPhone} onChange={e => setFormData({...formData, applicantPhone: e.target.value})} />
                    </div>
                </div>

                <div className="md:col-span-2 bg-red-50/20 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-red-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex flex-col">
                      <label className={labelClass}>اسم الخصم</label>
                      <input type="text" className={inputClass} placeholder="مثال: اسم الخصم أو الشركة" value={formData.defendantName} onChange={e => setFormData({...formData, defendantName: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>صفة الخصم</label>
                      <select className={inputClass} value={formData.secondPartyRole} onChange={e => setFormData({...formData, secondPartyRole: e.target.value})}>
                        {partyRoleOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      {formData.secondPartyRole === 'ملء يدوي' && (
                        <input 
                          type="text" 
                          className={`${inputClass} mt-2 border-blue-400 animate-in slide-in-from-top-2`} 
                          placeholder="اكتب صفة الخصم هنا..." 
                          value={formData.customSecondPartyRole} 
                          onChange={e => setFormData({...formData, customSecondPartyRole: e.target.value})} 
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>عنوان الخصم</label>
                      <input type="text" className={inputClass} placeholder="مثال: العنوان بالتفصيل" value={formData.defendantAddress} onChange={e => setFormData({...formData, defendantAddress: e.target.value})} />
                    </div>
                    <div className="flex flex-col">
                      <label className={labelClass}>هاتف الخصم</label>
                      <input type="text" className={inputClass} dir="ltr" placeholder="0000000000" value={formData.defendantPhone} onChange={e => setFormData({...formData, defendantPhone: e.target.value})} />
                    </div>
                </div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>بيان إضافي (يظهر بعد أسماء الأطراف)</label>
                  <input type="text" className={inputClass} placeholder="مثال: اسم المتحري أو رقم استئناف" value={formData.additionalStatement} onChange={e => setFormData({...formData, additionalStatement: e.target.value})} />
                </div>

                <div className="flex flex-col">
                  <label className={labelClass}>الجهة (لدى...)</label>
                  <input type="text" className={inputClass} placeholder="مثال: اسم المحكمة أو النيابة أو القسم" value={formData.policeStation} onChange={e => setFormData({...formData, policeStation: e.target.value})} />
                </div>
                <div className="flex flex-col">
                  <label className={labelClass}>المسؤول</label>
                  <select 
                    className={inputClass} 
                    value={formData.judgeTitle} 
                    onChange={e => setFormData({...formData, judgeTitle: e.target.value})}
                  >
                    {combinedOfficials.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {formData.judgeTitle === 'ملء يدوي' && (
                    <input 
                      type="text" 
                      className={`${inputClass} mt-2 border-blue-400 animate-in slide-in-from-top-2`} 
                      placeholder="اكتب مسمى المسؤول هنا..." 
                      value={formData.customJudgeTitle} 
                      onChange={e => setFormData({...formData, customJudgeTitle: e.target.value})} 
                    />
                  )}
                </div>
                <div className="flex flex-col"><label className={labelClass}>رقم الدعوى</label><input type="text" className={inputClass} placeholder="مثال: 000 / 0000" value={formData.caseNumber} onChange={e => setFormData({...formData, caseNumber: e.target.value})} /></div>
                <div className="flex flex-col"><label className={labelClass}>الموضوع</label><input type="text" className={`${inputClass} font-bold`} placeholder="مثال: موضوع الدعوى باختصار" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} /></div>

                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>وقائع العريضة</label>
                  <textarea rows={8} className={`${inputClass} text-xl leading-relaxed`} placeholder="اكتب وقائع وتفاصيل العريضة هنا..." value={formData.body} onChange={e => setFormData({...formData, body: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>الطلبات</label>
                  <textarea rows={3} className={inputClass} placeholder="مثال: نلتمس إلزام المدعى عليه بسداد المبلغ المذكور..." value={formData.requests} onChange={e => setFormData({...formData, requests: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex flex-col">
                  <label className={labelClass}>الرسوم والأتعاب</label>
                  <input type="text" className={inputClass} placeholder="رسوم المحاماة الاتفاقية مبلغ كذا ولأجل الرسوم تقدر قيمة الدعوى بكذا" value={formData.fees} onChange={e => setFormData({...formData, fees: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex flex-col"><label className={labelClass}>الشهود</label><textarea rows={2} className={inputClass} placeholder="مثال: الشاهد الأول (000) - الشاهد الثاني (000)" value={formData.witnesses} onChange={e => setFormData({...formData, witnesses: e.target.value})} /></div>
                <div className="md:col-span-2 flex flex-col"><label className={labelClass}>المستندات</label><input type="text" className={inputClass} placeholder="مثال: صورة عقد البيع، توكيل رسمي" value={formData.documents} onChange={e => setFormData({...formData, documents: e.target.value})} /></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                <button onClick={() => setShowPreviewModal(true)} className="p-4 md:p-5 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 shadow-lg active:scale-95 transition-all flex items-center justify-center">
                  <PreviewIcon /> معاينة المستند
                </button>
                <button onClick={exportToWord} className="p-4 md:p-5 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-500 shadow-lg active:scale-95 transition-all flex items-center justify-center">
                  <WordIcon /> تصدير Word
                </button>
                <button onClick={exportToPDF} className="p-4 md:p-5 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-500 shadow-lg active:scale-95 transition-all flex items-center justify-center">
                  <PDFIcon /> حفظ PDF
                </button>
                <button onClick={handlePrint} className="p-4 md:p-5 bg-blue-700 text-white rounded-2xl font-bold hover:bg-blue-800 shadow-lg active:scale-95 transition-all flex items-center justify-center">
                  <PrintIcon /> طباعة فورية
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {showPreviewModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-5xl rounded-[1.5rem] md:rounded-[2rem] shadow-2xl flex flex-col max-h-[98vh]">
            <div className="p-4 flex flex-col sm:flex-row justify-between items-center border-b bg-slate-50 rounded-t-[1.5rem] md:rounded-t-[2rem] gap-4">
              <span className="font-bold text-lg text-blue-800">معاينة التنسيق (A4)</span>
              <div className="flex flex-wrap gap-2 justify-center">
                <button onClick={exportToPDF} className="p-2 bg-rose-600 text-white rounded-lg text-sm px-4 hover:bg-rose-700 transition-colors font-bold">حفظ PDF</button>
                <button onClick={exportToWord} className="p-2 bg-blue-600 text-white rounded-lg text-sm px-4 hover:bg-blue-700 transition-colors font-bold">Word</button>
                <button onClick={handlePrint} className="p-2 bg-blue-700 text-white rounded-lg text-sm px-4 hover:bg-blue-800 transition-colors font-bold">طباعة</button>
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

      <footer className="bg-slate-50 py-8 md:py-10 px-4 no-print border-t border-slate-200 mt-auto text-slate-800">
        <div className="container mx-auto max-w-6xl text-center flex flex-col items-center">
          <button onClick={scrollToTop} className="group transition-transform hover:-translate-y-1 active:scale-95 mb-4">
            <h2 className="text-lg md:text-xl font-bold text-emerald-600 group-hover:text-emerald-500 transition-colors">MEELAWFIRM</h2>
          </button>
          <div className="flex justify-center items-center gap-3 md:gap-4 mb-4 flex-wrap">
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="group p-2 md:p-2.5 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full shadow-md hover:-translate-y-1 hover:shadow-red-500/20 transition-all duration-300 flex items-center justify-center aspect-square">
               <YouTubeIcon />
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="group p-2 md:p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-md hover:-translate-y-1 hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center aspect-square">
               <FacebookIcon />
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="group p-2 md:p-2.5 bg-gradient-to-br from-slate-700 to-slate-900 text-white rounded-full shadow-md hover:-translate-y-1 hover:shadow-slate-500/20 transition-all duration-300 flex items-center justify-center aspect-square">
               <TikTokIcon />
            </a>
            <a href={`mailto:${SOCIAL_LINKS.email}`} className="group p-2 md:p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full shadow-md hover:-translate-y-1 hover:shadow-blue-500/20 transition-all duration-300 flex items-center justify-center aspect-square">
               <EmailIcon />
            </a>
          </div>
          <div className="flex justify-center gap-4 md:gap-6 text-[8px] md:text-[10px] text-slate-500 font-bold mb-6 flex-wrap max-w-2xl px-2">
            {FOOTER_LINKS.map(l => (
              <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors border-b border-transparent hover:border-blue-600 pb-0.5 font-bold">
                {l.name}
              </a>
            ))}
          </div>
          <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-4 opacity-30"></div>
          <p className="text-[7px] md:text-[9px] text-slate-400 font-bold tracking-widest uppercase px-4">&copy; 2026 MEELAWFIRM - PROFESSIONAL LEGAL PWA V4.3.0</p>
        </div>
      </footer>
    </div>
  );
};

export default App;