import { useEffect, useRef, useState } from "react";

export function Reveal({ as: Tag = "div", className = "", delay, initiallyIn = false, children, ...rest }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(initiallyIn);

  useEffect(() => {
    if (initiallyIn) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [initiallyIn]);

  return (
    <Tag
      ref={ref}
      className={"reveal" + (inView ? " in" : "") + (className ? " " + className : "")}
      style={delay ? { transitionDelay: delay } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
