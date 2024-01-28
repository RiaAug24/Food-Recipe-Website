if (!sessionStorage.getItem("activeTab") && !sessionStorage.getItem("activecat")) {
  sessionStorage.setItem("activeTab", 0);
  sessionStorage.setItem("activecat", 0);
}
if(!sessionStorage.getItem("activeDown") && !sessionStorage.getItem("mode"))
{
  sessionStorage.setItem("activeDown", 1);
  document.getElementById("sun").style.display = "none";
  sessionStorage.setItem("mode", 'light');
}

const activemode = () => {
  const currmode = sessionStorage.getItem("mode");
  if(currmode === 'light')
  {
    document.body.style.backgroundColor = '#1c1917';
    document.getElementById("moon").style.display = "none";
    document.getElementById("sun").style.display = "flex";
    document.body.style.color="white";
    document.getElementById("downnav").style.backgroundColor="#292524";
    document.getElementById("downnav").style.color="white";
  }
  else{
    document.body.style.backgroundColor = 'white';
    document.getElementById("sun").style.display = "none";
    document.getElementById("moon").style.display = "flex";
    document.body.style.color="#292524";
    document.getElementById("downnav").style.backgroundColor="white";
    document.getElementById("downnav").style.color="#292524";
  }
};
activemode();

const activeTab = () => {
  const activetab = sessionStorage.getItem("activeTab");
  document.getElementsByClassName("nav-tabs")[activetab].classList.add("active");
};
activeTab();

const activeCat = () => {
  const activecat = sessionStorage.getItem("activecat");
  document.getElementById("categories").children[activecat].children[1].classList.add("activecat");
};
activeCat();

const activeDown = () => {
  const activeDown = sessionStorage.getItem("activeDown");
  document.getElementById("downnav-tabs").children[activeDown].classList.add("active");
};
activeDown();


const changeTab = (t) => {
  const alltabs = document.querySelectorAll(".nav-tabs");
  alltabs.forEach((tab) => {
    tab.classList.remove("active");
  });
  document.getElementById("navtabs").children[t].classList.add("active");
  sessionStorage.setItem("activeTab", t);
};

const changeCat = (t) => {
    const alltabs = document.querySelectorAll(".category");
    alltabs.forEach((tab) => {
      tab.children[1].classList.remove("activecat");
    });
    document.getElementById("categories").children[t].children[1].classList.add("activecat");
    sessionStorage.setItem("activecat", t);
  };

  const changeDTab = (t) =>{
    const alltabs = document.querySelectorAll(".downnav-tab");
    alltabs.forEach((tab) => {
      tab.classList.remove("active");
    })
      document.getElementById("downnav-tabs").children[t].classList.add("active");
      sessionStorage.setItem("activeDown", t);
  }

  const changebg = (m) =>{
    if(m==0)
    {
      sessionStorage.setItem("mode", 'light');
    }
    else{
      sessionStorage.setItem("mode", 'dark');      
    }
    activemode();
  }

  window.ACCESS_POINT = "https://api.edamam.com/api/recipes/v2";

  const APP_ID = "1d56952c";
  const API_KEY = "1381bfc880a44ab80149dd1489b90f1e";
  const TYPE = "public";
  export const fetchData = async function (queries, successCallBack) {
    const query = queries
      ?.join("&")
      .replace(/,/g, "=")
      .replace(/ /g, "%20")
      .replace(/\+/g, "%2B");
  
    const url = `${ACCESS_POINT}?app_id=${APP_ID}&app_key=${API_KEY}&type=${TYPE}${
      query ? `&${query}` : ""
    }`;
  
    const response = await fetch(url);
  
    if (response.ok) {
      const data = await response.json();
      successCallBack(data);
    }
  };


  export const cardQueries = [
    ["field", "uri"],
    ["field", "label"],
    ["field", "image"],
    ["field", "totalTime"],
  ];
  
  export const $skeletonCard = `
     <li class="card skeleton-card">
       <div class="skeleton card-banner"></div>
  
        <div class="card-body">
          <div class="skeleton card-title"></div>
          <div class="skeleton card-text"></div>
        </div>
    </li>`;