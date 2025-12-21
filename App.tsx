
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Category, PetitionModel, FormData as IFormData } from './types';
import { PETITION_MODELS, COURTS, INVESTIGATION_OFFICES, FOOTER_LINKS, SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [selectedModel, setSelectedModel] = useState<PetitionModel | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<IFormData>({
    userRole: 'محامي',
    partyRole: 'شاكي',
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
    witnesses: '',
    documents: '',
    extraDetails: ''
  });

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
    const matches = PETITION_MODELS.filter(m => 
      m.title.toLowerCase().includes(lowerQuery) || 
      m.category.toLowerCase().includes(lowerQuery)
    );
    return matches.length > 0 ? matches : [PETITION_MODELS.find(m => m.id === 'general-petition')!];
  }, [searchQuery]);

  const handleCategoryClick = (cat: Category) => {
    setActiveCategory(cat);
    if (cat === Category.GENERAL) {
      handleModelSelect(PETITION_MODELS.find(m => m.id === 'general-petition')!);
    }
  };

  const handleModelSelect = (model: PetitionModel) => {
    setSelectedModel(model);
    setFormData(prev => ({
      ...prev,
      subject: model.title,
      body: model.contentTemplate
    }));
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportDoc = () => {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + document.getElementById('printable-document')?.innerHTML + footer;
    
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = `${formData.subject || 'عريضة'}.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const ResetBtn = () => (
    <button 
      onClick={goHome}
      className="mb-4 text-blue-600 hover:text-blue-800 flex items-center gap-2 font-bold no-print"
    >
      <span>&rarr;</span> العودة للرئيسية
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md py-6 sticky top-0 z-50 px-4 no-print">
        <div className="container mx-auto flex justify-center">
            <button 
                onClick={goHome}
                className="group flex flex-col items-center transition-all duration-300 transform hover:scale-105 active:scale-95"
                title="العودة للرئيسية"
            >
                <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-900 group-hover:text-blue-700 transition-colors">
                    MEELAWFIRM
                </h1>
                <span className="text-sm md:text-base font-medium text-blue-600 opacity-80 group-hover:opacity-100">
                    نظام تحرير العرائض والطلبات
                </span>
                <div className="h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-500 rounded-full mt-1"></div>
            </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {!isEditing ? (
          <>
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10 relative">
              <input
                type="text"
                placeholder="ابحث عن العريضة المطلوبة (مثال: قتل، طلاق، إخلاء)..."
                className="w-full p-4 pr-12 rounded-full border-2 border-blue-100 focus:border-blue-500 outline-none transition-all shadow-sm text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </div>
              
              {searchQuery.trim() && (
                <div className="absolute top-full left-0 right-0 bg-white shadow-xl rounded-2xl mt-2 overflow-hidden z-40 border border-gray-100 animate-in fade-in slide-in-from-top-2">
                  {filteredModels.map(model => (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect(model)}
                      className="w-full text-right p-4 hover:bg-blue-50 border-b border-gray-50 flex justify-between items-center"
                    >
                      <span>{model.title}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">{model.category}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid 4 Squares */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto mb-16">
              {[
                { id: Category.GENERAL, title: 'المحرر العام', icon: '📝', color: 'bg-indigo-600' },
                { id: Category.CIVIL, title: 'العرائض المدنية', icon: '⚖️', color: 'bg-emerald-600' },
                { id: Category.CRIMINAL, title: 'العرائض الجنائية', icon: '🚔', color: 'bg-red-600' },
                { id: Category.PERSONAL_STATUS, title: 'أحوال شخصية', icon: '👨‍👩‍👧‍👦', color: 'bg-amber-600' }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleCategoryClick(item.id as Category)}
                  className={`${item.color} text-white p-8 rounded-2xl shadow-lg hover:scale-105 transition-transform flex flex-col items-center justify-center gap-4 text-center aspect-square`}
                >
                  <span className="text-4xl">{item.icon}</span>
                  <span className="text-xl font-bold">{item.title}</span>
                </button>
              ))}
            </div>

            {/* Category Sub-Lists */}
            {activeCategory && activeCategory !== Category.GENERAL && (
              <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-inner border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">نماذج {activeCategory}</h2>
                  <button onClick={() => setActiveCategory(null)} className="text-red-500 hover:underline">إغلاق</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PETITION_MODELS.filter(m => m.category === activeCategory).map(model => (
                    <button
                      key={model.id}
                      onClick={() => handleModelSelect(model)}
                      className="p-4 border border-blue-100 rounded-xl hover:bg-blue-50 text-right transition-colors"
                    >
                      {model.title}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-lg no-print">
              <ResetBtn />
              <h2 className="text-2xl font-bold mb-6 text-blue-900 border-b pb-4">بيانات العريضة: {selectedModel?.title}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold">صفة مقدم الطلب</label>
                  <select 
                    className="p-3 border rounded-lg"
                    value={formData.userRole}
                    onChange={e => setFormData({...formData, userRole: e.target.value as any})}
                  >
                    <option>محامي</option>
                    <option>مقدم الطلب بنفسه</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold">صفة الطرف الأول</label>
                  <select 
                    className="p-3 border rounded-lg"
                    value={formData.partyRole}
                    onChange={e => setFormData({...formData, partyRole: e.target.value as any})}
                  >
                    <option>شاكي</option>
                    <option>مدعي</option>
                  </select>
                </div>

                <div className="md:col-span-2 border-t pt-4 mt-2">
                  <h3 className="font-bold text-blue-700 mb-4">بيانات الطرف الأول ({formData.partyRole})</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="الاسم الكامل" className="p-3 border rounded-lg" value={formData.applicantName} onChange={e => setFormData({...formData, applicantName: e.target.value})} />
                    <input type="text" placeholder="العنوان" className="p-3 border rounded-lg" value={formData.applicantAddress} onChange={e => setFormData({...formData, applicantAddress: e.target.value})} />
                    <input type="text" placeholder="رقم الهاتف" className="p-3 border rounded-lg" value={formData.applicantPhone} onChange={e => setFormData({...formData, applicantPhone: e.target.value})} />
                  </div>
                </div>

                <div className="md:col-span-2 border-t pt-4 mt-2">
                  <h3 className="font-bold text-red-700 mb-4">بيانات الطرف الثاني (الخصم/المشكو ضده)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" placeholder="الاسم الكامل" className="p-3 border rounded-lg" value={formData.defendantName} onChange={e => setFormData({...formData, defendantName: e.target.value})} />
                    <input type="text" placeholder="العنوان" className="p-3 border rounded-lg" value={formData.defendantAddress} onChange={e => setFormData({...formData, defendantAddress: e.target.value})} />
                    <input type="text" placeholder="رقم الهاتف" className="p-3 border rounded-lg" value={formData.defendantPhone} onChange={e => setFormData({...formData, defendantPhone: e.target.value})} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold">قسم الشرطة / النيابة المختصة</label>
                  <input type="text" placeholder="مثلاً: نيابة الخرطوم شمال" className="p-3 border rounded-lg" value={formData.policeStation} onChange={e => setFormData({...formData, policeStation: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold">المحكمة / الدائرة</label>
                  <input type="text" placeholder="مثلاً: محكمة بحري" className="p-3 border rounded-lg" value={formData.courtName} onChange={e => setFormData({...formData, courtName: e.target.value})} />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="font-bold">صفة القاضي/المسؤول</label>
                  <select className="p-3 border rounded-lg" value={formData.judgeTitle} onChange={e => setFormData({...formData, judgeTitle: e.target.value})}>
                    {COURTS.map(c => <option key={c}>{c}</option>)}
                    {INVESTIGATION_OFFICES.map(i => <option key={i}>{i}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold">رقم الدعوى / البلاغ</label>
                  <input type="text" placeholder="رقم الملف" className="p-3 border rounded-lg" value={formData.caseNumber} onChange={e => setFormData({...formData, caseNumber: e.target.value})} />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="font-bold">موضوع العريضة</label>
                  <input type="text" className="p-3 border rounded-lg font-bold" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="font-bold">متن العريضة (الوقائع والطلبات)</label>
                  <textarea rows={10} className="p-3 border rounded-lg petition-font text-lg leading-relaxed" value={formData.body} onChange={e => setFormData({...formData, body: e.target.value})} />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold">الشهود (اختياري)</label>
                  <input type="text" placeholder="أسماء الشهود" className="p-3 border rounded-lg" value={formData.witnesses} onChange={e => setFormData({...formData, witnesses: e.target.value})} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold">المستندات المرفقة</label>
                  <input type="text" placeholder="مرفق 1، مرفق 2..." className="p-3 border rounded-lg" value={formData.documents} onChange={e => setFormData({...formData, documents: e.target.value})} />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="font-bold italic">كتابة المزيد (تفاصيل إضافية)</label>
                  <textarea rows={3} placeholder="أي ملاحظات أخرى تظهر في نهاية العريضة..." className="p-3 border rounded-lg" value={formData.extraDetails} onChange={e => setFormData({...formData, extraDetails: e.target.value})} />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-10 sticky bottom-4 bg-white p-4 rounded-xl shadow-lg border">
                <button onClick={handlePrint} className="flex-1 bg-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-colors">طباعة مباشرة</button>
                <button onClick={handleExportDoc} className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors">تصدير Word</button>
                <button onClick={() => window.print()} className="flex-1 bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors">تصدير PDF</button>
              </div>
            </div>

            <div className="hidden lg:block w-[400px] shrink-0 sticky top-24 h-[calc(100vh-150px)] overflow-y-auto no-print">
              <div className="bg-gray-200 p-4 rounded-xl">
                <h3 className="text-center font-bold mb-4 text-gray-600">معاينة المستند المباشرة</h3>
                <div className="bg-white shadow-2xl p-6 petition-font text-[10px] leading-snug border border-gray-300 min-h-[500px]">
                  <div className="text-right mb-2">لدى {formData.policeStation || '.........'}</div>
                  <div className="text-center font-bold mb-1">
                    {formData.applicantName || '.........'} ({formData.partyRole}) {formData.applicantPhone}
                    <div className="text-xs">ضد</div>
                    {formData.defendantName || '.........'} (طرف ثانٍ) {formData.defendantPhone}
                  </div>
                  <div className="text-center my-2 border-y py-1">رقم الدعوى: {formData.caseNumber || '.........'}</div>
                  <div className="text-center font-bold underline mb-4">{formData.subject}</div>
                  <div className="whitespace-pre-wrap">{formData.body.substring(0, 300)}...</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Printable Document (A4 Styling) */}
      <div id="printable-document" className="hidden print:block bg-white text-black p-[20mm] petition-font text-xl leading-relaxed">
        <div className="flex justify-between items-start mb-10">
            <div className="w-1/3"></div>
            <div className="w-1/3"></div>
            <div className="w-1/3 text-right text-2xl font-bold">
                لدى {formData.policeStation || formData.courtName || '....................'}
            </div>
        </div>

        <div className="text-center mb-10 space-y-2">
            <p className="font-bold text-2xl">
                {formData.applicantName || '................................'} <span className="text-lg">({formData.partyRole})</span>
            </p>
            <p className="text-lg">الهاتف: {formData.applicantPhone || '...............'}</p>
            <p className="font-bold">ضد</p>
            <p className="font-bold text-2xl">
                {formData.defendantName || '................................'} <span className="text-lg">(طرف ثانٍ)</span>
            </p>
            <p className="text-lg">الهاتف: {formData.defendantPhone || '...............'}</p>
        </div>

        <div className="flex justify-center mb-6">
            <div className="border border-black px-6 py-2">
                رقم الدعوى: {formData.caseNumber || '......... / .........'}
            </div>
        </div>

        <div className="text-center mb-10">
            <p className="text-2xl font-bold underline">الموضوع / {formData.subject}</p>
        </div>

        <div className="flex justify-between mb-8">
            <div className="font-bold text-xl">السيد / {formData.judgeTitle}</div>
            <div className="font-bold text-xl">الموقر /</div>
        </div>

        <div className="text-center font-bold text-xl mb-10">بعد التحية والاحترام</div>

        <div className="text-justify whitespace-pre-wrap mb-12 text-2xl leading-loose">
            {formData.body}
            {formData.extraDetails && <div className="mt-8 italic">{formData.extraDetails}</div>}
        </div>

        <div className="text-center font-bold text-2xl mb-16">لله التوفيق</div>

        <div className="flex justify-between items-end mb-16">
            <div className="text-right">
                <p className="font-bold underline mb-2">الشهود:</p>
                <p>1. {formData.witnesses.split('،')[0] || '................................'}</p>
                <p>2. {formData.witnesses.split('،')[1] || '................................'}</p>
            </div>
            <div className="text-left w-1/2">
                <p className="font-bold mb-10">مقدم العريضة: {formData.applicantName}</p>
                <div className="border-t border-black w-32 mr-auto mb-2"></div>
                <p className="text-sm">التوقيع</p>
            </div>
        </div>

        <div className="mt-8 border-t pt-4">
            <p className="font-bold underline">المستندات:</p>
            <p>{formData.documents || '................................'}</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 py-12 px-4 no-print mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">MEELAWFIRM</h3>
            <p className="text-sm leading-relaxed mb-6 opacity-70">
              المنصة المتكاملة لتحرير العرائض والطلبات القانونية بلمسة احترافية ودقة متناهية.
            </p>
            <div className="flex gap-4">
               <a href={SOCIAL_LINKS.youtube} target="_blank" className="hover:text-red-500">YouTube</a>
               <a href={SOCIAL_LINKS.facebook} target="_blank" className="hover:text-blue-500">Facebook</a>
               <a href={SOCIAL_LINKS.tiktok} target="_blank" className="hover:text-white">TikTok</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {FOOTER_LINKS.map(link => (
              <a key={link.name} href={link.url} target="_blank" className="hover:text-blue-400 transition-colors">
                {link.name}
              </a>
            ))}
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">تواصل معنا</h4>
            <p className="text-sm mb-2">{SOCIAL_LINKS.email}</p>
            <p className="text-xs opacity-50 mt-8">Powered by MEELAWFIRM</p>
            <p className="text-xs opacity-50">V: 2.1.7 (PWA Edition)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
