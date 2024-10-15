const API_KEY = "98f67495005645679cafd81e4ff3baf3";
const blogContainer = document.getElementById("blog_container");

const search_btn = document.getElementById("search_btn");
const searchBar = document.getElementById("search_input");

search_btn.addEventListener("click",async ()=>{
    const query = searchBar.value.trim();
    if(query!== ""){
   try {
      const articles = await fatchData(query)
      displayBlogs(articles);
   } catch (error) {
          console.log(error);
          return [];

   }
    }
})
async function fatchData(query){
    try{
    const apiurl = `https://newsapi.org/v2/everything?q=${query}&from=2024-09-15&sortBy=publishedAt&pageSize=20&apikey=${API_KEY}`;
    const response = await fetch(apiurl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("error fatching random news", error);
    return [];
  }
}
async function FatchRandom() {
  try {
    const apiurl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apikey=${API_KEY}`;
    const response = await fetch(apiurl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("error fatching random news", error);
    return [];
  }
}
function displayBlogs(articles) {
  blogContainer.innerHTML = "";
  articles.forEach((articles) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("bolg_card");
    const img = document.createElement("img");
    img.src = articles.urlToImage;
    img.alt = articles.title;
    const title = document.createElement("h2");
    // title.textContent = articles.title;
    const truncatedTitle = (articles.title.length > 30)? articles.title.slice(0,30)+ "....": articles.title;
    title.textContent = truncatedTitle
    const description = document.createElement("p");
    // description.textContent = articles.description;
    
   const deskShort = (articles.description.length > 120)? articles.description.slice(0,120)+"...":articles.description;
   description.textContent = deskShort
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogContainer.appendChild(blogCard);
    blogCard.addEventListener("click",()=>{
        window.open(articles.url,"_blank");
    })
  });
}
(async () => {
  try {
    const articles = await FatchRandom();
    displayBlogs(articles);
  } catch (error) {
    // console.error("error fatching random news", error)
  }
})();
