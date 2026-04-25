import React, { useEffect, useState } from 'react';

export default function App() {
  const phoneNumber = "+995558546331"; // <--- აი აქ დაჯდება შენი ნომერი ერთხელ და სამუდამოდ
  const [selectedImg, setSelectedImg] = useState(null);
  const [copyStatus, setCopyStatus] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("+995558546331"); // აქ შენი ნომერი ეწეროს
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };
  const [showScroll, setShowScroll] = useState(false);

  // --- 🧸 სათამაშოების რაოდენობა ---
  const toysCount = 62;
  const toys = Array.from({ length: toysCount }, (_, i) => ({
    id: i + 1,
    img: `/images/toys/toy-${i + 1}.jpg`
  }));

  // სქროლის კონტროლი ღილაკისთვის
  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-200 overflow-x-hidden">

      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .reveal-active { opacity: 1; transform: translateY(0); }
        .modal-fade { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>

      {/* --- 📱 NAV --- */}
      <nav className="bg-stone-950/90 backdrop-blur-md sticky top-0 z-[100] py-5 px-8 flex justify-between items-center border-b border-stone-800/50">
        <div className="flex flex-col">
          {/* აქ ჩაწერე დედაშენის სახელი და გვარი */}
          <span className="text-xl font-serif italic text-[#D4AF37]">MEDEA LATARIA</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#E44D5C]">Wonders by Mom</span>
        </div>
        <a href="https://wa.me/995558546331" target="_blank" className="bg-[#E44D5C] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-white hover:text-[#E44D5C] transition-all">
          WhatsApp
        </a>
      </nav>

      {/* --- ✨ HEADER --- */}
      <header className="py-20 px-6 text-center reveal">
        <h1 className="text-5xl md:text-7xl font-serif italic mb-5">
          <span className="text-[#D4AF37]">MEDEA</span>
          <span className="text-white ml-4">LATARIA</span>
        </h1>
        <div className="w-20 h-[1px] bg-[#D4AF37] mx-auto mb-6 opacity-50"></div> {/* ხაზიც ოქროსფერი */}
        <p className="text-stone-500 text-xs uppercase tracking-[0.4em]">Handmade Wonders Collection</p>
      </header>

      {/* --- 🧸 GRID --- */}
      <main className="pb-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {toys.map((toy) => (
            <div key={toy.id} className="reveal group bg-stone-900/40 p-3 rounded-3xl border border-stone-800/50 hover:border-[#E44D5C]/30 transition-all duration-500 shadow-2xl">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl cursor-zoom-in" onClick={() => setSelectedImg(toy.img)}>
                <img
                  src={toy.img}
                  style={{ filter: 'contrast(1.05) brightness(0.95)' }}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  onError={(e) => { e.target.parentElement.innerHTML = '<div class="h-full flex items-center justify-center text-stone-800 text-[10px]">TOY ' + toy.id + '</div>'; }}
                />
              </div>
              <div className="pt-5 pb-2 text-center">
                <h3 className="text-sm font-serif italic text-stone-300">ნამუშევარი #{toy.id}</h3>
                <a
                  href={`https://wa.me/995558546331?text=${encodeURIComponent(`გამარჯობა, მინდა შევუკვეთო სათამაშო #${toy.id}`)}`}
                  target="_blank"
                  className="inline-block mt-4 text-[9px] font-black uppercase tracking-widest bg-[#E44D5C] text-white px-7 py-2 rounded-full hover:bg-white hover:text-[#E44D5C] transition-all"
                >
                  შეკვეთა
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- 📞 CONTACT SECTION --- */}
      <section className="py-24 bg-stone-900/30 border-y border-stone-800/50 reveal">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif italic mb-12 text-stone-100">კონტაქტი</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* შენი სწორი ნომერი დაკოპირებით */}
            <div className="relative group cursor-pointer" onClick={handleCopy}>
              <p className="text-[10px] uppercase tracking-widest text-[#E44D5C] mb-3">ტელეფონი (ასლი)</p>
              <p className="text-xl font-light hover:text-[#D4AF37] transition-colors">+995 558 54 63 31</p>
              {copyStatus && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-stone-800 text-[#D4AF37] px-3 py-1 rounded-md">
                  დაკოპირდა!
                </span>
              )}
            </div>

            {/* WhatsApp შენს ნომერზე */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#E44D5C] mb-3">WhatsApp</p>
              <a href={`https://wa.me/${phoneNumber.replace('+', '')}`} target="_blank" className="text-xl font-light hover:text-[#D4AF37] transition-colors font-serif italic">ჩატის დაწყება</a>
            </div>

            {/* მდებარეობა */}
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#E44D5C] mb-3">მდებარეობა</p>
              <p className="text-xl font-light">თბილისი, საქართველო</p>
            </div>

          </div>
        </div>
      </section>

      {/* --- 🔍 MODAL --- */}
      {selectedImg && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out modal-fade" onClick={() => setSelectedImg(null)}>
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedImg} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain" />
            <button className="absolute -top-10 right-0 text-white text-xs uppercase tracking-widest">დახურვა ✕</button>
          </div>
        </div>
      )}

      {/* --- 🔝 SCROLL TO TOP BUTTON --- */}
      <button
        onClick={scrollTop}
        className={`fixed bottom-8 right-8 z-[500] bg-white/10 backdrop-blur-lg border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 hover:bg-[#E44D5C] ${showScroll ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      >
        <span className="text-xl">↑</span>
      </button>

      <footer className="py-12 text-center text-stone-600">
        <p className="text-[8px] uppercase tracking-[0.5em]">© 2026 [დედას სახელი გვარი] • HANDMADE WITH LOVE</p>
      </footer>
    </div>
  );
}