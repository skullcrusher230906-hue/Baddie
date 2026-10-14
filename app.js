/**
 * GetBaddie ♡ - Core Application Logic
 * Interactive Navigation, Swipe Engine, Real-Time Chat Simulation,
 * Web Audio Ambient Synthesizer, and Modal Controllers.
 */

// Application State
const state = {
  activeView: 'home',
  currentCardIndex: 0,
  isDragging: false,
  dragStartX: 0,
  dragCurrentX: 0,
  activeChatPartner: 'mia',
  soundEnabled: false,
  audioContext: null,
  ambientOscillators: []
};

// Baddie Profiles Data
const profiles = [
  {
    id: 'mia',
    name: 'Mia',
    age: 22,
    location: 'Downtown • 3 miles away',
    bio: 'good girls like bad dates ♡ late night drives, rooftop cocktails, techno & chaos. not here for boring conversations.',
    tags: ['Nightlife', 'Techno', 'Rooftop Bars', 'Late Drives', 'Real Vibes'],
    image: 'assets/images/profile-mia.jpg',
    verified: true,
    vibeScore: '98% Match'
  },
  {
    id: 'zara',
    name: 'Zara',
    age: 23,
    location: 'Westside • 5 miles away',
    bio: 'high standards & higher heels 🍸 velvet lounges, contemporary art, unapologetic energy. show me you can keep up.',
    tags: ['Aesthetic', 'Velvet Lounge', 'Cocktails', 'Art Galleries', 'No Rules'],
    image: 'assets/images/profile-zara.jpg',
    verified: true,
    vibeScore: '95% Match'
  },
  {
    id: 'elena',
    name: 'Elena',
    age: 24,
    location: 'SoHo • 2 miles away',
    bio: 'silk camis, 3am deep talks, spicy margaritas & undeniable chemistry. match my energy or watch from afar ♡',
    tags: ['3AM Talks', 'Chemistry', 'Sultry', 'Spicy Margaritas', 'VIP'],
    image: 'assets/images/profile-elena.jpg',
    verified: true,
    vibeScore: '99% Match'
  },
  {
    id: 'sienna',
    name: 'Sienna',
    age: 23,
    location: 'Midtown • 4 miles away',
    bio: 'built for baddies, by a baddie. spontaneous weekend trips, dark aesthetic, confidence always. real people only.',
    tags: ['Confidence', 'Spontaneous', 'Good Vibes', 'Travel'],
    image: 'assets/images/polaroid-baddie.jpg',
    verified: true,
    vibeScore: '94% Match'
  }
];

// Chat History Store
const chatHistories = {
  mia: [
    { sender: 'partner', text: 'Hey there... loved your vibe. Are you always this spontaneous? ♡', time: '10:42 PM' },
    { sender: 'user', text: 'Only when the chemistry is right.', time: '10:44 PM' },
    { sender: 'partner', text: 'Good answer. What is your go-to late night spot in the city? 🍸', time: '10:45 PM' }
  ],
  zara: [
    { sender: 'partner', text: 'Bold move matching with me. Think you can handle the chaos? ♡', time: 'Yesterday' }
  ],
  elena: [
    { sender: 'partner', text: '3am talks or rooftop drinks tonight? Choose wisely. ✨', time: '8:30 PM' }
  ]
};

// Response generators for simulated replies
const baddieResponses = [
  "You definitely match my energy. What time are we meeting up? ♡",
  "Mmm, I like confidence. Tell me your favorite song to drive to at midnight.",
  "Haha okay you passed the vibe check! Now don't disappoint on our first date 🍸",
  "Late night conversations are dangerous with me... ready for it? ♡",
  "Real chemistry only. Let's skip the small talk and grab drinks this week.",
  "You're cute. Let's see if your playlist is as good as your taste in baddies."
];

/* ==========================================================================
   Sound Synthesis (Web Audio API - Zero External Dependencies)
   ========================================================================== */
function playSynthSound(type) {
  try {
    const ctx = state.audioContext || new (window.AudioContext || window.webkitAudioContext)();
    state.audioContext = ctx;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'like') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'match') {
      // Arpeggio chord for match
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const chordOsc = ctx.createOscillator();
        const chordGain = ctx.createGain();
        chordOsc.type = 'triangle';
        chordOsc.frequency.setValueAtTime(freq, now + i * 0.08);
        chordGain.gain.setValueAtTime(0.12, now + i * 0.08);
        chordGain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
        chordOsc.connect(chordGain);
        chordGain.connect(ctx.destination);
        chordOsc.start(now + i * 0.08);
        chordOsc.stop(now + i * 0.08 + 0.45);
      });
    } else if (type === 'message') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'dislike') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.15);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    }
  } catch (e) {
    console.log("Audio notice:", e);
  }
}

// Ambient Chill Synth Toggle
function toggleAmbientVibe() {
  const btn = document.getElementById('vibeSoundBtn');
  if (!state.soundEnabled) {
    try {
      const ctx = state.audioContext || new (window.AudioContext || window.webkitAudioContext)();
      state.audioContext = ctx;
      if (ctx.state === 'suspended') ctx.resume();

      // Lush dreamy pad chords (C# minor / E major moody aesthetic)
      const freqs = [138.59, 277.18, 329.63, 415.30];
      state.ambientOscillators = freqs.map(freq => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.value = freq;

        filter.type = 'lowpass';
        filter.frequency.value = 420;

        gain.gain.setValueAtTime(0.025, ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        return { osc, gain };
      });

      state.soundEnabled = true;
      btn.classList.add('playing');
      btn.innerHTML = '🎵 Playing Night Vibe ♡';
      showToast('✨ Night Vibe Ambient Pad playing');
    } catch (e) {
      console.log('Audio init:', e);
    }
  } else {
    // Stop ambient
    state.ambientOscillators.forEach(({ osc, gain }) => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.0001, state.audioContext.currentTime + 0.4);
        setTimeout(() => osc.stop(), 400);
      } catch (err) {}
    });
    state.ambientOscillators = [];
    state.soundEnabled = false;
    btn.classList.remove('playing');
    btn.innerHTML = '🎵 Ambient Vibe';
    showToast('Ambient audio paused');
  }
}

/* ==========================================================================
   Navigation & View Routing
   ========================================================================== */
function switchView(viewName) {
  // Views: 'home', 'explore', 'matches', 'messages'
  state.activeView = viewName;

  // Toggle main sections
  const homeView = document.getElementById('homeView');
  const exploreView = document.getElementById('exploreView');
  const matchesView = document.getElementById('matchesView');
  const messagesView = document.getElementById('messagesView');

  if (homeView) homeView.style.display = viewName === 'home' ? 'block' : 'none';
  if (exploreView) {
    exploreView.style.display = viewName === 'explore' ? 'block' : 'none';
    if (viewName === 'explore') exploreView.classList.add('active-view');
  }
  if (matchesView) {
    matchesView.style.display = viewName === 'matches' ? 'block' : 'none';
    if (viewName === 'matches') matchesView.classList.add('active-view');
  }
  if (messagesView) {
    messagesView.style.display = viewName === 'messages' ? 'block' : 'none';
    if (viewName === 'messages') messagesView.classList.add('active-view');
  }

  // Update Nav Active Links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.target === viewName);
  });

  // Update URL hash without reload
  if (window.location.hash !== `#${viewName}`) {
    history.pushState(null, '', `#${viewName}`);
  }

  // Smooth scroll to top of view
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Mobile menu close
  const mainNav = document.getElementById('mainNav');
  if (mainNav) mainNav.classList.remove('mobile-open');

  // Trigger specialized view renders
  if (viewName === 'explore') {
    renderCardStack();
  } else if (viewName === 'matches') {
    renderMatchesList();
  } else if (viewName === 'messages') {
    renderChatMessages();
  }
}

/* ==========================================================================
   Explore / Swipe Card Engine
   ========================================================================== */
function renderCardStack() {
  const stack = document.getElementById('swipeCardStack');
  if (!stack) return;

  stack.innerHTML = '';
  const remainingProfiles = profiles.slice(state.currentCardIndex);

  if (remainingProfiles.length === 0) {
    stack.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; text-align:center; padding:30px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px dashed var(--pink-neon);">
        <span style="font-size:3.5rem; margin-bottom:12px;">👑</span>
        <h3 style="font-family:var(--font-script); font-size:2.4rem; color:var(--pink-neon); margin-bottom:8px;">You've seen all nearby baddies!</h3>
        <p style="color:var(--text-dim); margin-bottom:20px;">Check back later or explore new vibe zones.</p>
        <button class="btn-join" onclick="state.currentCardIndex = 0; renderCardStack();">Refresh Stack ♡</button>
      </div>
    `;
    return;
  }

  // Render top 3 cards in stack for 3D depth
  remainingProfiles.slice(0, 3).forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'swipe-card';
    card.dataset.id = p.id;

    // 3D Stacking Transform
    const scale = 1 - idx * 0.04;
    const translateY = idx * 12;
    card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    card.style.zIndex = 30 - idx;
    card.style.opacity = idx === 0 ? '1' : `${0.8 - idx * 0.2}`;

    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="swipe-card-gradient"></div>
      
      <div class="card-badge like">LIKE ♡</div>
      <div class="card-badge nope">NOPE ✕</div>
      <div class="card-badge super">SUPER ★</div>
      
      <div class="swipe-card-info">
        <div class="card-user-row">
          <span class="card-user-name">${p.name}</span>
          <span class="card-user-age">${p.age}</span>
          ${p.verified ? '<span class="card-verified-badge" title="Verified Baddie">✓</span>' : ''}
        </div>
        <div style="font-size:0.82rem; color:var(--pink-light); margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          <span>📍</span> ${p.location}
        </div>
        <p class="card-bio">${p.bio}</p>
        <div class="card-tag-chips">
          ${p.tags.map(t => `<span class="card-chip">${t}</span>`).join('')}
        </div>
      </div>
    `;

    // Attach drag events to the top card only
    if (idx === 0) {
      initCardDrag(card, p);
    }

    stack.appendChild(card);
  });
}

function initCardDrag(card, profile) {
  let isDown = false;
  let startX = 0;
  let currentX = 0;

  const onStart = (clientX) => {
    isDown = true;
    startX = clientX;
    card.style.transition = 'none';
  };

  const onMove = (clientX) => {
    if (!isDown) return;
    currentX = clientX;
    const deltaX = currentX - startX;
    const rotation = deltaX * 0.08;

    card.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;

    // Badges visibility
    const likeBadge = card.querySelector('.card-badge.like');
    const nopeBadge = card.querySelector('.card-badge.nope');

    if (deltaX > 20) {
      const opacity = Math.min(deltaX / 100, 1);
      likeBadge.style.opacity = opacity;
      nopeBadge.style.opacity = 0;
    } else if (deltaX < -20) {
      const opacity = Math.min(Math.abs(deltaX) / 100, 1);
      nopeBadge.style.opacity = opacity;
      likeBadge.style.opacity = 0;
    } else {
      likeBadge.style.opacity = 0;
      nopeBadge.style.opacity = 0;
    }
  };

  const onEnd = () => {
    if (!isDown) return;
    isDown = false;
    card.style.transition = 'transform 0.35s ease, opacity 0.35s ease';

    const deltaX = currentX - startX;
    if (deltaX > 110) {
      triggerCardAction('like', profile);
    } else if (deltaX < -110) {
      triggerCardAction('dislike', profile);
    } else {
      // Snap back
      card.style.transform = 'scale(1) translateY(0px)';
      card.querySelectorAll('.card-badge').forEach(b => b.style.opacity = 0);
    }
  };

  // Mouse listeners
  card.addEventListener('mousedown', (e) => onStart(e.clientX));
  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', onEnd);

  // Touch listeners
  card.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
  window.addEventListener('touchend', onEnd);
}

function triggerCardAction(action, profileOverride) {
  const currentProfile = profileOverride || profiles[state.currentCardIndex];
  if (!currentProfile) return;

  const stack = document.getElementById('swipeCardStack');
  const topCard = stack ? stack.querySelector('.swipe-card') : null;

  if (topCard) {
    topCard.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease';

    if (action === 'like') {
      playSynthSound('like');
      topCard.style.transform = 'translateX(600px) rotate(30deg)';
      topCard.style.opacity = '0';
      showToast(`Liked ${currentProfile.name} ♡`);

      // 60% chance of an instant match popup!
      setTimeout(() => {
        showMatchPopup(currentProfile);
      }, 350);

    } else if (action === 'dislike') {
      playSynthSound('dislike');
      topCard.style.transform = 'translateX(-600px) rotate(-30deg)';
      topCard.style.opacity = '0';
      showToast(`Passed on ${currentProfile.name}`);

    } else if (action === 'superlike') {
      playSynthSound('match');
      topCard.style.transform = 'translateY(-600px) scale(1.1)';
      topCard.style.opacity = '0';
      showToast(`Superliked ${currentProfile.name}! ★`);
      setTimeout(() => {
        showMatchPopup(currentProfile);
      }, 350);
    }

    setTimeout(() => {
      state.currentCardIndex++;
      renderCardStack();
    }, 300);
  }
}

/* ==========================================================================
   Match Modal Trigger
   ========================================================================== */
function showMatchPopup(profile) {
  playSynthSound('match');
  const modal = document.getElementById('matchModal');
  const partnerPhoto = document.getElementById('matchPartnerPhoto');
  const partnerName = document.getElementById('matchPartnerName');

  if (partnerPhoto) partnerPhoto.src = profile.image;
  if (partnerName) partnerName.textContent = profile.name;

  if (modal) {
    modal.classList.add('active');
  }

  // Ensure conversation exists
  if (!chatHistories[profile.id]) {
    chatHistories[profile.id] = [
      { sender: 'partner', text: `Hey... It's a match! What caught your eye? ♡`, time: 'Just now' }
    ];
  }
}

function closeMatchModal() {
  const modal = document.getElementById('matchModal');
  if (modal) modal.classList.remove('active');
}

function openChatFromMatch() {
  closeMatchModal();
  const currentProfile = profiles[state.currentCardIndex - 1] || profiles[0];
  state.activeChatPartner = currentProfile.id;
  switchView('messages');
}

/* ==========================================================================
   Matches Grid View
   ========================================================================== */
function renderMatchesList() {
  const grid = document.getElementById('matchesGrid');
  if (!grid) return;

  grid.innerHTML = profiles.map(p => `
    <div class="match-card">
      <div class="match-photo-wrap">
        <img src="${p.image}" alt="${p.name}">
        <div class="match-photo-overlay"></div>
        <div class="match-status-indicator">
          <span class="status-dot"></span> Online
        </div>
      </div>
      <div class="match-card-body">
        <div class="match-header-row">
          <span class="match-name">${p.name}, ${p.age}</span>
          <span class="match-vibe-score">${p.vibeScore}</span>
        </div>
        <p class="match-bio-snip">${p.bio.substring(0, 68)}...</p>
        <button class="btn-chat-now" onclick="startChatWith('${p.id}')">
          <span>💬</span> Chat with ${p.name}
        </button>
      </div>
    </div>
  `).join('');
}

function startChatWith(partnerId) {
  state.activeChatPartner = partnerId;
  switchView('messages');
}

/* ==========================================================================
   Interactive Direct Messenger
   ========================================================================== */
function renderChatMessages() {
  const partner = profiles.find(p => p.id === state.activeChatPartner) || profiles[0];
  const history = chatHistories[partner.id] || [];

  // Update header info
  const partnerAvatar = document.getElementById('chatPartnerAvatar');
  const partnerName = document.getElementById('chatPartnerName');
  if (partnerAvatar) partnerAvatar.src = partner.image;
  if (partnerName) partnerName.textContent = `${partner.name}, ${partner.age}`;

  // Update conversation sidebar active state
  document.querySelectorAll('.conv-item').forEach(item => {
    item.classList.toggle('active', item.dataset.id === partner.id);
  });

  // Render messages
  const msgScroll = document.getElementById('chatMessagesScroll');
  if (!msgScroll) return;

  msgScroll.innerHTML = history.map(msg => `
    <div class="msg-bubble ${msg.sender}">
      ${msg.text}
      <div class="msg-timestamp">${msg.time}</div>
    </div>
  `).join('');

  // Scroll to bottom
  msgScroll.scrollTop = msgScroll.scrollHeight;
}

function sendChatMessage(textOverride) {
  const input = document.getElementById('chatInput');
  const text = (textOverride || (input ? input.value : '')).trim();

  if (!text) return;

  const partnerId = state.activeChatPartner;
  if (!chatHistories[partnerId]) chatHistories[partnerId] = [];

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add User Message
  chatHistories[partnerId].push({
    sender: 'user',
    text: text,
    time: nowTime
  });

  playSynthSound('message');
  if (input) input.value = '';
  renderChatMessages();

  // Simulate Baddie Response with typing indicator
  const typingIndicator = document.getElementById('typingIndicator');
  const partner = profiles.find(p => p.id === partnerId);

  if (typingIndicator) {
    typingIndicator.textContent = `${partner.name} is typing... ♡`;
    typingIndicator.style.display = 'block';
    const msgScroll = document.getElementById('chatMessagesScroll');
    if (msgScroll) msgScroll.scrollTop = msgScroll.scrollHeight;
  }

  setTimeout(() => {
    if (typingIndicator) typingIndicator.style.display = 'none';

    // Pick dynamic response
    const randomReply = baddieResponses[Math.floor(Math.random() * baddieResponses.length)];

    chatHistories[partnerId].push({
      sender: 'partner',
      text: randomReply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    playSynthSound('message');
    renderChatMessages();

    // Update sidebar preview
    const convPreview = document.getElementById(`preview-${partnerId}`);
    if (convPreview) convPreview.textContent = randomReply;
  }, 1400);
}

/* ==========================================================================
   Modals & Toasts
   ========================================================================== */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>♡</span> <div>${message}</div>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ==========================================================================
   Init & Event Listeners
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  // Hash Routing
  const initialHash = window.location.hash.replace('#', '');
  if (['home', 'explore', 'matches', 'messages'].includes(initialHash)) {
    switchView(initialHash);
  } else {
    switchView('home');
  }

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'explore', 'matches', 'messages'].includes(hash)) {
      switchView(hash);
    }
  });

  // Nav link click events
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      switchView(target);
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('mobile-open');
    });
  }

  // Explore Action Buttons
  const btnDislike = document.getElementById('btnDislike');
  const btnLike = document.getElementById('btnLike');
  const btnSuperlike = document.getElementById('btnSuperlike');

  if (btnDislike) btnDislike.addEventListener('click', () => triggerCardAction('dislike'));
  if (btnLike) btnLike.addEventListener('click', () => triggerCardAction('like'));
  if (btnSuperlike) btnSuperlike.addEventListener('click', () => triggerCardAction('superlike'));

  // Keyboard Navigation for Swipe
  window.addEventListener('keydown', (e) => {
    if (state.activeView !== 'explore') return;
    if (e.key === 'ArrowLeft') triggerCardAction('dislike');
    if (e.key === 'ArrowRight') triggerCardAction('like');
    if (e.key === 'ArrowUp') triggerCardAction('superlike');
  });

  // Chat message submit
  const sendBtn = document.getElementById('btnSendMsg');
  const chatInput = document.getElementById('chatInput');

  if (sendBtn) sendBtn.addEventListener('click', () => sendChatMessage());
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }

  // Icebreaker Chips
  document.querySelectorAll('.icebreaker-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      sendChatMessage(btn.dataset.text);
    });
  });

  // Join Form submit simulation
  const joinForm = document.getElementById('joinForm');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('joinModal');
      showToast('Welcome to GetBaddie! Vibe check passed ✓');
      playSynthSound('match');
      setTimeout(() => switchView('explore'), 400);
    });
  }

  // Login Form submit simulation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('loginModal');
      showToast('Logged in successfully ♡');
      playSynthSound('like');
      setTimeout(() => switchView('explore'), 400);
    });
  }

  // Ambient sound button
  const soundBtn = document.getElementById('vibeSoundBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', toggleAmbientVibe);
  }

  // Filter Tag Pills in Explore
  document.querySelectorAll('.filter-tag-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-tag-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      showToast(`Filtered by ${pill.textContent} ✨`);
    });
  });
});
