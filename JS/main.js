<<<<<<< HEAD
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
=======
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






// fetch api
// main.js

// العناصر
const btnArabic = document.getElementById('btn-arabic');
const btnEnglish = document.getElementById('btn-english');
const topicArabicSection = document.getElementById('topic-arabic');
const topicEnglishSection = document.getElementById('topic-english');
const quotesContainer = document.getElementById('quotes-container');
const loadMoreBtn = document.getElementById('load-more-btn');


let currentLanguage = 'arabic'; // default
let currentTopic = null;
let currentPage = 1;
const quotesPerPage = 15;

// متغير لتخزين الاقتباسات العربية من ملف JSON
let arabicQuotes = [];

// تحميل الاقتباسات العربية من JSON عند بدء الصفحة
async function loadArabicQuotes() {
  try {
    const res = await fetch('./qoute.json');
    const data = await res.json();
    arabicQuotes = data.quotes;
  } catch (error) {
    console.error('خطأ في تحميل الاقتباسات العربية:', error);
  }
}

// عرض الاقتباسات العربية حسب الموضوع والصفحة
function displayArabicQuotes(topic, page) {
    if (page === 1) {
    quotesContainer.innerHTML = '';
  }

  loadMoreBtn.style.display = 'none';

  // فلترة الاقتباسات حسب الموضوع المختار
  let filtered = arabicQuotes.filter(q => q.topic === topic);

  if (filtered.length === 0) {
    quotesContainer.innerHTML = '<p>لا توجد اقتباسات في هذا الموضوع.</p>';
    loadMoreBtn.style.display = 'none';
    return;
  }

  const start = (page - 1) * quotesPerPage;
  const end = start + quotesPerPage;
  const pageQuotes = filtered.slice(start, end);

  pageQuotes.forEach(quote => {
    const div = document.createElement('div');
    div.classList.add('quote-card');
    div.innerHTML = `
      <blockquote class="quote-text">"${quote.text}"</blockquote>
      <footer class="quote-author">— ${quote.author || 'مجهول'}</footer>
    `;
    // عند الضغط تفتح المودال
    div.addEventListener('click', () => {
      showModal(quote.text, quote.author || 'مجهول');
    });
    quotesContainer.appendChild(div);
  });

  // زر المزيد يظهر فقط لو فيه اقتباسات زيادة
  if (end >= filtered.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }
}

// عرض الاقتباسات الانجليزية من API حسب الموضوع والصفحة
async function displayEnglishQuotes(topic, page) {
   if (page === 1) {
    quotesContainer.innerHTML = '';
  }

  loadMoreBtn.style.display = 'none';

  // quotable.io API يطلب topic بالإنجليزي ولازم نترجم المواضيع 
  // (تقدر تضيف مواضيع وتهيئها أكثر حسب حاجتك)
  const topicMap = {
    love: 'love',
    wisdom: 'wisdom',
    motivation: 'inspirational',
    life: 'life',
    sadness: 'sad',
  };

  const apiTopic = topicMap[topic];
  if (!apiTopic) {
    quotesContainer.innerHTML = '<p>No quotes available for this topic.</p>';
    return;
  }

  try {
    const limit = quotesPerPage;
    const offset = (page - 1) * limit;
    const response = await fetch(`https://api.quotable.io/quotes?tags=${apiTopic}&limit=${limit}&skip=${offset}`);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      if (page === 1) {
        quotesContainer.innerHTML = '<p>No quotes found for this topic.</p>';
      }
      loadMoreBtn.style.display = 'none';
      return;
    }

    data.results.forEach(quote => {
      const div = document.createElement('div');
      div.classList.add('quote-card');
      div.innerHTML = `
        <blockquote class="quote-text">"${quote.content}"</blockquote>
        <footer class="quote-author">— ${quote.author || 'Unknown'}</footer>
      `;
      div.addEventListener('click', () => {
        showModal(quote.content, quote.author || 'Unknown');
      });
      quotesContainer.appendChild(div);
    });

    // إذا عدد الاقتباسات أقل من المطلوب، نخفي زر المزيد
    if (data.results.length < limit) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
    }

  } catch (error) {
    quotesContainer.innerHTML = '<p>حدث خطأ أثناء جلب الاقتباسات.</p>';
    console.error(error);
  }
}

// إظهار المودال
function showModal(text, author) {
  quoteTextEl.innerText = text;
  quoteAuthorEl.innerText = '— ' + author;
  modal.classList.remove('hidden');
}

// إخفاء المودال
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});

// تغيير اللغة وتبديل الأزرار
function switchLanguage(lang) {
  if (lang === currentLanguage) return; // إذا نفس اللغة لا تفعل شيء

  currentLanguage = lang;
  currentTopic = null;
  currentPage = 1;
  quotesContainer.innerHTML = '';
  loadMoreBtn.style.display = 'none';

  if (lang === 'arabic') {
    btnArabic.classList.add('active');
    btnEnglish.classList.remove('active');
    topicArabicSection.style.display = 'block';
    topicEnglishSection.style.display = 'none';
  } else {
    btnEnglish.classList.add('active');
    btnArabic.classList.remove('active');
    topicArabicSection.style.display = 'none';
    topicEnglishSection.style.display = 'block';
  }
}

// عند الضغط على أزرار اللغة
btnArabic.addEventListener('click', () => switchLanguage('arabic'));
btnEnglish.addEventListener('click', () => switchLanguage('english'));

// عند الضغط على موضوع من أزرار المواضيع العربية
topicArabicSection.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentTopic = btn.getAttribute('data-topic');
    currentPage = 1;
    displayArabicQuotes(currentTopic, currentPage);
  });
});

// عند الضغط على موضوع من أزرار المواضيع الإنجليزية
topicEnglishSection.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    currentTopic = btn.getAttribute('data-topic');
    currentPage = 1;
    displayEnglishQuotes(currentTopic, currentPage);
  });
});

// زر المزيد
loadMoreBtn.addEventListener('click', () => {
  if (!currentTopic) return;

  currentPage++;

  if (currentLanguage === 'arabic') {
    displayArabicQuotes(currentTopic, currentPage);
  } else {
    displayEnglishQuotes(currentTopic, currentPage);
  }
});

// تحميل الاقتباسات العربية عند بداية الصفحة
loadArabicQuotes();
>>>>>>> 8222da1 (هلا)
