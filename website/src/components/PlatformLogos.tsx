import React from 'react';

export interface LogoProps {
  className?: string;
  size?: number;
}

export const OllamaLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Ollama"
  >
    <path
      d="M11.5 5.5C9.8 5.5 8.5 6.8 8.5 8.5V12.5C7.1 13.8 6.2 15.6 6.2 17.8V26.5C6.2 29.3 8.5 31.5 11.2 31.5H24.8C27.5 31.5 29.8 29.3 29.8 26.5V17.8C29.8 15.6 28.9 13.8 27.5 12.5V8.5C27.5 6.8 26.2 5.5 24.5 5.5C23.1 5.5 22 6.4 21.7 7.7C20.5 7.4 19.3 7.2 18 7.2C16.7 7.2 15.5 7.4 14.3 7.7C14 6.4 12.9 5.5 11.5 5.5Z"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="14" cy="17" r="1.8" fill="currentColor" />
    <circle cx="22" cy="17" r="1.8" fill="currentColor" />
    <path
      d="M15.8 22.2C16.5 23 17.2 23.4 18 23.4C18.8 23.4 19.5 23 20.2 22.2"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    />
    <path d="M18 19.8V22.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

export const PythonLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Python"
  >
    <path
      d="M12.5 13C10.0147 13 8 15.2386 8 18C8 20.7614 10.0147 23 12.5 23C14.9853 23 17 20.7614 17 18C17 15.2386 14.9853 13 12.5 13Z"
      stroke="#F9AB00"
      strokeWidth="3.2"
    />
    <path
      d="M23.5 13C21.0147 13 19 15.2386 19 18C19 20.7614 21.0147 23 23.5 23C25.9853 23 28 20.7614 28 18C28 15.2386 25.9853 13 23.5 13Z"
      stroke="#E37400"
      strokeWidth="3.2"
    />
    <circle cx="12.5" cy="18" r="1.5" fill="#F9AB00" />
    <circle cx="23.5" cy="18" r="1.5" fill="#E37400" />
  </svg>
);

export const PyTorchLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="PyTorch"
  >
    <path
      d="M18 6L28 12V24L18 30L8 24V12L18 6Z"
      stroke="#EE4C2C"
      strokeWidth="2.5"
    />
    <path d="M18 6V18M18 18L28 12M18 18L8 12" stroke="#EE4C2C" strokeWidth="2.5" />
    <circle cx="18" cy="18" r="3" fill="#EE4C2C" />
  </svg>
);

export const OnnxLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="ONNX Runtime"
  >
    <polygon points="18,5 31,15 26,30 10,30 5,15" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="18" cy="5" r="2.5" fill="#FF5500" />
    <circle cx="31" cy="15" r="2.5" fill="currentColor" />
    <circle cx="26" cy="30" r="2.5" fill="currentColor" />
    <circle cx="10" cy="30" r="2.5" fill="currentColor" />
    <circle cx="5" cy="15" r="2.5" fill="#FF5500" />
  </svg>
);

export const HuggingFaceLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Hugging Face"
  >
    <path
      d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2Z"
      fill="#FFD21E"
    />
    {/* Eyes */}
    <ellipse cx="8.5" cy="10.5" rx="1.5" ry="2" fill="#0D0C0B" />
    <ellipse cx="15.5" cy="10.5" rx="1.5" ry="2" fill="#0D0C0B" />
    {/* Cheeks */}
    <ellipse cx="6" cy="13.5" rx="1.5" ry="1" fill="#FF8A00" opacity="0.6" />
    <ellipse cx="18" cy="13.5" rx="1.5" ry="1" fill="#FF8A00" opacity="0.6" />
    {/* Smile */}
    <path
      d="M8.5 14C9.5 16 14.5 16 15.5 14"
      stroke="#0D0C0B"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Hugging hands */}
    <path
      d="M4.5 10C3.5 11 3.5 13 4.5 14L6 14.5"
      stroke="#FF8A00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M19.5 10C20.5 11 20.5 13 19.5 14L18 14.5"
      stroke="#FF8A00"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const OpenClawLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="OpenClaw"
  >
    <path
      d="M12 4C8 4 4 7 4 12C4 16 7 19 10 20L12 21L14 20C17 19 20 16 20 12C20 7 16 4 12 4Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M6 10C6 10 8 8 10 9C12 10 12 13 12 13"
      stroke="#FF5500"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M18 10C18 10 16 8 14 9C12 10 12 13 12 13"
      stroke="#FF5500"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="9" cy="14" r="1.5" fill="currentColor" />
    <circle cx="15" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

export const HermesAgentLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Hermes Agent"
  >
    <path
      d="M12 3V21M12 3L8 7M12 3L16 7"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="6" stroke="#8B5CF6" strokeWidth="1.8" />
    <path
      d="M7 11C7 9.5 9 8 12 8C15 8 17 9.5 17 11"
      stroke="#8B5CF6"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export const AntigravityLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Google Antigravity"
  >
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
    <polygon points="12,5 18,17 6,17" stroke="#4285F4" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="2.5" fill="#34A853" />
  </svg>
);

export const GoogleColabLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Google Colab"
  >
    <path
      d="M7 8C4.79 8 3 9.79 3 12C3 14.21 4.79 16 7 16C9.21 16 11 13 12 12C11 11 9.21 8 7 8Z"
      fill="#F9AB00"
    />
    <path
      d="M17 8C19.21 8 21 9.79 21 12C21 14.21 19.21 16 17 16C14.79 16 13 13 12 12C13 11 14.79 8 17 8Z"
      fill="#E37400"
    />
  </svg>
);

export const JupyterLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Jupyter Notebook"
  >
    <ellipse cx="12" cy="7" rx="8" ry="2.5" stroke="#F37626" strokeWidth="1.8" />
    <ellipse cx="12" cy="17" rx="8" ry="2.5" stroke="#F37626" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="2.5" fill="#616161" />
    <circle cx="6" cy="12" r="1.5" fill="#F37626" />
    <circle cx="18" cy="12" r="1.5" fill="#F37626" />
  </svg>
);
