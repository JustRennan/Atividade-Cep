const cepInput = document.getElementById("cep");
const buscarBtn = document.getElementById("btn-buscar-cep");
const msgEl = document.getElementById("msg");

const logradouroEl = document.getElementById("logradouro");
const bairroEl = document.getElementById("bairro");
const cidadeEl = document.getElementById("cidade");
const ufEl = document.getElementById("uf");

function setStatus(txt) {
  msgEl.textContent = txt;
}

function buscarCepXhttp() {
  const cep = cepInput.value.trim();

  if (cep === "" || !/^[0-9]{8}$/.test(cep)) {
    setStatus("⚠️ Digite um CEP válido com 8 números!");
    return;
  }

  const url = `https://viacep.com.br/ws/${cep}/json`;

  setStatus("⏳ Consultando...");

  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, true);

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4) {
      if (xhttp.status === 200) {
        const data = JSON.parse(xhttp.responseText);

        if (data.erro) {
          setStatus("❌ CEP não encontrado!");
          logradouroEl.value = "";
          bairroEl.value = "";
          cidadeEl.value = "";
          ufEl.value = "";
        } else {
          setStatus("✅ Dados carregados!");
          logradouroEl.value = data.logradouro;
          bairroEl.value = data.bairro;
          cidadeEl.value = data.localidade;
          ufEl.value = data.uf;
        }
      } else {
        setStatus("❌ Erro ao buscar CEP.");
      }
    }
  };

  xhttp.send();
}

buscarBtn.addEventListener("click", buscarCepXhttp);
