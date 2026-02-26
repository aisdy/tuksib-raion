(function () {
  'use strict';

  var input = document.getElementById('phone');
  var form = input && input.closest('form');
  var fieldPhone = input && input.closest('.field--phone');
  var hiddenFull = form && form.querySelector('input[name="phone_full"]');

  if (!input || !form || !hiddenFull) return;

  var maskInstance = null;
  /* маски стран для телефона */
  var MASKS = {
    af: '00 000 0000', al: '000 000 000', dz: '000 00 00 00', as: '(000) 000-0000', ad: '000 000',
    ao: '000 000 000', ai: '(000) 000-0000', ag: '(000) 000-0000', ar: '00 0000-0000', am: '00 000000',
    aw: '000 0000', ac: '00000', au: '000 000 000', at: '000 000000', az: '00 000-00-00',
    bs: '(000) 000-0000', bh: '0000 0000', bd: '00000 000000', bb: '(000) 000-0000', by: '00 000-00-00',
    be: '000 00 00 00', bz: '000 0000', bj: '00 00 00 00', bm: '(000) 000-0000', bt: '00 00 00 00',
    bo: '0 000 0000', ba: '000 000 000', bw: '00 000 000', br: '(00) 00000-0000', io: '000 0000',
    vg: '(000) 000-0000', bn: '000 0000', bg: '000 000 000', bf: '00 00 00 00', bi: '00 00 00 00',
    kh: '000 000 000', cm: '0 00 00 00 00', ca: '(000) 000-0000', cv: '000 00 00', bq: '000 0000',
    ky: '(000) 000-0000', cf: '00 00 00 00', td: '00 00 00 00', cl: '0 0000 0000', cn: '000 0000 0000',
    cx: '000 000 000', cc: '000 000 000', co: '000 000 0000', km: '000 00 00', cg: '0 00 000 0000',
    cd: '000 000 000', ck: '00 000', cr: '0000 0000', hr: '000 000 0000', cu: '0 000 0000',
    cw: '000 0000', cy: '00 000000', cz: '000 000 000', ci: '00 00 00 00 00', dk: '00 00 00 00',
    dj: '00 00 00 00', dm: '(000) 000-0000', do: '(000) 000-0000', ec: '00 000 0000', eg: '000 000 0000',
    sv: '0000 0000', gq: '000 000 000', er: '0 000 000', ee: '0000 0000', sz: '00 00 00 000',
    et: '000 000 000', fk: '00000', fo: '000 000', fj: '000 0000', fi: '000 0000000', fr: '0 00 00 00 00',
    gf: '0 00 00 00 00', pf: '00 00 00 00', ga: '0 00 00 00 00', gm: '000 0000', ge: '000 00 00 00',
    de: '000 0000000', gh: '000 000 0000', gi: '00000000', gr: '000 000 0000', gl: '00 00 00',
    gd: '(000) 000-0000', gp: '0 00 00 00 00', gu: '(000) 000-0000', gt: '0000 0000', gg: '0000 000000',
    gn: '000 00 00 00', gw: '000 0000', gy: '000 0000', ht: '00 00 0000', hn: '0000 0000', hk: '0000 0000',
    hu: '00 000 0000', is: '000 0000', in: '00000 00000', id: '000 0000 0000', ir: '000 000 0000',
    iq: '000 000 0000', ie: '00 000 0000', im: '00000 000000', il: '000 000 0000', it: '000 000 0000',
    jm: '(000) 000-0000', jp: '00-0000-0000', je: '0000 000000', jo: '0 0000 0000', kz: '(000) 000-00-00',
    ke: '000 000 000', ki: '00000', xk: '000 000 000', kw: '0000 0000', kg: '(000) 000-000',
    la: '00 00 000 000', lv: '00 000 000', lb: '00 000 000', ls: '0000 0000', lr: '000 000 0000',
    ly: '000 000 0000', li: '000 000 000', lt: '000 00000', lu: '000 000 000', mo: '0000 0000',
    mg: '00 00 000 00', mw: '000 00 00 00', my: '00-000 0000', mv: '000-0000', ml: '00 00 00 00',
    mt: '0000 0000', mh: '000 0000', mq: '0 00 00 00 00', mr: '00 00 00 00', mu: '0000 0000',
    yt: '0 00 00 00 00', mx: '000 000 0000', fm: '000 0000', md: '000 00 000', mc: '00 00 00 00 00',
    mn: '0000 0000', me: '000 000 000', ms: '(000) 000-0000', ma: '000 00 00 00', mz: '00 000 0000',
    mm: '0 000 000 000', na: '00 000 0000', nr: '000 0000', np: '000 000 0000', nl: '00 000 0000',
    nc: '00 00 00', nz: '000 000 0000', ni: '0000 0000', ne: '00 00 00 00', ng: '000 000 0000',
    nu: '000 0000', nf: '000 000', kp: '000 000 0000', mk: '000 000 000', mp: '(000) 000-0000',
    no: '000 00 000', om: '0000 0000', pk: '000 0000000', pw: '000 0000', ps: '000 000 0000',
    pa: '0000 0000', pg: '000 00 000', py: '000 000 000', pe: '000 000 000', ph: '000 000 0000',
    pl: '000 000 000', pt: '000 000 000', pr: '(000) 000-0000', qa: '0000 0000', ro: '000 000 000',
    ru: '(000) 000-00-00', rw: '000 000 000', re: '0 00 00 00 00', ws: '00 00000', sm: '0000 000000',
    sa: '00 000 0000', sn: '00 000 00 00', rs: '000 000 0000', sc: '0 00 00 00', sl: '000 00000',
    sg: '0000 0000', sx: '(000) 000-0000', sk: '000 000 000', si: '000 000 000', sb: '00 00000',
    so: '0 00 000 000', za: '000 000 0000', kr: '000 0000 0000', ss: '000 000 000', es: '000 000 000',
    lk: '000 000 0000', bl: '0 00 00 00 00', sh: '00000', kn: '(000) 000-0000', lc: '(000) 000-0000',
    mf: '0 00 00 00 00', pm: '00 00 00', vc: '(000) 000-0000', sd: '000 000 0000', sr: '000-0000',
    sj: '000 00 000', se: '000 000 00 00', ch: '000 000 00 00', sy: '000 000 0000', st: '000 0000',
    tw: '0000 000 000', tj: '(000) 000-000', tz: '000 000 000', th: '000 000 0000', tl: '000 00000',
    tg: '00 00 00 00', tk: '0000', to: '00000', tt: '(000) 000-0000', tn: '00 000 000',
    tr: '(000) 000-00-00', tm: '0 00-00-00-00', tc: '(000) 000-0000', tv: '00000', vi: '(000) 000-0000',
    ug: '000 000 000', ua: '(00) 000-00-00', ae: '00 000 0000', gb: '00000 000000', us: '(000) 000-0000',
    uy: '0 000 00 00', uz: '00 000-00-00', vu: '000 0000', va: '000 000 0000', ve: '0000 0000000',
    vn: '000 000 00 00', wf: '00 00 00', eh: '000 00 00 00', ye: '000 000 000', zm: '00 000 0000',
    zw: '00 000 0000', ax: '000 0000000', default: '000000000000000'
  };

  function getMaskForCountry(iso2) {
    return MASKS[iso2] || MASKS.default;
  }

  function applyMask(iso2, clearValue) {
    if (maskInstance) {
      maskInstance.destroy();
      maskInstance = null;
    }
    input.value = '';
    var maskPattern = getMaskForCountry(iso2);
    var opts = {
      mask: maskPattern,
      lazy: false,
      placeholderChar: '0',
      prepare: function (str) {
        return str.replace(/\D/g, '');
      },
      overwrite: true
    };
    maskInstance = window.IMask ? IMask(input, opts) : null;
    if (maskInstance) {
      if (clearValue !== false) {
        maskInstance.value = '';
      }
      function updateSkeletonClass() {
        var raw = maskInstance.unmaskedValue || '';
        input.classList.toggle('phone-skeleton-empty', raw.length === 0);
      }
      maskInstance.on('accept', updateSkeletonClass);
      updateSkeletonClass();
    }
  }

  if (!window.intlTelInput) {
    return;
  }

  var iti = window.intlTelInput(input, {
    initialCountry: 'kz',
    countryOrder: ['kz', 'ru', 'kg', 'uz'],
    separateDialCode: true,
    countrySearch: true,
    formatAsYouType: false,
    formatOnDisplay: false,
    loadUtils: function () {
      return import('https://cdn.jsdelivr.net/npm/intl-tel-input@19/build/js/utils.js');
    }
  });

  function updateDialCodeDisplay() {
    var itiEl = input.closest('.iti');
    if (!itiEl) return;
    var data = iti.getSelectedCountryData();
    var code = data && data.dialCode ? '+' + data.dialCode : '';
    var dialEl = itiEl.querySelector('.iti__selected-dial-code');
    if (!dialEl) {
      var flagContainer = itiEl.querySelector('.iti__selected-flag');
      if (flagContainer) {
        dialEl = document.createElement('span');
        dialEl.className = 'iti__selected-dial-code phone-dial-code';
        dialEl.setAttribute('aria-hidden', 'true');
        flagContainer.appendChild(dialEl);
      }
    }
    if (dialEl) {
      dialEl.textContent = code;
      dialEl.style.display = code ? '' : 'none';
    }
  }

  function initMaskAndForm() {
    applyMask(iti.getSelectedCountryData().iso2);
    updateDialCodeDisplay();

    input.addEventListener('countrychange', function () {
      updateDialCodeDisplay();
      applyMask(iti.getSelectedCountryData().iso2);
      setTimeout(function () {
        if (maskInstance) {
          maskInstance.value = '';
          input.classList.add('phone-skeleton-empty');
        }
      }, 0);
    });

    form.addEventListener('submit', function (e) {
      var valid = typeof iti.isValidNumber === 'function' ? iti.isValidNumber() : true;
      if (fieldPhone) {
        fieldPhone.classList.remove('is-error');
        if (!valid) {
          e.preventDefault();
          fieldPhone.classList.add('is-error');
          input.focus();
          setTimeout(function () {
            fieldPhone.classList.remove('is-error');
          }, 3000);
          return;
        }
        hiddenFull.value = (typeof iti.getNumber === 'function' ? iti.getNumber() : '') || '';
      }
    });
  }

  if (iti.promise) {
    iti.promise.then(initMaskAndForm).catch(function () {
      applyMask('kz');
      initMaskAndForm();
    });
  } else {
    applyMask('kz');
    initMaskAndForm();
  }
})();
