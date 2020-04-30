const clearLocalStorageButton = document.getElementById('clear-local-storage')

function clearLocalStorage() {
 window.localStorage.setItem('id', '')
}

clearLocalStorageButton.addEventListener('click', clearLocalStorage)