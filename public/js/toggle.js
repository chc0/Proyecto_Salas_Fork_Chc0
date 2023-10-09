function toggleSidebar() 
{
    var sidebar = document.getElementById("mySidebar");
    sidebar.classList.toggle("show");
}

function logout() 
{
    fetch('/logout',{method: 'GET'}).then(response => 
    {
        if (response.ok){console.log(response)} 
        else{console.error('Logout failed');}
    }).catch(error => {console.error('Error:', error);});
}
