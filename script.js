(() => {
  const GOOGLE_APPS_SCRIPT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbx8B0xEWk-KF6TVYvaAhVP0G-3yvjApVWe36u4OtIxU5oCE5C96ju0dxDxLAlTmaqdQ/exec";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const yearNode = document.getElementById("year");
  const form = document.getElementById("inquiry-form");
  const statusNode = document.getElementById("form-status");
  const submitButton = document.getElementById("submit-button");
  const ndaDownload = document.getElementById("nda-download");

  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sectionMap = navLinks
    .map((link) => {
      const section = document.querySelector(link.getAttribute("href") || "");
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (sectionMap.length && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          sectionMap.forEach(({ link, section }) => {
            if (section.id === entry.target.id) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.25 }
    );

    sectionMap.forEach(({ section }) => navObserver.observe(section));
  }

  const revealNodes = document.querySelectorAll(".reveal");
  if (!reduceMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealNodes.forEach((node) => revealObserver.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add("visible"));
  }

  const opportunityItems = Array.from(document.querySelectorAll(".opportunity-item"));
  const setOpenState = (item, shouldOpen) => {
    const trigger = item.querySelector(".opportunity-trigger");
    if (!trigger) return;
    trigger.setAttribute("aria-expanded", shouldOpen ? "true" : "false");
    item.classList.toggle("is-open", shouldOpen);
  };

  opportunityItems.forEach((item, index) => {
    const trigger = item.querySelector(".opportunity-trigger");
    if (!trigger) return;

    if (index === 0) {
      setOpenState(item, true);
    }

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      opportunityItems.forEach((otherItem) => {
        if (otherItem !== item) setOpenState(otherItem, false);
      });
      setOpenState(item, !isOpen);
    });
  });

  const setStatus = (message, stateClass) => {
    if (!statusNode) return;
    statusNode.textContent = message;
    statusNode.classList.remove("processing", "success", "error");
    if (stateClass) statusNode.classList.add(stateClass);
  };

  const setSubmitting = (submitting) => {
    if (!submitButton) return;
    submitButton.disabled = submitting;
    submitButton.textContent = submitting ? "Submitting..." : "Submit Inquiry";
  };

  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      setStatus("Please complete all required fields before submitting.", "error");
      return;
    }

    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") || "").trim(),
      lastName: String(formData.get("lastName") || "").trim(),
      institution: String(formData.get("institution") || "").trim(),
      role: String(formData.get("role") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      department: String(formData.get("department") || "").trim(),
      areaOfInterest: String(formData.get("areaOfInterest") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      consent: formData.get("consent") === "on",
    };

    setSubmitting(true);
    setStatus("Submitting your request...", "processing");

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_WEB_APP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      const responseText = await response.text();
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch {
        data = null;
      }

      const hasExplicitFailure = data && (data.status === "error" || data.success === false);
      if (!response.ok || hasExplicitFailure) {
        throw new Error("Submission failed");
      }

      setStatus("Thank you. Your inquiry has been received.", "success");
      form.reset();
      ndaDownload.hidden = false;
      ndaDownload.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    } catch (_error) {
      setStatus("Submission could not be completed. Please contact research@wrekdtech.com directly.", "error");
    } finally {
      setSubmitting(false);
    }
  });
})();
