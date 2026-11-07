import React from 'react';
import { ValueCardData } from './ValueCard';

interface CourseModalProps {
  course: ValueCardData | null;
  onClose: () => void;
  onOpenMeet: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose, onOpenMeet }) => {
  if (!course) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={course.courseTitle}
      className="fixed inset-0 z-50 bg-[#1a1109]/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-10 select-none animate-fadeIn overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-[#edece8] text-[#1d150c] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#1d150c]/10 my-auto"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#1d150c]/5 hover:bg-[#1d150c]/15 text-[#1d150c] flex items-center justify-center transition-colors"
          aria-label="Close course details"
        >
          ✕
        </button>

        <div className="space-y-6">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-[#1d150c]/10">
            <img
              src={course.courseImage}
              alt={course.courseTitle}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono text-white">
              {course.courseDuration}
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#a54d25] font-semibold">
              {course.courseTag}
            </span>
            <h3 className="text-2xl sm:text-3xl font-editorial-serif font-bold text-[#1d150c]">
              {course.courseTitle}
            </h3>
            <p className="text-sm sm:text-base font-light text-[#1d150c]/80 leading-relaxed">
              {course.courseDescription}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/60 border border-[#1d150c]/10 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#a54d25] font-semibold">
              What This Practice Cultivates
            </h4>
            <ul className="text-xs sm:text-sm font-light text-[#1d150c]/80 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-[#a54d25] font-bold">✓</span>
                Deep physiological nervous system regulation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#a54d25] font-bold">✓</span>
                Subtle body alignment and breath-synchronized posture
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#a54d25] font-bold">✓</span>
                Cultivating resilient awareness under modern pressure
              </li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenMeet();
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#1d150c] text-[#edece8] hover:bg-[#a54d25] transition-all duration-300 text-sm font-medium shadow-md hover:scale-105 active:scale-95"
            >
              Inquire About Joining
            </button>
            <a
              href="https://blandina.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#1d150c]/70 hover:text-[#a54d25] transition-colors"
            >
              Learn more on blandina.org ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
