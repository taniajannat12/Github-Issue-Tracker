document.getElementById('sign').addEventListener('click',function(){
    const name=document.getElementById('name');
    const NAME=name.value
    const pass=document.getElementById('pass');
    const password=pass.value
    if(NAME=='admin' && password=='admin123')
    {
        alert('success')
        window.location.assign('home.html')
    }
    else{
        alert('failed')
    }
})