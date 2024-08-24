import { useRef, useEffect } from "react";
import GridPattern from "../components/bg-pattern/animated-grid-pattern/AnimatedGridPattern";
import VelocityScroll from "../components/text/scroll-based-velocity/ScrollBasedVelocity";
import { useTranslation } from "react-i18next";
import useWindowSize from "../hooks/useWindowSize";

export default function About() {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="relative flex flex-col lg:flex-row h-screen justify-center items-center lg:justify-between">
      <GridPattern className="opacity-80" />
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div
        className={`absolute flex flex-col h-[800px] ${
          width < 600 ? "w-full" : "w-[70%]"
        } overflow-hidden rounded-lg border bg-white shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pl-3 pr-3 pt-12`}
      >
        <div className="flex-col items-center justify-center mb-10 ">
          <VelocityScroll
            text="God is Good"
            className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm md:text-7xl md:leading-[5rem]"
          />
        </div>
        <div
          ref={scrollContainerRef}
          className="flex justify-start items-start p-10 overflow-y-auto max-h-[600px]"
        >
          <div className="space-y-2">
            <p className="text-green-800/30 animate-pulse">
              {t("src.pages.about.texts.appeal")}
            </p>
            <p className="text-gray-700 p-1 rounded-lg">
              {t("src.pages.about.texts.isaiah")}
            </p>
            <p className="text-slate-500">
              {t("src.pages.about.texts.houseAV")}
            </p>
            <p className="text-slate-600">
              {t("src.pages.about.texts.obedience")}
            </p>
            <p className="text-slate-700">
              {t("src.pages.about.texts.firstSteps")}
            </p>
            <p className="text-slate-800">
              {t("src.pages.about.texts.priorities")}
            </p>
            <p className="text-slate-900">
              {t("src.pages.about.texts.investment")}
            </p>
            <p>{t("src.pages.about.texts.seeking")}</p>
            <br />
            <br />
            <p className="text-slate-600">
              {t("src.pages.about.texts.contact")}
              <br />
              <span className="text-blue-400">
                {t("src.pages.about.texts.email")}
              </span>
            </p>
          </div>
        </div>

        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80 [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
        >
          <defs>
            <pattern
              id=":rcr:"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
              patternContentUnits="userSpaceOnUse"
              x="0"
              y="0"
            >
              <circle id="pattern-circle" cx="1" cy="1" r="1"></circle>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#:rcr:)"
          ></rect>
        </svg>
      </div>
    </div>
  );
}
