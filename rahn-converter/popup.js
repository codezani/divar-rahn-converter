function formatToman(num) {
  return Math.round(num).toLocaleString('fa-IR') + ' تومان';
}

function parseNumber(str) {
  if (!str) return 0;
  let text = str.toString().trim();

  // تبدیل اعداد فارسی به انگلیسی
  text = text.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

  // ممیز فارسی → نقطه
  text = text.replace(/٫/g, '.');
  // فقط رقم و نقطه باقی بماند
  text = text.replace(/[^\d.]/g, '');

  // فقط یک نقطه اعشار
  const parts = text.split('.');
  if (parts.length > 2) {
    text = parts[0] + '.' + parts.slice(1).join('');
  }

  return parseFloat(text) || 0;
}

function calculate() {
  // ورودی به میلیون تومان (اعشار مجاز: 2.5 = 2,500,000 تومان)
  const rahn = parseNumber(document.getElementById('rahn').value) * 1000000;
  const rent = parseNumber(document.getElementById('rent').value) * 1000000;
  const area = parseNumber(document.getElementById('area').value);

  let totalRahn = rahn;
  if (rent > 0) {
    totalRahn += (rent / 0.03);
  }

  let html = `<strong>✅ رهن کامل: ${formatToman(totalRahn)}</strong><br><br>`;

  if (rent > 0) html += `اجاره ماهانه: ${formatToman(rent)}<br>`;
  if (rahn > 0) html += `ودیعه: ${formatToman(rahn)}<br>`;
  if (area > 0) {
    html += `رهن هر متر: ${Math.round(totalRahn / area).toLocaleString('fa-IR')} تومان`;
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = html;
  resultDiv.style.display = 'block';
}
