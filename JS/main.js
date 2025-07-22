
const modal = document.getElementById('quote-modal');
const quoteTextEl = document.getElementById('quote-text');
const quoteAuthorEl = document.getElementById('quote-author');
const closeBtn = document.getElementById('close-modal');

// 1. لما أكبس على بطاقة، أظهر المودال واملأه بالمحتوى
document.addEventListener('click', (e) => {
  const card = e.target.closest('.quote-card');
  if (card) {
    const text = card.querySelector('.quote-text').innerText;
    const author = card.querySelector('.quote-author')?.innerText || '';

    quoteTextEl.innerText = text;
    quoteAuthorEl.innerText = author;

    modal.classList.remove('hidden');
  }
});

// 2. لما أكبس × أغلق المودال
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// 3. أغلق المودال إذا كبست برة المودال
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.add('hidden');
  }
});


//عند الضغط على القلب  يصبح لونه احمر

const likeBtn = document.getElementById('like');

likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('liked');

  const icon = likeBtn.querySelector('i');
  if (likeBtn.classList.contains('liked')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
  }
});

// فتح واغلاق bar
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");
  const closeMenu = document.querySelector(".close-menu");
  
  menuIcon.addEventListener("click", () => {
    navLinks.classList.add("active");
  });
  
  closeMenu.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});



// الان سنبدا بنسخ الاقتباس
// زر النسخ
const copyBtn = document.getElementById("copy");
copyBtn.addEventListener("click", () => {
const textToCopy = document.getElementById("quote-text").innerText;

if (navigator.clipboard) {
    navigator.clipboard.writeText(textToCopy)
    .then(() => {
        // تغيير الأيقونة إلى علامة صح ✅
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

        // إرجاع الأيقونة الأصلية بعد ثانيتين
        setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 1500);
    })
    .catch(err => {
        console.error("خطأ في النسخ:", err);
    });
} else {
    // دعم قديم - fallback
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();

    try {
    const successful = document.execCommand("copy");
    if (successful) {
        copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => {
        copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>';
        }, 1500);
    }
    } catch (err) {
    console.error("فشل النسخ الاحتياطي:", err);
    }

    document.body.removeChild(textArea);
}
});

async function loadAndDisplayQuotes() {
  try {
    const [resAr, resEn] = await Promise.all([
      fetch('./qoute.json'),
      fetch('./english_quotes_1000.json')
    ]);

    const [dataAr, dataEn] = await Promise.all([
      resAr.json(),
      resEn.json()
    ]);

    const allQuotes = [...dataAr.quotes, ...dataEn.quotes];

    // إزالة التكرارات بناءً على النص
    const seenTexts = new Set();
    const uniqueQuotes = allQuotes.filter(quote => {
      const trimmedText = quote.text.trim();
      if (seenTexts.has(trimmedText)) return false;
      seenTexts.add(trimmedText);
      return true;
    });

    const container = document.getElementById('quotes-container');
    uniqueQuotes.forEach(quotes => {
      const card = document.createElement('div');
      card.className = 'quote-card';
      card.textContent = quotes.text;
      container.appendChild(card);
    });
  } catch (err) {
    console.error('خطأ في تحميل أو معالجة الاقتباسات:', err);
  }
}

loadAndDisplayQuotes();

const btnArabic = document.getElementById('btn-arabic');
const btnEnglish = document.getElementById('btn-english');

const topicArabicSection = document.getElementById('topic-buttons');
const topicEnglishSection = document.getElementById('topic-english');

const quotesContainer = document.getElementById('quotes-container');

// تحميل الاقتباسات من ملفات JSON
let arabicQuotes = [];
let englishQuotes = [];

let currentQuotes = [];

// تحميل البيانات
fetch('./qoute.json')
  .then(res => res.json())
  .then(data => {
    arabicQuotes = data.quotes;
  });

fetch('./english_quotes_1000.json')
  .then(res => res.json())
  .then(data => {
    englishQuotes = data.quotes;
  });

// إظهار الأقسام حسب اللغة
btnEnglish.addEventListener('click', () => {
  topicArabicSection.style.display = 'none';
  topicEnglishSection.style.display = 'block';
  currentQuotes = englishQuotes;
  quotesContainer.innerHTML = '';
  activateTopicButtons('#topic-english button');
});

btnArabic.addEventListener('click', () => {
  topicArabicSection.style.display = 'block';
  topicEnglishSection.style.display = 'none';
  currentQuotes = arabicQuotes;
  quotesContainer.innerHTML = '';
  activateTopicButtons('#topic-buttons button');
});


// تنشيط أزرار التوبيكات بعد كل مرة تظهر فيها
function activateTopicButtons(selector) {
  document.querySelectorAll(selector).forEach(button => {
    button.addEventListener('click', () => {
      const topic = button.getAttribute('data-topic');
      const filtered = currentQuotes.filter(q => q.topic === topic);
      displayQuotes(filtered);
    });
  });
}

// عرض الاقتباسات
function displayQuotes(quotes) {
  quotesContainer.innerHTML = '';
  quotes.forEach(q => {
    const card = document.createElement('div');
    card.className = 'quote-card';
    card.innerHTML = `
    <div class="quote-icon">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 17H4a1 1 0 0 1-1-1v-4a5 5 0 0 1 5-5h1v2H8a3 3 0 0 0-3 3v3h2v2zm10 0h-3a1 1 0 0 1-1-1v-4a5 5 0 0 1 5-5h1v2h-1a3 3 0 0 0-3 3v3h2v2z"/>
  </svg>
</div>
      <blockquote class="quote-text">${q.text}</blockquote>
      <p>${q.topic}</p>
      <footer class="quote-author">${q.author}</footer>
    `;
    quotesContainer.appendChild(card);
  });
}


// دالة تفعيل اللغة العربية
function setActiveLanguageButton(activeBtn) {
  // إزالة كلاس active من الزرين
  btnArabic.classList.remove('active');
  btnEnglish.classList.remove('active');

  // إضافة كلاس active للزر المُختار
  activeBtn.classList.add('active');
}

// عند فتح الصفحة يكون العربية مفعّل
setActiveLanguageButton(btnArabic);

// عند الضغط على زر العربية
btnArabic.addEventListener('click', () => {
  setActiveLanguageButton(btnArabic);
  
  // ممكن تحط هون كود تغيير المحتوى للغة العربية
});

// عند الضغط على زر الإنجليزية
btnEnglish.addEventListener('click', () => {
  setActiveLanguageButton(btnEnglish);
  // ممكن تحط هون كود تغيير المحتوى للغة الإنجليزية
});

const topicButtons = document.querySelectorAll('.topic-button');

topicButtons.forEach(button => {
  button.addEventListener('click', () => {
    // احذف الكلاس من جميع الأزرار
    topicButtons.forEach(btn => btn.classList.remove('selected'));
    
    // أضف الكلاس للزر الذي تم الضغط عليه
    button.classList.add('selected');
  });
});




const searchBar = document.getElementById('search-bar');

// فلترة الاقتباسات عند كتابة نص في مربع البحث
searchBar.addEventListener('input', () => {
  const searchTerm = searchBar.value.trim().toLowerCase();

  // تأكد من اللغة الحالية
  const currentLang = btnArabic.classList.contains('active') ? 'arabic' : 'english';
  currentQuotes = currentLang === 'arabic' ? arabicQuotes : englishQuotes;

  // الفلترة حسب النص أو الكاتب أو الموضوع
  const filteredQuotes = currentQuotes.filter(quote => {
    return (
      quote.text.toLowerCase().includes(searchTerm) ||
      quote.author.toLowerCase().includes(searchTerm) ||
      quote.topic.toLowerCase().includes(searchTerm)
    );
  });

  displayQuotes(filteredQuotes);
});
