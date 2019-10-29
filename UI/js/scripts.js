let now_date = document.querySelector('#now-date');
    let newDate = new Date();
    now_date.textContent = newDate.toString().split('G')[0];