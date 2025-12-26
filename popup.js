(() => {
  const DIV = 7.5;

  const old = document.getElementById('__cny2eur_dlg__');
  if (old) old.remove();

  const dlg = document.createElement('dialog');
  dlg.id = '__cny2eur_dlg__';
  dlg.style.cssText =
    'padding:16px;border:1px solid #ccc;border-radius:12px;max-width:380px;width:92vw;font:14px system-ui;';

  dlg.innerHTML = `
<form method="dialog" style="margin:0;display:grid;gap:10px;">
  <div style="font-weight:700;font-size:16px;">人民币→欧元（÷${DIV}）</div>
  <label>成本价（CNY）
    <input id="__c" type="number" step="0.01" inputmode="decimal" style="width:100%;padding:8px;box-sizing:border-box;">
  </label>
  <label>运费（CNY）
    <input id="__s" type="number" step="0.01" inputmode="decimal" style="width:100%;padding:8px;box-sizing:border-box;">
  </label>
  <div id="__out" style="background:#f7f7f7;border-radius:8px;padding:10px;white-space:pre-wrap;">总价：0.00 CNY
欧元：0.00 EUR（÷${DIV}）</div>
  <div style="display:flex;gap:8px;justify-content:flex-end;">
    <button value="cancel">关闭</button>
  </div>
</form>`;

  document.body.appendChild(dlg);

  const c = dlg.querySelector('#__c');
  const s = dlg.querySelector('#__s');
  const out = dlg.querySelector('#__out');

  const fmt = (v) => (Number.isFinite(v) ? v.toFixed(2) : '0.00');

  function calc() {
    const cost = Number(c.value || 0);
    const ship = Number(s.value || 0);
    if (!Number.isFinite(cost) || !Number.isFinite(ship)) {
      out.textContent = '请输入数字';
      return;
    }
    const total = cost + ship;
    out.textContent = `总价：${fmt(total)} CNY
欧元：${fmt(total / DIV)} EUR（÷${DIV}）`;
  }

  c.addEventListener('input', calc);
  s.addEventListener('input', calc);

  dlg.addEventListener('click', (e) => {
    const r = dlg.getBoundingClientRect();
    const inBox =
      r.top <= e.clientY && e.clientY <= r.bottom && r.left <= e.clientX && e.clientX <= r.right;
    if (!inBox) dlg.close();
  });

  dlg.showModal();
  c.focus();
  calc();
})();
