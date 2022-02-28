const submit_button = document.getElementById('submit')
submit_button.addEventListener('click', liuyan)

function liuyan(e) {
  e.preventDefault();

  const tr = document.createElement("tr")
  const td = document.createElement("td")
  const tbody = document.getElementById("liuyanban")
  const content = document.getElementById("content").value

  if (content === '') {
    return;
  }

  td.append(content)
  tr.append(td)
  tbody.append(tr)

  content.value = ""
}