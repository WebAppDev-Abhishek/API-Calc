const btn = document.getElementById("calculateBtn");
const name1El = document.getElementById("name1");
const name2El = document.getElementById("name2");
const resultEl = document.getElementById("result");
const loadingBar = document.getElementById("loadingBar");
const calculatingText = document.getElementById("calculatingText");
const historyUl = document.getElementById("historyList");

// Generate unique user token per browser
function getUserToken() {
  let token = localStorage.getItem("userToken");
  if (!token) {
    // Modern browsers
    if (crypto && crypto.randomUUID) {
      token = crypto.randomUUID();
    } else {
      // Fallback
      token = 'xxxx-xxxx-xxxx'.replace(/[x]/g, ()=> Math.floor(Math.random()*16).toString(16));
    }
    localStorage.setItem("userToken", token);
  }
  return token;
}

const userToken = getUserToken();
let historyList = [];

btn.onclick = async () => {
  const name1 = name1El.value.trim();
  const name2 = name2El.value.trim();
  if (!name1 || !name2) { 
    alert("Enter both names"); 
    return; 
  }

  resultEl.style.display = "none";
  loadingBar.style.display = "block";
  calculatingText.style.display = "block";

  // Reset animation
  loadingBar.style.animation = "none";
  void loadingBar.offsetWidth;

  setTimeout(async () => {
    try {
      const res = await fetch("/api/client/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name1, name2, userToken })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Server error");
      }

      const data = await res.json();

      loadingBar.style.display = "none";
      calculatingText.style.display = "none";

      resultEl.textContent = `🎯 Result for ${name1} + ${name2}: ${data.result}%`;
      resultEl.style.display = "block";

      // Update history
      historyList.unshift(`${name1} + ${name2} → ${data.result}%`);
      if (historyList.length > 5) historyList.pop();
      historyUl.innerHTML = "";
      historyList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyUl.appendChild(li);
      });

    } catch(err) {
      console.error(err);
      alert("Error: " + (err.message || "Unknown error"));
      loadingBar.style.display = "none";
      calculatingText.style.display = "none";
    }
  }, 2000);
};
