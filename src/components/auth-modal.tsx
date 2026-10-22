"use client";

import React, { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { getOrCreateStudentId } from "@/lib/student-tracker";
import {
  normalizeBangladeshiPhone,
  isValidBangladeshiPhone,
} from "@/lib/phone-util";

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  medicalProgress?: { completedTopicIds?: string[]; percent?: number; score?: number };
  academicProgress?: { completedTopicIds?: string[]; percent?: number };
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserAccount) => void;
  currentMedicalProgress?: { completedTopicIds: string[]; percent: number; score: number };
  currentAcademicProgress?: { completedTopicIds: string[]; percent: number };
  initialStudentName?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  onAuthSuccess,
  currentMedicalProgress,
  currentAcademicProgress,
  initialStudentName,
}: AuthModalProps) {
  // Initial display is "login" as requested
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState(initialStudentName || "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [duplicateUser, setDuplicateUser] = useState<{ name?: string; phone: string } | null>(null);
  const [notFoundPhone, setNotFoundPhone] = useState<string | null>(null);

  const phoneInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  // Sync initial student name if provided
  useEffect(() => {
    if (initialStudentName && !name) {
      setName(initialStudentName);
    }
  }, [initialStudentName]);

  // Reset transient messages on modal open
  useEffect(() => {
    if (isOpen) {
      setErrorMsg("");
      setInfoMsg("");
      setDuplicateUser(null);
      setNotFoundPhone(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Real-time phone check on register
  const handlePhoneChange = (raw: string) => {
    const clean = normalizeBangladeshiPhone(raw);
    setPhone(clean);
    setErrorMsg("");
    setInfoMsg("");
    setNotFoundPhone(null);

    // If 11 valid digits are entered in register mode, check for duplicity in background
    if (tab === "register") {
      if (clean.length === 11 && isValidBangladeshiPhone(clean)) {
        checkPhoneDuplicity(clean);
      } else {
        setDuplicateUser(null);
      }
    }
  };

  const checkPhoneDuplicity = async (targetPhone: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "check_phone", phone: targetPhone }),
      });
      const data = await res.json();
      if (data.exists) {
        setDuplicateUser({ name: data.name, phone: targetPhone });
      } else {
        setDuplicateUser(null);
      }
    } catch {
      // Ignore background check failure
    }
  };

  const switchToLoginWithPhone = (ph: string) => {
    setTab("login");
    setPhone(ph);
    setPassword("");
    setDuplicateUser(null);
    setNotFoundPhone(null);
    setErrorMsg("");
    setInfoMsg("আপনার অ্যাকাউন্টের পাসওয়ার্ড দিয়ে লগইন সম্পন্ন করুন।");
    setTimeout(() => {
      passwordInputRef.current?.focus();
    }, 150);
  };

  const switchToRegisterWithPhone = (ph: string) => {
    setTab("register");
    setPhone(ph);
    setPassword("");
    setDuplicateUser(null);
    setNotFoundPhone(null);
    setErrorMsg("");
    setInfoMsg("নতুন অ্যাকাউন্টের তথ্য পূরণ করে সংরক্ষণ করুন।");
    setTimeout(() => {
      phoneInputRef.current?.focus();
    }, 150);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setInfoMsg("");

    const cleanPhone = normalizeBangladeshiPhone(phone);
    if (!isValidBangladeshiPhone(cleanPhone)) {
      setErrorMsg("সঠিক ১১ ডিজিটের ফোন নম্বর লিখুন (যেমন: 01712345678)");
      phoneInputRef.current?.focus();
      return;
    }

    if (!password.trim() || password.length < 4) {
      setErrorMsg("পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে।");
      passwordInputRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const clientUid = getOrCreateStudentId();
      const payload: any = {
        action: tab,
        phone: cleanPhone,
        password: password.trim(),
        clientUid,
        currentMedicalProgress: currentMedicalProgress || { completedTopicIds: [], percent: 0, score: 0 },
        currentAcademicProgress: currentAcademicProgress || { completedTopicIds: [], percent: 0 },
      };

      if (tab === "register") {
        if (!name.trim()) {
          setErrorMsg("অনুগ্রহ করে আপনার নাম লিখুন।");
          setLoading(false);
          return;
        }
        payload.name = name.trim();
        payload.medicalProgress = payload.currentMedicalProgress;
        payload.academicProgress = payload.currentAcademicProgress;
      }

      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      // Handle account already exists on register
      if (res.status === 409 || data.code === "ACCOUNT_EXISTS") {
        setDuplicateUser({ name: data.name, phone: cleanPhone });
        setErrorMsg("এই ফোন নম্বরে ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে।");
        return;
      }

      // Handle account not found on login
      if (res.status === 404 || data.code === "ACCOUNT_NOT_FOUND") {
        setNotFoundPhone(cleanPhone);
        setErrorMsg("এই নম্বরে কোনো অ্যাকাউন্ট পাওয়া যায়নি।");
        return;
      }

      if (!res.ok || data.error) {
        setErrorMsg(data.error || "ত্রুটি হয়েছে। পুনরায় চেষ্টা করুন।");
        return;
      }

      if (data.user) {
        if (data.token) {
          localStorage.setItem("bob_session_token", data.token);
        }
        localStorage.setItem("bob_cached_user", JSON.stringify(data.user));
        onAuthSuccess(data.user);
        onClose();
      }
    } catch {
      setErrorMsg("সার্ভার সংযোগে ত্রুটি হয়েছে। আপনার ইন্টারনেট কানেকশন চেক করুন।");
    } finally {
      setLoading(false);
    }
  };

  const isPhoneValid = isValidBangladeshiPhone(phone);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-[#ebe6dc] space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#ebe6dc]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#e3f0ea] text-[#0f6b4f] flex items-center justify-center shadow-2xs">
              <Icon
                icon={tab === "login" ? "solar:login-2-bold" : "solar:user-plus-bold"}
                className="w-5 h-5"
              />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#17201c]">
                {tab === "login" ? "অ্যাকাউন্টে লগইন করুন" : "নতুন অ্যাকাউন্ট তৈরি"}
              </h3>
              <p className="text-[11px] text-[#626965] font-semibold">
                আপনার দাগানো প্রগ্রেস ক্লাউডে সেভ থাকবে
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1 text-[#8a918d] hover:text-[#17201c] rounded-full hover:bg-[#f3efe7] transition cursor-pointer"
          >
            <Icon icon="solar:close-circle-bold" className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-[#f6f2ea] rounded-xl border border-[#ebe6dc]">
          <button
            type="button"
            onClick={() => {
              setTab("login");
              setErrorMsg("");
              setInfoMsg("");
              setDuplicateUser(null);
              setNotFoundPhone(null);
            }}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${tab === "login"
              ? "bg-white text-[#0f6b4f] shadow-xs"
              : "text-[#626965] hover:text-[#17201c]"
              }`}
          >
            <Icon icon="solar:login-2-bold" className="w-3.5 h-3.5" />
            <span>লগইন</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("register");
              setErrorMsg("");
              setInfoMsg("");
              setDuplicateUser(null);
              setNotFoundPhone(null);
            }}
            className={`flex-1 py-1.5 text-xs font-black rounded-lg transition cursor-pointer flex items-center justify-center gap-1.5 ${tab === "register"
              ? "bg-white text-[#0f6b4f] shadow-xs"
              : "text-[#626965] hover:text-[#17201c]"
              }`}
          >
            <Icon icon="solar:user-plus-bold" className="w-3.5 h-3.5" />
            <span>নতুন অ্যাকাউন্ট</span>
          </button>
        </div>

        {/* Info Message */}
        {infoMsg && (
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0f6b4f] text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Icon icon="solar:check-circle-bold" className="w-4 h-4 flex-shrink-0 text-emerald-600" />
            <span>{infoMsg}</span>
          </div>
        )}

        {/* Duplicate User Detected on Register -> Instant Login Option */}
        {duplicateUser && (
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <Icon icon="solar:shield-warning-bold" className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold">
                  এই নম্বরে (<span className="font-mono">{duplicateUser.phone}</span>) ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে!
                </p>
                <p className="text-[11px] text-amber-800/90 mt-0.5">
                  নিচের বাটনে চাপ দিলে সরাসরি লগইন মোডে গিয়ে পাসওয়ার্ড চাওয়া হবে।
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => switchToLoginWithPhone(duplicateUser.phone)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0f6b4f] hover:bg-[#093e2e] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              <Icon icon="solar:login-2-bold" className="w-4 h-4" />
              <span>লগইন করুন (পাসওয়ার্ড দিন)</span>
            </button>
          </div>
        )}

        {/* Account Not Found on Login -> Instant Register Option */}
        {notFoundPhone && (
          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 space-y-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <Icon icon="solar:info-circle-bold" className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs leading-relaxed">
                <p className="font-bold">
                  <span className="font-mono">{notFoundPhone}</span> নম্বরে কোনো অ্যাকাউন্ট পাওয়া যায়নি।
                </p>
                <p className="text-[11px] text-blue-800/90 mt-0.5">
                  এই নম্বরটি দিয়ে একটি নতুন অ্যাকাউন্ট খুলে ফেলুন এবং প্রগ্রেস সেভ রাখুন।
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => switchToRegisterWithPhone(notFoundPhone)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0f6b4f] hover:bg-[#093e2e] text-white text-xs font-bold rounded-xl shadow-xs transition cursor-pointer"
            >
              <Icon icon="solar:user-plus-bold" className="w-4 h-4" />
              <span>নতুন অ্যাকাউন্ট তৈরি করুন</span>
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {tab === "register" && (
            <div>
              <label className="text-xs font-bold text-[#17201c] block mb-1">
                আপনার নাম <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="যেমন: আরাভী"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-[#ded8cc] focus:outline-hidden focus:border-[#0f6b4f] bg-[#faf8f4] pl-9"
                />
                <Icon
                  icon="solar:user-bold"
                  className="w-4 h-4 text-[#8a918d] absolute left-3 top-3"
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#17201c]">
                ফোন নম্বর <span className="text-red-500">*</span>
              </label>
              <span
                className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${isPhoneValid
                  ? "bg-emerald-100 text-emerald-800"
                  : phone.length > 0
                    ? "bg-amber-100 text-amber-800"
                    : "text-[#8a918d]"
                  }`}
              >
                {phone.length}/১১ {isPhoneValid && "✓"}
              </span>
            </div>
            <div className="relative">
              <input
                ref={phoneInputRef}
                type="tel"
                inputMode="numeric"
                required
                maxLength={11}
                placeholder="017XXXXXXXX"
                value={phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`w-full font-mono text-xs tracking-wider font-semibold px-3 py-2.5 rounded-xl border transition bg-[#faf8f4] pl-9 focus:outline-hidden ${isPhoneValid
                  ? "border-emerald-500 focus:border-emerald-600 focus:bg-white"
                  : "border-[#ded8cc] focus:border-[#0f6b4f]"
                  }`}
              />
              <Icon
                icon="solar:phone-bold"
                className={`w-4 h-4 absolute left-3 top-3 transition-colors ${isPhoneValid ? "text-emerald-600" : "text-[#8a918d]"
                  }`}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#17201c] block mb-1">
              পাসওয়ার্ড <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                ref={passwordInputRef}
                type={showPassword ? "text" : "password"}
                required
                minLength={4}
                placeholder="পাসওয়ার্ড লিখুন"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-[#ded8cc] focus:outline-hidden focus:border-[#0f6b4f] bg-[#faf8f4] pl-9 pr-9"
              />
              <Icon
                icon="solar:lock-bold"
                className="w-4 h-4 text-[#8a918d] absolute left-3 top-3"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#8a918d] hover:text-[#17201c] cursor-pointer"
              >
                <Icon
                  icon={showPassword ? "solar:eye-closed-bold" : "solar:eye-bold"}
                  className="w-4 h-4"
                />
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-1.5">
              <Icon icon="solar:danger-circle-bold" className="w-4 h-4 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {tab === "register" && (
            <p className="text-[11px] text-[#626965] leading-normal bg-[#f6f2ea] p-2.5 rounded-xl border border-[#ebe6dc]">
              💡 অ্যাকাউন্ট খুললে আপনার সিলেবাসে দাগানো বর্তমান টপিকগুলো ক্লাউডে সেভ থাকবে। মেডিকেল ও এইচএসসি প্রস্তুতি আলাদা আলাদাভাবে সংরক্ষিত থাকবে।
            </p>
          )}

          <div className="pt-1">
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#0f6b4f] hover:bg-[#093e2e] text-white text-xs sm:text-sm font-black rounded-xl shadow-md transition cursor-pointer disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Icon icon="solar:restart-bold" className="w-4 h-4 animate-spin" />
                  <span>অপেক্ষা করুন...</span>
                </>
              ) : (
                <>
                  <Icon icon={tab === "register" ? "solar:user-plus-bold" : "solar:login-2-bold"} className="w-4 h-4" />
                  <span>{tab === "register" ? "অ্যাকাউন্টে প্রগ্রেস সেভ করুন" : "লগইন করুন"}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Bottom Switcher: "account nai new account toiri korun" or "login korun" */}
        <div className="pt-2 border-t border-[#ebe6dc] text-center">
          {tab === "login" ? (
            <p className="text-xs text-[#626965] font-semibold">
              অ্যাকাউন্ট নেই?{" "}
              <button
                type="button"
                onClick={() => {
                  setTab("register");
                  setErrorMsg("");
                  setInfoMsg("");
                  setDuplicateUser(null);
                  setNotFoundPhone(null);
                }}
                className="font-black text-[#0f6b4f] hover:text-[#093e2e] hover:underline cursor-pointer ml-1 inline-flex items-center gap-0.5"
              >
                <span>নতুন অ্যাকাউন্ট তৈরি করুন</span>
                <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
              </button>
            </p>
          ) : (
            <p className="text-xs text-[#626965] font-semibold">
              ইতিমধ্যে অ্যাকাউন্ট রয়েছে?{" "}
              <button
                type="button"
                onClick={() => {
                  setTab("login");
                  setErrorMsg("");
                  setInfoMsg("");
                  setDuplicateUser(null);
                  setNotFoundPhone(null);
                }}
                className="font-black text-[#0f6b4f] hover:text-[#093e2e] hover:underline cursor-pointer ml-1 inline-flex items-center gap-0.5"
              >
                <span>লগইন করুন</span>
                <Icon icon="solar:arrow-right-linear" className="w-3 h-3" />
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
