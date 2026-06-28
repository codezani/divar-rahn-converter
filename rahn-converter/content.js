// content.js
console.log('%c✅ محاسبه‌گر رهن کامل v3.9 | F8 - تب چرخشی', 'color:#166534; font-weight:bold; font-size:16px');

function showCalculator() {
  document.querySelectorAll('.rahn-calculator-box').forEach(el => el.remove());

  const box = document.createElement('div');
  box.className = 'rahn-calculator-box';
  box.style.cssText = `
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: #ecfdf5;
    border: 5px solid #4ade80;
    border-radius: 18px;
    padding: 25px;
    width: 400px;
    z-index: 2147483647;
    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
    font-family: Tahoma, sans-serif;
    text-align: center;
    cursor: move;
  `;

  box.innerHTML = `
    <h3 style="margin:0 0 20px 0; color:#166534; cursor:move;">🧮 محاسبه‌گر رهن کامل</h3>
    
    <input type="text" id="rahn-in" placeholder="ودیعه / رهن (تومان)" style="width:100%; padding:12px; margin:8px 0; border:2px solid #4ade80; border-radius:10px; font-size:16px;">
    <input type="text" id="rent-in" placeholder="اجاره ماهانه (تومان)" style="width:100%; padding:12px; margin:8px 0; border:2px solid #4ade80; border-radius:10px; font-size:16px;">
    <input type="text" id="area-in" placeholder="متراژ (اختیاری)" style="width:100%; padding:12px; margin:8px 0; border:2px solid #4ade80; border-radius:10px; font-size:16px;">
    
    <div id="calc-result" style="margin-top:15px; padding:18px; background:#d1fae5; border-radius:12px; font-size:18.5px; font-weight:bold; min-height:90px; border:3px solid #4ade80;"></div>
    
    <button onclick="this.closest('.rahn-calculator-box').remove()" style="background:#ef4444; color:white; border:none; padding:10px 30px; border-radius:8px; cursor:pointer; margin-top:15px;">
      بستن
    </button>
  `;

  document.body.appendChild(box);

  makeDraggable(box);

  const inputs = box.querySelectorAll('input');
  inputs.forEach((input, index) => {
    input.addEventListener('input', autoCalculate);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        const nextIndex = (index + 1) % inputs.length;
        inputs[nextIndex].focus();
      }
    });
  });

  // فوکوس اولیه روی اولین فیلد
  setTimeout(() => {
    document.getElementById('rahn-in').focus();
  }, 100);

  autoCalculate();
}

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = element.querySelector('h3');

  header.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
    element.style.transform = "none";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function autoCalculate() {
  const rahn = parseNumber(document.getElementById('rahn-in').value);
  const rent = parseNumber(document.getElementById('rent-in').value);
  const area = parseNumber(document.getElementById('area-in').value);

  let totalRahn = rahn;
  if (rent > 0) {
    totalRahn += Math.round(rent / 0.03);
  }

  let html = `✅ رهن کامل: <span style="color:#166534; font-size:20px;">${totalRahn.toLocaleString('fa-IR')} تومان</span><br><br>`;

  if (rent > 0) html += `اجاره ماهانه: ${rent.toLocaleString('fa-IR')} تومان<br>`;
  if (rahn > 0) html += `ودیعه: ${rahn.toLocaleString('fa-IR')} تومان<br>`;
  if (area > 0) html += `رهن هر متر: ${Math.round(totalRahn / area).toLocaleString('fa-IR')} تومان`;

  document.getElementById('calc-result').innerHTML = html;
}

function parseNumber(str) {
  if (!str) return 0;
  let text = str.toString().trim();
  text = text.replace(/[^\d۰-۹]/g, '');
  text = text.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
  return parseInt(text) || 0;
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'F8') {
    e.preventDefault();
    showCalculator();
  }
});
