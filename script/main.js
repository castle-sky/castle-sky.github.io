const submit_button = document.getElementById('submit')
submit_button.addEventListener('click', liuyan)

function liuyan(e) {
  e.preventDefault();

  const li = document.createElement("li")
  const ol = document.getElementById("liuyanban")
  const content = document.getElementById("content")
  const value = content.value

  if (value === '') {
    return;
  }

  li.append(value)
  ol.append(li)

  content.value = ""
}