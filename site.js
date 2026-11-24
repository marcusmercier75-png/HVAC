{
  const CONTACT_EMAIL = "quotes@example.com"; // change to your real inbox
  const $ = id => document.getElementById(id);

  // homepage picture: stack plate and ticket on phones
  if ($("pic")) {
    const mq = matchMedia("(max-width:600px)");
    const fit = () => {
      $("pic").setAttribute("viewBox", mq.matches ? "0 20 470 570" : "0 0 1080 330");
      $("tpos").setAttribute("transform", mq.matches ? "translate(-625 300)" : "");
      $("arrow").style.display = mq.matches ? "none" : "";
    };
    fit(); mq.addEventListener("change", fit);
  }

  // request page: preselect contractor from the link
  if (location.hash === "#contractor" && $("r-inst")) $("r-inst").checked = true;

  // every lead form on the site
  document.querySelectorAll("form.leadform").forEach(f => {
    const err = f.querySelector(".err"), done = f.querySelector(".done");
    const sum = f.querySelector(".sum"), copy = f.querySelector(".copy");
    f.querySelector(".addr").textContent = CONTACT_EMAIL;
    let text = "";
    f.addEventListener("submit", e => {
      e.preventDefault();
      const name = f.elements.name.value.trim(), email = f.elements.email.value.trim();
      if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
        err.textContent = "Add your name and a valid email so we can reply.";
        (!name ? f.elements.name : f.elements.email).focus();
        return;
      }
      err.textContent = "";
      const vals = {};
      for (const [k, v] of new FormData(f)) {
        if (!String(v).trim()) continue;
        (vals[k] = vals[k] || []).push(String(v).trim());
      }
      const lines = Object.keys(vals).map(k => {
        const el = f.querySelector('[name="' + k + '"]');
        return (el && el.dataset.label || k) + ": " + vals[k].join(", ");
      });
      text = lines.join("\n");
      sum.textContent = lines.join(" | ");
      done.classList.add("show");
      let subject = f.dataset.subject;
      if (vals.role && /contractor/i.test(vals.role[0])) subject = "Contractor network application";
      location.href = "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(subject + ": " + name) + "&body=" + encodeURIComponent(text);
    });
    copy.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(text); copy.textContent = "Copied"; }
      catch { copy.textContent = "Select the text above to copy"; }
    });
  });

  // homeowners page: note for a landlord
  if ($("ll-note")) {
    const url = location.href.split("#")[0];
    const msg = $("ll-note").textContent.trim() + " " + url;
    $("ll-mail").href = "mailto:?subject=" + encodeURIComponent("Our heating and cooling system needs replacing") + "&body=" + encodeURIComponent(msg);
    $("ll-copy").addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(msg); $("ll-copy").textContent = "Copied"; }
      catch { $("ll-copy").textContent = "Select the note to copy it"; }
    });
  }
}
