/* Aviso de cookies com Consent Mode do Google.
   O consentimento padrão (negado) é definido no <head>, antes do Tag Manager.
   Aqui o visitante escolhe; a escolha fica salva só neste navegador. */
(function () {
  var KEY = 'fv_consent_v1';
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function apply(v) {
    var s = v === 'granted' ? 'granted' : 'denied';
    if (typeof window.gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: s, ad_storage: s, ad_user_data: s, ad_personalization: s });
    }
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: v === 'granted' ? 'consentimento_aceito' : 'consentimento_recusado' });
  }
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;
  var opener = null;
  function show(from) { opener = from || null; banner.hidden = false; }
  function hide() { banner.hidden = true; if (opener) opener.focus(); }
  function choose(v) { save(v); apply(v); hide(); }
  banner.querySelector('[data-accept]').addEventListener('click', function () { choose('granted'); });
  banner.querySelector('[data-reject]').addEventListener('click', function () { choose('denied'); });
  banner.addEventListener('keydown', function (e) { if (e.key === 'Escape' && read()) hide(); });
  [].slice.call(document.querySelectorAll('[data-cookie-prefs]')).forEach(function (b) {
    b.addEventListener('click', function (e) { e.preventDefault(); show(b); banner.querySelector('[data-accept]').focus(); });
  });
  if (!read()) show();
})();
