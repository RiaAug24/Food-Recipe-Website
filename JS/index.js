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