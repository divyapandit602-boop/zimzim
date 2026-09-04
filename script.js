/* zimzim / small, useful interactions */
(function () {
  'use strict';

  const vibeKey = 'zimzim-vibe';
  const draftKey = 'zimzim-generated-script';
  const defaultVibe = 'millennial';
  const vibeData = {
    alpha: { name: 'Alpha', color: '#d5a442' },
    millennial: { name: 'Millennial', color: '#bf725b' },
    genz: { name: 'Gen-Z', color: '#55705c' }
  };

  // Each vibe is a creative system, not just a colour theme. The local demo
  // generator uses these rules so the same notes become three different scripts.
  const vibeProfiles = {
    alpha: {
      name: 'Alpha',
      promise: 'sharp, future-facing and precise',
      englishHook: function (topic) { return 'Everyone is looking at ' + topic + '. Ask the sharper question: what is the system underneath?'; },
      hinglishHook: function (topic) { return topic + ' sab dekh rahe hain. But asli signal kya hai? Chalo isko thoda sharper banate hain.'; },
      hindiHook: function (topic) { return 'सब ' + topic + ' देख रहे हैं। लेकिन इसके पीछे का असली सिस्टम क्या है?'; },
      englishMiddle: function (notes) { return 'The interesting part is not the obvious result. It is the choice, pattern or small design decision behind it. ' + (notes || 'Show the thinking, not only the finished frame.') + ' That is where the useful insight lives.'; },
      hinglishMiddle: function (notes) { return 'Obvious cheez result hai. Interesting part woh choice hai jo uske peeche hui. ' + (notes || 'Final frame ke saath thinking bhi dikhao') + '. Isi detail mein real insight hai.'; },
      hindiMiddle: function (notes) { return 'दिलचस्प हिस्सा सिर्फ़ नतीजा नहीं, उसके पीछे का छोटा निर्णय है। ' + (notes || 'अंतिम फ्रेम के साथ सोचने का तरीका भी दिखाइए') + '। यहीं असली insight छुपी है।'; },
      englishClose: 'Build the version only you could make. Then make the next move.',
      hinglishClose: 'Jo sirf aap bana sakte ho, wahi banao. Next move kya hai?',
      hindiClose: 'जो सिर्फ़ आप बना सकते हैं, वही बनाइए। अगला कदम क्या होगा?',
      visual: 'Open with a clean, specific detail. Use quick cuts, intentional text and one strong visual idea.',
      direction: 'Keep the edit lean, the point specific and the first frame impossible to misunderstand.'
    },
    millennial: {
      name: 'Millennial',
      promise: 'warm, rooted and human',
      englishHook: function (topic) { return 'There is a story hiding inside ' + topic + '. It starts with one familiar detail.'; },
      hinglishHook: function (topic) { return topic + ' ke andar ek chhoti si story chhupi hai. Aur woh story yahin se start hoti hai.'; },
      hindiHook: function (topic) { return topic + ' के अंदर एक कहानी छुपी है। शुरुआत एक छोटी, जानी-पहचानी बात से होती है।'; },
      englishMiddle: function (notes) { return 'Today I worked on this and noticed something simple: ' + (notes || 'the details we almost skip are usually the story') + '. Before making it perfect, let it stay personal.'; },
      hinglishMiddle: function (notes) { return 'Aaj ispe kaam karte hue mujhe ek cheez samajh aayi — ' + (notes || 'jo chhoti detail hum skip kar dete hain, wahi story ko real banati hai') + '. Perfect banane se pehle ise apna rehne do.'; },
      hindiMiddle: function (notes) { return 'आज इस पर काम करते हुए एक बात साफ़ हुई — ' + (notes || 'जिस छोटी बात को हम छोड़ देते हैं, वही कहानी को अपना बनाती है') + '। इसे perfect बनाने से पहले इसे अपना रहने दीजिए।'; },
      englishClose: 'Keep the detail that feels like home. That is the part people remember.',
      hinglishClose: 'Jo detail ghar jaisi feel hoti hai, usse rehne do. Wahi yaad rehti hai.',
      hindiClose: 'जो बात घर जैसी लगे, उसे रहने दीजिए। वही सबसे ज़्यादा याद रहती है।',
      visual: 'Begin with a lived-in close-up: a hand, a street, a familiar sound. Let the cut breathe before the voice enters.',
      direction: 'Keep the delivery conversational, the colours warm and one honest detail at the centre.'
    },
    genz: {
      name: 'Gen-Z',
      promise: 'fast, culture-forward and scroll-stopping',
      englishHook: function (topic) { return topic + '? Wait. This is the part nobody puts on the feed.'; },
      hinglishHook: function (topic) { return topic + '? Wait, feed pe jo nahi dikhate na — asli story woh hai.'; },
      hindiHook: function (topic) { return topic + '? रुकिए। असली कहानी वो है जो feed पर कोई नहीं दिखाता।'; },
      englishMiddle: function (notes) { return 'No long intro. Just the real bit: ' + (notes || 'the tiny detail that made the whole thing click') + '. Flip the expectation, show the proof and keep the cut moving.'; },
      hinglishMiddle: function (notes) { return 'Long intro nahi. Seedha real bit: ' + (notes || 'woh tiny detail jisse poora scene click hua') + '. Expectation flip karo, proof dikhao, cut moving rakho.'; },
      hindiMiddle: function (notes) { return 'लंबा intro नहीं। सीधी असली बात: ' + (notes || 'वो छोटी detail जिसने पूरा scene बदल दिया') + '। उम्मीद को पलटिए, proof दिखाइए और cut को moving रखिए।'; },
      englishClose: 'Save this. Try it your way. Then send it to the friend who needs the nudge.',
      hinglishClose: 'Isse save karo. Apne style mein try karo. Aur us friend ko bhejo jise nudge chahiye.',
      hindiClose: 'इसे save कीजिए, अपने style में आज़माइए और उस दोस्त को भेजिए जिसे इसकी ज़रूरत है।',
      visual: 'Start on movement or a bold on-screen line. Cut fast, use real texture and land on a comment-worthy final frame.',
      direction: 'Keep the sentences short, the visual language alive and the payoff inside the first few beats.'
    }
  };

  const getVibe = function () {
    try { return localStorage.getItem(vibeKey) || defaultVibe; } catch (error) { return defaultVibe; }
  };

  const setVibe = function (vibe) {
    try { localStorage.setItem(vibeKey, vibe); } catch (error) { /* storage is optional */ }
  };

  const escapeHTML = function (value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character];
    });
  };

  const goTo = function (url) {
    if (!url) return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { window.location.href = url; return; }
    document.body.classList.add('is-leaving');
    window.setTimeout(function () { window.location.href = url; }, 390);
  };

  const showToast = function (message) {
    const toast = document.querySelector('.toast');
    if (!toast) return;
    const messageNode = toast.querySelector('.toast-message');
    if (messageNode) messageNode.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () { toast.classList.remove('is-visible'); }, 2800);
  };

  const initTransitions = function () {
    document.querySelectorAll('[data-transition]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        const target = link.getAttribute('href');
        if (!target || target.startsWith('#') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        goTo(target);
      });
    });
  };

  const initVibeSelection = function () {
    const cards = document.querySelectorAll('[data-vibe]');
    if (!cards.length) return;
    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        const vibe = card.getAttribute('data-vibe');
        if (!vibeData[vibe]) return;
        cards.forEach(function (item) { item.classList.remove('is-chosen'); });
        card.classList.add('is-chosen');
        setVibe(vibe);
        window.setTimeout(function () { goTo('content-studio.html'); }, 160);
      });
    });
  };

  const initVibeDisplay = function () {
    const key = getVibe();
    const selected = vibeData[key] || vibeData[defaultVibe];
    document.querySelectorAll('[data-vibe-name]').forEach(function (node) {
      node.textContent = selected.name;
    });
    document.querySelectorAll('[data-vibe-mode]').forEach(function (node) {
      node.textContent = selected.name + ' mode';
    });
    document.body.classList.add('vibe-mode-' + key);
    document.documentElement.style.setProperty('--active-vibe', selected.color);
    document.querySelectorAll('.vibe-chip i').forEach(function (dot) {
      dot.style.backgroundColor = selected.color;
      dot.style.boxShadow = '0 0 0 4px ' + selected.color + '1f';
    });
    document.querySelectorAll('[data-change-vibe]').forEach(function (button) {
      button.addEventListener('click', function () { goTo('vibe-selection.html'); });
    });
  };

  const formatNames = { reel: 'Instagram reel', carousel: 'carousel', youtube: 'YouTube short', caption: 'caption' };
  const templateFor = {
    reel: { hook: 'A strong first line can change everything.', label: 'HOOK / TURN / CLOSE' },
    carousel: { hook: 'Save this thought for the next time you feel stuck.', label: 'SLIDE 01 / SLIDE 02 / SLIDE 03' },
    youtube: { hook: 'Here is the part of the process nobody shows you.', label: 'OPEN / STORY / TAKEAWAY' },
    caption: { hook: 'A small note from the middle of making it.', label: 'OPEN / NOTE / INVITE' }
  };
  let generatedPlainText = '';

  const getTime = function () {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const composeScript = function (notes, format, language, tone, audience, duration) {
    const cleanNotes = notes.replace(/\s+/g, ' ').trim();
    const topic = cleanNotes ? cleanNotes.replace(/[.!?].*$/, '').slice(0, 105) : 'the thing you noticed today';
    const vibe = vibeData[getVibe()] || vibeData[defaultVibe];
    const profile = vibeProfiles[getVibe()] || vibeProfiles[defaultVibe];
    const who = audience || 'someone who needed this today';
    const toneLines = {
      warm: 'Keep the delivery close, generous and conversational.',
      bold: 'Let the pauses be confident. Say the useful thing early.',
      cinematic: 'Give the images room. Let the voiceover feel like a quiet reveal.',
      playful: 'Keep the cut quick, the language light and the last line memorable.'
    };
    const toneDirection = toneLines[tone] || toneLines.warm;
    const languageKey = language === 'hindi' ? 'hindi' : language === 'english' ? 'english' : 'hinglish';
    const hook = profile[languageKey + 'Hook'](topic);
    const middle = profile[languageKey + 'Middle'](cleanNotes);
    const close = profile[languageKey + 'Close'];
    const formatLabel = formatNames[format] || 'short video';
    const visual = format === 'carousel'
      ? 'Give every frame one clear idea. Keep the first frame quiet, direct and in this vibe.'
      : format === 'caption'
        ? 'Pair the line with one honest image. Let the thought breathe before the prompt.'
        : profile.visual;
    const runtime = duration === 'long' ? '60–90 sec' : duration === 'medium' ? '45–60 sec' : '30–45 sec';
    const vibeDirection = profile.name + ' mode / ' + profile.promise;
    generatedPlainText = [
      'zimzim AI / ' + formatLabel + ' / ' + vibeDirection,
      'HOOK\n' + hook,
      'BEAT 01 — OPEN\n[Visual] ' + visual + '\n[Voiceover] ' + hook,
      'BEAT 02 — TURN\n[Voiceover] ' + middle,
      'BEAT 03 — CLOSE\n[Voiceover] ' + close,
      'VIBE DIRECTION\n' + profile.direction,
      'DIRECTOR NOTE\n' + toneDirection + ' Shoot for ' + who + '. Suggested runtime: ' + runtime + '.'
    ].join('\n\n');
    return {
      hook: hook,
      middle: middle,
      close: close,
      visual: visual,
      direction: profile.direction,
      toneDirection: toneDirection,
      formatLabel: formatLabel,
      runtime: runtime,
      vibeName: vibe.name,
      vibePromise: profile.promise
    };
  };

  const renderScript = function (result) {
    const output = document.getElementById('script-output');
    if (!output) return;
    output.innerHTML = '<div class="generated-script">' +
      '<div class="script-block"><span class="script-block-label">HOOK / 00:00</span><p>' + escapeHTML(result.hook) + '</p></div>' +
      '<div class="script-block"><span class="script-block-label">BEAT 01 — OPEN</span><p class="script-body-copy"><b>[Visual]</b> ' + escapeHTML(result.visual) + '<br><br><b>[Voiceover]</b> ' + escapeHTML(result.hook) + '</p></div>' +
      '<div class="script-block"><span class="script-block-label">BEAT 02 — TURN</span><p class="script-body-copy">' + escapeHTML(result.middle) + '</p></div>' +
      '<div class="script-block"><span class="script-block-label">BEAT 03 — CLOSE</span><p>' + escapeHTML(result.close) + '</p></div>' +
      '<div class="script-block script-vibe-block"><span class="script-block-label">VIBE / ' + escapeHTML(result.vibeName) + ' MODE</span><p class="script-body-copy">Built for a ' + escapeHTML(result.vibePromise) + ' rhythm. ' + escapeHTML(result.direction) + '</p></div>' +
      '<p class="script-quick-note"><b>Director note:</b> ' + escapeHTML(result.toneDirection) + ' Suggested runtime: ' + escapeHTML(result.runtime) + '.</p>' +
      '</div>';
    output.classList.remove('output-empty');
    const status = document.getElementById('output-status');
    const time = document.getElementById('output-time');
    const format = document.getElementById('output-format');
    if (status) status.textContent = 'Ready to shoot · ' + result.vibeName + ' mode · ' + result.formatLabel;
    if (time) time.textContent = getTime();
    if (format) format.textContent = result.formatLabel.toLowerCase();
  };

  const initScriptLab = function () {
    const form = document.getElementById('script-form');
    const editor = document.getElementById('raw-notes');
    if (!form || !editor) return;
    let activeTone = 'warm';
    const sample = 'Maine aaj apni gali ke chai stall par ek short video shoot kiya. Mujhe laga ki chaiwala har customer ko naam se yaad rakhta hai, aur wahi uski community hai.';

    document.querySelectorAll('[data-tone]').forEach(function (button) {
      button.addEventListener('click', function () {
        document.querySelectorAll('[data-tone]').forEach(function (item) { item.classList.remove('is-selected'); });
        button.classList.add('is-selected');
        activeTone = button.getAttribute('data-tone') || 'warm';
      });
    });

    const generate = function (event) {
      if (event) event.preventDefault();
      const data = new FormData(form);
      const result = composeScript(
        String(data.get('notes') || ''),
        String(data.get('format') || 'reel'),
        String(data.get('language') || 'hinglish'),
        activeTone,
        String(data.get('audience') || ''),
        String(data.get('duration') || 'short')
      );
      renderScript(result);
      showToast('Your ready-to-shoot script is here.');
      const output = document.getElementById('script-output');
      if (output) output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };
    form.addEventListener('submit', generate);

    const fillFromZero = function () {
      if (!editor.value.trim()) {
        editor.value = 'Mujhe aaj ke din se ek simple, honest story banani hai. Maine notice kiya ki…';
        editor.focus();
        showToast('Start with one moment. zimzim will find the story.');
      } else {
        editor.value += (editor.value.endsWith(' ') ? '' : ' ') + 'Main chahta hoon ki log isse mehsoos karein…';
        editor.focus();
        showToast('Add the feeling you want people to leave with.');
      }
    };
    document.querySelectorAll('[data-not-sure]').forEach(function (button) { button.addEventListener('click', fillFromZero); });
    const sampleButton = document.querySelector('[data-use-sample]');
    if (sampleButton) sampleButton.addEventListener('click', function () { editor.value = sample; generate(); });

    const copyButton = document.querySelector('[data-copy-output]');
    if (copyButton) copyButton.addEventListener('click', function () {
      if (!generatedPlainText) { showToast('Generate a script first.'); return; }
      const done = function () { showToast('Script copied to clipboard.'); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(generatedPlainText).then(done).catch(done);
      else { const helper = document.createElement('textarea'); helper.value = generatedPlainText; document.body.appendChild(helper); helper.select(); try { document.execCommand('copy'); } catch (error) { /* no-op */ } helper.remove(); done(); }
    });
    const saveButton = document.querySelector('[data-save-output]');
    if (saveButton) saveButton.addEventListener('click', function () {
      if (!generatedPlainText) { showToast('Generate a script first.'); return; }
      try { localStorage.setItem(draftKey, generatedPlainText); } catch (error) { /* storage is optional */ }
      showToast('Script saved in your zimzim workspace.');
    });
  };

  const calendarEvents = {
    '2026-09-03': { title: 'Chai stall story', type: 'shoot' },
    '2026-09-08': { title: 'Edit / first cut', type: 'edit' },
    '2026-09-14': { title: 'Ganesh Utsav note', type: 'festival', festival: true },
    '2026-09-18': { title: 'Creator field note', type: 'shoot' },
    '2026-09-23': { title: 'Carousel publish', type: 'publish' },
    '2026-09-27': { title: 'Festival moodboard', type: 'festival', festival: true }
  };
  const calendarMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const eventColors = { shoot: '#bf725b', edit: '#3f594a', publish: '#554257', festival: '#d5a442' };
  const pad = function (number) { return String(number).padStart(2, '0'); };

  const initCalendar = function () {
    const grid = document.getElementById('calendar-grid');
    const title = document.getElementById('calendar-title');
    const dateInput = document.getElementById('shoot-date');
    if (!grid || !title || !dateInput) return;
    let viewDate = new Date(2026, 8, 1);
    let selectedKey = dateInput.value || '2026-09-03';
    let events = Object.assign({}, calendarEvents);
    try { events = Object.assign(events, JSON.parse(localStorage.getItem('zimzim-calendar-events') || '{}')); } catch (error) { /* default events remain */ }

    const updateSelected = function (key) {
      selectedKey = key;
      dateInput.value = key;
      const label = document.getElementById('calendar-selected-label');
      if (label) {
        const date = new Date(key + 'T12:00:00');
        label.textContent = pad(date.getDate()) + ' ' + calendarMonthNames[date.getMonth()].slice(0, 3);
      }
    };

    const render = function () {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      title.innerHTML = calendarMonthNames[month] + ' <span>' + year + '</span>';
      grid.innerHTML = '';
      const offset = (new Date(year, month, 1).getDay() + 6) % 7;
      const days = new Date(year, month + 1, 0).getDate();
      for (let emptyIndex = 0; emptyIndex < offset; emptyIndex += 1) {
        const empty = document.createElement('div');
        empty.className = 'calendar-day is-empty';
        empty.setAttribute('aria-hidden', 'true');
        grid.appendChild(empty);
      }
      for (let day = 1; day <= days; day += 1) {
        const key = year + '-' + pad(month + 1) + '-' + pad(day);
        const event = events[key];
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'calendar-day' + (key === selectedKey ? ' is-selected' : '') + (key === '2026-09-03' ? ' is-today' : '');
        cell.setAttribute('aria-label', event ? day + ', ' + event.title : String(day));
        const eventMarkup = event ? '<span class="day-event" style="--event-color:' + (eventColors[event.type] || eventColors.shoot) + '">' + escapeHTML(event.type) + '</span>' : '';
        const festivalMarkup = event && event.festival ? '<span class="day-festival">FESTIVAL</span>' : '';
        cell.innerHTML = '<span class="day-number">' + day + '</span>' + eventMarkup + festivalMarkup;
        cell.addEventListener('click', function () { updateSelected(key); render(); });
        grid.appendChild(cell);
      }
    };

    const saveEvents = function () { try { localStorage.setItem('zimzim-calendar-events', JSON.stringify(events)); } catch (error) { /* optional */ } };
    updateSelected(selectedKey);
    render();

    const previous = document.querySelector('[data-month-prev]');
    const next = document.querySelector('[data-month-next]');
    if (previous) previous.addEventListener('click', function () { viewDate.setMonth(viewDate.getMonth() - 1); render(); });
    if (next) next.addEventListener('click', function () { viewDate.setMonth(viewDate.getMonth() + 1); render(); });
    dateInput.addEventListener('change', function () { if (dateInput.value) { updateSelected(dateInput.value); const date = new Date(dateInput.value + 'T12:00:00'); viewDate = new Date(date.getFullYear(), date.getMonth(), 1); render(); } });

    const helper = document.getElementById('calendar-helper');
    const openHelper = function () { if (helper) { helper.classList.add('is-open'); helper.setAttribute('aria-hidden', 'false'); } };
    const closeHelper = function () { if (helper) { helper.classList.remove('is-open'); helper.setAttribute('aria-hidden', 'true'); } };
    document.querySelectorAll('[data-need-help]').forEach(function (button) { button.addEventListener('click', openHelper); });
    document.querySelectorAll('[data-close-help]').forEach(function (button) { button.addEventListener('click', closeHelper); });

    document.querySelectorAll('.helper-choice').forEach(function (group) {
      group.querySelectorAll('.choice').forEach(function (button) {
        button.addEventListener('click', function () { group.querySelectorAll('.choice').forEach(function (item) { item.classList.remove('is-selected'); }); button.classList.add('is-selected'); });
      });
    });

    const suggest = document.querySelector('[data-suggest-date]');
    if (suggest) suggest.addEventListener('click', function () {
      const dayChoice = document.querySelector('[data-helper-field="day"] .choice.is-selected');
      const paceChoice = document.querySelector('[data-helper-field="pace"] .choice.is-selected');
      const day = dayChoice ? dayChoice.getAttribute('data-value') : 'weekend';
      const pace = paceChoice ? paceChoice.getAttribute('data-value') : 'weekly';
      const base = new Date(2026, 8, 3, 12);
      let jump = pace === 'monthly' ? 21 : pace === 'fortnightly' ? 14 : 7;
      base.setDate(base.getDate() + jump);
      if (day === 'weekend') {
        while (base.getDay() !== 6) base.setDate(base.getDate() + 1);
      } else if (day === 'weekday') {
        while (base.getDay() === 0 || base.getDay() === 6) base.setDate(base.getDate() + 1);
      }
      const key = base.getFullYear() + '-' + pad(base.getMonth() + 1) + '-' + pad(base.getDate());
      updateSelected(key);
      viewDate = new Date(base.getFullYear(), base.getMonth(), 1);
      render();
      const result = document.getElementById('suggestion-result');
      if (result) result.textContent = 'A gentle starting point: ' + base.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) + '. You can move it anytime.';
      showToast('We found a gentle date to start with.');
    });

    const confirm = document.querySelector('[data-confirm-date]');
    if (confirm) confirm.addEventListener('click', function () { if (dateInput.value) { updateSelected(dateInput.value); const date = new Date(dateInput.value + 'T12:00:00'); viewDate = new Date(date.getFullYear(), date.getMonth(), 1); render(); showToast('Lovely. Your shoot date is held.'); } });
    const addShoot = document.querySelector('[data-add-shoot]');
    if (addShoot) addShoot.addEventListener('click', function () {
      const key = dateInput.value || selectedKey;
      events[key] = { title: 'Your shoot day', type: 'shoot' };
      saveEvents();
      const date = new Date(key + 'T12:00:00');
      viewDate = new Date(date.getFullYear(), date.getMonth(), 1);
      updateSelected(key);
      render();
      showToast('Shoot day added to your rhythm.');
    });
  };

  document.addEventListener('DOMContentLoaded', function () {
    initTransitions();
    initVibeSelection();
    initVibeDisplay();
    initScriptLab();
    initCalendar();
  });
}());
