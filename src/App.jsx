import React, { useEffect, useState } from 'react';

export default function App() {
  // --- 📸 სთეითი გადიდებული სურათისთვის ---
  const [selectedImg, setSelectedImg] = useState(null);

  // --- 🧸 სათამაშოების რაოდენობა ---
  // როცა ახალს ჩაამატებ public/images/toys/-ში (მაგ. toy-63.jpg),
  // უბრალოდ აქ შეცვალე ციფრი.
  const toysCount = 62;
  const toys = Array.from({ length: toysCount }, (_, i) => ({
    id: i + 1,
    img: `/images/toys/toy-${i + 1}.jpg`
  }));

  // ანიმაციების ობსერვერი
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ლოგიკა, რომ როცა მოდალი ღიაა, უკანა ფონი არ ისქროლოს
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup ფუნქცია კომპონენტის წაშლისას
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImg]);

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-200 overflow-x-hidden">

      <style>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .reveal-active { opacity: 1; transform: translateY(0); }
        .modal-fade { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        /* კურსორი გადიდებისას */
        .cursor-zoom-in { cursor: zoom-in; }
        .cursor-zoom-out { cursor: zoom-out; }
      `}</style>

      {/* --- 📱 NAV --- */}
      <nav className="bg-stone-950/90 backdrop-blur-md sticky top-0 z-[100] py-5 px-8 flex justify-between items-center border-b border-stone-800/50">
        <div className="flex flex-col">
          <span className="text-xl font-serif italic text-stone-100">Wonders by Mom</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#E44D5C]">Handmade collection</span>
        </div>
        <a href="https://wa.me/995557080060" target="_blank" className="bg-[#E44D5C] text-white text-[10px] font-bold uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-white hover:text-[#E44D5C] transition-all">
          WhatsApp
        </a>
      </nav>

      <header className="py-16 px-6 text-center reveal">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-5 text-stone-100">Handmade Wonders</h1>
        <p className="text-stone-500 text-xs uppercase tracking-[0.4em]">სიყვარულით მოქსოვილი</p>
      </header>

      {/* --- 🧸 GRID --- */}
      <main className="pb-24 px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {toys.map((toy) => (
            <div key={toy.id} className="reveal group bg-stone-900/40 p-3 rounded-3xl border border-stone-800/50 hover:border-[#E44D5C]/30 transition-all duration-500">
              {/* დაჭერისას setSelectedImg-ში ვინახავთ სურათის ლინკს */}
              <div
                className="aspect-[4/5] overflow-hidden rounded-2xl cursor-zoom-in"
                onClick={() => setSelectedImg(toy.img)}
              >
                <img
                  src={toy.img}
                  alt={`Handmade Toy ${toy.id}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  // აი ეს ხაზი ჩაამატე:
                  style={{ filter: 'contrast(1.1) brightness(0.9)' }}
                  onError={(e) => { e.target.parentElement.innerHTML = '<div class="h-full flex items-center justify-center text-stone-700 text-[10px]">Toy ' + toy.id + '</div>'; }}
                />
              </div>
              <div className="pt-5 pb-2 text-center">
                <h3 className="text-sm font-serif italic text-stone-300">ნამუშევარი #{toy.id}</h3>

                {/* შეცვლილი ღილაკი: პირდაპირ WhatsApp-ზე გადაჰყავს და ეუბნება რომელი ნომერი უნდა */}
                <a
                  href={`https://wa.me/995557080060?text=${encodeURIComponent(`გამარჯობა, მინდა შევუკვეთო სათამაშო #${toy.id}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-[10px] font-black uppercase tracking-[0.2em] bg-[#E44D5C] text-white px-8 py-2.5 rounded-full hover:bg-white hover:text-[#E44D5C] transition-all duration-300 shadow-lg shadow-rose-900/20"
                >
                  შეკვეთა
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* --- 🔍 MODAL (ეს ნაწილი ჩნდება მხოლოდ მაშინ, როცა selectedImg არ არის null) --- */}
      {selectedImg && (
        <div
          // `fixed inset-0` აჯენს ეკრანზე, `z-[1000]` კი ყველაფერზე ზემოდან აქცევს
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out modal-fade"
          onClick={() => setSelectedImg(null)} // ფონზე დაჭერით იხურება
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={selectedImg} alt="Enlarged" className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain" />
            <button className="absolute -top-10 right-0 text-white text-sm uppercase tracking-widest font-bold">X</button>
          </div>
        </div>
      )}

      <footer className="py-12 text-center border-t border-stone-900 mt-10">
        <p className="text-[8px] uppercase tracking-[0.5em] text-stone-600">© 2026 HANDMADE BY MOM</p>
      </footer>
    </div>
  );
}
