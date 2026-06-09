// content.js
function formatToman(num) {
  return num.toLocaleString('fa-IR') + ' تومان';
}

function parsePersianNumber(str) {
  if (!str) return 0;
  
  let text = str.toString().trim();
  
  // مدیریت میلیون و هزار
  let multiplier = 1;
  if (/میلیون|ملیون/i.test(text)) multiplier = 1_000_000;
  else if (/هزار/i.test(text)) multiplier = 1_000;

  text = text.replace(/[^\d۰-۹]/g, '');
  text = text.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  
  let number = parseInt(text) || 0;
  return number * multiplier;
}

function findArea(text) {
  const match = text.match(/([\d۰-۹,.\s]+)\s*(?:متر|مترمربع|متر مربع)/i);
  if (match) return parsePersianNumber(match[1]);
  return 0;
}

// محاسبه بر اساس فرمول شما
function calculate(rahn, rent, area) {
  let totalRahn = 0;
  let lines = [];

  if (rent > 0) {
    const rentEquivalent = (rent / 0.03);           // a * 1_000_000 / 0.03
    totalRahn += rentEquivalent;
    lines.push(`اجاره ماهانه: ${formatToman(rent)}`);
  }

  if (rahn > 0) {
    totalRahn += rahn;
  }

  if (totalRahn > 0) {
    lines.push(`رهن کامل: ${formatToman(totalRahn)}`);
  }

  // اجاره هر متر (از رهن کامل)
  if (totalRahn > 0 && area > 0) {
    const perMeterRahn = Math.round(totalRahn / area);
    lines.push(`رهن هر متر: ${perMeterRahn.toLocaleString('fa-IR')} تومان`);
  }

  return lines.join(" | ");
}

// پردازش صفحه
function processPage() {
  const elements = document.querySelectorAll('div, span, p, h1, h2, h3, strong, li, article');

  elements.forEach(el => {
    const text = el.textContent.trim();
    if (!text) return;

    let rahn = 0;
    let rent = 0;
    let area = findArea(text);

    // تشخیص رهن
    const rahnMatch = text.match(/(رهن|ودیعه)[:\s]*([\d۰-۹,.\s]+(?:میلیون|ملیون|هزار)?)/i);
    // تشخیص اجاره
    const rentMatch = text.match(/(اجاره|ماهانه|کرایه)[:\s]*([\d۰-۹,.\s]+(?:میلیون|ملیون|هزار)?)/i);

    if (rahnMatch) rahn = parsePersianNumber(rahnMatch[2]);
    if (rentMatch) rent = parsePersianNumber(rentMatch[2]);

    // جستجوی متراژ در والدین
    if (area === 0 && (rahn > 0 || rent > 0)) {
      let parent = el.parentElement;
      for (let i = 0; i < 6 && parent; i++) {
        area = findArea(parent.textContent);
        if (area > 0) break;
        parent = parent.parentElement;
      }
    }

    if ((rahn > 0 || rent > 0) && !el.querySelector('.rahn-full-converter')) {
      const result = calculate(rahn, rent, area);
      if (result) {
        const div = document.createElement('div');
        div.className = 'rahn-full-converter';
        div.style.cssText = `
          background: #dcfce7;
          padding: 12px 14px;
          margin: 10px 0;
          border-radius: 8px;
          font-size: 15px;
          border: 2px solid #4ade80;
          color: #166534;
          font-weight: 600;
          line-height: 1.75;
        `;
        div.textContent = result;
        el.appendChild(div);
      }
    }
  });
}

// اجرا
setTimeout(processPage, 1200);
const observer = new MutationObserver(() => setTimeout(processPage, 800));
observer.observe(document.body, { childList: true, subtree: true });

console.log('%c✅ رهن کامل Converter v1.4 (فرمول شما) فعال شد', 'color:#166534; font-weight:bold');