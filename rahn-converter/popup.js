function formatToman(num) {
  return num.toLocaleString('fa-IR') + ' تومان';
}

function parseNumber(str) {
  if (!str) return 0;
  let text = str.toString().trim();
  text = text.replace(/[^\d۰-۹]/g, '');
  text = text.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  return parseInt(text) || 0;
}

function calculate() {
  const rahn = parseNumber(document.getElementById('rahn').value);
  const rent = parseNumber(document.getElementById('rent').value);
  const area = parseNumber(document.getElementById('area').value);

  let totalRahn = rahn;
  if (rent > 0) {
    totalRahn += (rent / 0.03);   // فرمول دقیق شما
  }

  let html = `<strong>✅ رهن کامل: ${formatToman(Math.round(totalRahn))}</strong><br><br>`;

  if (rent > 0) html += `اجاره ماهانه: ${formatToman(rent)}<br>`;
  if (rahn > 0) html += `ودیعه: ${formatToman(rahn)}<br>`;
  if (area > 0) {
    html += `رهن هر متر: ${Math.round(totalRahn / area).toLocaleString('fa-IR')} تومان`;
  }

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = html;
  resultDiv.style.display = 'block';
}