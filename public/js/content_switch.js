function main_content_hide()
{
  const parentDiv = document.querySelector(".main-content");
  const childDivs = parentDiv.querySelectorAll("div");
  childDivs.forEach((element) => 
  {
    element.style.visibility = "hidden";
    element.style.display = "none" 
  });
}

function content_switch(id_content)
{
  main_content_hide();
  const element = document.getElementById(id_content);
  element.style.visibility = "visible";
  element.style.display = "block";
}

main_content_hide();
