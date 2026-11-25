const tema=document.querySelector("#tombol-tema");
if(tema){if(localStorage.getItem("tema")==="gelap"){document.body.classList.add("gelap");tema.textContent="Mode Terang";tema.setAttribute("aria-pressed","true")}tema.addEventListener("click",()=>{const gelap=document.body.classList.toggle("gelap");localStorage.setItem("tema",gelap?"gelap":"terang");tema.textContent=gelap?"Mode Terang":"Mode Gelap";tema.setAttribute("aria-pressed",String(gelap))})}

const daftar=document.querySelector("#daftar-proyek");
const jumlah=document.querySelector("#jumlah-proyek");
const cari=document.querySelector("#cari-proyek");
const kartu=[...daftar.querySelectorAll(".kartu")].map(el=>({el,kategori:el.querySelector(".label").textContent.toLowerCase(),teks:el.textContent.toLowerCase()}));
let kategori="semua";
function tampil(){const kata=cari.value.trim().toLowerCase();let n=0;kartu.forEach(item=>{const cocok=(kategori==="semua"||item.kategori===kategori)&&(!kata||item.teks.includes(kata));item.el.hidden=!cocok;if(cocok)n++});jumlah.textContent=`Menampilkan ${n} dari ${kartu.length} proyek`}
document.querySelectorAll(".tombol-filter").forEach(t=>t.addEventListener("click",()=>{document.querySelectorAll(".tombol-filter").forEach(x=>{x.classList.remove("aktif");x.setAttribute("aria-pressed","false")});t.classList.add("aktif");t.setAttribute("aria-pressed","true");kategori=t.id.replace("filter-","");tampil()}));cari.addEventListener("input",tampil);

const muat=document.querySelector("#muat-repo"),status=document.querySelector("#status-repo"),repo=document.querySelector("#daftar-repo");
muat?.addEventListener("click",async()=>{muat.disabled=true;status.textContent="Memuat...";try{const r=await fetch("https://api.github.com/users/BIINT4NG/repos?sort=updated&per_page=6");if(!r.ok)throw Error();const data=await r.json();repo.innerHTML="";data.forEach(x=>{const li=document.createElement("li"),a=document.createElement("a");a.href=x.html_url;a.target="_blank";a.rel="noreferrer";a.textContent=x.name;li.append(a);repo.append(li)});status.textContent=`${data.length} repositori terbaru:`}catch{status.textContent="Daftar repositori gagal dimuat.";muat.disabled=false}});
