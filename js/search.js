const searchWrapper = document.querySelector(".search-input");
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");

document.addEventListener("click", (e) => {
    if (searchWrapper.contains(e.target)) return;
    e.preventDefault();
    searchWrapper.classList.remove("active");
});

inputBox.addEventListener("click", listener);
inputBox.addEventListener("keyup", listener);

function listener(e) {
    e.preventDefault();
    suggBox.innerHTML = filterSuggestions(this.value).map(sugg => `<li>${sugg}</li>`).join(''); 
    suggBox.querySelectorAll("li").forEach(item => item.addEventListener("click", select));
    searchWrapper.classList.add("active");
}

function filterSuggestions(search) {
    const keyWords = search.trim().toLowerCase().split(/\s+/);
    if (keyWords[0] === "") return suggestions.map(sugg => sugg.repeat(1));
    const suggs = suggestions.map(sugg => {
        return {
            originalSugg: sugg.repeat(1),
            sugg: sugg.toLowerCase(),
            keyWordsCount: 0
        };
    });
    suggs.forEach(e => {
        keyWords.forEach(keyWord => {if (e.sugg.includes(keyWord)) e.keyWordsCount++;});
    });
    return suggs.sort((a, b) => {
        const result = b.keyWordsCount - a.keyWordsCount;
        if (result !== 0) return result;
        return a.sugg.length - b.sugg.length;
    }).map(e => e.originalSugg.repeat(1));
}

function select() {
    inputBox.value = this.textContent;
    searchWrapper.classList.remove("active");
    window.location.href = "/blog/" + encodeURIComponent(this.textContent.replaceAll(" ", "-"));
}

