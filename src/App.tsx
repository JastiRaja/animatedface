import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

interface ValidationState {
  email: boolean;
  password: boolean;
  confirmPassword?: boolean;
  name?: boolean;
}

// Add a type for character styles
interface CharacterStyles {
  screen: string;
  eyeColor: string;
  eyeSize: string;
  pupilColor: string;
  mouth: {
    className: string;
    isLaugh?: boolean;
  };
}

const FloatingParticle: React.FC<{ delay: number }> = ({ delay }) => (
  <div 
    className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${3 + Math.random() * 2}s`
    }}
  />
);

const laptopColors = [
  'bg-gradient-to-br from-blue-300 to-purple-500',
  'bg-gradient-to-br from-green-300 to-green-700',
  'bg-gradient-to-br from-yellow-200 to-orange-400',
  'bg-gradient-to-br from-pink-300 to-red-500',
  'bg-gradient-to-br from-cyan-300 to-blue-500'
];

const AnimatedCharacter: React.FC<{
  mousePos: MousePosition;
  formState: 'idle' | 'typing' | 'success' | 'error' | 'loading';
  isVisible: boolean;
  isPasswordVisible: boolean;
  laptopColor: string;
  onLaptopClick: () => void;
  showLaughMouth?: boolean;
}> = ({ mousePos, formState, isVisible, isPasswordVisible, laptopColor, onLaptopClick, showLaughMouth }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current && isVisible && !isPasswordVisible) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = mousePos.x - centerX;
      const deltaY = mousePos.y - centerY;
      const maxDistance = 15;
      const normalizedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX / 10));
      const normalizedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY / 10));
      setEyePosition({ x: normalizedX, y: normalizedY });
    }
  }, [mousePos, isVisible, isPasswordVisible]);

  const getCharacterStyles = (): CharacterStyles => {
    if (showLaughMouth) {
      return {
        screen: laptopColor,
        eyeColor: 'bg-white',
        eyeSize: 'w-10 h-10',
        pupilColor: 'bg-green-800',
        mouth: {
          className: 'w-24 h-12 border-4 border-white border-t-0 rounded-b-full bg-white',
          isLaugh: true
        }
      };
    }
    switch (formState) {
      case 'success':
        return {
          screen: 'bg-gradient-to-br from-green-300 to-green-700',
          eyeColor: 'bg-white',
          eyeSize: 'w-10 h-10',
          pupilColor: 'bg-green-800',
          mouth: {
            className: 'w-20 h-10 border-4 border-white border-t-0 rounded-b-full'
          }
        };
      case 'error':
        return {
          screen: 'bg-gradient-to-br from-red-300 to-red-700',
          eyeColor: 'bg-white',
          eyeSize: 'w-8 h-8',
          pupilColor: 'bg-red-800',
          mouth: {
            className: 'w-16 h-8 border-4 border-white border-b-0 rounded-t-full'
          }
        };
      case 'loading':
        return {
          screen: 'bg-gradient-to-br from-yellow-200 to-orange-400',
          eyeColor: 'bg-white animate-ping',
          eyeSize: 'w-6 h-6',
          pupilColor: 'bg-orange-800',
          mouth: {
            className: 'w-8 h-8 bg-white rounded-full animate-pulse'
          }
        };
      case 'typing':
        return {
          screen: 'bg-gradient-to-br from-blue-200 to-purple-400',
          eyeColor: 'bg-white animate-pulse',
          eyeSize: 'w-9 h-9',
          pupilColor: 'bg-blue-800',
          mouth: {
            className: 'w-6 h-10 bg-white rounded-full'
          }
        };
      default:
        return {
          screen: 'bg-gradient-to-br from-blue-300 to-purple-500',
          eyeColor: 'bg-white',
          eyeSize: 'w-8 h-8',
          pupilColor: 'bg-blue-800',
          mouth: {
            className: 'w-12 h-4 bg-white rounded-full'
          }
        };
    }
  };

  const styles = getCharacterStyles();

  const renderEyes = () => {
    const eyesClass = showLaughMouth
      ? 'absolute top-4 md:top-6 left-1/2 -translate-x-1/2 flex space-x-8'
      : 'absolute top-8 md:top-8 left-1/2 -translate-x-1/2 flex space-x-8';
    if (isPasswordVisible) {
      return (
        <div className={eyesClass}>
          <div className={`${styles.eyeSize} ${styles.eyeColor} relative transition-all duration-300 flex items-center justify-center`}>
            <div className="w-full h-1 bg-gray-600 rounded-full" />
          </div>
          <div className={`${styles.eyeSize} ${styles.eyeColor} relative transition-all duration-300 flex items-center justify-center`}>
            <div className="w-full h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
      );
    }
    return (
      <div className={eyesClass}>
        <div className={`${styles.eyeSize} rounded-full ${styles.eyeColor} relative transition-all duration-200`}>
          <div 
            className={`w-4 h-4 ${styles.pupilColor} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100`}
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px) translate(-50%, -50%)`
            }}
          />
        </div>
        <div className={`${styles.eyeSize} rounded-full ${styles.eyeColor} relative transition-all duration-200`}>
          <div 
            className={`w-4 h-4 ${styles.pupilColor} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100`}
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px) translate(-50%, -50%)`
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-500 flex flex-col items-center ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
      style={{ perspective: '800px' }}
    >
      {/* Shadow */}
      <div className="absolute left-1/2 -translate-x-1/2 top-56 w-64 h-8 bg-black/40 rounded-full blur-md z-0" />
      {/* Laptop Hinge */}
      <div className="w-40 h-2 bg-gray-700 rounded-t-lg z-10 relative" style={{ marginBottom: '-8px', marginTop: '8px' }} />
      {/* Laptop Screen with Bezel */}
      <div
        className={`w-40 h-28 md:w-56 md:h-40 rounded-xl border-8 border-gray-900 shadow-2xl relative z-10 flex flex-col items-center justify-center ${laptopColor}`}
        style={{
          transform: 'rotateX(12deg)',
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
          cursor: 'pointer'
        }}
        onClick={onLaptopClick}
      >
        {/* Eyes */}
        {renderEyes()}
        {/* Mouth */}
        <div className={`absolute ${showLaughMouth ? 'bottom-2 md:bottom-4' : 'bottom-6 md:bottom-10'} left-1/2 transform -translate-x-1/2`}>
          <div className={`${styles.mouth.className} transition-all duration-300`} />
          {styles.mouth.isLaugh && (
            <div className="absolute left-1/2 top-1/2 w-12 h-6 bg-pink-300 rounded-b-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 1 }} />
          )}
        </div>
        {/* Optional: Success sparkles */}
        {formState === 'success' && (
          <>
            <Sparkles className="absolute top-4 left-4 text-white animate-spin" size={20} />
            <Sparkles className="absolute top-8 right-6 text-yellow-300 animate-bounce" size={16} />
            <Sparkles className="absolute bottom-6 left-8 text-white animate-pulse" size={18} />
          </>
        )}
        {formState === 'loading' && (
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        )}
      </div>
      {/* Laptop Base */}
      <div
        className="w-52 h-8 md:w-72 md:h-10 bg-gray-800 rounded-b-2xl shadow-lg z-20 relative flex flex-col items-center"
        style={{ marginTop: '-12px', borderTop: '4px solid #222' }}
      >
        {/* Keyboard lines */}
        <div className="w-60 h-1 bg-gray-700 rounded-full mt-2 mb-1" />
        <div className="w-56 h-1 bg-gray-700 rounded-full mb-1" />
        <div className="w-52 h-1 bg-gray-700 rounded-full mb-1" />
        {/* Touchpad */}
        <div className="w-16 h-3 bg-gray-600 rounded-md mt-2" />
      </div>
      {/* Floating elements around laptop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-white/20 rounded-full animate-float"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const InputField: React.FC<{
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  isValid?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}> = ({ type, placeholder, value, onChange, icon, isValid, showPassword, onTogglePassword, onFocus, onBlur }) => {
  return (
    <div className="relative group">
      <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-200 ${
        value ? 'text-blue-500' : 'text-gray-400 group-focus-within:text-blue-500'
      }`}>
        {icon}
      </div>
      <input
        type={showPassword !== undefined ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        className={`w-full pl-12 pr-12 py-4 bg-white/10 backdrop-blur-sm border-2 rounded-xl text-white placeholder-gray-300 transition-all duration-300 focus:outline-none focus:bg-white/20 focus:scale-105 ${
          isValid === false ? 'border-red-400 focus:border-red-400' : 
          isValid === true ? 'border-green-400 focus:border-green-400' : 
          'border-white/20 focus:border-blue-400'
        }`}
      />
      {onTogglePassword && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
};

// Hook to detect if screen is mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

// AnimatedMobileCharacter component
const AnimatedMobileCharacter: React.FC<{
  mousePos: MousePosition;
  formState: 'idle' | 'typing' | 'success' | 'error' | 'loading';
  isVisible: boolean;
  isPasswordVisible: boolean;
  laptopColor: string;
  onLaptopClick: () => void;
  showLaughMouth?: boolean;
}> = ({ mousePos, formState, isVisible, isPasswordVisible, laptopColor, onLaptopClick, showLaughMouth }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current && isVisible && !isPasswordVisible) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = mousePos.x - centerX;
      const deltaY = mousePos.y - centerY;
      const maxDistance = 8;
      const normalizedX = Math.max(-maxDistance, Math.min(maxDistance, deltaX / 14));
      const normalizedY = Math.max(-maxDistance, Math.min(maxDistance, deltaY / 14));
      setEyePosition({ x: normalizedX, y: normalizedY });
    }
  }, [mousePos, isVisible, isPasswordVisible]);

  // Styles for mobile phone
  const getCharacterStyles = () => {
    if (showLaughMouth) {
      return {
        phone: laptopColor,
        eyeColor: 'bg-white',
        eyeSize: 'w-6 h-6',
        pupilColor: 'bg-green-800',
        mouth: {
          className: 'w-16 h-7 border-2 border-white border-t-0 rounded-b-full bg-white',
          isLaugh: true
        }
      };
    }
    switch (formState) {
      case 'success':
        return {
          phone: 'bg-gradient-to-br from-green-300 to-green-700',
          eyeColor: 'bg-white',
          eyeSize: 'w-5 h-5',
          pupilColor: 'bg-green-800',
          mouth: {
            className: 'w-12 h-5 border-2 border-white border-t-0 rounded-b-full'
          }
        };
      case 'error':
        return {
          phone: 'bg-gradient-to-br from-red-300 to-red-700',
          eyeColor: 'bg-white',
          eyeSize: 'w-5 h-5',
          pupilColor: 'bg-red-800',
          mouth: {
            className: 'w-10 h-4 border-2 border-white border-b-0 rounded-t-full'
          }
        };
      case 'loading':
        return {
          phone: 'bg-gradient-to-br from-yellow-200 to-orange-400',
          eyeColor: 'bg-white animate-ping',
          eyeSize: 'w-4 h-4',
          pupilColor: 'bg-orange-800',
          mouth: {
            className: 'w-7 h-7 bg-white rounded-full animate-pulse'
          }
        };
      case 'typing':
        return {
          phone: 'bg-gradient-to-br from-blue-200 to-purple-400',
          eyeColor: 'bg-white animate-pulse',
          eyeSize: 'w-5 h-5',
          pupilColor: 'bg-blue-800',
          mouth: {
            className: 'w-5 h-7 bg-white rounded-full'
          }
        };
      default:
        return {
          phone: 'bg-gradient-to-br from-blue-300 to-purple-500',
          eyeColor: 'bg-white',
          eyeSize: 'w-5 h-5',
          pupilColor: 'bg-blue-800',
          mouth: {
            className: 'w-8 h-2 bg-white rounded-full'
          }
        };
    }
  };

  const styles = getCharacterStyles();

  const renderEyes = () => {
    if (isPasswordVisible) {
      return (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex space-x-4">
          <div className={`${styles.eyeSize} ${styles.eyeColor} relative transition-all duration-300 flex items-center justify-center`}>
            <div className="w-full h-1 bg-gray-600 rounded-full" />
          </div>
          <div className={`${styles.eyeSize} ${styles.eyeColor} relative transition-all duration-300 flex items-center justify-center`}>
            <div className="w-full h-1 bg-gray-600 rounded-full" />
          </div>
        </div>
      );
    }
    return (
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex space-x-4">
        <div className={`${styles.eyeSize} rounded-full ${styles.eyeColor} relative transition-all duration-200`}>
          <div 
            className={`w-2.5 h-2.5 ${styles.pupilColor} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100`}
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px) translate(-50%, -50%)`
            }}
          />
        </div>
        <div className={`${styles.eyeSize} rounded-full ${styles.eyeColor} relative transition-all duration-200`}>
          <div 
            className={`w-2.5 h-2.5 ${styles.pupilColor} rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100`}
            style={{
              transform: `translate(${eyePosition.x}px, ${eyePosition.y}px) translate(-50%, -50%)`
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative transition-all duration-500 flex flex-col items-center ${isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
      style={{ perspective: '800px' }}
    >
      {/* Phone Body */}
      <div
        className={`w-24 h-40 rounded-3xl border-4 border-gray-900 shadow-2xl relative z-10 flex flex-col items-center justify-center ${styles.phone}`}
        style={{
          boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)',
          cursor: 'pointer',
        }}
        onClick={onLaptopClick}
      >
        {/* Eyes */}
        {renderEyes()}
        {/* Mouth */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className={`${styles.mouth.className} transition-all duration-300`} />
          {styles.mouth.isLaugh && (
            <div className="absolute left-1/2 top-1/2 w-8 h-4 bg-pink-300 rounded-b-full -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 1 }} />
          )}
        </div>
        {/* Home Button */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const [formState, setFormState] = useState<'idle' | 'typing' | 'success' | 'error' | 'loading'>('idle');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  
  const [validation, setValidation] = useState<ValidationState>({
    email: false,
    password: false,
    confirmPassword: false,
    name: false
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [laptopColorIdx, setLaptopColorIdx] = useState(0);
  const [showFunnyMsg, setShowFunnyMsg] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Validate form fields
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const passwordValid = formData.password.length >= 6;
    const confirmPasswordValid = !isLogin ? formData.password === formData.confirmPassword : true;
    const nameValid = !isLogin ? formData.name!.length >= 2 : true;

    setValidation({
      email: formData.email ? emailValid : false,
      password: formData.password ? passwordValid : false,
      confirmPassword: !isLogin ? (formData.confirmPassword ? confirmPasswordValid : false) : undefined,
      name: !isLogin ? (formData.name ? nameValid : false) : undefined
    });

    // Update form state based on validation
    if (focusedField) {
      setFormState('typing');
    } else if (formData.email || formData.password || formData.name || formData.confirmPassword) {
      const hasErrors = !emailValid || !passwordValid || !confirmPasswordValid || !nameValid;
      if (hasErrors && (formData.email || formData.password || formData.name || formData.confirmPassword)) {
        setFormState('error');
      } else {
        setFormState('idle');
      }
    } else {
      setFormState('idle');
    }
  }, [formData, isLogin, focusedField]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormState('loading');

    // Wait a moment for animation
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (isLogin) {
        // LOGIN
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        if (response.ok) {
          setFormState('success');
        } else {
          setFormState('error');
        }
      } else {
        // SIGNUP
        const response = await fetch('http://localhost:5000/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name
          })
        });
        if (response.ok) {
          setFormState('success');
          setTimeout(() => {
            setFormData({ email: '', password: '', confirmPassword: '', name: '' });
            setFormState('idle');
            setIsSubmitting(false);
          }, 2000); // setFormData({ email: '', password: '', confirmPassword: '', name: '' }); 
        } else {
          setFormState('error');
          setTimeout(() => {
            setFormState('idle');
            setIsSubmitting(false);
          }, 2000);
        }
      }
    } catch (err) {
      setFormState('error');
    }

    setTimeout(() => {
      setFormState('idle');
      setIsSubmitting(false);
    }, 2000);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ email: '', password: '', confirmPassword: '', name: '' });
    setFormState('idle');
    setFocusedField(null);
  };

  // Check if any password field is visible
  const isAnyPasswordVisible = showPassword || showConfirmPassword;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col md:flex-row overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Left Panel - Forms */}
      <div className="w-full md:flex-1 flex items-center justify-center p-4 md:p-8 relative z-10">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">
              {isLogin ? 'Welcome Back' : 'Join Us'}
            </h1>
            <p className="text-gray-300 animate-fade-in-delay">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <InputField
                type="text"
                placeholder="Full Name"
                value={formData.name || ''}
                onChange={(value) => setFormData({ ...formData, name: value })}
                icon={<User size={20} />}
                isValid={validation.name}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
            )}

            <InputField
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              icon={<Mail size={20} />}
              isValid={validation.email}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
            />

            <InputField
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              icon={<Lock size={20} />}
              isValid={validation.password}
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
            />

            {!isLogin && (
              <InputField
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword || ''}
                onChange={(value) => setFormData({ ...formData, confirmPassword: value })}
                icon={<Lock size={20} />}
                isValid={validation.confirmPassword}
                showPassword={showConfirmPassword}
                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                onFocus={() => setFocusedField('confirmPassword')}
                onBlur={() => setFocusedField(null)}
              />
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                isSubmitting 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
              }`}
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="text-center mt-8">
            <p className="text-gray-300">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Animation */}
      <div className="w-full md:flex-1 flex items-center justify-center p-4 md:p-8 relative">
        <div className="flex flex-col items-center justify-center w-full h-full">
          {isMobile ? (
            <AnimatedMobileCharacter
              mousePos={mousePos}
              formState={formState}
              isVisible={true}
              isPasswordVisible={isAnyPasswordVisible}
              laptopColor={laptopColors[laptopColorIdx]}
              onLaptopClick={() => {
                setLaptopColorIdx((prev) => (prev + 1) % laptopColors.length);
                setShowFunnyMsg(true);
                setTimeout(() => setShowFunnyMsg(false), 2000);
              }}
              showLaughMouth={showFunnyMsg}
            />
          ) : (
            <AnimatedCharacter 
              mousePos={mousePos} 
              formState={formState}
              isVisible={true}
              isPasswordVisible={isAnyPasswordVisible}
              laptopColor={laptopColors[laptopColorIdx]}
              onLaptopClick={() => {
                setLaptopColorIdx((prev) => (prev + 1) % laptopColors.length);
                setShowFunnyMsg(true);
                setTimeout(() => setShowFunnyMsg(false), 2000);
              }}
              showLaughMouth={showFunnyMsg}
            />
          )}
          {/* Robust visible funny message below emoji */}
          {showFunnyMsg && (
            <div style={{
              textAlign: 'center',
              marginTop: 24,
              color: '#ec4899',
              fontWeight: 'bold',
              fontSize: 24,
              background: 'rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '8px 24px',
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)'
            }}>
              Haha it's funny😂!
            </div>
          )}
          {/* Status Messages */}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
            {formState === 'success' && (
              <p className="text-green-400 font-semibold animate-bounce">
                {isLogin ? 'Welcome back!' : 'Account created successfully!'}
              </p>
            )}
            {formState === 'error' && (
              <p className="text-red-400 font-semibold animate-pulse">
                Please check your information
              </p>
            )}
            {formState === 'loading' && (
              <p className="text-yellow-400 font-semibold animate-pulse">
                Processing...
              </p>
            )}
            {formState === 'typing' && (
              <p className="text-blue-400 font-semibold">
                I'm watching you type! 👀
              </p>
            )}
            {isAnyPasswordVisible && (
              <p className="text-purple-400 font-semibold animate-pulse">
                I can't see! 🙈
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 0.8s ease-out 0.2s both;
        }
      `}</style>
    </div>
  );
}

export default App;