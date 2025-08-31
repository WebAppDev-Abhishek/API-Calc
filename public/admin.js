const socket = io();

const userCountEl = document.getElementById("userCount");
const totalVisitorsEl = document.getElementById("totalVisitors");
const logsTable = document.querySelector("#logs tbody");

const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const modalUser = document.getElementById("modalUser");
const modalName1 = document.getElementById("modalName1");
const modalName2 = document.getElementById("modalName2");
const modalResult = document.getElementById("modalResult");
const modalTime = document.getElementById("modalTime");

async function loadLogs(){
  const res = await fetch("/api/admin/logs");
  const data = await res.json();
  logsTable.innerHTML = "";
  data.logs.forEach(addLogRow);
  totalVisitorsEl.textContent = data.totalVisitors;
}

function addLogRow(log){
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${log.userToken || "N/A"}</td>
    <td>${log.name1}</td>
    <td>${log.name2}</td>
    <td>${log.result}</td>
    <td>${log.timestamp}</td>
  `;
  row.onclick = () => {
    modalUser.textContent = log.userToken || "N/A";
    modalName1.textContent = log.name1;
    modalName2.textContent = log.name2;
    modalResult.textContent = log.result;
    modalTime.textContent = log.timestamp;
    modal.style.display = "block";
  };
  logsTable.appendChild(row);
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if(e.target === modal) modal.style.display = "none"; };

socket.on("userCount", count => userCountEl.textContent = count);
socket.on("totalVisitors", total => totalVisitorsEl.textContent = total);
socket.on("newLog", log => addLogRow(log));

loadLogs();
