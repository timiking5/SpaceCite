const tabList = document.querySelector('[role="tablist"]')

const tabs = tabList.querySelectorAll('[role="tab"]');

let tabFocus = 0;

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    // change the tabindex of the current tab to -1

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
        if (e.keyCode === keydownRight) {
            tabFocus = (tabFocus + 1) % tabs.length;
        }
        if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus === -1) tabFocus = tabs.length - 1;
        }
        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");
    
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
        
    targetTab.setAttribute("aria-selected", true);
    
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, [`#${targetPanel}`]);
    
    hideContent(mainContainer, 'picture');
    hideContent(mainContainer, '.technology-img');
    showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
     parent.querySelector(content).removeAttribute('hidden');
}