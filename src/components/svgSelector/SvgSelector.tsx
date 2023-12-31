import React from 'react';

export interface SvgSelectorProps {
  id: string;
  className?: string;
  style?: Record<string, string>;
}

type TSvgMapItem = Record<string, JSX.Element>;

const SvgSelector: React.FC<SvgSelectorProps> = ({ id, className, style }) => {
  const svgMap: TSvgMapItem = {
    search: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
      </svg>
    ),
    placeholder: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86-3 3.87L9 13.14 6 17h12l-3.86-5.14z" />
      </svg>
    ),
    burger: (
      <svg
        className={className}
        style={style}
        viewBox="0 30 20 20"
        fill="#7E8DB7"
      >
        <rect y="35.5" width="20" height="2" rx="1" fill="#7E8DB7" />
        <rect y="42.5" width="20" height="2" rx="1" fill="#7E8DB7" />
      </svg>
    ),
    light_mode: (
      <svg className={className} style={style} viewBox="0 0 25 24">
        <path d="M12.3077 6.54545C9.29677 6.54545 6.85313 8.98909 6.85313 12C6.85313 15.0109 9.29677 17.4545 12.3077 17.4545C15.3186 17.4545 17.7622 15.0109 17.7622 12C17.7622 8.98909 15.3186 6.54545 12.3077 6.54545ZM1.39859 13.0909H3.58041C4.18041 13.0909 4.67131 12.6 4.67131 12C4.67131 11.4 4.18041 10.9091 3.58041 10.9091H1.39859C0.798587 10.9091 0.307678 11.4 0.307678 12C0.307678 12.6 0.798587 13.0909 1.39859 13.0909ZM21.035 13.0909H23.2168C23.8168 13.0909 24.3077 12.6 24.3077 12C24.3077 11.4 23.8168 10.9091 23.2168 10.9091H21.035C20.435 10.9091 19.944 11.4 19.944 12C19.944 12.6 20.435 13.0909 21.035 13.0909ZM11.2168 1.09091V3.27273C11.2168 3.87273 11.7077 4.36364 12.3077 4.36364C12.9077 4.36364 13.3986 3.87273 13.3986 3.27273V1.09091C13.3986 0.490909 12.9077 0 12.3077 0C11.7077 0 11.2168 0.490909 11.2168 1.09091ZM11.2168 20.7273V22.9091C11.2168 23.5091 11.7077 24 12.3077 24C12.9077 24 13.3986 23.5091 13.3986 22.9091V20.7273C13.3986 20.1273 12.9077 19.6364 12.3077 19.6364C11.7077 19.6364 11.2168 20.1273 11.2168 20.7273ZM5.75131 3.90545C5.32586 3.48 4.62768 3.48 4.21313 3.90545C3.78768 4.33091 3.78768 5.02909 4.21313 5.44364L5.3695 6.6C5.79495 7.02545 6.49313 7.02545 6.90768 6.6C7.32222 6.17455 7.33313 5.47636 6.90768 5.06182L5.75131 3.90545ZM19.2459 17.4C18.8204 16.9745 18.1222 16.9745 17.7077 17.4C17.2822 17.8255 17.2822 18.5236 17.7077 18.9382L18.864 20.0945C19.2895 20.52 19.9877 20.52 20.4022 20.0945C20.8277 19.6691 20.8277 18.9709 20.4022 18.5564L19.2459 17.4ZM20.4022 5.44364C20.8277 5.01818 20.8277 4.32 20.4022 3.90545C19.9768 3.48 19.2786 3.48 18.864 3.90545L17.7077 5.06182C17.2822 5.48727 17.2822 6.18545 17.7077 6.6C18.1331 7.01455 18.8313 7.02545 19.2459 6.6L20.4022 5.44364ZM6.90768 18.9382C7.33313 18.5127 7.33313 17.8145 6.90768 17.4C6.48222 16.9745 5.78404 16.9745 5.3695 17.4L4.21313 18.5564C3.78768 18.9818 3.78768 19.68 4.21313 20.0945C4.63859 20.5091 5.33677 20.52 5.75131 20.0945L6.90768 18.9382Z" />
      </svg>
    ),
    dark_mode: (
      <svg className={className} style={style} viewBox="0 0 24 24">
        <path d="M11.1 12.08c-2.33-4.51-.5-8.48.53-10.07C6.27 2.2 1.98 6.59 1.98 12c0 .14.02.28.02.42.62-.27 1.29-.42 2-.42 1.66 0 3.18.83 4.1 2.15 1.67.48 2.9 2.02 2.9 3.85 0 1.52-.87 2.83-2.12 3.51.98.32 2.03.5 3.11.5 3.5 0 6.58-1.8 8.37-4.52-2.36.23-6.98-.97-9.26-5.41z" />
        <path d="M7 16h-.18C6.4 14.84 5.3 14 4 14c-1.66 0-3 1.34-3 3s1.34 3 3 3h3c1.1 0 2-.9 2-2s-.9-2-2-2z" />
      </svg>
    ),
    notification: (
      <svg className={className} style={style} viewBox="0 0 22 24" fill="none">
        <path d="M10.1538 24C11.5077 24 12.6154 22.8923 12.6154 21.5385H7.69229C7.69229 22.8923 8.78768 24 10.1538 24ZM17.5384 16.6154V10.4615C17.5384 6.68308 15.52 3.52 12 2.68308V1.84615C12 0.824615 11.1754 0 10.1538 0C9.13229 0 8.30768 0.824615 8.30768 1.84615V2.68308C4.77537 3.52 2.76922 6.67077 2.76922 10.4615V16.6154L0.307678 19.0769V20.3077H20V19.0769L17.5384 16.6154Z" />
      </svg>
    ),
    cancel: (
      <svg className={className} style={style} viewBox="0 0 16 16" fill="none">
        <path
          d="M16 1.61143L14.3886 0L8 6.38857L1.61143 0L0 1.61143L6.38857 8L0 14.3886L1.61143 16L8 9.61143L14.3886 16L16 14.3886L9.61143 8L16 1.61143Z"
          fill="#7E8DB7"
        />
      </svg>
    ),
    hide: (
      <svg className={className} style={style} viewBox="0 0 45 45" fill="none">
        <path
          d="M22.864 29.184H26.032L21.888 22.208L26.032 15.232H22.848L18.816 22.208L22.864 29.184Z"
          fill="white"
        />
        <rect x="0.5" y="0.5" width="44" height="44" rx="22" stroke="#7E8DB7" />
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
      </svg>
    ),
    logout: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
      </svg>
    ),
    view: (
      <svg className={className} style={style} viewBox="0 0 20 14" fill="none">
        <path
          d="M10 0.181763C5.45455 0.181763 1.57273 3.00904 0 6.99994C1.57273 10.9909 5.45455 13.8181 10 13.8181C14.5455 13.8181 18.4273 10.9909 20 6.99994C18.4273 3.00904 14.5455 0.181763 10 0.181763ZM10 11.5454C7.49091 11.5454 5.45455 9.50904 5.45455 6.99994C5.45455 4.49085 7.49091 2.45449 10 2.45449C12.5091 2.45449 14.5455 4.49085 14.5455 6.99994C14.5455 9.50904 12.5091 11.5454 10 11.5454ZM10 4.27267C8.49091 4.27267 7.27273 5.49085 7.27273 6.99994C7.27273 8.50904 8.49091 9.72722 10 9.72722C11.5091 9.72722 12.7273 8.50904 12.7273 6.99994C12.7273 5.49085 11.5091 4.27267 10 4.27267Z"
          fill="#7E8DB7"
        />
      </svg>
    ),
    edit: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
      </svg>
    ),
    more: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    ),
    emoji: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <circle cx="15.5" cy="9.5" r="1.5" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <circle cx="15.5" cy="9.5" r="1.5" />
        <circle cx="8.5" cy="9.5" r="1.5" />
        <path d="M12,2.5c-5.2,0-9.5,4.3-9.5,9.5s4.2,9.5,9.5,9.5c5.3,0,9.5-4.3,9.5-9.5S17.2,2.5,12,2.5z M12,19.6c-4.2,0-7.6-3.4-7.6-7.6S7.8,4.4,12,4.4s7.6,3.4,7.6,7.6S16.2,19.6,12,19.6z M12,17.2c2.2,0,4.1-1.4,4.9-3.3h-1.6c-0.7,1.1-1.9,1.9-3.3,1.9S9.4,15,8.7,13.9H7.1C7.9,15.8,9.8,17.2,12,17.2z" />
      </svg>
    ),
    microphone: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
      </svg>
    ),
    attachFile: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M19.5,10.9l-8,8c-1.5,1.5-4,1.5-5.5,0c-1.5-1.5-1.5-4,0-5.5l8.7-8.7c1-1,2.5-1,3.5,0c1,1,1,2.5,0,3.5l-7.3,7.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l6.6-6.6l-1-1L8.5,13c-1,1-1,2.5,0,3.5c1,1,2.5,1,3.5,0l7.3-7.3c1.5-1.5,1.5-4,0-5.5c-1.5-1.5-4-1.5-5.5,0L5,12.3c-2.1,2.1-2.1,5.5,0,7.6s5.5,2.1,7.6,0l8-8L19.5,10.9z" />
      </svg>
    ),
    mute: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
      </svg>
    ),
    send: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    ),
    time: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
      </svg>
    ),
    friends: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    inventory: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    ),
    arrowLeft: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
      </svg>
    ),
    arrowRight: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    ),
    zoomIn: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" />
      </svg>
    ),
    zoomOut: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" />
      </svg>
    ),
    alternate: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
      </svg>
    ),
    notifications: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
    delete: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z" />
      </svg>
    ),
    block: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z" />
      </svg>
    ),
    select: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M16.54 11 13 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L16.54 11zM11 7H2v2h9V7zm10 6.41L19.59 12 17 14.59 14.41 12 13 13.41 15.59 16 13 18.59 14.41 20 17 17.41 19.59 20 21 18.59 18.41 16 21 13.41zM11 15H2v2h9v-2z" />
      </svg>
    ),
    search2: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
      </svg>
    ),
    reply: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
      </svg>
    ),
    copy: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
      </svg>
    ),
    pin: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path
          fillRule="evenodd"
          d="M16 9V4h1c.55 0 1-.45 1-1s-.45-1-1-1H7c-.55 0-1 .45-1 1s.45 1 1 1h1v5c0 1.66-1.34 3-3 3v2h5.97v7l1 1 1-1v-7H19v-2c-1.66 0-3-1.34-3-3z"
        />
      </svg>
    ),
    checkCircle: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M9.6,18l-6-6l1.7-1.7l4.3,4.3l9.1-9.1l1.7,1.7L9.6,18z" />
      </svg>
    ),
    language: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="m12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7 1.62-4.33L19.12 17h-3.24z" />
      </svg>
    ),
    privacy: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
      </svg>
    ),
    devices: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M3 6h18V4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-2H3V6zm10 6H9v1.78c-.61.55-1 1.33-1 2.22s.39 1.67 1 2.22V20h4v-1.78c.61-.55 1-1.34 1-2.22s-.39-1.67-1-2.22V12zm-2 5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM22 8h-6c-.5 0-1 .5-1 1v10c0 .5.5 1 1 1h6c.5 0 1-.5 1-1V9c0-.5-.5-1-1-1zm-1 10h-4v-8h4v8z" />
      </svg>
    ),
    blocked: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M15.18 10.94c.2-.44.32-.92.32-1.44C15.5 7.57 13.93 6 12 6c-.52 0-1 .12-1.44.32l4.62 4.62z" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 13c-2.32 0-4.45.8-6.14 2.12C4.7 15.73 4 13.95 4 12c0-1.85.63-3.55 1.69-4.9l2.86 2.86c.21 1.56 1.43 2.79 2.99 2.99l2.2 2.2c-.57-.1-1.15-.15-1.74-.15zm6.31 1.9L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.54-1.69 4.9z" />
      </svg>
    ),
    key: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M21 10h-8.35C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H13l2 2 2-2 2 2 4-4.04L21 10zM7 15c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z" />
      </svg>
    ),
    addPerson: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    add: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    ),
    simpleArrowLeft: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" className={className} style={style}>
        <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
      </svg>
    ),
  };

  // eslint-disable-next-line no-prototype-builtins
  if (!svgMap.hasOwnProperty(id)) {
    console.warn(`Svg with id "${id}" doesn't exist`);
    return svgMap.placeholder;
  }

  return svgMap[id];
};

export default React.memo(SvgSelector);
