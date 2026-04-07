// DSSD UVA Website - Full React Application
//
// IMAGES: All images below use placeholder URLs from unsplash.com
// To replace any image, find the <img src="..."> tag and swap the URL.
// Search terms used are noted in comments above each image usage.
//
// ICONS: Currently using inline SVG icons throughout.
// To replace icons, find comments like /* ICON: replace this SVG */
// and swap with your preferred icon library (e.g., Heroicons, Lucide).
//
// FONTS: Using Google Fonts - "DM Sans" (body) and "Playfair Display" (accents)
// To change fonts, update the <link> tag in the style block and the font-family CSS vars.

import { useState, useEffect, useRef } from "react";

// ─── GOOGLE FONTS + GLOBAL STYLES ───────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy: #0A1628;
      --blue: #1A3A6B;
      --mid-blue: #2557A7;
      --light-blue: #4A8FE7;
      --pale-blue: #EBF2FF;
      --white: #FFFFFF;
      --off-white: #F8FAFF;
      --gray-100: #F1F4FA;
      --gray-300: #CBD5E8;
      --gray-500: #8A9BC4;
      --gray-700: #3D4F72;
      --accent: #C8A45A;
      --font-sans: 'DM Sans', sans-serif;
      --font-serif: 'Cormorant Garamond', serif;
      --nav-h: 68px;
      --max-w: 1200px;
      --radius: 4px;
      --radius-lg: 10px;
    }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-sans);
      background: var(--white);
      color: var(--navy);
      line-height: 1.6;
      overflow-x: hidden;
    }

    a { color: inherit; text-decoration: none; }
    button { font-family: var(--font-sans); cursor: pointer; border: none; background: none; }
    input, textarea, select { font-family: var(--font-sans); }

    /* NAV */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      height: var(--nav-h);
      background: rgba(10,22,40,0.97);
      backdrop-filter: blur(12px);
      display: flex; align-items: center;
      border-bottom: 1px solid rgba(74,143,231,0.18);
      transition: background 0.3s;
    }
    .nav-inner {
      max-width: var(--max-w); margin: 0 auto; width: 100%;
      padding: 0 2rem;
      display: flex; align-items: center; justify-content: space-between;
    }
    .nav-logo {
      display: flex; align-items: center; gap: 10px; cursor: pointer;
    }
    .nav-logo-mark {
      width: 36px; height: 36px;
      background: var(--mid-blue);
      border-radius: 6px;
      display: flex; align-items: center; justify-content: center;
      font-weight: 600; font-size: 13px; color: white; letter-spacing: 0.5px;
    }
    .nav-logo-text {
      font-size: 15px; font-weight: 600; color: white; letter-spacing: 0.3px;
    }
    .nav-logo-sub {
      font-size: 10px; color: var(--gray-500); letter-spacing: 1px; text-transform: uppercase;
      display: block; margin-top: -2px;
    }
    .nav-links {
      display: flex; align-items: center; gap: 2px; list-style: none;
    }
    .nav-item {
      position: relative;
    }
    .nav-btn {
      padding: 6px 12px; border-radius: var(--radius);
      font-size: 13px; font-weight: 500; color: rgba(255,255,255,0.75);
      cursor: pointer; background: none; border: none;
      display: flex; align-items: center; gap: 4px;
      transition: color 0.2s, background 0.2s;
      white-space: nowrap;
    }
    .nav-btn:hover, .nav-btn.active { color: white; background: rgba(74,143,231,0.12); }
    .nav-btn svg { width: 10px; height: 10px; opacity: 0.6; }
    .dropdown {
      position: absolute; top: calc(100% + 8px); left: 0;
      background: var(--navy);
      border: 1px solid rgba(74,143,231,0.2);
      border-radius: var(--radius-lg);
      min-width: 200px;
      padding: 6px;
      opacity: 0; pointer-events: none; transform: translateY(-6px);
      transition: opacity 0.18s, transform 0.18s;
      z-index: 100;
      box-shadow: 0 16px 40px rgba(0,0,0,0.4);
    }
    .nav-item:hover .dropdown { opacity: 1; pointer-events: all; transform: translateY(0); }
    .dropdown-item {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 12px; border-radius: 6px;
      font-size: 13px; color: rgba(255,255,255,0.7);
      cursor: pointer; transition: background 0.15s, color 0.15s;
    }
    .dropdown-item:hover { background: rgba(74,143,231,0.12); color: white; }
    .dropdown-label {
      font-size: 10px; text-transform: uppercase; letter-spacing: 1.2px;
      color: var(--gray-500); padding: 6px 12px 2px;
    }
    .nav-apply-btn {
      padding: 7px 16px; border-radius: var(--radius);
      background: var(--mid-blue); color: white;
      font-size: 13px; font-weight: 500; border: none; cursor: pointer;
      transition: background 0.2s;
      white-space: nowrap;
    }
    .nav-apply-btn:hover { background: var(--light-blue); }

    /* HAMBURGER */
    .hamburger {
      display: none; flex-direction: column; gap: 5px; cursor: pointer;
      padding: 6px;
    }
    .hamburger span { display: block; width: 22px; height: 2px; background: white; border-radius: 2px; transition: all 0.3s; }

    /* PAGE */
    .page { min-height: 100vh; }

    /* SECTION UTILITIES */
    .section { padding: 96px 2rem; }
    .section-sm { padding: 60px 2rem; }
    .inner { max-width: var(--max-w); margin: 0 auto; }
    .section-label {
      font-size: 11px; text-transform: uppercase; letter-spacing: 2px;
      color: var(--mid-blue); font-weight: 600; margin-bottom: 12px;
    }
    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-family: var(--font-serif);
      font-weight: 600; line-height: 1.15;
      color: var(--navy);
    }
    .section-title-light {
      font-size: clamp(2rem, 4vw, 3rem);
      font-family: var(--font-serif);
      font-weight: 600; line-height: 1.15;
      color: var(--white);
    }
    .section-sub {
      font-size: 16px; color: var(--gray-700); line-height: 1.7;
      max-width: 560px; margin-top: 14px;
    }
    .section-sub-light {
      font-size: 16px; color: rgba(255,255,255,0.7); line-height: 1.7;
      max-width: 560px; margin-top: 14px;
    }

    /* BUTTONS */
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border-radius: var(--radius);
      background: var(--mid-blue); color: white;
      font-size: 14px; font-weight: 500; border: none; cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .btn-primary:hover { background: var(--light-blue); transform: translateY(-1px); }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 24px; border-radius: var(--radius);
      background: transparent; color: white;
      font-size: 14px; font-weight: 500;
      border: 1px solid rgba(255,255,255,0.35); cursor: pointer;
      transition: border-color 0.2s, background 0.2s, transform 0.15s;
    }
    .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.08); transform: translateY(-1px); }
    .btn-outline-dark {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 11px 24px; border-radius: var(--radius);
      background: transparent; color: var(--navy);
      font-size: 14px; font-weight: 500;
      border: 1px solid var(--gray-300); cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .btn-outline-dark:hover { border-color: var(--mid-blue); background: var(--pale-blue); }

    /* CARDS */
    .card {
      background: var(--white);
      border: 1px solid var(--gray-100);
      border-radius: var(--radius-lg);
      padding: 28px;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .card:hover { box-shadow: 0 8px 32px rgba(26,58,107,0.08); transform: translateY(-2px); }

    /* TAG */
    .tag {
      display: inline-block; padding: 3px 10px; border-radius: 20px;
      font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase;
    }
    .tag-blue { background: var(--pale-blue); color: var(--mid-blue); }
    .tag-gold { background: rgba(200,164,90,0.12); color: #8A6A25; }
    .tag-green { background: #EDFAF3; color: #1A6B40; }

    /* DIVIDER */
    .divider { height: 1px; background: var(--gray-100); margin: 0; }

    /* FOOTER */
    .footer {
      background: var(--navy);
      color: rgba(255,255,255,0.6);
      padding: 60px 2rem 32px;
    }
    .footer-inner { max-width: var(--max-w); margin: 0 auto; }
    .footer-grid {
      display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px;
      padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.08);
      margin-bottom: 32px;
    }
    .footer-brand-name { color: white; font-weight: 600; font-size: 16px; margin-bottom: 4px; }
    .footer-brand-sub { font-size: 12px; color: var(--gray-500); margin-bottom: 16px; }
    .footer-desc { font-size: 13px; line-height: 1.7; }
    .footer-col-title { color: white; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px; }
    .footer-link { display: block; font-size: 13px; margin-bottom: 8px; cursor: pointer; transition: color 0.2s; }
    .footer-link:hover { color: white; }
    .footer-bottom { display: flex; justify-content: space-between; align-items: center; font-size: 12px; }
    .social-links { display: flex; gap: 12px; margin-top: 16px; }
    .social-link {
      width: 32px; height: 32px; border-radius: 6px;
      background: rgba(255,255,255,0.06);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; transition: background 0.2s;
      color: rgba(255,255,255,0.5);
    }
    .social-link:hover { background: rgba(74,143,231,0.2); color: white; }

    /* HERO */
    .hero {
      min-height: 100vh;
      background: var(--navy);
      position: relative; overflow: hidden;
      display: flex; flex-direction: column; justify-content: center;
      padding: calc(var(--nav-h) + 60px) 2rem 80px;
    }
    .hero-bg {
      position: absolute; inset: 0; pointer-events: none;
    }
    .hero-grid-line {
      position: absolute; background: rgba(74,143,231,0.04);
    }
    .hero-orb {
      position: absolute; border-radius: 50%;
      background: radial-gradient(circle, rgba(37,87,167,0.25) 0%, transparent 70%);
    }
    .hero-content { position: relative; z-index: 1; max-width: var(--max-w); margin: 0 auto; width: 100%; }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 5px 12px; border-radius: 20px;
      background: rgba(74,143,231,0.1); border: 1px solid rgba(74,143,231,0.2);
      font-size: 12px; color: var(--light-blue); font-weight: 500;
      margin-bottom: 28px; letter-spacing: 0.3px;
    }
    .hero-title {
      font-size: clamp(2.8rem, 6vw, 5rem);
      font-family: var(--font-serif); font-weight: 600;
      color: white; line-height: 1.08;
      margin-bottom: 24px;
    }
    .hero-title em { color: var(--light-blue); font-style: italic; }
    .hero-sub {
      font-size: 17px; color: rgba(255,255,255,0.6);
      max-width: 520px; line-height: 1.7; margin-bottom: 40px;
    }
    .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
    .hero-stats {
      display: flex; gap: 40px; margin-top: 72px;
      padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08);
      flex-wrap: wrap;
    }
    .hero-stat-num {
      font-size: 2rem; font-weight: 600; color: white; font-family: var(--font-serif);
    }
    .hero-stat-label { font-size: 12px; color: var(--gray-500); margin-top: 2px; }

    /* GRID LAYOUTS */
    .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
    .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }

    /* FORM */
    .form-group { margin-bottom: 20px; }
    .form-label { display: block; font-size: 13px; font-weight: 500; color: var(--gray-700); margin-bottom: 6px; }
    .form-input {
      width: 100%; padding: 10px 14px; border-radius: var(--radius);
      border: 1px solid var(--gray-300); background: white;
      font-size: 14px; color: var(--navy);
      transition: border-color 0.2s;
      outline: none;
    }
    .form-input:focus { border-color: var(--mid-blue); }
    .form-textarea { resize: vertical; min-height: 100px; }
    .form-select { appearance: none; cursor: pointer; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%238A9BC4'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 32px; }

    /* CHATBOT */
    .chatbot-fab {
      position: fixed; bottom: 28px; right: 28px; z-index: 900;
      width: 52px; height: 52px; border-radius: 50%;
      background: var(--mid-blue); color: white;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 4px 20px rgba(26,58,107,0.35);
      border: none; transition: background 0.2s, transform 0.2s;
    }
    .chatbot-fab:hover { background: var(--light-blue); transform: scale(1.05); }
    .chatbot-window {
      position: fixed; bottom: 92px; right: 28px; z-index: 900;
      width: 340px; max-height: 460px;
      background: white; border-radius: var(--radius-lg);
      border: 1px solid var(--gray-100);
      box-shadow: 0 16px 48px rgba(10,22,40,0.15);
      display: flex; flex-direction: column; overflow: hidden;
    }
    .chatbot-header {
      background: var(--navy); padding: 14px 16px;
      display: flex; align-items: center; justify-content: space-between;
    }
    .chatbot-title { color: white; font-size: 14px; font-weight: 500; }
    .chatbot-sub { color: rgba(255,255,255,0.5); font-size: 11px; margin-top: 1px; }
    .chatbot-close { background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; font-size: 18px; line-height: 1; transition: color 0.2s; }
    .chatbot-close:hover { color: white; }
    .chatbot-messages { flex: 1; overflow-y: auto; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
    .chat-msg { max-width: 85%; }
    .chat-msg.bot { align-self: flex-start; }
    .chat-msg.user { align-self: flex-end; }
    .chat-bubble {
      padding: 9px 13px; border-radius: 12px;
      font-size: 13px; line-height: 1.5;
    }
    .chat-bubble.bot { background: var(--gray-100); color: var(--navy); border-bottom-left-radius: 4px; }
    .chat-bubble.user { background: var(--mid-blue); color: white; border-bottom-right-radius: 4px; }
    .chatbot-input-row { display: flex; padding: 10px 12px; border-top: 1px solid var(--gray-100); gap: 8px; }
    .chatbot-input {
      flex: 1; padding: 8px 12px; border-radius: 20px;
      border: 1px solid var(--gray-300); font-size: 13px; outline: none;
      transition: border-color 0.2s;
    }
    .chatbot-input:focus { border-color: var(--mid-blue); }
    .chatbot-send {
      width: 32px; height: 32px; border-radius: 50%;
      background: var(--mid-blue); border: none; cursor: pointer;
      display: flex; align-items: center; justify-content: center; color: white;
      flex-shrink: 0; transition: background 0.2s;
    }
    .chatbot-send:hover { background: var(--light-blue); }

    /* SEARCH BAR */
    .search-bar {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 16px; border-radius: var(--radius-lg);
      background: var(--gray-100); border: 1px solid var(--gray-100);
      transition: border-color 0.2s; max-width: 440px;
    }
    .search-bar:focus-within { border-color: var(--mid-blue); background: white; }
    .search-bar input { flex: 1; background: none; border: none; outline: none; font-size: 14px; color: var(--navy); }

    /* TEAM CARD */
    .team-card {
      text-align: center; padding: 28px 20px;
      border: 1px solid var(--gray-100); border-radius: var(--radius-lg);
      background: white; transition: box-shadow 0.2s, transform 0.2s;
    }
    .team-card:hover { box-shadow: 0 8px 32px rgba(26,58,107,0.08); transform: translateY(-2px); }
    /* ICON: Replace these team avatar images with actual team photos */
    .team-avatar {
      width: 80px; height: 80px; border-radius: 50%;
      background: var(--pale-blue);
      margin: 0 auto 16px;
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-serif); font-size: 28px; font-weight: 600;
      color: var(--mid-blue); overflow: hidden;
    }
    .team-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .team-name { font-size: 15px; font-weight: 600; color: var(--navy); }
    .team-role { font-size: 12px; color: var(--gray-500); margin-top: 3px; }

    /* FADE IN ANIMATION */
    .fade-up {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-up.visible { opacity: 1; transform: translateY(0); }

    /* MOBILE */
    @media (max-width: 768px) {
      .grid-3 { grid-template-columns: 1fr; }
      .grid-2 { grid-template-columns: 1fr; }
      .grid-4 { grid-template-columns: repeat(2, 1fr); }
      .footer-grid { grid-template-columns: 1fr 1fr; }
      .nav-links { display: none; }
      .hamburger { display: flex; }
      .chatbot-window { width: calc(100vw - 24px); right: 12px; }
      .hero-stats { gap: 24px; }
    }

    /* MOBILE NAV */
    .mobile-nav {
      position: fixed; inset: 0; z-index: 999;
      background: var(--navy);
      padding: calc(var(--nav-h) + 24px) 2rem 2rem;
      display: flex; flex-direction: column; gap: 8px;
      transform: translateX(100%); transition: transform 0.3s ease;
    }
    .mobile-nav.open { transform: translateX(0); }
    .mobile-nav-link {
      padding: 12px; border-radius: var(--radius);
      font-size: 15px; color: rgba(255,255,255,0.75);
      cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.06);
      transition: color 0.2s;
    }
    .mobile-nav-link:hover { color: white; }

    /* GALLERY */
    .gallery-main {
      position: relative; overflow: hidden;
      border-radius: var(--radius-lg);
      height: 480px; background: var(--navy);
    }
    .gallery-main img { width: 100%; height: 100%; object-fit: cover; transition: opacity 0.5s; }
    .gallery-caption {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 32px 28px 28px;
      background: linear-gradient(transparent, rgba(10,22,40,0.88));
    }
    .gallery-thumbs {
      display: flex; gap: 12px; overflow-x: auto;
      padding: 4px; margin-top: 16px;
      scrollbar-width: none;
    }
    .gallery-thumbs::-webkit-scrollbar { display: none; }
    .gallery-thumb {
      width: 100px; height: 66px; flex-shrink: 0;
      border-radius: 6px; overflow: hidden; cursor: pointer;
      border: 2px solid transparent; transition: border-color 0.2s, opacity 0.2s;
      opacity: 0.6;
    }
    .gallery-thumb img { width: 100%; height: 100%; object-fit: cover; }
    .gallery-thumb.active { border-color: var(--light-blue); opacity: 1; }
    .gallery-arrow {
      position: absolute; top: 50%; transform: translateY(-50%);
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: white; transition: background 0.2s;
      backdrop-filter: blur(4px);
    }
    .gallery-arrow:hover { background: rgba(255,255,255,0.22); }
    .gallery-arrow.prev { left: 16px; }
    .gallery-arrow.next { right: 16px; }

    /* PROJECT CARD */
    .proj-card {
      border: 1px solid var(--gray-100); border-radius: var(--radius-lg);
      overflow: hidden; background: white;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .proj-card:hover { box-shadow: 0 8px 32px rgba(26,58,107,0.08); transform: translateY(-2px); }
    .proj-card-img {
      height: 180px; overflow: hidden; background: var(--pale-blue);
      position: relative;
    }
    .proj-card-img img { width: 100%; height: 100%; object-fit: cover; }
    .proj-card-body { padding: 22px; }
    .proj-card-title { font-size: 16px; font-weight: 600; color: var(--navy); margin-bottom: 6px; }
    .proj-card-desc { font-size: 13px; color: var(--gray-700); line-height: 1.6; margin-bottom: 14px; }

    /* DARK SECTION */
    .dark-section { background: var(--navy); }
    .dark-section .section-label { color: var(--light-blue); }
    .dark-section p { color: rgba(255,255,255,0.65); }

    /* STAT ROW */
    .stat-box {
      padding: 32px 24px; text-align: center;
      border-right: 1px solid rgba(255,255,255,0.08);
    }
    .stat-box:last-child { border-right: none; }
    .stat-num { font-size: 2.8rem; font-family: var(--font-serif); font-weight: 600; color: white; line-height: 1; }
    .stat-label { font-size: 13px; color: var(--gray-500); margin-top: 6px; }

    /* TRACK CARD */
    .track-card {
      border: 1px solid var(--gray-100); border-radius: var(--radius-lg);
      overflow: hidden;
    }
    .track-header { padding: 24px; border-bottom: 1px solid var(--gray-100); }
    .track-icon {
      width: 44px; height: 44px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 14px;
    }
    /* ICON: Replace SVG icons in track cards with custom icons */
    .track-body { padding: 20px 24px; }
    .req-item { display: flex; gap: 10px; margin-bottom: 10px; font-size: 13px; color: var(--gray-700); }
    .req-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--mid-blue); margin-top: 7px; flex-shrink: 0; }

    /* PROCESS STEPS */
    .process-steps { display: flex; flex-direction: column; gap: 0; }
    .process-step { display: flex; gap: 24px; padding: 28px 0; border-bottom: 1px solid var(--gray-100); }
    .process-step:last-child { border-bottom: none; }
    .step-num {
      width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
      background: var(--pale-blue); color: var(--mid-blue);
      display: flex; align-items: center; justify-content: center;
      font-size: 15px; font-weight: 600; font-family: var(--font-serif);
    }
    .step-title { font-size: 16px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
    .step-desc { font-size: 14px; color: var(--gray-700); }
    .step-meta { font-size: 12px; color: var(--gray-500); margin-top: 4px; }

    /* DONATE */
    .donate-amount-btn {
      padding: 10px 20px; border-radius: var(--radius);
      border: 1px solid var(--gray-300); background: white;
      font-size: 15px; font-weight: 500; color: var(--navy); cursor: pointer;
      transition: all 0.15s;
    }
    .donate-amount-btn.selected { background: var(--mid-blue); border-color: var(--mid-blue); color: white; }
    .donate-amount-btn:hover:not(.selected) { border-color: var(--mid-blue); }

    /* FAQ */
    .faq-item { border-bottom: 1px solid var(--gray-100); }
    .faq-q {
      width: 100%; text-align: left; padding: 20px 0;
      display: flex; justify-content: space-between; align-items: center;
      font-size: 15px; font-weight: 500; color: var(--navy);
      background: none; border: none; cursor: pointer;
      transition: color 0.2s;
    }
    .faq-q:hover { color: var(--mid-blue); }
    .faq-a {
      overflow: hidden; max-height: 0;
      transition: max-height 0.35s ease, padding 0.2s;
    }
    .faq-a.open { max-height: 200px; padding-bottom: 16px; }
    .faq-a p { font-size: 14px; color: var(--gray-700); line-height: 1.7; }

    /* VALUES */
    .value-card {
      padding: 32px 28px; border-left: 3px solid var(--mid-blue);
      background: var(--off-white); border-radius: 0 var(--radius-lg) var(--radius-lg) 0;
    }
    .value-title { font-size: 17px; font-weight: 600; color: var(--navy); margin-bottom: 8px; }
    .value-desc { font-size: 14px; color: var(--gray-700); line-height: 1.6; }

    /* WHY JOIN */
    .why-item { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid var(--gray-100); }
    .why-item:last-child { border-bottom: none; }
    .why-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--pale-blue); flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
    /* ICON: Replace SVG icons in why-join section */
    .why-title { font-size: 15px; font-weight: 600; color: var(--navy); margin-bottom: 4px; }
    .why-desc { font-size: 14px; color: var(--gray-700); line-height: 1.6; }

    /* MOBILE NAV OVERLAY */
    .mobile-nav-overlay {
      position: fixed; inset: 0; z-index: 998;
      background: rgba(0,0,0,0.5);
    }

    /* CONTACT SPLIT */
    .contact-split { display: grid; grid-template-columns: 1fr 1.2fr; gap: 64px; align-items: start; }
    @media (max-width: 768px) { .contact-split { grid-template-columns: 1fr; } .contact-split { gap: 32px; } }

    /* SCROLL REVEAL */
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.show { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.1s; }
    .reveal-delay-2 { transition-delay: 0.2s; }
    .reveal-delay-3 { transition-delay: 0.3s; }

    /* PAGE HERO (non-home) */
    .page-hero {
      padding: calc(var(--nav-h) + 64px) 2rem 64px;
      background: var(--navy); position: relative; overflow: hidden;
    }
    .page-hero-inner { max-width: var(--max-w); margin: 0 auto; position: relative; z-index: 1; }
    .page-hero-title { font-size: clamp(2rem, 4vw, 3.2rem); font-family: var(--font-serif); font-weight: 600; color: white; line-height: 1.1; }
    .page-hero-sub { font-size: 16px; color: rgba(255,255,255,0.6); margin-top: 12px; max-width: 520px; }

    /* MISC */
    .text-center { text-align: center; }
    .mt-8 { margin-top: 8px; }
    .mt-12 { margin-top: 12px; }
    .mt-16 { margin-top: 16px; }
    .mt-24 { margin-top: 24px; }
    .mt-32 { margin-top: 32px; }
    .mt-48 { margin-top: 48px; }
    .mt-64 { margin-top: 64px; }
    .mb-8 { margin-bottom: 8px; }
    .mb-16 { margin-bottom: 16px; }
    .mb-24 { margin-bottom: 24px; }
    .mb-32 { margin-bottom: 32px; }
    .mb-48 { margin-bottom: 48px; }
    .flex { display: flex; }
    .items-center { align-items: center; }
    .gap-12 { gap: 12px; }
    .gap-16 { gap: 16px; }
    .flex-wrap { flex-wrap: wrap; }
    .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    @media (max-width: 768px) { .two-col { grid-template-columns: 1fr; } }
    .bg-pale { background: var(--off-white); }
    .bg-navy { background: var(--navy); }
  `}</style>
);

// ─── SCROLL REVEAL HOOK ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── ICONS (inline SVG) ──────────────────────────────────────────────────────
// ICON NOTE: All icons below are inline SVGs. To replace with an icon library:
// 1. Install lucide-react: import { ChevronDown, Mail, ... } from 'lucide-react'
// 2. Replace each SVG block with the corresponding Lucide component
const ChevronDownIcon = () => (
  /* ICON: chevron-down */
  <svg viewBox="0 0 10 6" width="10" height="10" fill="currentColor"><path d="M0 0l5 6 5-6z"/></svg>
);
const ArrowRightIcon = ({ size = 14 }) => (
  /* ICON: arrow-right */
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
);
const SendIcon = () => (
  /* ICON: send */
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z"/></svg>
);
const SearchIcon = () => (
  /* ICON: search */
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
);
const ChatIcon = () => (
  /* ICON: chat bubble */
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
);
const XIcon = () => (
  /* ICON: close/x */
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
);
const InstagramIcon = () => (
  /* ICON: instagram */
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
);
const MailIcon = () => (
  /* ICON: email/mail */
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>
);
const PlusIcon = () => (
  /* ICON: plus/expand FAQ */
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
);
const MinusIcon = () => (
  /* ICON: minus/collapse FAQ */
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14"/></svg>
);
const ChevronLeftIcon = () => (
  /* ICON: chevron-left (gallery) */
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
);
const ChevronRightIcon = () => (
  /* ICON: chevron-right (gallery) */
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
);

// ─── CHATBOT ─────────────────────────────────────────────────────────────────
const CHATBOT_KB = {
  "founded": "DSSD UVA was founded in 2025 at the University of Virginia.",
  "when": "DSSD UVA was founded in 2025 at the University of Virginia.",
  "member": "We have 15+ active members across our three tracks: Data Science, Software Engineering, and Business Consulting.",
  "how many": "We currently have 15+ active members and 5+ active projects.",
  "project": "We currently have 5+ active projects focused on sustainability challenges, ranging from data analysis to software solutions.",
  "apply": "Applications open each Fall and Spring semester. Submit your resume and application form, then complete a 2-3 week interview process.",
  "application": "Our application process: 1) Submit online application with resume, 2) Initial 1-2 week review, 3) Interviews with our exec team, 4) Final decisions in ~1 week.",
  "track": "We have three tracks: Data Engineer (Data Science), Software Engineer (CS), and Technical/Business Consultant (Business). Each requires 3-5 hrs/week.",
  "data": "The Data Engineer track focuses on machine learning, data cleaning, and sustainability-focused analysis. Requires Python/R experience.",
  "software": "The Software Engineer track builds AI automation and software solutions for sustainability. Requires project management and CS skills.",
  "business": "The Business Consulting track works directly with partner organizations on sustainability consulting. Great for those with client-facing experience.",
  "partner": "We work with 5+ partner organizations on sustainability challenges across UVA and the broader community.",
  "contact": "Reach us at dssduva@gmail.com or on Instagram @dssduva. You can also fill out our contact form on the 'For Companies' page.",
  "email": "Our email is dssduva@gmail.com.",
  "instagram": "Follow us on Instagram: @dssduva (https://www.instagram.com/dssduva/)",
  "social": "Find us on Instagram @dssduva or email us at dssduva@gmail.com.",
  "event": "We host team events like trips to Carter's Mountain, Root Bowl nights, and more to build community among members.",
  "sustainability": "DSSD focuses on data science and technology solutions for sustainability challenges, working with real organizations.",
  "mission": "Our mission is to apply data science, software engineering, and business consulting to address real-world sustainability challenges.",
  "uva": "We are a student organization at the University of Virginia (UVA), founded in 2025.",
  "president": "Our President is Vinith Jayamani. Winston Shek leads Technology, and Dhruv Sarang leads Business Development.",
  "leader": "Our leadership: Vinith Jayamani (President), Winston Shek (President of Technology), Dhruv Sarang (President of Business Development), Siddharth Laks (VP of Business Development).",
  "donate": "You can donate to DSSD UVA through our Donate page — your support funds our projects and events.",
  "join": "Interested in joining? Visit our 'For Students' page to learn more and fill out an interest form!",
  "commitment": "All tracks require 3-5 hours per week commitment.",
  "graduate": "The Business Consulting track prefers graduate students, though undergraduates are welcome to apply.",
  "undergraduate": "Most of our members are undergraduate students at UVA. The Data and Software tracks are specifically for undergrads.",
  "hello": "Hi! I'm the DSSD assistant. Ask me anything about our club — tracks, applications, events, or how to get involved.",
  "hi": "Hi! I'm the DSSD assistant. Ask me about our tracks, application process, events, or anything else!",
  "help": "I can answer questions about DSSD's tracks, application process, team, events, mission, and more. What would you like to know?",
};

function getBotReply(msg) {
  const lower = msg.toLowerCase();
  for (const [key, val] of Object.entries(CHATBOT_KB)) {
    if (lower.includes(key)) return val;
  }
  return "Great question! For specific details, please email us at dssduva@gmail.com or check out the relevant page on our site. We're always happy to help.";
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "bot", text: "Hi! I'm the DSSD assistant. Ask me about our club, tracks, application process, or events." }
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  function send() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m => [...m, { from: "user", text: userMsg }]);
    setTimeout(() => {
      setMsgs(m => [...m, { from: "bot", text: getBotReply(userMsg) }]);
    }, 600);
  }

  return (
    <>
      <button className="chatbot-fab" onClick={() => setOpen(o => !o)} aria-label="Open chat">
        {open ? <XIcon /> : <ChatIcon />}
      </button>
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div>
              <div className="chatbot-title">DSSD Assistant</div>
              <div className="chatbot-sub">Ask anything about our club</div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}><XIcon /></button>
          </div>
          <div className="chatbot-messages">
            {msgs.map((m, i) => (
              <div key={i} className={`chat-msg ${m.from}`}>
                <div className={`chat-bubble ${m.from}`}>{m.text}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
          <div className="chatbot-input-row">
            <input
              className="chatbot-input" placeholder="Ask a question..."
              value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
            />
            <button className="chatbot-send" onClick={send}><SendIcon /></button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      label: "About",
      children: [
        { label: "Our Mission", page: "about" },
        { label: "Our Team", page: "team" },
        { label: "Gallery", page: "gallery" },
      ]
    },
    {
      label: "Work",
      children: [
        { label: "Project Highlights", page: "projects" },
        { label: "Impact & Mission", page: "about" },
      ]
    },
    {
      label: "For Students",
      badge: "Join",
      children: [
        { label: "Why Join DSSD", page: "students" },
        { label: "Tracks & Roles", page: "students" },
        { label: "Apply Now", page: "apply" },
      ]
    },
    {
      label: "For Companies",
      badge: "Partner",
      children: [
        { label: "Partner With Us", page: "companies" },
        { label: "Contact Us", page: "companies" },
      ]
    },
    { label: "FAQ", page: "faq" },
  ];

  const go = (p) => { setPage(p); setMobileOpen(false); window.scrollTo(0, 0); };

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => go("home")}>
            <div className="nav-logo-mark">DS</div>
            <div>
              <div className="nav-logo-text">DSSD</div>
              <span className="nav-logo-sub">UVA</span>
            </div>
          </div>

          <ul className="nav-links">
            {navItems.map((item, i) => (
              <li key={i} className="nav-item">
                {item.page ? (
                  <button className={`nav-btn ${page === item.page ? "active" : ""}`} onClick={() => go(item.page)}>
                    {item.label}
                  </button>
                ) : (
                  <>
                    <button className={`nav-btn ${item.children?.some(c => c.page === page) ? "active" : ""}`}>
                      {item.label} <ChevronDownIcon />
                    </button>
                    <div className="dropdown">
                      {item.badge && <div className="dropdown-label">{item.badge}</div>}
                      {item.children.map((c, j) => (
                        <div key={j} className="dropdown-item" onClick={() => go(c.page)}>
                          {c.label}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </li>
            ))}
            <li>
              <button className="nav-apply-btn" onClick={() => go("apply")}>Apply Now</button>
            </li>
          </ul>

          <button className="hamburger" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {mobileOpen && <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`}>
        {["home","about","team","gallery","projects","students","apply","companies","faq","donate"].map(p => (
          <div key={p} className="mobile-nav-link" onClick={() => go(p)}>
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </div>
        ))}
      </div>
    </>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({ setPage }) {
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-name">DSSD — UVA</div>
            <div className="footer-brand-sub">Data Science & Sustainability Division</div>
            <p className="footer-desc">Applying data science, technology, and consulting to address sustainability challenges. Founded at the University of Virginia in 2025.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/dssduva/" target="_blank" rel="noopener noreferrer" className="social-link"><InstagramIcon /></a>
              <a href="mailto:dssduva@gmail.com" className="social-link"><MailIcon /></a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Organization</div>
            <div className="footer-link" onClick={() => go("about")}>About Us</div>
            <div className="footer-link" onClick={() => go("team")}>Our Team</div>
            <div className="footer-link" onClick={() => go("gallery")}>Gallery</div>
            <div className="footer-link" onClick={() => go("projects")}>Projects</div>
          </div>
          <div>
            <div className="footer-col-title">Get Involved</div>
            <div className="footer-link" onClick={() => go("students")}>For Students</div>
            <div className="footer-link" onClick={() => go("apply")}>Apply Now</div>
            <div className="footer-link" onClick={() => go("companies")}>For Companies</div>
            <div className="footer-link" onClick={() => go("donate")}>Donate</div>
          </div>
          <div>
            <div className="footer-col-title">Resources</div>
            <div className="footer-link" onClick={() => go("faq")}>FAQ</div>
            <div className="footer-link">dssduva@gmail.com</div>
            <a href="https://www.instagram.com/dssduva/" target="_blank" rel="noopener noreferrer" className="footer-link">@dssduva</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 DSSD UVA. All rights reserved.</span>
          <span>University of Virginia</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE: HOME ───────────────────────────────────────────────────────────────
function HomePage({ setPage }) {
  useReveal();
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          {/* Decorative grid lines */}
          <div className="hero-grid-line" style={{top:0,bottom:0,left:'33%',width:'1px'}} />
          <div className="hero-grid-line" style={{top:0,bottom:0,left:'66%',width:'1px'}} />
          <div className="hero-grid-line" style={{top:'40%',left:0,right:0,height:'1px'}} />
          {/* Orbs */}
          <div className="hero-orb" style={{width:600,height:600,top:-100,right:-100}} />
          <div className="hero-orb" style={{width:400,height:400,bottom:-50,left:'20%',background:'radial-gradient(circle,rgba(37,87,167,0.15) 0%,transparent 70%)'}} />
        </div>
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--light-blue)',display:'inline-block'}}/>
            University of Virginia — Est. 2025
          </div>
          <h1 className="hero-title">
            Data Science for<br /><em>Sustainable Impact</em>
          </h1>
          <p className="hero-sub">
            DSSD bridges data science, software engineering, and business consulting to deliver real solutions for sustainability challenges at UVA and beyond.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => go("apply")}>
              Apply to Join <ArrowRightIcon />
            </button>
            <button className="btn-outline" onClick={() => go("companies")}>
              Partner With Us
            </button>
            <button className="btn-outline" onClick={() => go("about")} style={{borderColor:'rgba(255,255,255,0.15)'}}>
              Learn More
            </button>
          </div>
          <div className="hero-stats">
            {[["15+","Active Members"],["5+","Live Projects"],["5+","Partner Organizations"],["2025","Year Founded"]].map(([n,l]) => (
              <div key={l}>
                <div className="hero-stat-num">{n}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION STRIP */}
      <section className="section-sm bg-pale">
        <div className="inner text-center">
          <div className="reveal">
            <p className="section-label">Our Mission</p>
            <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:600,color:'var(--navy)',maxWidth:700,margin:'0 auto',lineHeight:1.3}}>
              We exist to apply rigorous data science to the challenges that matter most — sustainability, environment, and communities.
            </h2>
          </div>
        </div>
      </section>

      {/* THREE TRACKS */}
      <section className="section">
        <div className="inner">
          <div className="reveal" style={{maxWidth:540,marginBottom:48}}>
            <p className="section-label">Three Tracks</p>
            <h2 className="section-title">Find your place at DSSD</h2>
            <p className="section-sub">Whether you bring technical depth, analytical rigor, or strategic thinking — there's a track built for your skills.</p>
          </div>
          <div className="grid-3">
            {[
              {
                label:"Data Science Track",
                title:"Data Engineer",
                desc:"Build machine learning pipelines and data systems that power sustainability insights.",
                color:"var(--pale-blue)",
                iconColor:"var(--mid-blue)",
                tags:["Python / R","Machine Learning","Data Cleaning"],
                page:"apply"
              },
              {
                label:"Software Track",
                title:"Software Engineer",
                desc:"Engineer AI automation and software solutions for real-world sustainability challenges.",
                color:"rgba(200,164,90,0.08)",
                iconColor:"var(--accent)",
                tags:["Full-Stack","AI / Automation","Systems Design"],
                page:"apply"
              },
              {
                label:"Business Track",
                title:"Business Consultant",
                desc:"Partner directly with organizations to recommend and implement consulting solutions.",
                color:"rgba(26,107,64,0.06)",
                iconColor:"#1A6B40",
                tags:["Client Consulting","Strategy","Sustainability"],
                page:"apply"
              },
            ].map((t,i) => (
              <div key={i} className={`reveal reveal-delay-${i+1}`}>
                <div className="card" style={{height:'100%',display:'flex',flexDirection:'column'}}>
                  <div style={{padding:'18px',borderRadius:'var(--radius-lg)',background:t.color,marginBottom:18,width:52,height:52,display:'flex',alignItems:'center',justifyContent:'center'}}>
                    {/* ICON: Track icon - replace with appropriate SVG */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={t.iconColor} strokeWidth="2" strokeLinecap="round">
                      {i===0 && <><path d="M21 21H4.6C3.7 21 3 20.3 3 19.4V3"/><path d="M7 14l4-4 4 4 4-4"/></>}
                      {i===1 && <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>}
                      {i===2 && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>}
                    </svg>
                  </div>
                  <span className="tag tag-blue" style={{marginBottom:10,alignSelf:'flex-start'}}>{t.label}</span>
                  <h3 style={{fontSize:20,fontFamily:'var(--font-serif)',fontWeight:600,color:'var(--navy)',marginBottom:8}}>{t.title}</h3>
                  <p style={{fontSize:14,color:'var(--gray-700)',lineHeight:1.6,flex:1,marginBottom:16}}>{t.desc}</p>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:20}}>
                    {t.tags.map(tag => (
                      <span key={tag} style={{fontSize:11,padding:'3px 8px',borderRadius:20,background:'var(--gray-100)',color:'var(--gray-700)'}}>{tag}</span>
                    ))}
                  </div>
                  <button className="btn-outline-dark" style={{alignSelf:'flex-start'}} onClick={() => go(t.page)}>
                    Learn More <ArrowRightIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DARK IMPACT SECTION */}
      <section className="section dark-section">
        <div className="inner">
          <div className="two-col" style={{alignItems:'center'}}>
            <div className="reveal">
              <p className="section-label">Real Impact</p>
              <h2 className="section-title-light">Projects that move the needle on sustainability</h2>
              <p className="section-sub-light" style={{marginTop:16,marginBottom:32}}>
                Our members work on active projects with real partner organizations, applying data science and software engineering to problems that have lasting environmental and community impact.
              </p>
              <button className="btn-primary" onClick={() => go("projects")}>View Projects <ArrowRightIcon /></button>
            </div>
            <div className="reveal reveal-delay-1">
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {[
                  {n:"5+",l:"Active projects with partner organizations"},
                  {n:"15+",l:"Members contributing technical expertise"},
                  {n:"3",l:"Specialized tracks for diverse skill sets"},
                  {n:"2025",l:"Founded with a mission to last"},
                ].map(({n,l}) => (
                  <div key={l} style={{display:'flex',alignItems:'center',gap:20,padding:'20px 24px',borderRadius:'var(--radius-lg)',background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    <span style={{fontSize:'1.8rem',fontFamily:'var(--font-serif)',fontWeight:600,color:'var(--light-blue)',minWidth:56}}>{n}</span>
                    <span style={{fontSize:14,color:'rgba(255,255,255,0.6)'}}>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR COMPANIES / STUDENTS CTA */}
      <section className="section">
        <div className="inner">
          <div className="grid-2">
            <div className="reveal" style={{padding:40,borderRadius:'var(--radius-lg)',background:'var(--navy)',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:-40,right:-40,width:200,height:200,borderRadius:'50%',background:'rgba(74,143,231,0.08)'}} />
              <p className="section-label">For Companies</p>
              <h3 style={{fontFamily:'var(--font-serif)',fontSize:'1.6rem',fontWeight:600,color:'white',margin:'8px 0 12px',lineHeight:1.2}}>Partner with talented UVA analysts</h3>
              <p style={{fontSize:14,color:'rgba(255,255,255,0.6)',lineHeight:1.7,marginBottom:24}}>Work with our teams on sustainability-focused data science and consulting engagements. Fill out our client interest form to get started.</p>
              <button className="btn-primary" onClick={() => go("companies")}>Learn More <ArrowRightIcon /></button>
            </div>
            <div className="reveal reveal-delay-1" style={{padding:40,borderRadius:'var(--radius-lg)',border:'1px solid var(--gray-100)',background:'var(--off-white)',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:-40,right:-40,width:200,height:200,borderRadius:'50%',background:'rgba(37,87,167,0.05)'}} />
              <p className="section-label">For Students</p>
              <h3 style={{fontFamily:'var(--font-serif)',fontSize:'1.6rem',fontWeight:600,color:'var(--navy)',margin:'8px 0 12px',lineHeight:1.2}}>Build skills. Create impact. Connect.</h3>
              <p style={{fontSize:14,color:'var(--gray-700)',lineHeight:1.7,marginBottom:24}}>Join a community of driven UVA students applying technical and analytical skills to real-world sustainability projects. Applications open each semester.</p>
              <button className="btn-primary" onClick={() => go("students")}>Explore Tracks <ArrowRightIcon /></button>
            </div>
          </div>
        </div>
      </section>

      {/* DONATE STRIP */}
      <section className="section-sm" style={{background:'var(--pale-blue)',textAlign:'center'}}>
        <div className="inner reveal">
          <p className="section-label">Support Our Work</p>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:600,color:'var(--navy)',margin:'8px auto 16px',maxWidth:540}}>
            Help us grow our impact on campus and beyond
          </h2>
          <button className="btn-primary" onClick={() => go("donate")}>Donate to DSSD <ArrowRightIcon /></button>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: ABOUT ──────────────────────────────────────────────────────────────
function AboutPage({ setPage }) {
  useReveal();
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 60% 50%,rgba(37,87,167,0.2) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">About DSSD UVA</p>
          <h1 className="page-hero-title">Driven by data.<br />Guided by purpose.</h1>
          <p className="page-hero-sub">Founded in 2025, DSSD UVA brings together students across disciplines to tackle sustainability through data science, software, and strategy.</p>
        </div>
      </div>

      {/* STORY */}
      <section className="section">
        <div className="inner">
          <div className="two-col" style={{alignItems:'start',gap:64}}>
            <div className="reveal">
              <p className="section-label">Our Story</p>
              <h2 className="section-title">Building from the ground up at UVA</h2>
              <p style={{fontSize:16,color:'var(--gray-700)',lineHeight:1.8,marginTop:16}}>
                DSSD UVA was founded in 2025 with a clear purpose: to create a space where technically-minded students could apply their skills to sustainability challenges that actually matter. Inspired by DSSD chapters at peer institutions, we set out to build something rooted in rigor, collaboration, and real-world impact.
              </p>
              <p style={{fontSize:16,color:'var(--gray-700)',lineHeight:1.8,marginTop:16}}>
                In our first year, we've grown to 15+ active members, launched 5+ projects, and established partnerships with organizations across the UVA community and beyond. We're just getting started.
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              {/* IMAGE: Replace with actual team photo or founding photo */}
              {/* Search term used: "university students working sustainability data" */}
              <div style={{height:320,borderRadius:'var(--radius-lg)',overflow:'hidden',background:'var(--pale-blue)'}}>
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
                  alt="Team collaborating"
                  style={{width:'100%',height:'100%',objectFit:'cover'}}
                />
                {/* IMAGE COMMENT: Replace src with actual DSSD team photo */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-pale">
        <div className="inner">
          <div className="reveal text-center mb-48" style={{maxWidth:520,margin:'0 auto 48px'}}>
            <p className="section-label">Our Values</p>
            <h2 className="section-title">What guides us</h2>
          </div>
          <div className="grid-2">
            {[
              {title:"Rigor Over Shortcuts",desc:"We hold our work to a high standard. Whether it's a machine learning model or a consulting deck, we prioritize thoughtful, well-reasoned outputs."},
              {title:"Sustainability First",desc:"Every project we take on connects to a meaningful environmental or community challenge. We believe data science should serve a larger purpose."},
              {title:"Inclusive Excellence",desc:"We welcome students from any major or background. What matters is curiosity, commitment, and a desire to learn — not prior experience alone."},
              {title:"Collaborative by Design",desc:"Cross-track collaboration is baked into how we work. Data engineers, software engineers, and consultants solve problems together."},
              {title:"Real-World Impact",desc:"We partner with actual organizations on real challenges. Our work doesn't live in a classroom — it creates outcomes that matter."},
              {title:"Community & Growth",desc:"DSSD is not just a resume line. We invest in events, mentorship, and a culture where members genuinely grow together."},
            ].map((v,i) => (
              <div key={i} className={`reveal reveal-delay-${(i%3)+1}`}>
                <div className="value-card">
                  <div className="value-title">{v.title}</div>
                  <div className="value-desc">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <section style={{background:'var(--navy)'}}>
        <div className="inner" style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)'}}>
          {[["15+","Active Members"],["5+","Live Projects"],["5+","Partner Orgs"],["2025","Founded"]].map(([n,l]) => (
            <div key={l} className="stat-box">
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm text-center">
        <div className="inner reveal">
          <p className="section-label">Get Involved</p>
          <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(1.6rem,3vw,2.2rem)',fontWeight:600,color:'var(--navy)',margin:'8px auto 16px',maxWidth:500}}>
            Ready to be part of what we're building?
          </h2>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="btn-primary" onClick={() => go("apply")}>Apply Now</button>
            <button className="btn-outline-dark" onClick={() => go("team")}>Meet the Team</button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: TEAM ───────────────────────────────────────────────────────────────
function TeamPage() {
  useReveal();
  // ICON: Replace initials with actual photos by setting the src in team-avatar img tags
  const exec = [
    { name:"Vinith Jayamani", role:"President", initials:"VJ",
      bio:"Leads DSSD's strategic vision and operations, driving the organization's growth and mission." },
    { name:"Winston Shek", role:"President of Technology", initials:"WS",
      bio:"Oversees all technical projects and the software engineering and data science tracks." },
    { name:"Dhruv Sarang", role:"President of Business Development", initials:"DS",
      bio:"Manages partnerships, client relationships, and organizational growth strategy." },
    { name:"Siddharth Laks", role:"VP of Business Development", initials:"SL",
      bio:"Supports business development efforts and coordinates with partner organizations." },
  ];
  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 50%,rgba(37,87,167,0.2) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">The People Behind DSSD</p>
          <h1 className="page-hero-title">Our Team</h1>
          <p className="page-hero-sub">15+ active members across three tracks, united by a shared commitment to sustainable impact.</p>
        </div>
      </div>

      <section className="section">
        <div className="inner">
          <div className="reveal mb-48">
            <p className="section-label">Executive Leadership</p>
            <h2 className="section-title">Leadership team</h2>
          </div>
          <div className="grid-4">
            {exec.map((m,i) => (
              <div key={i} className={`reveal reveal-delay-${i+1}`}>
                <div className="team-card">
                  <div className="team-avatar">
                    {/* IMAGE: Replace with actual headshot. Search: professional student headshot */}
                    {/* Uncomment img tag and set src to actual photo URL: */}
                    {/* <img src="YOUR_PHOTO_URL" alt={m.name} /> */}
                    {m.initials}
                  </div>
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                  <p style={{fontSize:13,color:'var(--gray-700)',lineHeight:1.6,marginTop:12}}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:64}}>
            <div className="reveal mb-32">
              <p className="section-label">Active Members</p>
              <h2 className="section-title">The broader team</h2>
              <p className="section-sub">15+ dedicated members spanning Data Science, Software Engineering, and Business Consulting tracks.</p>
            </div>
            {/* Placeholder member grid */}
            <div className="grid-4">
              {Array.from({length:8}).map((_,i) => (
                <div key={i} className={`reveal reveal-delay-${(i%3)+1}`}>
                  <div className="team-card" style={{padding:'20px 16px'}}>
                    <div className="team-avatar" style={{width:56,height:56,fontSize:20}}>
                      {/* IMAGE: Replace with actual member photos */}
                      {String.fromCharCode(65+i)}M
                    </div>
                    <div className="team-name" style={{fontSize:14}}>Member Name {i+1}</div>
                    {/* EDIT: Replace with actual member names and tracks */}
                    <div className="team-role">{["Data Track","Software Track","Business Track"][i%3]}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{textAlign:'center',color:'var(--gray-500)',fontSize:13,marginTop:20}}>
              {/* EDIT: Update when you have all member names */}
              + more active members. Interested in joining? <span style={{color:'var(--mid-blue)',cursor:'pointer',fontWeight:500}} onClick={() => window.scrollTo(0,0)}>Apply now.</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: GALLERY ────────────────────────────────────────────────────────────
function GalleryPage() {
  useReveal();
  // IMAGE BANK: Replace these Unsplash URLs with actual DSSD photos
  // Each entry: { src, caption, desc }
  // Search terms used noted in comments
  const photos = [
    {
      src:"https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
      caption:"Team Kickoff — Fall 2025",
      desc:"Our founding members gathered to kick off DSSD's first semester at UVA.",
      // IMAGE: Team group photo. Replace with actual team kickoff photo.
    },
    {
      src:"https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
      caption:"Project Workshop Session",
      desc:"Members collaborating on data pipelines during one of our weekly project meetings.",
      // IMAGE: Students working on laptops. Replace with actual workshop photo.
    },
    {
      src:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
      caption:"Carter's Mountain Team Outing",
      desc:"Our team bonding trip to Carter's Mountain — one of DSSD's favorite traditions.",
      // IMAGE: Mountain/outdoor group photo. Replace with actual Carter's Mountain trip photo.
    },
    {
      src:"https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
      caption:"Building Our Website",
      desc:"The tech team hard at work engineering DSSD's digital home.",
      // IMAGE: Students coding. Replace with actual photo of team working on website.
    },
    {
      src:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
      caption:"Partner Organization Presentation",
      desc:"DSSD members presenting project findings to a partner organization.",
      // IMAGE: Presentation/meeting. Replace with actual partner meeting photo.
    },
    {
      src:"https://images.unsplash.com/photo-1585636322267-fc5d8498b09c?w=1200&q=80",
      caption:"Root Bowl Night",
      desc:"Team bonding over Root Bowl — a DSSD social tradition.",
      // IMAGE: Group social event. Replace with actual Root Bowl night photo.
    },
  ];

  const [active, setActive] = useState(0);
  const prev = () => setActive(a => (a - 1 + photos.length) % photos.length);
  const next = () => setActive(a => (a + 1) % photos.length);

  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 70% 50%,rgba(37,87,167,0.2) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">Life at DSSD</p>
          <h1 className="page-hero-title">Gallery</h1>
          <p className="page-hero-sub">From project workshops to team outings — a look at what DSSD life looks like.</p>
        </div>
      </div>

      <section className="section">
        <div className="inner">
          {/* Main Gallery Viewer */}
          <div className="gallery-main">
            <img src={photos[active].src} alt={photos[active].caption} key={active} />
            <div className="gallery-caption">
              <h3 style={{fontFamily:'var(--font-serif)',fontSize:'1.4rem',fontWeight:600,color:'white'}}>{photos[active].caption}</h3>
              <p style={{fontSize:14,color:'rgba(255,255,255,0.7)',marginTop:4}}>{photos[active].desc}</p>
              <p style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginTop:8}}>{active+1} / {photos.length}</p>
            </div>
            <button className="gallery-arrow prev" onClick={prev}><ChevronLeftIcon /></button>
            <button className="gallery-arrow next" onClick={next}><ChevronRightIcon /></button>
          </div>

          {/* Thumbnail strip */}
          <div className="gallery-thumbs">
            {photos.map((p,i) => (
              <div key={i} className={`gallery-thumb ${i===active?'active':''}`} onClick={() => setActive(i)}>
                <img src={p.src} alt={p.caption} />
              </div>
            ))}
          </div>

          {/* Keyboard hint */}
          <p style={{textAlign:'center',fontSize:12,color:'var(--gray-500)',marginTop:16}}>
            Click thumbnails or use the arrows to browse — {photos.length} photos
          </p>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: PROJECTS ────────────────────────────────────────────────────────────
function ProjectsPage({ setPage }) {
  useReveal();
  // IMAGE: Replace project card images with actual project screenshots/photos
  const projects = [
    {
      title:"Sustainability Dashboard for [Partner Name]",
      tags:["Data Science","Machine Learning"],
      track:"Data Track",
      desc:"Built an end-to-end data pipeline and interactive dashboard to track sustainability KPIs for a local partner organization.",
      img:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
      // IMAGE: Data dashboard screenshot. Replace with actual project screenshot.
      status:"Active"
    },
    {
      title:"AI Waste Sorting System",
      tags:["Software","AI/ML"],
      track:"Software Track",
      desc:"Developed a computer vision model to automate waste classification and sorting for a campus sustainability initiative.",
      img:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80",
      // IMAGE: AI/technology. Replace with actual project screenshot.
      status:"Active"
    },
    {
      title:"Carbon Footprint Analytics",
      tags:["Data Science","Consulting"],
      track:"Business Track",
      desc:"Partnered with [Organization Name] to build a carbon footprint measurement framework and reporting toolkit.",
      img:"https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=600&q=80",
      // IMAGE: Environment/sustainability. Replace with actual project photo.
      status:"Active"
    },
    {
      title:"Renewable Energy Forecasting",
      tags:["Data Science","Forecasting"],
      track:"Data Track",
      desc:"Time series forecasting model for renewable energy output, helping a partner optimize grid allocation decisions.",
      img:"https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80",
      // IMAGE: Solar/wind energy. Replace with actual project screenshot.
      status:"Active"
    },
    {
      title:"[Project Name — Edit Here]",
      tags:["Software","Automation"],
      track:"Software Track",
      desc:"EDIT: Add your project description here. Include the partner organization, methods used, and impact achieved.",
      img:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
      // IMAGE: Technology/code. Replace with actual project photo.
      status:"Active"
    },
  ];

  const [filter, setFilter] = useState("All");
  const tracks = ["All","Data Track","Software Track","Business Track"];
  const filtered = filter === "All" ? projects : projects.filter(p => p.track === filter);

  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(37,87,167,0.2) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">Our Work</p>
          <h1 className="page-hero-title">Project Highlights</h1>
          <p className="page-hero-sub">Real projects with real partners — addressing sustainability challenges through data, software, and strategy.</p>
        </div>
      </div>

      <section className="section">
        <div className="inner">
          {/* Filter tabs */}
          <div style={{display:'flex',gap:8,marginBottom:40,flexWrap:'wrap'}}>
            {tracks.map(t => (
              <button key={t}
                style={{padding:'7px 16px',borderRadius:20,fontSize:13,fontWeight:500,border:'1px solid',
                  borderColor:filter===t?'var(--mid-blue)':'var(--gray-300)',
                  background:filter===t?'var(--mid-blue)':'transparent',
                  color:filter===t?'white':'var(--gray-700)',
                  cursor:'pointer',transition:'all 0.15s'}}
                onClick={() => setFilter(t)}
              >{t}</button>
            ))}
          </div>

          <div className="grid-3">
            {filtered.map((p,i) => (
              <div key={i} className={`reveal reveal-delay-${(i%3)+1}`}>
                <div className="proj-card">
                  <div className="proj-card-img">
                    <img src={p.img} alt={p.title} />
                    <div style={{position:'absolute',top:12,left:12}}>
                      <span className="tag tag-green">{p.status}</span>
                    </div>
                  </div>
                  <div className="proj-card-body">
                    <div style={{display:'flex',gap:6,flexWrap:'wrap',marginBottom:10}}>
                      {p.tags.map(t => <span key={t} className="tag tag-blue">{t}</span>)}
                    </div>
                    <div className="proj-card-title">{p.title}</div>
                    <div className="proj-card-desc">{p.desc}</div>
                    <div style={{fontSize:12,color:'var(--gray-500)',borderTop:'1px solid var(--gray-100)',paddingTop:12}}>
                      {/* ICON: Track label icon */}
                      {p.track}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="reveal" style={{textAlign:'center',marginTop:48,padding:40,borderRadius:'var(--radius-lg)',background:'var(--pale-blue)'}}>
            <p className="section-label">Work With Us</p>
            <h3 style={{fontFamily:'var(--font-serif)',fontSize:'1.6rem',fontWeight:600,color:'var(--navy)',margin:'8px 0 12px'}}>Have a sustainability challenge?</h3>
            <p style={{fontSize:14,color:'var(--gray-700)',maxWidth:440,margin:'0 auto 24px'}}>We partner with organizations to tackle real problems. Reach out to learn how DSSD can help.</p>
            <button className="btn-primary" onClick={() => { setPage("companies"); window.scrollTo(0,0); }}>Partner With Us <ArrowRightIcon /></button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: STUDENTS ────────────────────────────────────────────────────────────
function StudentsPage({ setPage }) {
  useReveal();
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };

  const whyJoin = [
    {
      title:"Build Real-World Skills",
      desc:"Apply data science, software engineering, or business consulting to live projects — not hypotheticals. Build a portfolio that stands out.",
      // ICON: briefcase/tools icon
    },
    {
      title:"Collaborate Across Disciplines",
      desc:"Work alongside engineers, data scientists, and consultants. Develop cross-functional skills that employers actively look for.",
    },
    {
      title:"Connect With a Driven Community",
      desc:"Join a tight-knit group of high-achieving UVA students. Host team events, study sessions, and bonding trips like Carter's Mountain and Root Bowl nights.",
    },
    {
      title:"Create Lasting Impact",
      desc:"Our projects partner with real organizations on real sustainability challenges. Your work matters beyond the classroom.",
    },
    {
      title:"Grow as a Leader",
      desc:"Take ownership of project components, present to clients, and grow into leadership roles within the organization.",
    },
    {
      title:"Network With Industry & Peers",
      desc:"Connect with alumni, partner organizations, and a network of sustainability-focused professionals through DSSD.",
    },
  ];

  const tracks = [
    {
      name:"Data Engineer",
      track:"Data Science Track",
      color:"var(--pale-blue)",
      iconColor:"var(--mid-blue)",
      desc:"Engage in data cleaning, preprocessing, machine learning, and more for sustainability-focused projects.",
      reqs:[
        "Strong background in statistics / data science",
        "Python or R programming experience",
        "Interest in environmental issues",
        "Undergraduate student",
      ],
      commitment:"3–5 hours / week",
    },
    {
      name:"Software Engineer",
      track:"Software Track",
      color:"rgba(200,164,90,0.08)",
      iconColor:"var(--accent)",
      desc:"Engineer software-based and AI automation solutions to address sustainability challenges.",
      reqs:[
        "Project management experience",
        "Strong communication skills",
        "Organized and detail-oriented",
        "Interest in sustainability",
      ],
      commitment:"3–5 hours / week",
    },
    {
      name:"Business Consultant",
      track:"Business Consulting Track",
      color:"rgba(26,107,64,0.06)",
      iconColor:"#1A6B40",
      desc:"Work directly with partner organizations to recommend, coordinate, and implement consulting solutions for sustainability challenges.",
      reqs:[
        "Advanced data science skills",
        "Experience with machine learning",
        "Client-facing experience preferred",
        "Graduate student preferred",
      ],
      commitment:"3–5 hours / week",
    },
  ];

  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 30% 50%,rgba(37,87,167,0.2) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">For Students</p>
          <h1 className="page-hero-title">Join DSSD UVA</h1>
          <p className="page-hero-sub">Expand your skills, create real impact, and find your people at UVA.</p>
        </div>
      </div>

      {/* WHY JOIN */}
      <section className="section">
        <div className="inner">
          <div className="two-col" style={{alignItems:'start',gap:64}}>
            <div className="reveal" style={{position:'sticky',top:'calc(var(--nav-h) + 32px)'}}>
              <p className="section-label">Why Join</p>
              <h2 className="section-title">More than a club — a launchpad</h2>
              <p className="section-sub" style={{marginTop:14,marginBottom:28}}>DSSD offers something rare: real projects, real clients, and a real community, all at UVA.</p>
              <button className="btn-primary" onClick={() => go("apply")}>Apply Now <ArrowRightIcon /></button>
            </div>
            <div>
              {whyJoin.map((item,i) => (
                <div key={i} className={`reveal reveal-delay-${(i%2)+1} why-item`}>
                  <div className="why-icon">
                    {/* ICON: Replace SVG icons for why-join items */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--mid-blue)" strokeWidth="2" strokeLinecap="round">
                      {i===0 && <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></>}
                      {i===1 && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>}
                      {i===2 && <><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></>}
                      {i===3 && <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>}
                      {i===4 && <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></>}
                      {i===5 && <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>}
                    </svg>
                  </div>
                  <div>
                    <div className="why-title">{item.title}</div>
                    <div className="why-desc">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="section bg-pale">
        <div className="inner">
          <div className="reveal mb-48">
            <p className="section-label">Tracks & Roles</p>
            <h2 className="section-title">Find the right fit</h2>
            <p className="section-sub">Three distinct tracks — each designed for different skill sets and interests.</p>
          </div>
          <div className="grid-3">
            {tracks.map((t,i) => (
              <div key={i} className={`reveal reveal-delay-${i+1}`}>
                <div className="track-card" style={{background:'white'}}>
                  <div className="track-header" style={{background:t.color}}>
                    <div className="track-icon" style={{background:'white'}}>
                      {/* ICON: Track icons - replace SVGs */}
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.iconColor} strokeWidth="2" strokeLinecap="round">
                        {i===0 && <><path d="M21 21H4.6C3.7 21 3 20.3 3 19.4V3"/><path d="M7 14l4-4 4 4 4-4"/></>}
                        {i===1 && <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>}
                        {i===2 && <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>}
                      </svg>
                    </div>
                    <span className="tag tag-blue" style={{marginBottom:8}}>{t.track}</span>
                    <h3 style={{fontSize:20,fontFamily:'var(--font-serif)',fontWeight:600,color:'var(--navy)'}}>{t.name}</h3>
                    <p style={{fontSize:13,color:'var(--gray-700)',marginTop:6,lineHeight:1.6}}>{t.desc}</p>
                  </div>
                  <div className="track-body">
                    <p style={{fontSize:12,fontWeight:600,textTransform:'uppercase',letterSpacing:'0.8px',color:'var(--gray-500)',marginBottom:10}}>Requirements</p>
                    {t.reqs.map((r,j) => (
                      <div key={j} className="req-item"><div className="req-dot"/>{r}</div>
                    ))}
                    <div style={{marginTop:16,paddingTop:16,borderTop:'1px solid var(--gray-100)',fontSize:13,color:'var(--gray-700)',display:'flex',justifyContent:'space-between'}}>
                      <span>Commitment</span><span style={{fontWeight:500,color:'var(--navy)'}}>{t.commitment}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className="section">
        <div className="inner">
          <div className="two-col" style={{alignItems:'start',gap:64}}>
            <div className="reveal">
              <p className="section-label">Application Process</p>
              <h2 className="section-title">How to join DSSD</h2>
              <p className="section-sub">Our process is designed to be thorough yet efficient — we want to find the best fit for you and for our teams.</p>
              <div style={{marginTop:32}}>
                <button className="btn-primary" onClick={() => go("apply")}>Start Your Application <ArrowRightIcon /></button>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <div className="process-steps">
                {[
                  {num:1,title:"Submit Application",desc:"Complete our online application form with your resume and a few short-answer questions.",meta:"Fall and Spring semesters"},
                  {num:2,title:"Initial Review",desc:"Our team reviews your application and assesses fit for available positions across tracks.",meta:"1–2 weeks"},
                  {num:3,title:"Interview Process",desc:"Selected candidates participate in interviews with our executive team.",meta:"2–3 weeks"},
                  {num:4,title:"Final Decision",desc:"We make final selections and extend offers to successful candidates.",meta:"~1 week"},
                ].map(s => (
                  <div key={s.num} className="process-step">
                    <div className="step-num">{s.num}</div>
                    <div>
                      <div className="step-title">{s.title}</div>
                      <div className="step-desc">{s.desc}</div>
                      <div className="step-meta">{s.meta}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEREST FORM */}
      <section className="section bg-pale" id="interest">
        <div className="inner">
          <div className="two-col" style={{alignItems:'start',gap:48}}>
            <div className="reveal">
              <p className="section-label">Stay in the Loop</p>
              <h2 className="section-title">Interest Form</h2>
              <p className="section-sub">Not ready to apply yet? Fill out our interest form and we'll keep you updated on application openings and events.</p>
            </div>
            <div className="reveal reveal-delay-1">
              <div style={{background:'white',borderRadius:'var(--radius-lg)',border:'1px solid var(--gray-100)',padding:32}}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label className="form-label">UVA Email *</label>
                  <input className="form-input" type="email" placeholder="computing_id@virginia.edu" />
                </div>
                <div className="form-group">
                  <label className="form-label">Year</label>
                  <select className="form-input form-select">
                    <option>First Year</option><option>Second Year</option><option>Third Year</option><option>Fourth Year</option><option>Graduate</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Track Interest</label>
                  <select className="form-input form-select">
                    <option>Data Science Track</option><option>Software Track</option><option>Business Consulting Track</option><option>Undecided</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">How did you hear about DSSD?</label>
                  <input className="form-input" placeholder="e.g., friend, social media, flyer..." />
                </div>
                {/* EDIT: Connect this form to a Google Form or backend */}
                <button className="btn-primary" style={{width:'100%',justifyContent:'center'}}>
                  Submit Interest Form <ArrowRightIcon />
                </button>
                <p style={{fontSize:12,color:'var(--gray-500)',textAlign:'center',marginTop:12}}>
                  We'll reach out when applications open next semester.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: APPLY ──────────────────────────────────────────────────────────────
function ApplyPage() {
  useReveal();
  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 50%,rgba(37,87,167,0.25) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">Join Our Team</p>
          <h1 className="page-hero-title">Apply to DSSD</h1>
          <p className="page-hero-sub">Applications open each Fall and Spring semester. Fill out the form below to get started.</p>
        </div>
      </div>

      <section className="section">
        <div className="inner">
          <div className="two-col" style={{gap:64,alignItems:'start'}}>
            <div className="reveal">
              <p className="section-label">Before You Apply</p>
              <h2 className="section-title">What we look for</h2>
              <p style={{fontSize:15,color:'var(--gray-700)',lineHeight:1.7,marginTop:14,marginBottom:24}}>
                We value curiosity, commitment, and a genuine interest in applying data science to sustainability. We welcome students from all backgrounds and majors — what matters most is your motivation and your willingness to learn.
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {[
                  ["Technical foundation","Some background in data, code, or quantitative methods (varies by track)"],
                  ["Sustainability interest","A genuine care for environmental and community impact"],
                  ["Team orientation","Collaborative, communicative, and committed"],
                  ["3-5 hrs/week","Consistent time commitment across the semester"],
                ].map(([t,d]) => (
                  <div key={t} style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                    <div style={{width:6,height:6,borderRadius:'50%',background:'var(--mid-blue)',marginTop:9,flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:14,fontWeight:600,color:'var(--navy)'}}>{t}</div>
                      <div style={{fontSize:13,color:'var(--gray-700)'}}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <div style={{background:'white',borderRadius:'var(--radius-lg)',border:'1px solid var(--gray-100)',padding:32}}>
                <h3 style={{fontSize:18,fontWeight:600,color:'var(--navy)',marginBottom:24,fontFamily:'var(--font-serif)'}}>Application Form</h3>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label className="form-label">UVA Email *</label>
                  <input className="form-input" type="email" placeholder="computing_id@virginia.edu" />
                </div>
                <div className="form-group">
                  <label className="form-label">Year *</label>
                  <select className="form-input form-select">
                    <option>Select year...</option>
                    <option>First Year</option><option>Second Year</option><option>Third Year</option><option>Fourth Year</option><option>Graduate</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Major / School *</label>
                  <input className="form-input" placeholder="e.g., Computer Science, Commerce..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Track Applying For *</label>
                  <select className="form-input form-select">
                    <option>Select track...</option>
                    <option>Data Engineer (Data Science Track)</option>
                    <option>Software Engineer (Software Track)</option>
                    <option>Business Consultant (Business Track)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Why DSSD? *</label>
                  <textarea className="form-input form-textarea" placeholder="Tell us why you're interested in DSSD and what you hope to contribute..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Relevant Experience</label>
                  <textarea className="form-input form-textarea" placeholder="Briefly describe any relevant technical, consulting, or sustainability experience..." style={{minHeight:80}} />
                </div>
                <div className="form-group">
                  <label className="form-label">Resume Link *</label>
                  <input className="form-input" placeholder="Google Drive, Dropbox, or personal site link..." />
                  {/* EDIT: Update resume submission method — or add a file upload input */}
                </div>
                {/* EDIT: Connect this form to a backend, Google Forms, or Formspree */}
                <button className="btn-primary" style={{width:'100%',justifyContent:'center'}}>
                  Submit Application <ArrowRightIcon />
                </button>
                <p style={{fontSize:12,color:'var(--gray-500)',textAlign:'center',marginTop:12}}>
                  We review all applications within 1–2 weeks. Questions? Email dssduva@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: COMPANIES ───────────────────────────────────────────────────────────
function CompaniesPage() {
  useReveal();
  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 60% 50%,rgba(37,87,167,0.2) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">For Organizations & Companies</p>
          <h1 className="page-hero-title">Partner with DSSD</h1>
          <p className="page-hero-sub">Work with a team of driven UVA students to tackle your sustainability challenges through data science and consulting.</p>
        </div>
      </div>

      {/* WHAT WE OFFER */}
      <section className="section">
        <div className="inner">
          <div className="reveal mb-48" style={{maxWidth:540}}>
            <p className="section-label">What We Offer</p>
            <h2 className="section-title">How DSSD can help your organization</h2>
          </div>
          <div className="grid-3">
            {[
              {title:"Data Analysis & Modeling",desc:"We build custom data pipelines, dashboards, and machine learning models tailored to your sustainability challenges."},
              {title:"Software Development",desc:"Our engineers build automation tools, web applications, and AI systems that make your operations more sustainable and efficient."},
              {title:"Strategic Consulting",desc:"Our business consulting team works directly with you to analyze challenges, benchmark solutions, and recommend implementable strategies."},
            ].map((s,i) => (
              <div key={i} className={`reveal reveal-delay-${i+1} card`}>
                <div style={{width:40,height:40,borderRadius:10,background:'var(--pale-blue)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16}}>
                  {/* ICON: Service offering icons */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--mid-blue)" strokeWidth="2" strokeLinecap="round">
                    {i===0 && <><path d="M21 21H4.6C3.7 21 3 20.3 3 19.4V3"/><path d="M7 14l4-4 4 4 4-4"/></>}
                    {i===1 && <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>}
                    {i===2 && <><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></>}
                  </svg>
                </div>
                <h3 style={{fontSize:17,fontWeight:600,color:'var(--navy)',marginBottom:8}}>{s.title}</h3>
                <p style={{fontSize:14,color:'var(--gray-700)',lineHeight:1.6}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="section bg-pale">
        <div className="inner">
          <div className="two-col" style={{gap:64,alignItems:'center'}}>
            <div className="reveal">
              {/* IMAGE: Professional collaboration. Replace with DSSD partner meeting photo */}
              <div style={{height:360,borderRadius:'var(--radius-lg)',overflow:'hidden',background:'var(--pale-blue)'}}>
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&q=80"
                  alt="Partnership meeting"
                  style={{width:'100%',height:'100%',objectFit:'cover'}}
                />
                {/* IMAGE COMMENT: Replace with actual DSSD partner meeting or presentation photo */}
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <p className="section-label">Why Partner With Us</p>
              <h2 className="section-title">Fresh perspectives, rigorous execution</h2>
              <p style={{fontSize:15,color:'var(--gray-700)',lineHeight:1.7,marginTop:14}}>
                DSSD brings the energy and rigor of a top-tier university to your sustainability challenges. Our students are technically trained, results-oriented, and deeply motivated by meaningful work.
              </p>
              <div style={{marginTop:24,display:'flex',flexDirection:'column',gap:16}}>
                {[
                  "Access to data science, software, and consulting expertise",
                  "Project-based engagements tailored to your needs",
                  "Diverse team with cross-disciplinary backgrounds",
                  "Cost-effective partnership with high-quality deliverables",
                  "Direct engagement with UVA's sustainability network",
                ].map((item,i) => (
                  <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                    <div style={{width:20,height:20,borderRadius:'50%',background:'var(--pale-blue)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:2}}>
                      {/* ICON: Check mark */}
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="var(--mid-blue)" strokeWidth="2" strokeLinecap="round"/></svg>
                    </div>
                    <span style={{fontSize:14,color:'var(--gray-700)'}}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section" id="contact">
        <div className="inner">
          <div className="contact-split">
            <div className="reveal">
              <p className="section-label">Get In Touch</p>
              <h2 className="section-title">Start a conversation</h2>
              <p style={{fontSize:15,color:'var(--gray-700)',lineHeight:1.7,marginTop:14,marginBottom:32}}>
                Tell us about your organization and the challenge you're working on. We review all inquiries and will follow up within a week.
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                <div style={{display:'flex',gap:12,alignItems:'center',fontSize:14,color:'var(--gray-700)'}}>
                  <div style={{width:36,height:36,borderRadius:8,background:'var(--pale-blue)',display:'flex',alignItems:'center',justifyContent:'center'}}><MailIcon /></div>
                  <a href="mailto:dssduva@gmail.com" style={{color:'var(--mid-blue)',fontWeight:500}}>dssduva@gmail.com</a>
                </div>
                <div style={{display:'flex',gap:12,alignItems:'center',fontSize:14,color:'var(--gray-700)'}}>
                  <div style={{width:36,height:36,borderRadius:8,background:'var(--pale-blue)',display:'flex',alignItems:'center',justifyContent:'center'}}><InstagramIcon /></div>
                  <a href="https://www.instagram.com/dssduva/" target="_blank" rel="noopener noreferrer" style={{color:'var(--mid-blue)',fontWeight:500}}>@dssduva</a>
                </div>
              </div>
            </div>
            <div className="reveal reveal-delay-1">
              <div style={{background:'white',borderRadius:'var(--radius-lg)',border:'1px solid var(--gray-100)',padding:32}}>
                <h3 style={{fontSize:18,fontWeight:600,color:'var(--navy)',marginBottom:24,fontFamily:'var(--font-serif)'}}>Client Interest Form</h3>
                <div className="form-group">
                  <label className="form-label">Organization Name *</label>
                  <input className="form-input" placeholder="Your organization or company" />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Name *</label>
                  <input className="form-input" placeholder="Your full name" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" placeholder="your@email.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Organization Type</label>
                  <select className="form-input form-select">
                    <option>Non-profit</option><option>Startup</option><option>Corporate</option><option>Government / Public Sector</option><option>University / Research</option><option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Services of Interest</label>
                  <select className="form-input form-select">
                    <option>Data Analysis & Modeling</option><option>Software Development</option><option>Business Consulting</option><option>Multiple / Unsure</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Describe Your Challenge *</label>
                  <textarea className="form-input form-textarea" placeholder="Tell us about the sustainability challenge you'd like help with..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Timeline / Urgency</label>
                  <select className="form-input form-select">
                    <option>Flexible</option><option>This semester</option><option>Next semester</option><option>ASAP</option>
                  </select>
                </div>
                {/* EDIT: Connect to backend / Formspree / Google Forms */}
                <button className="btn-primary" style={{width:'100%',justifyContent:'center'}}>
                  Submit Inquiry <ArrowRightIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: DONATE ──────────────────────────────────────────────────────────────
function DonatePage() {
  useReveal();
  const [amt, setAmt] = useState(25);
  const [custom, setCustom] = useState("");
  const presets = [10, 25, 50, 100];

  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 40% 50%,rgba(37,87,167,0.25) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">Support DSSD</p>
          <h1 className="page-hero-title">Help us grow our impact</h1>
          <p className="page-hero-sub">Your donation funds student projects, team events, and the tools that help DSSD create real-world change.</p>
        </div>
      </div>

      <section className="section">
        <div className="inner">
          <div className="two-col" style={{gap:64,alignItems:'start'}}>
            <div className="reveal">
              <p className="section-label">Your Impact</p>
              <h2 className="section-title">Every contribution matters</h2>
              <p style={{fontSize:15,color:'var(--gray-700)',lineHeight:1.7,marginTop:14,marginBottom:32}}>
                DSSD is entirely student-run and donor-supported. Your contribution directly enables our members to pursue high-impact projects, build skills, and make a difference in the sustainability space.
              </p>
              <div style={{display:'flex',flexDirection:'column',gap:16,marginBottom:32}}>
                {[
                  ["$10","Covers materials for a project workshop session"],
                  ["$25","Funds a team event like a Root Bowl night outing"],
                  ["$50","Supports a semester of software tools and infrastructure"],
                  ["$100","Helps sponsor a team outing or end-of-semester celebration"],
                ].map(([a,d]) => (
                  <div key={a} style={{display:'flex',gap:16,alignItems:'center',padding:'16px 20px',borderRadius:'var(--radius-lg)',background:'var(--off-white)',border:'1px solid var(--gray-100)'}}>
                    <span style={{fontSize:'1.4rem',fontFamily:'var(--font-serif)',fontWeight:600,color:'var(--mid-blue)',minWidth:48}}>{a}</span>
                    <span style={{fontSize:14,color:'var(--gray-700)'}}>{d}</span>
                  </div>
                ))}
              </div>
              <p style={{fontSize:13,color:'var(--gray-500)'}}>
                {/* EDIT: Add 501c3 status information if applicable */}
                For questions about donations, contact us at dssduva@gmail.com
              </p>
            </div>
            <div className="reveal reveal-delay-1">
              <div style={{background:'white',borderRadius:'var(--radius-lg)',border:'1px solid var(--gray-100)',padding:36}}>
                <h3 style={{fontSize:20,fontFamily:'var(--font-serif)',fontWeight:600,color:'var(--navy)',marginBottom:8}}>Make a Donation</h3>
                <p style={{fontSize:13,color:'var(--gray-500)',marginBottom:28}}>Select an amount or enter a custom donation.</p>

                <p className="form-label" style={{marginBottom:10}}>Select Amount</p>
                <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
                  {presets.map(p => (
                    <button key={p}
                      className={`donate-amount-btn ${!custom && amt===p?'selected':''}`}
                      onClick={() => { setAmt(p); setCustom(""); }}
                    >${p}</button>
                  ))}
                </div>

                <div className="form-group">
                  <label className="form-label">Custom Amount</label>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <span style={{fontSize:16,color:'var(--gray-700)'}}>$</span>
                    <input className="form-input" type="number" placeholder="Enter amount"
                      value={custom} onChange={e => { setCustom(e.target.value); setAmt(0); }}
                      style={{maxWidth:160}} />
                  </div>
                </div>

                <div style={{padding:'16px 20px',borderRadius:'var(--radius-lg)',background:'var(--pale-blue)',marginBottom:20}}>
                  <div style={{fontSize:13,color:'var(--gray-700)'}}>Donation total</div>
                  <div style={{fontSize:28,fontFamily:'var(--font-serif)',fontWeight:600,color:'var(--navy)'}}>
                    ${custom || amt}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input className="form-input" placeholder="Your name (optional)" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input className="form-input" type="email" placeholder="For donation receipt (optional)" />
                </div>
                <div className="form-group">
                  <label className="form-label">Message</label>
                  <textarea className="form-input form-textarea" placeholder="Leave a message for the team (optional)" style={{minHeight:72}} />
                </div>

                {/* EDIT: Replace this button with your actual payment processor (Venmo, PayPal, Stripe, etc.) */}
                {/* Example: <a href="https://venmo.com/DSSD-UVA" className="btn-primary"> */}
                <button className="btn-primary" style={{width:'100%',justifyContent:'center'}}>
                  Donate ${custom || amt} <ArrowRightIcon />
                </button>
                <p style={{fontSize:12,color:'var(--gray-500)',textAlign:'center',marginTop:12}}>
                  {/* EDIT: Update with actual payment link / method */}
                  You'll be redirected to our secure payment page.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: FAQ ────────────────────────────────────────────────────────────────
function FAQPage({ setPage }) {
  useReveal();
  const go = (p) => { setPage(p); window.scrollTo(0, 0); };
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);

  const faqs = [
    { q:"When was DSSD UVA founded?", a:"DSSD UVA was founded in 2025 at the University of Virginia, as part of a broader network of DSSD chapters at universities across the country." },
    { q:"What does DSSD stand for?", a:"DSSD stands for Data Science and Sustainability Division. Our mission is to apply data science, software engineering, and business consulting to real sustainability challenges." },
    { q:"Who can apply to DSSD?", a:"Any University of Virginia student can apply to DSSD. We welcome students from all majors and backgrounds. Our Data and Software tracks are primarily for undergraduates; the Business Consulting track prefers graduate students but accepts undergrads with relevant experience." },
    { q:"When do applications open?", a:"We accept applications each Fall and Spring semester. Follow @dssduva on Instagram or fill out our interest form to be notified when applications open." },
    { q:"What is the time commitment?", a:"All three tracks require 3–5 hours per week. This includes project work, team meetings, and any organizational events." },
    { q:"What are the three tracks?", a:"We have three tracks: Data Engineer (Data Science Track), Software Engineer (Software Track), and Technical/Business Consultant (Business Consulting Track). Each has different skill requirements — check our For Students page for details." },
    { q:"Do I need prior experience in sustainability?", a:"Not necessarily. A genuine interest in sustainability is important, but prior experience varies by track. Technical tracks care more about your data science or software background; the business track values client-facing and strategic experience." },
    { q:"How long does the application process take?", a:"The full process typically takes 4–6 weeks: 1-2 weeks for initial review, 2-3 weeks for interviews, and about 1 week for final decisions." },
    { q:"Can companies or organizations partner with DSSD?", a:"Yes — we actively seek partners for our consulting and project work. Visit our For Companies page to fill out a client interest form and learn more about working with us." },
    { q:"How can I support DSSD if I'm not a student?", a:"We welcome donations to support our projects and events. Visit our Donate page to contribute. You can also partner with us as an organization by reaching out at dssduva@gmail.com." },
    { q:"What kinds of events does DSSD host?", a:"Beyond project work, we host team bonding events like trips to Carter's Mountain, Root Bowl nights, and end-of-semester celebrations. Community is a big part of what makes DSSD special." },
    { q:"How do I contact DSSD?", a:"Email us at dssduva@gmail.com or reach out on Instagram @dssduva. We'll respond within a few business days." },
  ];

  const filtered = search
    ? faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase()))
    : faqs;

  return (
    <div className="page">
      <div className="page-hero">
        <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at 50% 60%,rgba(37,87,167,0.2) 0%,transparent 70%)'}} />
        <div className="page-hero-inner">
          <p className="section-label">Questions & Answers</p>
          <h1 className="page-hero-title">Frequently Asked Questions</h1>
          <p className="page-hero-sub">Everything you need to know about DSSD — who we are, how to apply, and how to get involved.</p>
        </div>
      </div>

      <section className="section">
        <div className="inner" style={{maxWidth:760}}>
          {/* Search */}
          <div className="reveal" style={{marginBottom:40}}>
            <div className="search-bar" style={{maxWidth:'100%'}}>
              <SearchIcon />
              <input placeholder="Search FAQ..." value={search} onChange={e => setSearch(e.target.value)} />
              {search && <button style={{background:'none',border:'none',cursor:'pointer',color:'var(--gray-500)',fontSize:16}} onClick={() => setSearch("")}>×</button>}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="reveal">
            {filtered.length === 0 ? (
              <p style={{color:'var(--gray-500)',textAlign:'center',padding:'40px 0'}}>No matching questions found. Try a different search or <span style={{color:'var(--mid-blue)',cursor:'pointer'}} onClick={() => go("companies")}>contact us</span>.</p>
            ) : (
              filtered.map((f,i) => (
                <div key={i} className="faq-item">
                  <button className="faq-q" onClick={() => setOpen(open===i?null:i)}>
                    {f.q}
                    {open===i ? <MinusIcon /> : <PlusIcon />}
                  </button>
                  <div className={`faq-a ${open===i?'open':''}`}>
                    <p>{f.a}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* CTA */}
          <div className="reveal" style={{marginTop:56,textAlign:'center',padding:40,borderRadius:'var(--radius-lg)',background:'var(--pale-blue)'}}>
            <p style={{fontSize:15,fontWeight:600,color:'var(--navy)',marginBottom:4}}>Still have questions?</p>
            <p style={{fontSize:14,color:'var(--gray-700)',marginBottom:20}}>We're happy to help. Reach out directly and we'll get back to you promptly.</p>
            <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
              <a href="mailto:dssduva@gmail.com" className="btn-primary">Email Us <ArrowRightIcon /></a>
              <button className="btn-outline-dark" onClick={() => go("apply")}>Apply to Join</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch (page) {
      case "home":      return <HomePage setPage={setPage} />;
      case "about":     return <AboutPage setPage={setPage} />;
      case "team":      return <TeamPage />;
      case "gallery":   return <GalleryPage />;
      case "projects":  return <ProjectsPage setPage={setPage} />;
      case "students":  return <StudentsPage setPage={setPage} />;
      case "apply":     return <ApplyPage />;
      case "companies": return <CompaniesPage />;
      case "donate":    return <DonatePage />;
      case "faq":       return <FAQPage setPage={setPage} />;
      default:          return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Nav page={page} setPage={setPage} />
      <main style={{paddingTop: page === "home" ? 0 : 0}}>
        {renderPage()}
      </main>
      <Footer setPage={setPage} />
      <Chatbot />
    </>
  );
}